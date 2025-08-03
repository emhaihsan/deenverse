"use client";

import { useState, useEffect } from "react";
import { Calculator, Wallet, Users, Heart } from "lucide-react";
import { useAccount } from "wagmi";
import {
  convertIdrToEth,
  formatEth,
  getEthereumPrice,
} from "@/lib/api/cryptoPrice";
import organizations from "@/data/destinationOrg";
import FitrahHeader from "@/components/penyaluran/zakat/fitrah/FitrahHeader";
import FitrahInfo from "@/components/penyaluran/zakat/fitrah/FitrahInfo";
import OrganizationSelection from "@/components/penyaluran/OrganizationSelection";

export default function ZakatFitrahPage() {
  const [advancedInputs, setAdvancedInputs] = useState({
    jumlahJiwa: "1",
    jenisZakat: "beras",
    hargaPerKg: "",
  });
  const [selectedOrg, setSelectedOrg] = useState<string>("");
  const [ethAmount, setEthAmount] = useState<string>("0");
  const [isLoadingEth, setIsLoadingEth] = useState<boolean>(false);
  const [ethPrice, setEthPrice] = useState<number>(0);

  const { isConnected } = useAccount();

  const zakatFitrahRates = {
    beras: { amount: 2.5, unit: "kg", price: 15000 },
    gandum: { amount: 2.5, unit: "kg", price: 20000 },
    kurma: { amount: 2.5, unit: "kg", price: 50000 },
    kismis: { amount: 2.5, unit: "kg", price: 100000 },
    uang: { amount: 37500, unit: "rupiah", price: 1 }, // Equivalent to 2.5kg rice
  };

  const calculateZakat = () => {
    const jumlahJiwa = parseInt(advancedInputs.jumlahJiwa) || 0;
    const jenisZakat = advancedInputs.jenisZakat;

    if (jumlahJiwa === 0) return 0;

    if (jenisZakat === "uang") {
      const customAmount = parseFloat(advancedInputs.hargaPerKg) || 0;
      if (customAmount > 0) {
        return jumlahJiwa * customAmount;
      } else {
        return jumlahJiwa * zakatFitrahRates.uang.amount;
      }
    } else {
      const rate =
        zakatFitrahRates[jenisZakat as keyof typeof zakatFitrahRates];
      const pricePerKg = parseFloat(advancedInputs.hargaPerKg) || rate.price;
      return jumlahJiwa * (rate.amount * pricePerKg);
    }
  };

  const currentZakat = calculateZakat();

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

  useEffect(() => {
    const convertToEth = async () => {
      if (currentZakat > 0) {
        setIsLoadingEth(true);
        try {
          const eth = await convertIdrToEth(currentZakat);
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
  }, [currentZakat]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <FitrahHeader />

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
        {/* Calculator */}
        <div className="bg-white rounded-2xl border border-b-4 border-gray-900 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-6 h-6 text-[#03533d]" />
            <h2 className="text-xl font-medium text-gray-900">
              Kalkulator Zakat Fitrah
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Jumlah Jiwa dalam Keluarga
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={advancedInputs.jumlahJiwa}
                  onChange={(e) =>
                    setAdvancedInputs({
                      ...advancedInputs,
                      jumlahJiwa: e.target.value,
                    })
                  }
                  placeholder="Masukkan jumlah jiwa"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Jenis Zakat Fitrah
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  { id: "beras", name: "Beras" },
                  { id: "gandum", name: "Gandum" },
                  { id: "kurma", name: "Kurma" },
                  { id: "kismis", name: "Kismis" },
                  { id: "uang", name: "Uang" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() =>
                      setAdvancedInputs({
                        ...advancedInputs,
                        jenisZakat: item.id,
                      })
                    }
                    className={`py-3 px-2 rounded-lg border-2 transition-colors ${
                      advancedInputs.jenisZakat === item.id
                        ? "border-[#03533d] bg-emerald-50 text-[#03533d]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-medium text-sm">{item.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {advancedInputs.jenisZakat !== "uang" ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Harga per Kg ({advancedInputs.jenisZakat}) (IDR)
                  <span className="text-gray-500 font-normal ml-2">
                    (standar:{" "}
                    {formatCurrency(
                      zakatFitrahRates[
                        advancedInputs.jenisZakat as keyof typeof zakatFitrahRates
                      ].price
                    )}
                    /kg)
                  </span>
                </label>
                <input
                  type="number"
                  value={advancedInputs.hargaPerKg}
                  onChange={(e) =>
                    setAdvancedInputs({
                      ...advancedInputs,
                      hargaPerKg: e.target.value,
                    })
                  }
                  placeholder={`Masukkan harga per kg ${advancedInputs.jenisZakat}`}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Jumlah per Jiwa (IDR)
                  <span className="text-gray-500 font-normal ml-2">
                    (standar: {formatCurrency(zakatFitrahRates.uang.amount)})
                  </span>
                </label>
                <input
                  type="number"
                  value={advancedInputs.hargaPerKg}
                  onChange={(e) =>
                    setAdvancedInputs({
                      ...advancedInputs,
                      hargaPerKg: e.target.value,
                    })
                  }
                  placeholder="Masukkan jumlah per jiwa"
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                />
              </div>
            )}

            {/* Zakat Calculation Result */}
            <div className="mt-4">
              <h4 className="font-medium text-gray-900 mb-2">
                Ringkasan Perhitungan
              </h4>
              <div className="space-y-1 text-sm text-rose-700">
                <div>
                  Zakat per jiwa:{" "}
                  {advancedInputs.jenisZakat === "uang"
                    ? formatCurrency(
                        advancedInputs.hargaPerKg
                          ? parseFloat(advancedInputs.hargaPerKg)
                          : zakatFitrahRates.uang.amount
                      )
                    : `${
                        zakatFitrahRates[
                          advancedInputs.jenisZakat as keyof typeof zakatFitrahRates
                        ].amount
                      } kg ${advancedInputs.jenisZakat} (${formatCurrency(
                        advancedInputs.hargaPerKg
                          ? parseFloat(advancedInputs.hargaPerKg) *
                              zakatFitrahRates[
                                advancedInputs.jenisZakat as keyof typeof zakatFitrahRates
                              ].amount
                          : zakatFitrahRates[
                              advancedInputs.jenisZakat as keyof typeof zakatFitrahRates
                            ].price *
                              zakatFitrahRates[
                                advancedInputs.jenisZakat as keyof typeof zakatFitrahRates
                              ].amount
                      )})`}
                </div>
                <div>
                  Total zakat untuk {advancedInputs.jumlahJiwa} jiwa:{" "}
                  {formatCurrency(currentZakat)}
                </div>
              </div>
            </div>
          </div>

          {/* Zakat Calculation Result */}
          <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-medium">
                Zakat fitrah yang harus dibayar:
              </span>
              <span className="text-xl font-bold text-emerald-800">
                {formatCurrency(currentZakat)}
              </span>
            </div>
            {/* ETH Conversion */}
            {currentZakat > 0 && (
              <div className="flex justify-between items-center pt-2 border-t border-emerald-200 mt-2">
                <span className="text-gray-700">Jumlah dalam ETH:</span>
                <div className="flex items-center">
                  {isLoadingEth ? (
                    <div className="h-4 w-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <span className="font-medium text-emerald-700">
                      {ethAmount} ETH
                    </span>
                  )}
                </div>
              </div>
            )}
            {ethPrice > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Kurs:</span>
                <span className="font-medium text-emerald-700">
                  1 ETH = {formatCurrency(ethPrice)}
                </span>
              </div>
            )}
            {currentZakat === 0 && (
              <p className="text-sm text-emerald-700 mt-2">
                Masukkan jumlah jiwa dalam keluarga untuk menghitung zakat
                fitrah
              </p>
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
                  Lembaga:{" "}
                  {organizations.find((o) => o.id === selectedOrg)?.name}
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
                  ? "bg-[#03533d] hover:bg-gray-900 text-white border border-b-4 border-gray-900"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Wallet className="w-5 h-5" />
              {!isConnected
                ? "Hubungkan Dompet untuk Membayar"
                : currentZakat === 0
                ? "Masukkan Data Keluarga"
                : !selectedOrg
                ? "Pilih Lembaga Penyalur"
                : isLoadingEth
                ? "Menghitung..."
                : `Bayar ${ethAmount} ETH`}
            </button>

            {!isConnected && (
              <p className="text-sm text-gray-500 mt-3 text-center">
                Anda perlu menghubungkan dompet Xellar untuk menyalurkan zakat
                fitrah
              </p>
            )}
          </div>
        </div>
        <FitrahInfo />
      </div>
    </div>
  );
}
