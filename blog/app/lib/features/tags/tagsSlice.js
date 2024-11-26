import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTags = createAsyncThunk('tag/fetchTags', async () => {
    const response = await fetch ('/api/tag')
    return await response.json()
})

export const addTags = createAsyncThunk('tag/addTags', async (tag) => {
    const response = await fetch ('/api/tag', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(tag)
    })
    console.log(response)
    if(!response.ok){
        throw new Error('Failed to create tag');
    }
    return await response.json()
})

export const removeTag = createAsyncThunk('tag/removeTags', async (id) => {
    const response = await fetch (`/api/tag`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(id)
    });
    if(!response.ok){
        throw new Error('Failed to delete tag');
    }
    return id;
})

const tagSlice = createSlice({
  name: 'tag',
  initialState: {
    tags: [],
    status: 'idle', // loading, succeeded, failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTags.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTags.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tags.push(action.payload);
      })
      .addCase(addTags.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message
      })
      .addCase(removeTag.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(removeTag.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tags = state.tags.filter((tag) => tag.id !== action.payload);
      })
      .addCase(removeTag.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message
      })
  },
});

export default tagSlice.reducer;
