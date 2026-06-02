import Prisma from "@/libs/prismadb";

interface IParams {
  userId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  try {
    // ✅ GET USER ID

    const { userId } = await params;

    // ✅ INVALID ID

    if (!userId) {
      return Response.json(
        {
          error: "User id missing",
        },
        {
          status: 400,
        },
      );
    }

    // ✅ FIND USER

    const existingUser = await Prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // ✅ USER NOT FOUND

    if (!existingUser) {
      return Response.json(
        {
          error: "User not found",
        },
        {
          status: 404,
        },
      );
    }

    // ✅ FOLLOWER COUNT

    const followersCount = await Prisma.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });

    // ✅ RETURN USER

    return Response.json(
      {
        ...existingUser,
        followersCount,
      },
      {
        status: 200,
      },
    );
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
