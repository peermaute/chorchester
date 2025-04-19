"use client";

import { Navigation } from "./navigation";
import { FooterLinks } from "@/components/ui/footer-links";
import { navigationItems } from "@/lib/config/navigation";
import { layoutConfig } from "@/lib/config/layout";

export const Footer = () => {
  return (
    <footer
      className={`w-full bg-background border-t ${layoutConfig.border.default}`}
    >
      <div
        className={`${layoutConfig.maxWidth} mx-auto ${layoutConfig.padding.x}`}
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
