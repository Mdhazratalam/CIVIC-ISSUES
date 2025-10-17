
import axiosClient from "./axiosClient";

export const getAllReports = async () => {
  const res = await axiosClient.get("/admin/reports");
  return res.data;
};

export const updateReportStatus = async (id, status) => {
  const res = await axiosClient.patch(`/admin/report/${id}`, { status });
  return res.data;
};

export const getAnalytics = async () => {
  const res = await axiosClient.get("/admin/analytics");
  return res.data;
};

export const deleteReport = async (id) => {
  const res = await axiosClient.delete(`/reports/${id}`); // matches backend route
  return res.data;
};

// ✅ Admin login function
export const loginAdmin = async (credentials) => {
  const res = await axiosClient.post("/auth/login", credentials);
  return res.data;
};
