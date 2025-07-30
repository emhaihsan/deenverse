"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Wheat,
  Calculator,
  Zap,
  Wallet,
  Info,
  DollarSign,
} from "lucide-react";
import { useAccount } from "wagmi";

const zakatTypesPertanian = [
  {
    id: "tanaman-pangan",
    name: "Zakat Tanaman Pangan",
    description: "Padi, jagung, gandum, dan biji-bijian",
  },
  {
    id: "tanaman-produktif",
    name: "Zakat Tanaman Produktif",
    description: "Kurma, zaitun, kebun buah",
  },
  {
    id: "tambak",
    name: "Zakat Tambak",
    description: "Ikan, udang, bandeng, dan hasil perikanan",
  },
];

export default function NisabPertanianPage() {
  const [activeTab, setActiveTab] = useState<"simple" | "advanced">("simple");
  const [simpleAmount, setSimpleAmount] = useState("");
  const [advancedInputs, setAdvancedInputs] = useState({
    selectedTypes: [] as string[],
    "tanaman-pangan": {
      jenis: "",
      hasil: "",
      harga: "",
      pengairan: "alami", // alami (10%) atau berbiaya (5%)
      biayaProduksi: "",
    },
    "tanaman-produktif": {
      jenis: "",
      hasil: "",
      harga: "",
      pengairan: "alami",
      biayaProduksi: "",
    },
    tambak: {
      jenis: "",
      hasil: "",
      harga: "",
      biayaOperasional: "",
      biayaPakan: "",
    },
  });

  const { isConnected } = useAccount();

  const nisabPertanian = 520; // 520 kg beras
  const hargaBerasPerKg = 15000; // Rp 15,000 per kg (estimasi)
  const nisabRupiah = nisabPertanian * hargaBerasPerKg; // Rp 7,800,000

  const calculateSimpleZakat = () => {
    const amount = parseFloat(simpleAmount) || 0;
    return amount; // Simple mode: user enters the zakat amount directly
  };

  const calculateAdvancedZakat = () => {
    let totalZakat = 0;

    advancedInputs.selectedTypes.forEach((type) => {
      switch (type) {
        case "tanaman-pangan":
          const panenPangan =
            parseFloat(advancedInputs["tanaman-pangan"].hasil) || 0;
          const hargaPangan =
            parseFloat(advancedInputs["tanaman-pangan"].harga) || 0;
          const biayaPangan =
            parseFloat(advancedInputs["tanaman-pangan"].biayaProduksi) || 0;
          const nilaiPangan = panenPangan * hargaPangan - biayaPangan;

          if (panenPangan >= nisabPertanian) {
            const kadar =
              advancedInputs["tanaman-pangan"].pengairan === "alami"
                ? 0.1
                : 0.05;
            totalZakat += nilaiPangan * kadar;
          }
          break;

        case "tanaman-produktif":
          const panenProduktif =
            parseFloat(advancedInputs["tanaman-produktif"].hasil) || 0;
          const hargaProduktif =
            parseFloat(advancedInputs["tanaman-produktif"].harga) || 0;
          const biayaProduktif =
            parseFloat(advancedInputs["tanaman-produktif"].biayaProduksi) || 0;
          const nilaiProduktif =
            panenProduktif * hargaProduktif - biayaProduktif;

          // Convert to rice equivalent for nisab calculation
          const equivalentBeras = nilaiProduktif / hargaBerasPerKg;
          if (equivalentBeras >= nisabPertanian) {
            const kadar =
              advancedInputs["tanaman-produktif"].pengairan === "alami"
                ? 0.1
                : 0.05;
            totalZakat += nilaiProduktif * kadar;
          }
          break;

        case "tambak":
          const panenTambak = parseFloat(advancedInputs.tambak.hasil) || 0;
          const hargaTambak = parseFloat(advancedInputs.tambak.harga) || 0;
          const biayaOperasional =
            parseFloat(advancedInputs.tambak.biayaOperasional) || 0;
          const biayaPakan = parseFloat(advancedInputs.tambak.biayaPakan) || 0;
          const nilaiTambak =
            panenTambak * hargaTambak - biayaOperasional - biayaPakan;

          // Convert to rice equivalent for nisab calculation
          const equivalentBerasTambak = nilaiTambak / hargaBerasPerKg;
          if (equivalentBerasTambak >= nisabPertanian) {
            // Tambak usually uses 5% (considered as irrigated/berbiaya)
            totalZakat += nilaiTambak * 0.05;
          }
          break;
      }
    });

    return Math.max(0, totalZakat);
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
            <div className="p-3 bg-green-50 rounded-2xl border border-green-200">
              <Wheat className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Nisab Pertanian
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            653 kg gabah ≈ 520 kg beras • Kadar 5%/10% • Setiap panen
          </p>
        </div>

        {/* Nisab Information */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-3">
                Tentang Nisab Pertanian
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                Hasil bumi dan produksi pertanian/perikanan. Sesama hasil bumi
                bisa digabung untuk mencapai nisab, tetapi tidak bisa digabung
                dengan zakat mal (nisab emas).
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-green-800">Nisab:</span>
                  <p className="text-green-700">
                    520 kg beras ≈ {formatCurrency(nisabRupiah)}
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-green-800">Kadar:</span>
                  <p className="text-green-700">5% (berbiaya) / 10% (alami)</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-green-800">Haul:</span>
                  <p className="text-green-700">Setiap panen</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl border border-gray-100 p-2">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("simple")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                activeTab === "simple"
                  ? "bg-green-100 text-green-800 border border-green-200"
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
                  ? "bg-green-100 text-green-800 border border-green-200"
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
                  Jika Anda sudah mengetahui jumlah zakat pertanian yang harus
                  dibayar, masukkan langsung di sini.
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                  Pilih jenis hasil pertanian/perikanan dan masukkan data panen
                  untuk menghitung zakat secara otomatis.
                </p>
              </div>

              {/* Zakat Type Selection */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  Pilih Jenis Hasil Pertanian:
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {zakatTypesPertanian.map((type) => (
                    <label
                      key={type.id}
                      className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={advancedInputs.selectedTypes.includes(type.id)}
                        onChange={() => handleTypeSelection(type.id)}
                        className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
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
                const type = zakatTypesPertanian.find((t) => t.id === typeId);
                if (!type) return null;

                return (
                  <div key={typeId} className="p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-3">
                      {type.name}
                    </h5>

                    {(typeId === "tanaman-pangan" ||
                      typeId === "tanaman-produktif") && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">
                              Jenis Tanaman
                            </label>
                            <input
                              type="text"
                              value={
                                advancedInputs[
                                  typeId as keyof typeof advancedInputs
                                ].jenis
                              }
                              onChange={(e) =>
                                setAdvancedInputs((prev) => ({
                                  ...prev,
                                  [typeId]: {
                                    ...prev[typeId as keyof typeof prev],
                                    jenis: e.target.value,
                                  },
                                }))
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                              placeholder="Contoh: Padi, Jagung, Kurma"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">
                              Hasil Panen (kg)
                            </label>
                            <input
                              type="number"
                              value={
                                advancedInputs[
                                  typeId as keyof typeof advancedInputs
                                ].hasil
                              }
                              onChange={(e) =>
                                setAdvancedInputs((prev) => ({
                                  ...prev,
                                  [typeId]: {
                                    ...prev[typeId as keyof typeof prev],
                                    hasil: e.target.value,
                                  },
                                }))
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                              placeholder="0"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">
                              Harga per kg
                            </label>
                            <input
                              type="number"
                              value={
                                advancedInputs[
                                  typeId as keyof typeof advancedInputs
                                ].harga
                              }
                              onChange={(e) =>
                                setAdvancedInputs((prev) => ({
                                  ...prev,
                                  [typeId]: {
                                    ...prev[typeId as keyof typeof prev],
                                    harga: e.target.value,
                                  },
                                }))
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">
                              Sistem Pengairan
                            </label>
                            <select
                              value={
                                advancedInputs[
                                  typeId as keyof typeof advancedInputs
                                ].pengairan
                              }
                              onChange={(e) =>
                                setAdvancedInputs((prev) => ({
                                  ...prev,
                                  [typeId]: {
                                    ...prev[typeId as keyof typeof prev],
                                    pengairan: e.target.value,
                                  },
                                }))
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                            >
                              <option value="alami">Alami (10%)</option>
                              <option value="berbiaya">Berbiaya (5%)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">
                              Biaya Produksi
                            </label>
                            <input
                              type="number"
                              value={
                                advancedInputs[
                                  typeId as keyof typeof advancedInputs
                                ].biayaProduksi
                              }
                              onChange={(e) =>
                                setAdvancedInputs((prev) => ({
                                  ...prev,
                                  [typeId]: {
                                    ...prev[typeId as keyof typeof prev],
                                    biayaProduksi: e.target.value,
                                  },
                                }))
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                              placeholder="0"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {typeId === "tambak" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">
                              Jenis Ikan/Udang
                            </label>
                            <input
                              type="text"
                              value={advancedInputs.tambak.jenis}
                              onChange={(e) =>
                                setAdvancedInputs((prev) => ({
                                  ...prev,
                                  tambak: {
                                    ...prev.tambak,
                                    jenis: e.target.value,
                                  },
                                }))
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                              placeholder="Contoh: Lele, Udang, Bandeng"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">
                              Hasil Panen (kg)
                            </label>
                            <input
                              type="number"
                              value={advancedInputs.tambak.hasil}
                              onChange={(e) =>
                                setAdvancedInputs((prev) => ({
                                  ...prev,
                                  tambak: {
                                    ...prev.tambak,
                                    hasil: e.target.value,
                                  },
                                }))
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                              placeholder="0"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">
                              Harga per kg
                            </label>
                            <input
                              type="number"
                              value={advancedInputs.tambak.harga}
                              onChange={(e) =>
                                setAdvancedInputs((prev) => ({
                                  ...prev,
                                  tambak: {
                                    ...prev.tambak,
                                    harga: e.target.value,
                                  },
                                }))
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">
                              Biaya Operasional
                            </label>
                            <input
                              type="number"
                              value={advancedInputs.tambak.biayaOperasional}
                              onChange={(e) =>
                                setAdvancedInputs((prev) => ({
                                  ...prev,
                                  tambak: {
                                    ...prev.tambak,
                                    biayaOperasional: e.target.value,
                                  },
                                }))
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">
                              Biaya Pakan
                            </label>
                            <input
                              type="number"
                              value={advancedInputs.tambak.biayaPakan}
                              onChange={(e) =>
                                setAdvancedInputs((prev) => ({
                                  ...prev,
                                  tambak: {
                                    ...prev.tambak,
                                    biayaPakan: e.target.value,
                                  },
                                }))
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                              placeholder="0"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Zakat Calculation Result */}
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">
                Zakat yang harus dibayar:
              </span>
              <span className="text-xl font-bold text-green-800">
                {formatCurrency(currentZakat)}
              </span>
            </div>
            {currentZakat === 0 && (
              <p className="text-sm text-green-700 mt-2">
                {activeTab === "simple"
                  ? "Masukkan jumlah zakat yang akan dibayar"
                  : "Pilih jenis hasil pertanian dan masukkan data panen untuk menghitung zakat"}
              </p>
            )}
          </div>

          {/* Payment Button */}
          <div className="mt-6">
            <button
              disabled={!isConnected || currentZakat === 0}
              className={`w-full py-4 px-6 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                isConnected && currentZakat > 0
                  ? "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Wallet className="w-5 h-5" />
              {!isConnected
                ? "Hubungkan Dompet untuk Membayar"
                : currentZakat === 0
                ? "Masukkan Data Panen"
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
