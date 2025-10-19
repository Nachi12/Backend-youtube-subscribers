const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app"); // your Express app
const Subscriber = require("./models/subscribers"); // import model to fetch one ID

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing in environment variables!");
  process.exit(1);
}

// ✅ Homepage with dynamic real ID
app.get("/", async (req, res) => {
  try {
    const baseUrl = `https://${req.headers.host}`;
    const firstSubscriber = await Subscriber.findOne(); // get any one subscriber

    const subscriberId = firstSubscriber ? firstSubscriber._id : "no-subscriber-found";

    res.send(`
      <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
        <h1>🎬 YouTube Subscribers API</h1>
        <p>This API is deployed on <b>Render</b> and connected to MongoDB Atlas. 
        Use the links below to test each endpoint:</p>
        <div style="margin-top: 30px;">
          <a href="${baseUrl}/subscribers" style="display:block; margin:10px; text-decoration:none; color:#007bff;">➡️ Get All Subscribers</a>
          <a href="${baseUrl}/subscribers/names" style="display:block; margin:10px; text-decoration:none; color:#28a745;">➡️ Get Subscribers Names</a>
          <a href="${baseUrl}/subscribers/${subscriberId}" style="display:block; margin:10px; text-decoration:none; color:#dc3545;">➡️ Get Subscriber by ID (${subscriberId})</a>
        </div>
      </div>
    `);
  } catch (err) {
    res.send(`
      <h2>Error fetching subscribers ❌</h2>
      <p>${err.message}</p>
    `);
  }
});

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on Render port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });
