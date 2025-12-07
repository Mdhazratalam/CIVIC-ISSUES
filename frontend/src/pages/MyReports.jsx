
import { useEffect, useState } from "react";
import { getMyReports } from "../api/reportApi";
import { useAuth } from "../context/AuthContext";
import ReportCard from "../components/ReportCard";
import MapView from "../components/MapView";
import { motion, AnimatePresence } from "framer-motion";
import ChatWindow from "../components/ChatWindow";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function MyReports() {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const fetchReports = async () => {
      const data = await getMyReports(user._id);
      setReports(data);
    };
    if (user) fetchReports();
  }, [user]);

  const handleDeleteLocal = (id) => {
    setReports((prev) => prev.filter((r) => r._id !== id));
  };

  // Calculate statistics
  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === "Pending").length,
    inProgress: reports.filter(r => r.status === "In Progress").length,
    resolved: reports.filter(r => r.status === "Resolved").length,
  };

  // Filter, search, and sort
  let filteredReports = reports.filter(report => {
    const matchesStatus = filterStatus === "All" || report.status === filterStatus;
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (report.description && report.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  // Sort logic
  if (sortBy === "newest") {
    filteredReports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sortBy === "oldest") {
    filteredReports.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sortBy === "status") {
    const statusOrder = { "Pending": 1, "In Progress": 2, "Resolved": 3 };
    filteredReports.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-2">My Reports</h2>
        <p className="text-gray-600">Track and manage all your submitted reports</p>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white shadow-xl">
          <div className="text-3xl mb-2">📊</div>
          <h3 className="text-3xl font-bold">{stats.total}</h3>
          <p className="text-blue-100 text-sm">Total Reports</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-5 text-white shadow-xl">
          <div className="text-3xl mb-2">⏳</div>
          <h3 className="text-3xl font-bold">{stats.pending}</h3>
          <p className="text-orange-100 text-sm">Pending</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-5 text-white shadow-xl">
          <div className="text-3xl mb-2">🔄</div>
          <h3 className="text-3xl font-bold">{stats.inProgress}</h3>
          <p className="text-pink-100 text-sm">In Progress</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-5 text-white shadow-xl">
          <div className="text-3xl mb-2">✅</div>
          <h3 className="text-3xl font-bold">{stats.resolved}</h3>
          <p className="text-emerald-100 text-sm">Resolved</p>
        </div>
      </motion.div>

      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6 rounded-2xl overflow-hidden shadow-xl"
      >
        <MapView reports={reports} />
      </motion.div>

      {/* Filter and Search Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-5 mb-6"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-sm"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none border-2 border-gray-200 rounded-xl pl-4 pr-10 py-3 text-sm font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-white cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="status">Sort by Status</option>
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {["All", "Pending", "In Progress", "Resolved"].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-6 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
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

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-gray-600">
            Showing <span className="font-bold text-blue-600">{filteredReports.length}</span> of <span className="font-bold">{reports.length}</span> reports
          </p>
        </div>
      </motion.div>

      {/* Reports Grid */}
      {filteredReports.length > 0 ? (
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <AnimatePresence mode="popLayout">
            {filteredReports.map((r, index) => (
              <motion.div
                key={r._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                whileHover={{ y: -8 }}
              >
                {/* Status Badge */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 relative">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-white pr-2 line-clamp-2">
                      {r.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap shadow-lg ${
                        r.status === "Resolved"
                          ? "bg-green-400 text-green-900"
                          : r.status === "In Progress"
                          ? "bg-yellow-400 text-yellow-900"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {r.status === "Resolved" && "✅ "}
                      {r.status === "In Progress" && "🔄 "}
                      {r.status === "Pending" && "⏳ "}
                      {r.status}
                    </span>
                  </div>
                  {r.createdAt && (
                    <p className="text-xs text-blue-100 mt-2">
                      📅 {new Date(r.createdAt).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </p>
                  )}
                </div>

                <div className="p-5">
                  <ReportCard report={r} onDelete={handleDeleteLocal} />

                  {/* Chat Button */}
                  <button
                    onClick={() => setActiveChat(r._id)}
                    className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-3 rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
                  >
                    💬 Open Chat
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl shadow-lg"
        >
          <div className="bg-gray-100 rounded-full p-8 mb-4">
            <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Reports Found</h3>
          <p className="text-gray-500 text-center max-w-md mb-6">
            {searchQuery || filterStatus !== "All" 
              ? "Try adjusting your filters or search query" 
              : "You haven't submitted any reports yet. Start by creating one!"}
          </p>
          {!searchQuery && filterStatus === "All" && (
            <a
              href="/create-report"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Create First Report
            </a>
          )}
        </motion.div>
      )}

      {/* Chat Modal */}
      <Modal
        isOpen={!!activeChat}
        onRequestClose={() => setActiveChat(null)}
        overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[1000] p-4"
        className="bg-white rounded-2xl shadow-2xl w-[95%] max-w-2xl max-h-[85vh] relative"
      >
        <div className="flex flex-col h-full max-h-[85vh]">
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-2xl">
            <h3 className="text-xl font-bold text-white">💬 Chat Support</h3>
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
            {activeChat && <ChatWindow chatId={activeChat} user={user} />}
          </div>
        </div>
      </Modal>
    </div>
  );
}