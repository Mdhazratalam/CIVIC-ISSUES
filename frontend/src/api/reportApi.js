

import axiosClient from "./axiosClient"; // existing central axios instance

export const createReport = async (formData) => {
  const res = await axiosClient.post("/reports", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const getMyReports = async (userId) => {
  const res = await axiosClient.get(`/reports/user/${userId}`);
  return res.data;
};

export const deleteImageFromReport = async (reportId) => {
  const res = await axiosClient.delete(`/reports/${reportId}/image`);
  return res.data;
};

export const voteReport = async (reportId) => {
  const res = await axiosClient.post(`/reports/${reportId}/vote`);
  return res.data;
};

export const deleteReport = async (reportId) => {
  const res = await axiosClient.delete(`/reports/${reportId}`);
  return res.data;
};




