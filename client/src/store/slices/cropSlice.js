import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showToast } from "./toastSlice";
import { getCropListApi,getCropByIdApi,saveCropApi,deleteCropByIdApi } from "../../api/cropApi"; 

export const getCropList = createAsyncThunk(
    "crop/get-crop-list",
    async(_,{dispatch,rejectWithValue}) => {
        try {
            const {data} = await getCropListApi();
            return data;
        } catch (error) {
            const errorMessage = (error.message || error);
            dispatch(showToast({message: errorMessage,type: "error"}));
            return rejectWithValue(errorMessage);
        }
    }
);

export const getCropById = createAsyncThunk(
    "crop/get-crop-by-id",
    async(_id,{dispatch,rejectWithValue}) => {
        try {
            const {data} = await getCropByIdApi(_id);
            return data;
        } catch (error) {
            const errorMessage = (error.message || error);
            dispatch(showToast({message: errorMessage,type: "error"}));
            return rejectWithValue(errorMessage);
        }
    }
);

export const saveCrop = createAsyncThunk(
    "crop/save-crop", async(formData,{dispatch,rejectWithValue}) => {
        try {
            await saveCropApi(formData);
            dispatch(showToast({message: "Crop has saved successfully",type: "success"}));
        } catch (error) {
            const errorMessage = (error.message || error);
            dispatch(showToast({message: errorMessage,type: "error"}));
            return rejectWithValue(errorMessage);
        }
    }
);

export const deleteCropById = createAsyncThunk(
    "crop/delete-crop-by-id",
    async(_id,{dispatch,rejectWithValue}) => {
        try {
            await deleteCropByIdApi(_id);
            dispatch(showToast({message: "Crop has deleted successfully",type: "success"}));
            await dispatch(getCropList());
        } catch (error) {
            const errorMessage = (error.message || error);
            dispatch(showToast({message: errorMessage,type: "error"}));
            return rejectWithValue(errorMessage);
        }
    }
);

// Create a slice for the form
const cropSlice = createSlice({
    name: "crop",
    initialState: {
        cropForm: {
            _id: null,
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
    reducers: {},
    extraReducers: (builder) => {
        /* crop/get-crop-list api call */
        builder
        .addCase(getCropList.pending,(state) => {
            state.loadingFlags.isAwaitingResponse = true;
        })
        .addCase(getCropList.fulfilled,(state,action) => {
            state.loadingFlags.isAwaitingResponse = false;
            state.cropList = action.payload;
        })
        .addCase(getCropList.rejected,(state) => {
            state.loadingFlags.isAwaitingResponse = false;
        });
        /* crop/get-crop-by-id api call */
        builder
        .addCase(getCropById.pending,(state) => {
            state.loadingFlags.isAwaitingResponse = true;
        })
        .addCase(getCropById.fulfilled,(state,action) => {
            state.loadingFlags.isAwaitingResponse = false;
            // directly mutate the state, and it will be updated immutably by immer
            state.cropForm = {
                ...state.cropForm,
                ...action.payload
            };
        })
        .addCase(getCropById.rejected,(state) => {
            state.loadingFlags.isAwaitingResponse = false;
        });

        /* crop/save-crop api call */
        builder
        .addCase(saveCrop.pending,(state) => {
            state.loadingFlags.isSaving = true;
        })
        .addCase(saveCrop.fulfilled,(state) => {
            state.loadingFlags.isSaving = false;
            state.cropForm = {};
        })
        .addCase(saveCrop.rejected,(state) => {
            state.loadingFlags.isSaving = false;
        });

        /* crop/delete-crop-by-id api call */
        builder
        .addCase(deleteCropById.pending,(state) => {
            state.loadingFlags.isAwaitingResponse = true;
        })
        .addCase(deleteCropById.fulfilled,(state) => {
            state.loadingFlags.isAwaitingResponse = false;
        })
        .addCase(deleteCropById.rejected,(state) => {
            state.loadingFlags.isAwaitingResponse = false;
        });
    }
});

export default cropSlice.reducer;