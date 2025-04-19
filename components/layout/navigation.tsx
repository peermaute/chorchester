"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavigationItem } from "@/types/navigation";
import { User } from "@/app/types/User";

interface NavigationProps {
  items: NavigationItem[];
  user?: User | null;
  className?: string;
  variant?: "mobile" | "desktop";
}

export const Navigation = ({
  items,
  user,
  className,
  variant = "mobile",
}: NavigationProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    return pathname.startsWith(path) && path !== "/";
  };

  return (
    <nav
      className={cn(
        "flex items-center gap-4",
        variant === "mobile" ? "justify-around" : "justify-end",
        className
      )}
    >
      {items.map((item) => (
        <Button
          key={item.path}
          variant="ghost"
          size={variant === "mobile" ? "icon" : "default"}
          className={cn(
            variant === "mobile" ? "h-10 w-10 rounded-full" : "h-9 px-4",
            isActive(item.path) && "bg-accent text-accent-foreground"
          )}
          onClick={() => router.push(item.path)}
        >
          {item.path === "/profile" && user?.picture ? (
            <div className="relative h-6 w-6 rounded-full overflow-hidden">
              <img
                src={user.picture}
                alt="Profile picture"
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <>
              {item.icon}
              {variant === "desktop" && (
                <span className="ml-2">{item.label}</span>
              )}
            </>
          )}
        </Button>
      ))}
    </nav>
  );
};
