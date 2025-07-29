// app/zakat/calculator/page.tsx
import ZakatCalculator from "@/components/zakat/ZakatCalculator";
import Link from "next/link";
import { ArrowLeft, Calculator, Info } from "lucide-react";

export default function ZakatCalculatorPage() {
  return (
    <div className="bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Navigation */}
        <div className="flex items-center gap-4">
          <Link
            href="/zakat"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Kembali ke Edukasi Zakat</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-emerald-50 rounded-2xl">
              <Calculator className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Kalkulator Zakat
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Hitung kewajiban zakat Anda dengan mudah dan akurat berdasarkan pendapatan dan harta Anda
          </p>
        </div>

        {/* Information Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-start gap-4 mb-4">
            <Info className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">Panduan Penggunaan Kalkulator Zakat</h2>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Pilih jenis zakat yang ingin dihitung</li>
                <li>• Masukkan jumlah harta atau pendapatan yang dimiliki</li>
                <li>• Kalkulator akan menghitung zakat yang wajib dibayarkan</li>
                <li>• Hasil perhitungan dapat digunakan sebagai referensi untuk pembayaran zakat</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Calculator */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 max-w-2xl mx-auto">
          <ZakatCalculator />
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Pentingnya Zakat dalam Islam</h2>
          <p className="text-gray-600 mb-4">
            Zakat merupakan rukun Islam kelima yang wajib dilaksanakan oleh setiap muslim yang memenuhi syarat. 
            Zakat memiliki peran penting dalam menciptakan keadilan sosial dan membantu sesama yang membutuhkan.
          </p>
          <p className="text-gray-600">
            Perhitungan zakat yang tepat dan pembayarannya dengan niat yang tulus akan membawa berkah dalam harta dan kehidupan seorang muslim.
          </p>
        </div>
      </div>
    </div>
  );
}
