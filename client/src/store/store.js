import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./slices/navbarSlice";
import cropReducer from "./slices/cropSlice";
import cropRecordsReducer from "./slices/cropRecordsSlice";
import toastReducer from "./slices/toastSlice";
import dashboardReducer from "./slices/dashboardSlice";


const store = configureStore({
    reducer: {
        navbar: navbarReducer,
        crop: cropReducer,
        toast: toastReducer,
        cropRecords: cropRecordsReducer,
        dashboard: dashboardReducer
    }
});

export default store;