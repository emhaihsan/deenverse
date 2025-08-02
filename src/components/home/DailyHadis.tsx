"use client";

import { useState, useEffect } from "react";
import { Scroll, ArrowRight } from "lucide-react";
import { getRandomHadis } from "@/lib/api/hadis";
import { HadisSpecificResponse } from "@/types/hadis";

const placeholderHadis: HadisSpecificResponse = {
  code: 200,
  message: "success",
  error: false,
  data: {
    id: "bukhari",
    name: "Shahih Bukhari",
    available: 1,
    contents: {
      number: 1,
      arab: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
      id: "Sesungguhnya setiap amalan bergantung pada niatnya. Dan sesungguhnya setiap orang akan dibalas berdasarkan apa yang dia niatkan.",
    },
  },
};

export default function DailyHadis() {
  const [hadis, setHadis] = useState<HadisSpecificResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRandomHadis = async () => {
    try {
      setLoading(true);
      const response = await getRandomHadis();
      setHadis(response);
    } catch (err) {
      console.error("Error fetching random hadis, using placeholder:", err);
      setHadis(placeholderHadis);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomHadis();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow p-8 text-center border-b group animate-pulse">
        <div className="flex flex-col items-center gap-3 mb-4">
          <h2 className="text-xl font-semibold text-gray-800 text-center">
            One Day One Hadis
          </h2>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat hadis...</p>
        </div>
      </div>
    );
  }

  if (!hadis) {
    return (
      <div className="bg-white rounded-2xl shadow p-8 text-center border-b group">
        <div className="flex flex-col items-center gap-3 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 text-center">
            One Day One Hadis
          </h2>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Gagal memuat hadis.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-8 text-center border-b group hover:shadow-lg transition-shadow">
      <div className="flex flex-col items-center justify-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          One Day One Hadis
        </h2>
      </div>

      <div className="space-y-4">
        {/* Hadis Source */}
        <div className="flex flex-col items-center gap-1 text-sm text-gray-600">
          <span className="font-medium">{hadis.data.name}</span>
          <span>No. {hadis.data.contents.number}</span>
        </div>

        {/* Arabic Text */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-center text-lg leading-relaxed text-gray-800 font-arabic">
            {hadis.data.contents.arab}
          </p>
        </div>

        {/* Indonesian Translation - Truncated */}
        <div className="text-gray-700 leading-relaxed text-center">
          <p className="line-clamp-3">{hadis.data.contents.id}</p>
        </div>

        {/* Read More Button */}
        <div className="pt-2">
          <a
            href={`/hadis/${hadis.data.id}/${hadis.data.contents.number}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold shadow transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
            role="button"
            aria-label="Baca Selengkapnya tentang hadis"
          >
            Baca Selengkapnya
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
