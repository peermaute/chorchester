"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function FullTermsPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-3xl">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Link href="/terms">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <CardTitle className="text-2xl font-bold">
                  Datenschutzerklärung
                </CardTitle>
                <CardDescription>
                  Datenschutzrichtlinien für chorchester.net
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="prose prose-sm max-w-none">
              <div className="mb-8">
                <h3 className="font-semibold">Verantwortlicher</h3>
                <p>
                  Peer Ricklev Maute
                  <br />
                  Krausestraße 34b
                  <br />
                  22305 Hamburg
                  <br />
                  E-Mail:{" "}
                  <a
                    href="mailto:peermaute@gmail.com"
                    className="text-primary hover:underline"
                  >
                    peermaute@gmail.com
                  </a>
                </p>
              </div>

              <p className="italic">
                Der Schutz Ihrer personenbezogenen Daten ist mir ein wichtiges
                Anliegen. Ich verarbeite Ihre Daten ausschließlich im Einklang
                mit der Datenschutz-Grundverordnung (DSGVO) und nur in dem
                Umfang, der für die Nutzung dieser Website erforderlich ist.
              </p>

              <h3 className="font-semibold mt-8">1. Zweck der Website</h3>
              <p>
                Diese Website dient der Vernetzung von Mitgliedern eines Chores
                und eines Orchesters. Sie ermöglicht es Nutzer*innen, ein
                persönliches Profil anzulegen und die Profile anderer
                registrierter Personen einzusehen. Die Registrierung ist
                öffentlich zugänglich. Eine kommerzielle Nutzung der Daten
                findet nicht statt.
              </p>

              <h3 className="font-semibold mt-8">
                2. Erhobene Daten und Zweck der Verarbeitung
              </h3>
              <p>
                Im Rahmen der Registrierung und Nutzung der Website werden
                personenbezogene Daten verarbeitet, die für die Anmeldung,
                Verwaltung und Darstellung von Benutzerprofilen erforderlich
                sind. Dazu gehören insbesondere:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>E-Mail-Adresse zur Authentifizierung</li>
                <li>
                  freiwillige Angaben wie Ensemble-Zugehörigkeit,
                  Instrument/Stimmgruppe, Profilbild und persönliche Texte
                </li>
              </ul>
              <p className="mt-4">
                Die Verarbeitung dieser Daten dient folgenden Zwecken:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Erstellung und Anzeige von Benutzerprofilen</li>
                <li>Verwaltung des Benutzerkontos</li>
                <li>
                  technische Bereitstellung, Sicherheit und Weiterentwicklung
                  der Website
                </li>
              </ul>
              <p className="mt-4">
                Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a
                DSGVO) sowie unser berechtigtes Interesse an einem
                funktionierenden System (Art. 6 Abs. 1 lit. f DSGVO).
              </p>

              <h3 className="font-semibold mt-8">3. Sichtbarkeit der Daten</h3>
              <p>
                Erstellte Profile sind für alle anderen registrierten
                Nutzer*innen sichtbar. Eine Veröffentlichung über die Website
                hinaus erfolgt nicht. Sie entscheiden selbst, welche Inhalte Sie
                in Ihrem Profil angeben.
              </p>

              <h3 className="font-semibold mt-8">
                4. Hosting und Datenverarbeitung durch Dritte
              </h3>
              <p>
                Die Website wird über <strong>Vercel Inc.</strong>, 440 N
                Barranca Ave #4133, Covina, CA 91723, USA gehostet. Auch die
                Datenbank (Vercel Postgres) sowie Mediendateien wie Profilbilder
                (Vercel Blob) werden dort gespeichert. Dabei kann es zu einer
                Übermittlung personenbezogener Daten in Drittländer wie die USA
                kommen.
              </p>
              <p className="mt-4">
                Vercel bietet Standardvertragsklauseln gemäß Art. 46 DSGVO an,
                um ein angemessenes Datenschutzniveau sicherzustellen. Die
                Vereinbarung zur Auftragsverarbeitung (Data Processing Addendum)
                ist automatisch Bestandteil der Vertragsbeziehung mit Vercel:
              </p>
              <a
                href="https://vercel.com/legal/dpa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline block mt-2"
              >
                https://vercel.com/legal/dpa
              </a>

              <h3 className="font-semibold mt-8">
                5. Anmeldung über Drittanbieter (OAuth)
              </h3>
              <p>
                Zur Anmeldung auf der Website nutzen wir sogenannte
                OAuth-Dienste über NextAuth.js. Dabei können Sie sich mit einem
                bestehenden Konto bei einem Drittanbieter (z. B. einem Konto bei
                Google, GitHub oder ähnlichen Anbietern) anmelden. Dabei wird
                eine Verbindung zu dem jeweiligen Anbieter hergestellt, der ggf.
                personenbezogene Daten (z. B. IP-Adresse,
                Authentifizierungsinformationen) erhält.
              </p>
              <p className="mt-4">
                Die konkrete Auswahl der unterstützten Anmeldedienste kann sich
                im Laufe der Zeit ändern.
              </p>
              <p className="mt-4">
                Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung gemäß
                Art. 6 Abs. 1 lit. a DSGVO. Für die weitere Datenverarbeitung
                durch den jeweiligen Anbieter ist dieser selbst verantwortlich.
              </p>

              <h3 className="font-semibold mt-8">6. Speicherdauer</h3>
              <p>
                Ihre Daten werden so lange gespeichert, wie Ihr Benutzerkonto
                besteht. Sie können Ihr Konto jederzeit löschen lassen; in
                diesem Fall werden alle zugehörigen Daten zeitnah entfernt,
                sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
              </p>

              <h3 className="font-semibold mt-8">7. Cookies</h3>
              <p>
                Auf dieser Website werden ausschließlich technisch notwendige
                Cookies eingesetzt, beispielsweise zur Sitzungsverwaltung im
                Rahmen des Logins. Es kommen keine Cookies zu Analyse- oder
                Marketingzwecken zum Einsatz.
              </p>

              <h3 className="font-semibold mt-8">8. Ihre Rechte</h3>
              <p>Sie haben jederzeit das Recht auf:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>
                  Auskunft über Ihre gespeicherten personenbezogenen Daten
                </li>
                <li>Berichtigung unrichtiger Daten</li>
                <li>Löschung Ihrer Daten („Recht auf Vergessenwerden")</li>
                <li>Einschränkung der Verarbeitung</li>
                <li>Datenübertragbarkeit</li>
                <li>Widerspruch gegen die Verarbeitung</li>
                <li>Widerruf einer erteilten Einwilligung</li>
              </ul>
              <p className="mt-4">
                Bei Fragen zum Datenschutz können Sie sich jederzeit an{" "}
                <a
                  href="mailto:peermaute@gmail.com"
                  className="text-primary hover:underline"
                >
                  peermaute@gmail.com
                </a>{" "}
                wenden.
              </p>
              <p className="mt-4">
                Darüber hinaus haben Sie das Recht, sich bei einer
                Datenschutzaufsichtsbehörde zu beschweren.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
