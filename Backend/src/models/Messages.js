const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const ProfileModel = require("../models/Profile");
const CommunityModel = require("../models/Community");

const MessagesSchema = new mongoose.Schema(
  {
    message: { type: String, require: false },
    profilelink: { type: ObjectId, ref: "Profile", require: true },
    communitylink: { type: ObjectId, ref: "Community", require: true },
    timeStamp: { type: Date, default: Date.now },
  },
  { collection: "messages" }
);

module.exports = mongoose.model("Messages", MessagesSchema);
