import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// define the types for the toast state and action payload
interface ToastState {
    message: string,
    type?: "success" | "error";
}

const initialState: ToastState = {
    message: "",
    type: "success"
};

const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        showToast: (state,action: PayloadAction<ToastState>) => {
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        clearToast: (state) => {
            state.message = "";
        }
    }
});

export const {showToast,clearToast} = toastSlice.actions;
export default toastSlice.reducer;