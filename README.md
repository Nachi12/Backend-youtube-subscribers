# 📺 GetYouTube Subscribers

![Node.js](https://img.shields.io/badge/Node.js-18.x-brightgreen?logo=node.js\&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey?logo=express\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen?logo=mongodb\&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-API%20Docs-brightgreen?logo=swagger\&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

> 🚀 A simple **Node.js + Express + MongoDB** application to manage YouTube subscribers — with full Swagger documentation.



## 🖼️ Preview

| Swagger API Docs                                                 | API JSON Response                                                                        |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| ![Swagger UI](https://swagger.io/assets/images/swagger_logo.svg) | ![JSON Output](https://upload.wikimedia.org/wikipedia/commons/c/c9/JSON_vector_logo.svg) |

---

## 🧠 Overview

This project demonstrates how to build RESTful APIs using **Node.js**, **Express**, and **MongoDB**.
You can fetch, filter, and view YouTube subscribers stored in a MongoDB collection.

---

## 🎯 Features

✅ Fetch all subscribers
✅ Fetch only subscriber names and channels
✅ Fetch subscriber by ID
✅ Handle invalid IDs with proper error messages
✅ Auto-generated API documentation using Swagger

---

## 🧩 Project Structure

```
Subscribers-Mongo-Node-BoilerPlate-main/
│
├── src/
│   ├── models/
│   │   └── subscribers.js         # Mongoose schema (Do not modify)
│   ├── routes/
│   │   └── subscribers.js         # Express routes
│   ├── createDatabase.js          # Script to seed MongoDB
│   ├── index.js                   # Entry point (server + DB connection)
│   └── app.js                     # Handles routes & middleware
│
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/youtube-subscribers.git
cd youtube-subscribers
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env` file:

```bash
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/youtubeSubscribers
```

> 💡 For MongoDB Atlas, replace `MONGO_URI` with your cluster URI.

### 4️⃣ Create and seed the database

```bash
node src/createDatabase.js
```

### 5️⃣ Start the server

```bash
npm start
```



## 🧪 API Endpoints

| Method | Endpoint             | Description                                 |
| ------ | -------------------- | ------------------------------------------- |
| GET    | `/subscribers`       | Returns all subscribers                     |
| GET    | `/subscribers/names` | Returns only `name` and `subscribedChannel` |
| GET    | `/subscribers/:id`   | Returns subscriber by ID                    |

---

### 🧾 Example Response

```json
[
  {
    "_id": "670ff7bbf4ac78b232c213ac",
    "name": "John Doe",
    "subscribedChannel": "TechZone",
    "subscribedDate": "2025-10-18T09:21:00.000Z"
  }
]
```

---

## 📘 Swagger API Documentation

After running the server, open:
👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

You’ll see an interactive API documentation interface like this:

```
GET  /subscribers
GET  /subscribers/names
GET  /subscribers/{id}
```

You can test all APIs directly from Swagger UI.

---

## 🧰 Tech Stack

| Tool           | Purpose                   |
| -------------- | ------------------------- |
| **Node.js**    | JavaScript runtime        |
| **Express.js** | Backend framework         |
| **MongoDB**    | NoSQL database            |
| **Mongoose**   | ODM for MongoDB           |
| **Swagger UI** | API documentation         |
| **dotenv**     | Environment configuration |

---

## 🧑‍💻 Developer Notes

* Don’t modify `index.js`, `createDatabase.js`, or `subscribers.js`.
* `app.js` should only handle middleware and routes.
* Database connection logic must be in `index.js`.

---

## 🏁 Example Console Output

```
Swagger loaded files: [ '/src/routes/*.js' ]
✅ Connected to MongoDB
🚀 Server running on http://localhost:3000
```

---

## 📄 License

This project is licensed under the **MIT License** — free to use and modify.

---

## ⭐ Contribute

If you like this project:

* 🌟 Star this repo on GitHub
* 🐛 Report bugs or suggest improvements
* 🔧 Fork it and create pull requests

