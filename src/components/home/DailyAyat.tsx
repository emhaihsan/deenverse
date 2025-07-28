"use client";

import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
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

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <BookOpen className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="h-6 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="space-y-3">
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!dailyAyat) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <BookOpen className="w-5 h-5 text-emerald-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Ayat Hari Ini</h2>
        </div>
        <p className="text-gray-500">Tidak dapat memuat ayat hari ini.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <BookOpen className="w-5 h-5 text-emerald-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Ayat Hari Ini</h2>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-right">
          <p className="text-2xl font-arabic leading-loose text-gray-800 mb-2">
            {dailyAyat.ayat.teksArab}
          </p>
          <p className="text-sm text-gray-500 italic">
            {dailyAyat.ayat.teksLatin}
          </p>
        </div>

        <div className="border-l-4 border-emerald-500 pl-4">
          <p className="text-gray-700 leading-relaxed">
            {dailyAyat.ayat.teksIndonesia}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="text-sm text-gray-600">
            <span className="font-medium">
              QS. {dailyAyat.surat.namaLatin} ({dailyAyat.surat.nomor}):
              {dailyAyat.ayat.nomorAyat}
            </span>
          </div>
          <div className="text-sm text-emerald-600 font-medium">
            {dailyAyat.surat.nama}
          </div>
        </div>
      </div>
    </div>
  );
}
