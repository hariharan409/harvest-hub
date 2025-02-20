import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./slices/navbarSlice";
import cropReducer from "./slices/cropSlice";


const store = configureStore({
    reducer: {
        navbar: navbarReducer,
        crop: cropReducer
    }
});

export default store;