import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Email from "next-auth/providers/email";
import { DefaultSession, NextAuthOptions } from "next-auth";
import { sql } from "@vercel/postgres";
import { Resend } from "resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import LinkedIn from "next-auth/providers/linkedin";

const prisma = new PrismaClient();
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

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
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      maxAge: 24 * 60 * 60, // 24 hours
      sendVerificationRequest: async ({ identifier: email, url }) => {
        if (!resend) {
          console.error("Resend API key is not configured");
          throw new Error("Email service is not configured");
        }

        try {
          const { error } = await resend.emails.send({
            from: process.env.EMAIL_FROM!,
            to: email,
            subject: "Anmeldung bei Chorchester",
            html: `
              <div>
                <h1>Willkommen bei Chorchester!</h1>
                <p>Klicke auf den Link unten, um dich bei deinem Konto anzumelden:</p>
                <a href="${url}">Bei Chorchester anmelden</a>
                <p>Falls du diese E-Mail nicht angefordert hast, kannst du sie ignorieren.</p>
                <p>Dieser Link ist 24 Stunden gültig.</p>
              </div>
            `,
          });

          if (error) {
            console.error("Failed to send verification email:", error);
            throw new Error("Failed to send verification email");
          }
        } catch (error) {
          console.error("Error in email verification process:", error);
          throw error;
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture?.replace("s96-c", "s400-c"), // Use higher resolution version
        };
      },
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/signin",
    error: "/signin",
    verifyRequest: "/signin",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "email") {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
            include: { accounts: true },
          });

          if (!existingUser) {
            await prisma.user.create({
              data: {
                name: user.name,
                email: user.email!,
                terms_accepted: false,
              },
            });
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
            include: { accounts: true },
          });

          if (existingUser) {
            // If the user exists but doesn't have this OAuth account linked, link it
            if (
              !existingUser.accounts.some(
                (acc: { provider: string }) => acc.provider === account.provider
              )
            ) {
              await prisma.account.create({
                data: {
                  userId: existingUser.id,
                  type: account.type,
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  access_token: account.access_token,
                  expires_at: account.expires_at,
                  token_type: account.token_type,
                  scope: account.scope,
                  id_token: account.id_token,
                },
              });
            }
            return true;
          }

          // If no user exists, create a new one
          const newUser = await prisma.user.create({
            data: {
              name: user.name,
              email: user.email!,
              picture: user.image,
              terms_accepted: false,
            },
          });

          // Create the OAuth account link
          await prisma.account.create({
            data: {
              userId: newUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
            },
          });

          return true;
        } catch (error) {
          console.error("Error handling OAuth sign in:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },
  events: {
    async signIn() {},
    async signOut() {},
    async createUser() {},
    async linkAccount() {},
    async session() {},
  },
  secret: process.env.NEXTAUTH_SECRET,
};
