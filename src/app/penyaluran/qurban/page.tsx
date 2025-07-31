"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Beef,
  Wallet,
  Info,
  Users,
  Heart,
  CheckCircle,
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
import { QurbanAnimal } from "@/types/animals";
import qurbanAnimals from "@/data/qurbanData";

export default function QurbanPenyaluranPage() {
  const { isConnected } = useAccount();
  const [selectedAnimal, setSelectedAnimal] = useState<QurbanAnimal | null>(
    null
  );
  const [shareCount, setShareCount] = useState<number>(1);
  const [participantNames, setParticipantNames] = useState<string[]>([""]);
  const [selectedOrg, setSelectedOrg] = useState<string>("");
  const [totalCost, setTotalCost] = useState<number>(0);
  const [qurbanType, setQurbanType] = useState<"individual" | "group">(
    "individual"
  );
  const [ethAmount, setEthAmount] = useState<string>("0");
  const [isLoadingEth, setIsLoadingEth] = useState<boolean>(false);
  const [ethPrice, setEthPrice] = useState<number>(0);

  useEffect(() => {
    if (selectedAnimal) {
      const cost =
        qurbanType === "individual"
          ? selectedAnimal.price
          : (selectedAnimal.price / selectedAnimal.maxShares) * shareCount;
      setTotalCost(cost);
    }
  }, [selectedAnimal, shareCount, qurbanType]);

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
            Salurkan qurban Anda secara transparan dan aman menggunakan
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
                  Qurban adalah ibadah yang dilakukan umat Islam dengan
                  menyembelih hewan ternak pada hari raya Idul Adha sebagai
                  bentuk kepatuhan kepada Allah SWT.
                </p>
                <p>
                  <strong>Syarat wajib qurban:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Muslim, baligh, dan berakal</li>
                  <li>Merdeka (bukan budak)</li>
                  <li>Kekayaan melebihi nisab (setara 612,36 gram perak)</li>
                </ul>
                <p>
                  <strong>Hewan yang dapat disembelih:</strong> Kambing/Domba,
                  Sapi/Kerbau, dan Unta dengan syarat dan ketentuan tertentu.
                </p>
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

        {/* Animal Selection */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Beef className="w-6 h-6 text-rose-600" />
            <h2 className="text-xl font-medium text-gray-900">
              Pilih Hewan Qurban
            </h2>
          </div>
          <p className="text-gray-600 mb-6">
            Pilih jenis hewan qurban yang sesuai dengan kemampuan Anda
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {qurbanAnimals.map((animal) => (
              <div
                key={animal.id}
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  selectedAnimal?.id === animal.id
                    ? "border-rose-500 bg-rose-50"
                    : "border-gray-200 hover:border-rose-300"
                }`}
                onClick={() => handleAnimalSelect(animal)}
              >
                <div className="text-3xl mb-3">{animal.icon}</div>
                <h3 className="font-medium text-gray-900 mb-1">
                  {animal.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {animal.description}
                </p>
                <div className="text-lg font-semibold text-rose-600 mb-3">
                  {formatCurrency(animal.price)}
                </div>
                <div className="text-xs text-gray-500 mb-3">
                  Min. {animal.minAge}
                </div>
                <ul className="text-xs text-gray-600 space-y-1">
                  {animal.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-1">
                      <span>•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Animal Configuration */}
        {selectedAnimal && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-rose-600" />
              <h2 className="text-xl font-medium text-gray-900">
                Konfigurasi Qurban
              </h2>
            </div>

            <div className="space-y-6">
              {/* Qurban Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Jenis Qurban
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setQurbanType("individual");
                      setShareCount(1);
                      setParticipantNames([""]);
                    }}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      qurbanType === "individual"
                        ? "border-rose-500 bg-rose-50 text-rose-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-center">
                      <Users className="w-6 h-6 mx-auto mb-2 text-rose-600" />
                      <div className="font-medium">Individual</div>
                      <div className="text-sm text-gray-500">
                        1 orang 1 ekor hewan
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setQurbanType("group")}
                    disabled={selectedAnimal.maxShares === 1}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      qurbanType === "group"
                        ? "border-rose-500 bg-rose-50 text-rose-700"
                        : "border-gray-200 hover:border-gray-300"
                    } ${selectedAnimal.maxShares === 1 ? "opacity-50" : ""}`}
                  >
                    <div className="text-center">
                      <Users className="w-6 h-6 mx-auto mb-2 text-rose-600" />
                      <div className="font-medium">Patungan</div>
                      <div className="text-sm text-gray-500">
                        Berbagi 1 ekor hewan
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Share Count (only for group qurban) */}
              {qurbanType === "group" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Jumlah Peserta (Maks. {selectedAnimal.maxShares} orang)
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleShareCountChange(shareCount - 1)}
                      disabled={shareCount <= 1}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="text-lg font-medium w-8 text-center">
                      {shareCount}
                    </span>
                    <button
                      onClick={() => handleShareCountChange(shareCount + 1)}
                      disabled={shareCount >= selectedAnimal.maxShares}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Participant Names */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {qurbanType === "individual"
                    ? "Nama Peserta"
                    : `Nama Peserta (${shareCount} orang)`}
                </label>
                {participantNames.map((name, index) => (
                  <div key={index} className="mb-3">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) =>
                        handleParticipantNameChange(index, e.target.value)
                      }
                      placeholder={`Nama peserta ${index + 1}`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    />
                  </div>
                ))}
              </div>

              {/* Calculation Result */}
              <div className="bg-rose-50 rounded-lg p-4 border border-rose-200">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Hewan qurban:</span>
                    <span className="font-medium text-rose-700">
                      {selectedAnimal.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Jenis qurban:</span>
                    <span className="font-medium text-rose-700">
                      {qurbanType === "individual" ? "Individual" : "Patungan"}
                    </span>
                  </div>
                  {qurbanType === "group" && (
                    <div className="flex justify-between items-center">
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
                  {/* ETH Conversion */}
                  {totalCost > 0 && (
                    <div className="flex justify-between items-center pt-2 border-t border-rose-200">
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

          {selectedAnimal && totalCost > 0 && selectedOrg && (
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
                <div>
                  <span>
                    Lembaga:{" "}
                    {organizations.find((o) => o.id === selectedOrg)?.name}
                  </span>
                </div>
                {qurbanType === "group" && (
                  <div className="flex justify-between">
                    <span>Jumlah peserta:</span>
                    <span className="font-medium">{shareCount} orang</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="font-medium">Total biaya:</span>
                  <span className="font-medium text-rose-600">
                    {formatCurrency(totalCost)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">ETH:</span>
                  <span className="font-medium text-purple-600">
                    {ethAmount} ETH
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
            disabled={
              !isConnected || !selectedAnimal || totalCost === 0 || !selectedOrg
            }
            className={`w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 ${
              isConnected && selectedAnimal && totalCost > 0 && selectedOrg
                ? "bg-rose-600 hover:bg-rose-700 text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Wallet className="w-5 h-5" />
            {!isConnected
              ? "Hubungkan Dompet untuk Menyalurkan"
              : !selectedAnimal
              ? "Pilih Hewan Qurban"
              : !selectedOrg
              ? "Pilih Lembaga Penyalur"
              : isLoadingEth
              ? "Menghitung..."
              : `Bayar ${ethAmount} ETH`}
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
