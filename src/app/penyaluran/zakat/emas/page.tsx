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
  Users,
} from "lucide-react";
import { useAccount } from "wagmi";
import { getCurrentGoldPrice, getNisabAmount } from "@/lib/api/goldPrice";
import { convertIdrToEth, formatEth } from "@/lib/api/cryptoPrice";
import organizations from "@/data/destinationOrg";
import Image from "next/image";

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
  const [selectedOrg, setSelectedOrg] = useState<string>("");

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
          <span>Kembali ke Kategori Zakat</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-yellow-100 rounded-2xl border border-yellow-200">
              <Coins className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Zakat Emas
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Nisab: 85 gram emas • Kadar: 2.5% • Haul: 1 tahun
          </p>
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6 text-yellow-600" />
            <h2 className="text-xl font-medium text-gray-900">Informasi</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-medium text-yellow-800 mb-1">Nisab</h3>
              <p className="text-gray-700">
                {goldPrice ? (
                  <>
                    85 gram emas = {formatCurrency(nishab)}
                    <br />
                    <span className="text-xs text-gray-500">
                      (Harga emas: {formatCurrency(goldPrice)}/gram)
                    </span>
                  </>
                ) : (
                  "Memuat data..."
                )}
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-medium text-yellow-800 mb-1">Kadar</h3>
              <p className="text-gray-700">
                2.5% dari total harta yang tersimpan
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-medium text-yellow-800 mb-1">Haul</h3>
              <p className="text-gray-700">1 tahun penimbunan harta</p>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600 flex items-center justify-between">
            <p>
              Terakhir diperbarui: {lastUpdated || "Memuat..."}
              <button
                onClick={fetchGoldData}
                disabled={isLoading}
                className="ml-2 text-yellow-600 hover:text-yellow-700 disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-4 h-4 inline ${
                    isLoading ? "animate-spin" : ""
                  }`}
                />
              </button>
            </p>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </div>

        {/* Zakat Calculator */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-6 h-6 text-yellow-600" />
            <h2 className="text-xl font-medium text-gray-900">
              Kalkulator Zakat
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("simple")}
              className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "simple"
                  ? "border-yellow-600 text-yellow-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Sederhana
            </button>
            <button
              onClick={() => setActiveTab("advanced")}
              className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "advanced"
                  ? "border-yellow-600 text-yellow-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Lanjutan
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pilih Lembaga Penyalur
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {organizations.map((org) => (
                <div
                  key={org.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedOrg === org.id
                      ? "border-rose-500 bg-rose-50"
                      : "border-gray-200 hover:border-rose-300"
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

            {/* Simple Tab */}
            {activeTab === "simple" ? (
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jumlah Zakat (Rupiah)
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

                {/* Order Summary */}
                {currentZakat > 0 && selectedOrg && (
                  <div className="mt-4 pt-4 border-t border-yellow-200">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Ringkasan Pesanan
                    </h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>
                        Lembaga:{" "}
                        {organizations.find((o) => o.id === selectedOrg)?.name}
                      </div>
                      <div>Jumlah: {formatCurrency(currentZakat)}</div>
                      <div>ETH: {ethAmount} ETH</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Payment Button */}
            {activeTab === "simple" && (
              <div className="mt-6">
                <button
                  disabled={!isConnected || currentZakat === 0 || !selectedOrg}
                  className={`w-full py-4 px-6 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                    isConnected && currentZakat > 0 && selectedOrg
                      ? "bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg hover:shadow-xl"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <Wallet className="w-5 h-5" />
                  {!isConnected
                    ? "Hubungkan Dompet untuk Membayar"
                    : currentZakat === 0
                    ? "Masukkan Jumlah Zakat"
                    : !selectedOrg
                    ? "Pilih Lembaga Penyalur"
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
