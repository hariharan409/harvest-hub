import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherReport, getWindReport } from "../store/slices/dashboardSlice";



const useDashboard = () => {
    const dispatch = useDispatch();
    const currentWeather = useSelector((state) => state.dashboard?.currentWeather);
    const currentWind = useSelector((state) => state.dashboard?.currentWind);

    useEffect(() => {
        dispatch(getWeatherReport());
        dispatch(getWindReport());
    },[]);

    return {
        currentWeather,
        currentWind
    }
}

export default useDashboard;