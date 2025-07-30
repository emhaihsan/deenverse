// src/components/puasa/Header.tsx
import Link from "next/link";
import { ArrowLeft, BookOpenCheck } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backButtonHref?: string;
}

export default function Header({
  title,
  subtitle,
  showBackButton = true,
  backButtonHref = "/puasa",
}: HeaderProps) {
  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col space-y-2">
          {showBackButton && (
            <Link
              href={backButtonHref}
              className="inline-flex items-center text-sm text-emerald-600 hover:text-emerald-800 mb-2"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Kembali ke Daftar Puasa
            </Link>
          )}
          <div className="flex items-center">
            <div className="p-3 bg-emerald-50 rounded-2xl mr-4">
              <BookOpenCheck className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
