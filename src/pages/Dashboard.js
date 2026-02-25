// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";
// import { Pie, Line } from "react-chartjs-2";
// import { Chart as ChartJS } from "chart.js/auto";

// export default function Dashboard() {
//   const pieData = {
//     labels: ["Neem", "Aloe Vera", "Tulsi", "Ashwagandha"],
//     datasets: [{ data: [40, 25, 20, 15] }],
//   };

//   const lineData = {
//     labels: ["Hit 1", "Hit 2", "Hit 3", "Hit 4", "Hit 5"],
//     datasets: [{ label: "Confidence", data: [0.70, 0.85, 0.78, 0.92, 0.88] }],
//   };

//   const heatmapData = [
//     { state: "Maharashtra", count: 120 },
//     { state: "Karnataka", count: 90 },
//     { state: "Kerala", count: 60 },
//     { state: "Tamil Nadu", count: 50 },
//   ];

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="ml-60 w-full">
//         <Topbar />

//         <div className="grid grid-cols-3 gap-6 p-6">
//           {[
//             { title: "Total plants count", value: 1523 },
//             { title: "Total curators count", value: 87 },
//             { title: "Total identifications completed", value: 945 },
//           ].map((k) => (
//             <div className="p-6 bg-white shadow rounded text-center" key={k.title}>
//               <h2 className="text-xl font-bold">{k.title}</h2>
//               <p className="text-4xl text-green-800 font-bold mt-2">{k.value}</p>
//             </div>
//           ))}
//         </div>

//         <div className="grid grid-cols-3 gap-6 p-6">
//           <div className="bg-white shadow p-4 rounded">
//             <h3 className="font-semibold mb-2">Most Searched Plants</h3>
//             <Pie data={pieData} />
//           </div>

//           <div className="bg-white shadow p-4 rounded col-span-2">
//             <h3 className="font-semibold mb-2">Confidence Trend</h3>
//             <Line data={lineData} />
//           </div>
//         </div>

//         <div className="p-6">
//           <h3 className="font-semibold mb-2">Geological Heatmap</h3>
//           <table className="bg-white shadow rounded w-full p-4">
//             <tbody>
//               {heatmapData.map((s) => (
//                 <tr key={s.state}>
//                   <td className="p-2">{s.state}</td>
//                   <td className="p-2 font-bold">{s.count} plants</td>
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
// import { Pie, Line } from "react-chartjs-2";
// import { Chart as ChartJS } from "chart.js/auto";

// export default function Dashboard() {
//   const pieData = {
//     labels: ["Neem", "Aloe Vera", "Tulsi", "Ashwagandha"],
//     datasets: [{ data: [40, 25, 20, 15] }],
//   };

//   const lineData = {
//     labels: ["Hit 1", "Hit 2", "Hit 3", "Hit 4", "Hit 5"],
//     datasets: [{ label: "Confidence", data: [0.70, 0.85, 0.78, 0.92, 0.88] }],
//   };

//   const heatmapData = [
//     { state: "Maharashtra", count: 120 },
//     { state: "Karnataka", count: 90 },
//     { state: "Kerala", count: 60 },
//     { state: "Tamil Nadu", count: 50 },
//   ];

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="ml-60 w-full">
//         <Topbar />

//         <div className="grid grid-cols-3 gap-6 p-6">
//           {[
//             { title: "Total plants count", value: 1523 },
//             { title: "Total curators count", value: 87 },
//             { title: "Total identifications completed", value: 945 },
//           ].map((k) => (
//             <div className="kpi-card" key={k.title}>
//               <h2 className="text-xl font-bold">{k.title}</h2>
//               <p className="value">{k.value}</p>
//             </div>
//           ))}
//         </div>

//         <div className="grid grid-cols-3 gap-6 p-6">
//           <div className="bg-white shadow p-4 rounded">
//             <h3 className="font-semibold mb-2">Most Searched Plants</h3>
//             <Pie data={pieData} />
//           </div>

//           <div className="bg-white shadow p-4 rounded col-span-2">
//             <h3 className="font-semibold mb-2">Confidence Trend</h3>
//             <Line data={lineData} />
//           </div>
//         </div>

