// src/app/sholat/[slug]/page.tsx
import { shalatData } from "@/data/shalatData";
import { notFound } from "next/navigation";
import Header from "@/components/sholat/Header";
import { Metadata } from "next";

type Params = { slug: string };

// ✅ Generate static paths
export async function generateStaticParams(): Promise<Params[]> {
  return shalatData.map((shalat) => ({
    slug: shalat.slug,
  }));
}

// ✅ Generate metadata untuk SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const shalat = shalatData.find((s) => s.slug === slug);

  if (!shalat) {
    return {
      title: "Shalat Tidak Ditemukan",
      description: "Halaman yang Anda cari tidak dapat ditemukan.",
    };
  }

  return {
    title: `${shalat.title} | Edukasi Shalat - DeenVerse`,
    description: shalat.description,
  };
}

// ✅ Halaman detail shalat
export default async function SholatDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const shalat = shalatData.find((s) => s.slug === slug);

  if (!shalat) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title={shalat.title}
        subtitle={`Panduan lengkap ${shalat.title}`}
        showBackButton={true}
        backButtonHref="/sholat"
      />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Description Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="text-emerald-500 mr-4">
                {/* Icon Buku */}
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Deskripsi
              </h2>
            </div>
            <p className="text-gray-700">{shalat.description}</p>
          </div>

          {/* Dalil Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="text-emerald-500 mr-4">
                {/* Icon Dalil */}
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Dalil Pelaksanaan
              </h2>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {shalat.dalil.map((dalil, index) => (
                <li key={index}>{dalil}</li>
              ))}
            </ul>
          </div>

          {/* Niat Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="text-emerald-500 mr-4">
                {/* Icon Niat */}
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Niat Shalat
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-2xl text-right font-arabic leading-relaxed">
                {shalat.niat.arabic}
              </p>
              <p className="text-emerald-700 italic">{shalat.niat.latin}</p>
              <p>
                <strong>Artinya:</strong> &ldquo;{shalat.niat.translation}
                &rdquo;
              </p>
            </div>
          </div>

          {/* Jumlah Rakaat & Waktu */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Jumlah Raka&apos;t
              </h2>
              <p className="text-2xl font-bold text-emerald-600">
                {shalat.jumlahRakaat}
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Waktu Pelaksanaan
              </h2>
              <p className="text-gray-700">{shalat.waktu}</p>
            </div>
          </div>

          {/* Tata Cara */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Tata Cara Pelaksanaan
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              {shalat.tataCara.map((step) => (
                <li
                  key={step.step}
                  className={step.isOptional ? "italic text-gray-500" : ""}
                >
                  {step.description}
                  {step.isOptional && " (Opsional)"}
                </li>
              ))}
            </ol>
          </div>

          {/* Keutamaan */}
          {shalat.keutamaan?.length && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Keutamaan
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {shalat.keutamaan?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
