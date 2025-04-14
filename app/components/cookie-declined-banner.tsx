"use client";

import { useCookieConsent } from "@/app/context/cookie-consent-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export function CookieDeclinedBanner() {
  const { hasConsent, setConsent, hasDeclined, isLoading } = useCookieConsent();
  const router = useRouter();
  const pathname = usePathname();

  // Don't show if consent is given or while loading
  if (hasConsent || isLoading) return null;

  // Only show if cookies have been declined
  if (!hasDeclined) return null;

  const handleGoToLanding = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Card className="mx-4 w-full max-w-md p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Cookies Required</h2>
            <p className="text-sm text-muted-foreground">
              This website requires functional cookies to operate. Without
              accepting cookies, you won&apos;t be able to use any features of
              the website, including signing in.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleGoToLanding}>
              Go to Landing Page
            </Button>
            <Button onClick={() => setConsent(true)}>Accept Cookies</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
