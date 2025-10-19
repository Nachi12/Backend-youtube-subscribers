const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app"); // your Express app

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
app.use(express.static(path.join(__dirname, "public")));

// Optional: fallback route to serve index.html for SPA
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing in environment variables!");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });
