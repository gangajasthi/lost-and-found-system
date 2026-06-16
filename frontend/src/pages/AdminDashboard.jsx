import { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import StatusBadge from "../components/StatusBadge";

// ── Analytics Data ──────────────────────────────────────────────
// const ANALYTICS = [
//   {
//     label: "Total Reports",
//     value: "148",
//     change: "+12 this week",
//     positive: true,
//     color: "blue",
//     icon: (
//       <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//           d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//       </svg>
//     ),
//   },
//   {
//     label: "Pending Approvals",
//     value: "5",
//     change: "Needs attention",
//     positive: false,
//     color: "amber",
//     icon: (
//       <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//           d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//       </svg>
//     ),
//   },
//   {
//     label: "Items Resolved",
//     value: "93",
//     change: "+8 this month",
//     positive: true,
//     color: "emerald",
//     icon: (
//       <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//           d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//       </svg>
//     ),
//   },
//   {
//     label: "Active Claims",
//     value: "17",
//     change: "+3 today",
//     positive: true,
//     color: "purple",
//     icon: (
//       <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//           d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
//       </svg>
//     ),
//   },
// ];

// const COLOR_MAP = {
//   blue:    { bg: "bg-blue-50",    icon: "bg-blue-100 text-blue-600",       ring: "ring-blue-200"    },
//   amber:   { bg: "bg-amber-50",   icon: "bg-amber-100 text-amber-600",     ring: "ring-amber-200"   },
//   emerald: { bg: "bg-emerald-50", icon: "bg-emerald-100 text-emerald-600", ring: "ring-emerald-200" },
//   purple:  { bg: "bg-purple-50",  icon: "bg-purple-100 text-purple-600",   ring: "ring-purple-200"  },
// };

// ── Recent Activity ──────────────────────────────────────────────
// const RECENT_ACTIVITY = [
//   { id: 1, action: "approved",       item: "Student ID Card",         by: "Admin",  time: "2 hrs ago",  color: "emerald" },
//   { id: 2, action: "rejected",       item: "Duplicate wallet report", by: "Admin",  time: "4 hrs ago",  color: "red"     },
//   { id: 3, action: "claim verified", item: "Laptop Charger",          by: "Admin",  time: "Yesterday",  color: "blue"    },
//   { id: 4, action: "new report",     item: "Blue Water Bottle",       by: "System", time: "Yesterday",  color: "amber"   },
//   { id: 5, action: "resolved",       item: "Silver Bracelet",         by: "Admin",  time: "2 days ago", color: "purple"  },
// ];

// const ACT_COLORS = {
//   emerald: "bg-emerald-100 text-emerald-700",
//   red:     "bg-red-100 text-red-700",
//   blue:    "bg-blue-100 text-blue-700",
//   amber:   "bg-amber-100 text-amber-700",
//   purple:  "bg-purple-100 text-purple-700",
// };


// ── View Report Modal ────────────────────────────────────────────
// Standalone component — owns no state of its own.
// `report` (the item to show) and `onClose` (setter from AdminDashboard)
// are passed as props so there are zero scope / no-undef issues.
function ViewReportModal({ report, onClose }) {
  if (!report) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl leading-none text-gray-400 hover:text-gray-800 transition-colors"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-4">Report Details</h2>

        {report.image && (
          <img
            src={`http://localhost:5000/uploads/${report.image}`}
            alt="item"
            className="w-full h-52 object-cover rounded-xl mb-4"
          />
        )}

        {report.placeImage && (
  <img
    src={`http://localhost:5000/uploads/${report.placeImage}`}
    alt="place"
    className="w-full h-52 object-cover rounded-xl mb-4"
  />
)}

        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <span className="font-semibold text-gray-900">Title:</span>{" "}
            {report.title}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Description:</span>{" "}
            {report.description}
          </p>
          {/* <p>
            <span className="font-semibold text-gray-900">Location:</span>{" "}
            {report.location}
          </p> */}
            
            <p>
  <span className="font-semibold text-gray-900">Location:</span>{" "}
  {report.location}
</p>

<p>
  <span className="font-semibold text-gray-900">
    Latitude:
  </span>{" "}
  {report.latitude}
</p>

<p>
  <span className="font-semibold text-gray-900">
    Longitude:
  </span>{" "}
  {report.longitude}
</p>

{report.latitude && report.longitude && (
  <a
    href={`https://www.google.com/maps?q=${report.latitude},${report.longitude}`}
    target="_blank"
    rel="noreferrer"
    className="inline-block mt-2 px-3 py-2 bg-blue-600 text-white rounded-lg"
  >
    📍 Open In Google Maps
  </a>
)}
          <p>
            <span className="font-semibold text-gray-900">Category:</span>{" "}
            {report.category}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Type:</span>{" "}
            <span
              className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full capitalize ${
                report.type === "found"
                  ? "bg-teal-100 text-teal-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {report.type}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Report Row ───────────────────────────────────────────────────
// `onView` is a prop — this component never touches AdminDashboard state directly.
function ReportRow({ report, onApprove, onReject, onOpenFoundModal, onView }) {
  const isFound = report.type === "found";

  return (
    <div className="p-5">
      <div className="flex items-start gap-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
            isFound ? "bg-teal-100" : "bg-orange-100"
          }`}
        >
          {isFound ? (
            <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="text-sm font-bold text-gray-900">{report.title}</h3>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                isFound ? "bg-teal-100 text-teal-700" : "bg-orange-100 text-orange-700"
              }`}
            >
              {report.type}
            </span>
            <StatusBadge status={report.status} />
          </div>
          <p className="text-xs text-gray-500 mb-2 line-clamp-2">{report.description}</p>
          <div className="flex flex-wrap gap-3 text-xs text-gray-400">
            <span>👤 {report.userId?.name || "Unknown User"}</span>
            <span>📍 {report.location}</span>
            <span>📅 {new Date(report.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-4 pl-14">
        <button
          onClick={() => onApprove(report._id)} 
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition-colors shadow-sm"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Approve
        </button>

        <button
          onClick={() => onReject(report)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 text-red-600 border border-red-200 text-xs font-bold hover:bg-red-100 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Reject
        </button>

        <button
          onClick={() => onView(report)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-50 text-gray-600 border border-gray-200 text-xs font-semibold hover:bg-gray-100 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View
        </button>
      </div>
    </div>
  );
}

// ── Pending Section Card ─────────────────────────────────────────
// Receives `onView` as a prop and threads it down to every ReportRow.
function PendingSection({ title, badgeColor, items, emptyText, onApprove, onReject, onOpenFoundModal, onView }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-gray-900">{title}</h2>
          {items.length > 0 && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>
              {items.length}
            </span>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="py-12 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-gray-700">All caught up!</p>
          <p className="text-xs text-gray-400 mt-1">{emptyText}</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {items.map((report) => (
            <ReportRow
              key={report._id}
              report={report}
              onApprove={onApprove}
              onReject={onReject}
              onOpenFoundModal={onOpenFoundModal}
              onView={onView}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Admin Dashboard (root) ───────────────────────────────────────
export default function AdminDashboard() {
  // const navigate                                = useNavigate();
  const [reports, setReports]                   = useState([]);
  const [actionFeedback, setActionFeedback]     = useState(null);
  const [selectedReport, setSelectedReport]     = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
const [rejectModal, setRejectModal] = useState(null);
const [rejectReason, setRejectReason] = useState("");

  // const [claims, setClaims]                     = useState([]);
  const [approving, setApproving] = useState(false);
  useEffect(() => {
    fetchReports();
    // fetchClaims();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/items");
      setReports(response.data);
    } catch (error) {
      console.log(error);
    }
  };
//   const fetchClaims = async () => {
//   try {
//     const response = await axios.get("http://localhost:5000/api/claims");
//     setClaims(response.data);
//   } catch (error) {
//     console.log(error);
//   }
// };

  // const pendingReports =
  // reports.filter((r) => r.status !== "approved");

  const pendingReports =
  reports.filter(
    (r) =>
      r.status !== "approved" &&
      r.status !== "rejected"
  );

const aiSuggestions =
  pendingReports.filter((r) => {

    if (!r.matchedItems?.length) return false;

    const matchedItem =
      r.matchedItems?.[0]?.itemId;

    if (!matchedItem) return false;

    return (
      r.status !== "approved" &&
      r.status !== "rejected" &&
      matchedItem.status !== "approved" &&
      matchedItem.status !== "rejected" &&
      JSON.stringify(r)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  });

const pendingLost =
  pendingReports.filter(
    (r) =>
      r.type === "lost" &&
      JSON.stringify(r)
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
  );

const pendingFound =
  pendingReports.filter(
    (r) =>
      r.type === "found" &&
      JSON.stringify(r)
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
  );

  const openRejectModal = (report) => {
  setRejectModal(report);
};

  const handleApproveLost = async (id) => {

  try {

    setApproving(true);

    await axios.put(
    `http://localhost:5000/api/items/${id}`
    );

    await fetchReports();

    showFeedback("approved", id);

  } catch (error) {

    console.log(error);

  } finally {

    setApproving(false);

  }

};

// CHANGED: "Approve Match" calls the new approve-match endpoint to approve BOTH items
const handleApproveMatch = async (id) => {

  try {

    setApproving(true);

    await axios.put(
      `http://localhost:5000/api/items/approve-match/${id}`
    );

    await fetchReports();

    showFeedback("approved", id);

  } catch (error) {

    console.log(error);

  } finally {

    setApproving(false);

  }

};

const handleReject = async (id, reason) => {
  try {
    await axios.put(
      `http://localhost:5000/api/items/reject/${id}`,
      {
        rejectionReason: reason,
      }
    );

    await fetchReports();

    setRejectModal(null);
    setRejectReason("");

    showFeedback("rejected", id);

  } catch (error) {
    console.log(error);
  }
};

  const handleDeleteSuggestion = async (id) => {
    try {
        await axios.put(
            `http://localhost:5000/api/items/remove-match/${id}`
        );

        fetchReports();

    } catch (error) {
        console.log(error);
    }
};

  const showFeedback = (action, id) => {
    setActionFeedback({ action, id });
    setTimeout(() => setActionFeedback(null), 3000);
  };

  return (
    <DashboardLayout isAdmin>
    {approving && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white px-8 py-6 rounded-2xl shadow-xl text-lg font-bold">
      Approving Item...
    </div>
  </div>
)}
      {/* Header */}
      <div className="mb-6">
        {/* <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1> */}
        <h1 className="text-3xl font-bold text-gray-900">
  Pending Items & AI Matches
</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {/* Overview of Lost &amp; Found portal activity —{" "} */}
          Review AI suggestions and approve pending reports
          <span className="font-medium text-blue-600">Aditya University</span>
        </p>
      </div>

      {/* Feedback Toast */}
      {actionFeedback && (
        <div
          className={`mb-5 flex items-center gap-3 p-4 rounded-xl border shadow-sm ${
            actionFeedback.action === "approved"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm font-semibold capitalize">
            Report {actionFeedback.action} successfully.
          </p>
        </div>
      )}

      {/* Analytics Cards */}
      <div className="mb-6">
      <input
        type="text"
        placeholder="Search reports..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        className="w-full md:w-96 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

          <div className="rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-sm max-h-[700px] flex flex-col">
            <div className="px-7 py-5 border-b border-gray-100 flex items-center gap-3">
              <h2 className="text-lg font-bold text-gray-900">
                🤖 AI Suggested Matches
              </h2>

              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                {aiSuggestions.length}
              </span>
            </div>

            <div className="divide-y divide-gray-100 overflow-y-auto">
              {aiSuggestions.length === 0 ? (
                <div className="p-16 text-center text-gray-400">
                  No AI suggestions available
                </div>
              ) : (
                aiSuggestions.map((report) => (
  <div key={report._id} className="p-5">
    <div className="rounded-2xl border border-blue-200 bg-blue-50 p-3">

      <h3 className="text-lg font-bold text-blue-700 mb-3">
        🤖 AI Suggested Match
      </h3>

      <div className="grid md:grid-cols-2 gap-3">

        {/* Current Item */}
        <div className="bg-white rounded-xl p-3 border border-gray-200">
          <p className="text-xs font-bold text-gray-500 mb-3">
            CURRENT ITEM
          </p>

          <h3 className="text-lg font-bold text-gray-900">
            {report.title}
          </h3>

          <p className="text-gray-600 mt-2">
            {report.description}
          </p>

          <p className="text-sm text-gray-500 mt-4">
            📍 {report.location}
          </p>
          </div>

          {/* Matched Item */}
          <div className="bg-white rounded-xl p-3 border border-gray-200">
            <p className="text-xs font-bold text-gray-500 mb-3">
              MATCHED ITEM
            </p>

            <h3 className="text-lg font-bold text-gray-900">
              {report.matchedItems?.[0]?.itemId?.title ||
                "Matched Item"}
            </h3>

            <p className="text-gray-600 mt-2">
              {report.matchedItems?.[0]?.itemId
                ?.description || ""}
            </p>

            <p className="text-sm text-gray-500 mt-4">
              📍 {report.matchedItems?.[0]?.itemId
                ?.location || ""}
            </p>
          </div>
        </div>
          <div className="flex items-center justify-between gap-3 mt-4 flex-wrap">

  <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm font-bold">
    Similarity Score:{" "}
    {Math.round(
      report.matchedItems?.[0]?.similarity || 0
    )}%
  </span>

  <div className="flex gap-2 flex-wrap">

    {/* CHANGED: now calls handleApproveMatch to approve BOTH items */}
    <button
      onClick={() =>
        handleApproveMatch(report._id)
      }
      className="px-3 py-1.5 text-sm rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600"
    >
      Approve Match
    </button>

    <button
      onClick={() =>
        handleDeleteSuggestion(report._id)
      }
      className="px-4 py-2 rounded-xl border border-orange-200 text-orange-600 font-bold hover:bg-orange-50"
    >
      Delete Suggestion
    </button>

    <button
      onClick={() =>
        setSelectedReport(report)
      }
      className="px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 font-semibold"
    >
      View
    </button>

  </div>

</div>
       
      </div>
    </div>
  ))
              )}
            </div>
          </div> 

        <div className="grid grid-cols-2 gap-6 items-start">

  <PendingSection
  title="Pending Lost Items"
  badgeColor="bg-orange-100 text-orange-700 border-orange-200"
  items={pendingLost}
  emptyText="No lost items pending approval"
  onApprove={handleApproveLost}
  onReject={openRejectModal}
  onOpenFoundModal={null}
  onView={setSelectedReport}
  />

  <PendingSection
  title="Pending Found Items"
  badgeColor="bg-teal-100 text-teal-700 border-teal-200"
  items={pendingFound}
  emptyText="No found items pending approval"
  onApprove={handleApproveLost}
  onReject={openRejectModal}
  onView={setSelectedReport}
/>

</div>

      <ViewReportModal
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
      />

      {rejectModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
      
      <h2 className="text-lg font-bold mb-4">
        Reject Item
      </h2>

      <textarea
        value={rejectReason}
        onChange={(e) => setRejectReason(e.target.value)}
        placeholder="Enter rejection reason..."
        className="w-full border rounded-xl p-3 min-h-[120px]"
      />

      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => {
            setRejectModal(null);
            setRejectReason("");
          }}
          className="px-4 py-2 border rounded-xl hover:bg-gray-100 transition-all duration-200"
        >
          Cancel
        </button>

        <button
          onClick={() =>
            handleReject(
              rejectModal._id,
              rejectReason
            )
          }
          className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200"
        >
          Submit
        </button>
      </div>

    </div>
  </div>
)}
      
    </DashboardLayout>
  );
}
