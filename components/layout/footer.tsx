"use client";

import { Navigation } from "./navigation";
import { FooterLinks } from "@/components/ui/footer-links";
import { navigationItems } from "@/lib/config/navigation";
import { theme } from "@/lib/config/theme";

export const Footer = () => {
  return (
    <footer
      className={`w-full ${theme.colors.background.primary} border-t ${theme.colors.border.default}`}
    >
      <div
        className={`${theme.spacing.container.maxWidth} mx-auto ${theme.spacing.container.padding}`}
      >
        <Navigation
          items={navigationItems}
          variant="mobile"
          className="flex md:hidden"
        />
        <FooterLinks />
      </div>
    </footer>
  );
};
