
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FaUserPlus } from "react-icons/fa";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(form);
      login(data);
      navigate("/");
    } catch {
      alert("Registration failed!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-2xl rounded-2xl w-full max-w-md text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
          className="flex justify-center mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <FaUserPlus size={40} className="text-blue-600" />
        </motion.div>
        <h2 className="text-3xl font-bold text-blue-700 mb-6">Create Account</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border-2 border-gray-200 rounded-lg w-full p-3 focus:outline-none focus:border-blue-500 transition-all"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="border-2 border-gray-200 rounded-lg w-full p-3 focus:outline-none focus:border-blue-500 transition-all"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="border-2 border-gray-200 rounded-lg w-full p-3 focus:outline-none focus:border-blue-500 transition-all"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Register
        </motion.button>

        <p className="text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </motion.form>
    </div>
  );
}
