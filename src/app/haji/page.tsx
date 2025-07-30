// src/app/haji/page.tsx
import Header from '@/components/haji/Header';
import Link from 'next/link';
import { Metadata } from 'next';
import { hajiData } from '@/data/hajiData';
import { hajiArticlesData } from '@/data/hajiArticlesData';
import { BookOpen, Newspaper } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Edukasi Haji & Umroh - DeenVerse',
  description: 'Panduan lengkap dan artikel komprehensif mengenai ibadah Haji dan Umroh.',
};

const HajiLandingPage = () => {
  const mainGuides = [hajiData.haji, hajiData.umroh];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header 
        title="Edukasi Haji & Umroh"
        subtitle="Panduan lengkap untuk memahami dan mempersiapkan ibadah ke Tanah Suci."
        showBackButton={false}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Guides Section */}
        <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Panduan Utama</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {mainGuides.map((topic) => (
                <Link href={`/haji/${topic.id}`} key={topic.id}>
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-8 text-center h-full flex flex-col justify-center items-center border-t-4 border-emerald-500">
                    <div className="p-4 bg-emerald-100 rounded-full mb-4">
                      <BookOpen className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{topic.title}</h2>
                    <p className="text-gray-600">Klik untuk mempelajari panduan lengkap</p>
                  </div>
                </Link>
              ))}
            </div>
        </div>

        {/* Articles Section */}
        <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Artikel Terkait</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hajiArticlesData.map((article) => (
                <Link href={`/haji/artikel/${article.slug}`} key={article.id}>
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col h-full border-l-4 border-emerald-400">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex-grow">{article.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3">{article.summary}</p>
                    <div className="mt-4 text-sm font-semibold text-emerald-600 hover:text-emerald-800 flex items-center">
                      Baca Selengkapnya <Newspaper className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
        </div>
      </main>
    </div>
  );
};

export default HajiLandingPage;
