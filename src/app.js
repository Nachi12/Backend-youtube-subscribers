const express = require("express");
const subscribersRouter = require("./routes/subscribers");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");

const app = express();
app.use(express.json());

// ✅ Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Get YouTube Subscribers API",
      version: "1.0.0",
      description:
        "A simple REST API built with Node.js and MongoDB to get YouTube subscribers.",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  // You can try both of these if needed
  apis: [path.join(__dirname, "routes/*.js")],
};

// ✅ Add this log line here:
console.log("Swagger loaded files:", swaggerOptions.apis);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/subscribers", subscribersRouter);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to Get YouTube Subscribers API");
});

module.exports = app;
