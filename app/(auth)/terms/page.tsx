"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { acceptTerms } from "@/app/api/terms/actions";
import Link from "next/link";
import { FileText, ChevronRight } from "lucide-react";

export default function TermsPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleAcceptTerms = async () => {
    if (!session?.user?.email) return;

    try {
      await acceptTerms();
      toast.success("Datenschutzerklärung akzeptiert!");
      router.push("/users");
    } catch (error) {
      console.error("Error accepting terms:", error);
      toast.error("Fehler beim Akzeptieren der Datenschutzerklärung");
    }
  };

  const handleDeclineTerms = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Datenschutzerklärung
            </CardTitle>
            <CardDescription>
              Bitte akzeptieren Sie unsere Datenschutzerklärung, um
              fortzufahren.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose prose-sm max-w-none">
              <p>
                Um diese Website nutzen zu können, ist Ihre Zustimmung zur
                Verarbeitung personenbezogener Daten gemäß der DSGVO
                erforderlich. Details dazu finden Sie in unserer
                Datenschutzerklärung.
              </p>

              <div className="mt-4 p-4 border rounded-lg bg-muted/50">
                <Link
                  href="/terms/full"
                  className="flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">
                      Vollständige Datenschutzerklärung lesen
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-2">
              <Button
                variant="outline"
                onClick={handleDeclineTerms}
                className="w-full sm:w-auto"
              >
                Ablehnen und zur Startseite
              </Button>
              <Button onClick={handleAcceptTerms} className="w-full sm:w-auto">
                Ich stimme zu
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
