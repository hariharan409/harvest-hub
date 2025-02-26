const express = require("express");
const app = express.Router();
const cropRouter = require("../sub-routes/cropRouter");
const cropRecordRouter = require("../sub-routes/cropRecordRouter");

app.get("/", (_,res) => res.send({ response: "harvest hub api is ready to serve" }).status(200));

app.use("/crop",cropRouter);
app.use("/crop-record",cropRecordRouter);

module.exports = app;