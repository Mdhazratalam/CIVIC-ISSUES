import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://civic-issues-0c9c.onrender.com", // backend base URL
});

// automatically attach token if user logged in
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosClient;
