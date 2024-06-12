"use client";
import { User } from "@/app/types/User";
import Image from "next/image";
import { useRouter } from "next/navigation";

const UserCard = ({ user }: { user: User }) => {
  const router = useRouter();
  return (
    <div
      className="rounded-md bg-zinc-50 mb-4 p-4 shadow-md w-3/4 xl:w-1/3 2xl:w-1/5 flex hover:cursor-pointer"
      key={user.id}
      onClick={() => router.push(`users/${user.id}`)}
    >
      <Image
        src={user.picture ?? "/person.svg"}
        alt={"Profile Picture"}
        width={65}
        height={65}
        className="rounded-xl shadow-md"
      />
      <div className="flex flex-col ml-8 lg:ml-20 justify-center">
        <p className="text-lg font-semibold">{user.name}</p>
        <p className="text-gray-500 text-sm">{user.ensemble}</p>
      </div>
    </div>
  );
};

export default UserCard;
