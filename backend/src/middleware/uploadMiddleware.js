// File upload middleware
// src/middleware/uploadMiddleware.js
const multer = require("multer");

// store file in memory as buffer (we will upload buffer to Cloudinary)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // accept images only
  if (!file.mimetype.startsWith("image/")) {
    cb(new Error("Only image files are allowed!"), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB

module.exports = upload;
