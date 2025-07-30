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

export default function FidyahPenyaluranPage() {
  const { isConnected } = useAccount();
  const [daysCount, setDaysCount] = useState<number>(0);
  const [paymentType, setPaymentType] = useState<"rice" | "money">("rice");
  const [ricePrice, setRicePrice] = useState<number>(15000); // Default rice price per kg
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);

  // Calculate fidyah amount
  useEffect(() => {
    const mudInKg = 0.65; // 1 mud ≈ 650 gram
    const totalRice = daysCount * mudInKg;
    const cost = totalRice * ricePrice;

    setTotalAmount(totalRice);
    setTotalCost(cost);
  }, [daysCount, ricePrice]);

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
            {/* Preset Days */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Pilih Cepat (Hari)
              </label>
              <div className="grid grid-cols-4 gap-2">
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
                    {days} hari
                  </button>
                ))}
              </div>
            </div>

            {/* Manual Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jumlah Hari Puasa yang Terlewat
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

            {/* Payment Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Jenis Pembayaran
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentType("rice")}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    paymentType === "rice"
                      ? "border-amber-500 bg-amber-50 text-amber-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-center">
                    <Wheat className="w-6 h-6 mx-auto mb-2 text-amber-600" />
                    <div className="font-medium">Beras</div>
                    <div className="text-sm text-gray-500">1 mud per hari</div>
                  </div>
                </button>
                <button
                  onClick={() => setPaymentType("money")}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    paymentType === "money"
                      ? "border-amber-500 bg-amber-50 text-amber-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-center">
                    <Wallet className="w-6 h-6 mx-auto mb-2 text-amber-600" />
                    <div className="font-medium">Uang</div>
                    <div className="text-sm text-gray-500">
                      Setara harga beras
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Rice Price Input (only show if money is selected) */}
            {paymentType === "money" && (
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
            )}

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
                {paymentType === "money" && (
                  <div className="flex justify-between items-center pt-2 border-t border-amber-200">
                    <span className="text-gray-700 font-medium">
                      Total Biaya:
                    </span>
                    <span className="text-lg font-semibold text-amber-600">
                      {formatCurrency(totalCost)}
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
          {daysCount > 0 && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-900 mb-2">
                Ringkasan Pembayaran
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div>Jumlah hari: {daysCount} hari</div>
                <div>
                  Jenis pembayaran: {paymentType === "rice" ? "Beras" : "Uang"}
                </div>
                <div>
                  Total:{" "}
                  {paymentType === "rice"
                    ? `${totalAmount.toFixed(2)} kg beras`
                    : formatCurrency(totalCost)}
                </div>
              </div>
            </div>
          )}

          {/* Payment Button */}
          <button
            disabled={!isConnected || daysCount === 0}
            className={`w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 ${
              isConnected && daysCount > 0
                ? "bg-amber-600 hover:bg-amber-700 text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Wallet className="w-5 h-5" />
            {!isConnected
              ? "Hubungkan Dompet untuk Membayar"
              : daysCount === 0
              ? "Masukkan Jumlah Hari untuk Membayar"
              : "Bayar Fidyah Sekarang"}
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
