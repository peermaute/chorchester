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
  <div className="w-full max-w-[350px] md:max-w-[400px] lg:max-w-[450px] mx-auto space-y-4">
    <div className="rounded-lg bg-card shadow-sm h-[400px] md:h-[400px] lg:h-[450px] overflow-hidden">
      <Skeleton className="h-full w-full" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10 bg-gradient-to-t from-black/80 to-transparent">
        <Skeleton className="h-8 w-48 mb-2" />
      </div>
    </div>
    <div className="space-y-4 md:space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-5 h-5 md:w-6 md:h-6">
            <GroupIcon currentColor="#4E47C6" />
          </div>
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="h-6 w-32" />
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-5 h-5 md:w-6 md:h-6">
            <MusicIcon currentColor="#4E47C6" />
          </div>
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-6 w-32" />
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-5 h-5 md:w-6 md:h-6">
            <InfoIcon currentColor="#4E47C6" />
          </div>
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  </div>
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
    <div className="flex justify-center mt-8 p-4">
      <div className="w-full max-w-[350px] md:max-w-[400px] lg:max-w-[450px] mx-auto space-y-4">
        {isLoading ? (
          <UserDetailSkeleton />
        ) : user ? (
          <>
            <Card className="w-full border-0 shadow-none rounded-xl overflow-hidden">
              <CardContent className="p-0 h-[400px] md:h-[400px] lg:h-[450px] relative">
                <div className="relative h-full w-full">
                  <Image
                    src={user?.picture ?? "/person.svg"}
                    alt={user?.name ?? "Profile Picture"}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10 bg-gradient-to-t from-black/80 to-transparent">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                      {user?.name}
                    </h2>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="space-y-4 md:space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 md:w-6 md:h-6">
                    <GroupIcon currentColor="#4E47C6" />
                  </div>
                  <h2 className="text-lg md:text-xl">Ensemble</h2>
                </div>
                <div className="text-lg md:text-xl text-muted-foreground">
                  {user?.ensemble}
                </div>
              </div>
              {(user?.ensemble === "Kammerchor" ||
                user?.ensemble === "Kammerchor & Orchester") && (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 md:w-6 md:h-6">
                      <MusicIcon currentColor="#4E47C6" />
                    </div>
                    <h2 className="text-lg md:text-xl">Stimmgruppe</h2>
                  </div>
                  <div className="text-lg md:text-xl text-muted-foreground">
                    {user?.stimmgruppe}
                  </div>
                </div>
              )}
              {(user?.ensemble === "Orchester" ||
                user?.ensemble === "Kammerchor & Orchester") && (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 md:w-6 md:h-6">
                      <MusicIcon currentColor="#4E47C6" />
                    </div>
                    <h2 className="text-lg md:text-xl">Instrumentengruppe</h2>
                  </div>
                  <div className="text-lg md:text-xl text-muted-foreground">
                    {user?.instrumentengruppe}
                  </div>
                </div>
              )}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 md:w-6 md:h-6">
                    <InfoIcon currentColor="#4E47C6" />
                  </div>
                  <h2 className="text-lg md:text-xl">Persönliches</h2>
                </div>
                <div className="text-lg md:text-xl text-muted-foreground">
                  {user?.personal_info}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-muted-foreground">User not found</div>
        )}
      </div>
    </div>
  );
}
