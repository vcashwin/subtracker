import clsx from "clsx";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ApplicationLayout from "./application-layout";
import { GlobalProvider } from "@/providers/GlobalProvider";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SubTracker",
  description: "A tracker app for all your subscriptions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="bg-white dark:bg-zinc-900 lg:bg-zinc-100 dark:lg:bg-zinc-950"
    >
      <body className={clsx(inter.className)}>
        <NextTopLoader showSpinner={false} color="#09090b" />
        <GlobalProvider>
          <ApplicationLayout>{children}</ApplicationLayout>
        </GlobalProvider>
      </body>
    </html>
  );
}
