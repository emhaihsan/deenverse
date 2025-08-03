"use client";

import { useState, useEffect } from "react";
import { Wallet, Info, Heart } from "lucide-react";
import { useAccount } from "wagmi";
import {
  convertIdrToEth,
  formatEth,
  getEthereumPrice,
} from "@/lib/api/cryptoPrice";
import PeternakanHeader from "@/components/penyaluran/zakat/peternakan/PeternakanHeader";
import PeternakanInfo from "@/components/penyaluran/zakat/peternakan/PeternakanInfo";
import OrganizationSelection from "@/components/penyaluran/OrganizationSelection";
import organizations from "@/data/destinationOrg";

export default function ZakatPeternakanPage() {
  const [amount, setAmount] = useState("");
  const [selectedOrg, setSelectedOrg] = useState<string>("");
  const [ethAmount, setEthAmount] = useState<string>("0");
  const [isLoadingEth, setIsLoadingEth] = useState<boolean>(false);
  const [ethPrice, setEthPrice] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"simple" | "advanced">("simple");

  const { isConnected } = useAccount();

  const orgTheme = {
    icon: <Heart className="w-6 h-6 text-[#03533d]" />,
    title: "Pilih Lembaga Penyalur",
    selectedClass: "border-[#03533d] bg-emerald-50 shadow-md",
    hoverClass: "hover:border-[#03533d]",
  };

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
    <div className="min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <PeternakanHeader />
        <PeternakanInfo />

        <OrganizationSelection
          organizations={organizations}
          selectedOrg={selectedOrg}
          onSelectOrg={setSelectedOrg}
          theme={orgTheme}
        />

        {/* Calculation Card */}
        <div className="bg-white rounded-2xl border border-b-4 border-gray-900 p-6">
          <div className="flex justify-center border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("simple")}
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                activeTab === "simple"
                  ? "text-[#03533d] border-b-2 border-[#03533d]"
                  : "text-gray-500"
              }`}
            >
              Kalkulator Simple
            </button>
            <button
              onClick={() => setActiveTab("advanced")}
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                activeTab === "advanced"
                  ? "text-[#03533d] border-b-2 border-[#03533d]"
                  : "text-gray-500"
              }`}
            >
              Kalkulator Advanced
            </button>
          </div>

          {activeTab === "simple" ? (
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nilai Zakat Peternakan (IDR)
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Contoh: 5000000"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#03533d] focus:border-[#03533d] transition-colors bg-gray-50"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Jika Anda membayar dengan nilai uang (qimah).
                </p>
              </div>

              {currentZakat > 0 && (
                <div className="mt-4 p-4 bg-emerald-50/50 rounded-lg border border-emerald-100">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Ringkasan Pembayaran
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Jumlah Zakat:</span>
                      <span className="font-medium text-[#03533d]">
                        {formatCurrency(currentZakat)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 mt-2 border-t border-emerald-100">
                      <span className="text-gray-600">Jumlah dalam ETH:</span>
                      <span className="font-medium text-[#03533d]">
                        {isLoadingEth ? (
                          <div className="h-4 w-4 border-2 border-[#03533d] border-t-transparent rounded-full animate-spin inline-block" />
                        ) : (
                          `${ethAmount} ETH`
                        )}
                      </span>
                    </div>
                    {ethPrice > 0 && (
                      <div className="text-xs text-gray-500 text-right mt-1">
                        1 ETH = {formatCurrency(ethPrice)}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Info className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Fitur Segera Hadir
              </h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                Kalkulator zakat peternakan lengkap dengan perhitungan per jenis
                ternak akan segera tersedia.
              </p>
            </div>
          )}
        </div>

        {/* Payment Button */}
        <div className="mt-6">
          <button
            disabled={!isConnected || currentZakat === 0 || !selectedOrg}
            className={`w-full py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
              isConnected && currentZakat > 0 && selectedOrg
                ? "bg-[#03533d] hover:bg-gray-900 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {!isConnected ? (
              <>
                <Wallet className="w-6 h-6" />
                <span>Hubungkan Dompet</span>
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
              Anda perlu menghubungkan dompet kripto untuk melakukan pembayaran.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
