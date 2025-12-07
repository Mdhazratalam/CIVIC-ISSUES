/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const DepartmentContext = createContext();

export const DepartmentProvider = ({ children }) => {
  const storedDept = localStorage.getItem("department");
  const [department, setDepartment] = useState(
    storedDept ? JSON.parse(storedDept) : null
  );

  const login = (deptData) => {
    if (!deptData?.token) {
      console.error("No token received for department login");
      return;
    }
    setDepartment(deptData);
    localStorage.setItem("department", JSON.stringify(deptData));
    localStorage.setItem("deptToken", deptData.token); // ✅ token stored properly
  };

  const logout = () => {
    setDepartment(null);
    localStorage.removeItem("department");
    localStorage.removeItem("deptToken");
  };

  return (
    <DepartmentContext.Provider value={{ department, login, logout }}>
      {children}
    </DepartmentContext.Provider>
  );
};

export const useDepartment = () => useContext(DepartmentContext);
