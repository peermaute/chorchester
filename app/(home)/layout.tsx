import type { Metadata } from "next";
import "../globals.css";
import Footer from "../components/footer";
import Header from "../components/header";

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
        <div className="w-screen flex justify-center fixed bottom-0 bg-lightSteelBlue mb-10">
          <button className="w-1/3 xl:w-1/4 h-14 flex justify-center items-center mb-3 ml-3 mr-3 rounded-lg shadow-sm bg-white shadow-slate-700">
            Sign In
          </button>
          <button className="w-1/3 xl:w-1/4 h-14 flex justify-center items-center mb-3 ml-8 mr-3 rounded-lg shadow-sm bg-lightBlue shadow-slate-700">
            Sign Up
          </button>
        </div>
      </body>
    </html>
  );
}
