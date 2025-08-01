// app/page.tsx
import HeaderCard from "@/components/home/HeaderCard";
import DailyAyat from "@/components/home/DailyAyat";
import DailyHadis from "@/components/home/DailyHadis";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  Gift,
  Moon,
  Umbrella,
  HandHelping,
  HeartHandshake,
  Scroll,
} from "lucide-react";

export default function Home() {
  // Primary features (Quran and Hadis)
  const primaryFeatures = [
    {
      title: "Al-Qur'an",
      icon: <BookOpen className="w-12 h-12" />,
      href: "/quran",
      color: "border-gray-900",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-900",
    },
    {
      title: "Hadis",
      icon: <Scroll className="w-12 h-12" />,
      href: "/hadis",
      color: "border-gray-900",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-900",
    },
  ];

  // Secondary features (regular grid)
  const secondaryFeatures = [
    {
      title: "Doa",
      icon: <HandHelping className="w-6 h-6" />,
      href: "/doa",
      color: "border-gray-900",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-900",
    },
    {
      title: "Edukasi Zakat",
      icon: <Gift className="w-6 h-6" />,
      href: "/zakat",
      color: "border-gray-950",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-950",
    },
    {
      title: "Edukasi Sholat",
      icon: <Clock className="w-6 h-6" />,
      href: "/sholat",
      color: "border-gray-950",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-950",
    },
    {
      title: "Edukasi Puasa",
      icon: <Moon className="w-6 h-6" />,
      href: "/puasa",
      color: "border-gray-950",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-950",
    },
    {
      title: "Edukasi Haji dan Umroh",
      icon: <Umbrella className="w-6 h-6" />,
      href: "/haji",
      color: "border-gray-900",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-900",
    },
  ];

  return (
    <div className="bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <HeaderCard />

        {/* Primary Features - Quran and Hadis */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {primaryFeatures.map((feature) => (
              <Link key={feature.title} href={feature.href}>
                <div
                  className={`bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-center border-b-6 ${feature.color} group`}
                >
                  <div
                    className={`p-4 ${feature.bgColor} rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <div className={feature.iconColor}>{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-[#03533d] duration-300 ">
                    {feature.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Secondary Features - Regular Grid */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {secondaryFeatures.map((feature) => (
              <Link key={feature.title} href={feature.href}>
                <div
                  className={`bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center border-b-6 ${feature.color} group`}
                >
                  <div
                    className={`p-3 ${feature.bgColor} rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <div className={feature.iconColor}>{feature.icon}</div>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-50 group-hover:text-gray-50 transition-colors">
                    {feature.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Penyaluran CTA */}
        <div className="bg-[#03533d] rounded-xl overflow-hidden border-b-6 border-gray-900 p-8 text-center text-white transition-all duration-300">
          <HeartHandshake className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">
            Salurkan Zakat, Infaq & Sedekah
          </h2>
          <p className="mb-6 max-w-2xl mx-auto opacity-90">
            Gunakan platform on-chain kami untuk menyalurkan harta Anda secara
            transparan dan aman
          </p>
          <Link
            href="/penyaluran"
            className="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
          >
            Mulai Penyaluran
            <HeartHandshake className="w-4 h-4" />
          </Link>
        </div>

        {/* Daily Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DailyAyat />
          <DailyHadis />
        </div>
      </div>
    </div>
  );
}
