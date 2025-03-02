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