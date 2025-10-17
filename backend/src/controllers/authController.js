

// backend/controllers/authController.js
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// ✅ Register user (default role = citizen)
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({
      name,
      email,
      password,
      role: role || "citizen", // default role
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id), // ✅ send token always
    });
  } catch (err) {
    console.error("registerUser error:", err);
    res.status(500).json({ message: "Server error while registering" });
  }
};

// ✅ Login (works for admin, department, citizen)
const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id), // ✅ critical for all dashboards
    });
  } catch (err) {
    console.error("authUser error:", err);
    res.status(500).json({ message: "Server error while logging in" });
  }
};

module.exports = { registerUser, authUser };
