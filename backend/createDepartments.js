require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./src/models/User");

// ✅ All Department Accounts (12 total)
const departments = [
  {
    name: "Electrical Department",
    email: "electrical@civiceye.gov",
    password: "electrical123",
    role: "department",
  },
  {
    name: "Roads Department",
    email: "roads@civiceye.gov",
    password: "roads123",
    role: "department",
  },
  {
    name: "Water Supply Department",
    email: "water@civiceye.gov",
    password: "water123",
    role: "department",
  },
  {
    name: "Sanitation Department",
    email: "sanitation@civiceye.gov",
    password: "sanitation123",
    role: "department",
  },
  {
    name: "Health Department",
    email: "health@civiceye.gov",
    password: "health123",
    role: "department",
  },
  {
    name: "Fire and Safety Department",
    email: "fire@civiceye.gov",
    password: "fire123",
    role: "department",
  },
  {
    name: "Disaster Management Department",
    email: "disaster@civiceye.gov",
    password: "disaster123",
    role: "department",
  },
  {
    name: "Public Works Department",
    email: "pwd@civiceye.gov",
    password: "pwd123",
    role: "department",
  },
  {
    name: "Environment Department",
    email: "environment@civiceye.gov",
    password: "environment123",
    role: "department",
  },
  {
    name: "Transport Department",
    email: "transport@civiceye.gov",
    password: "transport123",
    role: "department",
  },
  {
    name: "Parks and Horticulture Department",
    email: "parks@civiceye.gov",
    password: "parks123",
    role: "department",
  },
  {
    name: "Housing and Urban Development Department",
    email: "housing@civiceye.gov",
    password: "housing123",
    role: "department",
  },
];

async function seedDepartments() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    for (const dept of departments) {
      const existing = await User.findOne({ email: dept.email });

      if (existing) {
        existing.role = "department";
        existing.password = dept.password; // triggers pre-save hashing
        existing.name = dept.name;
        await existing.save();
        console.log("🔁 Updated existing:", dept.email);
      } else {
        await User.create(dept);
        console.log("🎉 Created new department:", dept.email);
      }
    }

    console.log("\n✅ All department accounts are ready!");
    await mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error seeding departments:", err.message);
    await mongoose.disconnect();
  }
}

seedDepartments();
