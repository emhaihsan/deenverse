"use client";

import { useCallback } from "react";

import { useState, useEffect } from "react";
import { Calculator, Wallet, DollarSign, Heart } from "lucide-react";
import { useAccount } from "wagmi";
import { getNisabAmount } from "@/lib/api/goldPrice";
import { convertIdrToEth, formatEth } from "@/lib/api/cryptoPrice";
import OrganizationSelection from "@/components/penyaluran/OrganizationSelection";
import organizations from "@/data/destinationOrg";
import EmasHeader from "@/components/penyaluran/zakat/emas/EmasHeader";
import EmasInfo from "@/components/penyaluran/zakat/emas/EmasInfo";

export default function NisabEmasPage() {
  const [activeTab, setActiveTab] = useState<"simple" | "advanced">("simple");
  const [simpleAmount, setSimpleAmount] = useState("");
  const [ethAmount, setEthAmount] = useState<string>("0.000000");
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [selectedOrg, setSelectedOrg] = useState<string>("");

  const { isConnected } = useAccount();

  const [nishab, setNishab] = useState<number>(0);

  useEffect(() => {
    const fetchNisab = async () => {
      try {
        const nisab = await getNisabAmount();
        setNishab(nisab);
      } catch (error) {
        console.error("Error fetching nisab:", error);
      }
    };

    fetchNisab();
  }, []);

  // Calculate zakat based on simple input with minimum 2.5% of nisab
  const calculateSimpleZakat = useCallback(() => {
    const amount = parseFloat(simpleAmount) || 0;
    const minimumZakat = nishab * 0.025; // 2.5% of nisab

    // If user enters amount less than minimum, use minimum
    if (amount > 0 && amount < minimumZakat) {
      return minimumZakat;
    }

    return amount;
  }, [simpleAmount, nishab]);

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
  }, [calculateSimpleZakat]);

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
    <div className="min-h-screen bg-gradient-to-br  py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <EmasHeader />

        <EmasInfo />

        <OrganizationSelection
          organizations={organizations}
          selectedOrg={selectedOrg}
          onSelectOrg={setSelectedOrg}
          theme={{
            icon: <Heart className="w-6 h-6 text-[#03533d]" />,
            title: "Pilih Lembaga Penyalur",
            selectedClass:
              "border-[#03533d] bg-emerald-50 ring-2 ring-[#03533d]",
            hoverClass: "hover:border-[#03533d]",
          }}
        />
        {/* Zakat Calculator */}
        <div className="bg-white rounded-2xl border border-b-4 border-gray-900 p-6 mt-6">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-6 h-6 text-[#03533d]" />
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
                  ? "border-[#03533d] text-[#03533d]"
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
              <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 font-medium">
                    Zakat yang harus dibayar:
                  </span>
                  <span className="text-xl font-bold text-emerald-800">
                    {formatCurrency(currentZakat)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Ekuivalen dalam ETH:</span>
                  <span className="font-medium text-emerald-700">
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
                  <div className="mt-4 pt-4 border-t border-emerald-200">
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
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl"
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
