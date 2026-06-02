import Prisma from "@/libs/prismadb";

export async function GET() {
  try {
    // ✅ GET USERS

    const users = await Prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // ✅ RETURN USERS

    return Response.json(users, {
      status: 200,
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
