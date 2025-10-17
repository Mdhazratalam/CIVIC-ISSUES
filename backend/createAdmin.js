// backend/createAdmin.js
// Run: node createAdmin.js
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./src/models/User"); // path to your User model

async function createOrUpdateAdmin() {
  const email = "admin@gmail.com";      // change if you want different admin email
  const plainPassword = "admin123456789";     // change to your desired password
  const name = "System Admin";

  try {
    // 1) connect to DB (uses MONGO_URI in your .env)
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // 2) find existing user by email
    let user = await User.findOne({ email });

    if (user) {
      // If exists -> update plain password and role/admin name, then save
      user.name = name;
      user.role = "admin";
      user.password = plainPassword; // assign plain password so pre-save will hash it once
      await user.save();
      console.log("🔁 Existing user updated to admin:", email);
    } else {
      // If not exists -> create new user (model's pre-save will hash password)
      user = new User({
        name,
        email,
        password: plainPassword,
        role: "admin",
      });
      await user.save();
      console.log("🎉 Admin user created:", email);
    }

    // show some info (no sensitive full password shown)
    console.log("👉 Login with:", email, "/", plainPassword);
    console.log("User id:", user._id.toString());

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message || err);
    try { await mongoose.disconnect(); } catch (e) {}
    process.exit(1);
  }
}

createOrUpdateAdmin();
