const { CropRecord } = require("../models/cropRecordModel");

exports.saveCropRecord = async(cropRecord) => {
    try {
        const newCropRecord = new CropRecord(cropRecord);
        await newCropRecord.save();
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.updateCropRecord = async(_id,cropRecord) => {
    try {
        await CropRecord.findByIdAndUpdate(_id,cropRecord,{ runValidators: true });
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.getCropRecordList = async() => {
    try {
        const cropRecordList = await CropRecord.find({}).populate("cropID");
        return cropRecordList;
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.getCropRecordById = async(_id) => {
    try {
        const cropRecord = await CropRecord.findById(_id);
        return cropRecord;
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.deleteCropRecordById = async(_id) => {
    try {
        await CropRecord.findByIdAndDelete(_id);
    } catch (error) {
        throw new Error(error.message || error);
    }
}