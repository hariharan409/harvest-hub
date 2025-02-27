const express = require("express");
const app = express.Router();
const cropController = require("../controllers/cropController");

/* get request */
app.get("/get-crop-list",cropController.getCropList);
app.get("/get-crop-by-id",cropController.getCropById);

/* post request */
app.post("/save-crop",cropController.saveCrop);

/* delete request */
app.delete("/delete-crop-by-id",cropController.deleteCropById);

module.exports = app;