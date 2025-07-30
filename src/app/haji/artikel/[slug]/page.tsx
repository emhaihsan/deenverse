// src/app/haji/artikel/[slug]/page.tsx
import { hajiArticlesData } from '@/data/hajiArticlesData';
import { notFound } from 'next/navigation';
import Header from '@/components/haji/Header';
import { Metadata } from 'next';
import { BookOpen, Info } from 'lucide-react';
import { Section } from '@/types/haji';

interface ArticlePageProps {
  params: { slug: string };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = hajiArticlesData.find((a) => a.slug === params.slug);
  if (!article) {
    return { title: 'Artikel Tidak Ditemukan' };
  }
  return {
    title: `${article.title} - DeenVerse`,
    description: article.summary,
  };
}

// Generate static paths for all articles
export async function generateStaticParams() {
  return hajiArticlesData.map((article) => ({
    slug: article.slug,
  }));
}

const ArticleSection = ({ section }: { section: Section }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex items-center mb-4">
      <Info className="w-6 h-6 text-emerald-600 mr-3 flex-shrink-0" />
      <h2 className="text-xl font-bold text-gray-800">{section.title}</h2>
    </div>
    <div className="prose prose-emerald max-w-none text-gray-700">
      {typeof section.content === 'string' ? (
        <p>{section.content}</p>
      ) : (
        <ul className="list-disc pl-5 space-y-2">
          {section.content.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      )}
    </div>
  </div>
);

const HajiArticlePage = ({ params }: ArticlePageProps) => {
  const article = hajiArticlesData.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title={article.title} subtitle="Artikel Edukasi Haji & Umroh" backButtonHref="/haji" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {article.content.map((section, index) => (
            <ArticleSection key={index} section={section} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HajiArticlePage;
