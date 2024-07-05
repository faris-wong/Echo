const express = require("express");
const router = express.Router();
const {
  seedProfile,
  getAllProfiles,
  getProfileByInfo,
  createProfile,
  updateProfileById,
} = require("../controllers/profile");

// const { checkBikeInputs } = require("../validators/bikes");
// const { checkErrors } = require("../validators/checkErrors");
// const { auth } = require("../middleware/auth");

router.get("/seed", seedProfile);
router.get("/profile", getAllProfiles);
router.post("/profile", getProfileByInfo);
router.put("/profile", createProfile);
router.patch("/profile/:id", updateProfileById);

module.exports = router;
