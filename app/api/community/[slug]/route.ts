import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: any
) {

  try {

    // NEXT 16 SAFE PARAMS
    const slug = params.slug;

    console.log("SLUG:", slug);

    // FIND COMMUNITY
    const community =
      await prisma.community.findFirst({
        where: {
          slug,
        },
      });

    console.log("COMMUNITY:", community);

    if (!community) {

      return Response.json(
        {
          error: "Community not found",
        },
        {
          status: 404,
        }
      );
    }

    // GET POSTS
    const posts =
      await prisma.post.findMany({
        where: {
          communityId: community.id,
        },
      });

    console.log("POSTS:", posts);

    return Response.json({
      community,
      posts,
    });

  } catch (error: any) {

    console.log("FULL ERROR:");
    console.log(error);

    return Response.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}