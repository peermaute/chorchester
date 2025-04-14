"use client";
import { getUser } from "@/app/api/users";
import { GroupIcon } from "@/app/components/group-icon";
import { InfoIcon } from "@/app/components/info-icon";
import { MusicIcon } from "@/app/components/music-icon";
import { User } from "@/app/types/User";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";
import Image from "next/image";
import { useEffect, useState } from "react";

const UserDetailSkeleton = () => (
  <Card className="w-full border-0 shadow-none">
    <CardContent className="pt-6 *:mb-6">
      <div className="flex justify-center">
        <Skeleton className="h-12 w-48" />
      </div>
      <div className="flex justify-center">
        <Skeleton className="h-[200px] w-[200px] rounded-full" />
      </div>
      <div>
        <div className="flex items-center mb-1">
          <GroupIcon currentColor="#4E47C6" />
          <Skeleton className="h-6 w-24 ml-2" />
        </div>
        <Skeleton className="h-6 w-32" />
      </div>
      <div>
        <div className="flex items-center mb-1">
          <MusicIcon currentColor="#4E47C6" />
          <Skeleton className="h-6 w-32 ml-2" />
        </div>
        <Skeleton className="h-6 w-40" />
      </div>
      <div>
        <div className="flex items-center mb-1">
          <InfoIcon currentColor="#4E47C6" />
          <Skeleton className="h-6 w-32 ml-2" />
        </div>
        <Skeleton className="h-24 w-full" />
      </div>
    </CardContent>
  </Card>
);

export default function Page({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(params.id);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [params.id]);

  return (
    <div className="flex justify-center">
      <div className="flex justify-center items-center w-3/4 lg:w-1/4">
        {isLoading ? (
          <UserDetailSkeleton />
        ) : user ? (
          <Card className="w-full border-0 shadow-none">
            <CardContent className="pt-6 *:mb-6">
              <div className="text-3xl text-center">{user?.name}</div>
              <div className="flex justify-center">
                <div className="relative w-48 h-48 rounded-full overflow-hidden">
                  <Image
                    src={user?.picture ?? "/person.svg"}
                    alt={"Profile Picture"}
                    fill
                    className="object-cover"
                  />
                </div>
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
                  <h2 className="text-lg ml-2">
                    {user?.ensemble === "Orchester"
                      ? "Instrumentengruppe"
                      : "Stimmgruppe"}
                  </h2>
                </div>
                <div className="text-lg text-gray-500">{user?.stimmgruppe}</div>
              </div>
              <div>
                <div className="flex items-center mb-1">
                  <InfoIcon currentColor="#4E47C6" />
                  <h2 className="text-lg ml-2">Persönliches</h2>
                </div>
                <div className="text-lg text-gray-500">
                  {user?.personal_info}
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <p className="text-muted-foreground">User not found</p>
        )}
      </div>
    </div>
  );
}
