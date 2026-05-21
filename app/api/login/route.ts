import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      email,
      password,
    } = body;

    // Find user
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {

      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Compare passwords
    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!validPassword) {

      return Response.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    return Response.json({
      message: "Login successful",
      user,
    });

  } catch (error) {

    console.log(error);

    return Response.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}