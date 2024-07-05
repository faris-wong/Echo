const mongoose = require("mongoose");
// const auth = require("./auth");
// const community = require();
const ObjectId = mongoose.Types.ObjectId;

const ProfileSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    // email: { type: ObjectId, ref: "auth", require: true },
    bio: { type: String, require: true, default: "", maxLength: 400 },
    status: {
      type: String,
      enum: ["Online", "In-game", "AFK", "Offline"],
      require: true,
      default: "Online",
    },
    community: { type: ObjectId, ref: "community" },
  },
  { collection: "Profile" }
);

module.exports = mongoose.model("Profile", ProfileSchema);
