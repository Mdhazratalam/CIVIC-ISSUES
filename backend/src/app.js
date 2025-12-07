const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes");
const adminRoutes = require("./routes/adminRoutes");
const errorHandler = require("./middleware/errorHandler");
const departmentRoutes = require("./routes/departmentRoutes");
const departmentReportRoutes = require("./routes/departmentReportRoutes");

const app = express();

// ✅ Updated CORS setup (includes admin port)
app.use(
  cors({
    origin: [
       // ✅ Live Production URLs
      "https://civic-issues-delta.vercel.app", // citizen app
      "https://civic-department.vercel.app",   // department app
      "https://civic-issue-admin-ruddy.vercel.app", // admin app
      "https://civic-issues-main-page.vercel.app",  // landing page

      // ✅ Render backend
      "https://civic-issues-0c9c.onrender.com",

      
     "http://localhost:5173", // citizen app (Vite)
      "http://localhost:5174", // admin app (Vite)
      "http://localhost:3000",
      "http://localhost:5175", // optional CRA port
    ],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/department-reports", departmentReportRoutes);

app.use("/api/departments", departmentRoutes);


// health check
app.get("/api/health", (req, res) => res.json({ status: "ok", time: new Date() }));

// error handler
app.use(errorHandler);

module.exports = app;
