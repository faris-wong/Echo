const express = require("express");
const router = express.Router();

const { register, login, refresh } = require("../controllers/auth");

const {
  validateLoginData,
  validateRefreshToken,
  validateRegistrationData,
} = require("../validators/auth");

const checkErrors = require("../validators/checkErrors");
const { authAdmin, auth } = require("../middleware/auth");

router.get("/users", authAdmin);
router.put(
  "/register",
  authAdmin,
  auth,
  validateRegistrationData,
  checkErrors,
  register
);
router.post("/login", authAdmin, auth, validateLoginData, checkErrors, login);
router.post(
  "/refresh",
  auth,
  authAdmin,
  validateRefreshToken,
  checkErrors,
  refresh
);

module.exports = router;
