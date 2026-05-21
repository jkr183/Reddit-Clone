import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  context: any
) {

  try {

    const id = context.params.id;

    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {

      return Response.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    return Response.json(post);

  } catch (error) {

    console.log("ERROR:", error);

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}