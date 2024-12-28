import clsx from "clsx";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ApplicationLayout from "./application-layout";

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
      className="bg-white lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950"
    >
      <body className={clsx(inter.className)}>
        <ApplicationLayout>{children}</ApplicationLayout>
      </body>
    </html>
  );
}
