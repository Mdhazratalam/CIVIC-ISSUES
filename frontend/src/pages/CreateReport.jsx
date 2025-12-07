
import { useEffect, useState } from "react";
import { createReport } from "../api/reportApi";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { FaUpload, FaCheckCircle, FaTimes } from "react-icons/fa";
import LocationPicker from "../components/LocationPicker";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function CreateReport() {
  const { user } = useAuth();
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    title: "",
    description: "",
    address: "",
    latitude: "",
    longitude: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [useMap, setUseMap] = useState(false);
  const [fallback, setFallback] = useState(false);
  const [locationDetected, setLocationDetected] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      //.get("http://localhost:5000/api/departments")
      .get("https://civic-issues-0c9c.onrender.com/api/departments")
      .then((res) => setDepartments(res.data))
      .catch(() => setDepartments([]));
  }, []);

  const fetchAddressFromCoords = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=1404b7c98ba94caf8f17e7f2362ee773`
      );
      const result = response.data.results[0];
      if (result) {
        setForm((prev) => ({
          ...prev,
          address: result.formatted,
        }));
        setLocationDetected(true);
        setTimeout(() => setLocationDetected(false), 3000);
      }
    } catch (err) {
      console.error("Failed to fetch address from coordinates", err);
    }
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setFallback(true);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setForm((prev) => ({ ...prev, latitude: lat, longitude: lng }));
          fetchAddressFromCoords(lat, lng);
        },
        (error) => {
          console.error(error);
          setFallback(true);
        }
      );
    }
  };

  const handleMapPick = (latlng) => {
    setForm((prev) => ({ ...prev, latitude: latlng.lat, longitude: latlng.lng }));
    fetchAddressFromCoords(latlng.lat, latlng.lng);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    if (image) formData.append("image", image);
    if (selectedDept) {
      formData.append("department", selectedDept.name);
      formData.append("category", selectedDept.name);
    }

    try {
      await createReport(formData);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setForm({ title: "", description: "", address: "", latitude: "", longitude: "" });
        setImage(null);
        setImagePreview(null);
        setSelectedDept(null);
        setCurrentStep(1);
        setUseMap(false);
        setFallback(false);
        setErrors({});
      }, 2500);
    } catch {
      alert("Failed to submit report");
    } finally {
      setSubmitting(false);
    }
  };

  // Step Progress Indicator (simple, no animation)
  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            {currentStep > 1 ? "✓" : "1"}
          </div>
          <span className="text-xs mt-2 font-medium">Department</span>
        </div>
        <div className={`w-16 h-1 ${currentStep >= 2 ? "bg-blue-600" : "bg-gray-200"}`}></div>
        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            2
          </div>
          <span className="text-xs mt-2 font-medium">Details</span>
        </div>
        <div className={`w-16 h-1 ${currentStep >= 3 ? "bg-blue-600" : "bg-gray-200"}`}></div>
        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              currentStep >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            3
          </div>
          <span className="text-xs mt-2 font-medium">Submit</span>
        </div>
      </div>
    </div>
  );

  // Department Selection Screen
  if (!selectedDept)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-14 px-4 sm:px-8">
        <StepIndicator />

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-800 mb-3">Select a Department</h2>
          <p className="text-gray-600">Choose the department related to your issue</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {departments.map((dept, i) => (
            <div
              key={i}
              className="group bg-white border-2 border-gray-100 rounded-2xl shadow-md hover:shadow-lg p-6 cursor-pointer flex flex-col items-center transition-all duration-200 hover:border-blue-400"
              onClick={() => {
                setSelectedDept(dept);
                setCurrentStep(2);
              }}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-inner flex items-center justify-center mb-4">
                <img src={dept.imageUrl} alt={dept.name} className="w-20 h-20 object-contain" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{dept.name}</h3>
              <p className="text-gray-500 text-center text-sm leading-relaxed line-clamp-3">
                {dept.description}
              </p>
              <div className="mt-4 text-blue-600 font-semibold text-sm group-hover:text-blue-700">
                Select →
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  // Form Screen
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 shadow-2xl rounded-2xl w-full max-w-2xl"
      >
        <StepIndicator />

        {/* Header */}
        <div className="flex items-center gap-4 mb-6 pb-4 border-b">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <img src={selectedDept.imageUrl} alt="" className="w-10 h-10 object-contain" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-blue-700">Report an Issue</h2>
            <p className="text-sm text-gray-500">{selectedDept.name}</p>
          </div>
        </div>

        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
          <input
            type="text"
            placeholder="Brief title of the issue"
            className={`border-2 rounded-xl p-3 w-full focus:outline-none transition-all ${
              errors.title ? "border-red-500" : "border-gray-200 focus:border-blue-500"
            }`}
            value={form.title}
            onChange={(e) => {
              setForm({ ...form, title: e.target.value });
              setErrors({ ...errors, title: "" });
            }}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
          <textarea
            placeholder="Describe the issue in detail"
            className={`border-2 rounded-xl w-full p-3 focus:outline-none transition-all min-h-[100px] ${
              errors.description ? "border-red-500" : "border-gray-200 focus:border-blue-500"
            }`}
            value={form.description}
            onChange={(e) => {
              setForm({ ...form, description: e.target.value });
              setErrors({ ...errors, description: "" });
            }}
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
          <input
            type="text"
            placeholder="Location of the issue"
            className={`border-2 rounded-xl w-full p-3 focus:outline-none transition-all ${
              errors.address ? "border-red-500" : "border-gray-200 focus:border-blue-500"
            }`}
            value={form.address}
            onChange={(e) => {
              setForm({ ...form, address: e.target.value });
              setErrors({ ...errors, address: "" });
            }}
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        </div>

        {/* Location Buttons */}
        <div className="flex flex-wrap gap-3 mb-4">
          <button
            type="button"
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-xl shadow-md hover:shadow-lg transition-all font-medium"
            onClick={detectLocation}
          >
            📍 Detect Location
          </button>
          <button
            type="button"
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-xl shadow-md hover:shadow-lg transition-all font-medium"
            onClick={() => setUseMap(!useMap)}
          >
            📌 {useMap ? "Hide Map" : "Pick on Map"}
          </button>
        </div>

        {/* Location Success Message */}
        {locationDetected && (
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3 mb-4 flex items-center gap-2">
            <FaCheckCircle className="text-green-600" />
            <span className="text-green-700 font-medium text-sm">
              Location detected successfully!
            </span>
          </div>
        )}

        {/* Map Picker */}
        {useMap && (
          <div className="mb-4 overflow-hidden rounded-xl shadow-lg">
            <LocationPicker setLatLng={handleMapPick} />
          </div>
        )}

        {/* Fallback Error */}
        {fallback && (
          <p className="text-red-600 text-sm mb-4 bg-red-50 p-3 rounded-lg border border-red-200">
            ⚠️ Couldn't detect your location automatically. Please pick it manually on the map.
          </p>
        )}

        {/* Coordinates */}
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Latitude"
            className="border-2 border-gray-200 rounded-xl w-full p-3 bg-gray-50"
            value={form.latitude}
            readOnly
          />
          <input
            type="text"
            placeholder="Longitude"
            className="border-2 border-gray-200 rounded-xl w-full p-3 bg-gray-50"
            value={form.longitude}
            readOnly
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <FaUpload className="inline mr-2 text-blue-600" /> Upload Image
          </label>

          {!imagePreview ? (
            <label className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center cursor-pointer hover:border-blue-500 transition-all bg-gray-50 hover:bg-blue-50">
              <FaUpload className="text-4xl text-gray-400 mb-2" />
              <span className="text-gray-600 text-sm">Click to upload image</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          ) : (
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img src={imagePreview} alt="preview" className="w-full h-64 object-cover" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all shadow-lg"
              >
                <FaTimes />
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => {
              setSelectedDept(null);
              setCurrentStep(1);
            }}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-medium"
          >
            ← Back
          </button>

          <button
            type="submit"
            disabled={submitting}
            className={`flex-1 px-6 py-3 rounded-xl shadow-lg font-medium transition-all ${
              submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl"
            }`}
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Report →"
            )}
          </button>
        </div>
      </form>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccess}
        overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[1000]"
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center"
      >
        <div>
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheckCircle className="text-5xl text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
          <p className="text-gray-600 mb-4">Your report has been submitted successfully</p>
          <div className="bg-blue-50 rounded-lg p-3 text-sm text-gray-700">
            You'll be notified about updates
          </div>
        </div>
      </Modal>
    </div>
  );
}
