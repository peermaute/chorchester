import type { Metadata } from "next";
import "../globals.css";
import Footer from "../components/footer";
import Header from "../components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Chorchester",
  description: "Portal für Personen der Unimusik Hamburg",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <html lang="de" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pb-24">{children}</main>
            <div className="w-full flex justify-center fixed bottom-0 bg-background">
              <div className="w-full max-w-[500px] flex justify-center mb-3 ml-3 mr-3 rounded-lg shadow-md bg-card">
                <Footer />
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
