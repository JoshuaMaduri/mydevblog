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
