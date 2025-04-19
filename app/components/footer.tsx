"use client";
import {
  ListIcon,
  SearchIcon,
  UserIcon,
  SettingsIcon,
} from "@/components/ui/icons/custom-icons";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getUserByEmail } from "@/app/api/users";
import { User } from "@/app/types/User";

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      if (session?.user?.email) {
        try {
          const userData = await getUserByEmail(session.user.email);
          setUser(userData);
        } catch (error) {
          console.error("Error loading user data:", error);
        }
      }
    };

    loadUserData();
  }, [session]);

  const isActive = (path: string) => {
    // Handle root path
    if (path === "/" && pathname === "/") return true;
    // Handle nested paths (e.g., /users/123 should match /users)
    return pathname.startsWith(path) && path !== "/";
  };

  return (
    <footer className="w-full">
      <nav className="flex items-center justify-between px-6 py-2">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-10 w-10 rounded-full",
            isActive("/users") && "bg-accent text-accent-foreground"
          )}
          onClick={() => router.push("/users")}
        >
          <ListIcon
            currentColor={
              isActive("/users")
                ? "hsl(var(--accent-foreground))"
                : "hsl(var(--foreground))"
            }
          />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-10 w-10 rounded-full",
            isActive("/search") && "bg-accent text-accent-foreground"
          )}
          onClick={() => router.push("/search")}
        >
          <SearchIcon
            currentColor={
              isActive("/search")
                ? "hsl(var(--accent-foreground))"
                : "hsl(var(--foreground))"
            }
          />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-10 w-10 rounded-full",
            isActive("/settings") && "bg-accent text-accent-foreground"
          )}
          onClick={() => router.push("/settings")}
        >
          <SettingsIcon
            currentColor={
              isActive("/settings")
                ? "hsl(var(--accent-foreground))"
                : "hsl(var(--foreground))"
            }
          />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-10 w-10 rounded-full",
            isActive("/profile") && "bg-accent text-accent-foreground"
          )}
          onClick={() => router.push("/profile")}
        >
          {user?.picture ? (
            <div className="relative h-6 w-6 rounded-full overflow-hidden">
              <Image
                src={user.picture}
                alt="Profile picture"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <UserIcon
              currentColor={
                isActive("/profile")
                  ? "hsl(var(--accent-foreground))"
                  : "hsl(var(--foreground))"
              }
            />
          )}
        </Button>
      </nav>
    </footer>
  );
};

export default Footer;
