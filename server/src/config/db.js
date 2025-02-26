const mongoose = require("mongoose");

exports.connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.log(`error connecting to db ${error.message || error}`);
    }
}

mongoose.connection.on("connected",() => {
    console.log("fucking awesome!. db has connected");
});

mongoose.connection.on("error",(err) => {
    console.log(`mongoose connection error: ${err}`);
});

mongoose.connection.on("disconnected",() => {
    console.log("mongoose connected");
});