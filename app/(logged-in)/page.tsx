import { redirect } from "next/navigation";
export default async function Home() {
  const isLoggedIn = true;
  const directory = isLoggedIn ? "/users" : "/welcome";
  redirect(directory);
}
