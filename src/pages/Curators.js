// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";

// const curators = [
//   { name: "Dr. Sharma", email: "s@abc.com", edu: "PhD Botany", count: 122 },
//   { name: "Meera", email: "m@abc.com", edu: "MSc Herbal", count: 115 },
//   { name: "Riya", email: "r@abc.com", edu: "BSc Bio", count: 91 },
//   { name: "Shiv", email: "sh@abc.com", edu: "BSc Agriculture", count: 75 },
//   { name: "Anil", email: "a@abc.com", edu: "MSc Bio", count: 70 },
// ];

// export default function Curators() {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="ml-60 w-full">
//         <Topbar />
//         <div className="p-6">
//           <h2 className="text-2xl font-bold mb-4">Top Contributors</h2>
//           <ul className="bg-white shadow rounded p-4">
//             {curators.map((c, i) => (
//               <li key={i} className="p-2 font-semibold">
//                 #{i + 1} — {c.name} ({c.count} submissions)
//               </li>
//             ))}
//           </ul>

//           <h2 className="text-2xl font-bold mt-8 mb-4">All Curators</h2>
//           <table className="bg-white shadow rounded w-full">
//             <thead className="bg-green-900 text-white">
//               <tr>
//                 <th className="p-2">Name</th>
//                 <th className="p-2">Email</th>
//                 <th className="p-2">Education</th>
//               </tr>
//             </thead>
//             <tbody>
//               {curators.map((c) => (
//                 <tr key={c.email} className="border">
//                   <td className="p-2">{c.name}</td>
//                   <td className="p-2">{c.email}</td>
//                   <td className="p-2">{c.edu}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const curators = [
  { name: "Dr. Sharma", email: "s@abc.com", edu: "PhD Botany", count: 122 },
  { name: "Meera", email: "m@abc.com", edu: "MSc Herbal", count: 115 },
  { name: "Riya", email: "r@abc.com", edu: "BSc Bio", count: 91 },
  { name: "Shiv", email: "sh@abc.com", edu: "BSc Agriculture", count: 75 },
  { name: "Anil", email: "a@abc.com", edu: "MSc Bio", count: 70 },
];

export default function Curators() {
  return (
    <div className="flex ml-[560px]">
      <Sidebar />
      <div className="flex-1 ml-[660px]">
        <Topbar />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Top Contributors</h2>
          <ul className="bg-white shadow rounded p-4">
            {curators.map((c, i) => (
              <li key={i} className="p-2 font-semibold">
                #{i + 1} — {c.name} ({c.count} submissions)
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">All Curators</h2>
          <table className="table">
            <thead className="bg-green-900 text-white">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Education</th>
              </tr>
            </thead>
            <tbody>
              {curators.map((c) => (
                <tr key={c.email} className="border">
                  <td className="p-2">{c.name}</td>
                  <td className="p-2">{c.email}</td>
                  <td className="p-2">{c.edu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
