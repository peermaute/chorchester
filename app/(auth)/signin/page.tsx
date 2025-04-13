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
import unimusikLogo from "@/public/unimusik-logo.png";
import { useCookieConsent } from "@/app/context/cookie-consent-context";
import { toast } from "sonner";
import Link from "next/link";

export default function SignIn() {
  const { hasConsent } = useCookieConsent();

  const handleSignIn = () => {
    if (!hasConsent) {
      toast.error("Please accept the cookie consent to sign in");
      return;
    }
    signIn("google", { callbackUrl: "/users" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md px-4">
        <Card>
          <CardHeader className="items-center">
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <CardDescription className="text-base">
              Choose your sign in method
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Button className="w-full mb-6" onClick={handleSignIn}>
              Sign in with Google
            </Button>
            <div className="scale-75">
              <Image
                src={unimusikLogo}
                alt={"Unimusik Logo"}
                width={150}
                height={150}
                priority={true}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="absolute bottom-4 w-full text-center">
        <Link
          href="/impressum"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Impressum
        </Link>
      </div>
    </div>
  );
}
