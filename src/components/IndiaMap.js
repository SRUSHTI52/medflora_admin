// import React from "react";
// import { ComposableMap, Geographies, Geography } from "react-simple-maps";
// import { scaleLinear } from "d3-scale";

// const geoUrl =
//   "https://raw.githubusercontent.com/akshatvg/common-data/main/india_states_topo.json";

// const IndiaMap = ({ data }) => {
//   // data example: [{ state: "Maharashtra", count: 42 }, ...]
//   const max = Math.max(...data.map(d => d.count));
//   const min = Math.min(...data.map(d => d.count));

//   const colorScale = scaleLinear()
//     .domain([min, max])
//     .range(["#FFF0D9", "#E0391F"]); // light → dark

//   const getCount = (stateName) => {
//     const match = data.find(d => d.state.toLowerCase() === stateName.toLowerCase());
//     return match ? match.count : 0;
//   };

//   return (
//     <ComposableMap projection="geoMercator" projectionConfig={{ center: [82.8, 22.5], scale: 1000 }}>
//       <Geographies geography={geoUrl}>
//         {({ geographies }) =>
//           geographies.map((geo) => {
//             const count = getCount(geo.properties.st_nm);
//             return (
//               <Geography
//                 key={geo.rsmKey}
//                 geography={geo}
//                 fill={colorScale(count)}
//                 stroke="#333"
//                 onMouseEnter={() => console.log(`${geo.properties.st_nm}: ${count}`)}
//                 style={{
//                   default: { outline: "none" },
//                   hover: { outline: "none", cursor: "pointer" },
//                 }}
//               />
//             );
//           })
//         }
//       </Geographies>
//     </ComposableMap>
//   );
// };

// export default IndiaMap;


// import React, { useState, useEffect } from "react";
// import { ComposableMap, Geographies, Geography, Annotation } from "react-simple-maps";
// import { scaleSequential } from "d3-scale";
// import { interpolateYlGn } from "d3-scale-chromatic";
// import geoData from "../assets/geoBoundaries-IND-ADM1_simplified.geojson"; 

// const dummyStateCount = {
//   Maharashtra: 125,
//   Karnataka: 98,
//   TamilNadu: 110,
//   Kerala: 76,
//   Gujarat: 85,
//   Rajasthan: 65,
//   Haryana: 55,
//   Punjab: 45,
//   Delhi: 72,
//   UttarPradesh: 105,
//   Bihar: 60,
//   WestBengal: 95,
//   Odisha: 70,
//   MadhyaPradesh: 88,
//   Telangana: 92,
//   AndhraPradesh: 90,
//   Assam: 56,
//   Jharkhand: 49,
//   Chattisgarh: 52,
//   Uttarakhand: 40,
//   HimachalPradesh: 38,
//   JammuKashmir: 50,
//   Goa: 22,
//   Tripura: 18,
//   Meghalaya: 15,
//   Nagaland: 12,
//   Manipur: 14,
//   Mizoram: 10,
//   ArunachalPradesh: 8,
//   Sikkim: 6
// };

// const IndiaMap = () => {
//   const values = Object.values(dummyStateCount);
//   const max = Math.max(...values);
//   const min = Math.min(...values);

//   const colorScale = scaleSequential()
//     .domain([min, max])
//     .interpolator(interpolateYlGn);

//   return (
//     <div className="india-map-container">
//       <ComposableMap projection="geoMercator" projectionConfig={{ scale: 1100, center: [80, 22] }}>
//         <Geographies geography={geoData}>
//           {({ geographies }) =>
//             geographies.map((geo) => {
//               const stateName = geo.properties.shapeName.replace(/\s/g, "");
//               const count = dummyStateCount[stateName] ?? 0;
//               return (
//                 <Geography
//                   key={geo.rsmKey}
//                   geography={geo}
//                   fill={count ? colorScale(count) : "#E5E5E5"}
//                   stroke="#ffffff"
//                   strokeWidth={0.6}
//                   style={{
//                     default: { outline: "none" },
//                     hover: { outline: "none", cursor: "pointer", opacity: 0.8 },
//                     pressed: { outline: "none" }
//                   }}
//                 />
//               );
//             })
//           }
//         </Geographies>

//         {/** COUNT LABELS INSIDE STATES **/}
//         <Geographies geography={geoData}>
//           {({ geographies }) =>
//             geographies.map((geo) => {
//               const stateName = geo.properties.shapeName.replace(/\s/g, "");
//               const count = dummyStateCount[stateName];
//               if (!count) return null;

//               const [x, y] = geo.properties.label_x_y;
//               return (
//                 <Annotation
//                   key={geo.rsmKey + "-label"}
//                   subject={[x, y]}
//                   dx={0}
//                   dy={0}
//                   connectorProps={{ stroke: "none" }}
//                 >
//                   <text
//                     textAnchor="middle"
//                     alignmentBaseline="middle"
//                     style={{
//                       fontSize: 9,
//                       fontWeight: "600",
//                       fill: "#2F4F2F"
//                     }}
//                   >
//                     {count}
//                   </text>
//                 </Annotation>
//               );
//             })
//           }
//         </Geographies>
//       </ComposableMap>

//       {/* Legend */}
//       <div className="map-legend">
//         <span className="legend-title">Heat Intensity</span>
//         <div className="gradient-bar"></div>
//         <div className="legend-labels">
//           <span>{min}</span>
//           <span>{max}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IndiaMap;


// src/components/IndiaMap.js
// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import stateData from "../data/stateData";

// const IndiaMap = () => {
//   const [geoData, setGeoData] = useState(null);

//   useEffect(() => {
//     fetch("/data/india.geojson")
//       .then((response) => response.json())
//       .then((data) => setGeoData(data));
//   }, []);

//   const getColor = (value) => {
//     return value > 80
//       ? "#800026"
//       : value > 60
//       ? "#BD0026"
//       : value > 40
//       ? "#E31A1C"
//       : value > 20
//       ? "#FC4E2A"
//       : "#FFEDA0";
//   };

//   const style = (feature) => {
//     const name = feature.properties.shapeName;
//     const value = stateData[name] || 0;

//     return {
//       fillColor: getColor(value),
//       weight: 1,
//       opacity: 1,
//       color: "#555",
//       fillOpacity: 0.8,
//     };
//   };

//   return (
//     <div>
//       {geoData ? (
//         <MapContainer
//           center={[22.9734, 78.6569]}
//           zoom={5}
//           scrollWheelZoom={false}
//           style={{ height: "500px", width: "100%" }}
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           <GeoJSON data={geoData} style={style} />
//         </MapContainer>
//       ) : (
//         "Loading map..."
//       )}
//     </div>
//   );
// };

// export default IndiaMap;


// import React, { useEffect, useState } from "react";
// import ReactECharts from "echarts-for-react";
// import indiaMap from "../maps/india.json";
// import * as echarts from "echarts";

// const IndiaMap = () => {
//   const [option, setOption] = useState({});

//   useEffect(() => {
//     echarts.registerMap("india", indiaMap);

