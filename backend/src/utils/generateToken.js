// Generate JWT token
// src/utils/generateToken.js
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = generateToken;
