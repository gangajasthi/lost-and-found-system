import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

export default function StatusBarChart({
  approved,
  pending,
  rejected
}) {
  const data = [
    {
      name: "Approved",
      value: approved,
      color: "#22C55E"
    },
    {
      name: "Pending",
      value: pending,
      color: "#FACC15"
    },
    {
      name: "Rejected",
      value: rejected,
      color: "#EF4444"
    }
  ];

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border">
      <h3 className="font-semibold mb-4">
        Report Status
      </h3>

      <ResponsiveContainer
        width="100%"
        height={250}
      >
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="value">
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.color}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}