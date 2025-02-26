import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showToast } from "./toastSlice";
import { getCropListApi } from "../../api/cropApi"; 

export const saveCropFormData = (formData) => async(dispatch) => {
    // Step 1: update state in the reducer (state changes via setCropFormData)
    dispatch(setCropFormData(formData));
    // Step 2: dispatch the toast notification
    dispatch(showToast({message: "Crop has saved successfully",type: "success"}));
};

export const getCropList = createAsyncThunk(
    "crop/get-crop-list",
    async(_,{rejectWithValue}) => {
        try {
            const {data} = await getCropListApi();
            return data;
        } catch (error) {
            rejectWithValue(error.message || error);
        }
    }
)

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
        cropList: [],
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
    },
    extraReducers: (builder) => {
        builder
        .addCase(getCropList.pending,(state) => {
            state.loadingFlags.isAwaitingResponse = true;
        })
        .addCase(getCropList.fulfilled,(state,action) => {
            state.loadingFlags.isAwaitingResponse = false;
            state.cropList = action.payload;
        })
        .addCase(getCropList.rejected,(state,action) => {
            state.loadingFlags.isAwaitingResponse = false;
            dispatch(showToast({message: action.payload,type: "error"}));
        })
        
    }
});

export const {setCropFormData,setLoadingFlags,getCropByID,deleteCropById} = cropSlice.actions;
export default cropSlice.reducer;