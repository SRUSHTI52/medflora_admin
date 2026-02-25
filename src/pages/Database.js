// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";

// const db = [
//   { sci: "Azadirachta indica", common: "Neem", state: ["MH", "KA", "MP"], use: "Skin & Immunity", comp: "Nimbin, Azadirachtin" },
//   { sci: "Ocimum tenuiflorum", common: "Tulsi", state: ["UP", "TN", "HR"], use: "Cold & Fever", comp: "Eugenol, Ursolic Acid" },
//   { sci: "Aloe barbadensis", common: "Aloe Vera", state: ["RJ", "GJ", "MH"], use: "Burns & Digestion", comp: "Aloin, Emodin" },
// ];

// export default function Database() {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="ml-60 w-full">
//         <Topbar />
//         <div className="p-6">
//           <h2 className="text-2xl font-bold mb-4">Main Database</h2>
//           <table className="bg-white shadow rounded w-full">
//             <thead className="bg-green-900 text-white">
//               <tr>
//                 <th className="p-2">Scientific Name</th>
//                 <th className="p-2">Common Name</th>
//                 <th className="p-2">Location</th>
//                 <th className="p-2">Therapeutic Use</th>
//                 <th className="p-2">Composition</th>
//               </tr>
//             </thead>
//             <tbody>
//               {db.map((p) => (
//                 <tr key={p.sci} className="border">
//                   <td className="p-2">{p.sci}</td>
//                   <td className="p-2">{p.common}</td>
//                   <td className="p-2">{p.state.join(", ")}</td>
//                   <td className="p-2">{p.use}</td>
//                   <td className="p-2">{p.comp}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }


// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";

// const db = [
//   { sci: "Azadirachta indica", common: "Neem", state: ["MH", "KA", "MP"], use: "Skin & Immunity", comp: "Nimbin, Azadirachtin" },
//   { sci: "Ocimum tenuiflorum", common: "Tulsi", state: ["UP", "TN", "HR"], use: "Cold & Fever", comp: "Eugenol, Ursolic Acid" },
//   { sci: "Aloe barbadensis", common: "Aloe Vera", state: ["RJ", "GJ", "MH"], use: "Burns & Digestion", comp: "Aloin, Emodin" },
// ];

// export default function Database() {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="ml-60 w-full">
//         <Topbar />
//         <div className="p-6">
//           <h2 className="text-2xl font-bold mb-4">Main Database</h2>
//           <table className="table">
//             <thead className="bg-green-900 text-white">
//               <tr>
//                 <th className="p-2">Scientific Name</th>
//                 <th className="p-2">Common Name</th>
//                 <th className="p-2">Location</th>
//                 <th className="p-2">Therapeutic Use</th>
//                 <th className="p-2">Composition</th>
//               </tr>
//             </thead>
//             <tbody>
//               {db.map((p) => (
//                 <tr key={p.sci} className="border">
//                   <td className="p-2">{p.sci}</td>
//                   <td className="p-2">{p.common}</td>
//                   <td className="p-2">{p.state.join(", ")}</td>
//                   <td className="p-2">{p.use}</td>
//                   <td className="p-2">{p.comp}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }


// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";
// import "../styles/database.css";

