import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import StatusBadge from "../components/StatusBadge";

const TYPE_COLORS = {
  lost: "bg-orange-100 text-orange-700 border-orange-200",
  found: "bg-teal-100 text-teal-700 border-teal-200",
};

export default function MyReports() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [reports, setReports] = useState([]);

// useEffect(() => {
//   fetchMyReports();
// }, []);

// const fetchMyReports = async () => {

//   try {

//     const user = JSON.parse(
//       localStorage.getItem("lf_user")
//     );

//     const response = await axios.get(
//       "http://localhost:5000/api/items"
//     );
//     const myReports = response.data.filter(
//   (item) => item.userId === user._id
// );

//     // const myReports = response.data.filter(
//     //   (item) => item.userId?._id === user?._id
//     // );

//     setReports(myReports);

//   } catch (error) {

//     console.log(error);

//   }

// };
  useEffect(() => {
  fetchReports();
}, []);
const fetchReports = async () => {

  try {

    const response = await axios.get(
      "http://localhost:5000/api/items"
    );

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    console.log("LOGGED USER =", user);
    console.log("USER ID =", user._id);

    const myReports = response.data.filter(
      (item) =>
        item.userId?.toString() ===
        user?._id?.toString()
    );

    console.log("MY REPORTS =", myReports);

    setReports(myReports);

  } catch (error) {

    console.log(error);

  }

};

// const fetchReports = async () => {
//   try {

//     const response = await axios.get(
//       "http://localhost:5000/api/items"
//     );

//     console.log("ALL ITEMS =", response.data);

//     const user = JSON.parse(
//       localStorage.getItem("user")
//     );

//     //console.log("LOGGED USER =", user);
//     console.log("USER ID =", user._id);
//     console.log("MY REPORTS =", myReports);

//     // const myReports = response.data.filter(
//     //   (item) => item.userId === user._id
//     // );
//     const myReports = response.data.filter(
//   (item) =>
//     item.userId?.toString() ===
//     user?._id?.toString()
// );

//     console.log("FILTERED REPORTS =", myReports);

//     setReports(myReports);

//   } catch (error) {

//     console.log(error);

//   }
// };

  const filtered = reports.filter((r) => {
    const matchTab = activeTab === "all" || r.type === activeTab;
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const counts = {
    all: reports.length,
    lost: reports.filter((r) => r.type === "lost").length,
    found: reports.filter((r) => r.type === "found").length,
  };

  return (
    <DashboardLayout>

      {/* Header */}
      <div className="mb-6">

        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
          <span>Dashboard</span>

          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>

          <span className="text-blue-600 font-semibold">
            My Reports
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              My Reports
            </h1>

            <p className="text-sm text-gray-500">
              Track all your submitted lost & found reports
            </p>
          </div>

          <div className="flex gap-2">

            <button
              onClick={() =>
                navigate("/report-lost")
              }
              className="px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 transition-colors shadow-sm flex items-center gap-1.5"
            >
              Report Lost
            </button>

            <button
              onClick={() =>
                navigate("/report-found")
              }
              className="px-4 py-2 rounded-xl bg-teal-500 text-white text-xs font-bold hover:bg-teal-600 transition-colors shadow-sm flex items-center gap-1.5"
            >
              Report Found
            </button>

          </div>
        </div>
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">

        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
          {[
            ["all", "All"],
            ["lost", "Lost"],
            ["found", "Found"],
          ].map(([val, lbl]) => (

            <button
              key={val}
              onClick={() =>
                setActiveTab(val)
              }
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all
              ${activeTab === val
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              {lbl}

              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full
                ${activeTab === val
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-200 text-gray-500"
                  }`}
              >
                {counts[val]}
              </span>

            </button>
          ))}
        </div>

        <div className="relative flex-1 sm:max-w-xs">

          <input
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm"
            placeholder="Search reports..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>
      </div>

      {/* Reports */}
      {filtered.length === 0 ? (

        <div className="text-center py-20">

          <p className="text-gray-500 font-medium">
            No reports found
          </p>

          <p className="text-gray-400 text-sm mt-1">
            Submit a new lost or found report
          </p>

        </div>

      ) : (

        <div className="space-y-3">

          {filtered.map((report) => (

            <div
              //key={report.id}
              key={report._id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
               {/* Notification */}
  {report.notification && (

    <div className="bg-green-100 border border-green-300 text-green-700 rounded-xl px-4 py-3 m-4">

      {report.notification}

    </div>

  )}

              <div
                className="flex items-center gap-4 p-5 cursor-pointer"
                onClick={() => setExpandedId(
                    expandedId === report._id
                      ? null
                      : report._id
                  )}      
              >

                <div className="flex-1">

                  <div className="flex items-center gap-2 flex-wrap">

                    <h3 className="text-sm font-bold text-gray-900">
                      {report.title}
                    </h3>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border capitalize ${TYPE_COLORS[report.type]}`}
                    >
                      {report.type}
                    </span>

                  </div>

                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="text-xs text-gray-400">{report.category}</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-xs text-gray-400">{report.location}</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-xs text-gray-400">{new Date(report.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <StatusBadge
                    status={report.status}
                  />
                </div>
              </div>

              {/* Expanded Details */}
              {expandedId === report._id && (
                <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">

                  <p className="text-sm text-gray-600 mb-4">
                    {report.description}
                  </p>

                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}