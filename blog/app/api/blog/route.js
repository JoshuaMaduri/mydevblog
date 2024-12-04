import prisma from "@/app/lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        tags: true,
        categories: true,
      },
    });
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch posts" }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const postData = await req.json();

    if (!postData.title || typeof postData.title !== "string") {
      return new Response(JSON.stringify({ error: "Invalid post data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const newPost = await prisma.post.create({
      data: {
        title: postData.title,
        content: postData.content || null,
        published: postData.published || false,
        tags: {
          connectOrCreate: postData.tags?.map((tag) => ({
            where: { tag },
            create: { tag },
          })),
        },
        categories: {
          connectOrCreate: postData.categories?.map((category) => ({
            where: { category },
            create: { category },
          })),
        },
      },
      include: { tags: true, categories: true },
    });

    return new Response(JSON.stringify(newPost), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to create post" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return new Response(
        JSON.stringify({ error: "ID is required" }),
        { status: 400 }
      );
    }

    await prisma.post.delete({ where: { id: Number(id) } });

    return new Response(
      JSON.stringify({ message: "Post deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting post:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete post" }),
      { status: 500 }
    );
  }
}
