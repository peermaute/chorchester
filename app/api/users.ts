"use server";
import { sql } from "@vercel/postgres";
import { User } from "../types/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const getUsers = async (): Promise<User[]> => {
  try {
    const result = await sql`SELECT * FROM Users;`;
    const users: User[] = result.rows as User[];
    return users;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
};

export const getUser = async (id: string): Promise<User> => {
  // Get the current session
  const session = await getServerSession(authOptions);

  // Check if user is authenticated
  if (!session?.user?.email) {
    throw new Error("Not authenticated");
  }

  try {
    const result = await sql`SELECT * FROM Users WHERE id = ${id};`;
    const users: User[] = result.rows as User[];

    // Check if the requested user exists
    if (users.length === 0) {
      throw new Error("User not found");
    }

    return users[0];
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
};

export const getUserByEmail = async (email: string): Promise<User> => {
  // Get the current session
  const session = await getServerSession(authOptions);

  // Check if user is authenticated
  if (!session?.user?.email) {
    throw new Error("Not authenticated");
  }

  // Check if the authenticated user is trying to access their own data
  if (session.user.email !== email) {
    throw new Error("Not authorized to access this user's data");
  }

  try {
    const result = await sql`SELECT * FROM Users WHERE email = ${email};`;
    const users: User[] = result.rows as User[];

    // Check if the requested user exists
    if (users.length === 0) {
      throw new Error("User not found");
    }

    return users[0];
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
};

export const updateUser = async (
  email: string,
  data: {
    name: string;
    ensemble: string;
    stimmgruppe?: string;
    personal_info?: string;
    picture?: string;
  }
): Promise<User> => {
  // Get the current session
  const session = await getServerSession(authOptions);

  // Check if user is authenticated
  if (!session?.user?.email) {
    throw new Error("Not authenticated");
  }

  // Check if the authenticated user is trying to update their own data
  if (session.user.email !== email) {
    throw new Error("Not authorized to update this user's data");
  }

  try {
    const result = await sql`
      UPDATE Users 
      SET 
        name = ${data.name},
        ensemble = ${data.ensemble},
        stimmgruppe = ${data.stimmgruppe || null},
        personal_info = ${data.personal_info || null},
        picture = ${data.picture || null}
      WHERE email = ${email}
      RETURNING *
    `;
    const users: User[] = result.rows as User[];
    return users[0];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update user");
  }
};

export const getUsersByName = async (substring: string): Promise<User[]> => {
  try {
    const result = await sql`
      SELECT * FROM Users
      WHERE name ILIKE ${"%" + substring + "%"};
    `;
    const users: User[] = result.rows as User[];
    return users;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
};
