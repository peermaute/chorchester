import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Email from "next-auth/providers/email";
import { DefaultSession, NextAuthOptions } from "next-auth";
import { sql } from "@vercel/postgres";
import { Resend } from "resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY!);

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    Email({
      from: process.env.EMAIL_FROM,
      maxAge: 24 * 60 * 60, // 24 hours
      generateVerificationToken: async () => {
        const token = Math.random().toString(36).slice(2);
        console.log("Generated verification token:", token);
        return token;
      },
      sendVerificationRequest: async ({ identifier: email, url, token }) => {
        console.log("Starting email verification process for:", email);
        console.log("Verification URL:", url);
        try {
          console.log("Sending email via Resend...");
          const { error } = await resend.emails.send({
            from: process.env.EMAIL_FROM!,
            to: email,
            subject: "Sign in to Unimusik",
            html: `
              <div>
                <h1>Welcome to Unimusik!</h1>
                <p>Click the link below to sign in to your account:</p>
                <a href="${url}">Sign in to Unimusik</a>
                <p>If you didn't request this email, you can safely ignore it.</p>
                <p>This link will expire in 24 hours.</p>
              </div>
            `,
          });

          if (error) {
            console.error("Resend error:", error);
            throw new Error("Failed to send verification email");
          }

          console.log(
            "Email sent successfully, creating verification token..."
          );
          // Store the verification token
          await prisma.verificationToken.create({
            data: {
              identifier: email,
              token: token,
              expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
            },
          });
          console.log("Verification token created successfully");
        } catch (error) {
          console.error("Error in sendVerificationRequest:", error);
          throw error;
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/signin",
    error: "/signin",
    verifyRequest: "/signin",
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log("SignIn callback triggered for:", user.email);
      console.log("Account details:", account);

      if (account?.provider === "email") {
        try {
          console.log("Processing email sign in...");
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          if (!existingUser) {
            console.log("Creating new user...");
            const newUser = await prisma.user.create({
              data: {
                name: user.name,
                email: user.email!,
                terms_accepted: false,
              },
            });
            console.log("New user created successfully:", newUser);
          } else {
            console.log("Existing user found:", existingUser);
          }
          return true;
        } catch (error) {
          console.error("Error handling email sign in:", error);
          return false;
        }
      }

      if (account?.provider === "google" || account?.provider === "github") {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          if (!existingUser) {
            await prisma.user.create({
              data: {
                name: user.name,
                email: user.email!,
                picture: user.image,
                terms_accepted: false,
              },
            });
            return true;
          }
        } catch (error) {
          console.error("Error saving user to database:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      console.log("Session callback triggered with token:", token);
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
    async jwt({ token, user }) {
      console.log("JWT callback triggered with user:", user);
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      console.log("Redirect callback triggered:", { url, baseUrl });

      // If the URL is relative, prepend the base URL
      if (url.startsWith("/")) {
        const redirectUrl = `${baseUrl}${url}`;
        console.log("Redirecting to:", redirectUrl);
        return redirectUrl;
      }

      // If the URL is absolute but on the same origin, allow it
      if (new URL(url).origin === baseUrl) {
        console.log("Redirecting to same origin URL:", url);
        return url;
      }

      // Default to the base URL
      console.log("Redirecting to base URL:", baseUrl);
      return baseUrl;
    },
  },
  events: {
    async signIn(message) {
      console.log("SignIn event triggered:", message);
    },
    async signOut(message) {
      console.log("SignOut event triggered:", message);
    },
    async createUser(message) {
      console.log("CreateUser event triggered:", message);
    },
    async linkAccount(message) {
      console.log("LinkAccount event triggered:", message);
    },
    async session(message) {
      console.log("Session event triggered:", message);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
