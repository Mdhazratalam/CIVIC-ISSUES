



// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminProvider } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <AdminProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Login Page */}
          <Route path="/login" element={<Login />} />

          {/* Protected Admin Pages */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AdminProvider>
  );
}
