const cropService = require("../services/cropService");
const { sendResponse } = require("../utils/apiResponse");


exports.saveCrop = async(request,response) => {
    try {
        const crop = request.body;
        await cropService.saveCrop(crop);
        sendResponse(response,200,true,"crop has saved successfully",null);
    } catch (error) {
        sendResponse(response,500,false,error.message || error,null);
    }
}

exports.getCropList = async(_,response) => {
    try {
        const data = await cropService.getCropList();
        sendResponse(response,200,true,"crop list",data);
    } catch (error) {
        sendResponse(response,500,false,error.message || error,null);
    }
}

exports.getCropById = async(request,response) => {
    try {
        const {_id} = request.query;
        if(!_id) {
            throw new Error("crop id cannot be empty");
        }
        const data = await cropService.getCropById(_id);
        sendResponse(response,200,true,"crop",data);
    } catch (error) {
        sendResponse(response,500,false,error.message || error,null);
    }
}

exports.deleteCropById = async(request,response) => {
    try {
        const {_id} = request.query;
        if(!_id) {
            throw new Error("crop id cannot be empty");
        }
        await cropService.deleteCropById(_id);
        sendResponse(response,200,true,"crop has deleted successfully",null);
    } catch (error) {
        sendResponse(response,500,false,error.message || error,null);
    }
}