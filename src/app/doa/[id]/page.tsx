// app/doa/[id]/page.tsx
import { Metadata } from "next";
import { getDoaById } from "@/lib/api/doa";
import BackButton from "@/components/ui/BackButton";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { data: doa } = await getDoaById(parseInt(params.id));
  return {
    title: `${doa.nama} - Kumpulan Doa`,
    description: doa.idn,
  };
}

export default async function DoaDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: doa } = await getDoaById(parseInt(params.id));

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <BackButton href="/doa" className="mb-6" />

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="text-sm text-emerald-600 mb-2">{doa.grup}</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{doa.nama}</h1>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p
              className="text-2xl text-right text-gray-800 leading-loose mb-4"
              dir="rtl"
            >
              {doa.ar}
            </p>
            <p className="text-gray-600 italic mb-4">{doa.tr}</p>
            <p className="text-gray-700">{doa.idn}</p>
          </div>

          {doa.tentang && (
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border-l-4 border-amber-400">
              <h3 className="font-semibold text-amber-800 mb-2">Keterangan:</h3>
              <div className="text-amber-700 whitespace-pre-line">
                {doa.tentang}
              </div>
            </div>
          )}

          {doa.tag?.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {doa.tag.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
