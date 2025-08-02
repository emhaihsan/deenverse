"use client";

import { useState, useEffect } from "react";
import { ConnectButton } from "@xellar/kit";

export const WalletConnectButton = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  try {
    return (
      <div className="flex items-center">
        <ConnectButton className="px-4 py-2 bg-[#03533d] text-white rounded-lg  hover:bg-[#03533d] hover:text-white transition-colors duration-300 ease-in-out text-sm font-medium shadow" />
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
