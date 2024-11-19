import { createSlice } from "@reduxjs/toolkit";

// Function to get the system theme
const getSystemTheme = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dracula'
            : 'nord';
    }
    return 'nord';
};

// Initial state for the theme slice
const initialState = {
    theme: getSystemTheme()
};

// Create the slice
export const themeSlice = createSlice({
    name: 'theme',
    initialState, // Correct use of `initialState`
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'nord' ? 'dracula' : 'nord';
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        }
    }
});

// Export the actions and the reducer
export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
