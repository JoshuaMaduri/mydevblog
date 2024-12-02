import prisma from "@/app/lib/prisma";

export async function GET() {
    try {
      const categories = await prisma.categories.findMany();
      return new Response(JSON.stringify(categories), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: 'Failed to fetch categories' }), { status: 500 });
    }
  }
  

export async function POST(req) {
    try {
      const categoryData = await req.json(); 
  
      if (!categoryData.category || typeof categoryData.category !== 'string') {
        return new Response(JSON.stringify({ error: 'Invalid category data' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
  
      const newCategory = await prisma.categories.create({
        data: { category: categoryData.category },
      });
  
      // Return success response with the created tag
      return new Response(JSON.stringify(newCategory), { 
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
        return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });
      }
  
      await prisma.categories.delete({ where: { id: Number(id) } });
  
      return new Response(JSON.stringify({ message: 'Category deleted successfully' }), { status: 200 });
    } catch (error) {
      console.error('Error deleting category:', error);
      return new Response(JSON.stringify({ error: 'Failed to delete category' }), { status: 500 });
    }
  }
  