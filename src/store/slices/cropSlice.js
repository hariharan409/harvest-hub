import { createSlice } from "@reduxjs/toolkit";
import { showToast } from "./toastSlice";
import { cropList } from "../../constants";

export const saveCropFormData = (formData) => async(dispatch) => {
    // Step 1: update state in the reducer (state changes via setCropFormData)
    dispatch(setCropFormData(formData));
    // Step 2: dispatch the toast notification
    dispatch(showToast({message: "Crop has saved successfully",type: "success"}));
};

// Create a slice for the form
const cropSlice = createSlice({
    name: "crop",
    initialState: {
        cropForm: {
            id: null,
            cropName: "",
            cropType: "",
            cropImage: null
        },
        cropList: cropList,
        loadingFlags: {
            isSaving: false, // specific state for saving data
            isAwaitingResponse: false
        }
    },
    reducers: {
        setCropFormData: (state,action) => {
            // directly mutate the state, and it will be updated immutably by immer
            state.cropForm =  {
                ...state.form,
                ...action.payload
            };
            state.loadingFlags.isSaving = false;
        },
        setLoadingFlags: (state,action) => {
            state.loadingFlags = {
                ...state.loadingFlags,
                [action.payload.key]: action.payload.value
            }
        },
        getCropByID: (state,action) => {
            const cropId = Number(action.payload); // Ensure it's a number
            const cropForm = state.cropList.find((crop) => crop.id === cropId);
            if(cropForm) {
                state.cropForm = cropForm;
            }
        },
        deleteCropById: (state,action) => {
            const cropId = Number(action.payload); // Ensure it's a number
            let index = state.cropList.findIndex((crop) => crop.id === cropId);
            if(index !== -1) {
                state.cropList.splice(index,1);
            }
        }
    }
});

export const {setCropFormData,setLoadingFlags,getCropByID,deleteCropById} = cropSlice.actions;
export default cropSlice.reducer;