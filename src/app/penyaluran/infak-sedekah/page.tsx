"use client";

import Link from "next/link";
import {
  ArrowLeft,
  HeartHandshake,
  Wallet,
  Info,
  Gift,
  Users,
  BookOpen,
  Heart,
} from "lucide-react";
import { useAccount } from "wagmi";
import { useState } from "react";

export default function InfakSedekahPenyaluranPage() {
  const { isConnected } = useAccount();
  const [donationType, setDonationType] = useState<
    "infaq" | "sedekah" | "sedekah_jariyah"
  >("infaq");
  const [targetCategory, setTargetCategory] = useState<string>("fakir_miskin");
  const [amount, setAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const presetAmounts = [50000, 100000, 250000, 500000, 1000000];

  const donationTypes = [
    {
      id: "infaq" as const,
      title: "Infaq",
      description: "Memberikan harta di jalan Allah tanpa batasan waktu",
      icon: Gift,
      color: "bg-blue-50 border-blue-200 text-blue-700",
    },
    {
      id: "sedekah" as const,
      title: "Sedekah",
      description: "Pemberian sukarela untuk membantu sesama",
      icon: Heart,
      color: "bg-green-50 border-green-200 text-green-700",
    },
    {
      id: "sedekah_jariyah" as const,
      title: "Sedekah Jariyah",
      description: "Sedekah yang pahalanya terus mengalir",
      icon: BookOpen,
      color: "bg-purple-50 border-purple-200 text-purple-700",
    },
  ];

  const targetCategories = [
    {
      id: "fakir_miskin",
      label: "Fakir Miskin",
      description: "Membantu yang membutuhkan",
    },
    {
      id: "yatim_piatu",
      label: "Yatim Piatu",
      description: "Mendukung anak-anak yatim",
    },
    {
      id: "janda_anak",
      label: "Janda dan Anak-Anak",
      description: "Membantu keluarga yang kesulitan",
    },
    {
      id: "pendidikan",
      label: "Santri dan Pendidikan",
      description: "Mendukung pendidikan Islam",
    },
    {
      id: "kemanusiaan",
      label: "Kemanusiaan",
      description: "Bantuan kemanusiaan umum",
    },
    {
      id: "masjid",
      label: "Pembangunan Masjid",
      description: "Mendukung pembangunan tempat ibadah",
    },
    { id: "lainnya", label: "Lainnya", description: "Tujuan khusus lainnya" },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const numValue = parseInt(value.replace(/\D/g, "")) || 0;
    setAmount(numValue);
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
            <div className="p-3 bg-blue-50 rounded-2xl">
              <HeartHandshake className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Penyaluran Infaq & Sedekah
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Salurkan infaq dan sedekah Anda secara transparan dan aman
            menggunakan teknologi blockchain
          </p>
        </div>

        {/* Educational Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-start gap-4 mb-4">
            <Info className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-3">
                Tentang Infaq & Sedekah
              </h2>
              <div className="text-gray-600 space-y-3 text-sm">
                <p>
                  <strong>Infaq</strong> adalah mengeluarkan sebagian harta yang
                  dimiliki untuk kepentingan yang diperintahkan Allah SWT.
                </p>
                <p>
                  <strong>Sedekah</strong> adalah pemberian sukarela kepada
                  orang lain tanpa mengharapkan imbalan, semata-mata karena
                  Allah SWT.
                </p>
                <p>
                  <strong>Sedekah Jariyah</strong> adalah sedekah yang pahalanya
                  terus mengalir meski pemberi sudah meninggal, seperti
                  membangun masjid, sekolah, atau sumur.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Donation Type Selection */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">
            Pilih Jenis Penyaluran
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {donationTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setDonationType(type.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    donationType === type.id
                      ? type.color
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-center">
                    <IconComponent className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                    <div className="font-medium text-gray-900 mb-1">
                      {type.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {type.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Target Category */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">
            Tujuan Penyaluran
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {targetCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setTargetCategory(category.id)}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  targetCategory === category.id
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="font-medium">{category.label}</div>
                <div className="text-sm text-gray-500">
                  {category.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Amount Selection */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">
            Jumlah Penyaluran
          </h2>

          {/* Preset Amounts */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Pilih Jumlah Cepat
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {presetAmounts.map((presetAmount) => (
                <button
                  key={presetAmount}
                  onClick={() => handleAmountSelect(presetAmount)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    amount === presetAmount && !customAmount
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {formatCurrency(presetAmount)}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Atau Masukkan Jumlah Sendiri
            </label>
            <input
              type="text"
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              placeholder="Masukkan jumlah (IDR)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {amount > 0 && (
              <p className="text-sm text-gray-500 mt-1">
                Jumlah: {formatCurrency(amount)}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">
            Catatan (Opsional)
          </h2>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tambahkan doa atau pesan khusus untuk penyaluran Anda"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Payment Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-medium text-gray-900">
              Konfirmasi Penyaluran
            </h2>
          </div>

          {/* Summary */}
          {amount > 0 && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-900 mb-3">
                Ringkasan Penyaluran
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Jenis:</span>
                  <span className="font-medium">
                    {donationTypes.find((t) => t.id === donationType)?.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tujuan:</span>
                  <span className="font-medium">
                    {
                      targetCategories.find((c) => c.id === targetCategory)
                        ?.label
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Jumlah:</span>
                  <span className="font-medium text-blue-600">
                    {formatCurrency(amount)}
                  </span>
                </div>
                {description && (
                  <div className="pt-2 border-t border-gray-200">
                    <span className="text-gray-500">Catatan:</span>
                    <p className="mt-1 text-gray-700">{description}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <p className="text-gray-600 mb-6">
            Salurkan{" "}
            {donationTypes
              .find((t) => t.id === donationType)
              ?.title.toLowerCase()}{" "}
            Anda secara on-chain dengan aman dan transparan
          </p>

          {/* Payment Button */}
          <button
            disabled={!isConnected || amount === 0}
            className={`w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 ${
              isConnected && amount > 0
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Wallet className="w-5 h-5" />
            {!isConnected
              ? "Hubungkan Dompet untuk Menyalurkan"
              : amount === 0
              ? "Masukkan Jumlah untuk Menyalurkan"
              : "Salurkan Sekarang"}
          </button>

          {!isConnected && (
            <p className="text-sm text-gray-500 mt-3 text-center">
              Anda perlu menghubungkan dompet Xellar untuk menyalurkan infaq
              atau sedekah
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
