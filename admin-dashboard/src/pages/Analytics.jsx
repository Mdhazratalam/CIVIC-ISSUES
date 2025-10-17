
import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b"];

export default function AdminAnalytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await axios.get("http://localhost:5000/api/admin/analytics", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };
    fetchAnalytics();
  }, []);

  if (!data) return <p className="text-center mt-10 text-gray-600">Loading analytics...</p>;

  const statusData = [
    { name: "In-Progress", value: data.inProgress },
    { name: "Pending", value: data.pending },
    { name: "Resolved", value: data.resolved },
  ];

  const categoryData = data.byCategory.map((c) => ({
    name: c._id,
    count: c.count,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 px-6">
      <h2 className="text-4xl font-bold text-blue-700 mb-10 text-center tracking-tight">
        Analytics Dashboard
      </h2>

      <div className="flex flex-col lg:flex-row justify-center gap-10">
        {/* Reports by Status */}
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md flex flex-col items-center hover:shadow-2xl transition">
          <h3 className="text-2xl font-semibold mb-6 text-gray-700">
            Reports by Status
          </h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={130}
                  label
                >
                  {statusData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center mt-4 space-x-6 text-sm">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span> In-Progress
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span> Pending
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span> Resolved
            </div>
          </div>
        </div>

        {/* Reports by Category */}
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md flex flex-col items-center hover:shadow-2xl transition">
          <h3 className="text-2xl font-semibold mb-6 text-gray-700">
            Reports by Category
          </h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[10, 10, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}




