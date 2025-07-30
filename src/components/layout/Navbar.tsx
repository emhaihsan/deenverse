"use client";

import Link from "next/link";
import Image from "next/image";
import { WalletConnectButton } from "@/components/web3/WalletConnectButton";

export default function Navbar() {
  return (
    <nav className="bg-[#03533d] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/deenverse-logo.png"
                  alt="DeenVerse Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-xl font-bold text-white">DeenVerse</span>
            </Link>
          </div>

          {/* Wallet Connect Button */}
          <div>
            <WalletConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
