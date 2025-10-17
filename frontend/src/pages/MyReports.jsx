
import { useEffect, useState } from "react";
import { getMyReports } from "../api/reportApi";
import { useAuth } from "../context/AuthContext";
import ReportCard from "../components/ReportCard";
import MapView from "../components/MapView";
import { motion } from "framer-motion";
import ChatWindow from "../components/ChatWindow";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function MyReports() {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      const data = await getMyReports(user._id);
      setReports(data);
    };
    if (user) fetchReports();
  }, [user]);

  // ✅ Remove deleted report from UI immediately
  const handleDeleteLocal = (id) => {
    setReports((prev) => prev.filter((r) => r._id !== id));
  };

  return (
    <div className="p-6 relative">
      <motion.h2
        className="text-3xl font-bold text-blue-700 mb-6 text-center md:text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Reports
      </motion.h2>

      {/* ✅ Map Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <MapView reports={reports} />
      </motion.div>

      {/* ✅ Cards Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {reports.length > 0 ? (
          reports.map((r) => (
            <motion.div
              key={r._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-4 relative"
            >
              <ReportCard report={r} onDelete={handleDeleteLocal} />

              {/* Chat button */}
              <button
                onClick={() => setActiveChat(r._id)}
                className="mt-3 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                💬 Chat
              </button>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">
            No reports submitted yet.
          </p>
        )}
      </div>

      {/* ✅ Chat Modal */}
      <Modal
        isOpen={!!activeChat}
        onRequestClose={() => setActiveChat(null)}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]"
        className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-lg relative"
      >
        {activeChat && <ChatWindow chatId={activeChat} user={user} />}

        <button
          onClick={() => setActiveChat(null)}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-sm"
        >
          Close
        </button>
      </Modal>
    </div>
  );
}







