

// src/context/AdminContext.jsx
import { createContext, useContext, useState } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const storedAdmin = localStorage.getItem("admin");
  const [admin, setAdmin] = useState(() => {
    try {
      return storedAdmin ? JSON.parse(storedAdmin) : null;
    } catch {
      return null;
    }
  });

  const login = (adminData) => {
    setAdmin(adminData);
    localStorage.setItem("admin", JSON.stringify(adminData));
    localStorage.setItem("adminToken", adminData.token);
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
  };

  return (
    <AdminContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
