const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app"); // your Express app
const express = require("express");

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing in environment variables!");
  process.exit(1);
}

// ✅ Basic homepage route
app.get("/", (req, res) => {
  const baseUrl=`https://${req.headers.host}`;
  res.send(`
    <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
      <h1>🎬 YouTube Subscribers API</h1>
      <p>This project demonstrates basic CRUD operations using Node.js, Express, and MongoDB Atlas. 
      You can view all subscribers, their names, and fetch a specific subscriber by ID.</p>
      <div style="margin-top: 30px;">
        <a href="/subscribers" style="display:block; margin:10px; text-decoration:none; color:#007bff;">➡️ Get All Subscribers</a>
        <a href="/subscribers/names" style="display:block; margin:10px; text-decoration:none; color:#28a745;">➡️ Get Subscribers Names</a>
        <a href="/subscribers/6721abcd1234ef56" style="display:block; margin:10px; text-decoration:none; color:#dc3545;">➡️ Get Subscriber by ID (Example)</a>
      </div>
    </div>
  `);
});

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 Visit: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });
