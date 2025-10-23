


import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://civic-issues-0c9c.onrender.com/api",
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
