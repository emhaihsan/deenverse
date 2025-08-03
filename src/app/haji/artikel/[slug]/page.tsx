// src/app/haji/artikel/[slug]/page.tsx
import { hajiArticlesData } from "@/data/hajiArticlesData";
import { notFound } from "next/navigation";
import Header from "@/components/haji/Header";
import { Metadata } from "next";
import { Info } from "lucide-react";
import { Section } from "@/types/haji";

// Type params untuk dynamic route
type Params = { slug: string };

// ✅ Generate metadata untuk SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params; // ✅ tunggu params
  const article = hajiArticlesData.find((a) => a.slug === slug);

  if (!article) {
    return { title: "Artikel Tidak Ditemukan" };
  }
  return {
    title: `${article.title} - DeenVerse`,
    description: article.summary,
  };
}

// ✅ Static paths untuk semua artikel
export async function generateStaticParams(): Promise<Params[]> {
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
      {typeof section.content === "string" ? (
        <p>{section.content}</p>
      ) : (
        <ul className="list-disc pl-5 space-y-2">
          {section.content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

export default async function HajiArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params; // ✅ tunggu params
  const article = hajiArticlesData.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <Header
          title={article.title}
          subtitle="Artikel Edukasi Haji & Umroh"
          backButtonHref="/haji"
        />
        <div className="space-y-6">
          {article.content.map((section, index) => (
            <ArticleSection key={index} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}
