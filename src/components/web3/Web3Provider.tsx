"use client";

import React from "react";
import { Config, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { XellarKitProvider, defaultConfig, darkTheme } from "@xellar/kit";
import { liskSepolia } from "viem/chains";

const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "";
const xellarAppId = process.env.NEXT_PUBLIC_XELLAR_APP_ID || "";

const config = defaultConfig({
  appName: "DeenVerse",
  walletConnectProjectId,
  xellarAppId,
  xellarEnv: "sandbox",
  ssr: true, // Required for Next.js App Router
  chains: [liskSepolia],
}) as Config;

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  // Add error boundary for XellarKitProvider
  try {
    return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <XellarKitProvider theme={darkTheme}>{children}</XellarKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    );
  } catch (error) {
    console.error("Error initializing Web3Provider:", error);
    // Fallback to children without Web3 provider in case of error
    return <>{children}</>;
  }
};
