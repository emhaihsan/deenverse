// src/app/puasa/page.tsx
import { puasaData } from '@/data/puasaData';
import Header from '@/components/puasa/Header';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edukasi Puasa - DeenVerse',
  description: 'Panduan lengkap mengenai berbagai macam puasa dalam Islam, dari yang wajib hingga sunnah. Pelajari niat, tata cara, dan keutamaannya.',
};

const PuasaPage = () => {
  const categories = ['Wajib', 'Sunnah Muakkad', 'Sunnah'];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Wajib':
        return 'border-red-500';
      case 'Sunnah Muakkad':
        return 'border-amber-500';
      case 'Sunnah':
        return 'border-sky-500';
      default:
        return 'border-gray-300';
    }
  };

  return (
    <div className="py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <Header
          title="Panduan Puasa Lengkap"
          subtitle="Pelajari berbagai jenis puasa wajib dan sunnah sesuai tuntunan syariat."
          showBackButton={false}
        />

        <div className="space-y-12">
          {categories.map((category) => {
            const filteredPuasa = puasaData.filter(
              (p) => p.category === category
            );
            if (filteredPuasa.length === 0) return null;

            return (
              <div key={category}>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-emerald-500">{`Puasa ${category}`}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPuasa.map((puasa) => (
                    <Link href={`/puasa/${puasa.slug}`} key={puasa.id}>
                      <div
                        className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border-l-4 ${getCategoryColor(
                          puasa.category
                        )} h-full flex flex-col`}
                      >
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {puasa.title}
                        </h3>
                        <p className="text-gray-600 text-sm flex-grow">
                          {puasa.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PuasaPage;
