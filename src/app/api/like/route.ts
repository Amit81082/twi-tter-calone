// src/app/api/like/route.ts

import Prisma from "@/libs/prismadb";
import ServerAuth from "@/libs/ServerAuth";

export async function POST(request: Request) {
  try {
    const { currentUser } = await ServerAuth();

    if (!currentUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { postId } = body;

    if (!postId) {
      return Response.json({ error: "Post id is required" }, { status: 400 });
    }

    const post = await Prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    if (post.likedIds.includes(currentUser.id)) {
      return Response.json({ error: "Post already liked" }, { status: 400 });
    }

    const updatedPost = await Prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: {
          push: currentUser.id,
        },
      },
    });

    // ✅ CREATE NOTIFICATION

    await Prisma.notification.create({
      data: {
        body: `${currentUser?.name} liked your tweet!`,
        userId: post.authorId,
      },
    });



    return Response.json(updatedPost, {
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
    const { postId } = body;

    if (!postId) {
      return Response.json({ error: "Post id is required" }, { status: 400 });
    }

    const post = await Prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    const updatedLikedIds = post.likedIds.filter((id) => id !== currentUser.id);

    const updatedPost = await Prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    // ✅ Create NOTIFICATION

    await Prisma.notification.create({
      data: {
        body: `${currentUser?.name} unliked your tweet!`,
        userId: post.authorId,
      },
    });


    return Response.json(updatedPost, {
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
