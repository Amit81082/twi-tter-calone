import Prisma from "@/libs/prismadb";
import ServerAuth from "@/libs/ServerAuth";

interface IParams {
  postId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<IParams> },
) {
  try {
    const { currentUser } = await ServerAuth();

    if (!currentUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { postId } = await params;

    if (!postId) {
      return Response.json({ error: "Post id missing" }, { status: 400 });
    }

    const post = await Prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    if (post.authorId !== currentUser.id) {
      return Response.json(
        { error: "You can only delete your own posts" },
        { status: 403 },
      );
    }

    await Prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return Response.json(
      {
        message: "Post deleted",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<IParams> },
) {
  try {
    const { postId } = await params;

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

      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            profileImage: true,
          },
        },

        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                username: true,
                profileImage: true,
              },
            },
          },

          orderBy: {
            createdAt: "desc",
          },
        },
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

    return Response.json(post, {
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
