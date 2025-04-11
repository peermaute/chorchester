"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function updateProfile(
  id: string,
  data: {
    name: string;
    ensemble: string;
    stimmgruppe: string;
    personal_info: string;
  }
) {
  try {
    await sql`
      UPDATE Users 
      SET name = ${data.name},
          ensemble = ${data.ensemble},
          stimmgruppe = ${data.stimmgruppe},
          personal_info = ${data.personal_info}
      WHERE id = ${id}
    `;
    revalidatePath("/profile");
    return { success: true };
  } catch (error) {
    console.error("Failed to update profile:", error);
    return { success: false, error: "Failed to update profile" };
  }
}
