const cropRecordService = require("../services/cropRecordService");
const { sendResponse } = require("../utils/apiResponse");

exports.saveCropRecord = async(request,response) => {
    try {
        const cropRecord = request.body;
        await cropRecordService.saveCropRecord(cropRecord);
        sendResponse(response,200,true,"crop record has saved successfully",null);
    } catch (error) {
        sendResponse(response,500,false,error.message || error,null);
    }
}

exports.getCropRecordList = async(_,response) => {
    try {
        const data = await cropRecordService.getCropRecordList();
        sendResponse(response,200,true,"crop record list",data);
    } catch (error) {
        sendResponse(response,500,false,error.message || error,null);
    }
}

exports.getCropRecordById = async(request,response) => {
    try {
        const {_id} = request.query;
        if(!_id) {
            throw new Error("crop record id cannot be empty");
        }
        const data = await cropRecordService.getCropRecordById(_id);
        sendResponse(response,200,true,"crop record",data);
    } catch (error) {
        sendResponse(response,500,false,error.message || error,null);
    }
}

exports.deleteCropRecordById = async(request,response) => {
    try {
        const {_id} = request.query;
        if(!_id) {
            throw new Error("crop record id cannot be empty");
        }
        await cropRecordService.deleteCropRecordById(_id);
        sendResponse(response,200,true,"crop record has deleted successfully",null);
    } catch (error) {
        sendResponse(response,500,false,error.message || error,null);
    }
}