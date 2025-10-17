

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

export default function AnalyticsChart({ data }) {
  const chartData = [
    { name: "Pending", value: data.pending || 0 },
    { name: "In-Progress", value: data.inProgress || 0 },
    { name: "Resolved", value: data.resolved || 0 },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col items-center bg-white shadow p-4 rounded w-full md:w-1/2 mx-auto">
      <h2 className="text-lg font-semibold mb-2">Reports by Status</h2>
      <PieChart width={300} height={300}>
        <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100} animationDuration={1200}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </motion.div>
  );
}







