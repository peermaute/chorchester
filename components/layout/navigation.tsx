"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavigationItem } from "@/types/navigation";
import { useNavigation } from "@/lib/context/navigation-context";
import { theme } from "@/lib/config/theme";

interface NavigationProps {
  items: NavigationItem[];
  className?: string;
  variant?: "mobile" | "desktop";
}

export const Navigation = ({
  items,
  className,
  variant = "mobile",
}: NavigationProps) => {
  const router = useRouter();
  const { user, isActive } = useNavigation();

  return (
    <nav
      className={cn(
        "flex items-center",
        variant === "mobile" ? "justify-around" : "justify-end",
        theme.spacing.elements.medium,
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
            isActive(item.path) && "bg-accent text-accent-foreground",
            theme.transitions.default
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
                <span className={cn("ml-2", theme.typography.body.default)}>
                  {item.label}
                </span>
              )}
            </>
          )}
        </Button>
      ))}
    </nav>
  );
};
