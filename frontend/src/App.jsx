

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";import Navbar from "./components/Navbar";
import Landing from "./pages/Landing"; // new landing page
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateReport from "./pages/CreateReport";
import MyReports from "./pages/MyReports";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} /> {/* Replaced Home with Landing */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreateReport />} />
          <Route path="/my-reports" element={<MyReports />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}






