"use client";

import { useState, useEffect } from "react";
import { Scroll, RefreshCw } from "lucide-react";
import { getRandomHadis } from "@/lib/api/hadis";
import { HadisSpecificResponse } from "@/types/hadis";

export default function DailyHadis() {
  const [hadis, setHadis] = useState<HadisSpecificResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomHadis = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getRandomHadis();
      setHadis(response);
    } catch (err) {
      setError("Gagal memuat hadis");
      console.error("Error fetching random hadis:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomHadis();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 rounded-2xl shadow-lg p-8 text-center border-b-6 border-gray-900 group animate-pulse">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Scroll className="w-5 h-5 text-orange-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            One Day One Hadis
          </h2>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat hadis...</p>
        </div>
      </div>
    );
  }

  if (error || !hadis) {
    return (
      <div className="bg-gray-50 rounded-2xl shadow-lg p-8 text-center border-b-6 border-gray-900 group">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Scroll className="w-5 h-5 text-orange-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            One Day One Hadis
          </h2>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">{error || "Gagal memuat hadis"}</p>
          <button
            onClick={fetchRandomHadis}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-2xl shadow-lg p-8 text-center border-b-6 border-gray-900 group hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Scroll className="w-5 h-5 text-orange-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            One Day One Hadis
          </h2>
        </div>
        <button
          onClick={fetchRandomHadis}
          className="p-2 text-gray-400 hover:text-orange-600 transition-colors"
          title="Hadis Baru"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Hadis Source */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="font-medium">{hadis.data.name}</span>
          <span>•</span>
          <span>No. {hadis.data.contents.number}</span>
        </div>

        {/* Arabic Text */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-right text-lg leading-relaxed text-gray-800 font-arabic">
            {hadis.data.contents.arab}
          </p>
        </div>

        {/* Indonesian Translation - Truncated */}
        <div className="text-gray-700 leading-relaxed">
          <p className="line-clamp-3">{hadis.data.contents.id}</p>
        </div>

        {/* Read More Link */}
        <div className="pt-2">
          <a
            href={`/hadis/${hadis.data.id}/${hadis.data.contents.number}`}
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
          >
            Baca Selengkapnya
            <Scroll className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