//     const stateValues = [
//       { name: "Maharashtra", value: 90 },
//       { name: "Gujarat", value: 70 },
//       { name: "Tamil Nadu", value: 55 },
//       { name: "Karnataka", value: 40 },
//       { name: "Delhi", value: 25 },
//       { name: "Rajasthan", value: 15 },
//       { name: "Kerala", value: 10 }
//     ];

//     setOption({
//       tooltip: {
//         trigger: "item",
//         formatter: "{b}: {c}"
//       },
//       visualMap: {
//         min: 0,
//         max: 100,
//         left: "left",
//         bottom: "20px",
//         inRange: {
//           color: ["#d4f7ff", "#0077b6"] // 🌈 gradient start → end
//         },
//         text: ["High", "Low"],
//         calculable: true
//       },
//       series: [
//         {
//           type: "map",
//           map: "india",
//           roam: true, // zoom & drag
//           label: {
//             show: false
//           },
//           data: stateValues
//         }
//       ]
//     });
//   }, []);

//   return <ReactECharts option={option} style={{ height: "600px", width: "100%" }} />;
// };

// export default IndiaMap;


// import React, { useEffect, useState } from "react";
// import ReactECharts from "echarts-for-react";
// import indiaMap from "../maps/india_map.json";
// import * as echarts from "echarts"; // 🔹 IMPORTANT

// const IndiaMap = () => {
//   const [option, setOption] = useState({});

//   useEffect(() => {
//     echarts.registerMap("india", indiaMap);

//     const stateValues = [
//       { name: "Maharashtra", value: 90 },
//       { name: "Gujarat", value: 70 },
//       { name: "Tamil Nadu", value: 55 },
//       { name: "Karnataka", value: 40 },
//       { name: "Delhi", value: 25 },
//       { name: "Rajasthan", value: 15 },
//       { name: "Kerala", value: 10 }
//     ];

//     setOption({
//       tooltip: { trigger: "item", formatter: "{b}: {c}" },
//       visualMap: {
//         min: 0,
//         max: 100,
//         left: "left",
//         bottom: "20px",
//         inRange: { color: ["#d4f7ff", "#0077b6"] },
//         text: ["High", "Low"],
//         calculable: true
//       },
//       series: [
//         {
//           type: "map",
//           map: "india",
//           roam: true,
//           label: { show: false },
//           data: stateValues
//         }
//       ]
//     });
//   }, []);

//   return <ReactECharts option={option} style={{ height: "600px", width: "100%" }} />;
// };

// export default IndiaMap;


// src/components/AbundancyMap.js

// import React, { useEffect, useState } from 'react';
// import { MapContainer, GeoJSON, TileLayer, Tooltip } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css'; 

// // ... (abundancyData, getColor, geoJsonStyle, and onEachFeature functions remain the same) ...

// // --- Data and Helper Functions (Defined OUTSIDE the Component) ---

// // 1. Mock Abundancy Data
// const abundancyData = { /* ... your data ... */ };

// // 2. getColor function
// function getColor(value) { /* ... your logic ... */ } 
// // ------------------------------------------------------------------
// function IndiaMap() {
//  // 3. State Hooks (Defined INSIDE the Component)
//   const [mapCenter] = useState([23.4, 80.96]); 
//   const [zoomLevel] = useState(4);
//   const [geoJsonData, setGeoJsonData] = useState(null); 

//   // 4. useEffect Hook (Defined INSIDE the Component)
//   useEffect(() => {
//     fetch('/geoBoundaries-IND-ADM1_simplified.geojson')
//       .then(res => res.json())
//       .then(setGeoJsonData)
//       .catch(error => console.error("Error loading GeoJSON:", error));
//   }, []);

//   // 5. FUNCTION DEFINITIONS (MUST BE DEFINED INSIDE THE COMPONENT TO BE ACCESSIBLE)
  
//   // Define style for the GeoJSON layer
//   const geoJsonStyle = (feature) => {
//     // This function can now correctly access 'abundancyData' and 'getColor' 
//     // because they are either global (outside) or in scope.
//     const value = abundancyData[feature.properties.shapeName] || 0; 
    
//     return {
//       fillColor: getColor(value),
//       weight: 1.5,
//       // ... rest of the style properties
//     };
//   };

//   // Function to bind popups and manage hover effects
//   const onEachFeature = (feature, layer) => {
//     const name = feature.properties.shapeName;
//     const value = abundancyData[name] || 'N/A';
    
//     layer.bindTooltip(`${name}: ${value}`, { /* ... */ });

//     layer.on({
//       mouseover: (e) => {
//         // ... hover logic ...
//       },
//       mouseout: (e) => {
//         // MUST call geoJsonStyle here, which is now in scope
//         e.target.setStyle(geoJsonStyle(feature)); 
//       },
//       click: (e) => {
//         // ... click logic ...
//       }
//     });
//   };

//   // 6. RENDER (Using the now defined functions)
//   return (
//     <div id="abundancy-map-container" style={{ width: '100%', height: '80vh' }}>
//       {/* ... */}
//       <MapContainer /* ... */ >
//         {/* ... */}
//         {geoJsonData && (
//           <GeoJSON 
//             data={geoJsonData} 
//             style={geoJsonStyle}        // <-- Now defined in this scope
//             onEachFeature={onEachFeature} // <-- Now defined in this scope
//           />
//         )}
//         {/* ... */}
//       </MapContainer>
//     </div>
//   );
// }
// export default IndiaMap;




// AvailabilityMap.jsx
// import React, { useEffect, useState } from "react";
// import { ComposableMap, Geographies, Geography } from "react-simple-maps";
// import { scaleQuantize } from "d3-scale";

// const TOPO_JSON_URL = "/india.topo.json"; // place india.topo.json inside public/

// const PROJECTION_CONFIG = { scale: 600, center: [82, 22] };
// const DEFAULT_COLOR = "#EEE";
// const RARE_COLOR = "#d4e3f4";

// // Dummy Heatmap Data
// const getHeatMapData = () => [
//   { id: "AP", state: "Andhra Pradesh", value: 30 },
//   { id: "AR", state: "Arunanchal Pradesh", value: 10 },
//   { id: "AS", state: "Assam", value: 50 },
//   { id: "BR", state: "Bihar", value: 70 },
//   { id: "CT", state: "Chhattisgarh", value: 100 },
//   { id: "GA", state: "Goa", value: 21 },
//   { id: "GJ", state: "Gujarat", value: 88 },
//   { id: "HR", state: "Haryana", value: 120 },
//   { id: "HP", state: "Himachal Pradesh", value: 45 },
//   { id: "JH", state: "Jharkhand", value: 95 },
//   { id: "KA", state: "Karnataka", value: 62 },
//   { id: "KL", state: "Kerala", value: 15 },
//   { id: "MP", state: "Madhya Pradesh", value: 110 },
//   { id: "MH", state: "Maharashtra", value: 150 },
//   { id: "TN", state: "Tamil Nadu", value: 135 },
//   { id: "TG", state: "Telangana", value: 78 },
//   { id: "UP", state: "Uttar Pradesh", value: 190 },
//   { id: "WB", state: "West Bengal", value: 165 },
//   { id: "DL", state: "Delhi", value: 200 },
// ];

