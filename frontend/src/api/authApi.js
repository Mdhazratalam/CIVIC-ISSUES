
import axiosClient from "./axiosClient";

export const registerUser = async (data) => {
  const res = await axiosClient.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axiosClient.post("/auth/login", data);
  return res.data;
};
