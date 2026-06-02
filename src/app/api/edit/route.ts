import Prisma from "@/libs/prismadb";
import ServerAuth from "@/libs/ServerAuth";

export async function PATCH(request: Request) {
  try {
    // ✅ CURRENT USER

    const { currentUser } = await ServerAuth();

    // ✅ BODY

    const body = await request.json();

    const { name, username, bio, profileImage, coverImage } = body;

    if (!name || !username) {
      return Response.json(
        {
          error: "All fields are required",
        },
        {
          status: 400,
        },
      );
    }

    // ✅ UPDATE USER

    const updatedUser = await Prisma.user.update({
      where: {
        id: currentUser?.id,
      },

      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    // ✅ RETURN UPDATED USER

    return Response.json(updatedUser, {
      status: 200,
    });
  } catch (error) {
    console.log(error);

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
