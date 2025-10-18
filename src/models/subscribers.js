const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
  name: String,
  subscribedChannel: String,
  subscribeDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Subscriber", subscriberSchema);
