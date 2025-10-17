

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.nav
      className="bg-white shadow sticky top-0 z-50 flex justify-between items-center px-6 py-4"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
        CivicEye
      </Link>

      <div className="flex gap-5 items-center text-gray-700 text-sm">
        {!user ? (
          <>
            <Link to="/login" className="hover:text-blue-600 transition">Login</Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/create"
              className="hover:text-blue-600 transition font-medium"
            >
              Create Report
            </Link>
            <Link
              to="/my-reports"
              className="hover:text-blue-600 transition font-medium"
            >
              My Reports
            </Link>
            <button
              onClick={handleLogout}
              className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </motion.nav>
  );
}
