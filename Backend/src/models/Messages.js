const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema(
  {
    message: { type: String, require: false, ref: "users" },
    timeStamp: { type: Date, default: Date.now },
  },
  { collection: "messages" }
);

module.exports = mongoose.model("Messages", MessagesSchema);
