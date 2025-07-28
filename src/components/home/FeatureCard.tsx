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
  return (
    <Link href={href}>
      <div
        className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full border-l-4 ${color} hover:-translate-y-1`}
      >
        <div className="p-6">
          <div className="flex items-center mb-4">
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
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  );
}
