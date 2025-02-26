import { createSlice } from "@reduxjs/toolkit";
import { cropRecordsList } from "../../constants";
import { showToast } from "./toastSlice";

const workObject = {
    workType: null,
    workDate: null,
    workDescription: null,
    expenseList: []
};

const expenseObject = {
    expenseType: null,
    expenseAmount: null,
    expenseDate: null,
    expenseDescription: null
}

export const saveCropRecordsFormData = (formData) => async(dispatch) => {
    // Step 1: update state in the reducer (state changes via setCropRecordsFormData)
    dispatch(setCropRecordsFormData(formData));
    // Step 2: dispatch the toast notification
    dispatch(showToast({message: "Crop records has saved successfully",type: "success"}));
};

const cropRecordsSlice = createSlice({
    name: "crop-records-slice",
    initialState: {
        cropRecordsForm: {
            _id: null,
            cropID: null,
            plantingDate: null,
            workDetails: [],
        },
        cropRecordsList: cropRecordsList,
        loadingFlags: {
            isSaving: false, // specific state for saving data
            isAwaitingResponse: false
        }
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
        setEmptyCropRecords: (state) => {
            state.cropRecordsForm = {
                id: null,
                cropID: null,
                plantingDate: null,
                workDetails: [],
            }
        },
        setCropRecordsFormData: (state,action) => {
            // directly mutate the state, and it will be updated immutably by immer
            state.cropRecordsForm =  {
                ...state.cropRecordsForm,
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
        getCropRecordsByID: (state,action) => {
            const cropRecordsId = Number(action.payload); // Ensure it's a number
            const cropRecordsForm = state.cropRecordsList.find((cropRecords) => cropRecords.id === cropRecordsId);
            if(cropRecordsForm) {
                state.cropRecordsForm = cropRecordsForm;
            }
        },
        deleteCropRecordsById: (state,action) => {
            const cropRecordsId = Number(action.payload); // Ensure it's a number
            let index = state.cropRecordsList.findIndex((cropRecords) => cropRecords.id === cropRecordsId);
            if(index !== -1) {
                state.cropRecordsList.splice(index,1);
            }
        }
    }
});

export const {addWorkRow,removeWorkRow,addExpenseRow,removeExpenseRow,setCropRecordsFormData,setLoadingFlags,getCropRecordsByID,deleteCropRecordsById,setEmptyCropRecords} = cropRecordsSlice.actions; 
export default cropRecordsSlice.reducer;