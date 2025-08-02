"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { parseEther } from "viem";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import {
  deenVerseDistributionABI,
  deenVerseDistributionAddress,
} from "@/lib/blockchain";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle, Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Wallet, Info, HandCoins } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import {
  convertIdrToEth,
  formatEth,
  getEthereumPrice,
} from "@/lib/api/cryptoPrice";
import organizations from "@/data/destinationOrg";
import InfakHeaders from "@/components/penyaluran/infak/InfakHeaders";
import InfakEdu from "@/components/penyaluran/infak/InfakEdu";
import OrganizationSelection from "@/components/penyaluran/OrganizationSelection";

export default function InfakSedekahPenyaluranPage() {
  const { isConnected, address } = useAccount();
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [selectedOrg, setSelectedOrg] = useState<string>("");
  const [ethAmount, setEthAmount] = useState<string | number>("");
  const [isLoadingEth, setIsLoadingEth] = useState<boolean>(false);
  const [ethPrice, setEthPrice] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [isProcessingApi, setIsProcessingApi] = useState(false);

  const { data: hash, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const isSubmitting = isProcessingApi || isPending || isConfirming;

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

    setIsProcessingApi(true);
    try {
      // Step 1: Generate NFT Metadata via our API
      setStatusMessage("1/3: Membuat sertifikat NFT...");
      const orgName =
        organizations.find((o) => o.id === selectedOrg)?.name ||
        "Lembaga Terpilih";
      const isoDate = new Date().toISOString();

      const apiResponse = await fetch("/api/certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: address,
          amount: amount.toString(),
          ethAmount: ethAmount.toString(),
          date: isoDate, // Send ISO date to API
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
        args: [selectedOrg, 1, "Infaq & Sedekah", description, tokenURI],
        value: parseEther(ethAmount.toString()),
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Submission error:", err.message);
        setError(
          err.message || "Terjadi kesalahan saat memproses permintaan Anda"
        );
      } else {
        console.error("An unknown error occurred:", err);
        setError("Terjadi kesalahan yang tidak diketahui.");
      }
      setStatusMessage("");
    } finally {
      setIsProcessingApi(false);
    }
  };

  return (
    <div className="py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <InfakHeaders />

        <InfakEdu />
        {/* Organization Selection */}
        <OrganizationSelection
          organizations={organizations}
          selectedOrg={selectedOrg}
          onSelectOrg={setSelectedOrg}
          theme={{
            icon: <HandCoins className="w-6 h-6 text-[#03533d]" />,
            title: "Pilih Lembaga Penyaluran",
            selectedClass:
              "border-[#03533d] bg-emerald-50 ring-2 ring-[#03533d]",
            hoverClass: "hover:border-[#03533d]",
          }}
        />

        {/* Amount Selection */}
        <div className="bg-white rounded-2xl  border-b-4 border-gray-900 p-6">
          <div className="flex items-center gap-3 mb-4">
            <HandCoins className="w-6 h-6 text-[#03533d]" />
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
                      ? "bg-emerald-600 text-white"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* ETH Conversion */}
          {amount > 0 && (
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200 mt-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Jumlah (IDR):</span>
                  <span className="font-medium text-[#03533d]">
                    {formatCurrency(amount)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Jumlah dalam ETH:</span>
                  <div className="flex items-center">
                    {isLoadingEth ? (
                      <div className="h-4 w-4 border-2 border-[#03533d] border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <span className="font-medium text-[#03533d]">
                        {ethAmount} ETH
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-emerald-200">
                  <span className="text-gray-700">Kurs:</span>
                  <span className="font-medium text-[#03533d]">
                    1 ETH = {formatCurrency(ethPrice)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl  border-b-4 border-gray-900 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6 text-[#03533d]" />
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
        <div className="bg-white rounded-2xl  border-b-4 border-gray-900 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Wallet className="w-6 h-6 text-[#03533d]" />
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
            className={`w-full py-3 px-4 rounded-xl mb-4 font-medium flex items-center justify-center gap-2 transition-all ${
              isConnected &&
              amount > 0 &&
              !isLoadingEth &&
              selectedOrg &&
              !isSubmitting
                ? "bg-[#03533d] hover:bg-gray-900 text-white hover:text-white border border-b-4 border-gray-900"
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
              <AlertTitle>Sedang Diproses...</AlertTitle>
              <AlertDescription>{statusMessage}</AlertDescription>
            </Alert>
          )}

          {isConfirmed && (
            <Alert
              variant="default"
              className="bg-emerald-50 border-emerald-200"
            >
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <AlertTitle className="text-emerald-800">
                Transaksi Berhasil!
              </AlertTitle>
              <AlertDescription className="text-emerald-700">
                Donasi Anda telah berhasil dicatat di blockchain. Terima kasih!
                <a
                  href={`https://sepolia-blockscout.lisk.com/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-emerald-800 hover:underline ml-2"
                >
                  Lihat Transaksi
                </a>
              </AlertDescription>
            </Alert>
          )}

          {!isConnected && (
            <div className="text-center text-sm text-gray-500 mt-4">
              Harap hubungkan dompet Anda untuk melanjutkan pembayaran.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
