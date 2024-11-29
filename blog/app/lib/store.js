import { configureStore } from "@reduxjs/toolkit";
import blogReducer from '../lib/features/blog/blogSlice'
import tagReducer from '../lib/features/tags/tagsSlice'
import categoryReducer from '../lib/features/categories/categoriesSlice'

export const makeStore = () => {

    return configureStore({
        reducer:{   
            blog: blogReducer,
            tag: tagReducer,
            categories: categoryReducer
        },
    })
}

