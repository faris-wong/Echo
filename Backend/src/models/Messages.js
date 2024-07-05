const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema(
  {
    message: { type: String, require: false, ref: "users" },
    timeStamp: { type: Date, default: Date.now },
    status: { type: String, require: false },
  },
  { collection: "messages" }
);

module.exports = mongoose.model("Messages", MessagesSchema);
