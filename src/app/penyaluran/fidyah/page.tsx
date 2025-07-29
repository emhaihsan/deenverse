"use client";

// app/penyaluran/fidyah/page.tsx
import Link from "next/link";
import { ArrowLeft, Wheat, Wallet, Info } from "lucide-react";
import { useAccount } from "wagmi"; // Import wagmi hook to check wallet connection

export default function FidyahPenyaluranPage() {
  // Use wagmi's useAccount hook to check wallet connection status
  const { isConnected } = useAccount();

  return (
    <div className="bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Navigation */}
        <div className="flex items-center gap-4">
          <Link
            href="/penyaluran"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Kembali ke Penyaluran</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-amber-50 rounded-2xl">
              <Wheat className="w-8 h-8 text-amber-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Pembayaran Fidyah
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Bayar fidyah puasa Anda secara transparan dan aman menggunakan
            teknologi blockchain
          </p>
        </div>

        {/* Information Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-start gap-4 mb-4">
            <Info className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Panduan Pembayaran Fidyah
              </h2>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>
                  • Fidyah diperlukan jika tidak bisa mengqadha puasa Ramadhan
                </li>
                <li>
                  • Besaran fidyah: 1 mud (sekitar 600-650gr) beras per hari
                  puasa yang terlewat
                </li>
                <li>• Hubungkan dompet Xellar Anda untuk pembayaran</li>
                <li>• Konfirmasi transaksi di dompet Anda</li>
                <li>• Anda akan menerima NFT sebagai bukti pembayaran</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Fidyah Calculator */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">
            Kalkulator Fidyah
          </h2>
          <p className="text-gray-600 mb-6">
            Hitung jumlah fidyah yang perlu Anda bayar
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jumlah Hari Puasa yang Terlewat
              </label>
              <input
                type="number"
                placeholder="Masukkan jumlah hari"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jenis Pembayaran
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                <option>Beras (1 mud per hari)</option>
                <option>Uang (setara harga beras)</option>
              </select>
            </div>

            <div className="bg-amber-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Total Fidyah:</span>
                <span className="text-lg font-medium text-amber-600">
                  0 hari × 1 mud = 0 mud beras
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">
            Pembayaran Fidyah
          </h2>
          <p className="text-gray-600 mb-6">
            Bayar fidyah Anda secara on-chain dengan aman
          </p>

          {/* Bayar Button */}
          <button
            disabled={!isConnected}
            className={`w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 ${
              isConnected
                ? "bg-amber-600 hover:bg-amber-700 text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Wallet className="w-5 h-5" />
            {isConnected
              ? "Bayar Fidyah Sekarang"
              : "Hubungkan Dompet untuk Membayar"}
          </button>

          {!isConnected && (
            <p className="text-sm text-gray-500 mt-3 text-center">
              Anda perlu menghubungkan dompet Xellar untuk membayar fidyah
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
