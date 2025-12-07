
// src/components/ReportTable.jsx
import { motion } from "framer-motion";
import { FaEye, FaTrash, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function ReportTable({ reports, onUpdate, onDelete, onViewDetails }) {
  
  // Status Badge Component
  const getStatusBadge = (status) => {
    const badges = {
      "Pending": {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        border: "border-yellow-300",
        icon: "⏳"
      },
      "In Progress": {
        bg: "bg-purple-100",
        text: "text-purple-800",
        border: "border-purple-300",
        icon: "🔄"
      },
      "Resolved": {
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-300",
        icon: "✅"
      }
    };
    
    const badge = badges[status] || {
      bg: "bg-gray-100",
      text: "text-gray-800",
      border: "border-gray-300",
      icon: "❓"
    };
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border-2 ${badge.bg} ${badge.text} ${badge.border}`}>
        <span>{badge.icon}</span>
        {status}
      </span>
    );
  };

  // Empty State
  if (reports.length === 0) {
    return (
      <div className="text-center py-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg"
        >
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-700 mb-3">No Reports Found</h3>
        <p className="text-gray-500 mb-6">Try adjusting your filters or search query</p>
        <div className="inline-flex items-center gap-2 text-sm text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          No matching records in the database
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        {/* Table Header */}
        <thead className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white">
          <tr>
            <th className="p-4 text-left font-bold text-sm uppercase tracking-wide">
              #
            </th>
            <th className="p-4 text-left font-bold text-sm uppercase tracking-wide">
              Title
            </th>
            <th className="p-4 text-left font-bold text-sm uppercase tracking-wide">
              Department
            </th>
            <th className="p-4 text-left font-bold text-sm uppercase tracking-wide">
              Status
            </th>
            <th className="p-4 text-left font-bold text-sm uppercase tracking-wide">
              <div className="flex items-center gap-1">
                <FaClock className="text-xs" />
                Date
              </div>
            </th>
            <th className="p-4 text-left font-bold text-sm uppercase tracking-wide">
              Location
            </th>
            <th className="p-4 text-center font-bold text-sm uppercase tracking-wide">
              Actions
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {reports.map((report, index) => (
            <motion.tr
              key={report._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
              className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
            >
              {/* Serial Number */}
              <td className="p-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-700">{index + 1}</span>
                </div>
              </td>

              {/* Title (Clickable) */}
              <td className="p-4">
                <button
                  onClick={() => onViewDetails(report)}
                  className="group flex items-start gap-2 text-left max-w-xs"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {report.title}
                    </p>
                    {report.description && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                        {report.description}
                      </p>
                    )}
                  </div>
                  <FaEye className="text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1" />
                </button>
              </td>

              {/* Department */}
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm">🏢</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {report.department || "N/A"}
                  </span>
                </div>
              </td>

              {/* Status Badge */}
              <td className="p-4">
                {getStatusBadge(report.status)}
              </td>

              {/* Date */}
              <td className="p-4">
                <div className="text-sm">
                  <p className="font-medium text-gray-700">
                    {new Date(report.createdAt).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(report.createdAt).toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </td>

              {/* Location */}
              <td className="p-4">
                {report.location?.address ? (
                  <div className="flex items-start gap-2 max-w-xs">
                    <FaMapMarkerAlt className="text-red-500 flex-shrink-0 mt-1 text-xs" />
                    <span className="text-sm text-gray-600 line-clamp-2">
                      {report.location.address}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-gray-400 italic">No location</span>
                )}
              </td>

              {/* Actions */}
              <td className="p-4">
                <div className="flex items-center justify-center gap-2">
                  {/* Status Dropdown */}
                  <div className="relative">
                    <select
                      onChange={(e) => onUpdate(report._id, e.target.value)}
                      value={report.status}
                      className="appearance-none border-2 border-gray-200 rounded-xl px-3 py-2 pr-8 text-sm font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-white cursor-pointer hover:border-gray-300"
                    >
                      <option value="Pending">⏳ Pending</option>
                      <option value="In Progress">🔄 In Progress</option>
                      <option value="Resolved">✅ Resolved</option>
                    </select>
                    <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* View Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onViewDetails(report)}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white p-2.5 rounded-xl transition-all shadow-md hover:shadow-lg"
                    title="View Details"
                  >
                    <FaEye className="text-sm" />
                  </motion.button>

                  {/* Delete Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onDelete(report._id)}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-2.5 rounded-xl transition-all shadow-md hover:shadow-lg"
                    title="Delete Report"
                  >
                    <FaTrash className="text-sm" />
                  </motion.button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
