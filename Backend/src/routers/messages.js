const express = require("express");
const router = express.Router();
const {
  getMessages,
  getMessageByCommunity,
  createMessages,
  updateMessages,
  deleteMessages,
} = require("../controllers/messages");

router.get("/message", getMessages);
router.post("/messagebycommunity", getMessageByCommunity);
router.put("/message", createMessages);
router.patch("/message", updateMessages);
router.delete("/message", deleteMessages);

module.exports = router;
