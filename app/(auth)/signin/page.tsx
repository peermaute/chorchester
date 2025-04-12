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

export default function SignIn() {
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
            <Button
              className="w-full mb-6"
              onClick={() => signIn("google", { callbackUrl: "/users" })}
            >
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
    </div>
  );
}
