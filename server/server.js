const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./src/config/db");
const mainRouter = require("./src/routes/mainRouter");
const app = express();
dotenv.config();
const PORT = process.env.APP_PORT;

// Enable CORS for all routes
app.use(cors());
// db connection
connectDB();
// middleware to handle post & put request. payload size - 50mb
app.use(express.json({limit: "50mb"})); 
// api-routes
app.use("/harvest-hub",mainRouter);

module.exports = app;