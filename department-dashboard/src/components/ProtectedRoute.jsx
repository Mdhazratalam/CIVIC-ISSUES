import { Navigate } from "react-router-dom";
import { useDepartment } from "../context/DepartmentContext";

export default function ProtectedRoute({ children }) {
  const { department } = useDepartment();
  if (!department) return <Navigate to="/login" replace />;
  return children;
}
