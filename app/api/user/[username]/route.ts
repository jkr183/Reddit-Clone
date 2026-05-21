import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: any
) {

  try {

    const username =
      params.username;

    // FIND USER
    const user =
      await prisma.user.findFirst({
        where: {
          username,
        },
      });

    if (!user) {

      return Response.json(
        {
          error: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    // USER POSTS
    const posts =
      await prisma.post.findMany({

        where: {
          authorId: user.id,
        },

        include: {
          community: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return Response.json({
      user,
      posts,
    });

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        error:
          "Failed to fetch user",
      },
      {
        status: 500,
      }
    );
  }
}