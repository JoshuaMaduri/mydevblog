import prisma from "@/app/lib/prisma";

export async function GET() {
  try {
    const tags = await prisma.tags.findMany();
    return new Response(JSON.stringify(tags), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch tags' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function POST(req) {
    try {
      const tagData = await req.json(); 
  
      // Validate input (ensure `tag` property exists)
      if (!tagData.tag || typeof tagData.tag !== 'string') {
        return new Response(JSON.stringify({ error: 'Invalid tag data' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      // Insert new tag into the database
      const newTag = await prisma.tags.create({
        data: { tag: tagData.tag },
      });
  
      // Return success response with the created tag
      return new Response(JSON.stringify(newTag), { 
        status: 201, 
        headers: { 'Content-Type': 'application/json' } 
      });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: 'Failed to upload tag' }), { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }
}

export async function DELETE(req) {
    try {
        const { id } = await req.json();

        if (!id) {
            return new Response(JSON.stringify({message: 'ID is required'}), {status: 200} )
        }
        const tagRemoval = await prisma.tags.delete({
            where: {
                id: Number(id)
            }
        })
        return new Response(JSON.stringify({ message: 'Tag deleted successfully' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error deleting tag:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error', error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}