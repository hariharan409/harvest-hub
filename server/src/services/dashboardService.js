const dashboardRepository = require("../repositories/dashboardRepository");

exports.getWeatherReport = async() => {
    try {
        return await dashboardRepository.getWeatherReport();
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.getWindReport = async() => {
    try {
        return await dashboardRepository.getWindReport();
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.getTodayForecast = async() => {
    try {
        return await dashboardRepository.getTodayForecast();
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.getActiveCropsByStatus = async() => {
    try {
        return await dashboardRepository.getActiveCropsByStatus();
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.getActiveCropsExpenseByStatus = async() => {
    try {
        return await dashboardRepository.getActiveCropsExpenseByStatus();
    } catch (error) {
        throw new Error(error.message || error);
    }
}