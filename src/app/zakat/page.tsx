// app/zakat/page.tsx
import ZakatEducationList from "@/components/zakat/ZakatEducationList";
import Link from "next/link";
import Header from "@/components/zakat/Header";
import {
  BookOpen,
  Heart,
  HandCoins,
  Scale,
  HeartHandshake,
} from "lucide-react";

export default function ZakatPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header
        title="Edukasi Zakat"
        subtitle="Pelajari kewajiban zakat menurut hukum Islam dari empat madzhab utama"
        showBackButton={false}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Zakat Education List */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Jenis-Jenis Zakat
          </h2>
          <div className="max-w-6xl mx-auto">
            <ZakatEducationList />
          </div>
        </div>

        {/* Difference between Zakat, Infaq, and Sedekah */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Perbedaan Zakat, Infaq, dan Sedekah
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Zakat Card */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col h-full border-t-4 border-emerald-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-emerald-100 rounded-full">
                  <Scale className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Zakat</h3>
              </div>
              <div className="space-y-4 flex-grow">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Hukum:
                  </p>
                  <p className="text-gray-600">Wajib (Fardhu Ain)</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Definisi:
                  </p>
                  <p className="text-gray-600">
                    Harta yang wajib dikeluarkan oleh muslim yang memenuhi
                    syarat nisab dan haul.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Jenis:
                  </p>
                  <p className="text-gray-600">
                    Zakat Fitrah dan Zakat Mal (harta)
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Ketentuan:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    <li>Ada ketentuan nisab dan haul</li>
                    <li>Besarannya 2,5% untuk zakat mal</li>
                    <li>3,5 liter/2,5kg beras untuk zakat fitrah</li>
                    <li>Diberikan kepada 8 asnaf</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                  Wajib
                </span>
              </div>
            </div>

            {/* Infaq Card */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col h-full border-t-4 border-blue-400">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Infaq</h3>
              </div>
              <div className="space-y-4 flex-grow">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Hukum:
                  </p>
                  <p className="text-gray-600">
                    Bervariasi (Wajib, Sunnah, atau Haram)
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Definisi:
                  </p>
                  <p className="text-gray-600">
                    Mengeluarkan harta untuk suatu kepentingan, bisa untuk
                    kebaikan atau keburukan.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Contoh Infaq Wajib:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    <li>Membayar kafarat</li>
                    <li>Menunaikan nazar</li>
                    <li>Menafkahi keluarga</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Ciri Khas:
                  </p>
                  <p className="text-gray-600">
                    Tidak ada ketentuan nisab dan haul, lebih fleksibel dari
                    zakat.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Fleksibel
                </span>
              </div>
            </div>

            {/* Sedekah Card */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col h-full border-t-4 border-purple-400">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <HandCoins className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Sedekah</h3>
              </div>
              <div className="space-y-4 flex-grow">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Hukum:
                  </p>
                  <p className="text-gray-600">Sunnah</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Definisi:
                  </p>
                  <p className="text-gray-600">
                    Pemberian sukarela kepada yang membutuhkan, bisa berupa
                    materi atau non-materi.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Bentuk:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    <li>Materi (uang, makanan, dll)</li>
                    <li>Non-materi (senyum, jasa, dll)</li>
                    <li>Sedekah jariyah</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Keutamaan:
                  </p>
                  <p className="text-gray-600">
                    Amal yang pahalanya terus mengalir meski sudah meninggal
                    dunia.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  Sunnah
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Penyaluran CTA */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 text-center text-white max-w-6xl mx-auto hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300">
          <HeartHandshake className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">
            Salurkan Zakat, Infaq & Sedekah Anda
          </h2>
          <p className="mb-6 max-w-2xl mx-auto opacity-90">
            Gunakan platform on-chain kami untuk menyalurkan harta Anda secara
            transparan dan aman
          </p>
          <Link
            href="/penyaluran/zakat"
            className="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
          >
            Salurkan Zakat Sekarang
            <HeartHandshake className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
