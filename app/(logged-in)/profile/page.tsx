import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfileForm from "./ProfileForm";
import { User } from "@/app/types/User";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return <div>Not authenticated</div>;
  }

  const { rows } = await sql`
    SELECT * FROM Users 
    WHERE email = ${session.user.email}
  `;

  const user = rows[0] as User;

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="flex items-center gap-4 pl-6">
          <div className="h-12 w-12 rounded-full overflow-hidden">
            {user.picture ? (
              <img
                src={user.picture}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No image</span>
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        <ProfileForm user={user} />
      </div>
    </div>
  );
}
