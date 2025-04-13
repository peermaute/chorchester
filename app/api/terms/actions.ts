"use server";

import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/options";

export async function acceptTerms() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Not authenticated");
  }

  try {
    await sql`
      UPDATE Users 
      SET terms_accepted = true
      WHERE email = ${session.user.email}
    `;
    return { success: true };
  } catch (error) {
    console.error("Error accepting terms:", error);
    throw new Error("Failed to accept terms and conditions");
  }
}
