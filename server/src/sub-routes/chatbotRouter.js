const express = require("express");
const app = express.Router();
const chatbotController = require("../controllers/chatbotController");

/* get request */
app.get("/get-chat-response-using-rag",chatbotController.getChatResponseFromRAG);

module.exports = app;