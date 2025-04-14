import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ImpressumPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Impressum</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-muted-foreground">
              Angaben gemäß § 5 TMG:
            </h2>
            <div className="space-y-1">
              <p>Peer Ricklev Maute</p>
              <p>Krausestraße 34b</p>
              <p>22305 Hamburg</p>
              <p>E-Mail: peermaute@gmail.com</p>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-muted-foreground">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
            </h2>
            <div className="space-y-1">
              <p>Peer Ricklev Maute</p>
              <p>Krausestraße 34b</p>
              <p>22305 Hamburg</p>
            </div>
          </section>

          <div className="pt-6">
            <Link href="/">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <span className="relative -top-[1px]">←</span>
                <span>Zurück zur Startseite</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
