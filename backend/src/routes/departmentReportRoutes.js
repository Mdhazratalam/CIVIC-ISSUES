// const express = require("express");
// const router = express.Router();
// const Report = require("../models/Report");
// const { protect } = require("../middleware/authMiddleware");
// const cloudinary = require("../config/cloudinary");

// // ✅ Get all reports assigned to a specific department
// // ✅ Get all reports assigned to a specific department
// router.get("/:departmentName", protect, async (req, res) => {
//   try {
//     const { departmentName } = req.params;

//     // Allow both admin & department roles
//     if (req.user.role !== "admin" && req.user.role !== "department") {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     // ✅ Case-insensitive and partial match for flexibility
//     const reports = await Report.find({
//       department: { $regex: new RegExp(departmentName, "i") },
//     }).sort({ createdAt: -1 });

//     if (!reports.length) {
//       console.log("No reports found for department:", departmentName);
//     }

//     res.json(reports);
//   } catch (error) {
//     console.error("Fetch department reports error:", error);
//     res.status(500).json({ message: "Failed to fetch department reports" });
//   }
// });

// // ✅ Update report status or add proof image
// router.patch("/:id", protect, async (req, res) => {
//   try {
//     const { status, comment } = req.body;
//     const report = await Report.findById(req.params.id);

//     if (!report) return res.status(404).json({ message: "Report not found" });

//     // Only department or admin can update
//     if (req.user.role !== "admin" && req.user.role !== "department") {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     // Upload proof image if provided
//     if (req.file && req.file.buffer) {
//       const result = await new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           { folder: "civic_proofs" },
//           (err, res) => (err ? reject(err) : resolve(res))
//         );
//         stream.end(req.file.buffer);
//       });
//       report.proofImage = result.secure_url;
//     }

//     if (status) report.status = status;
//     if (comment) report.comment = comment;

//     await report.save();
//     res.json({ message: "Report updated successfully", report });
//   } catch (error) {
//     console.error("Update department report error:", error);
//     res.status(500).json({ message: "Failed to update report" });
//   }
// });

// module.exports = router;









// backend/routes/departmentReportRoutes.js
const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const { protect } = require("../middleware/authMiddleware");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");
const upload = multer();


// ✅ Get reports assigned to specific department
router.get("/:departmentName", protect, async (req, res) => {
  try {
    const { departmentName } = req.params;

    // Only department or admin users can view reports
    if (req.user.role !== "department" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    // Fuzzy match (handles capitalization or 'Department' suffix)
   const regex = new RegExp(departmentName.replace(/department/i, "").trim(), "i");

    //console.log("Searching reports for department:", departmentName);


    const reports = await Report.find({ department: regex }).sort({ createdAt: -1 });

    if (!reports.length) {
      return res.json([]); // Return empty array instead of error
    }

    res.json(reports);
  } catch (error) {
    console.error("Fetch department reports error:", error);
    res.status(500).json({ message: "Failed to fetch department reports" });
  }
});


// ✅ Update report status + optional proof image
router.patch("/:id", protect, upload.single("file"), async (req, res) => {
  try {
    const { status } = req.body;
    const report = await Report.findById(req.params.id);

    if (!report) return res.status(404).json({ message: "Report not found" });

    // Only department or admin can update
    if (req.user.role !== "department" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    // ✅ Optional image upload (Cloudinary)
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "department_proofs" },
          (err, res) => (err ? reject(err) : resolve(res))
        );
        stream.end(req.file.buffer);
      });

      report.proofImage = result.secure_url;
      report.proofPublicId = result.public_id;
    }

    if (status) report.status = status;

    await report.save();
    res.json({ message: "Report updated successfully", report });
  } catch (error) {
    console.error("Update department report error:", error);
    res.status(500).json({ message: "Failed to update report" });
  }
});

module.exports = router;
