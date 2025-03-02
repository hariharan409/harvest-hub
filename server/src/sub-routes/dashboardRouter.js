const express = require("express");
const app = express.Router();
const dashboardController = require("../controllers/dashboardController");

/* get request */
app.get("/get-weather-report",dashboardController.getWeatherReport);
app.get("/get-wind-report",dashboardController.getWindReport);

module.exports = app;