// const db = [
//   { sci: "Azadirachta indica", common: "Neem", state: ["MH", "KA", "MP"], use: "Skin & Immunity", comp: "Nimbin, Azadirachtin" },
//   { sci: "Ocimum tenuiflorum", common: "Tulsi", state: ["UP", "TN", "HR"], use: "Cold & Fever", comp: "Eugenol, Ursolic Acid" },
//   { sci: "Aloe barbadensis", common: "Aloe Vera", state: ["RJ", "GJ", "MH"], use: "Burns & Digestion", comp: "Aloin, Emodin" },
//    { sci: "Azadirachta indica", common: "Neem", state: ["MH", "KA", "MP"], use: "Skin & Immunity", comp: "Nimbin, Azadirachtin" },
//   { sci: "Ocimum tenuiflorum", common: "Tulsi", state: ["UP", "TN", "HR"], use: "Cold & Fever", comp: "Eugenol, Ursolic Acid" },
//   { sci: "Aloe barbadensis", common: "Aloe Vera", state: ["RJ", "GJ", "MH"], use: "Burns & Digestion", comp: "Aloin, Emodin" },
//    { sci: "Azadirachta indica", common: "Neem", state: ["MH", "KA", "MP"], use: "Skin & Immunity", comp: "Nimbin, Azadirachtin" },
//   { sci: "Ocimum tenuiflorum", common: "Tulsi", state: ["UP", "TN", "HR"], use: "Cold & Fever", comp: "Eugenol, Ursolic Acid" },
//   { sci: "Aloe barbadensis", common: "Aloe Vera", state: ["RJ", "GJ", "MH"], use: "Burns & Digestion", comp: "Aloin, Emodin" },
//    { sci: "Azadirachta indica", common: "Neem", state: ["MH", "KA", "MP"], use: "Skin & Immunity", comp: "Nimbin, Azadirachtin" },
//   { sci: "Ocimum tenuiflorum", common: "Tulsi", state: ["UP", "TN", "HR"], use: "Cold & Fever", comp: "Eugenol, Ursolic Acid" },
//   { sci: "Aloe barbadensis", common: "Aloe Vera", state: ["RJ", "GJ", "MH"], use: "Burns & Digestion", comp: "Aloin, Emodin" },
//    { sci: "Azadirachta indica", common: "Neem", state: ["MH", "KA", "MP"], use: "Skin & Immunity", comp: "Nimbin, Azadirachtin" },
//   { sci: "Ocimum tenuiflorum", common: "Tulsi", state: ["UP", "TN", "HR"], use: "Cold & Fever", comp: "Eugenol, Ursolic Acid" },
//   { sci: "Aloe barbadensis", common: "Aloe Vera", state: ["RJ", "GJ", "MH"], use: "Burns & Digestion", comp: "Aloin, Emodin" },
//    { sci: "Azadirachta indica", common: "Neem", state: ["MH", "KA", "MP"], use: "Skin & Immunity", comp: "Nimbin, Azadirachtin" },
//   { sci: "Ocimum tenuiflorum", common: "Tulsi", state: ["UP", "TN", "HR"], use: "Cold & Fever", comp: "Eugenol, Ursolic Acid" },
//   { sci: "Aloe barbadensis", common: "Aloe Vera", state: ["RJ", "GJ", "MH"], use: "Burns & Digestion", comp: "Aloin, Emodin" },
//    { sci: "Azadirachta indica", common: "Neem", state: ["MH", "KA", "MP"], use: "Skin & Immunity", comp: "Nimbin, Azadirachtin" },
//   { sci: "Ocimum tenuiflorum", common: "Tulsi", state: ["UP", "TN", "HR"], use: "Cold & Fever", comp: "Eugenol, Ursolic Acid" },
//   { sci: "Aloe barbadensis", common: "Aloe Vera", state: ["RJ", "GJ", "MH"], use: "Burns & Digestion", comp: "Aloin, Emodin" },
//    { sci: "Azadirachta indica", common: "Neem", state: ["MH", "KA", "MP"], use: "Skin & Immunity", comp: "Nimbin, Azadirachtin" },
//   { sci: "Ocimum tenuiflorum", common: "Tulsi", state: ["UP", "TN", "HR"], use: "Cold & Fever", comp: "Eugenol, Ursolic Acid" },
//   { sci: "Aloe barbadensis", common: "Aloe Vera", state: ["RJ", "GJ", "MH"], use: "Burns & Digestion", comp: "Aloin, Emodin" },
//    { sci: "Azadirachta indica", common: "Neem", state: ["MH", "KA", "MP"], use: "Skin & Immunity", comp: "Nimbin, Azadirachtin" },
//   { sci: "Ocimum tenuiflorum", common: "Tulsi", state: ["UP", "TN", "HR"], use: "Cold & Fever", comp: "Eugenol, Ursolic Acid" },
//   { sci: "Aloe barbadensis", common: "Aloe Vera", state: ["RJ", "GJ", "MH"], use: "Burns & Digestion", comp: "Aloin, Emodin" },
//    { sci: "Azadirachta indica", common: "Neem", state: ["MH", "KA", "MP"], use: "Skin & Immunity", comp: "Nimbin, Azadirachtin" },
//   { sci: "Ocimum tenuiflorum", common: "Tulsi", state: ["UP", "TN", "HR"], use: "Cold & Fever", comp: "Eugenol, Ursolic Acid" },
//   { sci: "Aloe barbadensis", common: "Aloe Vera", state: ["RJ", "GJ", "MH"], use: "Burns & Digestion", comp: "Aloin, Emodin" },
//    { sci: "Azadirachta indica", common: "Neem", state: ["MH", "KA", "MP"], use: "Skin & Immunity", comp: "Nimbin, Azadirachtin" },
//   { sci: "Ocimum tenuiflorum", common: "Tulsi", state: ["UP", "TN", "HR"], use: "Cold & Fever", comp: "Eugenol, Ursolic Acid" },
//   { sci: "Aloe barbadensis", common: "Aloe Vera", state: ["RJ", "GJ", "MH"], use: "Burns & Digestion", comp: "Aloin, Emodin" },
//    { sci: "Azadirachta indica", common: "Neem", state: ["MH", "KA", "MP"], use: "Skin & Immunity", comp: "Nimbin, Azadirachtin" },
//   { sci: "Ocimum tenuiflorum", common: "Tulsi", state: ["UP", "TN", "HR"], use: "Cold & Fever", comp: "Eugenol, Ursolic Acid" },
//   { sci: "Aloe barbadensis", common: "Aloe Vera", state: ["RJ", "GJ", "MH"], use: "Burns & Digestion", comp: "Aloin, Emodin" },
  
