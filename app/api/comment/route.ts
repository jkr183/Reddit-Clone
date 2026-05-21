import { prisma } from "@/lib/prisma";


// CREATE COMMENT
export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const {
      content,
      postId,
      authorId,
    } = body;

    const comment =
      await prisma.comment.create({
        data: {
          content,
          postId,
          authorId,
        },
      });

    return Response.json(
      comment
    );

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        error:
          "Failed to create comment",
      },
      {
        status: 500,
      }
    );
  }
}


// GET COMMENTS
export async function GET(
  req: Request
) {

  try {

    const { searchParams } =
      new URL(req.url);

    const postId =
      searchParams.get("postId");

    const comments =
      await prisma.comment.findMany({
        where: {
          postId: postId || "",
        },

        include: {
          author: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return Response.json(
      comments
    );

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        error:
          "Failed to fetch comments",
      },
      {
        status: 500,
      }
    );
  }
}