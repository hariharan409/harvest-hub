const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
    cropName: {
        type: String,
        required: true,
        unique: true
    },
    cropType: {
        type: String,
        required: true
    },
    cropImage: {
        type: String,
        required: true
    }
});

exports.Crop = mongoose.model("crop",cropSchema);