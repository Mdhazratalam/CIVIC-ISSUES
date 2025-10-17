


import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ Automatically include admin token
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
