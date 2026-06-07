// src/app/api/comment/route.ts

import Prisma from "@/libs/prismadb";
import ServerAuth from "@/libs/ServerAuth";

export async function POST(request: Request) {
  try {
    const { currentUser } = await ServerAuth();

    if (!currentUser) {
      return Response.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const { searchParams } = new URL(request.url);

    const postId = searchParams.get("postId");

    const body = await request.json();

    const { body: commentBody } = body;

    if (!commentBody || !commentBody.trim()) {
      return Response.json(
        {
          error: "Comment is empty",
        },
        {
          status: 400,
        },
      );
    }

    if (!postId) {
      return Response.json(
        {
          error: "Post id is required",
        },
        {
          status: 400,
        },
      );
    }

    const post = await Prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return Response.json(
        {
          error: "Post not found",
        },
        {
          status: 404,
        },
      );
    }

    const comment = await Prisma.comment.create({
      data: {
        body: commentBody,
        postId,
        authorId: currentUser.id,
      },

      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            profileImage: true,
          },
        },
        post: true,
      },
    });

    await Prisma.notification.create({
      data: {
        body: `${currentUser.name} commented on your post`,
        userId: post.authorId,
      },
    });

    await Prisma.user.update({
      where: {
        id: post.authorId,
      },
      data: {
        hasNotification: true,
      },
    });

    return Response.json(comment, {
      status: 201,
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
