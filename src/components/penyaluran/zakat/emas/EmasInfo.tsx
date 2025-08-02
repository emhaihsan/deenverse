"use client";

import { useState, useEffect } from "react";
import { Info, RefreshCw } from "lucide-react";
import { getCurrentGoldPrice, getNisabAmount } from "@/lib/api/goldPrice";

export default function EmasInfo() {
  const [goldPrice, setGoldPrice] = useState<number | null>(null);
  const [nishab, setNishab] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchGoldData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [price, nisab] = await Promise.all([
        getCurrentGoldPrice(),
        getNisabAmount(),
      ]);

      setGoldPrice(price);
      setNishab(nisab);
      setLastUpdated(new Date().toLocaleTimeString("id-ID"));
    } catch (err) {
      console.error("Error:", err);
      setError(
        "Gagal memperbarui data harga emas. Menggunakan data terakhir yang tersimpan."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGoldData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-gray-50 rounded-2xl border border-b-4 border-gray-900 p-6 my-8">
      <div className="flex items-center gap-3 mb-4">
        <Info className="w-6 h-6 text-[#03533d]" />
        <h2 className="text-xl font-medium text-gray-900">Informasi</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-4 text-sm">
        <div className="bg-white p-4 rounded-lg">
          <h3 className="font-medium text-[#03533d] mb-1">Nisab</h3>
          <p className="text-gray-700">
            {goldPrice ? (
              <>
                85 gram emas = {formatCurrency(nishab)}
                <br />
                <span className="text-xs text-gray-500">
                  (Harga emas: {formatCurrency(goldPrice)}/gram)
                </span>
              </>
            ) : (
              "Memuat data..."
            )}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <h3 className="font-medium text-[#03533d] mb-1">Kadar</h3>
          <p className="text-gray-700">2.5% dari total harta yang tersimpan</p>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <h3 className="font-medium text-[#03533d] mb-1">Haul</h3>
          <p className="text-gray-700">1 tahun penimbunan harta</p>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600 flex items-center justify-between">
        <p>
          Terakhir diperbarui: {lastUpdated || "Memuat..."}
          <button
            onClick={fetchGoldData}
            disabled={isLoading}
            className="ml-2 text-[#03533d] hover:text-yellow-700 disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 inline ${isLoading ? "animate-spin" : ""}`}
            />
          </button>
        </p>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
}