// const data = getHeatMapData();
// const MIN_VALUE = 0;
// const MAX_VALUE = Math.max(...data.map((d) => d.value));

// const colorScale = scaleQuantize()
//   .domain([MIN_VALUE, MAX_VALUE])
//   .range([RARE_COLOR, "#bdd7e7", "#6baed6", "#3182bd", "#08519c"]);

// export default function IndiaMap() {
//   const [topo, setTopo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [tooltip, setTooltip] = useState({
//     text: "",
//     x: 0,
//     y: 0,
//     visible: false,
//   });

//   useEffect(() => {
//     fetch(TOPO_JSON_URL)
//       .then((res) => {
//         if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
//         return res.json();
//       })
//       .then((json) => {
//         setTopo(json);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("TopoJSON fetch error:", err);
//         setErrorMsg(err.message || "Failed to load topojson");
//         setLoading(false);
//       });
//   }, []);

//   const handleEnter = (geo, evt) => {
//     const current = data.find((d) => d.id === geo.id);
//     const val = current ? current.value : "NA";
//     const label = geo.properties?.name || geo.id;

//     setTooltip({
//       text: `${label}: ${val}`,
//       x: evt.clientX + 10,
//       y: evt.clientY + 10,
//       visible: true,
//     });
//   };

//   const handleMove = (evt) => {
//     if (!tooltip.visible) return;
//     setTooltip((prev) => ({
//       ...prev,
//       x: evt.clientX + 10,
//       y: evt.clientY + 10,
//     }));
//   };

//   const handleLeave = () => {
//     setTooltip({ text: "", x: 0, y: 0, visible: false });
//   };

//   if (loading) return <div>Loading map...</div>;
//   if (errorMsg) return <div style={{ color: "crimson" }}>Error: {errorMsg}</div>;
//   if (!topo) return <div>No topojson loaded.</div>;

//   return (
//     <div
//       style={{ textAlign: "center", position: "relative" }}
//       onMouseMove={handleMove}
//     >
//       <h2>India Heatmap</h2>
//       <p>
//         Data Range: {MIN_VALUE} to {MAX_VALUE}
//       </p>

//       <ComposableMap
//         projection="geoMercator"
//         projectionConfig={PROJECTION_CONFIG}
//         width={1200}
//         height={650}
//         style={{ border: "1px solid #ccc" }}
//       >
//         <Geographies geography={topo}>
//           {({ geographies }) =>
//             geographies.map((geo) => {
//               const current = data.find((d) => d.id === geo.id);
//               const fill = current ? colorScale(current.value) : DEFAULT_COLOR;

//               return (
//                 <Geography
//                   key={geo.rsmKey}
//                   geography={geo}
//                   fill={fill}
//                   onMouseEnter={(e) => handleEnter(geo, e)}
//                   onMouseLeave={handleLeave}
//                   style={{
//                     default: { outline: "none" },
//                     hover: {
//                       fill: "#a0a0a0",
//                       stroke: "#333",
//                       strokeWidth: 0.75,
//                       outline: "none",
//                       cursor: "pointer",
//                     },
//                     pressed: { outline: "none" },
//                   }}
//                 />
//               );
//             })
//           }
//         </Geographies>
//       </ComposableMap>

//       {tooltip.visible && (
//         <div
//           style={{
//             position: "fixed",
//             left: tooltip.x,
//             top: tooltip.y,
//             background: "rgba(0,0,0,0.7)",
//             color: "#fff",
//             padding: "6px 8px",
//             borderRadius: 4,
//             pointerEvents: "none",
//             fontSize: 12,
//             zIndex: 9999,
//           }}
//         >
//           {tooltip.text}
//         </div>
//       )}
//     </div>
//   );
// }


// FINAL STATIC DEMO WORKING

// import React, { useEffect, useState } from "react";
// import { ComposableMap, Geographies, Geography } from "react-simple-maps";
// import { scaleQuantize } from "d3-scale";

// const TOPO_JSON_URL = "/india.topo.json"; // place india.topo.json inside public/

// const PROJECTION_CONFIG = { scale: 600, center: [82, 22] };
// const DEFAULT_COLOR = "#EEE";
// const RARE_COLOR = "#d4e3f4";

// // Dummy Heatmap Data
// const getHeatMapData = () => [
//   { id: "AP", state: "Andhra Pradesh", value: 30 },
//   { id: "AR", state: "Arunanchal Pradesh", value: 10 },
//   { id: "AS", state: "Assam", value: 50 },
//   { id: "BR", state: "Bihar", value: 70 },
//   { id: "CT", state: "Chhattisgarh", value: 100 },
//   { id: "GA", state: "Goa", value: 21 },
//   { id: "GJ", state: "Gujarat", value: 88 },
//   { id: "HR", state: "Haryana", value: 120 },
//   { id: "HP", state: "Himachal Pradesh", value: 45 },
//   { id: "JH", state: "Jharkhand", value: 95 },
//   { id: "KA", state: "Karnataka", value: 62 },
//   { id: "KL", state: "Kerala", value: 15 },
//   { id: "MP", state: "Madhya Pradesh", value: 110 },
//   { id: "MH", state: "Maharashtra", value: 150 },
//   { id: "TN", state: "Tamil Nadu", value: 135 },
//   { id: "TG", state: "Telangana", value: 78 },
//   { id: "UP", state: "Uttar Pradesh", value: 190 },
//   { id: "WB", state: "West Bengal", value: 165 },
//   { id: "DL", state: "Delhi", value: 200 },
// ];

// const data = getHeatMapData();
// const MIN_VALUE = 0;
// const MAX_VALUE = Math.max(...data.map((d) => d.value));

// const colorScale = scaleQuantize()
//   .domain([MIN_VALUE, MAX_VALUE])
//   .range([RARE_COLOR, "#bdd7e7", "#6baed6", "#3182bd", "#08519c"]);

// export default function IndiaMap() {
//   const [topo, setTopo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [dimensions, setDimensions] = useState({ width: 100, height: 100 });
//   const [tooltip, setTooltip] = useState({
//     text: "",
//     x: 0,
//     y: 0,
//     visible: false,
//   });

//   useEffect(() => {
//     const updateDimensions = () => {
//       const container = document.querySelector('.analytics-right');
//       if (container) {
//         const width = container.clientWidth - 20; // padding
//         const height = Math.min(width * 0.85, 600); // maintain aspect ratio
//         setDimensions({ width, height });
//       } else {
//         // Fallback if container not found
//         const width = Math.min(window.innerWidth - 100, 800);
//         const height = Math.min(width * 0.75, 600);
//         setDimensions({ width, height });
//       }
//     };

//     updateDimensions();
//     window.addEventListener('resize', updateDimensions);
//     return () => window.removeEventListener('resize', updateDimensions);
//   }, []);

