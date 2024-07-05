const express = require("express");
const router = express.Router();
const {
  seedProfile,
  getAllProfiles,
  getProfileByInfo,
  createProfile,
  updateProfileById,
} = require("../controllers/profile");

router.get("/seed", seedProfile);
router.get("/profile", getAllProfiles);
router.post("/profile", getProfileByInfo);
router.put("/profile", createProfile);
router.patch("/profile/:id", updateProfileById);

module.exports = router;
