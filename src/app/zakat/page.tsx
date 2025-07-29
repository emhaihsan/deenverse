// app/zakat/page.tsx
import ZakatEducationList from "@/components/zakat/ZakatEducationList";
import Link from "next/link";
import {
  Gift,
  Calculator,
  BookOpen,
  Heart,
  HandCoins,
  Scale,
} from "lucide-react";

export default function ZakatPage() {
  return (
    <div className="bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-emerald-50 rounded-2xl">
              <Gift className="w-8 h-8 text-emerald-600" />
            </div>
          </div>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Pelajari kewajiban zakat menurut hukum Islam dari empat madzhab
            utama
          </p>
        </div>

        {/* Zakat Education List */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-6">
            Jenis-Jenis Zakat
          </h2>
          <ZakatEducationList />
        </div>

        {/* Difference between Zakat, Infaq, and Sedekah */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-6 text-center">
            Perbedaan Zakat, Infaq, dan Sedekah
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Zakat Card */}
            <div className="border border-gray-200 rounded-xl p-5 hover:border-emerald-300 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Scale className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-medium text-gray-900">Zakat</h3>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                <span className="font-medium">Hukum:</span> Wajib (Fardhu Ain)
              </p>
              <p className="text-gray-600 text-sm mb-3">
                <span className="font-medium">Definisi:</span> Harta yang wajib
                dikeluarkan oleh muslim yang memenuhi syarat nisab dan haul.
              </p>
              <p className="text-gray-600 text-sm mb-3">
                <span className="font-medium">Jenis:</span> Zakat Fitrah dan
                Zakat Mal (harta)
              </p>
              <div className="space-y-3">
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Ketentuan:</span>
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                  <li>Ada ketentuan nisab dan haul</li>
                  <li>Besarannya 2,5% untuk zakat mal</li>
                  <li>3,5 liter/2,5kg beras untuk zakat fitrah</li>
                  <li>Diberikan kepada 8 asnaf</li>
                </ul>
              </div>
              <div className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full inline-block">
                Wajib
              </div>
            </div>

            {/* Infaq Card */}
            <div className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Heart className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900">Infaq</h3>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                <span className="font-medium">Hukum:</span> Bervariasi (Wajib,
                Sunnah, atau Haram)
              </p>
              <p className="text-gray-600 text-sm mb-3">
                <span className="font-medium">Definisi:</span> Mengeluarkan
                harta untuk suatu kepentingan, bisa untuk kebaikan atau
                keburukan.
              </p>
              <div className="space-y-3">
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Contoh Infaq Wajib:</span>
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                  <li>Membayar kafarat</li>
                  <li>Menunaikan nazar</li>
                  <li>Menafkahi keluarga</li>
                </ul>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                <span className="font-medium">Ciri Khas:</span> Tidak ada
                ketentuan nisab dan haul, lebih fleksibel dari zakat.
              </p>
              <div className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full inline-block">
                Fleksibel
              </div>
            </div>

            {/* Sedekah Card */}
            <div className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <HandCoins className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900">Sedekah</h3>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                <span className="font-medium">Hukum:</span> Sunnah
              </p>
              <p className="text-gray-600 text-sm mb-3">
                <span className="font-medium">Definisi:</span> Pemberian
                sukarela kepada yang membutuhkan, bisa berupa materi atau
                non-materi.
              </p>
              <div className="space-y-3">
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Bentuk:</span>
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                  <li>Materi (uang, makanan, dll)</li>
                  <li>Non-materi (senyum, jasa, dll)</li>
                  <li>Sedekah jariyah</li>
                </ul>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                <span className="font-medium">Keutamaan:</span> Amal yang
                pahalanya terus mengalir meski sudah meninggal dunia.
              </p>
              <div className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full inline-block">
                Sunnah
              </div>
            </div>
          </div>
        </div>

        {/* Calculator CTA */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 text-center text-white">
          <Calculator className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-medium mb-2">
            Hitung Kewajiban Zakat Anda
          </h2>
          <p className="mb-6 max-w-2xl mx-auto opacity-90">
            Gunakan kalkulator kami untuk menghitung zakat yang tepat sesuai
            dengan harta dan pendapatan Anda
          </p>
          <Link
            href="/zakat/calculator"
            className="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
          >
            Buka Kalkulator Zakat
            <Calculator className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
