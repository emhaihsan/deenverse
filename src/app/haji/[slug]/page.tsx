// src/app/haji/[slug]/page.tsx
import { hajiData } from '@/data/hajiData';
import { notFound } from 'next/navigation';
import Header from '@/components/haji/Header';
import { Metadata } from 'next';
import { BookText, CheckSquare, History, Info, Scale, Sparkles, Star } from 'lucide-react';
import { HajiUmrahTopic, PillarOrWajib, Section } from '@/types/haji';

interface HajiDetailPageProps {
  params: { slug: 'haji' | 'umroh' };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: HajiDetailPageProps): Promise<Metadata> {
  const topic = hajiData[params.slug];
  if (!topic) {
    return { title: 'Topik Tidak Ditemukan' };
  }
  return {
    title: `${topic.title} - DeenVerse`,
    description: topic.definition.content as string,
  };
}

// Generate static paths for 'haji' and 'umroh'
export async function generateStaticParams() {
  return [{ slug: 'haji' }, { slug: 'umroh' }];
}

// Reusable component for standard sections
const DetailSection = ({ section, icon: Icon }: { section: Section; icon: React.ElementType }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex items-center mb-4">
      <Icon className="w-6 h-6 text-emerald-600 mr-3 flex-shrink-0" />
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

// Reusable component for Pillars (Rukun) and Obligations (Wajib)
const PillarSection = ({ data, icon: Icon }: { data: { title: string; items: PillarOrWajib[]; notes?: string }; icon: React.ElementType }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex items-center mb-4">
      <Icon className="w-6 h-6 text-emerald-600 mr-3 flex-shrink-0" />
      <h2 className="text-xl font-bold text-gray-800">{data.title}</h2>
    </div>
    <div className="space-y-4">
      {data.items.map((item, index) => (
        <div key={index} className="border-l-4 border-emerald-200 pl-4">
          <h3 className="font-semibold text-gray-900">{item.title}</h3>
          <p className="text-gray-700">{item.explanation}</p>
        </div>
      ))}
      {data.notes && (
        <div className="mt-4 p-3 bg-emerald-50 rounded-lg text-sm text-emerald-800">
          <p><Info className="inline w-4 h-4 mr-1"/><strong>Catatan:</strong> {data.notes}</p>
        </div>
      )}
    </div>
  </div>
);

const HajiDetailPage = ({ params }: HajiDetailPageProps) => {
  const topic: HajiUmrahTopic | undefined = hajiData[params.slug];

  if (!topic) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title={topic.title} subtitle={topic.definition.content as string} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <DetailSection section={topic.definition} icon={Info} />
          <DetailSection section={topic.history} icon={History} />
          <DetailSection section={topic.wisdom} icon={Sparkles} />
          <DetailSection section={topic.virtues} icon={Star} />
          {topic.syaratWajib && <DetailSection section={topic.syaratWajib} icon={CheckSquare} />}
          <DetailSection section={topic.hukum} icon={Scale} />
          {topic.perbedaanRukunWajib && <DetailSection section={topic.perbedaanRukunWajib} icon={BookText} />}
          <PillarSection data={topic.pillars} icon={CheckSquare} />
          <PillarSection data={topic.wajib} icon={CheckSquare} />
        </div>
      </main>
    </div>
  );
};

export default HajiDetailPage;
