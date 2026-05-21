import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request
) {

  try {

    const body = await req.json();

    const {
      postId,
      type,
    } = body;

    // GET CURRENT POST
    const post =
      await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

    if (!post) {

      return Response.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    // CALCULATE NEW VOTES
    let newVotes = post.votes;

    if (type === "upvote") {
      newVotes += 1;
    }

    if (type === "downvote") {
      newVotes -= 1;
    }

    // UPDATE POST
    const updatedPost =
      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          votes: newVotes,
        },
      });

    return Response.json(
      updatedPost
    );

  } catch (error) {

    console.log(error);

    return Response.json(
      { error: "Voting failed" },
      { status: 500 }
    );
  }
}