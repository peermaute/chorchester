"use server";
import { sql } from "@vercel/postgres";
import { User } from "../types/User";

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
  try {
    const result = await sql`SELECT * FROM Users WHERE id = ${id};`;
    const users: User[] = result.rows as User[];
    return users[0];
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
};
