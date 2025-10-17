

// src/routes/reportRoutes.js
const express = require("express");
const router = express.Router();
const {
  createReport,
  getUserReports,
  voteReport,
  deleteImageFromReport,
  deleteReport,
} = require("../controllers/reportController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// create report (single image)
router.post("/", protect, upload.single("image"), createReport);

// get user reports
router.get("/user/:id", protect, getUserReports);

// vote
router.post("/:id/vote", protect, voteReport);


// delete image from a report (owner or admin)
router.delete("/:id/image", protect, deleteImageFromReport);


// delete entire report (admin only)
//router.delete("/:id", protect, adminOnly, deleteReport);


router.delete("/:id", protect, deleteReport);
module.exports = router;
