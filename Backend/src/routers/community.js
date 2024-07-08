const express = require("express");
const router = express.Router();
const {
  seedCommunity,
  getAllCommunities,
  getCommunityById,
  createCommunity,
  deleteCommunityById,
  updateCommunityById,
} = require("../controllers/community");

router.get("/seedcommunity", seedCommunity);
router.get("/community", getAllCommunities);
router.post("/community", getCommunityById);
router.put("/community", createCommunity);
router.delete("/community/:id", deleteCommunityById);
router.patch("/community/:id", updateCommunityById);

module.exports = router;
