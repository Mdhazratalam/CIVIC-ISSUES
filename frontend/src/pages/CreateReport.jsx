
import { useEffect, useState } from "react";
import { createReport } from "../api/reportApi";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUpload } from "react-icons/fa";

export default function CreateReport() {
  const { user } = useAuth();
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    address: "",
    latitude: "",
    longitude: "",
  });
  const [image, setImage] = useState(null);

  // ✅ Load departments from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/departments")
      .then((res) => setDepartments(res.data))
      .catch(() => setDepartments([]));
  }, []);

  // ✅ Handle submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    if (image) formData.append("image", image);
   if (selectedDept) {
  formData.append("department", selectedDept.name); // ✅ actual department
  formData.append("category", selectedDept.name);   // optional
}


    try {
      await createReport(formData);
      alert("Report submitted successfully!");
      setForm({
        title: "",
        description: "",
        address: "",
        latitude: "",
        longitude: "",
      });
      setImage(null);
      setSelectedDept(null);
    } catch {
      alert("Failed to submit report");
    }
  };

  // ✅ Step 1: Department selection screen
 if (!selectedDept)
  return (
    <div className="min-h-screen bg-white py-14 px-8">
      <h2 className="text-4xl font-bold text-center text-blue-800 mb-12">
        Select a Department to Report an Issue
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {departments.map((dept, i) => (
          <motion.div
            key={i}
            className="bg-pink-50 border border-pink-100 rounded-3xl shadow-md hover:shadow-2xl p-8 cursor-pointer flex flex-col items-center transition-all duration-300 hover:-translate-y-2"
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedDept(dept)}
          >
            <div className="w-28 h-28 bg-white rounded-2xl shadow-inner flex items-center justify-center mb-6">
              <img
                src={dept.imageUrl}
                alt={dept.name}
                className="w-24 h-24 object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 text-center">
              {dept.name}
            </h3>
            <p className="text-gray-500 text-center mt-3 text-sm leading-relaxed">
              {dept.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );



  // ✅ Step 2: Actual report form
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100 py-10">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-2xl rounded-2xl w-full max-w-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Report an Issue — {selectedDept.name}
        </h2>

        <input
          type="text"
          placeholder="Title"
          className="border-2 border-gray-200 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <textarea
          placeholder="Description"
          className="border-2 border-gray-200 rounded-lg w-full p-3 mt-4 focus:outline-none focus:border-blue-500"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Address"
          className="border-2 border-gray-200 rounded-lg w-full p-3 mt-4 focus:outline-none focus:border-blue-500"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <div className="flex gap-3 mt-4">
          <input
            type="text"
            placeholder="Latitude"
            className="border-2 border-gray-200 rounded-lg w-full p-3 focus:outline-none focus:border-blue-500"
            value={form.latitude}
            onChange={(e) => setForm({ ...form, latitude: e.target.value })}
          />
          <input
            type="text"
            placeholder="Longitude"
            className="border-2 border-gray-200 rounded-lg w-full p-3 focus:outline-none focus:border-blue-500"
            value={form.longitude}
            onChange={(e) => setForm({ ...form, longitude: e.target.value })}
          />
        </div>

        <div className="mt-5">
          <label className="block text-gray-600 font-medium mb-2">
            <FaUpload className="inline mr-2 text-blue-600" />
            Upload Image
          </label>
          <input
            type="file"
            className="border border-gray-300 rounded p-2 w-full"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="mt-3 w-full h-48 object-cover rounded-lg shadow"
            />
          )}
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => setSelectedDept(null)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            Back
          </button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Submit Report
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}
