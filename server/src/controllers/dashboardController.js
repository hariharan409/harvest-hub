const { sendResponse } = require("../utils/apiResponse");
const dashboardService = require("../services/dashboardService");


exports.getWeatherReport = async(_,response) => {
    try {
        const data = await dashboardService.getWeatherReport();
        sendResponse(response,200,true,"weather report",data);
    } catch (error) {
        sendResponse(response,500,false,error.message || error,null);
    }
}

exports.getWindReport = async(_,response) => {
    try {
        const data = await dashboardService.getWindReport();
        sendResponse(response,200,true,"weather report",data);
    } catch (error) {
        sendResponse(response,500,false,error.message || error,null);
    }
}