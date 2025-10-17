const express = require("express");
const router = express.Router();
const Department = require("../models/Department");

// @route GET /api/departments
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch departments" });
  }
});

module.exports = router;




