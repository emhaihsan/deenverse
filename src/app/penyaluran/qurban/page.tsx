"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Beef,
  Wallet,
  Info,
  Users,
  Calendar,
  MapPin,
  Calculator,
  Heart,
  CheckCircle,
} from "lucide-react";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";

interface QurbanAnimal {
  id: string;
  name: string;
  price: number;
  maxShares: number;
  minAge: string;
  description: string;
  icon: string;
  color: string;
  benefits: string[];
}

export default function QurbanPenyaluranPage() {
  const { isConnected } = useAccount();
  const [selectedAnimal, setSelectedAnimal] = useState<QurbanAnimal | null>(
    null
  );
  const [shareCount, setShareCount] = useState<number>(1);
  const [participantNames, setParticipantNames] = useState<string[]>([""]);
  const [deliveryLocation, setDeliveryLocation] = useState<string>("");
  const [totalCost, setTotalCost] = useState<number>(0);
  const [qurbanType, setQurbanType] = useState<"individual" | "group">(
    "individual"
  );

  const qurbanAnimals: QurbanAnimal[] = [
    {
      id: "goat",
      name: "Kambing/Domba",
      price: 2500000,
      maxShares: 1,
      minAge: "1 tahun (2 gigi tetap)",
      description: "Kambing atau domba yang sehat dan memenuhi syarat",
      icon: "🐐",
      color: "bg-green-50 border-green-200 text-green-700",
      benefits: [
        "1 ekor untuk 1 orang",
        "Daging berkualitas tinggi",
        "Mudah didistribusi",
      ],
    },
    {
      id: "cow",
      name: "Sapi/Kerbau",
      price: 15000000,
      maxShares: 7,
      minAge: "2 tahun (4 gigi tetap)",
      description: "Sapi atau kerbau yang sehat dan memenuhi syarat",
      icon: "🐄",
      color: "bg-blue-50 border-blue-200 text-blue-700",
      benefits: [
        "1 ekor untuk maksimal 7 orang",
        "Daging melimpah",
        "Ekonomis untuk grup",
      ],
    },
    {
      id: "camel",
      name: "Unta",
      price: 40000000,
      maxShares: 7,
      minAge: "5 tahun",
      description: "Unta yang sehat dan memenuhi syarat",
      icon: "🐪",
      color: "bg-amber-50 border-amber-200 text-amber-700",
      benefits: [
        "1 ekor untuk maksimal 7 orang",
        "Pahala berlimpah",
        "Tradisi Nabi",
      ],
    },
  ];

  const qurbanLocations = [
    "Jakarta Pusat",
    "Jakarta Selatan",
    "Jakarta Utara",
    "Jakarta Barat",
    "Jakarta Timur",
    "Bogor",
    "Depok",
    "Tangerang",
    "Bekasi",
    "Lainnya",
  ];

  useEffect(() => {
    if (selectedAnimal) {
      const cost =
        qurbanType === "individual"
          ? selectedAnimal.price
          : (selectedAnimal.price / selectedAnimal.maxShares) * shareCount;
      setTotalCost(cost);
    }
  }, [selectedAnimal, shareCount, qurbanType]);

  const handleAnimalSelect = (animal: QurbanAnimal) => {
    setSelectedAnimal(animal);
    if (animal.maxShares === 1) {
      setQurbanType("individual");
      setShareCount(1);
      setParticipantNames([""]);
    } else {
      setQurbanType("group");
      setShareCount(1);
      setParticipantNames([""]);
    }
  };

  const handleShareCountChange = (count: number) => {
    if (selectedAnimal && count <= selectedAnimal.maxShares) {
      setShareCount(count);
      const newNames = Array(count)
        .fill("")
        .map((_, i) => participantNames[i] || "");
      setParticipantNames(newNames);
    }
  };

  const handleParticipantNameChange = (index: number, name: string) => {
    const newNames = [...participantNames];
    newNames[index] = name;
    setParticipantNames(newNames);
  };

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
            <div className="p-3 bg-rose-50 rounded-2xl">
              <Beef className="w-8 h-8 text-rose-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Penyaluran Qurban
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Salurkan hewan qurban Anda secara transparan dan aman menggunakan
            teknologi blockchain
          </p>
        </div>

        {/* Educational Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-start gap-4 mb-4">
            <Info className="w-6 h-6 text-rose-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-3">
                Tentang Qurban
              </h2>
              <div className="text-gray-600 space-y-3 text-sm">
                <p>
                  <strong>Qurban</strong> adalah ibadah menyembelih hewan ternak
                  pada hari raya Idul Adha sebagai bentuk ketaatan kepada Allah
                  SWT, mengikuti sunnah Nabi Ibrahim AS.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Syarat Hewan Qurban:
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Sehat dan tidak cacat</li>
                      <li>Mencapai umur minimal</li>
                      <li>Tidak buta, pincang, atau sakit</li>
                      <li>Tidak kurus kering</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Waktu Penyembelihan:
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Setelah shalat Idul Adha</li>
                      <li>Hari Tasyriq (10-13 Dzulhijjah)</li>
                      <li>Waktu yang dianjurkan</li>
                      <li>Dengan niat yang benar</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animal Selection */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Beef className="w-6 h-6 text-rose-600" />
            <h2 className="text-xl font-medium text-gray-900">
              Pilih Hewan Qurban
            </h2>
          </div>
          <p className="text-gray-600 mb-6">
            Pilih jenis hewan qurban yang sesuai dengan kebutuhan Anda
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {qurbanAnimals.map((animal) => (
              <button
                key={animal.id}
                onClick={() => handleAnimalSelect(animal)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedAnimal?.id === animal.id
                    ? animal.color
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-center mb-3">
                  <div className="text-4xl mb-2">{animal.icon}</div>
                  <h3 className="font-semibold text-gray-900">{animal.name}</h3>
                  <p className="text-lg font-bold text-rose-600 mt-1">
                    {formatCurrency(animal.price)}
                  </p>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <strong>Umur minimal:</strong> {animal.minAge}
                  </p>
                  <p>
                    <strong>Kapasitas:</strong> {animal.maxShares} orang
                  </p>
                  <div>
                    <strong>Keunggulan:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      {animal.benefits.map((benefit, idx) => (
                        <li key={idx}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Qurban Configuration */}
        {selectedAnimal && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="w-6 h-6 text-rose-600" />
              <h2 className="text-xl font-medium text-gray-900">
                Konfigurasi Qurban
              </h2>
            </div>

            <div className="space-y-6">
              {/* Qurban Type Selection */}
              {selectedAnimal.maxShares > 1 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Jenis Qurban
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setQurbanType("individual")}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        qurbanType === "individual"
                          ? "border-rose-500 bg-rose-50 text-rose-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-center">
                        <Heart className="w-6 h-6 mx-auto mb-2 text-rose-600" />
                        <div className="font-medium">Individual</div>
                        <div className="text-sm text-gray-500">
                          Satu hewan utuh
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => setQurbanType("group")}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        qurbanType === "group"
                          ? "border-rose-500 bg-rose-50 text-rose-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-center">
                        <Users className="w-6 h-6 mx-auto mb-2 text-rose-600" />
                        <div className="font-medium">Patungan</div>
                        <div className="text-sm text-gray-500">
                          Berbagi dengan orang lain
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Share Count Selection */}
              {qurbanType === "group" && selectedAnimal.maxShares > 1 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Jumlah Peserta (maksimal {selectedAnimal.maxShares} orang)
                  </label>
                  <div className="flex items-center gap-2">
                    {Array.from(
                      { length: selectedAnimal.maxShares },
                      (_, i) => i + 1
                    ).map((count) => (
                      <button
                        key={count}
                        onClick={() => handleShareCountChange(count)}
                        className={`w-12 h-12 rounded-lg border-2 font-medium transition-colors ${
                          shareCount === count
                            ? "border-rose-500 bg-rose-50 text-rose-700"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Participant Names */}
              {qurbanType === "group" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Nama Peserta
                  </label>
                  <div className="space-y-3">
                    {participantNames.map((name, index) => (
                      <input
                        key={index}
                        type="text"
                        value={name}
                        onChange={(e) =>
                          handleParticipantNameChange(index, e.target.value)
                        }
                        placeholder={`Nama peserta ${index + 1}`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Delivery Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Lokasi Penyaluran
                </label>
                <select
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                >
                  <option value="">Pilih lokasi penyaluran</option>
                  {qurbanLocations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cost Calculation */}
              <div className="bg-rose-50 rounded-lg p-4 border border-rose-200">
                <h3 className="font-medium text-rose-900 mb-3">
                  Ringkasan Biaya
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Hewan:</span>
                    <span className="font-medium">{selectedAnimal.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Jenis:</span>
                    <span className="font-medium">
                      {qurbanType === "individual" ? "Individual" : "Patungan"}
                    </span>
                  </div>
                  {qurbanType === "group" && (
                    <div className="flex justify-between">
                      <span className="text-gray-700">Jumlah peserta:</span>
                      <span className="font-medium">{shareCount} orang</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-rose-200">
                    <span className="text-gray-700 font-medium">
                      Total biaya:
                    </span>
                    <span className="text-lg font-semibold text-rose-600">
                      {formatCurrency(totalCost)}
                    </span>
                  </div>
                  {qurbanType === "group" && (
                    <div className="text-xs text-gray-500">
                      Biaya per orang: {formatCurrency(totalCost / shareCount)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-rose-600" />
            <h2 className="text-xl font-medium text-gray-900">
              Konfirmasi Penyaluran
            </h2>
          </div>

          {selectedAnimal && totalCost > 0 && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-900 mb-3">
                Ringkasan Pesanan
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Hewan qurban:</span>
                  <span className="font-medium">{selectedAnimal.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Jenis qurban:</span>
                  <span className="font-medium">
                    {qurbanType === "individual" ? "Individual" : "Patungan"}
                  </span>
                </div>
                {qurbanType === "group" && (
                  <div className="flex justify-between">
                    <span>Jumlah peserta:</span>
                    <span className="font-medium">{shareCount} orang</span>
                  </div>
                )}
                {deliveryLocation && (
                  <div className="flex justify-between">
                    <span>Lokasi penyaluran:</span>
                    <span className="font-medium">{deliveryLocation}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="font-medium">Total biaya:</span>
                  <span className="font-medium text-rose-600">
                    {formatCurrency(totalCost)}
                  </span>
                </div>
              </div>
            </div>
          )}

          <p className="text-gray-600 mb-6">
            Salurkan qurban Anda secara on-chain dengan aman dan transparan
          </p>

          {/* Payment Button */}
          <button
            disabled={!isConnected || !selectedAnimal || totalCost === 0}
            className={`w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 ${
              isConnected && selectedAnimal && totalCost > 0
                ? "bg-rose-600 hover:bg-rose-700 text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Wallet className="w-5 h-5" />
            {!isConnected
              ? "Hubungkan Dompet untuk Menyalurkan"
              : !selectedAnimal
              ? "Pilih Hewan Qurban"
              : "Salurkan Qurban Sekarang"}
          </button>

          {!isConnected && (
            <p className="text-sm text-gray-500 mt-3 text-center">
              Anda perlu menghubungkan dompet Xellar untuk menyalurkan qurban
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
