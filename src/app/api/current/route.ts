// src/app/api/current/route.ts

import ServerAuth from "@/libs/ServerAuth";

export async function GET() {
  try {
    // ✅ GET CURRENT USER

    const { currentUser } = await ServerAuth();

    // ✅ RETURN USER

    return Response.json(currentUser, {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    // ✅ UNAUTHORIZED / SERVER ERROR

    return Response.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }
}
