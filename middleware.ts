import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export default withAuth(
  async function middleware(req) {
    const session = req.nextauth.token;

    // Allow access to terms pages without authentication
    if (req.nextUrl.pathname.startsWith("/terms")) {
      return NextResponse.next();
    }

    if (session?.email) {
      try {
        const result = await sql`
          SELECT terms_accepted FROM Users WHERE email = ${session.email}
        `;

        const user = result.rows[0];

        // If user exists and hasn't accepted terms, redirect to terms page
        if (
          user &&
          !user.terms_accepted &&
          !req.nextUrl.pathname.startsWith("/terms")
        ) {
          return NextResponse.redirect(new URL("/terms", req.url));
        }
      } catch (error) {
        console.error("Error checking terms acceptance:", error);
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - root route (/)
     * - signin (sign in page)
     * - register (registration page)
     * - impressum (legal information page)
     * - terms (terms and privacy policy pages)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public|$|signin|register|impressum|terms).*)",
  ],
};
