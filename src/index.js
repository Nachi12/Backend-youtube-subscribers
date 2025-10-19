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

// ✅ Homepage with input search and Swagger link
app.get("/", async (req, res) => {
  try {
    const baseUrl = `https://${req.headers.host}`;
    const firstSubscriber = await Subscriber.findOne(); // get one existing subscriber
    const subscriberId = firstSubscriber ? firstSubscriber._id : "";

    res.send(`
      <html>
        <head>
          <title>YouTube Subscribers API</title>
          <style>
            body {
              font-family: 'Segoe UI', Arial, sans-serif;
              background: #f4f4f4;
              text-align: center;
              padding: 40px;
            }
            h1 { color:black; }
            p { color: #333; max-width: 600px; margin: 10px auto 30px; }
            a {
              display: block;
              margin: 10px auto;
              padding: 10px 20px;
              text-decoration: none;
              color: black;
              background-color: white ;
              border-radius: 8px;
              width: 250px;
              transition: 0.3s;
            }
            
            input {
              padding: 10px;
              width: 250px;
              border: 1px solid #ccc;
              border-radius: 6px;
              margin-top: 20px;
            }
            button {
              padding: 10px 20px;
              background-color: white;
              color: white;
              border: none;
              border-radius: 6px;
              margin-left: 10px;
              cursor: pointer;
            }
        
          </style>
        </head>
        <body>
          <h1>🎬 YouTube Subscribers API</h1>
          <p>
            This API demonstrates how to perform CRUD operations using 
            <b>Node.js, Express, and MongoDB Atlas</b>. It is fully deployed on 
            <b>Render</b> and includes Swagger API documentation.
          </p>

          <a href="${baseUrl}/subscribers" style="background-color:black;">Get All Subscribers</a>
          <a href="${baseUrl}/subscribers/names" style="background-color:#17a2b8;">Get Subscriber Names</a>
          <a href="${baseUrl}/api-docs" style="background-color:#6f42c1;">View Swagger API Docs</a>

          <div style="margin-top: 30px;">
            <h3>Find Subscriber by ID</h3>
            <input id="subscriberId" type="text" placeholder="Enter Subscriber ID" value="${subscriberId}">
            <button onclick="searchSubscriber()">Search</button>
          </div>

          <script>
            function searchSubscriber() {
              const id = document.getElementById("subscriberId").value.trim();
              if (id) {
                window.location.href = '/subscribers/' + id;
              } else {
                alert('Please enter a valid Subscriber ID.');
              }
            }
          </script>

         
        </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send(`<h2>Error fetching subscribers ❌</h2><p>${err.message}</p>`);
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
