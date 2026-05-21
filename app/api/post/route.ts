import { prisma } from "@/lib/prisma";


// CREATE POST
export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      title,
      content,
      communityId,
      authorId,
    } = body;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        communityId,
        authorId,
      },
    });

    return Response.json(post);

  } catch (error) {

    console.log(error);

    return Response.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}


// GET POSTS
export async function GET(
  req: Request
) {

  try {

    const { searchParams } =
      new URL(req.url);

    const sort =
      searchParams.get("sort");

    let orderBy: any = {
      createdAt: "desc",
    };

    // SORTING
    if (sort === "popular") {

      orderBy = {
        votes: "desc",
      };
    }

    const posts =
      await prisma.post.findMany({

        include: {
          author: true,
          community: true,
        },

        orderBy,
      });

    return Response.json(
      posts
    );

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        error:
          "Failed to fetch posts",
      },
      {
        status: 500,
      }
    );
  }
}