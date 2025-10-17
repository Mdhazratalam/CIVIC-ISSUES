// backend/seedAllDepartments.js
require("dotenv").config();
const mongoose = require("mongoose");
const Department = require("./src/models/Department");
const User = require("./src/models/User");

// list of departments (display names & descriptions & icons)
const DEPARTMENTS = [
  { name: "Electrical Department", description: "Handles streetlight, wiring, and public electricity issues.", imageUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966338.png" },
  { name: "Roads & Infrastructure", description: "Fixes potholes, maintains roads, footpaths and infrastructure.", imageUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966469.png" },
  { name: "Water Supply", description: "Manages water leakage, water distribution and pipeline repairs.", imageUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966424.png" },
  { name: "Sanitation Department", description: "Responsible for garbage collection, waste management, and cleanliness.", imageUrl: "https://cdn-icons-png.flaticon.com/512/2331/2331948.png" },
  { name: "Health Department", description: "Monitors sanitation, disease prevention, and public cleanliness.", imageUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966408.png" },
  { name: "Traffic Management", description: "Handles traffic signals, congestion, and road safety issues.", imageUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966503.png" },
  { name: "Environment", description: "Addresses pollution, tree cutting, green zones, and waste burning complaints.", imageUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966527.png" },
  { name: "Public Safety", description: "Works on street safety, broken fences, and unsafe public structures.", imageUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966551.png" },
  { name: "Parks & Recreation", description: "Maintains public parks, gardens, and recreational spaces.", imageUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966582.png" },
  { name: "Public Transport", description: "Manages bus stops, public vehicles, and transport infrastructure.", imageUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966623.png" },
{
  name: "Disaster Management",
  description: "Responds to floods, fire, earthquakes, and emergency civic issues.",
  imageUrl: "https://cdn-icons-png.flaticon.com/512/2344/2344147.png"
},


  { name: "Housing & Urban Development", description: "Handles housing, permits and urban development issues.", imageUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966601.png" },
];

function makeEmailFromName(name) {
  // remove non-alphanumeric, lowercase and join
  const short = name.replace(/[^a-zA-Z0-9]/g, " ").split(" ").filter(Boolean).join("");
  return `${short.toLowerCase()}@gmail.com`;
}

function makePasswordFromName(name) {
  const short = name.replace(/[^a-zA-Z0-9]/g, " ").split(" ").filter(Boolean).join("");
  return `${short.toLowerCase()}@123`;
}

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    for (const d of DEPARTMENTS) {
      // upsert Department doc
      await Department.updateOne(
        { name: d.name },
        { $set: { name: d.name, email: makeEmailFromName(d.name), description: d.description, imageUrl: d.imageUrl } },
        { upsert: true }
      );

      const email = makeEmailFromName(d.name);
      const password = makePasswordFromName(d.name);

      // upsert User (department)
      const existing = await User.findOne({ email });
      if (existing) {
        existing.name = d.name;
        existing.role = "department";
        existing.password = password; // User model pre-save hashes it
        await existing.save();
        console.log(`Updated user: ${email}`);
      } else {
        await User.create({ name: d.name, email, password, role: "department" });
        console.log(`Created user: ${email}`);
      }

      console.log(`=> Dept: ${d.name} | email: ${email} | password: ${password}`);
    }

    console.log("Seeding done.");
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
