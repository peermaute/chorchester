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
import Link from "next/link";
import { useState } from "react";
import { FileText, Mail, GithubIcon } from "lucide-react";

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
      <div className="absolute bottom-4 w-full text-center">
        <div className="flex justify-center gap-8">
          <Link
            href="/impressum"
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-muted/50 transition-colors"
          >
            <FileText className="h-4 w-4" />
            Impressum
          </Link>
          <Link
            href="mailto:peermaute@gmail.com"
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-muted/50 transition-colors"
          >
            <Mail className="h-4 w-4" />
            Support
          </Link>
          <Link
            href="https://github.com/peermaute/unimusik"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-muted/50 transition-colors"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}
