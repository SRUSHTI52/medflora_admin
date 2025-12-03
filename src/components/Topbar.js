// import { useState } from "react";

// export default function Topbar() {
//   const [open, setOpen] = useState(false);

//   const admin = {
//     name: "Admin User",
//     email: "admin@medflora.com",
//   };

//   return (
//     <div className="w-full flex justify-end p-4 border-b relative bg-white">
//       <img
//         src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
//         className="w-10 cursor-pointer"
//         onClick={() => setOpen(!open)}
//       />
//       {open && (
//         <div className="absolute top-16 right-6 bg-white shadow-md p-4 rounded">
//           <p className="font-semibold">{admin.name}</p>
//           <p className="text-sm text-gray-600">{admin.email}</p>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState } from "react";

export default function Topbar() {
  const [open, setOpen] = useState(false);

  const admin = {
    name: "Admin User",
    email: "admin@medflora.com",
  };

  return (
    <div className="topbar">
      <img
        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        className="profile-icon"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className="profile-dropdown">
          <p className="font-semibold">{admin.name}</p>
          <p className="text-sm text-gray-600">{admin.email}</p>
        </div>
      )}
    </div>
  );
}