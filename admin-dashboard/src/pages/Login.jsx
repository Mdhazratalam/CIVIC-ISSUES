
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../api/adminApi";
import { useAdmin } from "../context/AdminContext";
import { motion } from "framer-motion";
import { FaCrown, FaLock, FaEye, FaEyeSlash, FaShieldAlt, FaFingerprint } from "react-icons/fa";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAdmin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginAdmin(form);

      if (data.role === "admin") {
        login(data);
        navigate("/");
      } else {
        alert("Access denied! You are not authorized as an admin.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed! Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-red-900/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-gray-800/30 rounded-full blur-3xl"
        />
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-5 gap-0 relative z-10">
        {/* Left Side - Dark Executive Panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex lg:col-span-2 bg-gradient-to-br from-red-950 via-red-900 to-gray-900 rounded-l-3xl p-12 flex-col justify-between shadow-2xl border-l border-t border-b border-red-800/30"
        >
          <div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="mb-8"
            >
              <FaCrown size={50} className="text-red-500 mb-4" />
              <h2 className="text-4xl font-bold text-white mb-3">Admin Portal</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-red-600 to-red-400 rounded-full mb-4" />
              <p className="text-gray-300 text-lg">
                Supreme control center for CivicEye platform management
              </p>
            </motion.div>

            <div className="space-y-6 mt-12">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-red-900/40 rounded-xl flex items-center justify-center group-hover:bg-red-800/60 transition-colors border border-red-800/50">
                  <span className="text-2xl">🎛️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">System Control</h3>
                  <p className="text-xs text-gray-400">Manage all platform operations</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-red-900/40 rounded-xl flex items-center justify-center group-hover:bg-red-800/60 transition-colors border border-red-800/50">
                  <span className="text-2xl">👥</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">User Management</h3>
                  <p className="text-xs text-gray-400">Control citizen & department access</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-red-900/40 rounded-xl flex items-center justify-center group-hover:bg-red-800/60 transition-colors border border-red-800/50">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">Analytics & Reports</h3>
                  <p className="text-xs text-gray-400">Platform-wide insights</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-red-900/40 rounded-xl flex items-center justify-center group-hover:bg-red-800/60 transition-colors border border-red-800/50">
                  <span className="text-2xl">⚙️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">System Configuration</h3>
                  <p className="text-xs text-gray-400">Advanced settings & preferences</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-red-950/40 border border-red-800/30 rounded-xl p-4">
            <FaShieldAlt className="text-red-400 text-xl" />
            <div className="text-xs">
              <p className="text-gray-300 font-medium">Maximum Security</p>
              <p className="text-gray-500">Multi-layer authentication enabled</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-3 bg-gray-900/95 backdrop-blur-xl rounded-r-3xl lg:rounded-l-none rounded-3xl p-12 shadow-2xl border border-gray-800"
        >
          <div className="max-w-md mx-auto">
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl mb-6 shadow-lg shadow-red-900/50"
              >
                <FaFingerprint size={36} className="text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold text-white mb-2">Administrator Access</h1>
              <p className="text-gray-400">High-level clearance required</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                  <span>Admin Email</span>
                  <FaShieldAlt className="text-red-500 text-xs" />
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3.5 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all"
                  placeholder="admin@civiceye.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Secure Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaLock size={16} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all"
                    placeholder="Enter admin password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border-gray-700 bg-gray-800 rounded text-red-600 focus:ring-red-600 focus:ring-offset-gray-900"
                  />
                  <span className="ml-2 text-sm text-gray-400 group-hover:text-gray-300">
                    Trust this device
                  </span>
                </label>
                <a href="#" className="text-sm font-medium text-red-500 hover:text-red-400 transition-colors">
                  Security help
                </a>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-xl font-semibold shadow-lg shadow-red-900/40 hover:shadow-xl hover:shadow-red-900/60 transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <FaShieldAlt />
                      Authorize Access
                    </>
                  )}
                </span>
              </motion.button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-800">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span>Secure connection active</span>
                </div>
                <span className="text-gray-600">v2.0.1</span>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-gray-600 mt-8">
            © {new Date().getFullYear()} CivicEye — Administrator Dashboard
          </p>
        </motion.div>
      </div>
    </div>
  );
}
