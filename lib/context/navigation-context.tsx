"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { User } from "@/app/types/User";

interface NavigationContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isActive: (path: string) => boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    return pathname.startsWith(path) && path !== "/";
  };

  return (
    <NavigationContext.Provider value={{ user, setUser, isActive }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};
