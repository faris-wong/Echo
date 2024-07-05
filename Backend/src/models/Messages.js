const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId

const MessagesSchema = new mongoose.Schema(
  {
    message: { type: String, require: false },
    profilelink: { type: ObjectId, ref: "profile" },
    community: {type: ObjectId, ref: "community"},
    timeStamp: { type: Date, default: Date.now },
  },
  { collection: "messages" }
);

module.exports = mongoose.model("Messages", MessagesSchema);
