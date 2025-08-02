import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout/Layout";
import { Web3Provider } from "@/components/web3/Web3Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeenVerse - Muslim Superapp",
  description:
    "Platform digital untuk mempermudah ibadah dan memperdalam pemahaman agama Islam",
  icons: {
    icon: "/DeenVerse-Green.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Web3Provider>
          <Layout>{children}</Layout>
        </Web3Provider>
      </body>
    </html>
  );
}
