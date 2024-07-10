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

router.get("/message", getMessages);
router.post("/messagebycommunity", getMessageByCommunity);
router.put("/message", validateMessageData, checkErrors, createMessages);
router.patch("/message", updateMessages);
router.delete("/message", deleteMessages);

module.exports = router;
