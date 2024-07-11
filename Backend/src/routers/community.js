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

const { authAdmin, auth } = require("../middleware/auth");

router.get("/seedcommunity", authAdmin, seedCommunity);
router.get("/community", getAllCommunities);
router.post("/community", getCommunityById);
router.put("/community", authAdmin, createCommunity);
router.delete("/community/:id", deleteCommunityById);
router.patch("/community/:id", authAdmin, updateCommunityById);

module.exports = router;
