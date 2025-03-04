const { default: axios } = require("axios");
const moment = require("moment");
const { CropRecord } = require("../models/cropRecordModel");

exports.getWeatherReport = async() => {
    try {
        /* openweathermap api endpoint with lat & long */
        const OPEN_WEATHER_APP_API = `https://api.openweathermap.org/data/2.5/weather?lat=${process.env.LATITUDE}&lon=${process.env.LONGITUDE}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`;
        const {data} = await axios.get(OPEN_WEATHER_APP_API);
        let tempObj = {};
        if(data) {
            tempObj = {
                status: data.weather[0].main, // weather status (e.g., Rain, Clear, Clouds)
                icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`, // weather icon url
                temperature: `${(data.main.temp - 273.15).toFixed(1)}`, // temperature in celcius (convert from kelvin to celcius)
                location: data.name
            }
        }
        return tempObj;
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.getWindReport = async() => {
    try {
        /* openweathermap api endpoint with lat & long */
        const OPEN_WEATHER_APP_API = `https://api.openweathermap.org/data/2.5/weather?lat=${process.env.LATITUDE}&lon=${process.env.LONGITUDE}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`;
        const {data} = await axios.get(OPEN_WEATHER_APP_API);
        let tempObj = {};
        if(data) {
            tempObj = {
                name: data.wind.speed > 10 ? "strong wind" : "light breeze", // custom wind description
                icon: "https://img.icons8.com/ios-filled/50/ffffff/wind.png", // Generic wind icon
                speed: `${(data.wind.speed).toFixed(1)}`, // wind speed in m/s
                location: data.name 
            }
        }
        return tempObj;
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.getTodayForecast = async() => {
    try {
        /* openweathermap api endpoint with lat & long */
        const OPEN_WEATHER_APP_API = `https://api.openweathermap.org/data/2.5/forecast?lat=${process.env.LATITUDE}&lon=${process.env.LONGITUDE}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`;
        const {data} = await axios.get(OPEN_WEATHER_APP_API);
        let tempArr = [];
        if(data) {
            const today = moment().format("YYYY-MM-DD"); // Get today's date (YYYY-MM-DD)
            const todayForecast = data.list.filter((item) => item.dt_txt.startsWith(today));
            if(todayForecast instanceof Array && todayForecast.length > 0) {
                for(let forecast of todayForecast) {
                    const tempObj = {
                        status: forecast.weather[0].main, // weather status (e.g., Rain, Clear, Clouds)
                        description: forecast.weather[0].description,
                        icon: `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`, // weather icon url
                        temperature: `${(forecast.main.temp - 273.15).toFixed(1)}`, // temperature in celcius (convert from kelvin to celcius)
                        timestamp: moment(forecast.dt_txt).format("h A")
                    };
                    tempArr.push(tempObj);
                }
            }
        }
        return tempArr;
    } catch (error) {
        throw new Error(error.message || error);
    }
} 

exports.getActiveCropsByStatus = async() => {
    try {
        const cropRecordList = await CropRecord
        // find all croprecords with status "planted"
        .find({status: "planted"})
        // populate only the 'cropname' field from the 'cropid' reference
        .populate("cropID","cropName")
        // convert the result into a plain javascript object for better performance
        .lean()
        // after the query, extract only the cropname from each populated record
        .then((records) => records.map((record) => record.cropID.cropName));
        return cropRecordList;
    } catch (error) {
        throw new Error(error.message || error);
    }
}

exports.getActiveCropsExpenseByStatus = async() => {
    try {
        const expense = await CropRecord.aggregate([
            // filter only records where status is "planted"
            {$match: {status: "planted"}},
            // unwind workDetails array to process each work entry separately
            {$unwind: "$workDetails"},
            // unwind expenseList array inside workDetails to process each expense entry separately
            { $unwind: "$workDetails.expenseList" },
            // group by null to calculate the total sum across all records
            {
                $group: {
                    _id: null,
                    totalExpenseAmount: { $sum: "$workDetails.expenseList.expenseAmount" },
                    totalSettledAmount: { $sum: "$workDetails.expenseList.settledAmount" }
                }
            }
            // ([result]) → destructures the first element from the records array
        ]).then(([result]) => ({
            totalExpenseAmount: result?.totalExpenseAmount || 0,
            totalSettledAmount: result?.totalSettledAmount || 0
        }));
        return expense;
    } catch (error) {
        throw new Error(error.message || error);
    }
}