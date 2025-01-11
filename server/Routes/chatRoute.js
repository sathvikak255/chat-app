const express = require("express");
const { createChat, findUserChats, findChat } = require("../Controllers/chatController");

const router = express.Router();

router.post("/", createChat);
router.get("/:userID", findUserChats);
router.get("/find/:firstID/:secondID", findChat);   

module.exports = router;