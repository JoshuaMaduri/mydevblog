import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk('category/fetchCategories', async () => {
    const response = await fetch ('/api/category')
    return await response.json()
})

export const addCategories = createAsyncThunk('category/addCategories', async (category) => {
    const response = await fetch ('/api/category', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(category)
    })
    if(!response.ok){
        throw new Error('Failed to create category');
    }
    return await response.json()
})

export const removeCategories = createAsyncThunk('category/removeCategories', async ({ id }) => {
    const response = await fetch('/api/category', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      throw new Error('Failed to delete category');
    }
    return id;
  });

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    category: [],
    status: 'idle', // loading, succeeded, failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category.push(action.payload);
      })
      .addCase(addCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message
      })
      .addCase(removeCategories.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(removeCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = state.category.filter((cat) => cat.id !== action.payload);
      })
      .addCase(removeCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message
      })
  },
});

export default categorySlice.reducer;
