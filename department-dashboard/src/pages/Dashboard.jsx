
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { useDepartment } from "../context/DepartmentContext";
import ChatWindow from "../components/ChatWindow";

Modal.setAppElement("#root");

export default function Dashboard() {
  const { department, logout } = useDepartment();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(null);
  const [prevCount, setPrevCount] = useState(0);
  const [activeChat, setActiveChat] = useState(null);

  // ✅ Fetch reports function
  const fetchReports = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("deptToken");
      const res = await axios.get(
        `http://localhost:5000/api/department-reports/${department.name}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.length > prevCount && prevCount !== 0) {
        toast.success("📢 New issue reported!");
      }

      setReports(res.data);
      setPrevCount(res.data.length);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Auto refresh setup (pause when chat open)
  useEffect(() => {
    if (department && !activeChat) {
      fetchReports();
      const interval = setInterval(fetchReports, 30000);
      return () => clearInterval(interval);
    }
  }, [department, activeChat]);

  // ✅ Update report status or image
  const handleUpdate = async (id, status, file) => {
    try {
      setUpdating(id);
      const token = localStorage.getItem("deptToken");
      const formData = new FormData();
      formData.append("status", status);
      if (file) formData.append("file", file);

      await axios.patch(
        `http://localhost:5000/api/department-reports/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("✅ Report updated successfully!");
      fetchReports();
    } catch (error) {
      toast.error("Failed to update report.");
      console.error("Update error:", error.response?.data || error.message);
    } finally {
      setUpdating(null);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading reports...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-blue-700">
          Welcome, {department?.name}
        </h2>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </header>

      {/* Reports Section */}
      {reports.length === 0 ? (
        <p className="text-center text-gray-500">No reports assigned yet.</p>
      ) : (
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {reports.map((report) => (
            <motion.div
              key={report._id}
              className="bg-white rounded-xl shadow-lg p-5 hover:shadow-2xl transition-transform hover:-translate-y-1"
              whileHover={{ scale: 1.02 }}
            >
              {/* Report title + description */}
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                {report.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">{report.description}</p>

              {/* Report image */}
              {report.imageUrl && (
                <img
                  src={report.imageUrl}
                  alt="Issue"
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
              )}

              {/* Status & Votes */}
              <div className="flex justify-between items-center text-sm mb-3">
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
              </div>

              {/* Update Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const file = e.target.elements.proof.files[0];
                  const status = e.target.elements.status.value;
                  handleUpdate(report._id, status, file);
                }}
                className="space-y-2"
              >
                <select
                  name="status"
                  defaultValue={report.status}
                  className="border border-gray-300 rounded w-full p-2 text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>

                <input
                  type="file"
                  name="proof"
                  accept="image/*"
                  className="block w-full text-sm text-gray-600"
                />

                <button
                  type="submit"
                  disabled={updating === report._id}
                  className={`w-full py-2 text-white rounded-lg ${
                    updating === report._id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {updating === report._id ? "Updating..." : "Update Report"}
                </button>
              </form>

              {/* 💬 Chat button */}
              <button
                onClick={() => setActiveChat(report._id)}
                className="mt-3 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                💬 Chat
              </button>

              {/* Chat Modal */}
              <Modal
                isOpen={activeChat === report._id}
                onRequestClose={() => setActiveChat(null)}
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]"
                className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-lg relative"
              >
                <ChatWindow chatId={report._id} user={department} />
                <button
                  onClick={() => setActiveChat(null)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-sm"
                >
                  Close
                </button>
              </Modal>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
