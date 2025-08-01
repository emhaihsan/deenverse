"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { parseEther } from "viem";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import {
  deenVerseDistributionABI,
  deenVerseDistributionAddress,
} from "@/lib/blockchain";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, CheckCircle, XCircle, Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  ArrowLeft,
  Heart,
  Wallet,
  Info,
  HandCoins,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import {
  convertIdrToEth,
  formatEth,
  getEthereumPrice,
} from "@/lib/api/cryptoPrice";
import Image from "next/image";
import organizations from "@/data/destinationOrg";

export default function InfakSedekahPenyaluranPage() {
  const { isConnected, address } = useAccount();
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [selectedOrg, setSelectedOrg] = useState<string>("");
  const [ethAmount, setEthAmount] = useState<string>("0");
  const [isLoadingEth, setIsLoadingEth] = useState<boolean>(false);
  const [ethPrice, setEthPrice] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const { data: hash, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const presetAmounts = [50000, 100000, 250000, 500000, 1000000];

  // Fetch ETH price on mount
  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const price = await getEthereumPrice();
        setEthPrice(price);
      } catch (err) {
        console.error("Error fetching ETH price:", err);
        setError("Gagal memperbarui harga ETH. Silakan coba lagi nanti.");
      }
    };

    fetchEthPrice();
  }, []);

  // Convert IDR to ETH when amount changes
  useEffect(() => {
    const convertToEth = async () => {
      if (amount > 0) {
        setIsLoadingEth(true);
        try {
          const eth = await convertIdrToEth(amount);
          setEthAmount(formatEth(eth));
        } catch (err) {
          console.error("Error converting to ETH:", err);
          setError("Gagal mengkonversi ke ETH. Silakan coba lagi.");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatusMessage("");

    if (!isConnected || !address) {
      setError("Harap sambungkan dompet Anda terlebih dahulu");
      return;
    }
    if (amount <= 0 || !ethAmount) {
      setError("Mohon masukkan nominal yang valid");
      return;
    }
    if (!selectedOrg) {
      setError("Mohon pilih lembaga penyaluran");
      return;
    }

    try {
      // Step 1: Generate NFT Metadata via our API
      setStatusMessage("1/3: Membuat sertifikat NFT...");
      const orgName =
        organizations.find((o) => o.id === selectedOrg)?.name ||
        "Lembaga Terpilih";
      const today = new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const apiResponse = await fetch("/api/certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: address,
          amount: amount.toString(),
          date: today,
          type: "Infaq & Sedekah",
          orgName: orgName,
        }),
      });

      if (!apiResponse.ok) {
        throw new Error("Gagal mempersiapkan sertifikat NFT.");
      }

      const { tokenURI } = await apiResponse.json();
      if (!tokenURI) {
        throw new Error("Gagal mendapatkan URI metadata NFT.");
      }
      setStatusMessage("2/3: Sertifikat siap. Menunggu konfirmasi dompet...");

      // Step 2: Call the smart contract's makePayment function
      writeContract({
        address: deenVerseDistributionAddress,
        abi: deenVerseDistributionABI,
        functionName: "makePayment",
        args: [
          selectedOrg, // orgId
          1, // paymentType (1 for INFAQ)
          "Infaq & Sedekah", // subType
          description, // note
          tokenURI, // tokenURI
        ],
        value: parseEther(ethAmount as `${number}`),
      });
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(
        err.message || "Terjadi kesalahan saat memproses permintaan Anda"
      );
      setStatusMessage("");
    }
  };

  const isSubmitting = isPending || isConfirming;

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
              <Heart className="w-8 h-8 text-blue-600" />
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
                Tentang Infak & Sedekah
              </h2>
              <div className="text-gray-600 space-y-3 text-sm">
                <p>
                  <strong>Infak</strong> adalah pemberian harta yang dikeluarkan
                  oleh seseorang atau badan usaha di luar zakat untuk
                  kemaslahatan umat. Bersifat sunnah dan bisa diberikan kapan
                  saja.
                </p>
                <p>
                  <strong>Sedekah</strong> adalah pemberian sukarela yang
                  diberikan oleh seorang muslim kepada orang lain, terutama
                  kepada yang membutuhkan, semata-mata mengharap ridha Allah
                  SWT.
                </p>
                <p>
                  Keduanya memiliki keutamaan yang tinggi dalam Islam dan dapat
                  menjadi sarana pembersih harta serta penambah pahala.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Organization Selection */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <HandCoins className="w-6 h-6 text-blue-600" />
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
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
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

        {/* Amount Selection */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <HandCoins className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-medium text-gray-900">
              Jumlah Penyaluran
            </h2>
          </div>

          {/* Preset Amounts */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Pilih Jumlah Cepat
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {presetAmounts.map((presetAmount) => (
                <button
                  key={presetAmount}
                  onClick={() => setAmount(presetAmount)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    amount === presetAmount
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
            <Input
              type="number"
              value={amount || ""}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Masukkan jumlah (IDR)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* ETH Conversion */}
          {amount > 0 && (
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mt-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Jumlah (IDR):</span>
                  <span className="font-medium text-blue-700">
                    {formatCurrency(amount)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Jumlah dalam ETH:</span>
                  <div className="flex items-center">
                    {isLoadingEth ? (
                      <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <span className="font-medium text-purple-600">
                        {ethAmount} ETH
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                  <span className="text-gray-700">Kurs:</span>
                  <span className="font-medium text-blue-700">
                    1 ETH = {formatCurrency(ethPrice)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-medium text-gray-900">
              Catatan (Opsional)
            </h2>
          </div>
          <Textarea
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
            <Wallet className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-medium text-gray-900">
              Konfirmasi Penyaluran
            </h2>
          </div>
          <p className="text-gray-600 mb-6">
            Salurkan infaq dan sedekah Anda secara on-chain dengan aman dan
            transparan
          </p>

          {/* Summary */}
          {amount > 0 && selectedOrg && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-900 mb-2">
                Ringkasan Penyaluran
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div>
                  Lembaga:{" "}
                  {organizations.find((o) => o.id === selectedOrg)?.name}
                </div>
                <div>Jumlah: {formatCurrency(amount)}</div>
                <div>ETH: {ethAmount} ETH</div>
                {description && <div>Catatan: {description}</div>}
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-md flex items-start mb-4">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Payment Button */}
          <button
            onClick={handleSubmit}
            disabled={
              !isConnected ||
              amount === 0 ||
              isLoadingEth ||
              !selectedOrg ||
              isSubmitting
            }
            className={`w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
              isConnected &&
              amount > 0 &&
              !isLoadingEth &&
              selectedOrg &&
              !isSubmitting
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />{" "}
                {statusMessage || "Memproses..."}
              </>
            ) : (
              <>
                <Wallet className="w-5 h-5" /> Bayar & Mint Sertifikat
              </>
            )}
          </button>

          {/* Status Messages */}
          {error && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isSubmitting && !error && (
            <Alert>
              <Loader className="h-4 w-4 animate-spin" />
              <AlertTitle>Sedang Diproses</AlertTitle>
              <AlertDescription>{statusMessage}</AlertDescription>
            </Alert>
          )}

          {isConfirmed && (
            <Alert variant="default">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Transaksi Berhasil!</AlertTitle>
              <AlertDescription>
                Donasi Anda telah berhasil dicatat di blockchain. Terima kasih!
                <a
                  href={`https://sepolia-blockscout.lisk.com/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-green-700 hover:underline ml-2"
                >
                  Lihat Transaksi
                </a>
              </AlertDescription>
            </Alert>
          )}

          {!isConnected && (
            <div className="text-center text-sm text-gray-500">
              Harap hubungkan dompet Anda untuk melanjutkan pembayaran.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
