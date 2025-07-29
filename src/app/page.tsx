// app/page.tsx
import HeaderCard from "@/components/home/HeaderCard";
import FeatureCard from "@/components/home/FeatureCard";
import DailyAyat from "@/components/home/DailyAyat";
import DailyDoa from "@/components/home/DailyDoa";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  Gift,
  Moon,
  Umbrella,
  HandHelping,
  HeartHandshake,
} from "lucide-react";

export default function Home() {
  // Update the features array in app/page.tsx
  const features = [
    {
      title: "Al-Qur'an",
      description:
        "Baca dan pelajari Al-Qur'an dengan terjemahan dan tafsir lengkap.",
      icon: <BookOpen className="w-6 h-6" />,
      href: "/quran",
      color: "border-emerald-500",
    },
    {
      title: "Doa",
      description: "Koleksi doa sehari-hari sesuai sunnah Rasulullah.",
      icon: <HandHelping className="w-6 h-6" />,
      href: "/doa",
      color: "border-indigo-500",
    },

    {
      title: "Edukasi Zakat",
      description: "Hitung dan ketahui kewajiban zakat Anda dengan mudah.",
      icon: <Gift className="w-6 h-6" />,
      href: "/zakat",
      color: "border-amber-500",
    },
    {
      title: "Edukasi Sholat",
      description: "Panduan lengkap tata cara sholat fardhu dan sunnah.",
      icon: <Clock className="w-6 h-6" />,
      href: "/sholat",
      color: "border-blue-500",
    },

    {
      title: "Edukasi Puasa",
      description: "Panduan puasa wajib dan sunnah beserta keutamaannya.",
      icon: <Moon className="w-6 h-6" />,
      href: "/puasa",
      color: "border-purple-500",
    },
    {
      title: "Edukasi Haji",
      description: "Panduan lengkap ibadah haji dan umroh.",
      icon: <Umbrella className="w-6 h-6" />,
      href: "/haji",
      color: "border-rose-500",
    },
  ];

  return (
    <div className="bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <HeaderCard />

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              href={feature.href}
              color={feature.color}
            />
          ))}
        </div>
        {/* Penyaluran CTA Card */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">
                Penyaluran Zakat, Infak & Sedekah On-Chain
              </h2>
              <p className="text-emerald-100">
                Salurkan harta Anda secara transparan dan aman menggunakan
                teknologi blockchain
              </p>
            </div>
            <Link
              href="/penyaluran"
              className="inline-flex items-center px-6 py-3 bg-white text-emerald-600 font-medium rounded-xl hover:bg-gray-100 transition-colors shadow-md whitespace-nowrap"
            >
              <HeartHandshake className="w-5 h-5 mr-2" />
              Salurkan Sekarang
            </Link>
          </div>
        </div>
        {/* Daily Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DailyAyat />
          <DailyDoa />
        </div>
      </div>
    </div>
  );
}
