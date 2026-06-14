// src/app/api/notification/route.ts

import Prisma from "@/libs/prismadb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const userId = searchParams.get("userId");

    if (!userId) {
      return Response.json(
        {
          error: "User id is required",
        },
        {
          status: 400,
        },
      );
    }

    const notifications = await Prisma.notification.findMany({
      where: {
        userId,
        isRead:false,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(notifications, {
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
