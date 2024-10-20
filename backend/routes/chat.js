const express = require("express");
const { processChat } = require("../controllers/chatController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, processChat); //! requires authentication to chat

module.exports = router;
