"use client";

import { Header } from "./header";
import { Footer } from "./footer";
import { theme } from "@/lib/config/theme";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main
        className={`flex-1 ${theme.colors.background.primary} ${className}`}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};
