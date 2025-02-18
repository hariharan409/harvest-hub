import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
    name: "navbar",
    initialState: {
        activeNav: ""
    },
    reducers: {
        // Action to update the active state
        setActiveNav: (state,action) => {
            state.activeNav = action.payload;
        }
    }
});

// Export the action so it can be used elsewhere
export const { setActiveNav } = navbarSlice.actions;

export default navbarSlice.reducer;