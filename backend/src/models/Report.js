// Report model schema
// src/models/Report.js
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  department: {
  type: String,
  required: true,
},
  category: { type: String, default: "general" }, // e.g., pothole, streetlight
  imageUrl: { type: String }, // Cloudinary URL
  imagePublicId: { type: String }, // for deleting from Cloudinary later
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], default: [0, 0] }, // [lng, lat]
    address: { type: String }
  },
status: {
  type: String,
  enum: ["Pending", "In Progress", "Resolved"],
  default: "Pending",
},

  lastUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

reportSchema.index({ "location": "2dsphere" }); // for geospatial queries

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;




