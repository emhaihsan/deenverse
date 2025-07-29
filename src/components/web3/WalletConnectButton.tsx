"use client";

import { useState, useEffect } from "react";
import { ConnectButton } from "@xellar/kit";

export const WalletConnectButton = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Try to render the ConnectButton, fallback to a simple button if there's an error
  try {
    return (
      <div className="flex items-center">
        <ConnectButton className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm" />
      </div>
    );
  } catch (error) {
    console.error("Error rendering ConnectButton:", error);
    return (
      <div className="flex items-center">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed text-sm"
          disabled
        >
          Wallet Unavailable
        </button>
      </div>
    );
  }
};
