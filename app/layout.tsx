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
      <body className="flex-col bg-gradient-to-t from-lightSteelBlue to-pastelPurple bg-fixed">
        <Header />
        {children}
        <div className="min-h-24"></div>
        <div className="w-screen flex justify-center fixed bottom-0 bg-lightSteelBlue">
          <div className="w-11/12 lg:w-3/4 flex justify-center mb-3 ml-3 mr-3 rounded-lg shadow-sm bg-white shadow-slate-500">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
