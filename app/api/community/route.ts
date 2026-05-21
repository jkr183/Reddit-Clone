import { prisma } from "@/lib/prisma";


// CREATE COMMUNITY
export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      name,
      slug,
    } = body;

    // Check existing
    const existingCommunity =
      await prisma.community.findUnique({
        where: {
          slug,
        },
      });

    if (existingCommunity) {

      return Response.json(
        { error: "Community already exists" },
        { status: 400 }
      );
    }

    // Create community
    const community =
      await prisma.community.create({
        data: {
          name,
          slug,
        },
      });

    return Response.json(community);

  } catch (error) {

    console.log(error);

    return Response.json(
      { error: "Failed to create community" },
      { status: 500 }
    );
  }
}


// GET COMMUNITIES
export async function GET() {

  try {

    const communities =
      await prisma.community.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    return Response.json(communities);

  } catch (error) {

    console.log(error);

    return Response.json(
      { error: "Failed to fetch communities" },
      { status: 500 }
    );
  }
}