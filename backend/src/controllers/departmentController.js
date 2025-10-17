const Report = require("../models/Report");
const cloudinary = require("../config/cloudinary");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");

// ✅ Get all reports assigned to a department
const getDepartmentReports = async (req, res) => {
  try {
    const departmentName = req.params.departmentName;

    // Find all reports for this department
    const reports = await Report.find({ department: departmentName }).sort({ createdAt: -1 });

    res.json(reports);
  } catch (error) {
    console.error("getDepartmentReports error:", error);
    res.status(500).json({ message: "Server error fetching department reports" });
  }
};

// ✅ Update report status + optional proof upload
const updateDepartmentReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });

    // Optional: only allow same department to update
    if (report.department !== req.user.name && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    if (req.file && req.file.buffer) {
      // Upload proof image to Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "department_proofs" },
          (err, result) => (err ? reject(err) : resolve(result))
        );
        stream.end(req.file.buffer);
      });

      report.proofImage = uploadResult.secure_url;
      report.proofPublicId = uploadResult.public_id;
    }

    // Update status
    if (req.body.status) report.status = req.body.status;

    await report.save();

    // ✅ Email citizen (optional)
    const citizen = await User.findById(report.user);
    if (citizen?.email) {
      await sendEmail({
        to: citizen.email,
        subject: `Update on your report "${report.title}"`,
        text: `Your report status has been updated to "${report.status}" by ${report.department}.`,
      });
    }

    res.json({ message: "Report updated successfully", report });
  } catch (error) {
    console.error("updateDepartmentReport error:", error);
    res.status(500).json({ message: "Error updating report" });
  }
};

module.exports = { getDepartmentReports, updateDepartmentReport };
