
// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { getAllReports, updateReportStatus, deleteReport } from "../api/adminApi";
import ReportTable from "../components/ReportTable";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "react-modal";
import { FaFileExport, FaUser, FaChartPie, FaFilter } from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

Modal.setAppElement("#root");

export default function Dashboard() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 10;

  const fetchReports = async () => {
    const data = await getAllReports();
    setReports(data);
    setFilteredReports(data);
  };

  const handleUpdate = async (id, status) => {
    await updateReportStatus(id, status);
    setReports((prev) => prev.map((r) => (r._id === id ? { ...r, status } : r)));
    setFilteredReports((prev) => prev.map((r) => (r._id === id ? { ...r, status } : r)));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this report permanently?")) return;
    try {
      await deleteReport(id);
      setReports((prev) => prev.filter((r) => r._id !== id));
      setFilteredReports((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("delete failed:", err);
      alert("Could not delete report");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Filter Logic
  useEffect(() => {
    let filtered = [...reports];

    // Status Filter
    if (statusFilter !== "All") {
      filtered = filtered.filter(r => r.status === statusFilter);
    }

    // Date Filter
    if (dateFilter !== "All") {
      const now = new Date();
      filtered = filtered.filter(r => {
        const reportDate = new Date(r.createdAt);
        const diffDays = Math.floor((now - reportDate) / (1000 * 60 * 60 * 24));
        
        if (dateFilter === "Today") return diffDays === 0;
        if (dateFilter === "Last 7 Days") return diffDays <= 7;
        if (dateFilter === "Last 30 Days") return diffDays <= 30;
        return true;
      });
    }

    // Search Filter
    if (searchQuery) {
      filtered = filtered.filter(r =>
        r.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.department?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredReports(filtered);
    setCurrentPage(1);
  }, [statusFilter, dateFilter, searchQuery, reports]);

  // Statistics
  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === "Pending").length,
    inProgress: reports.filter(r => r.status === "In Progress").length,
    resolved: reports.filter(r => r.status === "Resolved").length,
  };

  // Pie Chart Data
  const pieData = [
    { name: "Pending", value: stats.pending, color: "#F59E0B" },
    { name: "In Progress", value: stats.inProgress, color: "#8B5CF6" },
    { name: "Resolved", value: stats.resolved, color: "#10B981" },
  ].filter(d => d.value > 0);

  // Bar Chart Data - Reports by Department
  const departmentStats = reports.reduce((acc, r) => {
    const dept = r.department || "Unknown";
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.entries(departmentStats).map(([name, count]) => ({
    name,
    reports: count
  }));

  // Pagination
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  // Export to CSV
  const exportToCSV = () => {
    const headers = ["ID", "Title", "Department", "Status", "Date", "Address"];
    const rows = filteredReports.map(r => [
      r._id,
      r.title,
      r.department,
      r.status,
      new Date(r.createdAt).toLocaleDateString(),
      r.location?.address || "N/A"
    ]);

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += headers.join(",") + "\n";
    rows.forEach(row => {
      csvContent += row.map(cell => `"${cell}"`).join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `reports_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6">
      {/* Header with Profile - NO LOGOUT */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h2>
            <p className="text-gray-600 text-sm mt-1">Manage and monitor all civic reports</p>
          </motion.div>

          {/* Admin Profile Panel - WITHOUT LOGOUT */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 bg-blue-50 px-6 py-3 rounded-xl border border-blue-100 shadow-md">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <FaUser className="text-white text-lg" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Logged in as</p>
                <p className="font-bold text-gray-800 text-lg">Admin</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Statistics Cards - Clickable */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        <motion.div
          whileHover={{ scale: 1.03, y: -5 }}
          onClick={() => setStatusFilter("All")}
          className="cursor-pointer bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white shadow-xl hover:shadow-2xl transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl">📊</span>
            <div className={`bg-white/20 rounded-lg px-3 py-1 text-xs font-bold ${statusFilter === "All" ? "ring-2 ring-white" : ""}`}>TOTAL</div>
          </div>
          <h3 className="text-3xl font-bold mb-1">{stats.total}</h3>
          <p className="text-blue-100 text-sm">Total Reports</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03, y: -5 }}
          onClick={() => setStatusFilter("Pending")}
          className="cursor-pointer bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-5 text-white shadow-xl hover:shadow-2xl transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl">⏳</span>
            <div className={`bg-white/20 rounded-lg px-3 py-1 text-xs font-bold ${statusFilter === "Pending" ? "ring-2 ring-white" : ""}`}>PENDING</div>
          </div>
          <h3 className="text-3xl font-bold mb-1">{stats.pending}</h3>
          <p className="text-orange-100 text-sm">Awaiting Action</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03, y: -5 }}
          onClick={() => setStatusFilter("In Progress")}
          className="cursor-pointer bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-5 text-white shadow-xl hover:shadow-2xl transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl">🔄</span>
            <div className={`bg-white/20 rounded-lg px-3 py-1 text-xs font-bold ${statusFilter === "In Progress" ? "ring-2 ring-white" : ""}`}>ACTIVE</div>
          </div>
          <h3 className="text-3xl font-bold mb-1">{stats.inProgress}</h3>
          <p className="text-pink-100 text-sm">In Progress</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03, y: -5 }}
          onClick={() => setStatusFilter("Resolved")}
          className="cursor-pointer bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-5 text-white shadow-xl hover:shadow-2xl transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl">✅</span>
            <div className={`bg-white/20 rounded-lg px-3 py-1 text-xs font-bold ${statusFilter === "Resolved" ? "ring-2 ring-white" : ""}`}>DONE</div>
          </div>
          <h3 className="text-3xl font-bold mb-1">{stats.resolved}</h3>
          <p className="text-emerald-100 text-sm">Resolved</p>
        </motion.div>
      </motion.div>

      {/* Filters and Actions Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-5 mb-6 border border-gray-100"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title, description, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-sm"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Date Filter */}
          <div className="relative">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="appearance-none border-2 border-gray-200 rounded-xl pl-10 pr-10 py-3 text-sm font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-white cursor-pointer"
            >
              <option value="All">All Time</option>
              <option value="Today">Today</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
            </select>
            <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Export Button */}
          <button
            onClick={exportToCSV}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2 whitespace-nowrap"
          >
            <FaFileExport /> Export CSV
          </button>

          {/* Analytics Button */}
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2 whitespace-nowrap"
          >
            <FaChartPie /> {showAnalytics ? "Hide" : "Show"} Analytics
          </button>
        </div>

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Showing <span className="font-bold text-blue-600">{filteredReports.length}</span> of <span className="font-bold">{reports.length}</span> reports
            {statusFilter !== "All" && <span className="ml-2 text-blue-600">• Filtered by: {statusFilter}</span>}
            {dateFilter !== "All" && <span className="ml-2 text-blue-600">• {dateFilter}</span>}
          </p>
        </div>
      </motion.div>

      {/* Analytics Section */}
      <AnimatePresence>
        {showAnalytics && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="grid md:grid-cols-2 gap-6 mb-6"
          >
            {/* Pie Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Status Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Reports by Department</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="reports" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reports Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
      >
        <ReportTable 
          reports={currentReports} 
          onUpdate={handleUpdate} 
          onDelete={handleDelete}
          onViewDetails={setSelectedReport}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 p-6 border-t border-gray-100">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              Previous
            </button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all ${
                    currentPage === i + 1
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              Next
            </button>
          </div>
        )}
      </motion.div>

      {/* View Details Modal */}
      <Modal
        isOpen={!!selectedReport}
        onRequestClose={() => setSelectedReport(null)}
        overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[1000] p-4"
        className="bg-white rounded-2xl shadow-2xl w-[95%] max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        {selectedReport && (
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedReport.title}</h3>
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                  selectedReport.status === "Resolved"
                    ? "bg-green-100 text-green-800"
                    : selectedReport.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {selectedReport.status}
                </span>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-gray-400 hover:text-gray-600 transition-all"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {selectedReport.imageUrl && (
              <img
                src={selectedReport.imageUrl}
                alt="Report"
                className="w-full h-96 object-cover rounded-xl mb-6 shadow-lg"
              />
            )}

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Description</h4>
                <p className="text-gray-600">{selectedReport.description}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Department</h4>
                <p className="text-gray-600">{selectedReport.department}</p>
              </div>

              {selectedReport.location?.address && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Location</h4>
                  <p className="text-gray-600">{selectedReport.location.address}</p>
                </div>
              )}

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Submitted On</h4>
                <p className="text-gray-600">
                  {new Date(selectedReport.createdAt).toLocaleString('en-IN', {
                    dateStyle: 'full',
                    timeStyle: 'short'
                  })}
                </p>
              </div>

              {selectedReport.user && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">User ID</h4>
                  <p className="text-gray-600 font-mono text-sm">
                    {selectedReport.user.name} ({selectedReport.user.email})</p>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
