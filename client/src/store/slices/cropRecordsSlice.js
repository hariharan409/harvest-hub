import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showToast } from "./toastSlice";
import cropRecordApi from "../../api/cropRecordApi";

export const getCropRecordList = createAsyncThunk("crop-record/get-crop-record-list",async(status,{dispatch,rejectWithValue}) => {
    try {
        const {data} = await cropRecordApi.getCropRecordListApi(status);
        return data;
    } catch (error) {
        const errorMessage = (error.message || error);
        dispatch(showToast({message: errorMessage,type: "error"}));
        return rejectWithValue(errorMessage);
    }
});

export const getCropRecordById = createAsyncThunk("crop-record/get-crop-record-by-id",async(_id,{dispatch,rejectWithValue}) => {
    try {
        const {data} = await cropRecordApi.getCropRecordByIdApi(_id);
        return data;
    } catch (error) {
        const errorMessage = (error.message || error);
        dispatch(showToast({message: errorMessage,type: "error"}));
        return rejectWithValue(errorMessage);
    }
});

export const saveCropRecord = createAsyncThunk("crop-record/save-crop-record", async(formData,{dispatch,rejectWithValue}) => {
    try {
        await cropRecordApi.saveCropRecordApi(formData);
        dispatch(showToast({message: "crop record has saved successfully",type: "success"}));
    } catch (error) {
        const errorMessage = (error.message || error);
        dispatch(showToast({message: errorMessage,type: "error"}));
        return rejectWithValue(errorMessage);
    }
});

export const deleteCropRecordById = createAsyncThunk("crop-record/delete-crop-record-by-id",async(_id,{dispatch,rejectWithValue}) => {
    try {
        await cropRecordApi.deleteCropRecordByIdApi(_id);
        dispatch(showToast({message: "crop record has deleted successfully",type: "success"}));
        await dispatch(getCropRecordList("planted"));
    } catch (error) {
        const errorMessage = (error.message || error);
        dispatch(showToast({message: errorMessage,type: "error"}));
        return rejectWithValue(errorMessage);
    }
});
/* crop record form */
const cropRecordObject = {
    _id: null,
    cropID: null,
    plantingDate: null,
    harvestingDate: null,
    status: null,
    workDetails: [],
}

const workObject = {
    workType: null,
    workDate: null,
    workDescription: null,
    expenseList: []
};

const expenseObject = {
    expenseType: null,
    expenseAmount: null,
    settledAmount: null,
    pendingAmount: null,
    expenseDate: null,
    expenseDescription: null
}

const cropRecordsSlice = createSlice({
    name: "crop-records-slice",
    initialState: {
        cropRecordsForm: JSON.parse(JSON.stringify(cropRecordObject)), // Deep Copy
        cropRecordsList: [],
        statusType: "planted",
        loadingFlags: {
            isSaving: false, // specific state for saving data
            isAwaitingResponse: false
        },
        refreshState: JSON.parse(JSON.stringify(cropRecordObject)) // deep copy
    },
    reducers: {
        addWorkRow: (state,_) => {
            state.cropRecordsForm.workDetails.push(workObject);
        },
        removeWorkRow: (state,action) => {
            console.log(action.payload);
            if(state.cropRecordsForm.workDetails[action.payload.workIndex]) {
                state.cropRecordsForm.workDetails?.splice(action.payload.workIndex,1);
            }
        },
        addExpenseRow: (state,action) => {
            if(state.cropRecordsForm.workDetails instanceof Array && state.cropRecordsForm.workDetails[action.payload]) {
                state.cropRecordsForm.workDetails[action.payload]?.expenseList.push(expenseObject);
            }
        },
        removeExpenseRow: (state,action) => {
            if(state.cropRecordsForm.workDetails[action.payload.workIndex] && state.cropRecordsForm.workDetails[action.payload.workIndex]?.expenseList[action.payload.expenseIndex]) {
                state.cropRecordsForm.workDetails[action.payload.workIndex]?.expenseList.splice(action.payload.expenseIndex,1);
            }
        },
        refreshCropRecordForm: (state) => {
            state.cropRecordsForm = state.refreshState;
        },
        changeStatusType: (state,action) => {
            state.statusType = action.payload;
        }
    },
    extraReducers: (builder) => {
        /* crop-record/get-crop-record-list api call */
        builder
        .addCase(getCropRecordList.pending,(state) => {
            state.loadingFlags.isAwaitingResponse = true;
        })
        .addCase(getCropRecordList.fulfilled,(state,action) => {
            state.loadingFlags.isAwaitingResponse = false;
            state.cropRecordsList = action.payload;
        })
        .addCase(getCropRecordList.rejected,(state) => {
            state.loadingFlags.isAwaitingResponse = false;
        });

        /* crop-record/get-crop-record-by-id api call */
        builder
        .addCase(getCropRecordById.pending,(state) => {
            state.loadingFlags.isAwaitingResponse = true;
        })
        .addCase(getCropRecordById.fulfilled,(state,action) => {
            state.loadingFlags.isAwaitingResponse = false;
            // directly mutate the state, and it will be updated immutably by immer
            state.cropRecordsForm = {
                ...state.cropRecordsForm,
                ...action.payload
            };
        })
        .addCase(getCropRecordById.rejected,(state) => {
            state.loadingFlags.isAwaitingResponse = false;
        });

        /* crop-record/save-crop-record api call */
        builder
        .addCase(saveCropRecord.pending,(state) => {
            state.loadingFlags.isSaving = true;
        })
        .addCase(saveCropRecord.fulfilled,(state) => {
            state.loadingFlags.isSaving = false;
            state.cropRecordsForm = state.refreshState;
        })
        .addCase(saveCropRecord.rejected,(state) => {
            state.loadingFlags.isSaving = false;
        });

        /* crop-record/delete-crop-record-by-id api call */
        builder
        .addCase(deleteCropRecordById.pending,(state) => {
            state.loadingFlags.isAwaitingResponse = true;
        })
        .addCase(deleteCropRecordById.fulfilled,(state) => {
            state.loadingFlags.isAwaitingResponse = false;
            state.statusType = "planted";
        })
        .addCase(deleteCropRecordById.rejected,(state) => {
            state.loadingFlags.isAwaitingResponse = false;
        });
    }
});

export const {addWorkRow,removeWorkRow,addExpenseRow,removeExpenseRow,refreshCropRecordForm,changeStatusType} = cropRecordsSlice.actions; 
export default cropRecordsSlice.reducer;