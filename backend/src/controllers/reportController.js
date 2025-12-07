const Report = require("../models/Report");
const Department = require("../models/Department");
const cloudinary = require("../config/cloudinary");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");

// -------------------------------------------------------------------
// @desc   Create a new report
// @route  POST /api/reports
// @access Private (citizen)
// -------------------------------------------------------------------
const createReport = async (req, res) => {
  try {
    const { title, description, category, address, latitude, longitude } = req.body;

    // ✅ Basic validation
    if (!title || !description || !category) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    // ✅ Smart Auto-assign Department Based on Category
    let department = "General Department";
    const categoryLower = category.toLowerCase();

    if (categoryLower.includes("road") || categoryLower.includes("infrastructure"))
      department = "Roads & Infrastructure";
    else if (categoryLower.includes("water"))
      department = "Water Supply";
    else if (categoryLower.includes("electric"))
      department = "Electrical";
    else if (categoryLower.includes("sanit"))
      department = "Sanitation";
    else if (categoryLower.includes("health"))
      department = "Health";
    else {
      // fallback — try to match from Department collection
      const foundDept = await Department.findOne({
        name: { $regex: category, $options: "i" },
      });
      if (foundDept) department = foundDept.name;
    }

    // ✅ Handle image upload (Cloudinary buffer)
    let imageUrl = null;
    let imagePublicId = null;

    if (req.file && req.file.buffer) {
      const uploadFromBuffer = (buffer) =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "civic_reports" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(buffer);
        });

      const result = await uploadFromBuffer(req.file.buffer);
      imageUrl = result.secure_url;
      imagePublicId = result.public_id;
    }

    // ✅ Save new report to database
    const report = await Report.create({
      user: req.user._id,
      title,
      description,
      category,
      department,
      imageUrl,
      imagePublicId,
      location: {
        type: "Point",
        coordinates: [
          parseFloat(longitude) || 0,
          parseFloat(latitude) || 0,
        ],
        address: address || "",
      },
    });

    // ✅ Send confirmation email to citizen
    const user = await User.findById(req.user._id);
    if (user && user.email) {
      try {
        await sendEmail({
          to: user.email,
          subject: "CivicEye - Report Submitted",
          text: `Your report "${report.title}" has been received successfully by the "${department}" department.`,
        });
        console.log("✅ Confirmation email sent to citizen");
      } catch (emailError) {
        console.error("⚠️ Email sending failed:", emailError.message);
      }
    }

    // ✅ Notify Department via Email
    const departmentUser = await User.findOne({
      role: "department",
      name: { $regex: department, $options: "i" },
    });

    if (departmentUser && departmentUser.email) {
      try {
        await sendEmail({
          to: departmentUser.email,
          subject: `New Issue Reported - ${title}`,
          text: `A new report "${title}" has been submitted under your department (${department}).\n\nPlease log in to the CivicEye Department Dashboard to review it.`,
        });
        console.log(`📩 Email sent to ${departmentUser.email}`);
      } catch (err) {
        console.error("⚠️ Failed to send department email:", err.message);
      }
    }

    // ✅ Success response
    return res.status(201).json({
      success: true,
      message: "Report created successfully",
      report,
    });
  } catch (error) {
    console.error("createReport error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating report",
    });
  }
};

// -------------------------------------------------------------------
// @desc   Get all reports by a user
// @route  GET /api/reports/user/:id
// @access Private
// -------------------------------------------------------------------
const getUserReports = async (req, res) => {
  try {
    const userId = req.params.id;

    // ✅ Access validation
    if (req.user.role !== "admin" && req.user._id.toString() !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const reports = await Report.find({ user: userId }).sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    console.error("getUserReports error:", error);
    res.status(500).json({ message: "Server error fetching reports" });
  }
};

// -------------------------------------------------------------------
// @desc   Vote a report
// @route  POST /api/reports/:id/vote
// @access Private
// -------------------------------------------------------------------
const voteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });

    report.votes = (report.votes || 0) + 1;
    await report.save();

    res.json({ message: "Voted successfully", votes: report.votes });
  } catch (error) {
    console.error("voteReport error:", error);
    res.status(500).json({ message: "Server error voting report" });
  }
};

// -------------------------------------------------------------------
// @desc   Delete image from a report
// @route  DELETE /api/reports/:id/image
// @access Private
// -------------------------------------------------------------------
const deleteImageFromReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });

    // ✅ Owner or admin only
    if (req.user.role !== "admin" && req.user._id.toString() !== report.user.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!report.imagePublicId) {
      return res.status(400).json({ message: "No image to delete" });
    }

    await cloudinary.uploader.destroy(report.imagePublicId);
    report.imageUrl = null;
    report.imagePublicId = null;
    await report.save();

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("deleteImageFromReport error:", error);
    res.status(500).json({ message: "Server error deleting image" });
  }
};

// -------------------------------------------------------------------
// @desc   Delete entire report
// @route  DELETE /api/reports/:id
// @access Private
// -------------------------------------------------------------------
const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });

    // Only owner or admin can delete
    if (req.user.role !== "admin" && req.user._id.toString() !== report.user.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Delete from Cloudinary if exists
    if (report.imagePublicId) {
      await cloudinary.uploader.destroy(report.imagePublicId);
    }

    await Report.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Report deleted successfully" });
  } catch (error) {
    console.error("deleteReport error:", error);
    res.status(500).json({ message: "Server error deleting report" });
  }
};

// -------------------------------------------------------------------
// EXPORT MODULES
// -------------------------------------------------------------------
module.exports = {
  createReport,
  getUserReports,
  voteReport,
  deleteImageFromReport,
  deleteReport,
};
