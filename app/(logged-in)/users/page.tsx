import { sql } from "@vercel/postgres";
import UserTabs from "./UserTabs";
import { User } from "@/app/types/User";

export default async function UsersPage() {
  const { rows } = await sql`SELECT * FROM Users;`;
  const users = rows as User[];

  return <UserTabs users={users} />;
}
