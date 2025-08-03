"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSpecificHadis, getHadisBooks } from "@/lib/api/hadis";
import { HadisSpecificResponse, HadisBook } from "@/types/hadis";

export default function HadisDetailPage() {
  const params = useParams();
  const bookId = params.bookId as string;
  const hadisNumber = parseInt(params.hadisNumber as string);

  const [hadis, setHadis] = useState<HadisSpecificResponse | null>(null);
  const [bookInfo, setBookInfo] = useState<HadisBook | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch hadis and book info in parallel
        const [hadisResponse, booksResponse] = await Promise.all([
          getSpecificHadis(bookId, hadisNumber),
          getHadisBooks(),
        ]);

        if (hadisResponse.error) {
          throw new Error("Hadis tidak ditemukan");
        }

        setHadis(hadisResponse);

        if (!booksResponse.error) {
          const book = booksResponse.data.find((b) => b.id === bookId);
          setBookInfo(book || null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    if (bookId && hadisNumber) {
      fetchData();
    }
  }, [bookId, hadisNumber]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat hadis...</p>
        </div>
      </div>
    );
  }

  if (error || !hadis) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-md max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-red-600">Terjadi Kesalahan</h2>
          <p className="mt-2 text-gray-700 mb-6">
            {error || "Hadis yang Anda cari tidak dapat ditemukan."}
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/hadis"
              className="inline-block bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Daftar Kitab
            </Link>
            {bookInfo && (
              <Link
                href={`/hadis/${bookId}`}
                className="inline-block bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Kembali ke {bookInfo.name}
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-[#03533d] text-white sticky top-0 z-10 shadow-md rounded-lg">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link
                  href={`/hadis/${bookId}?page=${Math.ceil(hadisNumber / 10)}`}
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  title={`Kembali ke daftar ${bookInfo?.name}`}
                >
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                  <h1 className="text-xl font-bold">{hadis.data.name}</h1>
                  <p className="text-sm opacity-90">
                    Hadis No. {hadis.data.contents.number}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          {/* Arabic Text */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Teks Arab
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg border-r-4 border-emerald-600">
              <p
                className="text-right text-3xl leading-loose font-naskh text-gray-900"
                dir="rtl"
              >
                {hadis.data.contents.arab}
              </p>
            </div>
          </div>

          {/* Indonesian Translation */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Terjemahan
            </h2>
            <div className="bg-emerald-50 p-6 rounded-lg border-l-4 border-emerald-600">
              <p className="text-gray-800 leading-relaxed text-lg">
                {hadis.data.contents.id}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <div>
            {hadisNumber > 1 && (
              <Link
                href={`/hadis/${bookId}/${hadisNumber - 1}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors shadow-sm border border-gray-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Sebelumnya
              </Link>
            )}
          </div>

          <div>
            {bookInfo && hadisNumber < bookInfo.available && (
              <Link
                href={`/hadis/${bookId}/${hadisNumber + 1}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
              >
                Selanjutnya
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
