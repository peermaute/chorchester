"use client";

import { useCookieConsent } from "@/app/context/cookie-consent-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function CookieBanner() {
  const { hasConsent, setConsent, isLoading } = useCookieConsent();

  if (hasConsent || isLoading) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="mx-auto max-w-2xl p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Cookie Consent</h2>
            <p className="text-sm text-muted-foreground">
              We use functional cookies to enable essential features like
              authentication and session management. These cookies are necessary
              for the website to function properly. We do not collect any
              additional user data or use tracking cookies.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setConsent(false)}>
              Decline
            </Button>
            <Button onClick={() => setConsent(true)}>Accept</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
