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
  const [advancedInputs, setAdvancedInputs] = useState({
    selectedTypes: [] as string[],
    perdagangan: { modal: "", keuntungan: "", hutang: "" },
    perusahaan: { aset: "", keuntungan: "", hutang: "" },
    properti: { nilai: "", pendapatan: "", biaya: "" },
    profesi: { gaji: "", bonus: "", tunjangan: "" },
    "emas-perak": { emas: "", perak: "", perhiasan: "" },
    investasi: { saham: "", reksadana: "", crypto: "", obligasi: "" },
  });

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

  const calculateSimpleZakat = () => {
    const amount = parseFloat(simpleAmount) || 0;
    if (amount >= nishab) {
      return amount * 0.025;
    }
    return 0;
  };

  const calculateAdvancedZakat = () => {
    let totalHarta = 0;

    // Calculate based on selected types
    advancedInputs.selectedTypes.forEach((type) => {
      switch (type) {
        case "perdagangan":
          const perdaganganTotal =
            (parseFloat(advancedInputs.perdagangan.modal) || 0) +
            (parseFloat(advancedInputs.perdagangan.keuntungan) || 0) -
            (parseFloat(advancedInputs.perdagangan.hutang) || 0);
          totalHarta += Math.max(0, perdaganganTotal);
          break;
        case "perusahaan":
          const perusahaanTotal =
            (parseFloat(advancedInputs.perusahaan.aset) || 0) +
            (parseFloat(advancedInputs.perusahaan.keuntungan) || 0) -
            (parseFloat(advancedInputs.perusahaan.hutang) || 0);
          totalHarta += Math.max(0, perusahaanTotal);
          break;
        case "properti":
          const propertiTotal =
            (parseFloat(advancedInputs.properti.nilai) || 0) +
            (parseFloat(advancedInputs.properti.pendapatan) || 0) -
            (parseFloat(advancedInputs.properti.biaya) || 0);
          totalHarta += Math.max(0, propertiTotal);
          break;
        case "profesi":
          const profesiTotal =
            (parseFloat(advancedInputs.profesi.gaji) || 0) +
            (parseFloat(advancedInputs.profesi.bonus) || 0) +
            (parseFloat(advancedInputs.profesi.tunjangan) || 0);
          totalHarta += profesiTotal;
          break;
        case "emas-perak":
          const emasPerakTotal =
            (parseFloat(advancedInputs["emas-perak"].emas) || 0) +
            (parseFloat(advancedInputs["emas-perak"].perak) || 0) +
            (parseFloat(advancedInputs["emas-perak"].perhiasan) || 0);
          totalHarta += emasPerakTotal;
          break;
        case "investasi":
          const investasiTotal =
            (parseFloat(advancedInputs.investasi.saham) || 0) +
            (parseFloat(advancedInputs.investasi.reksadana) || 0) +
            (parseFloat(advancedInputs.investasi.crypto) || 0) +
            (parseFloat(advancedInputs.investasi.obligasi) || 0);
          totalHarta += investasiTotal;
          break;
      }
    });

    if (totalHarta >= nishab) {
      return totalHarta * 0.025;
    }
    return 0;
  };

  const handleTypeSelection = (typeId: string) => {
    setAdvancedInputs((prev) => ({
      ...prev,
      selectedTypes: prev.selectedTypes.includes(typeId)
        ? prev.selectedTypes.filter((id) => id !== typeId)
        : [...prev.selectedTypes, typeId],
    }));
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
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
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
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
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

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl border border-gray-100 p-2">
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
                  Pilih jenis harta yang Anda miliki dan masukkan nilainya untuk
                  menghitung zakat secara otomatis.
                </p>
              </div>

              {/* Zakat Type Selection */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  Pilih Jenis Harta:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {zakatTypesEmas.map((type) => (
                    <label
                      key={type.id}
                      className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={advancedInputs.selectedTypes.includes(type.id)}
                        onChange={() => handleTypeSelection(type.id)}
                        className="mt-1 w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                      />
                      <div>
                        <span className="font-medium text-gray-900 text-sm">
                          {type.name}
                        </span>
                        <p className="text-xs text-gray-600">
                          {type.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Dynamic Input Forms */}
              {advancedInputs.selectedTypes.map((typeId) => {
                const type = zakatTypesEmas.find((t) => t.id === typeId);
                if (!type) return null;

                return (
                  <div key={typeId} className="p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-3">
                      {type.name}
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {typeId === "perdagangan" && (
                        <>
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">
                              Modal Usaha
                            </label>
                            <input
                              type="number"
                              value={advancedInputs.perdagangan.modal}
                              onChange={(e) =>
                                setAdvancedInputs((prev) => ({
                                  ...prev,
                                  perdagangan: {
                                    ...prev.perdagangan,
                                    modal: e.target.value,
                                  },
                                }))
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">
                              Keuntungan
                            </label>
                            <input
                              type="number"
                              value={advancedInputs.perdagangan.keuntungan}
                              onChange={(e) =>
                                setAdvancedInputs((prev) => ({
                                  ...prev,
                                  perdagangan: {
                                    ...prev.perdagangan,
                                    keuntungan: e.target.value,
                                  },
                                }))
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">
                              Hutang Usaha
                            </label>
                            <input
                              type="number"
                              value={advancedInputs.perdagangan.hutang}
                              onChange={(e) =>
                                setAdvancedInputs((prev) => ({
                                  ...prev,
                                  perdagangan: {
                                    ...prev.perdagangan,
                                    hutang: e.target.value,
                                  },
                                }))
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                              placeholder="0"
                            />
                          </div>
                        </>
                      )}
                      {typeId === "profesi" && (
                        <>
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">
                              Gaji Pokok
                            </label>
                            <input
                              type="number"
                              value={advancedInputs.profesi.gaji}
                              onChange={(e) =>
                                setAdvancedInputs((prev) => ({
                                  ...prev,
                                  profesi: {
                                    ...prev.profesi,
                                    gaji: e.target.value,
                                  },
                                }))
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">
                              Bonus/THR
                            </label>
                            <input
                              type="number"
                              value={advancedInputs.profesi.bonus}
                              onChange={(e) =>
                                setAdvancedInputs((prev) => ({
                                  ...prev,
                                  profesi: {
                                    ...prev.profesi,
                                    bonus: e.target.value,
                                  },
                                }))
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">
                              Tunjangan
                            </label>
                            <input
                              type="number"
                              value={advancedInputs.profesi.tunjangan}
                              onChange={(e) =>
                                setAdvancedInputs((prev) => ({
                                  ...prev,
                                  profesi: {
                                    ...prev.profesi,
                                    tunjangan: e.target.value,
                                  },
                                }))
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                              placeholder="0"
                            />
                          </div>
                        </>
                      )}
                      {/* Add similar input groups for other types */}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Zakat Calculation Result */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">
                Zakat yang harus dibayar:
              </span>
              <span className="text-xl font-bold text-yellow-800">
                {formatCurrency(currentZakat)}
              </span>
            </div>
            {currentZakat === 0 && (
              <p className="text-sm text-yellow-700 mt-2">
                {activeTab === "simple"
                  ? "Masukkan jumlah zakat yang akan dibayar"
                  : "Pilih jenis harta dan masukkan nilai untuk menghitung zakat"}
              </p>
            )}
          </div>

          {/* Payment Button */}
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
                Anda perlu menghubungkan dompet Xellar untuk menyalurkan zakat
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
