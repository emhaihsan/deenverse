"use client";

import { useState, useEffect } from "react";
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
import Image from "next/image";
import {
  convertIdrToEth,
  formatEth,
  getEthereumPrice,
} from "@/lib/api/cryptoPrice";
import organizations from "@/data/destinationOrg";

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
                Zakat fitrah adalah zakat yang wajib dikeluarkan setiap muslim
                menjelang akhir bulan Ramadan, sebelum shalat Idul Fitri.
                Besarnya zakat fitrah adalah 2,5 kg beras atau makanan pokok
                setara per jiwa.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Syarat Wajib:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                    <li>Muslim</li>
                    <li>Merdeka (bukan budak)</li>
                    <li>Mampu (punya harta melebihi kebutuhan pokok)</li>
                    <li>Berada di tempat yang berbeda waktu (musafir)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Waktu Pembayaran:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                    <li>Mulai dari awal Ramadan</li>
                    <li>Sebelum shalat Idul Fitri</li>
                    <li>Lebih utama malam takbiran</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Organization Selection */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-rose-600" />
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
        </div>

        {/* Zakat Calculator */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-6 h-6 text-rose-600" />
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
                        ? "border-rose-500 bg-rose-50 text-rose-700"
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
          <div className="mt-6 p-4 bg-rose-50 rounded-lg border border-rose-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">
                Zakat fitrah yang harus dibayar:
              </span>
              <span className="text-xl font-bold text-rose-800">
                {formatCurrency(currentZakat)}
              </span>
            </div>
            {/* ETH Conversion */}
            {currentZakat > 0 && (
              <div className="flex justify-between items-center pt-2 border-t border-rose-200 mt-2">
                <span className="text-gray-700">Jumlah dalam ETH:</span>
                <div className="flex items-center">
                  {isLoadingEth ? (
                    <div className="h-4 w-4 border-2 border-rose-600 border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <span className="font-medium text-purple-600">
                      {ethAmount} ETH
                    </span>
                  )}
                </div>
              </div>
            )}
            {ethPrice > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Kurs:</span>
                <span className="font-medium text-rose-700">
                  1 ETH = {formatCurrency(ethPrice)}
                </span>
              </div>
            )}
            {currentZakat === 0 && (
              <p className="text-sm text-rose-700 mt-2">
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
              disabled={!isConnected || currentZakat === 0 || !selectedOrg}
              className={`w-full py-4 px-6 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                isConnected && currentZakat > 0 && selectedOrg
                  ? "bg-rose-600 hover:bg-rose-700 text-white shadow-lg hover:shadow-xl"
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
      </div>
    </div>
  );
}
