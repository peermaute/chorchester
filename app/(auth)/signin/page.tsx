"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import unimusikLogo from "@/public/unimusik-logo.jpeg";
import { useCookieConsent } from "@/app/context/cookie-consent-context";
import { toast } from "sonner";
import { useState } from "react";
import { FooterLinks } from "@/app/components/footer-links";

export default function SignIn() {
  const { hasConsent } = useCookieConsent();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleSignIn = (provider: string) => {
    if (!hasConsent) {
      toast.error(
        "Bitte akzeptiere die Cookie-Einwilligung, um dich anzumelden"
      );
      return;
    }
    signIn(provider, { callbackUrl: "/users" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md px-4">
        <Card>
          <CardHeader className="items-center">
            <CardTitle className="text-2xl font-bold">Anmelden</CardTitle>
            <CardDescription className="text-base">
              Wähle deine Anmeldemethode
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Button
              className="w-full mb-4 bg-red-600 hover:bg-red-700"
              onClick={() => handleSignIn("google")}
            >
              Mit Google anmelden
            </Button>
            <Button
              className="w-full mb-4 bg-black hover:bg-black/90"
              onClick={() => handleSignIn("github")}
            >
              Mit GitHub anmelden
            </Button>
            <Button
              className="w-full mb-6 bg-[#0077B5] hover:bg-[#0077B5]/90"
              onClick={() => handleSignIn("linkedin")}
            >
              Mit LinkedIn anmelden
            </Button>
            <div className="scale-75">
              <Image
                src={unimusikLogo}
                alt={"Unimusik Logo"}
                width={150}
                height={150}
                priority={true}
                loading="eager"
                quality={100}
                className={`transition-opacity duration-300 ${
                  isImageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoadingComplete={() => setIsImageLoaded(true)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <FooterLinks />
    </div>
  );
}
