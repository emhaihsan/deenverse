"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Sheet, Calculator, Wallet, Info } from "lucide-react";
import { useAccount } from "wagmi";
import Image from "next/image";
import {
  convertIdrToEth,
  formatEth,
  getEthereumPrice,
} from "@/lib/api/cryptoPrice";
import organizations from "@/data/destinationOrg";

export default function ZakatPeternakanPage() {
  const [amount, setAmount] = useState("");
  const [selectedOrg, setSelectedOrg] = useState<string>("");
  const [ethAmount, setEthAmount] = useState<string>("0");
  const [isLoadingEth, setIsLoadingEth] = useState<boolean>(false);
  const [ethPrice, setEthPrice] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"simple" | "advanced">("simple");

  const { isConnected } = useAccount();

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

  // Convert IDR to ETH when amount changes
  useEffect(() => {
    const convertToEth = async () => {
      const zakatAmount = parseFloat(amount) || 0;
      if (zakatAmount > 0) {
        setIsLoadingEth(true);
        try {
          const eth = await convertIdrToEth(zakatAmount);
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
  }, [amount]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const currentZakat = parseFloat(amount) || 0;

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
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
              <Sheet className="w-8 h-8 text-amber-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Zakat Peternakan
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Keluarkan zakat hasil ternak Anda sesuai dengan ketentuan syariat
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6 text-amber-600" />
            <h2 className="text-xl font-medium text-gray-900">
              Tentang Zakat Peternakan
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-600 text-sm leading-relaxed">
              Zakat peternakan adalah zakat yang dikenakan pada hewan ternak
              yang dipelihara untuk dikembangbiakkan. Zakat ini wajib
              dikeluarkan ketika jumlah ternak mencapai nisab yang telah
              ditetapkan.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-amber-50 rounded-lg">
                <span className="font-medium text-amber-800">Nisab:</span>
                <p className="text-amber-700">Kambing/Domba: 40 ekor</p>
                <p className="text-amber-700">Sapi/Kerbau: 30 ekor</p>
                <p className="text-amber-700">Unta: 5 ekor</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg">
                <span className="font-medium text-amber-800">Kadar:</span>
                <p className="text-amber-700">1 ekor per nisab</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg">
                <span className="font-medium text-amber-800">Waktu:</span>
                <p className="text-amber-700">Setiap tahun hijriyah</p>
              </div>
            </div>
          </div>
        </div>

        {/* Zakat Calculator */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-6 h-6 text-amber-600" />
            <h2 className="text-xl font-medium text-gray-900">
              Kalkulator Zakat
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("simple")}
              className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "simple"
                  ? "border-amber-600 text-amber-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Sederhana
            </button>
            <button
              onClick={() => setActiveTab("advanced")}
              className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "advanced"
                  ? "border-amber-600 text-amber-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Lanjutan
            </button>
          </div>

          <div className="space-y-6">
            {/* Organization Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pilih Lembaga Penyalur
              </label>
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

            {/* Simple Tab */}
            {activeTab === "simple" ? (
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jumlah Zakat (Rupiah)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      Rp
                    </span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Masukkan jumlah zakat dalam Rupiah"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Masukkan nilai zakat yang akan Anda bayarkan dalam Rupiah
                  </p>
                </div>

                {/* Zakat Calculation Result */}
                {currentZakat > 0 && (
                  <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-medium">
                        Zakat yang harus dibayar:
                      </span>
                      <span className="text-xl font-bold text-amber-800">
                        {formatCurrency(currentZakat)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 mt-2 border-t border-amber-100">
                      <span className="text-gray-600">Jumlah dalam ETH:</span>
                      <span className="font-medium text-amber-700">
                        {isLoadingEth ? (
                          <div className="h-4 w-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin inline-block" />
                        ) : (
                          `${ethAmount} ETH`
                        )}
                      </span>
                    </div>
                    {ethPrice > 0 && (
                      <div className="text-xs text-gray-500 text-right">
                        1 ETH = {formatCurrency(ethPrice)}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="py-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
                  <Info className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Fitur Segera Hadir
                </h3>
                <p className="text-gray-500">
                  Kalkulator zakat peternakan lengkap akan segera tersedia
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        {currentZakat > 0 && selectedOrg && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">
              Ringkasan Pesanan
            </h4>
            <div className="space-y-1 text-sm text-gray-600">
              <div>
                Lembaga: {organizations.find((o) => o.id === selectedOrg)?.name}
              </div>
              <div>Jumlah: {formatCurrency(currentZakat)}</div>
              <div>ETH: {ethAmount} ETH</div>
            </div>
          </div>
        )}

        {/* Payment Button */}
        <div className="mt-6">
          <button
            disabled={!isConnected || currentZakat === 0 || !selectedOrg}
            className={`w-full py-4 px-6 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
              isConnected && currentZakat > 0 && selectedOrg
                ? "bg-amber-600 hover:bg-amber-700 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {!isConnected ? (
              <>
                <Wallet className="w-5 h-5" />
                Hubungkan Dompet untuk Membayar
              </>
            ) : currentZakat === 0 ? (
              "Masukkan Jumlah Zakat"
            ) : !selectedOrg ? (
              "Pilih Lembaga Penyalur"
            ) : isLoadingEth ? (
              "Menghitung..."
            ) : (
              `Bayar ${ethAmount} ETH`
            )}
          </button>

          {!isConnected && (
            <p className="text-xs text-gray-500 mt-2 text-center">
              Anda perlu menghubungkan dompet kripto untuk melakukan pembayaran
            </p>
          )}
        </div>

        {/* Important Notes */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Catatan Penting
          </h4>
          <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
            <li>
              Zakat peternakan wajib dikeluarkan ketika jumlah ternak mencapai
              nisab
            </li>
            <li>
              Nisab berbeda untuk setiap jenis ternak (kambing: 40 ekor, sapi:
              30 ekor, unta: 5 ekor)
            </li>
            <li>
              Zakat dikeluarkan dalam bentuk hewan ternak yang sehat dan baik
            </li>
            <li>
              Hewan yang dizakatkan harus sudah mencukupi usia (haul) tertentu
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
