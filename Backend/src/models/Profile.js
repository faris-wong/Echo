const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      default: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
      unique: true,
    },
    email: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
    created_at: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
    bio: { type: String, maxLength: 400 },
    status: {
      type: String,
      enum: ["Online", "In-game", "AFK", "Offline"],
      require: true,
      default: "Online",
    },
    community: { type: mongoose.Schema.Types.ObjectId, ref: "community" },
  },
  { collection: "Profile" }
);

module.exports = mongoose.model("Profile", ProfileSchema);
