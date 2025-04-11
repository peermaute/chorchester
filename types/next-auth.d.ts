import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    ensemble: string;
    stimmgruppe: string;
  }

  interface Session {
    user: User & {
      id: string;
      ensemble: string;
      stimmgruppe: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    ensemble: string;
    stimmgruppe: string;
  }
}
