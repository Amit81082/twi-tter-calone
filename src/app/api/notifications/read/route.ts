import Prisma from "@/libs/prismadb";
import ServerAuth from "@/libs/ServerAuth";

export async function POST() {
  try {
    const { currentUser } = await ServerAuth();

    if (!currentUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await Prisma.notification.updateMany({
      where: {
        userId: currentUser.id, // 👈 receiver should be current user
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    return Response.json(
      { message: "Notifications marked as read" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
