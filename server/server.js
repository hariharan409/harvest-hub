const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./src/config/db");
const mainRouter = require("./src/routes/mainRouter");
const app = express();
dotenv.config();
const PORT = process.env.APP_PORT;

// db connection
connectDB();
// middleware to handle post & put request. payload size - 50mb
app.use(express.json({limit: "50mb"})); 
// api-routes
app.use("/harvest-hub",mainRouter);

app.listen(PORT,() => {
    console.log(`harvest hub server running on port ${PORT}`);
});