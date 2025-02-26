const { Crop } = require("../models/cropModels");


exports.saveCrop = async(crop) => {
    try {
        const newCrop = new Crop(crop);
        await newCrop.save();
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.updateCrop = async(id,crop) => {
    try {
        await Crop.findByIdAndUpdate(id,crop);
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

exports.getCropById = async(id) => {
    try {
        const crop = await Crop.findById(id);
        return crop;
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.deleteCropById = async(id) => {
    try {
        await Crop.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error.message || error);
    }
}