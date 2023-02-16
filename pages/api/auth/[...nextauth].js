import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import { compare } from "bcryptjs";

import { isUserExists } from "@/helpers/fetchFirebase";

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;

        const userKey = await isUserExists(email);
        if (Object.keys(userKey).length === 0) {
          throw new Error("Email atau kata sandi salah!");
        }

        const user = userKey[Object.keys(userKey)[0]];

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Email atau kata sandi salah!");
        }

        if (!user.verified) {
          throw new Error("Akun belum teraktivasi. Cek email untuk aktivasi.");
        }

        return { email: user.email, image: null, name: user.name };
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
