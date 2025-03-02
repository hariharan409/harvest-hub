import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dashboardApi from "../../api/dashboardApi";
import { showToast } from "./toastSlice";

export const getWeatherReport = createAsyncThunk("dashboard/get-weather-report",async(_,{dispatch,rejectWithValue}) => {
    try {
        const {data} = await dashboardApi.getWeatherReportApi();
        return data;
    } catch (error) {
        const errorMessage = (error.message || error);
        dispatch(showToast({message: errorMessage,type: "error"}));
        return rejectWithValue(errorMessage);
    }
});

export const getWindReport = createAsyncThunk("dashboard/get-wind-report",async(_,{dispatch,rejectWithValue}) => {
    try {
        const {data} = await dashboardApi.getWindReportApi();
        return data;
    } catch (error) {
        const errorMessage = (error.message || error);
        dispatch(showToast({message: errorMessage,type: "error"}));
        return rejectWithValue(errorMessage);
    }
});

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        currentWeather: {},
        currentWind: {},
        loadingFlags: {
            isAwaitingResponse: false
        }
    },
    extraReducers: (builder) => {
        /* dashboard/get-weather-report api call */
        builder
        .addCase(getWeatherReport.pending,(state) => {
            state.loadingFlags.isAwaitingResponse = true;
        })
        .addCase(getWeatherReport.fulfilled,(state,action) => {
            state.loadingFlags.isAwaitingResponse = false;
            state.currentWeather = action.payload;
        })
        .addCase(getWeatherReport.rejected,(state) => {
            state.loadingFlags.isAwaitingResponse = false;
        });

        /* dashboard/get-wind-report api call */
        builder
        .addCase(getWindReport.pending,(state) => {
            state.loadingFlags.isAwaitingResponse = true;
        })
        .addCase(getWindReport.fulfilled,(state,action) => {
            state.loadingFlags.isAwaitingResponse = false;
            state.currentWind = action.payload;
        })
        .addCase(getWindReport.rejected,(state) => {
            state.loadingFlags.isAwaitingResponse = false;
        });
    }
});

export default dashboardSlice.reducer;