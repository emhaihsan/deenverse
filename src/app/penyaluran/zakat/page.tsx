"use client";

// app/penyaluran/zakat/page.tsx
import Link from "next/link";
import { ArrowLeft, Scale, Wallet, Info } from "lucide-react";
import { useAccount } from "wagmi"; // Import wagmi hook to check wallet connection

export default function ZakatPenyaluranPage() {
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
            <div className="p-3 bg-emerald-50 rounded-2xl">
              <Scale className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Penyaluran Zakat
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Salurkan zakat Anda secara transparan dan aman menggunakan teknologi
            blockchain
          </p>
        </div>

        {/* Information Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-start gap-4 mb-4">
            <Info className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Panduan Penyaluran Zakat
              </h2>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Pastikan Anda telah menghitung zakat dengan benar</li>
                <li>• Hubungkan dompet Xellar Anda untuk penyaluran</li>
                <li>• Pilih metode pembayaran yang tersedia</li>
                <li>• Konfirmasi transaksi di dompet Anda</li>
                <li>• Anda akan menerima NFT sebagai bukti penyaluran</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Zakat Calculator Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">
            Kalkulator Zakat
          </h2>
          <p className="text-gray-600 mb-6">
            Hitung kewajiban zakat Anda sebelum menyalurkannya
          </p>

          {/* Calculator Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jenis Zakat
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                <option>Zakat Penghasilan</option>
                <option>Zakat Tabungan</option>
                <option>Zakat Emas</option>
                <option>Zakat Perdagangan</option>
                <option>Zakat Fitrah</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jumlah Harta (IDR)
              </label>
              <input
                type="number"
                placeholder="Masukkan jumlah harta"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="bg-emerald-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Zakat yang harus dibayar:</span>
                <span className="text-lg font-medium text-emerald-600">
                  Rp 0
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">
            Penyaluran Zakat
          </h2>
          <p className="text-gray-600 mb-6">
            Salurkan zakat Anda secara on-chain dengan aman
          </p>

          {/* Bayar Button */}
          <button
            disabled={!isConnected}
            className={`w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 ${
              isConnected
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Wallet className="w-5 h-5" />
            {isConnected
              ? "Bayar Zakat Sekarang"
              : "Hubungkan Dompet untuk Membayar"}
          </button>

          {!isConnected && (
            <p className="text-sm text-gray-500 mt-3 text-center">
              Anda perlu menghubungkan dompet Xellar untuk menyalurkan zakat
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
