import { useState } from "react";
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
  blue: { bg: "bg-blue-50", icon: "bg-blue-100 text-blue-600", ring: "ring-blue-200" },
  amber: { bg: "bg-amber-50", icon: "bg-amber-100 text-amber-600", ring: "ring-amber-200" },
  emerald: { bg: "bg-emerald-50", icon: "bg-emerald-100 text-emerald-600", ring: "ring-emerald-200" },
  purple: { bg: "bg-purple-50", icon: "bg-purple-100 text-purple-600", ring: "ring-purple-200" },
};

// ── Pending Reports ──────────────────────────────────────────────
const PENDING_REPORTS = [
  {
    id: 1, type: "lost", title: "Apple AirPods Pro", category: "Electronics",
    description: "White AirPods Pro with MagSafe case. Lost near the auditorium after the seminar.",
    submittedBy: "Ravi Kumar (21CSE045)", date: "2025-01-14", location: "Auditorium",
    status: "pending",
  },
  {
    id: 2, type: "found", title: "Debit Card (SBI)", category: "ID Card / Documents",
    description: "SBI debit card found on a bench in the library. Cardholder name visible.",
    submittedBy: "Priya Sharma (22ECE012)", date: "2025-01-13", location: "Library",
    status: "pending",
  },
  {
    id: 3, type: "lost", title: "Casio Scientific Calculator", category: "Stationery",
    description: "Casio FX-991EX ClassWiz, black, with name sticker on the back.",
    submittedBy: "Mohammed Ali (21ME078)", date: "2025-01-12", location: "Labs Complex",
    status: "pending",
  },
];

// ── Recent Activity ──────────────────────────────────────────────
const RECENT_ACTIVITY = [
  { id: 1, action: "approved", item: "Student ID Card", by: "Admin", time: "2 hrs ago", color: "emerald" },
  { id: 2, action: "rejected", item: "Duplicate wallet report", by: "Admin", time: "4 hrs ago", color: "red" },
  { id: 3, action: "claim verified", item: "Laptop Charger", by: "Admin", time: "Yesterday", color: "blue" },
  { id: 4, action: "new report", item: "Blue Water Bottle", by: "System", time: "Yesterday", color: "amber" },
  { id: 5, action: "resolved", item: "Silver Bracelet", by: "Admin", time: "2 days ago", color: "purple" },
];

const ACT_COLORS = {
  emerald: "bg-emerald-100 text-emerald-700",
  red: "bg-red-100 text-red-700",
  blue: "bg-blue-100 text-blue-700",
  amber: "bg-amber-100 text-amber-700",
  purple: "bg-purple-100 text-purple-700",
};

// ── Component ────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [reports, setReports] = useState(PENDING_REPORTS);
  const [actionFeedback, setActionFeedback] = useState(null);

  const handleAction = (id, action) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
    setActionFeedback({ action, id });
    setTimeout(() => setActionFeedback(null), 3000);
  };

  return (
    <DashboardLayout isAdmin>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Overview of Lost & Found portal activity — <span className="font-medium text-blue-600">Aditya University</span>
        </p>
      </div>

      {/* Feedback Toast */}
      {actionFeedback && (
        <div className={`mb-5 flex items-center gap-3 p-4 rounded-xl border shadow-sm
          ${actionFeedback.action === "approved"
            ? "bg-emerald-50 border-emerald-200 text-emerald-800"
            : "bg-red-50 border-red-200 text-red-800"}`}
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
          return (
            <div key={stat.label} className={`rounded-2xl p-5 border border-gray-100 shadow-sm ${c.bg}`}>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ring-2 ${c.icon} ${c.ring}`}>
                {stat.icon}
              </div>
              <p className="text-2xl font-black text-gray-900 leading-tight">{stat.value}</p>
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
        {/* Pending Approvals (2/3 width) */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Card Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-gray-900">Pending Approvals</h2>
                {reports.length > 0 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
                    {reports.length}
                  </span>
                )}
              </div>
              <button className="text-xs font-semibold text-blue-600 hover:underline">View All</button>
            </div>

            {/* Reports */}
            {reports.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-gray-700">All caught up!</p>
                <p className="text-xs text-gray-400 mt-1">No reports pending approval</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {reports.map((report) => (
                  <div key={report.id} className="p-5">
                    <div className="flex items-start gap-4">
                      {/* Type Icon */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
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
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="text-sm font-bold text-gray-900">{report.title}</h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize
                            ${report.type === "lost" ? "bg-orange-100 text-orange-700" : "bg-teal-100 text-teal-700"}`}>
                            {report.type}
                          </span>
                          <StatusBadge status={report.status} />
                        </div>
                        <p className="text-xs text-gray-500 mb-2 line-clamp-2">{report.description}</p>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                          <span>👤 {report.submittedBy}</span>
                          <span>📍 {report.location}</span>
                          <span>📅 {report.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-4 pl-14">
                      <button
                        onClick={() => handleAction(report.id, "approved")}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition-colors shadow-sm"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(report.id, "rejected")}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 text-red-600 border border-red-200 text-xs font-bold hover:bg-red-100 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Reject
                      </button>
                      <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-50 text-gray-600 border border-gray-200 text-xs font-semibold hover:bg-gray-100 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { label: "Lost Reports", value: "87", color: "orange" },
              { label: "Found Reports", value: "61", color: "teal" },
              { label: "Recovery Rate", value: "63%", color: "blue" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 text-center">
                <p className={`text-2xl font-black
                  ${s.color === "orange" ? "text-orange-500" : s.color === "teal" ? "text-teal-600" : "text-blue-600"}`}>
                  {s.value}
                </p>
                <p className="text-xs text-gray-500 font-medium mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity (1/3 width) */}
        <div>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-bold text-gray-900">Recent Activity</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {RECENT_ACTIVITY.map((act) => (
                <div key={act.id} className="px-5 py-4 flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold capitalize
                    ${ACT_COLORS[act.color]}`}>
                    {act.action.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">{act.item}</p>
                    <p className="text-[11px] text-gray-400 capitalize">{act.action} · {act.by}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 flex-shrink-0">{act.time}</span>
                </div>
              ))}
            </div>

            {/* NLP / OpenCV suggestion note */}
            <div className="p-4 border-t border-gray-100 bg-blue-50">
              <p className="text-[10px] font-bold text-blue-700 uppercase tracking-wide mb-1">AI Suggestion System</p>
              <p className="text-[10px] text-blue-600">
                OpenCV & NLP matching runs in background to suggest potential matches. Admin makes final decision.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
