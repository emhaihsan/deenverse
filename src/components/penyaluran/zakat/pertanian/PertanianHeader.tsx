import Link from "next/link";
import { ArrowLeft, Wheat } from "lucide-react";

export default function PertanianHeader() {
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/penyaluran/zakat"
        className="inline-flex items-center gap-2 text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Kembali ke Kategori Zakat</span>
      </Link>

      {/* Header */}
      <div className="bg-[#03533d] text-white rounded-xl overflow-hidden border-b-6 border-gray-900 p-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-emerald-100 rounded-2xl border border-emerald-200">
            <Wheat className="w-8 h-8 text-[#03533d]" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-light text-white mb-4">
          Zakat Pertanian
        </h1>
        <p className="text-lg text-emerald-100 max-w-2xl mx-auto font-light leading-relaxed">
          Nisab: 520 kg beras • Kadar: 5%-10% • Haul: Setiap Panen
        </p>
      </div>
    </div>
  );
}
