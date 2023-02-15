import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import { compare } from "bcryptjs";

import { isUserExists } from "@/helpers/fetchFirebase";

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;

        const user = await isUserExists(email);
        if (Object.keys(user).length === 0) {
          throw new Error("Email atau kata sandi salah!");
        }

        const userKey = user[Object.keys(user)[0]];

        const isPasswordValid = await compare(password, userKey.password);
        if (!isPasswordValid) {
          throw new Error("Email atau kata sandi salah!");
        }

        return { email: userKey.email, image: null, name: userKey.name };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60,
  },
};

export default NextAuth(authOptions);
