require("dotenv").config();
const mongoose = require("mongoose");
const Department = require("./src/models/Department");

const departments = [
  {
    name: "Electrical",
    email: "electrical@civiceye.gov",
    description: "Handles streetlight, wiring, and public electricity issues.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966338.png",
  },
  {
    name: "Sanitation",
    email: "sanitation@civiceye.gov",
    description: "Responsible for garbage collection, waste management, and cleanliness.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/2331/2331948.png",
  },
  {
    name: "Roads & Infrastructure",
    email: "roads@civiceye.gov",
    description: "Fixes potholes, maintains roads, footpaths, and public infrastructure.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966469.png",
  },
  {
    name: "Water Supply",
    email: "water@civiceye.gov",
    description: "Manages water leakage, water distribution, and pipeline repairs.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966424.png",
  },
  {
    name: "Health & Hygiene",
    email: "health@civiceye.gov",
    description: "Monitors sanitation, disease prevention, and public cleanliness.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966408.png",
  },
  {
    name: "Traffic Management",
    email: "traffic@civiceye.gov",
    description: "Handles traffic signals, congestion, and road safety issues.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966503.png",
  },
  {
    name: "Environment",
    email: "environment@civiceye.gov",
    description: "Addresses pollution, tree cutting, green zones, and waste burning complaints.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966527.png",
  },
  {
    name: "Public Safety",
    email: "safety@civiceye.gov",
    description: "Works on street safety, broken fences, and unsafe public structures.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966551.png",
  },
  {
    name: "Parks & Recreation",
    email: "parks@civiceye.gov",
    description: "Maintains public parks, gardens, and recreational spaces.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966582.png",
  },
  {
    name: "Building & Construction",
    email: "construction@civiceye.gov",
    description: "Handles illegal construction, building maintenance, and permits.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966601.png",
  },
  {
    name: "Public Transport",
    email: "transport@civiceye.gov",
    description: "Manages bus stops, public vehicles, and transport infrastructure.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966623.png",
  },
  {
    name: "Disaster Management",
    email: "disaster@civiceye.gov",
    description: "Responds to floods, fire, earthquakes, and emergency civic issues.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966650.png",
  },
];

async function seedDepartments() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Department.deleteMany({});
    await Department.insertMany(departments);
    console.log("✅ 12 Departments seeded successfully!");
    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error seeding departments:", error);
  }
}

seedDepartments();
