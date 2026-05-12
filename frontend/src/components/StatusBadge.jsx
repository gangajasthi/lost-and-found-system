const STATUS_STYLES = {
  pending: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-300",
    dot: "bg-amber-500",
    label: "Pending Review",
  },
  approved: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-300",
    dot: "bg-emerald-500",
    label: "Approved",
  },
  rejected: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-300",
    dot: "bg-red-500",
    label: "Rejected",
  },
  claimed: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-300",
    dot: "bg-blue-500",
    label: "Claimed",
  },
  resolved: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-300",
    dot: "bg-purple-500",
    label: "Resolved",
  },
  lost: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-300",
    dot: "bg-orange-500",
    label: "Lost",
  },
  found: {
    bg: "bg-teal-50",
    text: "text-teal-700",
    border: "border-teal-300",
    dot: "bg-teal-500",
    label: "Found",
  },
};

export default function StatusBadge({ status, size = "sm" }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES["pending"];
  const sizeClass = size === "lg" ? "px-3 py-1.5 text-sm" : "px-2.5 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${sizeClass} ${style.bg} ${style.text} ${style.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      {style.label}
    </span>
  );
}
