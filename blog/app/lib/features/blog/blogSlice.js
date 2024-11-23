import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        posts: [],
    },
    reducers: {
        addPost: (state, action) => {
            state.posts.push(action.payload)
        },
    },
})

export const {addPost} = blogSlice.actions
export default blogSlice.reducer;