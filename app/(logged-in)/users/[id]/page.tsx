"use client";
import { getUser } from "@/app/api/users";
import { GroupIcon } from "@/app/components/group-icon";
import { InfoIcon } from "@/app/components/info-icon";
import { MusicIcon } from "@/app/components/music-icon";
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
    <div className="flex justify-center">
      <div className="flex justify-center items-center w-3/4 lg:w-1/4">
        {user ? (
          <div className="*:mb-6">
            <div className="text-3xl text-center">{user?.name}</div>
            <div className="flex justify-center">
              <Image
                src={user?.picture ?? "/person.svg"}
                alt={"Profile Picture"}
                width={200}
                height={200}
                className="rounded-xl shadow-md"
              />
            </div>
            <div>
              <div className="flex items-center mb-1">
                <GroupIcon currentColor="#4E47C6" />
                <h2 className="text-lg ml-2">Ensemble</h2>
              </div>
              <div className="text-lg text-gray-500">{user?.ensemble}</div>
            </div>
            <div>
              <div className="flex items-center mb-1">
                <MusicIcon currentColor="#4E47C6" />
                <h2 className="text-lg ml-2">Stimmgruppe</h2>
              </div>
              <div className="text-lg text-gray-500">{user?.stimmgruppe}</div>
            </div>
            <div>
              <div className="flex items-center mb-1">
                <InfoIcon currentColor="#4E47C6" />
                <h2 className="text-lg ml-2">Personal Info</h2>
              </div>
              <div className="text-lg text-gray-500">{user?.personal_info}</div>
            </div>
          </div>
        ) : (
          <p className="text-gray-400">Loading...</p>
        )}
      </div>
    </div>
  );
}
