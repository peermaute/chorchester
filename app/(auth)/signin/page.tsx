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
import { useState, useEffect } from "react";
import { FooterLinks } from "@/app/components/footer-links";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";

export default function SignIn() {
  const { hasConsent } = useCookieConsent();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/users";
  const error = searchParams.get("error");
  const verificationRequest = searchParams.get("verificationRequest");

  useEffect(() => {
    if (error) {
      toast.error("Fehler bei der Anmeldung. Bitte versuche es erneut.");
    }
    if (verificationRequest) {
      toast.success("Überprüfe deine E-Mails für den Anmeldelink!");
    }
  }, [error, verificationRequest]);

  const handleSignIn = (provider: string) => {
    if (!hasConsent) {
      toast.error(
        "Bitte akzeptiere die Cookie-Einwilligung, um dich anzumelden"
      );
      return;
    }
    signIn(provider, { callbackUrl });
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasConsent) {
      toast.error(
        "Bitte akzeptiere die Cookie-Einwilligung, um dich anzumelden"
      );
      return;
    }
    setIsLoading(true);
    try {
      await signIn("email", { email, callbackUrl });
      toast.success("Überprüfe deine E-Mails für den Anmeldelink!");
    } catch (error) {
      toast.error("Fehler beim Senden der E-Mail");
    } finally {
      setIsLoading(false);
    }
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
            <form onSubmit={handleEmailSignIn} className="w-full space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="E-Mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Senden..." : "Mit E-Mail anmelden"}
                </Button>
              </div>
            </form>
            <div className="my-4 flex w-full items-center">
              <div className="flex-1 h-[1px] bg-border" />
              <span className="mx-4 text-sm text-muted-foreground">oder</span>
              <div className="flex-1 h-[1px] bg-border" />
            </div>
            <Button
              className="w-full mb-4 bg-red-600 hover:bg-red-700"
              onClick={() => handleSignIn("google")}
            >
              Mit Google anmelden
            </Button>
            <Button
              className="w-full mb-6 bg-black hover:bg-black/90"
              onClick={() => handleSignIn("github")}
            >
              Mit GitHub anmelden
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
