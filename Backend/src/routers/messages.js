const express = require("express");
const router = express.Router();
const {
  getMessages,
  createMessages,
  updateMessages,
  deleteMessages,
  seedMessages,
} = require("../controllers/messages");

router.get("/seed", seedMessages);
router.get("/message", getMessages);
router.put("/message", createMessages);
router.patch("/message", updateMessages);
router.delete("/message", deleteMessages);

module.exports = router;
