import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout/Layout";
import { Web3Provider } from "@/components/web3/Web3Provider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
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
      <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
        <Web3Provider>
          <Layout>{children}</Layout>
        </Web3Provider>
      </body>
    </html>
  );
}
