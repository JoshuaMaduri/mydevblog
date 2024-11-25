import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTags, createTag, deleteTag } from '@/app/lib/features/tags/tagService';

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
      .addCase(getTags.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTags.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tags = action.payload;
      })
      .addCase(getTags.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createTag.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tags.push(action.payload);
      })
      .addCase(createTag.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteTag.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tags = state.tags.filter((tag) => tag.id !== action.payload);
      })
      .addCase(deleteTag.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default tagSlice.reducer;
