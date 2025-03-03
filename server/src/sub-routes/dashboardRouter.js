const express = require("express");
const app = express.Router();
const dashboardController = require("../controllers/dashboardController");

/* get request */
app.get("/get-current-weather",dashboardController.getWeatherReport);
app.get("/get-current-wind",dashboardController.getWindReport);
app.get("/get-today-forecast",dashboardController.getTodayForecast);

module.exports = app;