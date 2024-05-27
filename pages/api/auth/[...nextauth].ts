import { GlobalResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.JWT_SECRET_KEY,
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60 * 16, // 16 hours
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "username" },
        password: { label: "password" },
      },
      async authorize(credentials, req) {
        try {
          const result: GlobalResponse<{ nama: string; role: string[] }> =
            await fetcher({
              url: "/pengguna/login",
              method: "POST",
              data: credentials,
            });

          return {
            nama: result.data.nama,
            role: result.data.role,
          };
        } catch (error) {
          throw new Error(JSON.stringify(error));
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.nama = user.nama;
        token.role = user.role;
      }
      return token;
    },

    session({ session, token }) {
      session.user.nama = token.nama;
      session.user.role = token.role;
      return session;
    },
  },
};

export default NextAuth(authOptions);
