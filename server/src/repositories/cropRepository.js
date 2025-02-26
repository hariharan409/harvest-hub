const { Crop } = require("../models/cropModels");


exports.saveCrop = async(crop) => {
    try {
        const newCrop = new Crop(crop);
        await newCrop.save();
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.updateCrop = async(_id,crop) => {
    try {
        await Crop.findByIdAndUpdate(_id,crop);
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.getCropList = async() => {
    try {
        const cropList = await Crop.find({});
        return cropList;
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.getCropById = async(_id) => {
    try {
        const crop = await Crop.findById(_id);
        return crop;
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.deleteCropById = async(_id) => {
    try {
        await Crop.findByIdAndDelete(_id);
    } catch (error) {
        throw new Error(error.message || error);
    }
}