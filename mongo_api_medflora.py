from flask import Flask, request, jsonify,Response
from pymongo import MongoClient
from bson.json_util import dumps
import json
import re
from typing import Dict, Any, List
from flask_cors import CORS
import os
import requests
import jwt
import datetime
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from gridfs import GridFS
from functools import wraps

import random
from datetime import datetime, timedelta

from werkzeug.security import generate_password_hash, check_password_hash
from bson import ObjectId



app = Flask(__name__)
# CORS(app)
CORS(
    app,
    origins=["http://localhost:3000"],
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
)
# --- MongoDB Configuration ---
# CRITICAL: Using the new collection name 'medflora_final_data_v2'
MONGO_URI = "your_mongo_uri"
MONGO_DB_NAME = "Plants"
PLANT_COLLECTION_NAME = "medflora_final_data_v2"
app.config["MONGO_URI"] = "your_mongo_uri/Plants"
app.config["SECRET_KEY"] = "medflora"


mongo = PyMongo(app)


USER_PLANT_COLLECTION = "user_plants"
user_plant_collection = mongo.db[USER_PLANT_COLLECTION]
fs = GridFS(mongo.db)


PREDICTION_HISTORY_COLLECTION = "prediction_history"
prediction_history_collection = mongo.db[PREDICTION_HISTORY_COLLECTION]

USERS_COLLECTION = "users"
users_collection = mongo.db[USERS_COLLECTION]

PLANTNET_API_KEY = os.getenv("PLANTNET_API_KEY")
PLANTNET_API_URL = "https://my-api.plantnet.org/v2/identify/all"



def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # Extract token from 'Authorization: Bearer <token>'
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            try:
                token = auth_header.split(" ")[1]
            except IndexError:
                return jsonify({'msg': 'Token is missing!'}), 401

        if not token:
            return jsonify({'msg': 'Token is missing!'}), 401

        try:
            # Decode the token
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            # In your login, 'sub' is the string user_id
            current_user_id = data['sub']
        except Exception as e:
            return jsonify({'msg': 'Token is invalid!', 'error': str(e)}), 401

        return f(current_user_id, *args, **kwargs)

    return decorated


client = None
plant_collection = None

try:
    client = MongoClient(MONGO_URI)
    db = client[MONGO_DB_NAME]
    plant_collection = db[PLANT_COLLECTION_NAME]

    # Check connection
    db.command('ping')
    print(f"✅ Successfully connected to MongoDB database: '{MONGO_DB_NAME}' using collection '{PLANT_COLLECTION_NAME}'")
except Exception as e:
    print(f"❌ Error connecting to MongoDB: {e}")
    client = None
    plant_collection = None



# Helper function to parse data and handle MongoDB's ObjectId
def jsonify_mongo_data(data):
    """Converts MongoDB document(s) to JSON string and parses back to Python object."""
    if data is None:
        return None
    # dumps handles ObjectId and other BSON types automatically
    return json.loads(dumps(data))


# Helper function to clean the name for database lookup
def clean_name_for_db_lookup(name):
    """Strips leading/trailing whitespace and trailing punctuation like periods."""
    name = name.strip()
    name = re.sub(r'[.,;:]+$', '', name).strip()
    return name

@app.route("/api/analytics/most-searched-plants", methods=["GET"])
def most_searched_plants():
    try:
        pipeline = [
            {"$group": {"_id": "$plant_name", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}},
            {"$limit": 6}
        ]

        results = list(prediction_history_collection.aggregate(pipeline))

        return jsonify({
            "success": True,
            "data": [
                {"plant": r["_id"], "count": r["count"]}
                for r in results
            ]
        }), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/api/dashboard/kpis", methods=["GET"])
