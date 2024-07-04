const express = require("express");
const { register, login } = require("../controllers/auth");
const router = express.Router();

const {
  getAllUsers,
  register,
  login,
  refresh,
} = require("../controllers/auth");

const {
  validateLoginData,
  validateRefreshToken,
  validateRegistrationData,
} = require("../validators/auth");

const checkErrors = require("../validators/checkErrors");
const { authAdmin } = require("../middleware/auth");

router.get("/users", authAdmin, getAllUsers);
router.put("/register", validateRegistrationData, checkErrors, register);
router.post("/login", validateLoginData, checkErrors, login);
router.post("/refresh", validateRefreshToken, checkErrors, refresh);

module.exports = router;
