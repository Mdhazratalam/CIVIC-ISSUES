import axios from "axios";

const axiosClient = axios.create({
  //baseURL: "http://localhost:5000/api", // backend base URL
  baseURL: "https://civic-issues-0c9c.onrender.com/api"
});

// automatically attach token if user logged in
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosClient;
