"use client";

import Link from "next/link";

const footerLinks = [
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/privacy",
    label: "Privacy Policy",
  },
  {
    href: "/terms",
    label: "Terms of Service",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

export const FooterLinks = () => {
  return (
    <div className="py-6 md:py-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Chorchester. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
