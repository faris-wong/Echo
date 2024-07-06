const express = require("express");
const router = express.Router();
const {
  getMessages,
  getMessageByCommunity,
  createMessages,
  updateMessages,
  deleteMessages,
  seedMessages,
} = require("../controllers/messages");

router.get("/seedmessage", seedMessages);
router.get("/message", getMessages);
router.get("/messagebycommunity", getMessageByCommunity);
router.put("/message", createMessages);
router.patch("/message", updateMessages);
router.delete("/message", deleteMessages);

module.exports = router;
