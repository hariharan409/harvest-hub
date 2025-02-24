import { createSlice } from "@reduxjs/toolkit";


const cropRecordsSlice = createSlice({
    name: "crop-slice",
    initialState: {
        cropRecordsForm: {
            cropID: null,
            plantingDate: null
        },
        loadingFlags: {
            isSaving: false, // specific state for saving data
            isAwaitingResponse: false
        }
    },
    reducers: {

    }
});

export default cropRecordsSlice.reducer;