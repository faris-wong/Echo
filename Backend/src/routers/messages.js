const express = require("express");
const router = express.Router();
const {
  getMessages,
  getMessageByCommunity,
  createMessages,
  updateMessages,
  deleteMessages,
} = require("../controllers/messages");

const { validateMessageData } = require("../validators/messages");
const checkErrors = require("../validators/checkErrors");
const { authAdmin, auth } = require("../middleware/auth");

router.get("/message", getMessages);
router.post("/messagebycommunity", getMessageByCommunity);
router.put("/message", validateMessageData, checkErrors, createMessages);
router.patch("/message", updateMessages);
router.delete("/message", authAdmin, deleteMessages);

module.exports = router;
