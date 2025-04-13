import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import { CookieBanner } from "./components/cookie-banner";
import { CookieDeclinedBanner } from "./components/cookie-declined-banner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chorchester",
  description: "Your choir and orchestra companion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          {children}
          <Toaster
            position="top-center"
            richColors
            className="md:scale-125"
            toastOptions={{
              className: "md:min-w-[400px]",
              style: {
                fontSize: "1rem",
                padding: "1rem",
              },
            }}
          />
          <CookieBanner />
          <CookieDeclinedBanner />
        </Providers>
      </body>
    </html>
  );
}
