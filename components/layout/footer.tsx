"use client";

import { Navigation } from "./navigation";
import { FooterLinks } from "@/components/ui/footer-links";
import { navigationItems } from "@/lib/config/navigation";

export const Footer = () => {
  return (
    <footer className="w-full bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Navigation items={navigationItems} className="flex md:hidden" />
        <FooterLinks />
      </div>
    </footer>
  );
};
