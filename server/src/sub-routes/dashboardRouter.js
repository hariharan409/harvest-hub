const express = require("express");
const app = express.Router();
const dashboardController = require("../controllers/dashboardController");

/**
 * @swagger
 * /harvest-hub/dashboard/get-current-weather:
 *   get:
 *     summary: Get current weather report
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: success
 */

app.get("/get-current-weather",dashboardController.getWeatherReport);
app.get("/get-current-wind",dashboardController.getWindReport);
app.get("/get-today-forecast",dashboardController.getTodayForecast);

module.exports = app;