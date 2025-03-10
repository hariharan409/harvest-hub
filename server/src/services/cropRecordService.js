const cropRecordRepository = require("../repositories/cropRecordRepository"); 
const embeddingService = require("./embeddingService");

exports.saveCropRecord = async(cropRecord) => {
    try {
        // generate embeddings for query-based fields
        cropRecord.embedding = await embeddingService.generateEmbedding(
            `${JSON.stringify(cropRecord)}`
        );

        if(cropRecord._id) {
            await cropRecordRepository.updateCropRecord(cropRecord._id,cropRecord);
        } else {
            await cropRecordRepository.saveCropRecord(cropRecord);
        }
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.getCropRecordList = async(status) => {
    try {
        return await cropRecordRepository.getCropRecordList(status);
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.getCropRecordById = async(_id) => {
    try {
        return await cropRecordRepository.getCropRecordById(_id);
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.deleteCropRecordById = async(_id) => {
    try {
        await cropRecordRepository.deleteCropRecordById(_id);
    } catch (error) {
        throw new Error(error.message || error);
    }
}