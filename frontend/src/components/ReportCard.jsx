

import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function ReportCard({ report, onDelete }) {
  const { user } = useAuth();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/reports/${report._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Report deleted successfully!");
      onDelete(report._id);
    } catch (error) {
      alert("Failed to delete report!");
    }
  };

  return (
    <motion.div
      className="bg-white p-4 rounded-2xl shadow hover:shadow-xl transition relative"
      whileHover={{ scale: 1.03 }}
    >
      {/* ✅ Title */}
      <h3 className="font-semibold text-lg text-blue-700">{report.title}</h3>

      {/* ✅ Description */}
      <p className="text-gray-500 mb-2">{report.description}</p>

      {/* ✅ Image */}
      {report.imageUrl && (
        <img
          src={report.imageUrl}
          alt="Report"
          className="mt-2 rounded-lg w-full h-40 object-cover"
        />
      )}

      {/* ✅ Category, Status, Votes */}
      <div className="flex flex-col mt-3 space-y-1 text-sm">
        <span>
          <b>Category:</b> {report.category || "N/A"}
        </span>
        <span>
          <b>Status:</b>{" "}
          <span
            className={`${
              report.status === "Resolved"
                ? "text-green-600"
                : report.status === "In Progress"
                ? "text-yellow-600"
                : "text-gray-600"
            } font-semibold`}
          >
            {report.status}
          </span>
        </span>
        {/* <span>
          <b>Votes:</b> {report.votes}
        </span> */}
      </div>

      {/* ✅ Delete Button */}
      {user && (
        <button
          onClick={handleDelete}
          className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow"
        >
          <FaTrash size={14} />
        </button>
      )}
    </motion.div>
  );
}
