"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, Share2, Copy, Check } from "lucide-react";
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
  const [copied, setCopied] = useState(false);

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

  const handleCopyText = async () => {
    if (!hadis) return;

    const textToCopy = `${hadis.data.contents.arab}\n\n${hadis.data.contents.id}\n\n- ${hadis.data.name} No. ${hadis.data.contents.number}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const handleShare = async () => {
    if (!hadis) return;

    const shareData = {
      title: `${hadis.data.name} No. ${hadis.data.contents.number}`,
      text: hadis.data.contents.id,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback to copying URL
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Failed to share:", err);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat hadis...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !hadis) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Hadis Tidak Ditemukan
            </h2>
            <p className="text-gray-600 mb-4">
              {error || "Hadis yang Anda cari tidak ditemukan"}
            </p>
            <div className="space-x-4">
              <Link
                href="/hadis"
                className="inline-block bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Kembali ke Daftar Kitab
              </Link>
              {bookInfo && (
                <Link
                  href={`/hadis/${bookId}`}
                  className="inline-block bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Kembali ke {bookInfo.name}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href={`/hadis/${bookId}`}
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{hadis.data.name}</h1>
              <p className="opacity-90">
                Hadis No. {hadis.data.contents.number}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyText}
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                title="Salin Teks"
              >
                {copied ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={handleShare}
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                title="Bagikan"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          {/* Hadis Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-orange-100 rounded-full">
              <BookOpen className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {hadis.data.name} - Hadis No. {hadis.data.contents.number}
              </h2>
              <p className="text-gray-600">
                {bookInfo &&
                  `${bookInfo.available.toLocaleString()} hadis tersedia dalam kitab ini`}
              </p>
            </div>
          </div>

          {/* Arabic Text */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Teks Arab
            </h3>
            <div className="p-6 bg-gray-50 rounded-lg border-r-4 border-orange-400">
              <p className="text-right text-2xl leading-relaxed text-gray-800 font-arabic">
                {hadis.data.contents.arab}
              </p>
            </div>
          </div>

          {/* Indonesian Translation */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Terjemahan Indonesia
            </h3>
            <div className="p-6 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <p className="text-gray-800 leading-relaxed text-lg">
                {hadis.data.contents.id}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="flex items-center gap-4">
              {hadisNumber > 1 && (
                <Link
                  href={`/hadis/${bookId}/${hadisNumber - 1}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Hadis Sebelumnya
                </Link>
              )}
            </div>

            <div className="flex items-center gap-4">
              {bookInfo && hadisNumber < bookInfo.available && (
                <Link
                  href={`/hadis/${bookId}/${hadisNumber + 1}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Hadis Selanjutnya
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </Link>
              )}
            </div>
          </div>

          {/* Back to List */}
          <div className="text-center mt-8">
            <Link
              href={`/hadis/${bookId}`}
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Kembali ke Daftar {hadis.data.name}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
