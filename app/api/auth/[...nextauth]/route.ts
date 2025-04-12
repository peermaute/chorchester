import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DefaultSession, NextAuthOptions } from "next-auth";
import { sql } from "@vercel/postgres";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          // Check if user exists
          const result = await sql`
            SELECT id FROM Users WHERE email = ${user.email}
          `;

          if (result.rows.length === 0) {
            // Create new user only on first sign-in
            await sql`
              INSERT INTO Users (name, email, picture)
              VALUES (${user.name}, ${user.email}, ${user.image})
            `;
          }
        } catch (error) {
          console.error("Error saving user to database:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session }) {
      if (session.user) {
        // Use email as the user ID
        session.user.id = session.user.email!;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