// ];

// export default function Database() {
//   return (
//     <div className="database-container">
//       <Sidebar />
//       <div className="database-main">
//         <Topbar />
//         <div className="database-content">
//           <h2 className="section-title">Main Database</h2>

//           <table className="db-table">
//             <thead>
//               <tr>
//                 <th>Scientific Name</th>
//                 <th>Common Name</th>
//                 <th>Location</th>
//                 <th>Therapeutic Use</th>
//                 <th>Composition</th>
//               </tr>
//             </thead>
//             <tbody>
//               {db.map((p) => (
//                 <tr key={p.sci}>
//                   <td>{p.sci}</td>
//                   <td>{p.common}</td>
//                   <td>{p.state.join(", ")}</td>
//                   <td>{p.use}</td>
//                   <td>{p.comp}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../styles/database.css";

export default function Database() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5001/api/plants")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPlants(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="plants-container">
      <Sidebar />
      <div className="plants-main">
        <Topbar />

        <div className="plants-content">
          <h2 className="section-title">Medicinal Plants Database</h2>

          {loading && <p>Loading plants...</p>}

          <table className="plants-table">
            <thead>
              <tr>
                <th>Scientific Name</th>
                <th>Common Name</th>
                <th>Family</th>
                <th>Group</th>
                <th>Systems of Medicine</th>
                <th>States Available</th>
              </tr>
            </thead>

            <tbody>
              {plants.map((p) => (
                <tr key={p._id}>
                  <td>{p.name_scientific}</td>
                  <td>{p.name_common || "-"}</td>
                  <td>{p.family}</td>
                  <td>{p.group}</td>
                  <td>{p.system_of_medicine?.join(", ")}</td>
                  <td>{p.state_availability?.join(", ")}</td>
                </tr>
              ))}

              {!loading && plants.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}