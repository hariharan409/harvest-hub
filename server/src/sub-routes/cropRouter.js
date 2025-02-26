const express = require("express");
const app = express.Router();
const cropController = require("../controllers/cropController");

/* get request */
app.get("/get-crop-list",cropController.getCropList);
app.get("/get-crop-by-id",cropController.getCropById);
app.get("/delete-crop-by-id",cropController.deleteCropById);

/* post request */
app.post("/save-crop",cropController.saveCrop);

module.exports = app;