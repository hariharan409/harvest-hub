const cropRepository = require("../repositories/cropRepository");


exports.saveCrop = async(crop) => {
    try {
        if(crop._id) {
            await cropRepository.updateCrop(crop._id,crop);
        } else {
            await cropRepository.saveCrop(crop);
        }
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.getCropList = async() => {
    try {
        return await cropRepository.getCropList();
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.getCropById = async(_id) => {
    try {
        return await cropRepository.getCropById(_id);
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.deleteCropById = async(_id) => {
    try {
        await cropRepository.deleteCropById(_id);
    } catch (error) {
        throw new Error(error.message || error);
    }
}