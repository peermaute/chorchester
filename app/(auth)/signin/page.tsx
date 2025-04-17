"use client";

import { signIn, useSession } from "next-auth/react";
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
import { useState, useEffect, Suspense } from "react";
import { FooterLinks } from "@/app/components/footer-links";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SignInContent() {
  const { data: session, status } = useSession();
  const { hasConsent } = useCookieConsent();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/users";
  const error = searchParams.get("error");
  const verificationRequest = searchParams.get("verificationRequest");

  useEffect(() => {
    if (status === "authenticated") {
      window.location.href = callbackUrl;
    }
  }, [status, callbackUrl]);

  useEffect(() => {
    if (error) {
      toast.error("Fehler bei der Anmeldung. Bitte versuche es erneut.");
    }
    if (verificationRequest) {
      toast.success("Überprüfe deine E-Mails für den Anmeldelink!", {
        duration: 5000,
      });
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
    if (isLoading) return;
    setIsLoading(true);
    try {
      const result = await signIn("email", {
        email,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Fehler beim Senden der E-Mail");
      } else {
        toast.success("Überprüfe deine E-Mails für den Anmeldelink!", {
          duration: 5000,
        });
      }
    } catch (error) {
      toast.error("Fehler beim Senden der E-Mail");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-background py-8">
      <div className="flex-1 flex items-center justify-center w-full px-4 sm:px-6">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="items-center">
              <CardTitle className="text-2xl font-bold">
                Wähle deine Anmeldemethode
              </CardTitle>
              <CardDescription>
                Melde dich mit deinem bevorzugten Konto an
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
                className="w-full mb-6 bg-black hover:bg-black/90"
                onClick={() => handleSignIn("github")}
              >
                Mit GitHub anmelden
              </Button>

              <div className="my-4 flex w-full items-center">
                <div className="flex-1 h-[1px] bg-border" />
                <span className="mx-4 text-sm text-muted-foreground">oder</span>
                <div className="flex-1 h-[1px] bg-border" />
              </div>

              <form onSubmit={handleEmailSignIn} className="w-full space-y-4">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="E-Mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button
                    type="submit"
                    className="w-full bg-white text-black hover:bg-gray-100"
                    disabled={isLoading}
                  >
                    {isLoading ? "Senden..." : "Mit E-Mail anmelden"}
                  </Button>
                </div>
              </form>

              <Link
                href="/terms/full?from=signin"
                className="text-sm text-muted-foreground hover:text-foreground mt-4 block underline-offset-4 hover:underline"
              >
                Datenschutzerklärung
              </Link>

              <div className="scale-75 pt-4">
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
      </div>
      <div className="w-full mt-8">
        <FooterLinks />
      </div>
    </div>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}
