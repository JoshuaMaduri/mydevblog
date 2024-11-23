import { configureStore } from "@reduxjs/toolkit";
import blogReducer from '../lib/features/blog/blogSlice'


export const makeStore = () => {
    return configureStore({
        reducer:{   
            blog: blogReducer,
        }
    })
}

