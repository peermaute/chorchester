"use client";

import { useCookieConsent } from "@/app/context/cookie-consent-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export function CookieDeclinedBanner() {
  const { hasConsent, setConsent, hasDeclined, isLoading, isPublicPage } =
    useCookieConsent();
  const router = useRouter();
  const pathname = usePathname();

  // Don't show if:
  // - consent is given
  // - still loading
  if (hasConsent || isLoading) return null;

  // On public pages, only show if cookies have been declined
  if (isPublicPage && !hasDeclined) return null;

  // On non-public pages, always show if consent hasn't been given
  if (!isPublicPage && !hasDeclined) {
    // Set declined state to true for non-public pages
    localStorage.setItem("cookieDeclined", "true");
  }

  const handleGoToLanding = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Card className="mx-4 w-full max-w-md p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Cookies erforderlich</h2>
            <p className="text-sm text-muted-foreground">
              Diese Website benötigt Cookies für die grundlegende
              Funktionalität. Ohne Cookies ist die Nutzung der Website nicht
              möglich. Du kannst dich nicht anmelden und keine Funktionen
              nutzen.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleGoToLanding}>
              Zur Startseite
            </Button>
            <Button onClick={() => setConsent(true)}>
              Cookies akzeptieren
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
