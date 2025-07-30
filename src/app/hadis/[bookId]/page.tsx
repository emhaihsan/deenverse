"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { getHadisByRange, getHadisBooks } from "@/lib/api/hadis";
import { HadisContent, HadisBook } from "@/types/hadis";

const HADIS_PER_PAGE = 10;

export default function HadisBookPage() {
  const params = useParams();
  const bookId = params.bookId as string;

  const [hadisList, setHadisList] = useState<HadisContent[]>([]);
  const [bookInfo, setBookInfo] = useState<HadisBook | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchBookInfo() {
      try {
        const booksResponse = await getHadisBooks();
        if (!booksResponse.error) {
          const book = booksResponse.data.find((b) => b.id === bookId);
          if (book) {
            setBookInfo(book);
            setTotalPages(Math.ceil(book.available / HADIS_PER_PAGE));
          }
        }
      } catch (err) {
        console.error("Error fetching book info:", err);
      }
    }

    fetchBookInfo();
  }, [bookId]);

  useEffect(() => {
    async function fetchHadis() {
      if (!bookInfo) return;

      try {
        setLoading(true);
        const startNumber = (currentPage - 1) * HADIS_PER_PAGE + 1;
        const endNumber = Math.min(
          currentPage * HADIS_PER_PAGE,
          bookInfo.available
        );

        const response = await getHadisByRange(bookId, startNumber, endNumber);
        if (response.error) {
          throw new Error("Failed to fetch hadis");
        }
        setHadisList(response.data.hadiths);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchHadis();
  }, [bookId, currentPage, bookInfo]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading && !bookInfo) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat hadis...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Gagal Memuat Hadis
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Link
              href="/hadis"
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Kembali ke Daftar Kitab
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/hadis"
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold">{bookInfo?.name}</h1>
              <p className="opacity-90">
                {bookInfo?.available.toLocaleString()} hadis tersedia
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Pagination Info */}
        <div className="mb-8 text-center">
          <p className="text-gray-600">
            Halaman {currentPage} dari {totalPages} • Menampilkan hadis{" "}
            {(currentPage - 1) * HADIS_PER_PAGE + 1} -{" "}
            {Math.min(currentPage * HADIS_PER_PAGE, bookInfo?.available || 0)}
          </p>
        </div>

        {/* Hadis List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat hadis...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {hadisList.map((hadis) => (
              <div
                key={hadis.number}
                className="bg-white rounded-xl shadow-md p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-orange-100 rounded-full">
                    <BookOpen className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Hadis No. {hadis.number}
                  </h3>
                </div>

                {/* Arabic Text */}
                <div className="mb-6 p-6 bg-gray-50 rounded-lg">
                  <p className="text-right text-xl leading-relaxed text-gray-800 font-arabic">
                    {hadis.arab}
                  </p>
                </div>

                {/* Indonesian Translation */}
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">{hadis.id}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Sebelumnya
            </button>

            <div className="flex items-center gap-2">
              {/* Show page numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      currentPage === pageNum
                        ? "bg-orange-500 text-white"
                        : "bg-white border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Selanjutnya
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
