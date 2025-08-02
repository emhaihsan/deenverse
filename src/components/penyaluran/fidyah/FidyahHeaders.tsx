import Link from "next/link";
import { ArrowLeft, Wheat } from "lucide-react";

export default function FidyahHeaders() {
  return (
    <>
      <div className="flex items-center">
        <Link
          href="/penyaluran"
          className="flex items-center gap-2 text-gray-900 hover:text-[#03533d] transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Penyaluran</span>
        </Link>
      </div>
      <div className="bg-[#03533d] text-white rounded-xl overflow-hidden border-b-6 border-gray-900 p-6">
        <div className="flex flex-col items-center text-center">
          <div className="p-3 bg-white/20 rounded-2xl mb-4">
            <Wheat className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Pembayaran Fidyah
          </h1>
          <p className="text-emerald-100 text-lg max-w-2xl">
            Laksanakan kewajiban fidyah Anda dengan mudah, aman, dan transparan
            melalui blockchain.
          </p>
        </div>
      </div>
    </>
  );
}
