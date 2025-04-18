"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUsers } from "@/app/api/users";
import { User } from "@/app/types/User";
import { Skeleton } from "@/app/components/ui/skeleton";
import UserCard from "@/app/components/UserCard";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const UserCardSkeleton = () => (
  <div className="w-full max-w-[400px] mx-auto md:max-w-none">
    <div className="rounded-lg bg-card shadow-sm h-[350px] overflow-hidden">
      <Skeleton className="h-full w-full" />
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-5 w-32" />
      </div>
    </div>
  </div>
);

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 9;
  const observer = useRef<IntersectionObserver>();
  const lastUserElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const { users: fetchedUsers, total } = await getUsers(page, limit);
        setUsers((prevUsers) => {
          const newUsers = fetchedUsers.filter(
            (newUser) =>
              !prevUsers.some((prevUser) => prevUser.id === newUser.id)
          );
          const updatedUsers = [...prevUsers, ...newUsers];
          setHasMore(updatedUsers.length < total);
          return updatedUsers;
        });
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [page, limit]);

  if (page === 1 && isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(limit)].map((_, i) => (
            <UserCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user, index) => (
          <div
            key={user.id}
            ref={index === users.length - 1 ? lastUserElementRef : undefined}
          >
            <UserCard user={user} className="h-[350px]" />
          </div>
        ))}
        {isLoading && (
          <div
            className={cn(
              "animate-in fade-in-0 duration-300",
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 col-span-full"
            )}
          >
            {[...Array(limit)].map((_, i) => (
              <UserCardSkeleton key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
