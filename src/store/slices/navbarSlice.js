import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
    name: "navbar",
    initialState: {
        activeNav: "",
        scrolled: false
    },
    reducers: {
        // Action to update the active state
        setActiveNav: (state,action) => {
            state.activeNav = action.payload;
        },
        setScrolled: (state,action) => {
            state.scrolled = action.payload;
        }
    }
});

// Export the action so it can be used elsewhere
export const { setActiveNav,setScrolled } = navbarSlice.actions;

export default navbarSlice.reducer;