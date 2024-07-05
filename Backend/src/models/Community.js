const mongoose = require("mongoose");

const CommunitySchema = new mongoose.Schema(
  {
    community: { type: String, require: true },
    genre: { type: String, enum: ["action", "puzzle"] },
    created_at: { type: Date, default: Date.now },
  },
  { collection: "community" }
);

module.exports = mongoose.model("Community", CommunitySchema);
