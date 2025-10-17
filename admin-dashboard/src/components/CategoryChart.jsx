
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { motion } from "framer-motion";

export default function CategoryChart({ data }) {
  if (!data?.length) return <p>No data</p>;

  const formatted = data.map((c) => ({ name: c._id, count: c.count }));

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-white p-4 rounded shadow w-full md:w-2/3 mx-auto">
      <h3 className="text-lg font-semibold mb-2">Reports by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formatted}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" animationDuration={1200} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}







