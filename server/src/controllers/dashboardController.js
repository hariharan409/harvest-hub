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
        sendResponse(response,200,true,"wind report",data);
    } catch (error) {
        sendResponse(response,500,false,error.message || error,null);
    }
}

exports.getTodayForecast = async(_,response) => {
    try {
        const data = await dashboardService.getTodayForecast();
        sendResponse(response,200,true,"weather forecast",data);
    } catch (error) {
        sendResponse(response,500,false,error.message || error,null);
    }
}

exports.getActiveCropsByStatus = async(_,response) => {
    try {
        const data = await dashboardService.getActiveCropsByStatus();
        sendResponse(response,200,true,"active crops list",data);
    } catch (error) {
        sendResponse(response,500,false,error.message || error,null);
    }
}

exports.getActiveCropsExpenseByStatus = async(_,response) => {
    try {
        const data = await dashboardService.getActiveCropsExpenseByStatus();
        sendResponse(response,200,true,"active crops expense",data);
    } catch (error) {
        sendResponse(response,500,false,error.message || error,null);
    }
}