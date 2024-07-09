const express = require("express");
const router = express.Router();
const {
  seedProfile,
  getAllProfiles,
  getProfileByInfo,
  getProfileById,
  getProfileByAccountLink,
  createProfile,
  deleteProfileById,
  updateProfileById,
} = require("../controllers/profile");

router.get("/seed", seedProfile);
router.get("/profile", getAllProfiles);
router.post("/profile", getProfileById);
router.post("/profileaccount", getProfileByAccountLink);
router.put("/profile/:id", createProfile);
router.delete("/profile/:id", deleteProfileById);
router.patch("/profile/:id", updateProfileById);

module.exports = router;
