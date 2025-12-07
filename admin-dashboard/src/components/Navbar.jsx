import { Link, useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

export default function Navbar() {
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">CivicEye Admin</Link>
      {admin && (
        <div className="flex gap-4 items-center">
          <Link to="/" className="text-gray-600 hover:text-blue-600">Dashboard</Link>
          {/* <Link to="/analytics" className="text-gray-600 hover:text-blue-600">Analytics</Link> */}
          <button onClick={handleLogout} className="bg-blue-600 text-white px-3 py-1 rounded">Logout</button>
        </div>
      )}
    </nav>
  );
}
