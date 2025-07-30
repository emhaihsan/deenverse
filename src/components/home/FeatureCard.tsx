// components/Home/FeatureCard.tsx
import Link from "next/link";
import { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  color: string;
}

export default function FeatureCard({
  title,
  description,
  icon,
  href,
  color,
}: FeatureCardProps) {
  const isAvailable = [
    "Al-Qur'an",
    "Doa",
    "Edukasi Zakat",
    "Edukasi Sholat",
    "Edukasi Puasa",
    "Edukasi Haji dan Umroh",
  ].includes(title);

  const cardContent = (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 h-full border-l-4 ${color} ${
        isAvailable
          ? "hover:shadow-lg hover:-translate-y-1 cursor-pointer"
          : "opacity-70"
      }`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div
              className={`p-3 rounded-lg ${color
                .replace("border", "bg")
                .replace("-500", "-100")} text-${color.replace("border-", "")}`}
            >
              {icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 ml-3">
              {title}
            </h3>
          </div>
          {!isAvailable && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              Coming Soon
            </span>
          )}
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );

  return isAvailable ? (
    <Link href={href}>{cardContent}</Link>
  ) : (
    <div className="relative">
      {cardContent}
      <div className="absolute inset-0 cursor-not-allowed" />
    </div>
  );
}
