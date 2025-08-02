"use client";

import { useState, useEffect } from "react";
import { Wheat, Wallet, Info, Heart } from "lucide-react";
import { useAccount } from "wagmi";
import Image from "next/image";
import {
  convertIdrToEth,
  formatEth,
  getEthereumPrice,
} from "@/lib/api/cryptoPrice";
import organizations from "@/data/destinationOrg";

export default function ZakatPertanianPage() {
  const [amount, setAmount] = useState("");
  const [selectedOrg, setSelectedOrg] = useState<string>("");
  const [ethAmount, setEthAmount] = useState<string>("0");
  const [isLoadingEth, setIsLoadingEth] = useState<boolean>(false);
  const [ethPrice, setEthPrice] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"simple" | "advanced">("simple");

  const { isConnected } = useAccount();

  // Fetch ETH price on mount
  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const price = await getEthereumPrice();
        setEthPrice(price);
      } catch (err) {
        console.error("Error fetching ETH price:", err);
      }
    };

    fetchEthPrice();
  }, []);

  // Convert IDR to ETH when amount changes
  useEffect(() => {
    const convertToEth = async () => {
      const zakatAmount = parseFloat(amount) || 0;
      if (zakatAmount > 0) {
        setIsLoadingEth(true);
        try {
          const eth = await convertIdrToEth(zakatAmount);
          setEthAmount(formatEth(eth));
        } catch (err) {
          console.error("Error converting to ETH:", err);
        } finally {
          setIsLoadingEth(false);
        }
      } else {
        setEthAmount("0");
      }
    };

    const timeoutId = setTimeout(convertToEth, 500);
    return () => clearTimeout(timeoutId);
  }, [amount]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const currentZakat = parseFloat(amount) || 0;

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-green-50 rounded-2xl border border-green-200">
              <Wheat className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Zakat Pertanian
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Keluarkan zakat hasil pertanian dan perkebunan Anda
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-medium text-gray-900">
              Tentang Zakat Pertanian
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-600 text-sm leading-relaxed">
              Zakat pertanian adalah zakat yang dikenakan pada hasil pertanian
              dan perkebunan. Zakat ini dikeluarkan setiap kali panen dengan
              kadar 5% untuk pengairan berbiaya atau 10% untuk pengairan alami.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-green-50 rounded-lg">
                <span className="font-medium text-green-800">Kadar:</span>
                <p className="text-green-700">5% (berbiaya)</p>
                <p className="text-green-700">10% (alami)</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <span className="font-medium text-green-800">Waktu:</span>
                <p className="text-green-700">Setiap panen</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <span className="font-medium text-green-800">Nisab:</span>
                <p className="text-green-700">520 kg beras</p>
              </div>
            </div>
          </div>
        </div>

        {/* Organization Selection */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-medium text-gray-900">
              Pilih Lembaga Penyalur
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {organizations.map((org) => (
              <div
                key={org.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedOrg === org.id
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-green-300"
                }`}
                onClick={() => setSelectedOrg(org.id)}
              >
                <div className="relative h-16 mb-2">
                  <Image
                    src={org.logo}
                    alt={org.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-center font-medium mt-2">{org.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Zakat Input */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("simple")}
              className={`py-3 px-6 font-medium text-sm ${
                activeTab === "simple"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sederhana
            </button>
            <button
              onClick={() => setActiveTab("advanced")}
              className={`py-3 px-6 font-medium text-sm ${
                activeTab === "advanced"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Lengkap
            </button>
          </div>

          {activeTab === "simple" ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Jumlah Zakat yang Akan Dibayar (IDR)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Masukkan jumlah zakat"
                    className="block w-full pl-4 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              {/* Zakat Calculation Result */}
              {currentZakat > 0 && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100">
                  <h4 className="font-medium text-green-800 mb-2">
                    Ringkasan Pembayaran
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Jumlah zakat:</span>
                      <span className="font-medium">
                        {formatCurrency(currentZakat)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 mt-2 border-t border-green-100">
                      <span className="text-gray-600">Jumlah dalam ETH:</span>
                      <span className="font-medium text-green-700">
                        {isLoadingEth ? (
                          <div className="h-4 w-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin inline-block" />
                        ) : (
                          `${ethAmount} ETH`
                        )}
                      </span>
                    </div>
                    {ethPrice > 0 && (
                      <div className="text-xs text-gray-500 text-right">
                        1 ETH = {formatCurrency(ethPrice)}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
                <Info className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Fitur Segera Hadir
              </h3>
              <p className="text-gray-500">
                Kalkulator zakat pertanian lengkap akan segera tersedia
              </p>
            </div>
          )}
        </div>

        {/* Order Summary */}
        {currentZakat > 0 && selectedOrg && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">
              Ringkasan Pesanan
            </h4>
            <div className="space-y-1 text-sm text-gray-600">
              <div>
                Lembaga: {organizations.find((o) => o.id === selectedOrg)?.name}
              </div>
              <div>Jumlah: {formatCurrency(currentZakat)}</div>
              <div>ETH: {ethAmount} ETH</div>
            </div>
          </div>
        )}

        {/* Payment Button */}
        <div className="mt-6">
          <button
            disabled={!isConnected || currentZakat === 0 || !selectedOrg}
            className={`w-full py-4 px-6 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
              isConnected && currentZakat > 0 && selectedOrg
                ? "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {!isConnected ? (
              <>
                <Wallet className="w-5 h-5" />
                Hubungkan Dompet untuk Membayar
              </>
            ) : currentZakat === 0 ? (
              "Masukkan Jumlah Zakat"
            ) : !selectedOrg ? (
              "Pilih Lembaga Penyalur"
            ) : isLoadingEth ? (
              "Menghitung..."
            ) : (
              `Bayar ${ethAmount} ETH`
            )}
          </button>

          {!isConnected && (
            <p className="text-xs text-gray-500 mt-2 text-center">
              Anda perlu menghubungkan dompet kripto untuk melakukan pembayaran
            </p>
          )}
        </div>

        {/* Important Notes */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Catatan Penting
          </h4>
          <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
            <li>Zakat pertanian wajib dikeluarkan setiap kali panen</li>
            <li>
              Kadar zakat 5% untuk pengairan berbiaya atau 10% untuk pengairan
              alami
            </li>
            <li>Biaya produksi dapat dikurangi sebelum perhitungan zakat</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
