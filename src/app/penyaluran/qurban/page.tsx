"use client";

// app/penyaluran/qurban/page.tsx
import Link from "next/link";
import { ArrowLeft, Beef, Wallet, Info } from "lucide-react";
import { useAccount } from "wagmi"; // Import wagmi hook to check wallet connection

export default function QurbanPenyaluranPage() {
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
            <div className="p-3 bg-rose-50 rounded-2xl">
              <Beef className="w-8 h-8 text-rose-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Penyaluran Qurban
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Salurkan hewan qurban Anda secara transparan dan aman menggunakan
            teknologi blockchain
          </p>
        </div>

        {/* Information Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-start gap-4 mb-4">
            <Info className="w-6 h-6 text-rose-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Panduan Penyaluran Qurban
              </h2>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Qurban wajib bagi yang mampu saat Idul Adha</li>
                <li>• Hewan qurban: sapi, kambing, domba, atau unta</li>
                <li>• Hubungkan dompet Xellar Anda untuk penyaluran</li>
                <li>• Konfirmasi transaksi di dompet Anda</li>
                <li>• Anda akan menerima NFT sebagai bukti penyaluran</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Qurban Options */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">
            Pilihan Hewan Qurban
          </h2>
          <p className="text-gray-600 mb-6">
            Pilih hewan qurban yang ingin Anda salurkan
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                name: "Kambing/Domba",
                price: "Rp 2.500.000",
                description: "1 ekor untuk 1 orang",
              },
              {
                name: "Sapi",
                price: "Rp 15.000.000",
                description: "1 ekor untuk 7 orang",
              },
              {
                name: "Unta",
                price: "Rp 40.000.000",
                description: "1 ekor untuk 7 orang",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:border-rose-300 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <span className="font-medium text-rose-600">
                    {item.price}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">
            Penyaluran Qurban
          </h2>
          <p className="text-gray-600 mb-6">
            Salurkan qurban Anda secara on-chain dengan aman
          </p>

          {/* Bayar Button */}
          <button
            disabled={!isConnected}
            className={`w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 ${
              isConnected
                ? "bg-rose-600 hover:bg-rose-700 text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Wallet className="w-5 h-5" />
            {isConnected
              ? "Salurkan Qurban Sekarang"
              : "Hubungkan Dompet untuk Menyalurkan"}
          </button>

          {!isConnected && (
            <p className="text-sm text-gray-500 mt-3 text-center">
              Anda perlu menghubungkan dompet Xellar untuk menyalurkan qurban
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
