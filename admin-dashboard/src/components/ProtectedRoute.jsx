
// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

export default function ProtectedRoute({ children }) {
  const { admin } = useAdmin();

  // If no admin or user is not admin role → redirect
  if (!admin || admin.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}











