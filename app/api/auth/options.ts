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
            SELECT id, terms_accepted FROM Users WHERE email = ${user.email}
          `;

          if (result.rows.length === 0) {
            // Create new user only on first sign-in
            await sql`
              INSERT INTO Users (name, email, picture, terms_accepted)
              VALUES (${user.name}, ${user.email}, ${user.image}, false)
            `;
            return true; // Allow sign in but they'll be redirected to terms
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
    async redirect({ url, baseUrl }) {
      // Allow relative URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allow callback URLs
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