//   useEffect(() => {
//     fetch(TOPO_JSON_URL)
//       .then((res) => {
//         if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
//         return res.json();
//       })
//       .then((json) => {
//         setTopo(json);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("TopoJSON fetch error:", err);
//         setErrorMsg(err.message || "Failed to load topojson");
//         setLoading(false);
//       });
//   }, []);

//   const handleEnter = (geo, evt) => {
//     const current = data.find((d) => d.id === geo.id);
//     const val = current ? current.value : "NA";
//     const label = geo.properties?.name || geo.id;

//     setTooltip({
//       text: `${label}: ${val}`,
//       x: evt.clientX + 10,
//       y: evt.clientY + 10,
//       visible: true,
//     });
//   };

//   const handleMove = (evt) => {
//     if (!tooltip.visible) return;
//     setTooltip((prev) => ({
//       ...prev,
//       x: evt.clientX + 10,
//       y: evt.clientY + 10,
//     }));
//   };

//   const handleLeave = () => {
//     setTooltip({ text: "", x: 0, y: 0, visible: false });
//   };

//   if (loading) return <div style={{ padding: "20px" }}>Loading map...</div>;
//   if (errorMsg) return <div style={{ color: "crimson", padding: "20px" }}>Error: {errorMsg}</div>;
//   if (!topo) return <div style={{ padding: "20px" }}>No topojson loaded.</div>;

//   return (
//     <div
//       style={{ 
//         textAlign: "center", 
//         position: "relative",
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center"
//       }}
//       onMouseMove={handleMove}
//     >
//       <h2 style={{ margin: "10px 0", fontSize: "1.5rem" }}>India Heatmap</h2>
//       <p style={{ margin: "5px 0", fontSize: "0.9rem", color: "#666" }}>
//         Data Range: {MIN_VALUE} to {MAX_VALUE}
//       </p>

//       <ComposableMap
//         projection="geoMercator"
//         projectionConfig={PROJECTION_CONFIG}
//         width={dimensions.width}
//         height={dimensions.height}
//         style={{ border: "1px solid #ccc", maxWidth: "100%" }}
//       >
//         <Geographies geography={topo}>
//           {({ geographies }) =>
//             geographies.map((geo) => {
//               const current = data.find((d) => d.id === geo.id);
//               const fill = current ? colorScale(current.value) : DEFAULT_COLOR;

//               return (
//                 <Geography
//                   key={geo.rsmKey}
//                   geography={geo}
//                   fill={fill}
//                   onMouseEnter={(e) => handleEnter(geo, e)}
//                   onMouseLeave={handleLeave}
//                   style={{
//                     default: { outline: "none" },
//                     hover: {
//                       fill: "#a0a0a0",
//                       stroke: "#333",
//                       strokeWidth: 0.75,
//                       outline: "none",
//                       cursor: "pointer",
//                     },
//                     pressed: { outline: "none" },
//                   }}
//                 />
//               );
//             })
//           }
//         </Geographies>
//       </ComposableMap>

//       {tooltip.visible && (
//         <div
//           style={{
//             position: "fixed",
//             left: tooltip.x,
//             top: tooltip.y,
//             background: "rgba(0,0,0,0.7)",
//             color: "#fff",
//             padding: "6px 8px",
//             borderRadius: 4,
//             pointerEvents: "none",
//             fontSize: 12,
//             zIndex: 9999,
//           }}
//         >
//           {tooltip.text}
//         </div>
//       )}
//     </div>
//   );
// }


// inregrated version 2 working

// import React, { useEffect, useState } from "react";
// import { ComposableMap, Geographies, Geography } from "react-simple-maps";
// import { scaleQuantize } from "d3-scale";

// const TOPO_JSON_URL = "/india.topo.json";
// const API_BASE_URL = "http://127.0.0.1:5001"; // 🔧 Change to your Flask server URL

// const PROJECTION_CONFIG = { scale: 600, center: [82, 22] };
// const DEFAULT_COLOR = "#EEE";
// const RARE_COLOR = "#d4e3f4";

// // Maps every state/UT name (as stored in YOUR DB) → TopoJSON geo.id
// // 🔧 If a state still doesn't colour in, console.log the name from /states
// //    and add/fix the entry below.
// const STATE_NAME_TO_ID = {
//   "Andhra Pradesh": "AP",
//   "Arunachal Pradesh": "AR",
//   "Assam": "AS",
//   "Bihar": "BR",
//   "Chattisgarh": "CT",
//   "Goa": "GA",
//   "Gujarat": "GJ",
//   "Haryana": "HR",
//   "Himachal Pradesh": "HP",
//   "Jharkhand": "JH",
//   "Karnataka": "KA",
//   "Kerala": "KL",
//   "Madhya Pradesh": "MP",
//   "Maharastra": "MH",
//   "Manipur": "MN",
//   "Meghalaya": "ML",
//   "Mizoram": "MZ",
//   "Nagaland": "NL",
//   "Odisha": "OD",
//   "Punjab": "PB",
//   "Rajasthan": "RJ",
//   "Sikkim": "SK",
//   "Tamil Nadu": "TN",
//   "Telangana": "TG",
//   "Tripura": "TR",
//   "Uttar Pradesh": "UP",
//   "Uttarakhand": "UT",
//   "West Bengal": "WB",
//   "Delhi": "DL",
//   "Jammu And Kashmir": "JK",
//   "Jammu and Kashmir": "JK",   // common spelling variants
//   "Jammu & Kashmir": "JK",
//   "Ladhak": "LA",
//   "Puducherry": "PY",
//   "Pondicherry": "PY",
//   "Andaman Nicobar": "AN",
//   "Andaman Nicobar": "AN",
//   "Chandigarh": "CH",
//   "Dadra And Nagar Haveli": "DN",
//   "Dadra And Nagar Haveli": "DN",
//   "Lakshawadeep": "LD",
// };

// export default function IndiaMap() {
//   const [topo, setTopo] = useState(null);
//   // heatmapData: { geoId: count }  e.g. { "KL": 42, "MH": 130 }
//   const [heatmapData, setHeatmapData] = useState({});
//   // Keep raw API names too so tooltip can show the real DB name
//   const [idToLabel, setIdToLabel] = useState({});
//   const [maxValue, setMaxValue] = useState(1);
//   const [topoLoading, setTopoLoading] = useState(true);
//   const [dataLoading, setDataLoading] = useState(true);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [dimensions, setDimensions] = useState({ width: 100, height: 100 });
//   const [tooltip, setTooltip] = useState({ text: "", x: 0, y: 0, visible: false });

//   // --- Responsive dimensions ---
//   useEffect(() => {
//     const updateDimensions = () => {
//       const container = document.querySelector(".analytics-right");
//       if (container) {
//         const width = container.clientWidth - 20;
//         const height = Math.min(width * 0.85, 600);
//         setDimensions({ width, height });
//       } else {
//         const width = Math.min(window.innerWidth - 100, 800);
//         const height = Math.min(width * 0.75, 600);
//         setDimensions({ width, height });
//       }
//     };
//     updateDimensions();
//     window.addEventListener("resize", updateDimensions);
//     return () => window.removeEventListener("resize", updateDimensions);
//   }, []);

