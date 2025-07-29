// app/page.tsx
import HeaderCard from "@/components/home/HeaderCard";
import FeatureCard from "@/components/home/FeatureCard";
import DailyAyat from "@/components/home/DailyAyat";
import DailyDoa from "@/components/home/DailyDoa";
import {
  BookOpen,
  Clock,
  Gift,
  Moon,
  Umbrella,
  HandHelping,
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
        {/* Daily Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DailyAyat />
          <DailyDoa />
        </div>
      </div>
    </div>
  );
}
