"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import { CookieConsentProvider } from "@/app/context/cookie-consent-context";
import { getCookie } from "cookies-next";

export function Providers({ children }: { children: React.ReactNode }) {
  const initialConsent = getCookie("cookie_consent") === "true" ? true : false;

  return (
    <CookieConsentProvider initialConsent={initialConsent}>
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
