import Link from "next/link";
import { ArrowLeft, Beef } from "lucide-react";

export default function QurbanHeaders() {
  return (
    <div className="space-y-6">
      <Link
        href="/penyaluran"
        className="flex items-center gap-2 text-gray-600 hover:text-[#03533d] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Kembali ke Penyaluran</span>
      </Link>
      <div className="bg-[#03533d] text-white rounded-xl overflow-hidden border-b-6 border-gray-900 p-6">
        <div className="flex flex-col items-center text-center">
          <div className="p-3 bg-white/20 rounded-2xl mb-4">
            <Beef className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Qurban</h1>
          <p className="text-emerald-100 text-lg max-w-2xl mt-1">
            Salurkan hewan qurban Anda secara on-chain, aman, dan transparan.
          </p>
        </div>
      </div>
    </div>
  );
}