def get_dashboard_kpis():
    try:
        total_plants = plant_collection.count_documents({})

        total_curators = mongo.db.users.count_documents({
            "role": "curator"
        })

        total_identifications = prediction_history_collection.count_documents({})

        return jsonify({
            "success": True,
            "data": {
                "total_plants": total_plants,
                "total_curators": total_curators,
                "total_identifications": total_identifications
            }
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

        
@app.route("/api/prediction-history", methods=["GET"])
def get_prediction_history():
    try:
        records = prediction_history_collection.find().sort("created_at", 1)

        data = []
        for r in records:
            data.append({
                "id": str(r["_id"]),
                "plant_name": r.get("plant_name"),
                "confidence": r.get("confidence"),
                "created_at": r.get("created_at").isoformat() if r.get("created_at") else None
            })

        return jsonify({
            "success": True,
            "data": data
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@app.route("/api/plants", methods=["GET"])
def get_all_plants():
    try:
        plants = plant_collection.find({})

        plant_list = []
        for plant in plants:
            plant["_id"] = str(plant["_id"])
            plant_list.append(plant)

        return jsonify({
            "success": True,
            "count": len(plant_list),
            "data": plant_list
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route("/api/curators", methods=["GET"])
def get_all_curators():
    try:
        curators = users_collection.find(
            {"role": "curator"},
            {"password": 0}
        )

        curator_list = []
        for curator in curators:
            curator["_id"] = str(curator["_id"])
            curator_list.append(curator)

        return jsonify({
            "success": True,
            "count": len(curator_list),
            "data": curator_list
        }), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# --- API Endpoint 1: Search by Plant Name (FETCH ALL DETAILS) ---
@app.route('/search/plant/<plant_name>', methods=['GET'])
def search_by_plant_name(plant_name):
    """
    Retrieves all comprehensive data for a given botanical plant name,
    searching the 'name_scientific' field.
    """
    if plant_collection is None:
        return jsonify({'error': 'Database connection failed'}), 500

    clean_input_name = clean_name_for_db_lookup(plant_name)

    try:
        # 1. Primary match on the 'name_scientific' field (exact match after cleaning)
        query = {"name_scientific": clean_input_name}
        result = plant_collection.find_one(query)

        if result:
            # Reformat the result keys for cleaner API output structure
            output_data = jsonify_mongo_data(result)

            return jsonify({
                "status": "success",
                "query": plant_name,
                "data": output_data
            }), 200
        else:
            # 2. Fallback case-insensitive regex search
            case_insensitive_query = {
                "name_scientific": {"$regex": f"^{re.escape(clean_input_name)}$", "$options": "i"}
            }
            fallback_result = plant_collection.find_one(case_insensitive_query)

            if fallback_result:
                return jsonify({
                    "status": "success",
                    "query": plant_name,
                    "data": jsonify_mongo_data(fallback_result)
                }), 200
            else:
                return jsonify({'error': f'Plant "{plant_name}" not found in the database.'}), 404

    except Exception as e:
        print(f"Error searching by plant name: {e}")
        return jsonify({'error': 'An internal database error occurred.'}), 500



# --- API Endpoint 2: Search by State Name (FETCH PLANT LIST) ---
@app.route('/search/state/<state_name>', methods=['GET'])
def search_by_state_name(state_name):
    """
    Retrieves a list of all plant names available in the specified Indian state.
    Uses the efficient array query on the 'state_availability' field.
    """
    if plant_collection is None:
        return jsonify({'error': 'Database connection failed'}), 500

    # Input is converted to Title Case (matching the format used during import)
    clean_state = state_name.strip().title()

    try:
        # CRITICAL FIX: Direct array query {field: value} works because data is an array
        query = {
            "state_availability": clean_state
        }

        # We project only the names for the list
        projection = {"name_scientific": 1, "name_common": 1, "_id": 0}

        results = plant_collection.find(query, projection)

        plant_list_raw = jsonify_mongo_data(list(results))

        if plant_list_raw:
            # Rename fields in the output for app clarity
            plant_list = []
            for plant in plant_list_raw:
                plant_list.append({
                    'botanical_name': plant.get('name_scientific'),
                    'common_name': plant.get('name_common')
                })

            return jsonify({
                'status': 'success',
                'state': clean_state,
                'count': len(plant_list),
                'plants': plant_list
            }), 200
        else:
            return jsonify({
                'status': 'not_found',
                'state': clean_state,
                'error': f'No medicinal plants found listed in "{clean_state}".'
            }), 404

    except Exception as e:
        print(f"Error searching by state name: {e}")
        return jsonify({'error': 'An internal database error occurred.'}), 500


# --- API Endpoint 3: Search by Therapeutic Use (NEW) ---
@app.route('/search/therapeutic/<therapeutic_use>', methods=['GET'])
def search_by_therapeutic_use(therapeutic_use):
    """
    Retrieves a list of all plants that have the specified therapeutic use.
    Searches across all plant parts (root, seed, leaf, etc.) and General category.
    """
    if plant_collection is None:
        return jsonify({'error': 'Database connection failed'}), 500

    clean_use = therapeutic_use.strip()

    try:
        # Build a query that searches for the therapeutic use in any part of therapeutic_uses
        # This uses $or to check all possible nested arrays
        query = {
            "$or": [
                {"therapeutic_uses.root": {"$regex": clean_use, "$options": "i"}},
                {"therapeutic_uses.seed": {"$regex": clean_use, "$options": "i"}},
                {"therapeutic_uses.leaf": {"$regex": clean_use, "$options": "i"}},
                {"therapeutic_uses.bark": {"$regex": clean_use, "$options": "i"}},
                {"therapeutic_uses.flower": {"$regex": clean_use, "$options": "i"}},
                {"therapeutic_uses.fruit": {"$regex": clean_use, "$options": "i"}},
                {"therapeutic_uses.rhizome": {"$regex": clean_use, "$options": "i"}},
                {"therapeutic_uses.whole_plant": {"$regex": clean_use, "$options": "i"}},
                {"therapeutic_uses.General": {"$regex": clean_use, "$options": "i"}}
            ]
        }

        # Project only the names and relevant therapeutic uses
        projection = {"name_scientific": 1, "name_common": 1, "therapeutic_uses": 1, "_id": 0}

        results = plant_collection.find(query, projection)
        plant_list_raw = jsonify_mongo_data(list(results))

        if plant_list_raw:
            # Format the output with plant names and which part is used for the therapeutic purpose
            plant_list = []
            for plant in plant_list_raw:
                therapeutic_data = plant.get('therapeutic_uses', {})
                matching_parts = []

                # Find which parts contain the therapeutic use
                for part, uses in therapeutic_data.items():
                    if uses and isinstance(uses, list):
                        for use in uses:
                            if clean_use.lower() in use.lower():
                                matching_parts.append({
                                    'part': part,
                                    'use': use
                                })

                plant_list.append({
                    'botanical_name': plant.get('name_scientific'),
                    'common_name': plant.get('name_common'),
                    'therapeutic_details': matching_parts
                })

            return jsonify({
                'status': 'success',
                'therapeutic_use_query': therapeutic_use,
                'count': len(plant_list),
                'plants': plant_list
            }), 200
        else:
            return jsonify({
                'status': 'not_found',
                'therapeutic_use_query': therapeutic_use,
                'error': f'No plants found with therapeutic use matching "{therapeutic_use}".'
            }), 404

    except Exception as e:
        print(f"Error searching by therapeutic use: {e}")
        return jsonify({'error': 'An internal database error occurred.'}), 500

# # --- API Endpoint 4: Get All Plant Names (For List View) ---
# @app.route('/plants/all_names', methods=['GET'])
# def get_all_plant_names():
#     """
#     Fetches ONLY the scientific names of all plants. 
#     Used to populate the initial list in the mobile app.
#     """
#     if plant_collection is None:
#         return jsonify({'error': 'Database connection failed'}), 500

#     try:
#         # Projection: { "name_scientific": 1, "_id": 0 } means ONLY return the name, exclude ID.
#         # This makes the query extremely fast and the payload small.
#         plants = plant_collection.find({}, {"name_scientific": 1, "_id": 0})
        
#         # Extract just the names into a simple list of strings
#         names_list = [p.get('name_scientific') for p in plants if p.get('name_scientific')]
        
#         # Sort them alphabetically
#         names_list.sort()

#         return jsonify({
#             "status": "success",
#             "count": len(names_list),
#             "names": names_list
#         }), 200

#     except Exception as e:
#         print(f"Error fetching names: {e}")
#         return jsonify({'error': 'An internal error occurred'}), 500
    

# --- API Endpoint 4: Get All Plant Names (Updated for Search) ---
@app.route('/plants/all_names', methods=['GET'])
def get_all_plant_names():
    """
    Fetches scientific AND common names for the list view.
    """
    if plant_collection is None:
        return jsonify({'error': 'Database connection failed'}), 500

    try:
        # Projection: Get both name fields, exclude ID
        plants = plant_collection.find({}, {"name_scientific": 1, "name_common": 1, "_id": 0})
        
        plant_list = []
        for p in plants:
            s_name = p.get('name_scientific')
            c_name = p.get('name_common')
            
            # Ensure we have at least a scientific name
            if s_name:
                plant_list.append({
                    "scientific_name": s_name,
                    # Handle cases where common name is missing/null/NaN
                    "common_name": c_name if c_name and isinstance(c_name, str) else "" 
                })
        
        # Sort alphabetically by scientific name
        plant_list.sort(key=lambda x: x['scientific_name'])

        return jsonify({
            "status": "success",
            "count": len(plant_list),
            "plants": plant_list 
        }), 200

    except Exception as e:
        print(f"Error fetching names: {e}")
        return jsonify({'error': 'An internal error occurred'}), 500



# --- API Endpoint 5: Get All States with Plant Counts ---
@app.route('/states', methods=['GET'])
def get_all_states():
    """
    Returns a list of all unique states found in the database,
    along with the count of plants available in each.
    """
    if plant_collection is None:
        return jsonify({'error': 'Database connection failed'}), 500

    try:
        # Aggregation Pipeline:
        # 1. $unwind: If a plant has ["Goa", "Maharashtra"], this splits it into two documents.
        # 2. $group: Groups by state name and counts them.
        # 3. $sort: Sorts alphabetically by state name.
        pipeline = [
            {"$unwind": "$state_availability"},
            {"$group": {
                "_id": "$state_availability", 
                "count": {"$sum": 1}
            }},
            {"$sort": {"_id": 1}}
        ]

        results = list(plant_collection.aggregate(pipeline))
        
        # Format the output for Flutter
        state_list = []
        for item in results:
            state_name = item['_id']
            # Basic validation to skip empty or weird data
            if state_name and isinstance(state_name, str) and len(state_name) > 1:
                state_list.append({
                    "name": state_name.strip(),
                    "count": item['count']
                })

        return jsonify({
            "status": "success",
            "data": state_list
        }), 200

    except Exception as e:
        print(f"Error fetching states: {e}")
        return jsonify({'error': 'An internal error occurred'}), 500


# --- API Endpoint 6: Get All Therapeutic Uses (For Grid View) ---
@app.route('/therapeutic/uses', methods=['GET'])
def get_all_therapeutic_uses():
    if plant_collection is None:
        return jsonify({'error': 'Database connection failed'}), 500

    try:
        # Fetch only the therapeutic_uses field
        cursor = plant_collection.find({}, {"therapeutic_uses": 1, "_id": 0})
        
        use_counts = {}
        
        for doc in cursor:
            t_uses = doc.get('therapeutic_uses')
            
            if not t_uses:
                continue

            # HELPER: Function to process a single ailment string (e.g., "Fever" or "Skin Diseases")
            def add_ailment(ailment_raw):
                if not ailment_raw or not isinstance(ailment_raw, str):
                    return
                # 1. Clean up separators like pipes or commas if they exist inside the string
                # e.g. "Cough, Cold" -> ["Cough", "Cold"]
                parts = re.split(r'[|,;]', ailment_raw)
                
                for part in parts:
                    clean = part.strip().title() # Standardize to Title Case
                    if len(clean) > 2 and clean.lower() != 'nan':
                        use_counts[clean] = use_counts.get(clean, 0) + 1

            # --- CASE 1: t_uses is a DICTIONARY (Structured Data) ---
            # e.g., { "leaf": ["Cough", "Fever"], "root": "Skin care" }
            if isinstance(t_uses, dict):
                for part, value in t_uses.items():
                    # Sub-case A: Value is a List (e.g., ["Cough", "Fever"])
                    if isinstance(value, list):
                        for item in value:
                            add_ailment(str(item))
                            
                    # Sub-case B: Value is a String (e.g., "Cough, Fever")
                    elif isinstance(value, str):
                        add_ailment(value)

            # --- CASE 2: t_uses is a LIST (Array of strings without parts) ---
            # e.g., ["Fever", "Cough", "Skin"]
            elif isinstance(t_uses, list):
                for item in t_uses:
                    add_ailment(str(item))

            # --- CASE 3: t_uses is a raw STRING (Legacy/Excel import) ---
            # e.g., "Leaf: Fever | Root: Cough"
            elif isinstance(t_uses, str):
                # Remove keys like "Leaf:" or "Root:" to just get the ailments
                # Regex removes "Word:" patterns
                cleaned_string = re.sub(r'\b\w+:\s*', '', t_uses) 
                add_ailment(cleaned_string)

        # Convert dictionary to list of objects
        sorted_uses = [{"name": k, "count": v} for k, v in use_counts.items()]
        
        # Sort alphabetically
        sorted_uses.sort(key=lambda x: x['name'])
        
        print(f"DEBUG: Successfully extracted {len(sorted_uses)} unique ailments.")
        
        return jsonify({
            "status": "success",
            "count": len(sorted_uses),
            "data": sorted_uses
        }), 200

    except Exception as e:
        print(f"Error processing therapeutic uses: {e}")
        return jsonify({'error': str(e)}), 500

def get_user_id_from_token():
    auth_header = request.headers.get("Authorization")
    print("Auth header:", auth_header)

    if not auth_header:
        print("No auth header")
        return None

    try:
        token = auth_header.split(" ")[1]

        decoded = jwt.decode(
            token,
            app.config["SECRET_KEY"],
            algorithms=["HS256"]
        )

        print("Decoded JWT:", decoded)

        return decoded["sub"]

    except Exception as e:
        print("JWT decode error:", e)
        return None


def save_image_from_url_to_gridfs(url):
    try:
        r = requests.get(url)
        r.raise_for_status()

        file_id = fs.put(
            r.content,
            filename="prediction.jpg",
            content_type="image/jpeg"
        )

        return file_id

    except Exception as e:
        print("GridFS save error:", e)
        return None



@app.route('/predict', methods=['POST'])
def identify_plant():

    data = request.get_json()
    image_url = data.get('image_url')
    lat = data.get('latitude')
    lon = data.get('longitude')

    if not image_url:
        return jsonify({"error": "No image_url provided"}), 400

    user_id = get_user_id_from_token()
    print("User ID:", user_id)

    payload = {
        "api-key": PLANTNET_API_KEY,
        "images": [image_url],
        "organs": "leaf"
    }

    try:
        response = requests.get(
            PLANTNET_API_URL,
            params=payload,
            timeout=30
        )

        print("PlantNet status:", response.status_code)
        print("PlantNet body:", response.text)

        response.raise_for_status()

        plantnet_data = response.json()

        if not plantnet_data.get("results"):
            return jsonify({"error": "No results from PlantNet"}), 404

        top = plantnet_data["results"][0]
        scientific_name = top["species"]["scientificNameWithoutAuthor"]
        score = top["score"]

        # ✅ Save image to GridFS
        image_bytes = requests.get(image_url).content
        image_id = fs.put(image_bytes, filename="prediction.jpg")

        # ✅ Save history
        if user_id:
            doc = {
                "user_id": ObjectId(user_id),
                "plant_name": scientific_name,
                "confidence": score,
                "image_id": image_id,
                "created_at": datetime.utcnow(),
                "location": {
                    "latitude": lat,
                    "longitude": lon
                } if lat and lon else None
            }
            result = prediction_history_collection.insert_one(doc)
            print("History saved:", result.inserted_id)

        # return jsonify({
        #     "status": "success",
        #     "name": scientific_name,
        #     "score": score
        # })
        return jsonify({
            "status": "success",
            "name": scientific_name,
            "score": score,
            "location": {
                "latitude": lat,
                "longitude": lon
            } if lat and lon else None
        })
    
    except Exception as e:
        print("Predict error:", e)
        return jsonify({"error": str(e)}), 500


## wihtout location saving
# @app.route('/predict', methods=['POST'])
# def identify_plant():

#     data = request.get_json()
#     image_url = data.get('image_url')

#     if not image_url:
#         return jsonify({"error": "No image_url provided"}), 400

#     user_id = get_user_id_from_token()
#     print("User ID:", user_id)

#     payload = {
#         "api-key": PLANTNET_API_KEY,
#         "images": [image_url],
#         "organs": "leaf"
#     }

#     try:
#         response = requests.get(
#             PLANTNET_API_URL,
#             params=payload,
#             timeout=30
#         )

#         print("PlantNet status:", response.status_code)
#         print("PlantNet body:", response.text)

#         response.raise_for_status()

#         plantnet_data = response.json()

#         if not plantnet_data.get("results"):
#             return jsonify({"error": "No results from PlantNet"}), 404

#         top = plantnet_data["results"][0]
#         scientific_name = top["species"]["scientificNameWithoutAuthor"]
#         score = top["score"]

#         # ✅ Save image to GridFS
#         image_bytes = requests.get(image_url).content
#         image_id = fs.put(image_bytes, filename="prediction.jpg")

#         # ✅ Save history
#         if user_id:
#             doc = {
#                 "user_id": ObjectId(user_id),
#                 "plant_name": scientific_name,
#                 "confidence": score,
#                 "image_id": image_id,
#                 "created_at": datetime.utcnow()
#             }

#             result = prediction_history_collection.insert_one(doc)
#             print("History saved:", result.inserted_id)

#         return jsonify({
#             "status": "success",
#             "name": scientific_name,
#             "score": score
#         })

#     except Exception as e:
#         print("Predict error:", e)
#         return jsonify({"error": str(e)}), 500


# @app.route('/predict', methods=['POST'])
# def identify_plant():
#     """
#     1. Receives image URL.
#     2. Calls PlantNet API.
#     3. Returns the scientific name of the top result.
#     """
#     data = request.get_json()

#     if not data or 'image_url' not in data:
#         return jsonify({"error": "No image_url provided"}), 400

#     image_url = data.get('image_url')

    
#     # Payload for PlantNet
#     payload = {
#         'api-key': PLANTNET_API_KEY,
#         'images': [image_url],
#         'organs': 'leaf' 
#     }

#     try:
#         response = requests.get(PLANTNET_API_URL, params=payload)
#         response.raise_for_status()
#         plantnet_data = response.json()

#         if plantnet_data and plantnet_data.get('results'):
#             # Take the top result directly (No mapping map used)
#             top_result = plantnet_data['results'][0]
#             scientific_name = top_result['species']['scientificNameWithoutAuthor']
#             score = top_result['score']


#             return jsonify({
#                 "status": "success",
#                 "name": scientific_name,
#                 "score": score
#             })
#         else:
#             return jsonify({"error": "No results from PlantNet"}), 404

#     except Exception as e:
#         return jsonify({"error": f"Error identifying plant: {str(e)}"}), 500


# --- SIGNUP ---
# @app.route('/signup', methods=['POST'])
# def signup():
#     data = request.get_json()

#     existing_user = mongo.db.users.find_one({"email": data['email']})
#     if existing_user:
#         return jsonify({"msg": "User already exists"}), 409

#     hashed_pw = generate_password_hash(data['password'])

#     # 🔐 FORCE ROLE = user
#     role = 'user'

#     mongo.db.users.insert_one({
#         "email": data['email'],
#         "password": hashed_pw,
#         "role": role
#     })

#     return jsonify({"msg": "User created", "role": role}), 201

# --- without otp ---
# @app.route('/signup', methods=['POST'])
# def signup():
#     data = request.get_json()

#     email = data.get('email')
#     password = data.get('password')
#     phone = data.get('phone')   # ✅ NEW

#     if not email or not password or not phone:
#         return jsonify({"msg": "Email, password and phone are required"}), 400

#     existing_user = mongo.db.users.find_one({"email": email})
#     if existing_user:
#         return jsonify({"msg": "User already exists"}), 409

#     hashed_pw = generate_password_hash(password)

#     mongo.db.users.insert_one({
#         "email": email,
#         "password": hashed_pw,
#         "phone": phone,          # ✅ STORED
#         "role": "user"
#     })

#     return jsonify({"msg": "User created"}), 201

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')
    phone = data.get('phone')

    if not email or not password or not phone:
        return jsonify({"msg": "Email, password and phone are required"}), 400

    # 🔐 CHECK OTP VERIFICATION
    otp_record = mongo.db.otp_verifications.find_one({
        "phone": phone,
        "verified": True
    })

    if not otp_record:
        return jsonify({"msg": "Phone number not verified"}), 403

    if mongo.db.users.find_one({"email": email}):
        return jsonify({"msg": "User already exists"}), 409

    hashed_pw = generate_password_hash(password)

    mongo.db.users.insert_one({
        "email": email,
        "password": hashed_pw,
        "phone": phone,
        "role": "user"
    })

    return jsonify({"msg": "User created"}), 201

# --- LOGIN ---
# @app.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     user = mongo.db.users.find_one({"email": data['email']})

#     if user and check_password_hash(user['password'], data['password']):
#         user_id = str(user['_id'])
#         role = user.get('role', 'user')

#         payload = {
#             "sub": user_id,     # ✅ string now
#             "role": role,
#             "iat": datetime.utcnow(),
#             "exp": datetime.utcnow() + timedelta(hours=24)
#         }

#         # payload = {
#         #     "sub": {"id": user_id},
#         #     "role": role,
#         #    "iat": datetime.utcnow(),
#         #     "exp": datetime.utcnow() + timedelta(hours=24)
#         # }

#         token = jwt.encode(payload, app.config["SECRET_KEY"], algorithm="HS256")

#         return jsonify({
#             "access_token": token,
#             "role": role,
#             "userId": user_id
#         }), 200

#     return jsonify({"msg": "Invalid credentials"}), 401


# @app.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     user = mongo.db.users.find_one({"email": data['email']})

#     if user and check_password_hash(user['password'], data['password']):
#         user_id = str(user['_id'])
#         role = user.get('role', 'user')
        
#         # This logic tells Flutter if the curator has finished their setup
#         is_complete = user.get('is_profile_complete', False) if role == 'curator' else True

#         payload = {
#             "sub": user_id,
#             "email": user['email'],
#             "role": role,
#             "iat": datetime.utcnow(),
#             "exp": datetime.utcnow() + timedelta(hours=24)
#         }

#         token = jwt.encode(payload, app.config["SECRET_KEY"], algorithm="HS256")

#         return jsonify({
#             "access_token": token,
#             "role": role,
#             "userId": user_id,
#             "email": user['email'],
#             "isProfileComplete": is_complete 
#         }), 200

#     return jsonify({"msg": "Invalid credentials"}), 401


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = mongo.db.users.find_one({"email": data['email']})

    if user and check_password_hash(user['password'], data['password']):
        user_id = str(user['_id'])
        role = user.get('role', 'user')
        
        # This logic tells Flutter if the curator has finished their setup
        is_complete = user.get('is_profile_complete', False) if role == 'curator' else True

        payload = {
            "sub": user_id,
            "email": user['email'],
            "role": role,
            "iat": datetime.utcnow(),
            "exp": datetime.utcnow() + timedelta(hours=24)
        }

        token = jwt.encode(payload, app.config["SECRET_KEY"], algorithm="HS256")

        return jsonify({
            "access_token": token,
            "role": role,
            "userId": user_id,
            "email": user['email'],
            "isProfileComplete": is_complete,
            # Fetch these fields so the Profile Page can show them
            "fullName": user.get('full_name', 'Not provided'),
            "phone": user.get('phone', 'Not provided'),
            "position": user.get('position', 'Staff'),
            "affiliation": user.get('affiliation', 'Independent')
        }), 200

    return jsonify({"msg": "Invalid credentials"}), 401



# --- SEND OTP ---
@app.route('/send-otp', methods=['POST'])
def send_otp():
    data = request.get_json()
    phone = data.get('phone')

    if not phone:
        return jsonify({"msg": "Phone number required"}), 400

    # Generate 6-digit OTP
    otp = str(random.randint(100000, 999999))

    expires_at = datetime.utcnow() + timedelta(minutes=5)

    # Remove old OTPs for this phone
    mongo.db.otp_verifications.delete_many({"phone": phone})

    # Store new OTP
    mongo.db.otp_verifications.insert_one({
        "phone": phone,
        "otp": otp,
        "expires_at": expires_at,
        "verified": False
    })

    # TEMP: print OTP (SMS will come later)
    print(f"OTP for {phone} is {otp}")

    return jsonify({"msg": "OTP generated"}), 200

# --- Verify otp ---
@app.route('/verify-otp', methods=['POST'])
def verify_otp():
    data = request.get_json()
    phone = data.get('phone')
    otp = data.get('otp')

    if not phone or not otp:
        return jsonify({"msg": "Phone and OTP required"}), 400

    record = mongo.db.otp_verifications.find_one({
        "phone": phone,
        "otp": otp
    })

    if not record:
        return jsonify({"msg": "Invalid OTP"}), 400

    if record['expires_at'] < datetime.utcnow():
        return jsonify({"msg": "OTP expired"}), 400

    mongo.db.otp_verifications.update_one(
        {"_id": record["_id"]},
        {"$set": {"verified": True}}
    )

    return jsonify({"msg": "OTP verified"}), 200


# --- save plant ---
# @app.route('/plants/add', methods=['POST'])
# def add_user_plant():
#     if user_plant_collection is None:
#         return jsonify({"error": "Database not connected"}), 500
        
#     if 'image' not in request.files:
#         return jsonify({"error": "Image required"}), 400

#     image = request.files['image']

#     image_id = fs.put(
#         image,
#         filename=image.filename,
#         content_type=image.content_type
#     )

#     user_plant_collection.insert_one({
#         "name_common": request.form.get('common_name'),
#         "name_scientific": request.form.get('scientific_name'),
#         "location": request.form.get('location'),
#         "image_id": image_id,
#         "source": "flutter_app",
#         "created_at": datetime.utcnow()
#     })

#     return jsonify({"status": "saved_to_user_plants"}), 201


@app.route('/plants/add', methods=['POST'])
def add_user_plant():

    user_id = get_user_id_from_token()
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    if 'image' not in request.files:
        return jsonify({"error": "Image required"}), 400

    image = request.files['image']

    image_id = fs.put(
        image,
        filename=image.filename,
        content_type=image.content_type
    )

    user_plant_collection.insert_one({
        "user_id": ObjectId(user_id),   # ✅ ADD THIS
        "name_common": request.form.get('common_name'),
        "name_scientific": request.form.get('scientific_name'),
        "location": request.form.get('location'),
        "image_id": image_id,
        "source": "flutter_app",
        "created_at": datetime.utcnow()
    })

    return jsonify({"status": "saved_to_user_plants"}), 201


@app.route('/uploads/history', methods=['GET'])
def get_upload_history():

    user_id = get_user_id_from_token()
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    records = list(
        user_plant_collection
        .find({"user_id": ObjectId(user_id)})
        .sort("created_at", -1)
    )

    records = jsonify_mongo_data(records)

    for r in records:
        r["image_url"] = f"/history/image/{r['image_id']['$oid']}"

    return jsonify(records), 200




@app.route('/history', methods=['GET'])
def get_user_history():

    user_id = get_user_id_from_token()
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    records = list(
        prediction_history_collection
        .find({"user_id": ObjectId(user_id)})
        .sort("created_at", -1)
    )

    records = jsonify_mongo_data(records)

    # attach image route
    for r in records:
        r["image_url"] = f"/history/image/{r['image_id']['$oid']}"

    return jsonify(records), 200


@app.route('/history/image/<file_id>')
def get_history_image(file_id):
    print("Requested file_id:", file_id)

    try:
        obj_id = ObjectId(file_id)
        print("Converted ObjectId:", obj_id)

        grid_out = fs.get(obj_id)

        print("GridFS file found")
        return Response(grid_out.read(), mimetype="image/jpeg")

    except Exception as e:
        print("GridFS error:", e)
        return jsonify({"error": "Image not found"}), 404

@app.route('/complete-curator-profile', methods=['POST'])
@token_required 
def complete_profile(current_user_id):
    data = request.get_json()
    
    try:
        # Saving specific fields: Name, Position, Affiliation, Email
        mongo.db.users.update_one(
            {"_id": ObjectId(current_user_id)},
            {"$set": {
                "full_name": data.get('name'),
                "position": data.get('position'),
                "affiliation": data.get('affiliation'),
                "professional_email": data.get('email'),
                "is_profile_complete": True # Unlocks the dashboard
            }}
        )
        return jsonify({"msg": "Curator profile activated"}), 200
    except Exception as e:
        return jsonify({"msg": "Database update failed", "error": str(e)}), 500


# @app.route('/get-suggestions', methods=['POST'])
# def get_suggestions(): 
#     data = request.get_json()
#     image_url = data.get('image_url')

#     if not image_url:
#         return jsonify({"error": "No image URL provided"}), 400
#     payload = {
#         'api-key': PLANTNET_API_KEY,
#         'images': [image_url],
#         'organs': 'leaf'
#     }

#     try:
#         # We use requests.get because we are passing a URL inside the 'images' list
#         response = requests.get(PLANTNET_API_URL, params=payload, timeout=60)
#         response.raise_for_status()
#         plantnet_data = response.json()

#         if "results" in plantnet_data:
#             return jsonify({
#                 "status": "success",
#                 "results": plantnet_data["results"]
#             }), 200
#         else:
#             return jsonify({"msg": "No suggestions found", "results": []}), 200

#     except Exception as e:
#         print(f"Suggestion Error: {e}")
#         return jsonify({"error": "Failed to fetch AI suggestions"}), 500

@app.route('/get-suggestions', methods=['POST'])
def get_suggestions():

    data = request.get_json()
    image_url = data.get('image_url')

    if not image_url:
        return jsonify({"error": "No image URL provided"}), 400

    try:
        file_id = image_url.split("/")[-1]

        grid_out = fs.get(ObjectId(file_id))
        image_bytes = grid_out.read()

        files = [
            ('images', ('plant.jpg', image_bytes, 'image/jpeg'))
        ]

        params = {
            'api-key': PLANTNET_API_KEY
        }

        data_payload = {
            'organs': 'leaf'
        }

        response = requests.post(
            PLANTNET_API_URL,
            params=params,
            files=files,
            data=data_payload,
            timeout=60
        )

        response.raise_for_status()

        plantnet_data = response.json()

        return jsonify({
            "status": "success",
            "results": plantnet_data.get("results", [])
        }), 200

    except Exception as e:
        print("Suggestion Error:", e)
        return jsonify({"error": str(e)}), 500



@app.route('/admin/all-submissions', methods=['GET'])
def get_all_submissions():
    try:
        # Fetch all prediction history records
        cursor = prediction_history_collection.find().sort("created_at", -1)
        
        records = []
        for doc in cursor:
            records.append({
                "id": str(doc.get("_id")),
                "submittedName": doc.get("plant_name") or "Unknown", # cite: 1
                "score": f"{((doc.get('confidence', 0)) * 100):.1f}%", # cite: 1
                "date": doc.get("created_at").strftime("%Y-%m-%d") if doc.get("created_at") else "N/A", # cite: 1
                "imageId": str(doc.get("image_id")) # cite: 1
            })

        return jsonify({"status": "success", "data": records}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500





if __name__ == '__main__':

    app.run(host="0.0.0.0", port=5001, debug=True, use_reloader=False, threaded=False)
