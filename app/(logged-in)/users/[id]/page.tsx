"use client";
import { getUser } from "@/app/api/users";
import { User } from "@/app/types/User";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser(params.id);
      setUser(user);
    };
    fetchUser();
  }, []);
  return (
    <div className="flex justify-center items-center">
      {user ? (
        <div>
          <div className="text-2xl">{user?.name}</div>
          <Image
            src={user?.picture ?? "/person.svg"}
            alt={"Profile Picture"}
            width={65}
            height={65}
            className="rounded-xl shadow-md"
          />
          <div className="text-2xl">{user?.personal_info}</div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
