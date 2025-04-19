"use client";

import { Navigation } from "./navigation";
import { FooterLinks } from "./footer-links";

const navigationItems = [
  {
    path: "/",
    icon: "Home",
    label: "Home",
  },
  {
    path: "/songs",
    icon: "Music",
    label: "Songs",
  },
  {
    path: "/profile",
    icon: "User",
    label: "Profile",
  },
];

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
