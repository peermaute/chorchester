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
import { GithubIcon, FileText, Mail } from "lucide-react";

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
            <Button className="w-full">Anmelden</Button>
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
