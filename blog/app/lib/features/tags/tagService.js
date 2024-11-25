// tagService.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import prisma from '@/app/lib/prisma';

// Fetch tags from the server
export const getTags = createAsyncThunk('tags/getTags', async () => {
  const response = await fetch('/api/tags');
  if (!response.ok) {
    throw new Error('Failed to fetch tags');
  }
  return await response.json();
});

// Create a new tag
export const createTag = createAsyncThunk('tags/createTag', async (tag) => {
  const response = await fetch('/api/tags', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tag),
  });
  if (!response.ok) {
    throw new Error('Failed to create tag');
  }
  return await response.json();
});

// Delete a tag
export const deleteTag = createAsyncThunk('tags/deleteTag', async (id) => {
  const response = await fetch(`/api/tags/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete tag');
  }
  return id; // Return the id for removal
});