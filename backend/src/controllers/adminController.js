
// Admin controller
// src/controllers/adminController.js
const Report = require("../models/Report");
const cloudinary = require("../config/cloudinary");
const sendEmail = require("../utils/sendEmail");

// @desc   Get all reports (with optional filters)
// @route  GET /api/admin/reports
// @access Admin
const getAllReports = async (req, res) => {
  try {
    const { status, category } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;

    const reports = await Report.find(filter)
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching reports" });
  }
};

// @desc   Admin updates report status (with restriction)
// @route  PATCH /api/admin/report/:id
// @access Admin
const updateReportStatus = async (req, res) => {
  try {
    const reportId = req.params.id;
    const { status, removeImage } = req.body;

    // Populate user to get email
    const report = await Report.findById(reportId).populate("user", "name email");
    if (!report) return res.status(404).json({ message: "Report not found" });

    // 🚫 Restrict admin if department hasn’t taken action yet
    if (report.status === "Pending") {
      return res.status(403).json({
        message: "Department must take action before admin can update this issue.",
      });
    }

    // ✅ Allow update
    if (status) report.status = status;
    report.lastUpdatedBy = req.user._id;

    if (removeImage && report.imagePublicId) {
      await cloudinary.uploader.destroy(report.imagePublicId);
      report.imageUrl = null;
      report.imagePublicId = null;
    }

    await report.save();

    // ✅ Send email notification after admin update
    if (report.user && report.user.email) {
      await sendEmail({
        to: report.user.email,
        subject: `CivicEye - Report Status Updated`,
        text: `The status of your report "${report.title}" is now: ${report.status}.`,
      });
    }

    res.json({
      success: true,
      message: "Admin updated report status successfully.",
      report,
    });
  } catch (error) {
    console.error("updateReportStatus error:", error);
    res.status(500).json({ message: "Server error updating report" });
  }
};

// @desc   Get detailed analytics (counts + sorted categories)
// @route  GET /api/admin/analytics
// @access Admin
const getAnalytics = async (req, res) => {
  try {
    const total = await Report.countDocuments();
    const pending = await Report.countDocuments({ status: "Pending" });
    const inProgress = await Report.countDocuments({ status: "In-Progress" });
    const resolved = await Report.countDocuments({ status: "Resolved" });

    const byCategory = await Report.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json({ total, pending, inProgress, resolved, byCategory });
  } catch (err) {
    res.status(500).json({ message: "Analytics error", error: err.message });
  }
};

module.exports = { getAllReports, updateReportStatus, getAnalytics };
