"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Scale,
  Coins,
  Wheat,
  Sheet,
  Heart,
  Info,
} from "lucide-react";

const nisabCategories = [
  {
    id: "emas",
    title: "Nisab Emas",
    subtitle: "85 gram emas (± Rp 110-115 juta)",
    description: "Semua harta likuid dan aset yang nilainya setara uang",
    icon: Coins,
    color: "bg-yellow-50 border-yellow-200 text-yellow-800",
    iconColor: "text-yellow-600",
    kadar: "2,5%",
    haul: "1 tahun",
    zakatTypes: [
      "Zakat Perdagangan",
      "Zakat Perusahaan",
      "Zakat Properti",
      "Zakat Profesi",
      "Zakat Simpanan Emas/Perak/Perhiasan",
      "Zakat Investasi",
    ],
  },
  {
    id: "pertanian",
    title: "Nisab Pertanian",
    subtitle: "653 kg gabah ≈ 520 kg beras",
    description: "Hasil bumi dan produksi pertanian/perikanan",
    icon: Wheat,
    color: "bg-green-50 border-green-200 text-green-800",
    iconColor: "text-green-600",
    kadar: "5% / 10%",
    haul: "Setiap panen",
    zakatTypes: [
      "Zakat Tanaman Pangan",
      "Zakat Tanaman Produktif",
      "Zakat Tambak",
    ],
  },
  {
    id: "peternakan",
    title: "Nisab Peternakan",
    subtitle: "Kambing: 40 ekor • Sapi: 30 ekor • Unta: 5 ekor",
    description: "Ternak yang dipelihara untuk dikembangbiakkan",
    icon: Sheet,
    color: "bg-amber-50 border-amber-200 text-amber-800",
    iconColor: "text-amber-600",
    kadar: "Bervariasi",
    haul: "1 tahun",
    zakatTypes: ["Zakat Peternakan"],
  },
  {
    id: "fitrah",
    title: "Zakat Fitrah",
    subtitle: "Tidak ada nisab",
    description: "Wajib bagi setiap Muslim menjelang Idul Fitri",
    icon: Heart,
    color: "bg-rose-50 border-rose-200 text-rose-800",
    iconColor: "text-rose-600",
    kadar: "2,5 kg beras/orang",
    haul: "Setiap Ramadan",
    zakatTypes: ["Zakat Fitrah"],
  },
];

export default function ZakatPenyaluranPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
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
            <div className="p-3 bg-emerald-50 rounded-2xl">
              <Scale className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Penyaluran Zakat
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Pilih kategori zakat berdasarkan nisab yang sesuai dengan harta Anda
          </p>
        </div>

        {/* Information Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-3">
                Pengelompokan Berdasarkan Nisab
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Zakat dikelompokkan berdasarkan nisab (batas minimum harta yang
                wajib dizakati). Setiap kategori memiliki aturan nisab, kadar,
                dan haul yang berbeda. Pilih kategori yang sesuai dengan jenis
                harta yang ingin Anda zakati.
              </p>
            </div>
          </div>
        </div>

        {/* Nisab Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {nisabCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link key={category.id} href={`/penyaluran/zakat/${category.id}`}>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group h-full">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`p-3 rounded-xl ${
                        category.color.split(" ")[0]
                      } ${category.color.split(" ")[1]}`}
                    >
                      <IconComponent
                        className={`w-6 h-6 ${category.iconColor}`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-sm text-gray-600 font-medium">
                        {category.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Zakat Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        Kadar Zakat
                      </span>
                      <p className="text-sm font-medium text-gray-900">
                        {category.kadar}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        Haul
                      </span>
                      <p className="text-sm font-medium text-gray-900">
                        {category.haul}
                      </p>
                    </div>
                  </div>

                  {/* Zakat Types */}
                  <div className="mb-4">
                    <span className="text-xs text-gray-500 uppercase tracking-wide mb-2 block">
                      Jenis Zakat ({category.zakatTypes.length})
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {category.zakatTypes.slice(0, 3).map((type, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${category.color}`}
                        >
                          {type}
                        </span>
                      ))}
                      {category.zakatTypes.length > 3 && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          +{category.zakatTypes.length - 3} lainnya
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="text-center pt-2 border-t border-gray-100">
                    <span className="text-sm font-medium text-emerald-600 group-hover:text-emerald-700 transition-colors">
                      Pilih Kategori Ini →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Summary Table */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Ringkasan Kategori Nisab
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-900">
                    Kelompok Nisab
                  </th>
                  <th className="text-left py-3 px-2 font-medium text-gray-900">
                    Nisab
                  </th>
                  <th className="text-left py-3 px-2 font-medium text-gray-900">
                    Kadar
                  </th>
                  <th className="text-left py-3 px-2 font-medium text-gray-900">
                    Haul
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {nisabCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium text-gray-900">
                      {category.title}
                    </td>
                    <td className="py-3 px-2 text-gray-600">
                      {category.subtitle}
                    </td>
                    <td className="py-3 px-2 text-gray-600">
                      {category.kadar}
                    </td>
                    <td className="py-3 px-2 text-gray-600">{category.haul}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
