"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ListIcon,
  SearchIcon,
  UserIcon,
  SettingsIcon,
} from "@/components/ui/icons/custom-icons";
import Image from "next/image";
import { User } from "@/app/types/User";

interface NavigationItem {
  path: string;
  icon: React.ReactNode;
  label: string;
}

interface NavigationProps {
  items: NavigationItem[];
  user?: User | null;
  className?: string;
}

export const Navigation = ({ items, user, className }: NavigationProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    return pathname.startsWith(path) && path !== "/";
  };

  return (
    <nav className={cn("flex items-center justify-between", className)}>
      {items.map((item) => (
        <Button
          key={item.path}
          variant="ghost"
          size="icon"
          className={cn(
            "h-10 w-10 rounded-full",
            isActive(item.path) && "bg-accent text-accent-foreground"
          )}
          onClick={() => router.push(item.path)}
        >
          {item.path === "/profile" && user?.picture ? (
            <div className="relative h-6 w-6 rounded-full overflow-hidden">
              <Image
                src={user.picture}
                alt="Profile picture"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            item.icon
          )}
        </Button>
      ))}
    </nav>
  );
};
