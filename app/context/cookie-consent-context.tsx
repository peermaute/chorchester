"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { getCookie, setCookie, deleteCookie } from "@/app/lib/cookies";

interface CookieConsentContextType {
  hasConsent: boolean;
  setConsent: (consent: boolean) => void;
  isLoading: boolean;
}

const CookieConsentContext = createContext<CookieConsentContextType>({
  hasConsent: false,
  setConsent: () => {},
  isLoading: true,
});

const CONSENT_COOKIE_NAME = "cookie_consent";
const CONSENT_COOKIE_EXPIRY_DAYS = 365; // 1 year

export function CookieConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hasConsent, setHasConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing consent cookie
    const consent = getCookie(CONSENT_COOKIE_NAME);
    if (consent === "true") {
      setHasConsent(true);
    }
    setIsLoading(false);
  }, []);

  const setConsent = (consent: boolean) => {
    setHasConsent(consent);
    if (consent) {
      setCookie(CONSENT_COOKIE_NAME, "true", CONSENT_COOKIE_EXPIRY_DAYS);
    } else {
      deleteCookie(CONSENT_COOKIE_NAME);
      signOut({ callbackUrl: "/" });
    }
  };

  return (
    <CookieConsentContext.Provider
      value={{ hasConsent, setConsent, isLoading }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export const useCookieConsent = () => useContext(CookieConsentContext);
