"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Wheat,
  Wallet,
  Info,
  Calculator,
  Heart,
} from "lucide-react";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  convertIdrToEth,
  formatEth,
  getEthereumPrice,
} from "@/lib/api/cryptoPrice";
import organizations from "@/data/destinationOrg";

export default function FidyahPenyaluranPage() {
  const { isConnected } = useAccount();
  const [daysCount, setDaysCount] = useState<number>(0);
  const [ricePrice, setRicePrice] = useState<number>(15000); // Default rice price per kg
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [selectedOrg, setSelectedOrg] = useState<string>("");
  const [ethAmount, setEthAmount] = useState<string>("0");
  const [isLoadingEth, setIsLoadingEth] = useState<boolean>(false);
  const [ethPrice, setEthPrice] = useState<number>(0);

  // Calculate fidyah amount
  useEffect(() => {
    const mudInKg = 0.65; // 1 mud ≈ 650 gram
    const totalRice = daysCount * mudInKg;
    const cost = totalRice * ricePrice;

    setTotalAmount(totalRice);
    setTotalCost(cost);
  }, [daysCount, ricePrice]);

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

  // Convert IDR to ETH when totalCost changes
  useEffect(() => {
    const convertToEth = async () => {
      if (totalCost > 0) {
        setIsLoadingEth(true);
        try {
          const eth = await convertIdrToEth(totalCost);
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
  }, [totalCost]);

  const presetDays = [1, 7, 15, 30];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Navigation */}
        <div className="flex items-center gap-4">
          <Link
            href="/penyaluran"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Kembali ke Penyaluran</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-amber-50 rounded-2xl">
              <Wheat className="w-8 h-8 text-amber-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Pembayaran Fidyah
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Bayar fidyah puasa Anda secara transparan dan aman menggunakan
            teknologi blockchain
          </p>
        </div>

        {/* Educational Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-start gap-4 mb-4">
            <Info className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-3">
                Tentang Fidyah
              </h2>
              <div className="text-gray-600 space-y-3 text-sm">
                <p>
                  <strong>Fidyah</strong> adalah denda yang wajib dibayar oleh
                  seseorang yang tidak dapat melaksanakan puasa Ramadhan karena
                  alasan syar'i yang permanen, seperti:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Orang tua yang sudah sangat lemah</li>
                  <li>Orang sakit yang tidak ada harapan sembuh</li>
                  <li>
                    Ibu hamil atau menyusui yang khawatir pada dirinya atau
                    bayinya
                  </li>
                </ul>
                <p>
                  <strong>Besaran fidyah:</strong> 1 mud (sekitar 650 gram)
                  makanan pokok per hari puasa yang tidak dapat dilaksanakan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Organization Selection */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-amber-600" />
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
                    ? "border-amber-500 bg-amber-50"
                    : "border-gray-200 hover:border-amber-300"
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

        {/* Fidyah Calculator */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="w-6 h-6 text-amber-600" />
            <h2 className="text-xl font-medium text-gray-900">
              Kalkulator Fidyah
            </h2>
          </div>
          <p className="text-gray-600 mb-6">
            Hitung jumlah fidyah yang perlu Anda bayar
          </p>

          <div className="space-y-6">
            {/* Days Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Jumlah Hari Puasa yang Terlewat
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {presetDays.map((days) => (
                  <button
                    key={days}
                    onClick={() => setDaysCount(days)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      daysCount === days
                        ? "bg-amber-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {days} Hari
                  </button>
                ))}
              </div>
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Atau Masukkan Jumlah Hari
                </label>
                <input
                  type="number"
                  min="0"
                  value={daysCount || ""}
                  onChange={(e) => setDaysCount(parseInt(e.target.value) || 0)}
                  placeholder="Masukkan jumlah hari"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>

            {/* Rice Price Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Harga Beras per Kg (IDR)
              </label>
              <input
                type="number"
                min="0"
                value={ricePrice || ""}
                onChange={(e) => setRicePrice(parseInt(e.target.value) || 0)}
                placeholder="Masukkan harga beras per kg"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            {/* Calculation Result */}
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Jumlah Hari:</span>
                  <span className="font-medium text-amber-700">
                    {daysCount} hari
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total Beras:</span>
                  <span className="font-medium text-amber-700">
                    {totalAmount.toFixed(2)} kg
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-amber-200">
                  <span className="text-gray-700 font-medium">
                    Total Biaya:
                  </span>
                  <span className="text-lg font-semibold text-amber-600">
                    {formatCurrency(totalCost)}
                  </span>
                </div>
                {/* ETH Conversion */}
                {totalCost > 0 && (
                  <div className="flex justify-between items-center pt-2 border-t border-amber-200">
                    <span className="text-gray-700">Jumlah dalam ETH:</span>
                    <div className="flex items-center">
                      {isLoadingEth ? (
                        <div className="h-4 w-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mr-2" />
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
                    <span className="font-medium text-amber-700">
                      1 ETH = {formatCurrency(ethPrice)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-amber-600" />
            <h2 className="text-xl font-medium text-gray-900">
              Pembayaran Fidyah
            </h2>
          </div>
          <p className="text-gray-600 mb-6">
            Bayar fidyah Anda secara on-chain dengan aman dan transparan
          </p>

          {/* Summary */}
          {daysCount > 0 && selectedOrg && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-900 mb-2">
                Ringkasan Pembayaran
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div>
                  Lembaga:{" "}
                  {organizations.find((o) => o.id === selectedOrg)?.name}
                </div>
                <div>Jumlah hari: {daysCount} hari</div>
                <div>Total: {formatCurrency(totalCost)}</div>
                <div>ETH: {ethAmount} ETH</div>
              </div>
            </div>
          )}

          {/* Payment Button */}
          <button
            disabled={!isConnected || daysCount === 0 || !selectedOrg}
            className={`w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 ${
              isConnected && daysCount > 0 && selectedOrg
                ? "bg-amber-600 hover:bg-amber-700 text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Wallet className="w-5 h-5" />
            {!isConnected
              ? "Hubungkan Dompet untuk Membayar"
              : daysCount === 0
              ? "Masukkan Jumlah Hari untuk Membayar"
              : !selectedOrg
              ? "Pilih Lembaga Penyalur"
              : isLoadingEth
              ? "Menghitung..."
              : `Bayar ${ethAmount} ETH`}
          </button>

          {!isConnected && (
            <p className="text-sm text-gray-500 mt-3 text-center">
              Anda perlu menghubungkan dompet Xellar untuk membayar fidyah
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
