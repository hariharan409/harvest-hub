import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodayForecast, getWeatherReport, getWindReport } from "../store/slices/dashboardSlice";



const useDashboard = () => {
    const dispatch = useDispatch();
    const currentWeather = useSelector((state) => state.dashboard?.currentWeather);
    const currentWind = useSelector((state) => state.dashboard?.currentWind);
    const todayForecastList = useSelector((state) => state.dashboard?.todayForecastList);

    useEffect(() => {
        dispatch(getWeatherReport());
        dispatch(getWindReport());
        dispatch(getTodayForecast());
    },[]);

    return {
        currentWeather,
        currentWind,
        todayForecastList
    }
}

export default useDashboard;