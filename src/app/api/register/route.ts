// src/app/api/register/route.ts

import bcrypt from "bcrypt";

import Prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  try {
    // ✅ GET BODY

    const body = await request.json();

    const { email, username, name, password } = body;

    // ✅ VALIDATION

    if (!email || !username || !name || !password) {
      return Response.json(
        {
          error: "All fields are required",
        },
        {
          status: 400,
        },
      );
    }

    // ✅ CHECK EXISTING USER

    const existingUser = await Prisma.user.findUnique({
      where: {
        email,
      },
    });

    // ✅ USER ALREADY EXISTS

    if (existingUser) {
      return Response.json(
        {
          error: "Email already exists",
        },
        {
          status: 400,
        },
      );
    }

    // ✅ HASH PASSWORD

    const hashedPassword = await bcrypt.hash(password, 12);

    // ✅ CREATE USER

    const user = await Prisma.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,

        profileImage: "",
        coverImage: "",
        bio: "",
      },
    });

    // ✅ SUCCESS RESPONSE

    return Response.json(user, {
      status: 201,
    });
  } catch (error) {
    console.log(error);

    // ✅ SERVER ERROR

    return Response.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
