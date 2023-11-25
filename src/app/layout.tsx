import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import { MainNavbar } from "@/components/main/main-navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Open Path Platform",
  description: "Open Path Platform",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <main className="relative flex min-h-screen flex-col overflow-auto">
            <header className="sticky top-0 z-50">
              <MainNavbar className="" />
            </header>
            <div className="flex-1">{children}</div>
          </main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
