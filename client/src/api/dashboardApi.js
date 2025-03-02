import { axiosInstance } from "./axiosInstance";


const getWeatherReportApi = async() => {
    try {
        const response = await axiosInstance.get("dashboard/get-weather-report");
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data.message || error.message || error;
        throw new Error(errorMessage);
    }
}

const getWindReportApi = async() => {
    try {
        const response = await axiosInstance.get("dashboard/get-wind-report");
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data.message || error.message || error;
        throw new Error(errorMessage);
    }
}

export default {
    getWeatherReportApi,
    getWindReportApi
}