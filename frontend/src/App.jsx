

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateReport from "./pages/CreateReport";
import MyReports from "./pages/MyReports";
import { AnimatePresence } from "framer-motion";
import "leaflet/dist/leaflet.css";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreateReport />} />
            <Route path="/my-reports" element={<MyReports />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </AuthProvider>
  );
}





