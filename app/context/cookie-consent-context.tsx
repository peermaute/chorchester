"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { usePathname } from "next/navigation";

interface CookieConsentContextType {
  hasConsent: boolean | null;
  setConsent: (consent: boolean) => void;
  hasDeclined: boolean;
  setDeclined: (declined: boolean) => void;
  isLoading: boolean;
  isPublicPage: boolean;
}

const CookieConsentContext = createContext<CookieConsentContextType>({
  hasConsent: null,
  setConsent: () => {},
  hasDeclined: false,
  setDeclined: () => {},
  isLoading: true,
  isPublicPage: false,
});

const CONSENT_COOKIE_NAME = "cookie_consent";
const CONSENT_COOKIE_EXPIRY_DAYS = 365; // 1 year

const PUBLIC_PAGES = ["/", "/impressum", "/signin"];

export function CookieConsentProvider({
  children,
  initialConsent,
}: {
  children: React.ReactNode;
  initialConsent?: boolean | null;
}) {
  const [hasConsent, setHasConsent] = useState<boolean | null>(
    initialConsent ?? null
  );
  const [hasDeclined, setHasDeclined] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  const isPublicPage = PUBLIC_PAGES.includes(pathname);

  useEffect(() => {
    // Check for existing consent cookie
    const consent = getCookie(CONSENT_COOKIE_NAME);
    if (consent === "true") {
      setHasConsent(true);
    } else if (consent === "false") {
      setHasConsent(false);
    }
    setIsLoading(false);
  }, []);

  const setConsent = (consent: boolean) => {
    setHasConsent(consent);
    if (consent) {
      setCookie(CONSENT_COOKIE_NAME, "true", {
        maxAge: CONSENT_COOKIE_EXPIRY_DAYS * 24 * 60 * 60,
        path: "/",
      });
    } else {
      deleteCookie(CONSENT_COOKIE_NAME, { path: "/" });
      // Only sign out and redirect if we're not on a public page
      if (!isPublicPage) {
        signOut({ callbackUrl: "/" });
      }
    }
  };

  const setDeclined = (declined: boolean) => {
    setHasDeclined(declined);
    localStorage.setItem("cookieDeclined", declined.toString());
  };

  return (
    <CookieConsentContext.Provider
      value={{
        hasConsent,
        setConsent,
        hasDeclined,
        setDeclined,
        isLoading,
        isPublicPage,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export const useCookieConsent = () => useContext(CookieConsentContext);
