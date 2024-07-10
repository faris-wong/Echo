const mongoose = require("mongoose");

const CommunitySchema = new mongoose.Schema(
  {
    communityname: { type: String, require: true },
    genre: {
      type: String,
    },
    information: { type: String, require: false, default: "", maxLength: 1000 },
    created_at: { type: Date, default: Date.now },
  },
  { collection: "community" }
);

module.exports = mongoose.model("Community", CommunitySchema);
