"use client";

import { useEffect, useState } from "react";
import { HandHelping, RefreshCw } from "lucide-react";
import { getDoaList } from "@/lib/api/doa";
import { Doa } from "@/types/doa";

export default function DailyDoa() {
  const [dailyDoa, setDailyDoa] = useState<Doa | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRandomDoa = async () => {
    setIsLoading(true);
    try {
      const response = await getDoaList({});
      const doas = response.data || [];

      if (doas.length > 0) {
        const randomIndex = Math.floor(Math.random() * doas.length);
        setDailyDoa(doas[randomIndex]);
      }
    } catch (error) {
      console.error("Error fetching daily doa:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomDoa();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <HandHelping className="w-5 h-5 text-indigo-600" />
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

  if (!dailyDoa) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <HandHelping className="w-5 h-5 text-indigo-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            One Day One Doa
          </h2>
        </div>
        <p className="text-gray-500">Tidak dapat memuat doa hari ini.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <HandHelping className="w-5 h-5 text-indigo-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            One Day One Doa
          </h2>
        </div>
        <button
          onClick={fetchRandomDoa}
          className="p-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
          title="Ganti Doa"
        >
          <RefreshCw className="w-5 h-5 text-indigo-600" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-sm text-gray-600 mb-3">
            <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs">
              {dailyDoa.grup}
            </span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xl font-arabic leading-loose text-gray-800 mb-2">
            {dailyDoa.ar}
          </p>
        </div>

        <div className="border-l-4 border-indigo-500 pl-4">
          <p className="text-gray-700 leading-relaxed">{dailyDoa.idn}</p>
        </div>
      </div>
    </div>
  );
}
