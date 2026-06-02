// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";

import bcrypt from "bcrypt";

import Prisma from "@/libs/prismadb";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(Prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        // ✅ CHECK EMAIL + PASSWORD EXISTS

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // ✅ FIND USER

        const user = await Prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // ✅ USER NOT FOUND

        if (!user || !user.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        // ✅ COMPARE PASSWORD

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );

        // ✅ WRONG PASSWORD

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        // ✅ LOGIN SUCCESS

        return user;
      },
    }),
  ],

  debug: process.env.NODE_ENV === "development",

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
