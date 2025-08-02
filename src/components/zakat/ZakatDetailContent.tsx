"use client";

import { useState } from "react";
import { ZakatType } from "@/types/zakat";
import { Users, BookOpen, Calculator } from "lucide-react";

interface ZakatDetailContentProps {
  zakat: ZakatType;
}

export default function ZakatDetailContent({ zakat }: ZakatDetailContentProps) {
  const [selectedMadzhab, setSelectedMadzhab] = useState<string>("all");

  const filteredOpinions =
    selectedMadzhab === "all"
      ? zakat.madzhabOpinions
      : zakat.madzhabOpinions.filter(
          (opinion) => opinion.madzhab.toLowerCase() === selectedMadzhab
        );

  return (
    <div className="space-y-8">
      {/* Definition */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-medium text-gray-900">Definisi</h2>
        </div>
        <p className="text-gray-700 leading-relaxed">{zakat.definisi}</p>
      </div>

      {/* Dalil */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Dalil Syariat
        </h2>
        <div className="space-y-4">
          {zakat.dalil.quran && (
            <div>
              <div className="text-sm text-emerald-600 font-medium mb-2">
                Al-Qur&apos;an
              </div>
              {zakat.dalil.quran.map((ayat, index) => (
                <div key={index} className="bg-emerald-50 p-4 rounded-xl">
                  <p className="text-gray-800 italic leading-relaxed">{ayat}</p>
                </div>
              ))}
            </div>
          )}
          {zakat.dalil.hadits && (
            <div>
              <div className="text-sm text-blue-600 font-medium mb-2">
                Hadits
              </div>
              {zakat.dalil.hadits.map((hadits, index) => (
                <div key={index} className="bg-blue-50 p-4 rounded-xl">
                  <p className="text-gray-800 italic leading-relaxed">
                    {hadits}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Madzhab Opinions */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-medium text-gray-900">
            Pendapat Madzhab
          </h2>
        </div>

        {/* Madzhab Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button
            onClick={() => setSelectedMadzhab("all")}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
              selectedMadzhab === "all"
                ? "bg-amber-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Semua Madzhab
          </button>
          {["hanafi", "maliki", "syafii", "hambali"].map((madzhab) => (
            <button
              key={madzhab}
              onClick={() => setSelectedMadzhab(madzhab)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                selectedMadzhab === madzhab
                  ? "bg-amber-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {madzhab.charAt(0).toUpperCase() + madzhab.slice(1)}
            </button>
          ))}
        </div>

        {/* Madzhab Opinions */}
        <div className="space-y-6">
          {filteredOpinions.map((opinion, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <h3 className="text-lg font-medium text-gray-900">
                  Madzhab {opinion.madzhab}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <div className="text-sm text-gray-500 mb-2">Nisab</div>
                  <div className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {opinion.nisab}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-2">Kadar</div>
                  <div className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {opinion.kadar}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-3">Syarat-syarat</div>
                <ul className="text-gray-700 space-y-2">
                  {opinion.syarat.map((syarat, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-amber-500 mt-1 text-sm">•</span>
                      <span>{syarat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {opinion.catatan && (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                  <div className="text-sm text-amber-700 font-medium mb-1">
                    Catatan
                  </div>
                  <div className="text-amber-800">{opinion.catatan}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Practical Guide */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-medium text-gray-900">Panduan Praktis</h2>
        </div>

        <div className="space-y-6">
          <div>
            <div className="text-sm text-gray-500 mb-3">Cara Perhitungan</div>
            <div className="text-gray-700 bg-gray-50 p-4 rounded-xl leading-relaxed">
              {zakat.praktis.caraPerhitungan}
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-500 mb-3">Contoh Kasus</div>
            <div className="text-gray-700 bg-blue-50 p-4 rounded-xl leading-relaxed">
              {zakat.praktis.contohKasus}
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-500 mb-3">Tips Zakat</div>
            <ul className="text-gray-700 space-y-3">
              {zakat.praktis.tipsZakat.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Sources */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Sumber Rujukan
        </h2>
        <div className="flex flex-wrap gap-3 mb-4">
          {zakat.sources.map((source, index) => (
            <span
              key={index}
              className="text-sm bg-gray-100 text-gray-700 px-3 py-2 rounded-lg"
            >
              {source}
            </span>
          ))}
        </div>
        <div className="text-sm text-gray-500">
          Terakhir diperbarui: {zakat.lastUpdated}
        </div>
      </div>
    </div>
  );
}
