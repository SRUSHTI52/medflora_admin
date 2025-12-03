// import { Link } from "react-router-dom";

// export default function Sidebar() {
//   return (
//     <div className="h-screen w-60 bg-green-900 text-white p-6 flex flex-col gap-8 fixed">
//       <h1 className="text-2xl font-bold">🌱 MedFlora</h1>
//       <ul className="flex flex-col gap-6 text-lg font-semibold">
//         <Link to="/dashboard">Dashboard</Link>
//         <Link to="/curators">Curators</Link>
//         <Link to="/database">Database</Link>
//       </ul>
//     </div>
//   );
// }

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h1 className="sidebar-logo">🌱 MedFlora</h1>
      <ul>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/curators">Curators</Link>
        <Link to="/database">Database</Link>
      </ul>
    </div>
  );
}
