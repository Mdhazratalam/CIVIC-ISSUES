

// src/components/ReportTable.jsx
import { FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ReportTable({ reports = [], onUpdate, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">
      <table className="w-full text-left">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3">Title</th>
            <th className="p-3">Category</th>
            <th className="p-3">Status</th>
            {/* <th className="p-3">Votes</th> */}
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <motion.tr
              key={r._id}
              className="border-b hover:bg-blue-50"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <td className="p-3">{r.title}</td>
              <td className="p-3">{r.category}</td>
              <td className="p-3">
                <select
                  value={r.status}
                  onChange={(e) => onUpdate(r._id, e.target.value)}
                  className="border rounded px-2 py-1"
                  disabled={r.status === "Pending"} // 🚫 disable if department not acted
                >
                  <option value="Pending">Pending</option>
                  <option value="In-Progress">In-Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </td>
              {/* <td className="p-3 text-center">{r.votes || 0}</td> */}
              <td className="p-3 text-center flex justify-center gap-3">
                <button
                  onClick={() => {
                    if (typeof onDelete === "function") onDelete(r._id);
                  }}
                  className="inline-flex items-center gap-2 bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600 transition"
                >
                  <FaTrash />
                  Delete
                </button>

                <button
                  onClick={() => onUpdate(r._id, r.status)}
                  disabled={r.status === "Pending"} // 🚫 block update button too
                  className={`px-3 py-1 rounded text-white ${
                    r.status === "Pending"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  Update
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
