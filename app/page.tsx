import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import unimusikLogo from "@/public/unimusik-logo.jpeg";

export default async function Home() {
  const session = await getServerSession();

  if (session) {
    redirect("/users");
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Willkommen bei Chorchester</CardTitle>
          <CardDescription>
            <p>Viele Leute, viele Namen, viele Gesichter...</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            Je mehr dabei sind, desto besser!
          </p>
          <Link href="/signin" className="block">
            <Button className="w-full">Sign In</Button>
          </Link>
          <div className="flex justify-center pt-4">
            <div className="scale-75">
              <Image
                src={unimusikLogo}
                alt={"Unimusik Logo"}
                width={150}
                height={150}
                priority={true}
              />
            </div>
          </div>
        </CardContent>
      </Card>
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
