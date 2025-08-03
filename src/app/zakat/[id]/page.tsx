// app/zakat/[id]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { zakatTypes } from "@/data/zakatData";
import { ArrowLeft } from "lucide-react";
import ZakatDetailContent from "@/components/zakat/ZakatDetailContent";

// Sesuai format Next.js App Router
export interface ZakatDetailPageProps {
  params: Promise<{ id: string }>;
}

// Pre-generate semua path zakat
export async function generateStaticParams() {
  return zakatTypes.map((z) => ({
    id: z.id,
  }));
}

export default async function ZakatDetailPage({
  params,
}: ZakatDetailPageProps) {
  const { id } = await params; // await karena params adalah Promise
  const zakat = zakatTypes.find((z) => z.id === id);

  if (!zakat) {
    notFound();
  }

  return (
    <div className="py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
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
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-4xl">{zakat.icon}</div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-light text-gray-900 mb-2">
                {zakat.title}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {zakat.description}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                zakat.category === "wajib"
                  ? "bg-red-50 text-red-700"
                  : "bg-blue-50 text-blue-700"
              }`}
            >
              {zakat.category === "wajib" ? "Wajib" : "Sunnah"}
            </span>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="text-sm text-gray-500 mb-1">Nisab Umum</div>
              <div className="text-base font-medium text-gray-900">
                {zakat.madzhabOpinions[0]?.nisab || "Bervariasi"}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="text-sm text-gray-500 mb-1">Kadar Umum</div>
              <div className="text-base font-medium text-gray-900">
                {zakat.madzhabOpinions[0]?.kadar || "Bervariasi"}
              </div>
            </div>
          </div>
        </div>

        {/* Detail Content */}
        <ZakatDetailContent zakat={zakat} />
      </div>
    </div>
  );
}
