import { sql } from "@vercel/postgres";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (
        account?.provider === "google" &&
        user.email &&
        user.name &&
        user.image
      ) {
        try {
          const { rows } = await sql`
            SELECT * FROM Users WHERE email = ${user.email}
          `;

          if (rows.length === 0) {
            await sql`
              INSERT INTO Users (name, email, picture, ensemble, stimmgruppe, personal_info)
              VALUES (${user.name}, ${user.email}, ${user.image}, 'Kammerchor', 'Sopran', '')
            `;
          } else {
            await sql`
              UPDATE Users 
              SET name = ${user.name}, picture = ${user.image}
              WHERE email = ${user.email}
            `;
          }
          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
