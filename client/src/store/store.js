import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./slices/navbarSlice";
import cropReducer from "./slices/cropSlice";
import cropRecordsReducer from "./slices/cropRecordsSlice";
import toastReducer from "./slices/toastSlice";


const store = configureStore({
    reducer: {
        navbar: navbarReducer,
        crop: cropReducer,
        toast: toastReducer,
        cropRecords: cropRecordsReducer
    }
});

export default store;