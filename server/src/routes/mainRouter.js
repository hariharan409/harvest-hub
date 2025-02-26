const express = require("express");
const app = express.Router();
const cropRouter = require("../sub-routes/cropRouter");

app.get("/", (_,res) => res.send({ response: "harvest hub api is ready to serve" }).status(200));

app.use("/crop",cropRouter);

module.exports = app;