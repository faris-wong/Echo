const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const AuthModel = require("../models/Auth");

const ProfileSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    accountlink: { type: ObjectId, ref: "Auth", require: true },
    bio: { type: String, require: true, default: "", maxLength: 400 },
    status: {
      type: String,
      enum: ["Online", "In-game", "AFK", "Offline"],
      require: true,
      default: "Online",
    },
    games: { type: String, require: false },
  },
  { collection: "profile" }
);

module.exports = mongoose.model("Profile", ProfileSchema);
