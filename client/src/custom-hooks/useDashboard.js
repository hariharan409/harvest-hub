import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodayForecast, getWeatherReport, getWindReport , getActiveCropsByStatus, getActiveCropsExpenseByStatus} from "../store/slices/dashboardSlice";



const useDashboard = () => {
    const dispatch = useDispatch();
    const {currentWeather,currentWind,todayForecastList,activeCropsList,activeCropsExpense} = useSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(getWeatherReport());
        dispatch(getWindReport());
        dispatch(getTodayForecast());
        dispatch(getActiveCropsByStatus());
        dispatch(getActiveCropsExpenseByStatus());
    },[]);

    return {
        currentWeather,
        currentWind,
        todayForecastList,
        activeCropsList,
        activeCropsExpense
    }
}

export default useDashboard;