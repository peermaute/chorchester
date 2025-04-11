"use client";
import { ListIcon } from "./list-icon";
import { SearchIcon } from "./search-icon";
import { UserIcon } from "./user-icon";
import { SettingsIcon } from "./icons/settings-icon";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();

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
          <UserIcon
            currentColor={
              isActive("/profile")
                ? "hsl(var(--accent-foreground))"
                : "hsl(var(--foreground))"
            }
          />
        </Button>
      </nav>
    </footer>
  );
};

export default Footer;
