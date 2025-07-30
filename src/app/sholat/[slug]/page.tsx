import { shalatData } from '@/data/shalatData';
import { notFound } from 'next/navigation';
import Header from '@/components/sholat/Header';
import { Metadata } from 'next';

interface SholatDetailPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return shalatData.map((shalat) => ({
    slug: shalat.slug,
  }));
}

export async function generateMetadata({ params }: SholatDetailPageProps): Promise<Metadata> {
  const shalat = shalatData.find(s => s.slug === params.slug);

  if (!shalat) {
    return {
      title: 'Shalat Tidak Ditemukan',
      description: 'Halaman yang Anda cari tidak dapat ditemukan.',
    };
  }

  return {
    title: `${shalat.title} | Edukasi Shalat - DeenVerse`,
    description: shalat.description,
  };
}

export default function SholatDetailPage({ params }: SholatDetailPageProps) {
  const { slug } = params;
  const shalat = shalatData.find(s => s.slug === slug);

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
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Deskripsi</h2>
            </div>
            <p className="text-gray-700">{shalat.description}</p>
          </div>

          {/* Dalil Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="text-emerald-500 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Dalil Pelaksanaan</h2>
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
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Niat Shalat</h2>
            </div>
            <div className="space-y-4">
              <p className="text-2xl text-right font-arabic leading-relaxed">{shalat.niat.arabic}</p>
              <p className="text-emerald-700 italic">{shalat.niat.latin}</p>
              <p><strong>Artinya:</strong> "{shalat.niat.translation}"</p>
            </div>
          </div>

          {/* Jumlah Rakaat and Waktu Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-emerald-500 mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Jumlah Raka'at</h2>
              </div>
              <p className="text-2xl font-bold text-emerald-600">{shalat.jumlahRakaat}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-emerald-500 mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Waktu Pelaksanaan</h2>
              </div>
              <p className="text-gray-700">{shalat.waktu}</p>
            </div>
          </div>

          {/* Tata Cara Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="text-emerald-500 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Tata Cara Pelaksanaan</h2>
            </div>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              {shalat.tataCara.map((step) => (
                <li key={step.step} className={step.isOptional ? 'italic text-gray-500' : ''}>
                  {step.description}
                  {step.isOptional && ' (Opsional)'}
                </li>
              ))}
            </ol>
          </div>

          {/* Keutamaan Card (if exists) */}
          {shalat.keutamaan && shalat.keutamaan.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-emerald-500 mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Keutamaan</h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {shalat.keutamaan.map((item, index) => (
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
