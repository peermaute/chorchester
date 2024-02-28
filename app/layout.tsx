import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/footer";
import Header from "./components/header";

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
    <html lang="en">
      <body className="flex h-screen justify-center">
        <div className="flex-col">
          <Header />
          {children}
        </div>
        <div className="absolute bottom-0">
          <Footer />
        </div>
      </body>
    </html>
  );
}
