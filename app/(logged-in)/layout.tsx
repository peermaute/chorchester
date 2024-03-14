import type { Metadata } from "next";
import "../globals.css";
import Footer from "../components/footer";
import Header from "../components/header";
import { ThemeProvider, BaseStyles } from "@primer/react";

export const metadata: Metadata = {
  title: "Unimusik",
  description: "Portal für Personen der Unimusik Hamburg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="flex-col bg-sandy">
        <ThemeProvider>
          <BaseStyles>
            <Header />
            {children}
            <div className="min-h-24"></div>
            <div className="w-screen flex justify-center fixed bottom-0 bg-sandy">
              <div className="w-11/12 lg:w-1/2 flex justify-center mb-3 ml-3 mr-3 rounded-lg shadow-md bg-white">
                <Footer />
              </div>
            </div>
          </BaseStyles>
        </ThemeProvider>
      </body>
    </html>
  );
}
