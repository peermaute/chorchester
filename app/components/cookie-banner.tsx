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

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm text-gray-600">
              We use cookies to enhance your experience. By continuing to visit
              this site you agree to our use of cookies.
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
              Decline
            </Button>
            <Button
              onClick={() => {
                setConsent(true);
              }}
            >
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
