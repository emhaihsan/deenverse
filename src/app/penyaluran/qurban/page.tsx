"use client";

import { Beef, Wallet, Users, Heart, CheckCircle } from "lucide-react";
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
import QurbanHeaders from "@/components/penyaluran/qurban/QurbanHeaders";
import QurbanEdu from "@/components/penyaluran/qurban/QurbanEdu";
import OrganizationSelection from "@/components/penyaluran/OrganizationSelection";

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
    <div className="py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <QurbanHeaders />
        <QurbanEdu />

        {/* Animal Selection */}
        <div className="bg-white rounded-2xl border-b-4 border-gray-900 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Beef className="w-6 h-6 text-[#03533d]" />
            <h2 className="text-xl font-medium text-gray-900">
              Pilih Hewan Qurban
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {qurbanAnimals.map((animal) => (
              <button
                key={animal.id}
                onClick={() => handleAnimalSelect(animal)}
                className={`p-4 rounded-xl text-left transition-all border-2 ${
                  selectedAnimal?.id === animal.id
                    ? "border-[#03533d] bg-emerald-50 ring-2 ring-[#03533d]"
                    : "border-gray-200 hover:border-[#03533d]"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {animal.name}
                  </h3>
                  <span className="text-8xl">{animal.icon}</span>
                </div>
                <p className="text-sm text-gray-600">{animal.description}</p>
                <p className="text-lg font-semibold text-[#03533d] mt-2">
                  {formatCurrency(animal.price)}
                </p>
              </button>
            ))}
          </div>
        </div>

        {selectedAnimal && selectedAnimal.maxShares > 1 && (
          <div className="bg-white rounded-2xl border-b-4 border-gray-900 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-[#03533d]" />
              <h2 className="text-xl font-medium text-gray-900">
                Pilih Tipe Qurban
              </h2>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setQurbanType("individual")}
                className={`flex-1 p-4 rounded-xl text-center transition-all border-2 ${
                  qurbanType === "individual"
                    ? "border-[#03533d] bg-emerald-50 ring-2 ring-[#03533d]"
                    : "border-gray-200 hover:border-[#03533d]"
                }`}
              >
                <h3 className="font-medium">Individual</h3>
                <p className="text-sm text-gray-600">1 orang untuk 1 hewan</p>
              </button>
              <button
                onClick={() => setQurbanType("group")}
                className={`flex-1 p-4 rounded-xl text-center transition-all border-2 ${
                  qurbanType === "group"
                    ? "border-[#03533d] bg-emerald-50 ring-2 ring-[#03533d]"
                    : "border-gray-200 hover:border-[#03533d]"
                }`}
              >
                <h3 className="font-medium">Patungan</h3>
                <p className="text-sm text-gray-600">
                  hingga {selectedAnimal.maxShares} orang
                </p>
              </button>
            </div>
          </div>
        )}

        {/* Participant Details */}
        {selectedAnimal && (
          <div className="bg-white rounded-2xl border-b-4 border-gray-900 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-[#03533d]" />
              <h2 className="text-xl font-medium text-gray-900">
                Data Peserta Qurban
              </h2>
            </div>
            {qurbanType === "group" && selectedAnimal.maxShares > 1 && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jumlah Peserta (maks {selectedAnimal.maxShares})
                </label>
                <input
                  type="number"
                  min="1"
                  max={selectedAnimal.maxShares}
                  value={shareCount}
                  onChange={(e) =>
                    handleShareCountChange(Number(e.target.value))
                  }
                  className="w-full px-3 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 border-2"
                />
              </div>
            )}
            <div className="space-y-3">
              {participantNames.map((name, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Peserta {qurbanType === "group" ? index + 1 : ""}
                  </label>
                  <input
                    type="text"
                    placeholder={`Nama Peserta`}
                    value={name}
                    onChange={(e) =>
                      handleParticipantNameChange(index, e.target.value)
                    }
                    className="w-full px-3 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 border-2"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Organization Selection */}
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

        {/* Payment Summary */}
        {selectedAnimal && (
          <div className="bg-white rounded-2xl border-b-4 border-gray-900 p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-[#03533d]" />
              <h2 className="text-xl font-medium text-gray-900">
                Ringkasan & Pembayaran
              </h2>
            </div>
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total Biaya (IDR):</span>
                  <span className="font-semibold text-lg text-[#03533d]">
                    {formatCurrency(totalCost)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Jumlah dalam ETH:</span>
                  <span className="font-medium text-[#03533d]">
                    {ethAmount} ETH
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-emerald-200">
                  <span className="text-gray-700">Kurs:</span>
                  <span className="font-medium text-[#03533d]">
                    1 ETH = {formatCurrency(ethPrice)}
                  </span>
                </div>
                {qurbanType === "group" && shareCount > 0 && (
                  <div className="text-xs text-gray-500 pt-2 border-t border-emerald-200">
                    Biaya per orang: {formatCurrency(totalCost / shareCount)}
                  </div>
                )}
              </div>
            </div>

            <button
              disabled={
                !isConnected ||
                !selectedAnimal ||
                totalCost === 0 ||
                !selectedOrg
              }
              className={`w-full mt-6 py-3 px-4 rounded-xl mb-4 font-medium flex items-center justify-center gap-2 transition-all ${
                !(
                  !isConnected ||
                  !selectedAnimal ||
                  totalCost === 0 ||
                  !selectedOrg
                )
                  ? "bg-[#03533d] hover:bg-gray-900 text-white border border-b-4 border-gray-900"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Wallet className="w-5 h-5" /> Bayar Qurban & Mint Sertifikat
            </button>

            {!isConnected && (
              <div className="text-center text-sm text-gray-500 mt-4">
                Harap hubungkan dompet Anda untuk melanjutkan pembayaran.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
