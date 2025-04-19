"use client";

import { Navigation } from "./navigation";
import { FooterLinks } from "@/components/ui/footer-links";
import {
  ListIcon,
  MusicIcon,
  UserIcon,
} from "@/components/ui/icons/custom-icons";

const navigationItems = [
  {
    path: "/",
    icon: <ListIcon className="h-5 w-5" />,
    label: "Home",
  },
  {
    path: "/songs",
    icon: <MusicIcon className="h-5 w-5" />,
    label: "Songs",
  },
  {
    path: "/profile",
    icon: <UserIcon className="h-5 w-5" />,
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