//   // --- Load TopoJSON ---
//   useEffect(() => {
//     fetch(TOPO_JSON_URL)
//       .then((res) => {
//         if (!res.ok) throw new Error(`TopoJSON fetch failed: ${res.status}`);
//         return res.json();
//       })
//       .then((json) => {
//         setTopo(json);
//         setTopoLoading(false);
//       })
//       .catch((err) => {
//         console.error("TopoJSON fetch error:", err);
//         setErrorMsg(err.message || "Failed to load map data");
//         setTopoLoading(false);
//       });
//   }, []);

//   // --- Single call to /states → build { geoId: count } map ---
//   useEffect(() => {
//     setDataLoading(true);

//     fetch(`${API_BASE_URL}/states`)
//       .then((res) => {
//         if (!res.ok) throw new Error(`/states fetch failed: ${res.status}`);
//         return res.json();
//       })
//       .then(({ status, data }) => {
//         if (status !== "success" || !Array.isArray(data)) {
//           throw new Error("Unexpected response from /states");
//         }

//         const countMap = {};
//         const labelMap = {};
//         let max = 0;
//         const unmatched = [];

//         data.forEach(({ name, count }) => {
//           const geoId = STATE_NAME_TO_ID[name];
//           if (geoId) {
//             countMap[geoId] = count;
//             labelMap[geoId] = name; // store exact DB name for tooltip
//             if (count > max) max = count;
//           } else {
//             // Log anything that didn't match so you can fix the lookup table
//             unmatched.push(name);
//           }
//         });

//         if (unmatched.length > 0) {
//           console.warn(
//             "⚠️ IndiaMap: These state names from /states had no matching geo ID.\n" +
//             "Add them to STATE_NAME_TO_ID in IndiaMap.js:\n",
//             unmatched
//           );
//         }

//         setHeatmapData(countMap);
//         setIdToLabel(labelMap);
//         setMaxValue(max || 1);
//         setDataLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching /states:", err);
//         // Don't block the map — just show it empty
//         setDataLoading(false);
//       });
//   }, []);

//   // Color scale — recomputes whenever maxValue changes
//   const colorScale = scaleQuantize()
//     .domain([0, maxValue])
//     .range([RARE_COLOR, "#bdd7e7", "#6baed6", "#3182bd", "#08519c"]);

//   // --- Tooltip handlers ---
//   const handleEnter = (geo, evt) => {
//     const count = heatmapData[geo.id];
//     const label = idToLabel[geo.id] || geo.properties?.name || geo.id;
//     const val = dataLoading
//       ? "Loading..."
//       : count !== undefined
//       ? `${count} plants`
//       : "No data";

//     setTooltip({ text: `${label}: ${val}`, x: evt.clientX + 10, y: evt.clientY + 10, visible: true });
//   };

//   const handleMove = (evt) => {
//     if (!tooltip.visible) return;
//     setTooltip((prev) => ({ ...prev, x: evt.clientX + 10, y: evt.clientY + 10 }));
//   };

//   const handleLeave = () => setTooltip({ text: "", x: 0, y: 0, visible: false });

//   if (topoLoading) return <div style={{ padding: "20px" }}>Loading map...</div>;
//   if (errorMsg) return <div style={{ color: "crimson", padding: "20px" }}>Error: {errorMsg}</div>;
//   if (!topo) return <div style={{ padding: "20px" }}>No topojson loaded.</div>;

//   return (
//     <div
//       style={{
//         textAlign: "center",
//         position: "relative",
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//       onMouseMove={handleMove}
//     >
//       <h2 style={{ margin: "10px 0", fontSize: "1.5rem" }}>India Medicinal Plants Heatmap</h2>
//       <p style={{ margin: "5px 0", fontSize: "0.9rem", color: "#666" }}>
//         {dataLoading ? "Fetching plant data..." : `Data Range: 0 – ${maxValue} plants per state`}
//       </p>

//       {/* Legend */}
//       {!dataLoading && (
//         <div style={{ display: "flex", gap: "6px", alignItems: "center", marginBottom: "8px", fontSize: "0.75rem", color: "#444" }}>
//           <span>Fewer</span>
//           {[RARE_COLOR, "#bdd7e7", "#6baed6", "#3182bd", "#08519c"].map((c) => (
//             <div key={c} style={{ width: 24, height: 14, background: c, border: "1px solid #aaa" }} />
//           ))}
//           <span>More</span>
//         </div>
//       )}

//       <ComposableMap
//         projection="geoMercator"
//         projectionConfig={PROJECTION_CONFIG}
//         width={dimensions.width}
//         height={dimensions.height}
//         style={{ border: "1px solid #ccc", maxWidth: "100%" }}
//       >
//         <Geographies geography={topo}>
//           {({ geographies }) =>
//             geographies.map((geo) => {
//               const count = heatmapData[geo.id];
//               const fill = dataLoading
//                 ? "#ddd"                                    // neutral while loading
//                 : count > 0
//                 ? colorScale(count)                         // real colour
//                 : DEFAULT_COLOR;                            // 0 or no data

//               return (
//                 <Geography
//                   key={geo.rsmKey}
//                   geography={geo}
//                   fill={fill}
//                   onMouseEnter={(e) => handleEnter(geo, e)}
//                   onMouseLeave={handleLeave}
//                   style={{
//                     default: { outline: "none" },
//                     hover: { fill: "#a0a0a0", stroke: "#333", strokeWidth: 0.75, outline: "none", cursor: "pointer" },
//                     pressed: { outline: "none" },
//                   }}
//                 />
//               );
//             })
//           }
//         </Geographies>
//       </ComposableMap>

//       {tooltip.visible && (
//         <div
//           style={{
//             position: "fixed",
//             left: tooltip.x,
//             top: tooltip.y,
//             background: "rgba(0,0,0,0.7)",
//             color: "#fff",
//             padding: "6px 8px",
//             borderRadius: 4,
//             pointerEvents: "none",
//             fontSize: 12,
//             zIndex: 9999,
//           }}
//         >
//           {tooltip.text}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantize } from "d3-scale";

const TOPO_JSON_URL = "/india.topo.json";
const API_BASE_URL = "http://127.0.0.1:5001"; // 🔧 Change to your Flask server URL

// const PROJECTION_CONFIG = { scale: 600, center: [82, 22] };
const PROJECTION_CONFIG = {
  scale: 1000,               // 🔥 zoom level (key)
  center: [82.8, 22.6],      // 🔥 longitude, latitude of India
};
const DEFAULT_COLOR = "#EEE";
const RARE_COLOR = "#d4e3f4";

