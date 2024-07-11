const express = require("express");
const router = express.Router();

const {
  register,
  login,
  refresh,
  getAllUsers,
} = require("../controllers/auth");

const {
  validateLoginData,
  validateRefreshToken,
  validateRegistrationData,
} = require("../validators/auth");

const checkErrors = require("../validators/checkErrors");
const { authAdmin, auth } = require("../middleware/auth");

router.get("/users", getAllUsers, authAdmin);
router.put("/register", validateRegistrationData, checkErrors, register);
router.post("/login", validateLoginData, checkErrors, login);
router.post("/refresh", validateRefreshToken, checkErrors, refresh);

module.exports = router;
