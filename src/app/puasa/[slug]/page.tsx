// src/app/puasa/[slug]/page.tsx
import { puasaData } from '@/data/puasaData';
import { notFound } from 'next/navigation';
import Header from '@/components/puasa/Header';
import { Metadata } from 'next';
import { CheckCircle, Book, Clock, Star, AlertTriangle } from 'lucide-react';

interface PuasaDetailPageProps {
  params: { slug: string };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PuasaDetailPageProps): Promise<Metadata> {
  const puasa = puasaData.find((p) => p.slug === params.slug);
  if (!puasa) {
    return {
      title: 'Puasa Tidak Ditemukan',
      description: 'Informasi puasa yang Anda cari tidak ditemukan.',
    };
  }
  return {
    title: `${puasa.title} - Edukasi Puasa - DeenVerse`,
    description: puasa.description,
  };
}

// Generate static paths for all fasting types
export async function generateStaticParams() {
  return puasaData.map((puasa) => ({
    slug: puasa.slug,
  }));
}

const DetailSection = ({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex items-center mb-4">
      <Icon className="w-6 h-6 text-emerald-600 mr-3" />
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
    </div>
    <div className="prose prose-emerald max-w-none text-gray-700">
      {children}
    </div>
  </div>
);

const PuasaDetailPage = ({ params }: PuasaDetailPageProps) => {
  const puasa = puasaData.find((p) => p.slug === params.slug);

  if (!puasa) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title={puasa.title} subtitle={puasa.description} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Niat Section */}
          <DetailSection title="Niat Puasa" icon={CheckCircle}>
            <div className="bg-emerald-50 p-4 rounded-lg text-center">
              <p className="text-2xl font-arabic leading-relaxed text-emerald-900 mb-3">{puasa.niat.arabic}</p>
              <p className="italic text-emerald-800 mb-1">{puasa.niat.latin}</p>
              <p className="text-sm text-emerald-700">"{puasa.niat.translation}"</p>
            </div>
          </DetailSection>

          {/* Dalil Section */}
          <DetailSection title="Dalil & Landasan" icon={Book}>
            <ul className="list-disc pl-5 space-y-2">
              {puasa.dalil.map((d, index) => <li key={index}>{d}</li>)}
            </ul>
          </DetailSection>

          {/* Waktu Pelaksanaan Section */}
          <DetailSection title="Waktu Pelaksanaan" icon={Clock}>
            <p>{puasa.waktu}</p>
          </DetailSection>

          {/* Tata Cara Section */}
          <DetailSection title="Tata Cara Pelaksanaan" icon={CheckCircle}>
            <ol className="list-decimal pl-5 space-y-2">
              {puasa.tataCara.map((cara, index) => <li key={index}>{cara}</li>)}
            </ol>
          </DetailSection>

          {/* Keutamaan Section */}
          {puasa.keutamaan && puasa.keutamaan.length > 0 && (
            <DetailSection title="Keutamaan" icon={Star}>
              <ul className="list-disc pl-5 space-y-2">
                {puasa.keutamaan.map((utama, index) => <li key={index}>{utama}</li>)}
              </ul>
            </DetailSection>
          )}

          {/* Larangan Section */}
          {puasa.larangan && puasa.larangan.length > 0 && (
            <DetailSection title="Hal yang Perlu Diperhatikan/Larangan" icon={AlertTriangle}>
              <ul className="list-disc pl-5 space-y-2">
                {puasa.larangan.map((larang, index) => <li key={index}>{larang}</li>)}
              </ul>
            </DetailSection>
          )}
        </div>
      </main>
    </div>
  );
};

export default PuasaDetailPage;