//         <div className="p-6">
//           <h3 className="font-semibold mb-2">Geological Heatmap</h3>
//           <table className="bg-white shadow rounded w-full p-4">
//             <tbody>
//               {heatmapData.map((s) => (
//                 <tr key={s.state}>
//                   <td className="p-2">{s.state}</td>
//                   <td className="p-2 font-bold">{s.count} plants</td>
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
// import { Pie, Line } from "react-chartjs-2";
// import { Chart as ChartJS } from "chart.js/auto";
// import "../styles/dashboard.css";
// import IndiaMap from "../components/IndiaMap";
// import { scaleQuantize } from "d3-scale";

// export default function Dashboard() {
//   const pieData = {
//     labels: ["Neem", "Aloe Vera", "Tulsi", "Ashwagandha"],
//     datasets: [{
//       data: [40, 25, 20, 15],
//       backgroundColor: ["#ff891bff", "#ffc35bff", "#ffd477ff", "#fff6afff"]
//     }],
//   };

//   const lineData = {
//     labels: ["Hit 1", "Hit 2", "Hit 3", "Hit 4", "Hit 5"],
//     datasets: [{
//       label: "Confidence Score",
//       data: [0.70, 0.85, 0.78, 0.92, 0.88],
//       borderColor: "#c43fa7ff",
//       tension: 0.4
//     }],
//   };

//   const heatmapData = [
//     { state: "Maharashtra", count: 120 },
//     { state: "Karnataka", count: 90 },
//     { state: "Kerala", count: 60 },
//     { state: "Tamil Nadu", count: 50 },
//   ];

//   const colorScale = scaleQuantize()
//   .domain([10, 200])
//   .range(["#dae7efff", "#bdd7e7", "#6baed6", "#3182bd", "#08519c"]);

//   return (
//     <div className="dashboard-page">
//       <Sidebar />
//       <Topbar />

//       {/* KPI ROW */}
//       <div className="kpi-container">
//         {[
//           { title: "Total plants count", value: 1523 },
//           { title: "Total curators count", value: 87 },
//           { title: "Total identifications completed", value: 945 },
//         ].map((k) => (
//           <div className="kpi-card" key={k.title}>
//             <span className="kpi-card-title">{k.title}</span>
//             <span className="kpi-card-value">{k.value}</span>
//           </div>
//         ))}
//       </div>
// {/* ANALYTICS 2-COLUMN LAYOUT */}
// <div className="analytics-split">
  
//   {/* LEFT COLUMN — PIE + LINE */}
//   <div className="analytics-left">
//     <div className="analytics-box">
//       <h3 className="analytics-title">Most Searched Plants</h3>
//       {/* <Pie data={pieData} /> */}
// <Pie 
//   data={pieData}
//   options={{
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: "right" }
//     }
//   }}
// />


//     </div>

//     <div className="analytics-box line-box">
//       <h3 className="analytics-title">Trend Analysis</h3>
//       <Line data={lineData} />
//     </div>
//   </div>

//   {/* RIGHT COLUMN — INDIA HEATMAP */}
//   <div className="analytics-right">
//     <IndiaMap/>
//     {/* Legend */}
  

//   </div>

// </div>
//     </div>
//   );
// }


import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import IndiaMap from "../components/IndiaMap";

import { Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { scaleQuantize } from "d3-scale";

import { useEffect, useState } from "react";
// import axios from "axios";

import "../styles/dashboard.css";

export default function Dashboard() {

  /* ===================== KPI + STATIC DATA ===================== */


  const heatmapData = [
    { state: "Maharashtra", count: 120 },
    { state: "Karnataka", count: 90 },
    { state: "Kerala", count: 60 },
    { state: "Tamil Nadu", count: 50 },
  ];

  const colorScale = scaleQuantize()
    .domain([10, 200])
    .range(["#dae7efff", "#bdd7e7", "#6baed6", "#3182bd", "#08519c"]);

const [pieData, setPieData] = useState(null);
useEffect(() => {
fetch("http://127.0.0.1:5001/api/analytics/most-searched-plants")
  .then(res => {
    if (!res.ok) throw new Error("API not found");
    return res.json();
  })
  .then(json => {
    setPieData({
      labels: json.data.map(i => i.plant),
      datasets: [{
        data: json.data.map(i => i.count),
        backgroundColor: [
          "#ff891bff",
          "#ffc35bff",
          "#ffd477ff",
          "#fff6afff",
          "#d9ed92",
          "#99d98c"
        ]
      }]
    });
  })
  .catch(err => console.error("Pie chart API error:", err.message));
}, []);



  /* ===================== TREND ANALYSIS STATE ===================== */
const [kpis, setKpis] = useState({
  total_plants: 0,
  total_curators: 0,
  total_identifications: 0
});

useEffect(() => {
  fetch("http://127.0.0.1:5001/api/dashboard/kpis")
    .then(res => res.json())
    .then(json => {
      if (json.success) {
        setKpis(json.data);
      }
    })
    .catch(err => console.error("KPI fetch error:", err));
}, []);
  const [lineData, setLineData] = useState(null);
const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index",
    intersect: false
  },
  plugins: {
    legend: {
      display: true,
      position: "top"
    },
    tooltip: {
      callbacks: {
        label: (ctx) => `Confidence: ${ctx.parsed.y}`
      }
    }
  },
  scales: {
    x: {
      ticks: {
        autoSkip: true,
        maxTicksLimit: 8
      },
      title: {
        display: true,
        text: "Date"
      }
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Confidence Score"
      }
    }
  }
};
  /* ===================== FETCH PREDICTION HISTORY ===================== */
function aggregateByDate(data) {
  const grouped = {};

  data.forEach(item => {
    const date = new Date(item.created_at).toISOString().split("T")[0]; // YYYY-MM-DD
    if (!grouped[date]) {
      grouped[date] = { sum: 0, count: 0 };
    }
    grouped[date].sum += item.confidence;
    grouped[date].count += 1;
  });

  const labels = Object.keys(grouped);
  const values = labels.map(
    d => Number((grouped[d].sum / grouped[d].count).toFixed(3))
  );

  return { labels, values };
}

useEffect(() => {
  fetch("http://127.0.0.1:5001/api/prediction-history")
    .then(res => res.json())
    .then(json => {
      const history = json.data;

      const { labels, values } = aggregateByDate(history);

      setLineData({
        labels,
        datasets: [
          {
            label: "Average Confidence Score",
            data: values,
            borderColor: "#c43fa7ff",
            backgroundColor: "rgba(196,63,167,0.12)",
            tension: 0.45,
            fill: true,
            pointRadius: 0,        // 👈 hides clutter
            pointHoverRadius: 5,
            borderWidth: 2
          }
        ]
      });
    })
    .catch(err => console.error("Trend fetch error:", err));
}, []);

  /* ===================== UI ===================== */

  return (
    <div className="dashboard-page">
      <Sidebar />
      <Topbar />

      {/* ================= KPI ROW ================= */}
<div className="kpi-container">
  {[
    { title: "Total plants count", value: kpis.total_plants },
    { title: "Total curators count", value: kpis.total_curators },
    { title: "Total identifications completed", value: kpis.total_identifications },
  ].map((k) => (
    <div className="kpi-card" key={k.title}>
      <span className="kpi-card-title">{k.title}</span>
      <span className="kpi-card-value">{k.value}</span>
    </div>
  ))}
</div>

      {/* ================= ANALYTICS SECTION ================= */}
      <div className="analytics-split">

        {/* ===== LEFT COLUMN ===== */}
        <div className="analytics-left">

{/* PIE CHART */}
<div className="analytics-box">
  <h3 className="analytics-title">Most Searched Plants</h3>

  {pieData && (
    <Pie
      data={pieData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right"
          }
        }
      }}
    />
  )}
</div>

          {/* TREND ANALYSIS (REAL DATA) */}
          <div className="analytics-box line-box">
            <h3 className="analytics-title">Trend Analysis</h3>

            {lineData ? (
              <Line
                data={lineData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      min: 0,
                      max: 1,
                      title: {
                        display: true,
                        text: "Confidence Score"
                      }
                    },
                    x: {
                      title: {
                        display: true,
                        text: "Prediction Timestamp"
                      }
                    }
                  }
                }}
              />
            ) : (
              <p>Loading trend data...</p>
            )}
          </div>

        </div>

        {/* ===== RIGHT COLUMN ===== */}
        <div className="analytics-right">
          <IndiaMap />
        </div>

      </div>
    </div>
  );
}