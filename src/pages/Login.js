// import { useState } from "react";

// export default function Login({ setIsAuth }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const FIXED_EMAIL = "admin@medflora.com";
//   const FIXED_PASS = "admin123";

//   const handleLogin = () => {
//     if (email === FIXED_EMAIL && password === FIXED_PASS) {
//       setIsAuth(true);
//     } else {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div className="h-screen flex justify-center items-center bg-green-100">
//       <div className="bg-white p-10 rounded shadow-md flex flex-col gap-4">
//         <h1 className="text-3xl font-bold text-green-900 text-center">MedFlora Admin</h1>
//         <input className="border p-2" placeholder="Email" onChange={e => setEmail(e.target.value)} />
//         <input className="border p-2" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
//         <button className="bg-green-900 text-white py-2 rounded" onClick={handleLogin}>
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";

export default function Login({ setIsAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const FIXED_EMAIL = "admin@medflora.com";
  const FIXED_PASS = "admin123";

  const handleLogin = () => {
    if (email === FIXED_EMAIL && password === FIXED_PASS) {
      setIsAuth(true);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="text-3xl font-bold text-green-900 text-center">MedFlora Admin</h1>
        <input className="border p-2" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input className="border p-2" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button className="bg-green-900 text-white py-2 rounded" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
