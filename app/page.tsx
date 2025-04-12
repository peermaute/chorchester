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

export default async function Home() {
  const session = await getServerSession();

  if (session) {
    redirect("/users");
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Chorchester</CardTitle>
          <CardDescription>Your choir and orchestra companion</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            Don't wait for tomorrow - join today
          </p>
          <Link href="/signin" className="block">
            <Button className="w-full">Sign In</Button>
          </Link>
          <div className="flex justify-center pt-4">
            <div className="scale-75">
              <Image
                src={"/unimusik-logo.png"}
                alt={"Unimusik Logo"}
                width={150}
                height={150}
                priority={true}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
