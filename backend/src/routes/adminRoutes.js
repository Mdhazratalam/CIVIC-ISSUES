
const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { getAnalytics, getAllReports, updateReportStatus } = require("../controllers/adminController");

// ✅ Only admins can access
router.get("/analytics", protect, adminOnly, getAnalytics);

router.get("/reports", protect, adminOnly, getAllReports);
router.patch("/report/:id", protect, adminOnly, updateReportStatus);


module.exports = router;
