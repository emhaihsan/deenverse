"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Calculator,
  Zap,
  Wallet,
  Info,
  DollarSign,
  Users,
} from "lucide-react";
import { useAccount } from "wagmi";

export default function ZakatFitrahPage() {
  const [activeTab, setActiveTab] = useState<"simple" | "advanced">("simple");
  const [simpleAmount, setSimpleAmount] = useState("");
  const [advancedInputs, setAdvancedInputs] = useState({
    jumlahJiwa: "",
    jenisZakat: "beras", // beras, gandum, kurma, kismis, uang
    hargaPerKg: "",
    customAmount: "",
  });

  const { isConnected } = useAccount();

  // Standard rates for zakat fitrah
  const zakatFitrahRates = {
    beras: { amount: 2.5, unit: "kg", price: 15000 }, // Rp 15,000 per kg
    gandum: { amount: 2.5, unit: "kg", price: 20000 }, // Rp 20,000 per kg
    kurma: { amount: 2.5, unit: "kg", price: 80000 }, // Rp 80,000 per kg
    kismis: { amount: 2.5, unit: "kg", price: 100000 }, // Rp 100,000 per kg
    uang: { amount: 37500, unit: "rupiah", price: 1 }, // Equivalent to 2.5kg rice
  };

  const calculateSimpleZakat = () => {
    const amount = parseFloat(simpleAmount) || 0;
    return amount; // Simple mode: user enters the zakat amount directly
  };

  const calculateAdvancedZakat = () => {
    const jumlahJiwa = parseInt(advancedInputs.jumlahJiwa) || 0;
    const jenisZakat = advancedInputs.jenisZakat;

    if (jumlahJiwa === 0) return 0;

    if (jenisZakat === "uang") {
      // Use custom amount if provided, otherwise use standard rate
      const customAmount = parseFloat(advancedInputs.customAmount) || 0;
      if (customAmount > 0) {
        return jumlahJiwa * customAmount;
      } else {
        return jumlahJiwa * zakatFitrahRates.uang.amount;
      }
    } else {
      // Calculate based on food type
      const rate =
        zakatFitrahRates[jenisZakat as keyof typeof zakatFitrahRates];
      const hargaPerKg = parseFloat(advancedInputs.hargaPerKg) || rate.price;
      return jumlahJiwa * rate.amount * hargaPerKg;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const simpleZakat = calculateSimpleZakat();
  const advancedZakat = calculateAdvancedZakat();
  const currentZakat = activeTab === "simple" ? simpleZakat : advancedZakat;

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Navigation */}
        <div className="flex items-center gap-4">
          <Link
            href="/penyaluran/zakat"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Kembali ke Kategori Zakat</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200">
              <Heart className="w-8 h-8 text-rose-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Zakat Fitrah
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            2,5 kg beras/orang • Tidak ada nisab • Wajib setiap Ramadan
          </p>
        </div>

        {/* Nisab Information */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-rose-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-3">
                Tentang Zakat Fitrah
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                Zakat fitrah wajib bagi setiap Muslim menjelang Idul Fitri.
                Tidak ada nisab minimum, dan wajib dibayar untuk setiap jiwa
                dalam keluarga termasuk bayi yang baru lahir.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-3 bg-rose-50 rounded-lg">
                  <span className="font-medium text-rose-800">Nisab:</span>
                  <p className="text-rose-700">Tidak ada nisab</p>
                </div>
                <div className="p-3 bg-rose-50 rounded-lg">
                  <span className="font-medium text-rose-800">Kadar:</span>
                  <p className="text-rose-700">2,5 kg makanan pokok</p>
                </div>
                <div className="p-3 bg-rose-50 rounded-lg">
                  <span className="font-medium text-rose-800">Waktu:</span>
                  <p className="text-rose-700">Sebelum shalat Idul Fitri</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Zakat Fitrah Options */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Pilihan Zakat Fitrah
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(zakatFitrahRates).map(([key, rate]) => (
              <div key={key} className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 capitalize mb-2">
                  {key}
                </h4>
                <div className="text-sm text-gray-600">
                  <p>
                    {rate.amount} {rate.unit} per jiwa
                  </p>
                  <p className="font-medium text-gray-900 mt-1">
                    ≈ {formatCurrency(rate.amount * rate.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl border border-gray-100 p-2">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("simple")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                activeTab === "simple"
                  ? "bg-rose-100 text-rose-800 border border-rose-200"
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
                  ? "bg-rose-100 text-rose-800 border border-rose-200"
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
                  Jika Anda sudah mengetahui jumlah zakat fitrah yang harus
                  dibayar, masukkan langsung di sini.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah Zakat Fitrah yang Akan Dibayar
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={simpleAmount}
                    onChange={(e) => setSimpleAmount(e.target.value)}
                    placeholder="Masukkan jumlah dalam Rupiah"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  />
                </div>
                {simpleAmount && parseFloat(simpleAmount) > 0 && (
                  <p className="text-sm text-gray-500 mt-2">
                    Jumlah yang akan dibayar:{" "}
                    {formatCurrency(parseFloat(simpleAmount))}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Kalkulator Advanced
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Masukkan jumlah jiwa dalam keluarga dan pilih jenis zakat
                  fitrah untuk menghitung secara otomatis.
                </p>
              </div>

              {/* Number of People */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah Jiwa dalam Keluarga
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={advancedInputs.jumlahJiwa}
                    onChange={(e) =>
                      setAdvancedInputs((prev) => ({
                        ...prev,
                        jumlahJiwa: e.target.value,
                      }))
                    }
                    placeholder="Masukkan jumlah jiwa"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    min="1"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Termasuk bayi yang baru lahir sebelum Idul Fitri
                </p>
              </div>

              {/* Type of Zakat Fitrah */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jenis Zakat Fitrah
                </label>
                <select
                  value={advancedInputs.jenisZakat}
                  onChange={(e) =>
                    setAdvancedInputs((prev) => ({
                      ...prev,
                      jenisZakat: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                >
                  <option value="beras">Beras (2,5 kg)</option>
                  <option value="gandum">Gandum (2,5 kg)</option>
                  <option value="kurma">Kurma (2,5 kg)</option>
                  <option value="kismis">Kismis (2,5 kg)</option>
                  <option value="uang">Uang (setara nilai makanan)</option>
                </select>
              </div>

              {/* Price per kg (for food types) */}
              {advancedInputs.jenisZakat !== "uang" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Harga per kg (Rp)
                  </label>
                  <input
                    type="number"
                    value={advancedInputs.hargaPerKg}
                    onChange={(e) =>
                      setAdvancedInputs((prev) => ({
                        ...prev,
                        hargaPerKg: e.target.value,
                      }))
                    }
                    placeholder={`Harga standar: ${zakatFitrahRates[
                      advancedInputs.jenisZakat as keyof typeof zakatFitrahRates
                    ]?.price.toLocaleString()}`}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Kosongkan untuk menggunakan harga standar
                  </p>
                </div>
              )}

              {/* Custom amount for money */}
              {advancedInputs.jenisZakat === "uang" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jumlah per Jiwa (Rp)
                  </label>
                  <input
                    type="number"
                    value={advancedInputs.customAmount}
                    onChange={(e) =>
                      setAdvancedInputs((prev) => ({
                        ...prev,
                        customAmount: e.target.value,
                      }))
                    }
                    placeholder={`Standar: ${zakatFitrahRates.uang.amount.toLocaleString()}`}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Kosongkan untuk menggunakan nilai standar (setara 2,5 kg
                    beras)
                  </p>
                </div>
              )}

              {/* Calculation Summary */}
              {parseInt(advancedInputs.jumlahJiwa) > 0 && (
                <div className="p-4 bg-rose-50 rounded-lg border border-rose-200">
                  <h4 className="font-medium text-rose-800 mb-2">
                    Ringkasan Perhitungan
                  </h4>
                  <div className="space-y-1 text-sm text-rose-700">
                    <p>Jumlah jiwa: {advancedInputs.jumlahJiwa} orang</p>
                    <p>Jenis zakat: {advancedInputs.jenisZakat}</p>
                    {advancedInputs.jenisZakat !== "uang" && (
                      <>
                        <p>
                          Jumlah total:{" "}
                          {parseFloat(advancedInputs.jumlahJiwa) * 2.5} kg
                        </p>
                        <p>
                          Harga per kg:{" "}
                          {formatCurrency(
                            parseFloat(advancedInputs.hargaPerKg) ||
                              zakatFitrahRates[
                                advancedInputs.jenisZakat as keyof typeof zakatFitrahRates
                              ]?.price
                          )}
                        </p>
                      </>
                    )}
                    {advancedInputs.jenisZakat === "uang" && (
                      <p>
                        Jumlah per jiwa:{" "}
                        {formatCurrency(
                          parseFloat(advancedInputs.customAmount) ||
                            zakatFitrahRates.uang.amount
                        )}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Zakat Calculation Result */}
          <div className="mt-6 p-4 bg-rose-50 rounded-lg border border-rose-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">
                Zakat fitrah yang harus dibayar:
              </span>
              <span className="text-xl font-bold text-rose-800">
                {formatCurrency(currentZakat)}
              </span>
            </div>
            {currentZakat === 0 && (
              <p className="text-sm text-rose-700 mt-2">
                {activeTab === "simple"
                  ? "Masukkan jumlah zakat fitrah yang akan dibayar"
                  : "Masukkan jumlah jiwa dalam keluarga untuk menghitung zakat fitrah"}
              </p>
            )}
          </div>

          {/* Important Notes */}
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">
              📝 Catatan Penting
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Zakat fitrah wajib dibayar sebelum shalat Idul Fitri</li>
              <li>
                • Boleh dibayar sejak awal Ramadan hingga sebelum shalat Id
              </li>
              <li>• Wajib untuk setiap jiwa, termasuk bayi yang baru lahir</li>
              <li>• Lebih utama dibayar dalam bentuk makanan pokok</li>
            </ul>
          </div>

          {/* Payment Button */}
          <div className="mt-6">
            <button
              disabled={!isConnected || currentZakat === 0}
              className={`w-full py-4 px-6 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                isConnected && currentZakat > 0
                  ? "bg-rose-600 hover:bg-rose-700 text-white shadow-lg hover:shadow-xl"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Wallet className="w-5 h-5" />
              {!isConnected
                ? "Hubungkan Dompet untuk Membayar"
                : currentZakat === 0
                ? "Masukkan Data Keluarga"
                : `Bayar Zakat Fitrah ${formatCurrency(currentZakat)}`}
            </button>

            {!isConnected && (
              <p className="text-sm text-gray-500 mt-3 text-center">
                Anda perlu menghubungkan dompet Xellar untuk menyalurkan zakat
                fitrah
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
