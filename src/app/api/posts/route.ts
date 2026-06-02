import Prisma from "@/libs/prismadb";
import ServerAuth from "@/libs/ServerAuth";

export async function POST(request: Request) {
  try {
    const { currentUser } = await ServerAuth();
    // console.log(" CURRENT USER", currentUser);

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

    const body = await request.json();

    const { body: postBody } = body;

    if (!postBody || !postBody.trim()) {
      return Response.json(
        {
          error: "Tweet is empty",
        },
        {
          status: 400,
        },
      );
    }

    const post = await Prisma.post.create({
      data: {
        body: postBody,
        authorId: currentUser?.id,
        likedIds: [],
      },

      include: {
        author: true,
      },
    });

    return Response.json(post, {
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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const posts = await Prisma.post.findMany({
      where: userId
        ? {
            authorId: userId,
          }
        : undefined,
      orderBy: {
        createdAt: "desc",
      },

      include: {
        author: true,
        comments: true,
      },
    });

    return Response.json(posts, {
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
