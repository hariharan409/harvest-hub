import { axiosInstance } from "./axiosInstance";


const getWeatherReportApi = async() => {
    try {
        const response = await axiosInstance.get("dashboard/get-current-weather");
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data.message || error.message || error;
        throw new Error(errorMessage);
    }
}

const getWindReportApi = async() => {
    try {
        const response = await axiosInstance.get("dashboard/get-current-wind");
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data.message || error.message || error;
        throw new Error(errorMessage);
    }
}

const getTodayForecastApi = async() => {
    try {
        const response = await axiosInstance.get("dashboard/get-today-forecast");
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data.message || error.message || error;
        throw new Error(errorMessage);
    }
}

const getActiveCropsByStatusApi = async() => {
    try {
        const response = await axiosInstance.get("dashboard/get-active-crops-by-status");
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data.message || error.message || error;
        throw new Error(errorMessage);
    }
}

const getActiveCropsExpenseByStatusApi = async() => {
    try {
        const response = await axiosInstance.get("dashboard/get-active-crops-expense-by-status");
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data.message || error.message || error;
        throw new Error(errorMessage);
    }
}

export default {
    getWeatherReportApi,
    getWindReportApi,
    getTodayForecastApi,
    getActiveCropsByStatusApi,
    getActiveCropsExpenseByStatusApi
}