"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Coins,
  Calculator,
  Zap,
  Wallet,
  Info,
  DollarSign,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useAccount } from "wagmi";
import { getCurrentGoldPrice, getNisabAmount } from "@/lib/api/goldPrice";
import { convertIdrToEth, formatEth } from "@/lib/api/cryptoPrice";

const zakatTypesEmas = [
  {
    id: "perdagangan",
    name: "Zakat Perdagangan",
    description: "Modal dan keuntungan usaha dagang",
  },
  {
    id: "perusahaan",
    name: "Zakat Perusahaan",
    description: "Aset dan keuntungan perusahaan",
  },
  {
    id: "properti",
    name: "Zakat Properti",
    description: "Properti yang menghasilkan pendapatan",
  },
  {
    id: "profesi",
    name: "Zakat Profesi",
    description: "Gaji, honor, fee freelance",
  },
  {
    id: "emas-perak",
    name: "Zakat Simpanan Emas/Perak",
    description: "Emas, perak, dan perhiasan",
  },
  {
    id: "investasi",
    name: "Zakat Investasi",
    description: "Saham, reksa dana, crypto, obligasi",
  },
];

export default function NisabEmasPage() {
  const [goldPrice, setGoldPrice] = useState<number | null>(null);
  const [nishab, setNishab] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"simple" | "advanced">("simple");
  const [simpleAmount, setSimpleAmount] = useState("");
  const [ethAmount, setEthAmount] = useState<string>("0.000000");
  const [isConverting, setIsConverting] = useState<boolean>(false);

  const { isConnected } = useAccount();

  const fetchGoldData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [price, nisab] = await Promise.all([
        getCurrentGoldPrice(),
        getNisabAmount(),
      ]);

      setGoldPrice(price);
      setNishab(nisab);
      setLastUpdated(new Date().toLocaleTimeString("id-ID"));
    } catch (err) {
      console.error("Error:", err);
      setError(
        "Gagal memperbarui data harga emas. Menggunakan data terakhir yang tersimpan."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGoldData();
  }, []);

  // Calculate zakat based on simple input with minimum 2.5% of nisab
  const calculateSimpleZakat = () => {
    const amount = parseFloat(simpleAmount) || 0;
    const minimumZakat = nishab * 0.025; // 2.5% of nisab

    // If user enters amount less than minimum, use minimum
    if (amount > 0 && amount < minimumZakat) {
      return minimumZakat;
    }

    return amount;
  };

  // Convert IDR to ETH
  const convertToEth = async (amount: number) => {
    if (amount <= 0) {
      setEthAmount("0.000000");
      return;
    }

    setIsConverting(true);
    try {
      const eth = await convertIdrToEth(amount);
      setEthAmount(formatEth(eth));
    } catch (error) {
      console.error("Error converting to ETH:", error);
      setEthAmount("0.000000");
    } finally {
      setIsConverting(false);
    }
  };

  // Update ETH conversion when zakat amount changes
  useEffect(() => {
    const amount = calculateSimpleZakat();
    convertToEth(amount);
  }, [simpleAmount, nishab]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const currentZakat = calculateSimpleZakat();
  const minimumZakat = nishab * 0.025;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/penyaluran/zakat"
          className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali ke Kalkulator Zakat</span>
        </Link>

        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-yellow-50 rounded-2xl border border-yellow-200">
              <Coins className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Nisab Emas
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            85 gram emas (± Rp 110-115 juta) • Kadar 2,5% • Haul 1 tahun
          </p>
        </div>

        {/* Nisab Information */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-3">
                Tentang Nisab Emas
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                Semua harta likuid dan aset yang nilainya setara uang masuk ke
                kategori ini. Berbagai jenis harta bisa digabung untuk mencapai
                nisab minimum.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <span className="font-medium text-yellow-800">Nisab:</span>
                  <p className="text-yellow-700">{formatCurrency(nishab)}</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <span className="font-medium text-yellow-800">Kadar:</span>
                  <p className="text-yellow-700">2,5% dari total harta</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <span className="font-medium text-yellow-800">Haul:</span>
                  <p className="text-yellow-700">1 tahun kepemilikan</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gold Price */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Coins className="w-5 h-5 mr-2 text-amber-500" />
                Harga Emas Terkini
              </h2>
              <p className="text-sm text-gray-600">
                Harga jual emas per gram (ANTAM)
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {lastUpdated && `Terakhir diperbarui: ${lastUpdated}`}
              </p>
            </div>

            <div className="text-right">
              {isLoading ? (
                <div className="animate-pulse flex items-center justify-end">
                  <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                  <span>Memuat...</span>
                </div>
              ) : error ? (
                <div className="text-sm text-red-600">{error}</div>
              ) : (
                <>
                  <p className="text-2xl font-bold text-emerald-700">
                    Rp {goldPrice?.toLocaleString("id-ID") || "..."}
                  </p>
                  <p className="text-sm text-gray-600">
                    Nishab: Rp {nishab.toLocaleString("id-ID")} (85 gram)
                  </p>
                </>
              )}

              <button
                onClick={fetchGoldData}
                disabled={isLoading}
                className={`mt-2 text-sm flex items-center ml-auto ${
                  isLoading
                    ? "text-gray-400"
                    : "text-emerald-600 hover:text-emerald-800"
                }`}
              >
                <RefreshCw
                  className={`w-4 h-4 mr-1 ${isLoading ? "animate-spin" : ""}`}
                />
                Perbarui Harga
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-yellow-50 text-yellow-700 rounded-md text-sm flex items-start">
              <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Zakat Calculator */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          {/* Tab Navigation */}
          <div className="bg-white rounded-2xl border border-gray-100 p-2 mb-6">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("simple")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                  activeTab === "simple"
                    ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Zap className="w-4 h-4" />
                Simple
              </button>
              <button
                onClick={() => setActiveTab("advanced")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                  activeTab === "advanced"
                    ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Calculator className="w-4 h-4" />
                Advanced
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            {activeTab === "simple" ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Pembayaran Simple
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Jika Anda sudah mengetahui jumlah zakat yang harus dibayar,
                    masukkan langsung di sini.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jumlah Zakat yang Akan Dibayar
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      value={simpleAmount}
                      onChange={(e) => setSimpleAmount(e.target.value)}
                      placeholder="Masukkan jumlah dalam Rupiah"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Minimal zakat: {formatCurrency(minimumZakat)} (2.5% dari
                    nisab)
                  </p>
                  {simpleAmount && parseFloat(simpleAmount) > 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                      Jumlah yang akan dibayar:{" "}
                      {formatCurrency(parseFloat(simpleAmount))}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Coming Soon
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Kalkulator advanced untuk perhitungan zakat emas secara
                  otomatis akan segera hadir.
                </p>
              </div>
            )}

            {/* Zakat Calculation Result */}
            {activeTab === "simple" && (
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 font-medium">
                    Zakat yang harus dibayar:
                  </span>
                  <span className="text-xl font-bold text-yellow-800">
                    {formatCurrency(currentZakat)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Ekuivalen dalam ETH:</span>
                  <span className="font-medium text-yellow-700">
                    {isConverting ? "Mengkonversi..." : `${ethAmount} ETH`}
                  </span>
                </div>

                {currentZakat > 0 && currentZakat === minimumZakat && (
                  <p className="text-sm text-yellow-700 mt-2">
                    Jumlah zakat menggunakan nilai minimum (2.5% dari nisab)
                  </p>
                )}
              </div>
            )}

            {/* Payment Button */}
            {activeTab === "simple" && (
              <div className="mt-6">
                <button
                  disabled={!isConnected || currentZakat === 0}
                  className={`w-full py-4 px-6 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                    isConnected && currentZakat > 0
                      ? "bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg hover:shadow-xl"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <Wallet className="w-5 h-5" />
                  {!isConnected
                    ? "Hubungkan Dompet untuk Membayar"
                    : currentZakat === 0
                    ? "Masukkan Jumlah Zakat"
                    : `Bayar Zakat ${formatCurrency(currentZakat)}`}
                </button>

                {!isConnected && (
                  <p className="text-sm text-gray-500 mt-3 text-center">
                    Anda perlu menghubungkan dompet Xellar untuk menyalurkan
                    zakat
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
