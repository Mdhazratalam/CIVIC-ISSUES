
// DepartmentDashboard.jsx - COMPLETE OPTIMIZED CODE
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { useDepartment } from "../context/DepartmentContext";
import ChatWindow from "../components/ChatWindow";

Modal.setAppElement("#root");

export default function Dashboard() {
  const { department, logout } = useDepartment();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true); // Initial load ke liye
  const [updating, setUpdating] = useState(null);
  const [prevCount, setPrevCount] = useState(0);
  const [activeChat, setActiveChat] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [formStates, setFormStates] = useState({});

  const fetchReports = async (isInitialLoad = false) => {
    // Sirf initial load pe hi loading state set karo
    if (isInitialLoad) {
      setLoading(true);
    }
    
    try {
      const token = localStorage.getItem("deptToken");
      const res = await axios.get(
        //`http://localhost:5000/api/department-reports/${department.name}`,
        `https://civic-issues-0c9c.onrender.com/api/department-reports/${department.name}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.length > prevCount && prevCount !== 0) {
        toast.success("📢 New issue reported!");
      }

      setReports(res.data);
      setPrevCount(res.data.length);
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast.error("Failed to fetch reports");
    } finally {
      if (isInitialLoad) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (department && !activeChat) {
      fetchReports(true); // Initial load
      const interval = setInterval(() => fetchReports(false), 30000); // Background refresh
      return () => clearInterval(interval);
    }
  }, [department, activeChat]);

  const handleUpdate = async (id, status, file) => {
    try {
      setUpdating(id);
      const token = localStorage.getItem("deptToken");
      const formData = new FormData();
      formData.append("status", status);
      if (file) formData.append("file", file);

      await axios.patch(
        //`http://localhost:5000/api/department-reports/${id}`,
        `https://civic-issues-0c9c.onrender.com/api/department-reports/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("✅ Report updated successfully!");
      
      // File input reset karo
      setFormStates(prev => ({
        ...prev,
        [id]: { fileKey: Date.now() }
      }));
      
      // Background mein fetch karo (no loading screen)
      fetchReports(false);
      
    } catch (error) {
      toast.error("Failed to update report.");
      console.error("Update error:", error.response?.data || error.message);
    } finally {
      setUpdating(null);
    }
  };

  // Calculate statistics
  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === "Pending").length,
    inProgress: reports.filter(r => r.status === "In Progress").length,
    resolved: reports.filter(r => r.status === "Resolved").length,
  };

  // Filter and search logic
  const filteredReports = reports.filter(report => {
    const matchesStatus = filterStatus === "All" || report.status === filterStatus;
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Sirf initial load pe loading screen dikhaao
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-600 font-medium">Loading your reports...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🏛️</span>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {department?.name} Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  Manage civic issues assigned to your department
                </p>
              </div>
            </div>
            
            <button
              onClick={logout}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white shadow-xl hover:shadow-2xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">📊</span>
              <div className="bg-white/20 rounded-lg px-3 py-1 text-xs font-bold">TOTAL</div>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.total}</h3>
            <p className="text-blue-100 text-sm">Total Reports</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-5 text-white shadow-xl hover:shadow-2xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">⏳</span>
              <div className="bg-white/20 rounded-lg px-3 py-1 text-xs font-bold">PENDING</div>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.pending}</h3>
            <p className="text-orange-100 text-sm">Awaiting Action</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-5 text-white shadow-xl hover:shadow-2xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">🔄</span>
              <div className="bg-white/20 rounded-lg px-3 py-1 text-xs font-bold">ACTIVE</div>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.inProgress}</h3>
            <p className="text-pink-100 text-sm">In Progress</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-5 text-white shadow-xl hover:shadow-2xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">✅</span>
              <div className="bg-white/20 rounded-lg px-3 py-1 text-xs font-bold">DONE</div>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.resolved}</h3>
            <p className="text-emerald-100 text-sm">Resolved</p>
          </div>
        </motion.div>

        {/* Filters and Search Section */}
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
                  placeholder="Search by title or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-sm"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
              {["All", "Pending", "In Progress", "Resolved"].map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-6 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                    filterStatus === status
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {status === "All" && "📋 "}
                  {status === "Pending" && "⏳ "}
                  {status === "In Progress" && "🔄 "}
                  {status === "Resolved" && "✅ "}
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Showing <span className="font-bold text-blue-600">{filteredReports.length}</span> of <span className="font-bold">{reports.length}</span> reports
            </p>
          </div>
        </motion.div>

        {/* Reports Grid */}
        {filteredReports.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl shadow-lg"
          >
            <div className="bg-gray-100 rounded-full p-6 mb-4">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Reports Found</h3>
            <p className="text-gray-500 text-center max-w-md">
              {searchQuery || filterStatus !== "All" 
                ? "Try adjusting your filters or search query" 
                : "New reports will appear here when assigned to your department"}
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AnimatePresence mode="popLayout">
              {filteredReports.map((report, index) => (
                <motion.div
                  key={report._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                  whileHover={{ y: -8 }}
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                    <div className="relative flex justify-between items-start">
                      <h3 className="text-lg font-bold text-white pr-2 line-clamp-2">
                        {report.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap shadow-lg ${
                          report.status === "Resolved"
                            ? "bg-green-400 text-green-900"
                            : report.status === "In Progress"
                            ? "bg-yellow-400 text-yellow-900"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {report.status === "Resolved" && "✅ "}
                        {report.status === "In Progress" && "🔄 "}
                        {report.status === "Pending" && "⏳ "}
                        {report.status}
                      </span>
                    </div>
                  </div>

                  {/* Image Section */}
                  {report.imageUrl && (
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      <img
                        src={report.imageUrl}
                        alt="Issue"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-5 space-y-4">
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {report.description}
                    </p>

                    {report.location?.address && (
                      <div className="flex items-start gap-2 text-xs text-gray-600 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-xl border border-blue-100">
                        <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="line-clamp-2 font-medium">{report.location.address}</span>
                      </div>
                    )}

                    {/* Update Form */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const file = e.target.elements.proof.files[0];
                        const status = e.target.elements.status.value;
                        handleUpdate(report._id, status, file);
                      }}
                      className="space-y-3 pt-3 border-t border-gray-100"
                    >
                      <div className="relative">
                        <select
                          name="status"
                          defaultValue={report.status}
                          className="w-full appearance-none border-2 border-gray-200 rounded-xl p-3 text-sm font-medium text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-white cursor-pointer hover:border-gray-300"
                        >
                          <option value="Pending">⏳ Pending</option>
                          <option value="In Progress">🔄 In Progress</option>
                          <option value="Resolved">✅ Resolved</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>

                      <label className="block">
                        <span className="text-xs font-semibold text-gray-600 mb-2 block">📎 Attach Proof</span>
                        <input
                          key={formStates[report._id]?.fileKey || 0}
                          type="file"
                          name="proof"
                          accept="image/*"
                          className="block w-full text-xs text-gray-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-medium file:bg-gradient-to-r file:from-blue-50 file:to-indigo-50 file:text-blue-700 hover:file:from-blue-100 hover:file:to-indigo-100 file:cursor-pointer cursor-pointer transition-all"
                        />
                      </label>

                      <div className="flex gap-2">
                        <button
                          type="submit"
                          disabled={updating === report._id}
                          className={`flex-1 py-3 text-white rounded-xl font-medium text-sm transition-all duration-200 ${
                            updating === report._id
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                          }`}
                        >
                          {updating === report._id ? (
                            <span className="flex items-center justify-center gap-2">
                              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Updating...
                            </span>
                          ) : (
                            "Update Report"
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveChat(report._id)}
                          className="px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                          title="Open Chat"
                        >
                          💬
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Enhanced Modal */}
      <Modal
        isOpen={activeChat !== null}
        onRequestClose={() => setActiveChat(null)}
        overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[1000] p-4"
        className="bg-white rounded-2xl shadow-2xl w-[95%] max-w-2xl max-h-[85vh] relative"
      >
        <div className="flex flex-col h-full max-h-[85vh]">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-2xl">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              💬 Support Chat
            </h3>
            <button
              onClick={() => setActiveChat(null)}
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <ChatWindow chatId={activeChat} user={department} />
          </div>
        </div>
      </Modal>
    </div>
  );
}

