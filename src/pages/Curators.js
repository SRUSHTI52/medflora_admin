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
//     <div className="flex w-full">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
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
//           <table className="table">
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
//     <div className="ml-[250px]">
//       <Sidebar/>

//       {/* <div className="flex-1 flex flex-col"> */}
//       <Topbar/>

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
//           <table className="table w-full border-collapse bg-white shadow rounded overflow-hidden">
//             <thead className="bg-green-900 text-white">
//               <tr>
//                 <th className="p-2 text-left">Name</th>
//                 <th className="p-2 text-left">Email</th>
//                 <th className="p-2 text-left">Education</th>
//               </tr>
//             </thead>
//             <tbody>
//               {curators.map((c) => (
//                 <tr key={c.email} className="border-b hover:bg-gray-100">
//                   <td className="p-2">{c.name}</td>
//                   <td className="p-2">{c.email}</td>
//                   <td className="p-2">{c.edu}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       {/* </div> */}
//     </div>
//   );
// }


// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";
// import "../styles/curator.css";

// const curators = [
//   { name: "Dr. Sharma", email: "s@abc.com", edu: "PhD Botany", count: 122 },
//   { name: "Meera", email: "m@abc.com", edu: "MSc Herbal", count: 115 },
//   { name: "Riya", email: "r@abc.com", edu: "BSc Bio", count: 91 },
//   { name: "Shiv", email: "sh@abc.com", edu: "BSc Agriculture", count: 75 },
//   { name: "Anil", email: "a@abc.com", edu: "MSc Bio", count: 70 },
// ];

// export default function Curators() {
//   return (
//     <div className="curators-container">
//       <Sidebar />
//       <div className="curators-main">
//         <Topbar />
//         <div className="curators-content">
//           <h2 className="section-title">Top Contributors</h2>
//           <ul className="top-list">
//             {curators.map((c, i) => (
//               <li key={i} className="top-item">
//                 #{i + 1} — {c.name} ({c.count} submissions)
//               </li>
//             ))}
//           </ul>

//           <h2 className="section-title mt">All Curators</h2>
//           <table className="curators-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Education</th>
//               </tr>
//             </thead>
//             <tbody>
//               {curators.map((c) => (
//                 <tr key={c.email}>
//                   <td>{c.name}</td>
//                   <td>{c.email}</td>
//                   <td>{c.edu}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";
// import "../styles/curator.css";

// const curators = [
//   { name: "Dr. Sharma", email: "s@abc.com", edu: "PhD Botany", count: 122 },
//   { name: "Meera", email: "m@abc.com", edu: "MSc Herbal", count: 115 },
//   { name: "Riya", email: "r@abc.com", edu: "BSc Bio", count: 91 },
//   { name: "Shiv", email: "sh@abc.com", edu: "BSc Agriculture", count: 75 },
//   { name: "Anil", email: "a@abc.com", edu: "MSc Bio", count: 70 },
// ];

// export default function Curators() {
//   const [showModal, setShowModal] = useState(false);
//   const [sender, setSender] = useState("");
//   const [receiver, setReceiver] = useState("");
//   const [message, setMessage] = useState("");

//   const sendInvite = () => {
//     console.log("Invite Sent:", { sender, receiver, message });
//     alert("Invitation email has been sent (dummy functionality for now)");
//     setShowModal(false);
//     setSender("");
//     setReceiver("");
//     setMessage("");
//   };

//   return (
//     <div className="curators-container">
//       <Sidebar />
//       <div className="curators-main">
//         <Topbar />
//         <div className="curators-content">
//           <h2 className="section-title">Top Contributors</h2>

//           <button className="invite-btn" onClick={() => setShowModal(true)}>
//             + Invite Curator
//           </button>

//           <ul className="top-list">
//             {curators.map((c, i) => (
//               <li key={i} className="top-item">
//                 #{i + 1} — {c.name} ({c.count} submissions)
//               </li>
//             ))}
//           </ul>

//           <h2 className="section-title mt">All Curators</h2>
//           <table className="curators-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Education</th>
//                 <th>Contributions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {curators.map((c) => (
//                 <tr key={c.email}>
//                   <td>{c.name}</td>
//                   <td>{c.email}</td>
//                   <td>{c.edu}</td>
//                   <td>{c.count}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* INVITE MODAL */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-box">
//             <h3 className="modal-title">Invite New Curator</h3>

//             <label>Sender Email</label>
//             <input
//               type="email"
//               value={sender}
//               onChange={(e) => setSender(e.target.value)}
//               placeholder="your-admin-email@domain.com"
//             />

//             <label>Curator Email</label>
//             <input
//               type="email"
//               value={receiver}
//               onChange={(e) => setReceiver(e.target.value)}
//               placeholder="curator-email@domain.com"
//             />

//             <label>Message</label>
//             <textarea
//               rows="4"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Write invitation message here..."
//             />

//             <div className="modal-actions">
//               <button className="send-btn" onClick={sendInvite}>Send</button>
//               <button className="cancel-btn" onClick={() => setShowModal(false)}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../styles/curator.css";

export default function Curators() {
  const [curators, setCurators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCurators();
  }, []);

  const fetchCurators = async () => {
    try {
      const token = localStorage.getItem("token"); // JWT token

      const response = await fetch("http://127.0.0.1:5001/api/curators")

      const data = await response.json();

      if (data.success) {
        setCurators(data.data);
      } else {
        setError("Failed to load curators");
      }
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  const sendInvite = () => {
    console.log("Invite Sent:", { sender, receiver, message });
    alert("Invitation email has been sent (dummy functionality for now)");
    setShowModal(false);
    setSender("");
    setReceiver("");
    setMessage("");
  };

  return (
    <div className="curators-container">
      <Sidebar />
      <div className="curators-main">
        <Topbar />

        <div className="curators-content">
          <h2 className="section-title">Top Contributors</h2>

          <button className="invite-btn" onClick={() => setShowModal(true)}>
            + Invite Curator
          </button>

          {loading && <p>Loading curators...</p>}
          {error && <p className="error-text">{error}</p>}

          {/* TOP CONTRIBUTORS */}
          <ul className="top-list">
            {curators.slice(0, 5).map((c, i) => (
              <li key={c._id} className="top-item">
                #{i + 1} — {c.full_name}
              </li>
            ))}
          </ul>

          <h2 className="section-title mt">All Curators</h2>

          <table className="curators-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Position</th>
                <th>Affiliation</th>
              </tr>
            </thead>

            <tbody>
              {curators.map((c) => (
                <tr key={c._id}>
                  <td>{c.full_name}</td>
                  <td>{c.professional_email || c.email}</td>
                  <td>{c.position || "-"}</td>
                  <td>{c.affiliation || "-"}</td>
                </tr>
              ))}

              {!loading && curators.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No curators found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* INVITE MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3 className="modal-title">Invite New Curator</h3>

            <label>Sender Email</label>
            <input
              type="email"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
            />

            <label>Curator Email</label>
            <input
              type="email"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
            />

            <label>Message</label>
            <textarea
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="modal-actions">
              <button className="send-btn" onClick={sendInvite}>
                Send
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}