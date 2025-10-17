

// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { getAllReports, updateReportStatus, deleteReport } from "../api/adminApi";
import ReportTable from "../components/ReportTable";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    const data = await getAllReports();
    setReports(data);
  };

  const handleUpdate = async (id, status) => {
    await updateReportStatus(id, status);
    // optimistic update
    setReports((prev) => prev.map((r) => (r._id === id ? { ...r, status } : r)));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this report permanently?")) return;
    try {
      await deleteReport(id);
      setReports((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("delete failed:", err);
      alert("Could not delete report");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <motion.h2 className="text-3xl font-bold text-blue-700 mb-6" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        All Reports
      </motion.h2>

      <ReportTable reports={reports} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
}


