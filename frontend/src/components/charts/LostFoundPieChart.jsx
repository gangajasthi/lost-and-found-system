import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function LostFoundPieChart({
  lost,
  found
}) {
  const data = [
    { name: "Lost", value: lost },
    { name: "Found", value: found }
  ];

  const COLORS = [
    "#F97316", // Orange
    "#2563EB"  // Blue
  ];

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border">
      <h3 className="font-semibold mb-4">
        Lost vs Found Reports
      </h3>

      <ResponsiveContainer
        width="100%"
        height={250}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}