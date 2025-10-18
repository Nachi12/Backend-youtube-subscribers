const mongoose = require("mongoose");
const Subscriber = require("./models/subscribers");

const data = [
  { name: "John", subscribedChannel: "TechWorld" },
  { name: "Jane", subscribedChannel: "DailyVlogs" },
  { name: "Alex", subscribedChannel: "MusicBeats" }
];

const url = "mongodb://127.0.0.1:27017/youtubeSubscribers";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const createDatabase = async () => {
  try {
    await Subscriber.deleteMany({});
    await Subscriber.insertMany(data);
    console.log("Database created and data inserted successfully!");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};

createDatabase();
