import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDepartment } from "../context/DepartmentContext";

export default function Landing() {
  const navigate = useNavigate();
  const { department } = useDepartment();

  useEffect(() => {
    if (department) navigate("/dashboard");
  }, [department]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-blue-200 p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-3xl shadow-xl p-10 max-w-lg w-full"
      >
        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/888/888879.png"
          alt="CivicEye Logo"
          className="w-28 h-28 mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
        />

        <h1 className="text-3xl font-bold text-blue-700 mb-3">
          Welcome to CivicEye
        </h1>
        <p className="text-gray-600 mb-8">
          Manage and resolve citizen issues efficiently, transparently, and collaboratively.
        </p>

        <motion.button
          onClick={() => navigate("/login")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>

        <p className="text-gray-400 text-sm mt-6">
          © {new Date().getFullYear()} CivicEye Department Portal
        </p>
      </motion.div>
    </div>
  );
}
