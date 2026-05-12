import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import StatusBadge from "../components/StatusBadge";

// Mock data
const MOCK_REPORTS = [
  {
    id: 1, type: "lost", title: "Black OnePlus Earbuds", category: "Electronics",
    description: "Lost my OnePlus Buds Z2 near the library. Black color, with case.",
    date: "2025-01-10", location: "Library", status: "approved",
    image: null, reportedOn: "2025-01-10",
  },
  {
    id: 2, type: "found", title: "Student ID Card", category: "ID Card / Documents",
    description: "Found a student ID card near the canteen. Belongs to someone from CSE dept.",
    date: "2025-01-12", location: "Canteen", status: "pending",
    image: null, reportedOn: "2025-01-12",
  },
  {
    id: 3, type: "lost", title: "Blue Jansport Backpack", category: "Bag / Backpack",
    description: "Left my backpack near the auditorium. Contains laptop and books.",
    date: "2025-01-08", location: "Auditorium", status: "rejected",
    image: null, reportedOn: "2025-01-08",
  },
  {
    id: 4, type: "lost", title: "Silver House Keys", category: "Keys",
    description: "Lost a bunch of keys with a red keychain near parking area.",
    date: "2025-01-14", location: "Parking Area", status: "resolved",
    image: null, reportedOn: "2025-01-14",
  },
];

const TYPE_COLORS = {
  lost: "bg-orange-100 text-orange-700 border-orange-200",
  found: "bg-teal-100 text-teal-700 border-teal-200",
};

export default function MyReports() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const filtered = MOCK_REPORTS.filter((r) => {
    const matchTab = activeTab === "all" || r.type === activeTab;
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const counts = {
    all: MOCK_REPORTS.length,
    lost: MOCK_REPORTS.filter((r) => r.type === "lost").length,
    found: MOCK_REPORTS.filter((r) => r.type === "found").length,
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
          <span>Dashboard</span>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-blue-600 font-semibold">My Reports</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">My Reports</h1>
            <p className="text-sm text-gray-500">Track all your submitted lost & found reports</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/report-lost")}
              className="px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 transition-colors shadow-sm flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Report Lost
            </button>
            <button
              onClick={() => navigate("/report-found")}
              className="px-4 py-2 rounded-xl bg-teal-500 text-white text-xs font-bold hover:bg-teal-600 transition-colors shadow-sm flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Report Found
            </button>
          </div>
        </div>
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
          {[["all", "All"], ["lost", "Lost"], ["found", "Found"]].map(([val, lbl]) => (
            <button
              key={val}
              onClick={() => setActiveTab(val)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all
                ${activeTab === val ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              {lbl}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full
                ${activeTab === val ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-500"}`}>
                {counts[val]}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 sm:max-w-xs">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search reports..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Reports List */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">No reports found</p>
          <p className="text-gray-400 text-sm mt-1">Submit a new lost or found report</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Report Header */}
              <div
                className="flex items-center gap-4 p-5 cursor-pointer"
                onClick={() => setExpandedId(expandedId === report.id ? null : report.id)}
              >
                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
                  ${report.type === "lost" ? "bg-orange-100" : "bg-teal-100"}`}>
                  {report.type === "lost" ? (
                    <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-gray-900 truncate">{report.title}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border capitalize ${TYPE_COLORS[report.type]}`}>
                      {report.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="text-xs text-gray-400">{report.category}</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-xs text-gray-400">{report.location}</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-xs text-gray-400">{report.date}</span>
                  </div>
                </div>

                {/* Status + Toggle */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <StatusBadge status={report.status} />
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${expandedId === report.id ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedId === report.id && (
                <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">
                  <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {report.status === "pending" && (
                      <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg">
                        ⏳ Awaiting admin approval
                      </span>
                    )}
                    {report.status === "rejected" && (
                      <span className="text-xs text-red-700 bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg">
                        ✗ Report was rejected by admin
                      </span>
                    )}
                    {report.status === "resolved" && (
                      <span className="text-xs text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1.5 rounded-lg">
                        🎉 Item successfully recovered!
                      </span>
                    )}
                    {report.status === "approved" && (
                      <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
                        ✓ Publicly visible — waiting for someone to claim
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
