"use client";
import { useEffect, useState, useRef } from "react";
import { getUsers } from "@/app/api/users";
import { User } from "@/app/types/User";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Skeleton } from "@/app/components/ui/skeleton";
import { cn } from "@/lib/utils";

const UserCardSkeleton = () => (
  <Card className="w-[60vh] aspect-[3/4] border-0 shadow-none rounded-xl">
    <CardContent className="p-0 h-full">
      <Skeleton className="h-full w-full rounded-xl" />
    </CardContent>
  </Card>
);

export default function UserCardsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentScrollIndex, setCurrentScrollIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [touchOffset, setTouchOffset] = useState(0);

  // Disable overscroll behavior
  useEffect(() => {
    document.body.style.overscrollBehavior = "none";
    return () => {
      document.body.style.overscrollBehavior = "";
    };
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        // Sort users alphabetically by name
        const sortedUsers = fetchedUsers.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startY: number;
    let currentY: number;
    let isScrolling = false;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      currentY = startY;
      isScrolling = true;
      setTouchOffset(0);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isScrolling) return;
      currentY = e.touches[0].clientY;
      const diff = currentY - startY;
      setTouchOffset(diff);
    };

    const handleTouchEnd = () => {
      if (!isScrolling) return;
      isScrolling = false;

      const diff = currentY - startY;
      const threshold = 100; // Minimum distance to trigger a scroll

      if (Math.abs(diff) > threshold) {
        if (diff > 0 && currentScrollIndex > 0) {
          // Swipe down - go to previous user
          setCurrentScrollIndex((prev) => prev - 1);
        } else if (diff < 0 && currentScrollIndex < users.length - 1) {
          // Swipe up - go to next user
          setCurrentScrollIndex((prev) => prev + 1);
        }
      }

      // Reset touch offset with a smooth transition
      setTouchOffset(0);
    };

    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove);
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentScrollIndex, users.length]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <UserCardSkeleton />
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <p className="text-muted-foreground">No users found</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <div
        ref={containerRef}
        className="relative w-[60vh] aspect-[3/4] overflow-hidden"
      >
        {users.map((user, index) => (
          <div
            key={user.id}
            className={cn(
              "absolute inset-0 transition-all duration-300 ease-out",
              "transform-gpu will-change-transform",
              index === currentScrollIndex
                ? "translate-y-0"
                : index < currentScrollIndex
                  ? "-translate-y-full"
                  : "translate-y-full"
            )}
            style={{
              transform:
                index === currentScrollIndex
                  ? `translateY(${touchOffset}px)`
                  : undefined,
              opacity:
                index === currentScrollIndex
                  ? 1
                  : Math.abs(index - currentScrollIndex) === 1
                    ? 0.5
                    : 0,
              transition: isScrolling
                ? "none"
                : "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <Card className="w-full h-full border-0 shadow-none rounded-xl">
              <CardContent className="p-0 h-full relative">
                <div className="relative h-full w-full rounded-xl overflow-hidden">
                  <Image
                    src={user.picture ?? "/person.svg"}
                    alt={user.name}
                    fill
                    className="object-cover"
                    priority={index === currentScrollIndex}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {user.name}
                    </h2>
                    <p className="text-white/80">{user.ensemble}</p>
                    {user.stimmgruppe && (
                      <p className="text-white/80">{user.stimmgruppe}</p>
                    )}
                    {user.instrumentengruppe && (
                      <p className="text-white/80">{user.instrumentengruppe}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
