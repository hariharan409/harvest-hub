const express = require("express");
const app = express.Router();
const cropRecordController = require("../controllers/cropRecordController");

/* get request */
app.get("/get-crop-record-list",cropRecordController.getCropRecordList);
app.get("/get-crop-record-by-id",cropRecordController.getCropRecordById);

/* post request */
app.post("/save-crop-record",cropRecordController.saveCropRecord);

/* delete request */
app.delete("/delete-crop-record-by-id",cropRecordController.deleteCropRecordById);

module.exports = app;