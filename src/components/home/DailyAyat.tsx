"use client";

import { useEffect, useState } from "react";
import { getRandomAyat } from "@/lib/api/surat";
import { DailyAyatData } from "@/types/surat";

export default function DailyAyat() {
  const [dailyAyat, setDailyAyat] = useState<DailyAyatData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getRandomAyat();
        setDailyAyat(data);
      } catch (error) {
        console.error("Error fetching daily ayat:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-b-6 border-gray-900 animate-pulse">
        <div className="flex flex-col items-center gap-3 mb-4">
          <div className="h-5 bg-gray-200 rounded w-28"></div>
        </div>
        <div className="space-y-2">
          <div className="h-7 bg-gray-200 rounded mx-auto w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded mx-auto w-2/4"></div>
        </div>
      </div>
    );
  }

  // Error
  if (!dailyAyat) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-b-6 border-gray-900">
        <div className="flex flex-col items-center gap-3 mb-4">
          <h2 className="text-xl font-semibold text-gray-800 text-center">
            One Day One Ayat
          </h2>
        </div>
        <p className="text-sm text-gray-500 text-center">
          Tidak dapat memuat ayat hari ini.
        </p>
      </div>
    );
  }

  // Success
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border-b-6 border-gray-900 transition-shadow text-center">
      {/* Header */}
      <div className="flex flex-col items-center gap-3 mb-5">
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          One Day One Ayat
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center pt-3 mb-3 border-gray-200 text-sm text-gray-600 gap-1 font-medium">
        <span className="text-center">
          QS. {dailyAyat.surat.namaLatin} ({dailyAyat.surat.nomor}):
          {dailyAyat.ayat.nomorAyat}
        </span>
        <span className="font-medium text-center">{dailyAyat.surat.nama}</span>
      </div>

      {/* Arabic */}

      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-center text-lg leading-relaxed text-gray-800 font-arabic">
          {dailyAyat.ayat.teksArab}
        </p>
        <p className="text-sm text-gray-500 italic text-center">
          {dailyAyat.ayat.teksLatin}
        </p>
      </div>

      {/* Translation */}
      <p className="text-base text-gray-700 leading-relaxed mb-4 text-center">
        {dailyAyat.ayat.teksIndonesia}
      </p>
    </div>
  );
}
