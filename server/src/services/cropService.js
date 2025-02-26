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

exports.getCropById = async(id) => {
    try {
        return await cropRepository.getCropById(id);
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.deleteCropById = async(id) => {
    try {
        await cropRepository.deleteCropById(id);
    } catch (error) {
        throw new Error(error.message || error);
    }
}