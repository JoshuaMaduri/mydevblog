import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch blogs
export const fetchBlogs = createAsyncThunk("blog/fetchBlogs", async () => {
  const response = await fetch("/api/blog");
  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return await response.json();
});

// Async thunk to add a new blog
export const addBlog = createAsyncThunk("blog/addBlog", async (blog) => {
  const response = await fetch("/api/blog", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blog),
  });
  if (!response.ok) {
    throw new Error("Failed to create blog");
  }
  return await response.json();
});

// Async thunk to remove a blog
export const removeBlog = createAsyncThunk("blog/removeBlog", async ({ id }) => {
  const response = await fetch("/api/blog", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    throw new Error("Failed to delete blog");
  }
  return id;
});

// Blog slice
const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    posts: [],
    status: "idle", // "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Add blog
      .addCase(addBlog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts.push(action.payload);
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Remove blog
      .addCase(removeBlog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeBlog.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(removeBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default blogSlice.reducer;
