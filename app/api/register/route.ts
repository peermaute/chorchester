import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(request: Request) {
  try {
    const { name, email, password, ensemble, stimmgruppe } =
      await request.json();

    // Check if user already exists
    const existingUser = await sql`
      SELECT * FROM Users WHERE email = ${email}
    `;

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Create new user
    const result = await sql`
      INSERT INTO Users (name, email, password, ensemble, stimmgruppe)
      VALUES (${name}, ${email}, ${password}, ${ensemble}, ${stimmgruppe})
      RETURNING id, name, email, ensemble, stimmgruppe
    `;

    return NextResponse.json({ user: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
