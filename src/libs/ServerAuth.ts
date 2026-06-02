import { getServerSession } from "next-auth";

import Prisma from "@/libs/prismadb";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const ServerAuth = async () => {
  try {
    // ✅ GET SESSION

    const session = await getServerSession(authOptions);

    // ✅ NO SESSION

    if (!session?.user?.email) {
      return {
        currentUser: null,
      };
    }

    // ✅ FIND USER

    const currentUser = await Prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    // ✅ USER NOT FOUND

    if (!currentUser) {
      return {
        currentUser: null,
      };
    }

    // ✅ SUCCESS

    return {
      currentUser,
    };
  } catch (error) {
    console.log(error);

    return {
      currentUser: null,
    };
  }
};

export default ServerAuth;
