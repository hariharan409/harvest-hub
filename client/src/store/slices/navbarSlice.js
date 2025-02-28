import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
    name: "navbar",
    initialState: {
        activeNav: "",
        toggleNav: false,
        scrolled: false
    },
    reducers: {
        // Action to update the active state
        setActiveNav: (state,action) => {
            state.activeNav = action.payload;
        },
        setToggleNav: (state,action) => {
            state.toggleNav = action.payload;
        },
        setScrolled: (state,action) => {
            state.scrolled = action.payload;
        }
    }
});

// Export the action so it can be used elsewhere
export const { setActiveNav,setScrolled,setToggleNav } = navbarSlice.actions;

export default navbarSlice.reducer;