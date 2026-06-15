import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";

export default function AdminOverview() {

  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/items"
      );
      setReports(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalReports = reports.length;

  const pendingReports = reports.filter(
    (r) =>
      r.status !== "approved" &&
      r.status !== "rejected"
  ).length;

  const approvedItems = reports.filter(
    (r) => r.status === "approved"
  ).length;

  const rejectedItems = reports.filter(
    (r) => r.status === "rejected"
  ).length;

  const lostReports = reports.filter(
    (r) => r.type === "lost"
  ).length;

  const foundReports = reports.filter(
    (r) => r.type === "found"
  ).length;

//   const aiMatches = reports.filter(
//     (r) => r.matchedItems?.length > 0
//   ).length;

//   const recoveryRate =
//     totalReports > 0
//       ? Math.round(
//           (approvedItems / totalReports) * 100
//         )
//       : 0;

      return (
  <DashboardLayout isAdmin>
    <h1 className="text-3xl font-bold mb-6">
  Dashboard
</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300 cursor-pointer"> */}
      <div className="p-8 rounded-3xl shadow-lg border min-h-[180px] flex flex-col justify-center">
  <p className="text-sm opacity-90">📄 Total Reports</p>
  <h2 className="text-4xl font-bold mt-2">{totalReports}</h2>
</div>
      

    <div className="p-8 rounded-3xl shadow-lg border min-h-[180px] flex flex-col justify-center">
      {/* <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300 cursor-pointer"> */}
  <p className="text-sm opacity-90">⏳ Pending Reports</p>
  <h2 className="text-4xl font-bold mt-2">{pendingReports}</h2>
</div>

      <div className="p-8 rounded-3xl shadow-lg border min-h-[180px] flex flex-col justify-center">
        <h3 className="text-sm text-gray-500">Approved Items</h3>
        <p className="text-3xl font-bold mt-2">{approvedItems}</p>
      </div>

      <div className="p-8 rounded-3xl shadow-lg border min-h-[180px] flex flex-col justify-center">
        <h3 className="text-sm text-gray-500">Rejected Items</h3>
        <p className="text-3xl font-bold mt-2">{rejectedItems}</p>
      </div>

     <div className="p-8 rounded-3xl shadow-lg border min-h-[180px] flex flex-col justify-center">
        <h3 className="text-sm text-gray-500">Lost Reports</h3>
        <p className="text-3xl font-bold mt-2">{lostReports}</p>
      </div>

      <div className="p-8 rounded-3xl shadow-lg border min-h-[180px] flex flex-col justify-center">
        <h3 className="text-sm text-gray-500">Found Reports</h3>
        <p className="text-3xl font-bold mt-2">{foundReports}</p>
      </div>

      {/* <div className="bg-white p-5 rounded-2xl shadow-sm border">
        <h3 className="text-sm text-gray-500">AI Matches</h3>
        <p className="text-3xl font-bold mt-2">{aiMatches}</p>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border">
        <h3 className="text-sm text-gray-500">Recovery Rate</h3>
        <p className="text-3xl font-bold mt-2">{recoveryRate}%</p>
      </div> */}

    </div>
  </DashboardLayout>
);
}
//   return (
//     <DashboardLayout isAdmin>

//       <h1 className="text-3xl font-bold mb-6">
//         Dashboard
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

//         {/* Cards go here */}

//       </div>

//     </DashboardLayout>
//   );
// }
