import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";
import StatusBadge from "../components/StatusBadge";

// ── Analytics Data ──────────────────────────────────────────────
const ANALYTICS = [
  {
    label: "Total Reports",
    value: "148",
    change: "+12 this week",
    positive: true,
    color: "blue",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    label: "Pending Approvals",
    value: "5",
    change: "Needs attention",
    positive: false,
    color: "amber",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Items Resolved",
    value: "93",
    change: "+8 this month",
    positive: true,
    color: "emerald",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Active Claims",
    value: "17",
    change: "+3 today",
    positive: true,
    color: "purple",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const COLOR_MAP = {
  blue:    { bg: "bg-blue-50",    icon: "bg-blue-100 text-blue-600",       ring: "ring-blue-200"    },
  amber:   { bg: "bg-amber-50",   icon: "bg-amber-100 text-amber-600",     ring: "ring-amber-200"   },
  emerald: { bg: "bg-emerald-50", icon: "bg-emerald-100 text-emerald-600", ring: "ring-emerald-200" },
  purple:  { bg: "bg-purple-50",  icon: "bg-purple-100 text-purple-600",   ring: "ring-purple-200"  },
};

// ── Recent Activity ──────────────────────────────────────────────
const RECENT_ACTIVITY = [
  { id: 1, action: "approved",       item: "Student ID Card",         by: "Admin",  time: "2 hrs ago",  color: "emerald" },
  { id: 2, action: "rejected",       item: "Duplicate wallet report", by: "Admin",  time: "4 hrs ago",  color: "red"     },
  { id: 3, action: "claim verified", item: "Laptop Charger",          by: "Admin",  time: "Yesterday",  color: "blue"    },
  { id: 4, action: "new report",     item: "Blue Water Bottle",       by: "System", time: "Yesterday",  color: "amber"   },
  { id: 5, action: "resolved",       item: "Silver Bracelet",         by: "Admin",  time: "2 days ago", color: "purple"  },
];

const ACT_COLORS = {
  emerald: "bg-emerald-100 text-emerald-700",
  red:     "bg-red-100 text-red-700",
  blue:    "bg-blue-100 text-blue-700",
  amber:   "bg-amber-100 text-amber-700",
  purple:  "bg-purple-100 text-purple-700",
};

// ── Found-Item Approval Modal ────────────────────────────────────
function FoundApprovalModal({ report, onClose, onApproved }) {
  const [adminTitle, setAdminTitle]             = useState("");
  const [adminDescription, setAdminDescription] = useState("");
  const [imageChoice, setImageChoice]           = useState("none");
  const [imageFile, setImageFile]               = useState(null);
  const [submitting, setSubmitting]             = useState(false);
  const [error, setError]                       = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!adminTitle.trim()) { setError("Public title is required."); return; }
    if (!adminDescription.trim()) { setError("Public description is required."); return; }

    try {
      setSubmitting(true);
      setError("");

      const formData = new FormData();
      formData.append("adminTitle",       adminTitle.trim());
      formData.append("adminDescription", adminDescription.trim());

      if (imageChoice === "upload" && imageFile) {
        formData.append("image", imageFile);
      } else if (imageChoice === "existing") {
        formData.append("useExistingImage", "true");
      }

      await axios.put(
        `http://localhost:5000/api/items/${report._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      onApproved();
      onClose();
    } catch (err) {
      setError("Failed to approve item. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-teal-700 to-teal-500 px-6 py-5">
          <h2 className="text-base font-bold text-white">Approve Found Item</h2>
          <p className="text-xs text-teal-100 mt-1 truncate">Original: {report.title}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-xs text-amber-700">
              The public details below will be shown to all users instead of the finder's original
              report. Do <strong>not</strong> reveal the finder's identity.
            </p>
          </div>

          {report.image && (
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1">Original finder's image (private)</p>
              <img
                src={`http://localhost:5000/uploads/${report.image}`}
                alt="original"
                className="h-24 w-auto rounded-xl border border-gray-200 object-contain bg-gray-50"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Public Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={adminTitle}
              onChange={(e) => setAdminTitle(e.target.value)}
              placeholder="e.g., Black Wallet Found Near Library"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Public Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={adminDescription}
              onChange={(e) => setAdminDescription(e.target.value)}
              placeholder="Describe the item without revealing finder details..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Public Image (optional)
            </label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="imageChoice"
                  value="upload"
                  checked={imageChoice === "upload"}
                  onChange={() => setImageChoice("upload")}
                  className="accent-teal-600"
                />
                <span className="text-sm text-gray-700">Upload a different image</span>
              </label>
              {imageChoice === "upload" && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0] || null)}
                  className="ml-6 text-xs text-gray-600"
                />
              )}

              {report.image && (
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="imageChoice"
                    value="existing"
                    checked={imageChoice === "existing"}
                    onChange={() => setImageChoice("existing")}
                    className="accent-teal-600"
                  />
                  <span className="text-sm text-gray-700">Use original image</span>
                </label>
              )}

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="imageChoice"
                  value="none"
                  checked={imageChoice === "none"}
                  onChange={() => setImageChoice("none")}
                  className="accent-teal-600"
                />
                <span className="text-sm text-gray-700">No image (text only)</span>
              </label>
            </div>
          </div>

          {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3 rounded-xl bg-teal-600 text-white text-sm font-bold hover:bg-teal-700 transition-colors disabled:opacity-60"
            >
              {submitting ? "Approving..." : "Approve & Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── View Report Modal ────────────────────────────────────────────
// Standalone component — owns no state of its own.
// `report` (the item to show) and `onClose` (setter from AdminDashboard)
// are passed as props so there are zero scope / no-undef issues.
function ViewReportModal({ report, onClose }) {
  if (!report) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg relative">
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

        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <span className="font-semibold text-gray-900">Title:</span>{" "}
            {report.title}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Description:</span>{" "}
            {report.description}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Location:</span>{" "}
            {report.location}
          </p>
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
          onClick={() => (isFound ? onOpenFoundModal(report) : onApprove(report._id))}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition-colors shadow-sm"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Approve
        </button>

        <button
          onClick={() => onReject(report._id)}
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
  const [reports, setReports]                   = useState([]);
  const [actionFeedback, setActionFeedback]     = useState(null);
  const [foundModalReport, setFoundModalReport] = useState(null);
  const [selectedReport, setSelectedReport]     = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/items");
      setReports(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const pendingReports = reports.filter((r) => r.status !== "approved");
  const pendingLost    = pendingReports.filter((r) => r.type === "lost");
  const pendingFound   = pendingReports.filter((r) => r.type === "found");

  const totalReports  = reports.length;
  const resolvedItems = reports.filter((r) => r.status === "approved").length;
  const activeClaims  = 0;
  const lostReports   = reports.filter((r) => r.type === "lost").length;
  const foundReports  = reports.filter((r) => r.type === "found").length;
  const recoveryRate  = totalReports > 0 ? Math.round((resolvedItems / totalReports) * 100) : 0;

  const handleApproveLost = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/items/${id}`, { status: "approved" });
      fetchReports();
      showFeedback("approved", id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      fetchReports();
      showFeedback("rejected", id);
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
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Overview of Lost &amp; Found portal activity —{" "}
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {ANALYTICS.map((stat) => {
          const c = COLOR_MAP[stat.color];
          const value =
            stat.label === "Total Reports"
              ? totalReports
              : stat.label === "Pending Approvals"
              ? pendingReports.length
              : stat.label === "Items Resolved"
              ? resolvedItems
              : activeClaims;
          return (
            <div key={stat.label} className={`rounded-2xl p-5 border border-gray-100 shadow-sm ${c.bg}`}>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ring-2 ${c.icon} ${c.ring}`}>
                {stat.icon}
              </div>
              <p className="text-2xl font-black text-gray-900 leading-tight">{value}</p>
              <p className="text-xs font-semibold text-gray-600 mt-0.5">{stat.label}</p>
              <p className={`text-[11px] font-medium mt-1 ${stat.positive ? "text-emerald-600" : "text-amber-600"}`}>
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: Pending sections (2/3 width) */}
        <div className="xl:col-span-2 space-y-6">

          {/*
            KEY FIX: `setSelectedReport` lives here in AdminDashboard.
            We pass it down as the `onView` prop to PendingSection,
            which forwards it to ReportRow, which calls it on button click.
            No child ever references `setSelectedReport` by name — zero no-undef errors.
          */}
          <PendingSection
            title="Pending Lost Items"
            badgeColor="bg-orange-100 text-orange-700 border-orange-200"
            items={pendingLost}
            emptyText="No lost items pending approval"
            onApprove={handleApproveLost}
            onReject={handleReject}
            onOpenFoundModal={setFoundModalReport}
            onView={setSelectedReport}
          />

          <PendingSection
            title="Pending Found Items"
            badgeColor="bg-teal-100 text-teal-700 border-teal-200"
            items={pendingFound}
            emptyText="No found items pending approval"
            onApprove={handleApproveLost}
            onReject={handleReject}
            onOpenFoundModal={setFoundModalReport}
            onView={setSelectedReport}
          />

          {/* Quick Stats Row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Lost Reports",  value: lostReports,        color: "orange" },
              { label: "Found Reports", value: foundReports,       color: "teal"   },
              { label: "Recovery Rate", value: `${recoveryRate}%`, color: "blue"   },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 text-center">
                <p
                  className={`text-2xl font-black ${
                    s.color === "orange"
                      ? "text-orange-500"
                      : s.color === "teal"
                      ? "text-teal-600"
                      : "text-blue-600"
                  }`}
                >
                  {s.value}
                </p>
                <p className="text-xs text-gray-500 font-medium mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Recent Activity (1/3 width) */}
        <div>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-bold text-gray-900">Recent Activity</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {RECENT_ACTIVITY.map((act) => (
                <div key={act.id} className="px-5 py-4 flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold capitalize ${
                      ACT_COLORS[act.color]
                    }`}
                  >
                    {act.action.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">{act.item}</p>
                    <p className="text-[11px] text-gray-400 capitalize">
                      {act.action} &middot; {act.by}
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-400 flex-shrink-0">{act.time}</span>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-100 bg-blue-50">
              <p className="text-[10px] font-bold text-blue-700 uppercase tracking-wide mb-1">
                AI Suggestion System
              </p>
              <p className="text-[10px] text-blue-600">
                OpenCV &amp; NLP matching runs in background to suggest potential matches. Admin makes final decision.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Found Item Approval Modal */}
      {foundModalReport && (
        <FoundApprovalModal
          report={foundModalReport}
          onClose={() => setFoundModalReport(null)}
          onApproved={() => {
            fetchReports();
            showFeedback("approved", foundModalReport._id);
          }}
        />
      )}

      {/*
        View Report Modal.
        `selectedReport` and `setSelectedReport` are defined here in AdminDashboard — no scope issues.
        ViewReportModal renders null when report is null, so no conditional JSX needed here.
      */}
      <ViewReportModal
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
      />
    </DashboardLayout>
  );
}
