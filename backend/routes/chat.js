const express = require("express");
const {
  processChat,
  getConversations,
  getConversation,
  updateConversationTopic,
  deleteConversation,
} = require("../controllers/chatController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, processChat);
router.get("/conversations", auth, getConversations);
router.get("/conversations/:id", auth, getConversation);
router.put("/conversations/:id", auth, updateConversationTopic);
router.delete("/conversations/:id", auth, deleteConversation);

module.exports = router;
