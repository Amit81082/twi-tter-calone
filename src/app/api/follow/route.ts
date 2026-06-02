// src/app/api/follow/route.ts

import Prisma from "@/libs/prismadb";
import ServerAuth from "@/libs/ServerAuth";

export async function POST(request: Request) {
  try {
    const { currentUser } = await ServerAuth();
    // console.log(currentUser);

    if (!currentUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return Response.json({ error: "User id is required" }, { status: 400 });
    }

    const userToFollow = await Prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userToFollow) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    if (currentUser.followingIds.includes(userId)) {
      return Response.json(
        { error: "Already following this user" },
        { status: 400 },
      );
    }


    const updatedUser = await Prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: {
          push: userId,
        },
      },
    });

    // Create Notification
       await Prisma.notification.create({
        data: {
          body: `@${userToFollow.username} followed you!`,
          userId,
        },
      });

      await Prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          hasNotification: true,
        },
      });


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

export async function DELETE(request: Request) {
  try {
    const { currentUser } = await ServerAuth();

    if (!currentUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return Response.json({ error: "User id is required" }, { status: 400 });
    }

    if (!currentUser.followingIds.includes(userId)) {
      return Response.json(
        { error: "You are not following this user" },
        { status: 400 },
      );
    }


    const updatedFollowingIds = currentUser.followingIds.filter(
      (id: string) => id !== userId,
    );

    const updatedUser = await Prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    // Create Notification
    await Prisma.notification.create({
      data: {
        body: `${currentUser?.name} stopped following you`,
        userId,
      },
    });

    await Prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hasNotification: true,
      },
    });

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
