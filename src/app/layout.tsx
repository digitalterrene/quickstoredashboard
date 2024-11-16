import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ApplicationShell from "@/components/application_shell";
import { AuthContextProvider } from "@/context/auth-context/AuthContext";
import { SESSION_COOKIE_NAME } from "@/constants";

import { cookies } from "next/headers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vetueal Stores",
  description: "All you can buy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = cookies().get(SESSION_COOKIE_NAME)?.value || null;
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-screen">
          <AuthContextProvider>
            <ApplicationShell session={session}>{children}</ApplicationShell>
          </AuthContextProvider>
        </div>
      </body>
    </html>
  );
}
