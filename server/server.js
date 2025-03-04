const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./src/config/db");
const mainRouter = require("./src/routes/mainRouter");
const swaggerDocs = require("./src/utils/swagger");
const app = express();
dotenv.config();
const PORT = process.env.APP_PORT;

// Set CORS options
const CORS_OPTIONS = {
    origin: ['https://harvest-hub-client-lyart.vercel.app','http://localhost:5173'], // frontend and the backend hosted on different domain, so maually handling the cors
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

// enable cors for all routes
app.use(cors(CORS_OPTIONS));
// db connection
connectDB();
// middleware to handle post & put request. payload size - 50mb
app.use(express.json({limit: "50mb"})); 
// api-routes
app.use("/harvest-hub",mainRouter);

app.listen(PORT,() => {
    console.log(`harvest hub server running on port ${PORT}`);

    swaggerDocs(app,PORT);
});