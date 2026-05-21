import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      email,
      username,
      password,
    } = body;

    // Check existing user
    const existingUser =
      await prisma.user.findFirst({
        where: {
          OR: [
            { email },
            { username },
          ],
        },
      });

    if (existingUser) {

      return Response.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    return Response.json(user);

  } catch (error) {

    console.log(error);

    return Response.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}