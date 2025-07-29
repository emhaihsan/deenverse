"use client";

import Link from "next/link";
import { ZakatType } from "@/types/zakat";
import { ArrowRight } from "lucide-react";

interface ZakatCardProps {
  zakat: ZakatType;
}

export default function ZakatCard({ zakat }: ZakatCardProps) {
  return (
    <Link href={`/zakat/${zakat.id}`}>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-sm transition-all duration-200 h-full group">
        {/* Header */}
        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-3xl">{zakat.icon}</div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                {zakat.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {zakat.description}
              </p>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                zakat.category === "wajib"
                  ? "bg-red-50 text-red-700"
                  : "bg-blue-50 text-blue-700"
              }`}
            >
              {zakat.category === "wajib" ? "Wajib" : "Sunnah"}
            </span>
          </div>

          {/* View Detail Button */}
          <div className="flex items-center justify-center gap-2 py-2 text-emerald-600 group-hover:text-emerald-700 transition-colors">
            <span className="text-sm font-medium">Lihat Detail</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
