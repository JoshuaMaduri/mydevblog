import { getTags, createTag, deleteTag } from '@/app/lib/features/tags/tagService';

// GET request to fetch tags
export async function GET(req) {
  try {
    const tags = await getTags();
    return new Response(JSON.stringify(tags), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error fetching tags:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error', error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

// POST request to create a new tag
export async function POST(req) {
  try {
    const tagData = await req.json();
    const newTag = await createTag(tagData);
    return new Response(JSON.stringify(newTag), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error creating tag:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error', error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

// DELETE request to remove a tag by ID
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    await deleteTag(id);
    return new Response(JSON.stringify({ message: 'Tag deleted successfully' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error deleting tag:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error', error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