// Maps every state/UT name (as stored in YOUR DB) → TopoJSON geo.id
// 🔧 If a state still doesn't colour in, console.log the name from /states
//    and add/fix the entry below.
const STATE_NAME_TO_ID = {
  "Andhra Pradesh": "AP",
  "Arunachal Pradesh": "AR",
  "Assam": "AS",
  "Bihar": "BR",
  "Chattisgarh": "CT",
  "Goa": "GA",
  "Gujarat": "GJ",
  "Haryana": "HR",
  "Himachal Pradesh": "HP",
  "Jharkhand": "JH",
  "Karnataka": "KA",
  "Kerala": "KL",
  "Madhya Pradesh": "MP",
  "Maharastra": "MH",
  "Manipur": "MN",
  "Meghalaya": "ML",
  "Mizoram": "MZ",
  "Nagaland": "NL",
  "Odisha": "OD",
  "Punjab": "PB",
  "Rajasthan": "RJ",
  "Sikkim": "SK",
  "Tamil Nadu": "TN",
  "Telangana": "TS",
  "Tripura": "TR",
  "Uttar Pradesh": "UP",
  "Uttarakhand": "UK",
  "West Bengal": "WB",
  "Delhi": "DL",
  "Jammu And Kashmir": "JK",
  "Jammu and Kashmir": "JK",   // common spelling variants
  "Jammu & Kashmir": "JK",
  "Ladhak": "LA",
  "Puducherry": "PY",
  "Pondicherry": "PY",
  "Andaman Nicobar": "AN",
  "Andaman Nicobar": "AN",
  "Chandigarh": "CH",
  "Dadra And Nagar Haveli": "DN",
  "Dadra And Nagar Haveli": "DN",
  "Lakshawadeep": "LD",
};

