"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import { CookieConsentProvider } from "@/app/context/cookie-consent-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CookieConsentProvider>
      <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </SessionProvider>
    </CookieConsentProvider>
  );
}
