import { createSlice } from "@reduxjs/toolkit";

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

const cropRecordsSlice = createSlice({
    name: "crop-records-slice",
    initialState: {
        cropRecordsForm: {
            cropID: null,
            plantingDate: null,
            workDetails: [],
        },
        loadingFlags: {
            isSaving: false, // specific state for saving data
            isAwaitingResponse: false
        }
    },
    reducers: {
        addWorkRow: (state,_) => {
            state.cropRecordsForm.workDetails.push(workObject);
        },
        addExpenseRow: (state,action) => {
            if(state.cropRecordsForm.workDetails instanceof Array && state.cropRecordsForm.workDetails[action.payload]) {
                state.cropRecordsForm.workDetails[action.payload]?.expenseList.push(expenseObject);
            }
        }
    }
});

export const {addWorkRow,addExpenseRow} = cropRecordsSlice.actions; 
export default cropRecordsSlice.reducer;