export default function IndiaMap() {
  const [topo, setTopo] = useState(null);
  // heatmapData: { geoId: count }  e.g. { "KL": 42, "MH": 130 }
  const [heatmapData, setHeatmapData] = useState({});
  // Keep raw API names too so tooltip can show the real DB name
  const [idToLabel, setIdToLabel] = useState({});
  const [maxValue, setMaxValue] = useState(1);
  const [topoLoading, setTopoLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 100, height: 100 });
  const [tooltip, setTooltip] = useState({ text: "", x: 0, y: 0, visible: false });

  // --- Responsive dimensions ---
  useEffect(() => {
    const updateDimensions = () => {
      const container = document.querySelector(".analytics-right");
      if (container) {
        const width = container.clientWidth - 20;
        const height = Math.min(width * 0.85, 600);
        setDimensions({ width, height });
      } else {
        const width = Math.min(window.innerWidth - 100, 800);
        const height = Math.min(width * 0.75, 600);
        setDimensions({ width, height });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // --- Load TopoJSON ---
  useEffect(() => {
    fetch(TOPO_JSON_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`TopoJSON fetch failed: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setTopo(json);
        setTopoLoading(false);
      })
      .catch((err) => {
        console.error("TopoJSON fetch error:", err);
        setErrorMsg(err.message || "Failed to load map data");
        setTopoLoading(false);
      });
  }, []);

  // --- Single call to /states → build { geoId: count } map ---
  useEffect(() => {
    setDataLoading(true);

    fetch(`${API_BASE_URL}/states`)
      .then((res) => {
        if (!res.ok) throw new Error(`/states fetch failed: ${res.status}`);
        return res.json();
      })
      .then(({ status, data }) => {
        if (status !== "success" || !Array.isArray(data)) {
          throw new Error("Unexpected response from /states");
        }

        // 🪵 Debug: print every state name + count returned by the API
        console.log("📦 /states API response:");
        console.table(data.map(({ name, count }) => ({ "State Name": name, "Plant Count": count })));

        const countMap = {};
        const labelMap = {};
        let max = 0;
        const unmatched = [];

        data.forEach(({ name, count }) => {
          const geoId = STATE_NAME_TO_ID[name];
          if (geoId) {
            countMap[geoId] = count;
            labelMap[geoId] = name; // store exact DB name for tooltip
            if (count > max) max = count;
          } else {
            // Log anything that didn't match so you can fix the lookup table
            unmatched.push(name);
          }
        });

        if (unmatched.length > 0) {
          console.warn(
            "⚠️ IndiaMap: These state names from /states had no matching geo ID.\n" +
            "Add them to STATE_NAME_TO_ID in IndiaMap.js:\n",
            unmatched
          );
        }

        setHeatmapData(countMap);
        setIdToLabel(labelMap);
        setMaxValue(max || 1);
        setDataLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching /states:", err);
        // Don't block the map — just show it empty
        setDataLoading(false);
      });
  }, []);

  // Color scale — recomputes whenever maxValue changes
  const colorScale = scaleQuantize()
    .domain([0, maxValue])
    .range([RARE_COLOR, "#bdd7e7", "#6baed6", "#3182bd", "#08519c"]);

  // --- Tooltip handlers ---
  const handleEnter = (geo, evt) => {
    const count = heatmapData[geo.id];
    const label = idToLabel[geo.id] || geo.properties?.name || geo.id;
    const val = dataLoading
      ? "Loading..."
      : count !== undefined
      ? `${count} plants`
      : "No data";

    setTooltip({ text: `${label}: ${val}`, x: evt.clientX + 10, y: evt.clientY + 10, visible: true });
  };

  const handleMove = (evt) => {
    if (!tooltip.visible) return;
    setTooltip((prev) => ({ ...prev, x: evt.clientX + 10, y: evt.clientY + 10 }));
  };

  const handleLeave = () => setTooltip({ text: "", x: 0, y: 0, visible: false });

  if (topoLoading) return <div style={{ padding: "20px" }}>Loading map...</div>;
  if (errorMsg) return <div style={{ color: "crimson", padding: "20px" }}>Error: {errorMsg}</div>;
  if (!topo) return <div style={{ padding: "20px" }}>No topojson loaded.</div>;

  return (
    <div
  onMouseMove={handleMove}
  style={{
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    alignItems: "center",
  }}
>
  {/* Header */}
  <div style={{ marginBottom: 8 }}>
    <h2 style={{ margin: 0, fontSize: "1.4rem" }}>
      India Medicinal Plants Heatmap
    </h2>
    <p style={{ margin: "4px 0", fontSize: "0.85rem", color: "#6b7280" }}>
      {dataLoading
        ? "Fetching plant data..."
        : `Data Range: 0 – ${maxValue} plants per state`}
    </p>

    {/* Legend */}
    {!dataLoading && (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: "0.75rem",
          marginTop: 6,
        }}
      >
        <span>Fewer</span>
        {[RARE_COLOR, "#bdd7e7", "#6baed6", "#3182bd", "#08519c"].map((c) => (
          <div
            key={c}
            style={{
              width: 22,
              height: 12,
              background: c,
              border: "1px solid #aaa",
            }}
          />
        ))}
        <span>More</span>
      </div>
    )}
  </div>

  {/* MAP AREA */}
  <div style={{ flex: 1, width: "100%", position: "relative" }}>
    <ComposableMap
      projection="geoMercator"
      projectionConfig={PROJECTION_CONFIG}
      style={{ width: "100%", height: "100%" }}
        viewBox="0 0 800 600"
  preserveAspectRatio="xMidYMid meet"
    >
      <Geographies geography={topo}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const count = heatmapData[geo.id];
            const fill = dataLoading
              ? "#e5e7eb"
              : count > 0
              ? colorScale(count)
              : DEFAULT_COLOR;

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={fill}
                onMouseEnter={(e) => handleEnter(geo, e)}
                onMouseLeave={handleLeave}
                style={{
                  default: { outline: "none" },
                  hover: {
                    fill: "#9ca3af",
                    stroke: "#111827",
                    strokeWidth: 0.6,
                    cursor: "pointer",
                  },
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  </div>

  {/* Tooltip */}
  {tooltip.visible && (
    <div
      style={{
        position: "fixed",
        left: tooltip.x,
        top: tooltip.y,
        background: "rgba(0,0,0,0.75)",
        color: "#fff",
        padding: "6px 8px",
        borderRadius: 6,
        fontSize: 12,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      {tooltip.text}
    </div>
  )}
</div>
    // <div
    //   style={{
    //     textAlign: "center",
    //     position: "relative",
    //     width: "100%",
    //     height: "100%",
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //   }}
    //   onMouseMove={handleMove}
    // >
    //   <h2 style={{ margin: "10px 0", fontSize: "1.5rem" }}>India Medicinal Plants Heatmap</h2>
    //   <p style={{ margin: "5px 0", fontSize: "0.9rem", color: "#666" }}>
    //     {dataLoading ? "Fetching plant data..." : `Data Range: 0 – ${maxValue} plants per state`}
    //   </p>

    //   {/* Legend */}
    //   {!dataLoading && (
    //     <div style={{ display: "flex", gap: "6px", alignItems: "center", marginBottom: "8px", fontSize: "0.75rem", color: "#444" }}>
    //       <span>Fewer</span>
    //       {[RARE_COLOR, "#bdd7e7", "#6baed6", "#3182bd", "#08519c"].map((c) => (
    //         <div key={c} style={{ width: 24, height: 14, background: c, border: "1px solid #aaa" }} />
    //       ))}
    //       <span>More</span>
    //     </div>
    //   )}

    //   <ComposableMap
    //     projection="geoMercator"
    //     projectionConfig={PROJECTION_CONFIG}
    //     width={dimensions.width}
    //     height={dimensions.height}
    //     style={{ border: "1px solid #ccc", maxWidth: "100%" }}
    //   >
    //     <Geographies geography={topo}>
    //       {({ geographies }) =>
    //         geographies.map((geo) => {
    //           const count = heatmapData[geo.id];
    //           const fill = dataLoading
    //             ? "#ddd"                                    // neutral while loading
    //             : count > 0
    //             ? colorScale(count)                         // real colour
    //             : DEFAULT_COLOR;                            // 0 or no data

    //           return (
    //             <Geography
    //               key={geo.rsmKey}
    //               geography={geo}
    //               fill={fill}
    //               onMouseEnter={(e) => handleEnter(geo, e)}
    //               onMouseLeave={handleLeave}
    //               style={{
    //                 default: { outline: "none" },
    //                 hover: { fill: "#a0a0a0", stroke: "#333", strokeWidth: 0.75, outline: "none", cursor: "pointer" },
    //                 pressed: { outline: "none" },
    //               }}
    //             />
    //           );
    //         })
    //       }
    //     </Geographies>
    //   </ComposableMap>

    //   {tooltip.visible && (
    //     <div
    //       style={{
    //         position: "fixed",
    //         left: tooltip.x,
    //         top: tooltip.y,
    //         background: "rgba(0,0,0,0.7)",
    //         color: "#fff",
    //         padding: "6px 8px",
    //         borderRadius: 4,
    //         pointerEvents: "none",
    //         fontSize: 12,
    //         zIndex: 9999,
    //       }}
    //     >
    //       {tooltip.text}
    //     </div>
    //   )}
    // </div>
  );
}

// import React, { useEffect, useState, useMemo } from "react";
// import { ComposableMap, Geographies, Geography } from "react-simple-maps";
// import { scaleQuantize } from "d3-scale";

// const TOPO_JSON_URL = "/india.topo.json";
// const API_BASE_URL = "http://127.0.0.1:5001"; // 🔧 Change to your Flask server URL

// const PROJECTION_CONFIG = { scale: 600, center: [82, 22] };
// const DEFAULT_COLOR = "#EEE";
// const RARE_COLOR = "#d4e3f4";

// // ─── Fuzzy Matching Helpers ───────────────────────────────────────────────────

// // Lowercase, strip the word "and", remove all non-alpha characters
// // "Andaman And Nicobar Islands" → "andamannicobarislands"
// // "Maharastra"                  → "maharastra"
// // "Maharashtra"                 → "maharashtra"
// const normalize = (str) =>
//   str.toLowerCase().replace(/\band\b/gi, "").replace(/[^a-z]/g, "");

// // Classic Levenshtein distance — counts minimum single-char edits to turn a → b
// const levenshtein = (a, b) => {
//   const m = a.length, n = b.length;
//   // Build (m+1) x (n+1) grid
//   const dp = Array.from({ length: m + 1 }, (_, i) =>
//     Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
//   );
//   for (let i = 1; i <= m; i++)
//     for (let j = 1; j <= n; j++)
//       dp[i][j] =
//         a[i - 1] === b[j - 1]
//           ? dp[i - 1][j - 1]
//           : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
//   return dp[m][n];
// };

// // Given a DB state name, find the closest TopoJSON geo using a 3-tier strategy:
// //   1. Exact normalized match        → distance 0
// //   2. One string contains the other → distance 0.5 (near-exact)
// //   3. Levenshtein ≤ 20% of length   → actual edit distance
// // Returns the best-matching geo object, or null if nothing is close enough.
// const findBestGeo = (dbName, geosMeta) => {
//   const dbNorm = normalize(dbName);
//   let bestGeo = null;
//   let bestDist = Infinity;

//   geosMeta.forEach((geo) => {
//     const geoNorm = normalize(geo.name);

//     if (geoNorm === dbNorm) {
//       // Tier 1: exact
//       bestGeo = geo;
//       bestDist = 0;
//       return;
//     }

//     if (geoNorm.includes(dbNorm) || dbNorm.includes(geoNorm)) {
//       // Tier 2: containment  e.g. "Andaman Nicobar" ⊂ "Andaman And Nicobar Islands"
//       if (0.5 < bestDist) { bestGeo = geo; bestDist = 0.5; }
//       return;
//     }

//     // Tier 3: spelling-error tolerance via Levenshtein
//     const dist = levenshtein(dbNorm, geoNorm);
//     // Allow edits up to 20% of the longer string's normalised length
//     const threshold = Math.ceil(Math.max(dbNorm.length, geoNorm.length) * 0.20);
//     if (dist <= threshold && dist < bestDist) {
//       bestGeo = geo;
//       bestDist = dist;
//     }
//   });

//   return bestGeo;
// };

// // ─── Component ────────────────────────────────────────────────────────────────

// export default function IndiaMap() {
//   const [topo, setTopo]             = useState(null);
//   const [apiData, setApiData]       = useState([]);   // [{name, count}] from /states
//   const [topoLoading, setTopoLoading] = useState(true);
//   const [dataLoading, setDataLoading] = useState(true);
//   const [errorMsg, setErrorMsg]     = useState(null);
//   const [dimensions, setDimensions] = useState({ width: 100, height: 100 });
//   const [tooltip, setTooltip]       = useState({ text: "", x: 0, y: 0, visible: false });

//   // Responsive container sizing
//   useEffect(() => {
//     const update = () => {
//       const container = document.querySelector(".analytics-right");
//       if (container) {
//         const width = container.clientWidth - 20;
//         setDimensions({ width, height: Math.min(width * 0.85, 600) });
//       } else {
//         const width = Math.min(window.innerWidth - 100, 800);
//         setDimensions({ width, height: Math.min(width * 0.75, 600) });
//       }
//     };
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);

//   // Load TopoJSON
//   useEffect(() => {
//     fetch(TOPO_JSON_URL)
//       .then((r) => { if (!r.ok) throw new Error(`TopoJSON ${r.status}`); return r.json(); })
//       .then((json) => { setTopo(json); setTopoLoading(false); })
//       .catch((err) => { console.error(err); setErrorMsg(err.message); setTopoLoading(false); });
//   }, []);

//   // Fetch /states
//   useEffect(() => {
//     fetch(`${API_BASE_URL}/states`)
//       .then((r) => { if (!r.ok) throw new Error(`/states ${r.status}`); return r.json(); })
//       .then(({ status, data }) => {
//         if (status !== "success" || !Array.isArray(data)) throw new Error("Bad /states response");
//         console.log("📦 /states API response:");
//         console.table(data.map(({ name, count }) => ({ "State Name": name, "Plant Count": count })));
//         setApiData(data);
//         setDataLoading(false);
//       })
//       .catch((err) => { console.error(err); setDataLoading(false); });
//   }, []);

//   // Build { geoId → { count, dbName } } once both topo and apiData are ready
//   const { heatmapData, maxValue } = useMemo(() => {
//     if (!topo || apiData.length === 0) return { heatmapData: {}, maxValue: 1 };

//     const topoKey = Object.keys(topo.objects || {})[0];
//     if (!topoKey) return { heatmapData: {}, maxValue: 1 };

//     // Lightweight list of every geo's id + name for matching
//     const geosMeta = (topo.objects[topoKey].geometries || []).map((g) => ({
//       id:   g.id,
//       name: g.properties?.name || g.id || "",
//     }));

//     const result    = {};
//     let   max       = 0;
//     const unmatched = [];

//     apiData.forEach(({ name, count }) => {
//       const geo = findBestGeo(name, geosMeta);
//       if (geo) {
//         result[geo.id] = { count, dbName: name };
//         if (count > max) max = count;
//       } else {
//         unmatched.push(name);
//       }
//     });

//     if (unmatched.length > 0) {
//       console.warn("⚠️ Could not match these DB state names to any TopoJSON region:", unmatched);
//     }
//     console.log("✅ Matched heatmap entries:", result);

//     return { heatmapData: result, maxValue: max || 1 };
//   }, [topo, apiData]);

//   const colorScale = scaleQuantize()
//     .domain([0, maxValue])
//     .range([RARE_COLOR, "#bdd7e7", "#6baed6", "#3182bd", "#08519c"]);

//   // Tooltip
//   const handleEnter = (geo, evt) => {
//     const entry = heatmapData[geo.id];
//     const label = entry ? entry.dbName : (geo.properties?.name || geo.id);
//     const val   = dataLoading ? "Loading…" : entry ? `${entry.count} plants` : "No data";
//     setTooltip({ text: `${label}: ${val}`, x: evt.clientX + 10, y: evt.clientY + 10, visible: true });
//   };
//   const handleMove  = (evt) => {
//     if (!tooltip.visible) return;
//     setTooltip((p) => ({ ...p, x: evt.clientX + 10, y: evt.clientY + 10 }));
//   };
//   const handleLeave = () => setTooltip({ text: "", x: 0, y: 0, visible: false });

//   if (topoLoading) return <div style={{ padding: 20 }}>Loading map…</div>;
//   if (errorMsg)    return <div style={{ padding: 20, color: "crimson" }}>Error: {errorMsg}</div>;
//   if (!topo)       return <div style={{ padding: 20 }}>No topojson loaded.</div>;

//   return (
//     <div
//       style={{ textAlign: "center", position: "relative", width: "100%", height: "100%",
//                display: "flex", flexDirection: "column", alignItems: "center" }}
//       onMouseMove={handleMove}
//     >
//       <h2 style={{ margin: "10px 0", fontSize: "1.5rem" }}>India Medicinal Plants Heatmap</h2>
//       <p style={{ margin: "5px 0", fontSize: "0.9rem", color: "#666" }}>
//         {dataLoading ? "Fetching plant data…" : `Range: 0 – ${maxValue} plants per state`}
//       </p>

//       {/* Colour legend */}
//       {!dataLoading && (
//         <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 8,
//                       fontSize: "0.75rem", color: "#444" }}>
//           <span>Fewer</span>
//           {[RARE_COLOR, "#bdd7e7", "#6baed6", "#3182bd", "#08519c"].map((c) => (
//             <div key={c} style={{ width: 24, height: 14, background: c, border: "1px solid #aaa" }} />
//           ))}
//           <span>More</span>
//         </div>
//       )}

//       <ComposableMap
//         projection="geoMercator"
//         projectionConfig={PROJECTION_CONFIG}
//         width={dimensions.width}
//         height={dimensions.height}
//         style={{ border: "1px solid #ccc", maxWidth: "100%" }}
//       >
//         <Geographies geography={topo}>
//           {({ geographies }) =>
//             geographies.map((geo) => {
//               const entry = heatmapData[geo.id];
//               const fill  = dataLoading
//                 ? "#ddd"
//                 : entry?.count > 0
//                 ? colorScale(entry.count)
//                 : DEFAULT_COLOR;

//               return (
//                 <Geography
//                   key={geo.rsmKey}
//                   geography={geo}
//                   fill={fill}
//                   onMouseEnter={(e) => handleEnter(geo, e)}
//                   onMouseLeave={handleLeave}
//                   style={{
//                     default: { outline: "none" },
//                     hover:   { fill: "#a0a0a0", stroke: "#333", strokeWidth: 0.75,
//                                outline: "none", cursor: "pointer" },
//                     pressed: { outline: "none" },
//                   }}
//                 />
//               );
//             })
//           }
//         </Geographies>
//       </ComposableMap>

//       {tooltip.visible && (
//         <div style={{ position: "fixed", left: tooltip.x, top: tooltip.y, zIndex: 9999,
//                       background: "rgba(0,0,0,0.7)", color: "#fff", padding: "6px 8px",
//                       borderRadius: 4, pointerEvents: "none", fontSize: 12 }}>
//           {tooltip.text}
//         </div>
//       )}
//     </div>
//   );
// }