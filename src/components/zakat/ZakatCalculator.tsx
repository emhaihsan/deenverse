"use client";

import { useState } from "react";
import { Calculator, Info } from "lucide-react";
import { zakatTypes } from "@/data/zakatData";
import { ZakatType, ZakatCalculation } from "@/types/zakat";

export default function ZakatCalculator() {
  const [selectedZakat, setSelectedZakat] = useState<string>("zakat-tabungan");
  const [amount, setAmount] = useState<string>("");
  const [result, setResult] = useState<ZakatCalculation | null>(null);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const handleCalculate = () => {
    if (!amount || isNaN(parseFloat(amount))) {
      alert("Masukkan jumlah yang valid");
      return;
    }

    const zakat = zakatTypes.find((z) => z.id === selectedZakat);
    if (!zakat) return;

    const amountValue = parseFloat(amount);
    let zakatDue = 0;
    let isWajib = false;
    let nisab = 0;
    const notes: string[] = [];

    // Simplified calculation logic based on zakat type
    switch (selectedZakat) {
      case "zakat-tabungan":
      case "zakat-emas":
      case "zakat-perak":
      case "zakat-perdagangan":
      case "zakat-investasi":
        // Using a standard nisab value for demonstration
        nisab =
          selectedZakat === "zakat-emas"
            ? 85000000
            : selectedZakat === "zakat-perak"
            ? 595000
            : 85000000;
        isWajib = amountValue >= nisab;
        zakatDue = isWajib ? amountValue * 0.025 : 0;
        if (!isWajib) {
          notes.push(
            `Jumlah Anda belum mencapai nisab yang ditetapkan (Rp ${nisab.toLocaleString()})`
          );
        }
        break;
      case "zakat-fitrah":
        // Fixed amount per person
        zakatDue = amountValue * 40000; // Rp 40,000 per person
        isWajib = amountValue > 0;
        notes.push("Zakat fitrah dihitung per jiwa");
        break;
      case "zakat-ternak":
        // Simplified calculation for livestock
        isWajib = amountValue >= 30; // Minimum 30 for cattle
        zakatDue = isWajib ? Math.floor(amountValue / 30) * 100000 : 0; // Simplified
        if (!isWajib) {
          notes.push(
            "Jumlah ternak belum mencapai nisab (minimal 30 ekor sapi)"
          );
        }
        break;
      case "zakat-pertanian":
        // Agricultural zakat
        isWajib = amountValue >= 653; // Nisab in kg
        zakatDue = isWajib
          ? amountValue * (amountValue >= 6530 ? 0.1 : 0.05)
          : 0;
        if (!isWajib) {
          notes.push("Hasil panen belum mencapai nisab (653 kg)");
        } else {
          notes.push(
            `Kadar ${amountValue >= 6530 ? "10%" : "5%"} karena ${
              amountValue >= 6530 ? "disirami" : "hujan"
            }`
          );
        }
        break;
      default:
        zakatDue = amountValue * 0.025;
        isWajib = true;
    }

    setResult({
      type: zakat.title,
      amount: amountValue,
      nisab: nisab,
      zakatDue: zakatDue,
      isWajib: isWajib,
      notes: notes,
    });
  };

  const selectedZakatData = zakatTypes.find((z) => z.id === selectedZakat);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-50 rounded-xl">
            <Calculator className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="text-xl font-medium text-gray-900">
            Kalkulator Zakat
          </h3>
        </div>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Info className="w-5 h-5" />
        </button>
      </div>

      {showInfo && selectedZakatData && (
        <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <h4 className="font-medium text-blue-900 mb-2">
            {selectedZakatData.title}
          </h4>
          <p className="text-sm text-blue-800">
            {selectedZakatData.description}
          </p>
        </div>
      )}

      <div className="space-y-6">
        {/* Zakat Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jenis Zakat
          </label>
          <select
            value={selectedZakat}
            onChange={(e) => {
              setSelectedZakat(e.target.value);
              setResult(null);
            }}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            {zakatTypes
              .filter((z) => z.id !== "zakat-rikaz") // Exclude rikaz as it's not commonly calculated
              .map((zakat) => (
                <option key={zakat.id} value={zakat.id}>
                  {zakat.title}
                </option>
              ))}
          </select>
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jumlah
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">
              Rp
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setResult(null);
              }}
              placeholder="Masukkan jumlah..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            {selectedZakat === "zakat-fitrah" && "Masukkan jumlah jiwa"}
            {selectedZakat === "zakat-ternak" && "Masukkan jumlah ternak"}
            {selectedZakat === "zakat-pertanian" && "Masukkan hasil panen (kg)"}
            {!["zakat-fitrah", "zakat-ternak", "zakat-pertanian"].includes(
              selectedZakat
            ) && "Masukkan jumlah harta"}
          </p>
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-2xl transition-colors"
        >
          Hitung Zakat
        </button>

        {/* Result */}
        {result && (
          <div className="mt-6 p-6 bg-gray-50 rounded-2xl border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-4 text-center">
              Hasil Perhitungan
            </h4>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-600">Jenis Zakat</span>
                <span className="font-medium text-gray-900">{result.type}</span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-600">Jumlah Harta</span>
                <span className="font-medium text-gray-900">
                  Rp {result.amount.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-600">Status</span>
                <span
                  className={`font-medium ${
                    result.isWajib ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {result.isWajib ? "Wajib" : "Tidak Wajib"}
                </span>
              </div>

              {result.isWajib && (
                <div className="flex justify-between items-center pt-3">
                  <span className="text-gray-600">
                    Zakat yang Harus Dibayar
                  </span>
                  <span className="text-xl font-bold text-amber-600">
                    Rp{" "}
                    {result.zakatDue.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
              )}

              {result.notes.length > 0 && (
                <div className="pt-3 border-t border-gray-200">
                  <ul className="space-y-2">
                    {result.notes.map((note, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <span className="text-amber-500 mt-1">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
