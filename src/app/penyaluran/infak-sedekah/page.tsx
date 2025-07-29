"use client";

// src/app/penyaluran/infak-sedekah/page.tsx
import Link from "next/link";
import { ArrowLeft, HeartHandshake, Wallet, Info } from "lucide-react";
import { useAccount } from "wagmi"; // Import wagmi hook to check wallet connection

export default function InfakSedekahPenyaluranPage() {
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
            <div className="p-3 bg-blue-50 rounded-2xl">
              <HeartHandshake className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Penyaluran Infaq & Sedekah
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Salurkan infaq dan sedekah Anda secara transparan dan aman
            menggunakan teknologi blockchain
          </p>
        </div>

        {/* Information Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-start gap-4 mb-4">
            <Info className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Panduan Penyaluran Infaq & Sedekah
              </h2>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>
                  • Infaq dan sedekah bisa disalurkan kapan saja tanpa syarat
                  nisab
                </li>
                <li>• Hubungkan dompet Xellar Anda untuk penyaluran</li>
                <li>• Pilih tujuan penyaluran yang tersedia</li>
                <li>• Konfirmasi transaksi di dompet Anda</li>
                <li>• Anda akan menerima NFT sebagai bukti penyaluran</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Penyaluran Form */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">
            Formulir Penyaluran
          </h2>
          <p className="text-gray-600 mb-6">
            Isi formulir berikut untuk menyalurkan infaq atau sedekah Anda
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jenis Penyaluran
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Infaq</option>
                <option>Sedekah</option>
                <option>Sedekah Jariyah</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tujuan Penyaluran
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Fakir Miskin</option>
                <option>Yatim Piatu</option>
                <option>Janda dan Anak-Anak</option>
                <option>Santri dan Pendidikan</option>
                <option>Kemanusiaan</option>
                <option>Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jumlah (IDR)
              </label>
              <input
                type="number"
                placeholder="Masukkan jumlah penyaluran"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deskripsi (Opsional)
              </label>
              <textarea
                placeholder="Tambahkan catatan khusus untuk penyaluran Anda"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Penyaluran</h2>
          <p className="text-gray-600 mb-6">
            Salurkan infaq dan sedekah Anda secara on-chain dengan aman
          </p>

          {/* Bayar Button */}
          <button
            disabled={!isConnected}
            className={`w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 ${
              isConnected
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Wallet className="w-5 h-5" />
            {isConnected
              ? "Salurkan Sekarang"
              : "Hubungkan Dompet untuk Menyalurkan"}
          </button>

          {!isConnected && (
            <p className="text-sm text-gray-500 mt-3 text-center">
              Anda perlu menghubungkan dompet Xellar untuk menyalurkan infaq
              atau sedekah
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
