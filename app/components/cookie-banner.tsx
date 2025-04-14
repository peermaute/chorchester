"use client";

import { Button } from "@/components/ui/button";
import { useCookieConsent } from "@/app/context/cookie-consent-context";

export function CookieBanner() {
  const { hasConsent, setConsent, hasDeclined, setDeclined } =
    useCookieConsent();

  // Don't show if consent is given or if cookies have been declined
  if (hasConsent === true || hasDeclined) {
    return null;
  }

  // Don't render anything until we know the consent state
  if (hasConsent === null) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Cookies</span>
              <br />
              Diese Website verwendet ausschließlich technisch notwendige
              Cookies, um grundlegende Funktionen bereitzustellen.
              <br />
              Es findet kein Tracking statt und es werden keine Daten zu
              Werbezwecken verwendet.
              <br />
              Bitte stimme der Nutzung dieser Cookies zu.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => {
                setDeclined(true);
                setConsent(false);
              }}
            >
              Ablehnen
            </Button>
            <Button
              onClick={() => {
                setConsent(true);
              }}
            >
              Akzeptieren
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
