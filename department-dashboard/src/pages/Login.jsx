

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useDepartment } from "../context/DepartmentContext";
import { FaBuilding, FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaClipboardList } from "react-icons/fa";

export default function DepartmentLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useDepartment();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", form);

      if (data.role === "department" && data.token) {
        login(data);
        navigate("/Dashboard");
      } else {
        alert("Access denied! Only department accounts can log in.");
      }
    } catch (err) {
      alert("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-slate-50 to-cyan-50 px-4 py-12">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-0 shadow-2xl rounded-3xl overflow-hidden bg-white">
        
        {/* Left Side - Department Branding */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900 p-12 flex flex-col justify-between text-white overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 border border-white/30">
                <FaBuilding size={32} className="text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-3">Department Portal</h2>
              <div className="h-1.5 w-24 bg-gradient-to-r from-cyan-400 to-indigo-300 rounded-full mb-6" />
              <p className="text-lg text-indigo-100 leading-relaxed">
                Dedicated workspace for civic departments to manage citizen issues, coordinate responses, and drive community improvements.
              </p>
            </motion.div>

            <div className="space-y-5 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-start gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all"
              >
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <FaClipboardList className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Issue Management</h3>
                  <p className="text-sm text-indigo-200">
                    View, categorize, and assign reported civic issues to appropriate teams
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-start gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all"
              >
                <div className="w-12 h-12 bg-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-2xl">💬</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Citizen Communication</h3>
                  <p className="text-sm text-indigo-200">
                    Real-time chat with citizens for updates and clarifications
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-start gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all"
              >
                <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Performance Analytics</h3>
                  <p className="text-sm text-indigo-200">
                    Track resolution times, success rates, and department metrics
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-4">
            <FaCheckCircle className="text-cyan-400 text-xl flex-shrink-0" />
            <p className="text-sm text-indigo-100">
              Secure government-grade authentication system
            </p>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="p-12 flex flex-col justify-center bg-slate-50"
        >
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl mb-6 shadow-lg shadow-indigo-500/30"
              >
                <FaBuilding size={36} className="text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Department Access</h1>
              <p className="text-gray-600">Sign in to your department dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Department Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
                    placeholder="department@civiceye.gov"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaLock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full pl-12 pr-12 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                    Keep me signed in
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  Need help?
                </a>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-4 rounded-xl font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <FaBuilding />
                      Sign In to Dashboard
                    </>
                  )}
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-indigo-800"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-center text-xs text-gray-500">
                <p>Authorized personnel only • Secure connection</p>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-gray-500 mt-8">
            © {new Date().getFullYear()} CivicEye — Department Portal
          </p>
        </motion.div>
      </div>
    </div>
  );
}
