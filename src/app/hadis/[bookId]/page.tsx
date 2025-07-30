"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { getHadisByRange, getHadisBooks } from "@/lib/api/hadis";
import { HadisContent, HadisBook } from "@/types/hadis";

const HADIS_PER_PAGE = 10;

export default function HadisBookPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const bookId = params.bookId as string;

  const [hadisList, setHadisList] = useState<HadisContent[]>([]);
  const [bookInfo, setBookInfo] = useState<HadisBook | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [jumpToPage, setJumpToPage] = useState("");

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
    // Handle URL parameters
    const pageParam = searchParams.get("page");

    if (pageParam) {
      const page = parseInt(pageParam);
      if (!isNaN(page) && page > 0) {
        setCurrentPage(page);
      }
    }
  }, [searchParams]);

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
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleJumpToPage = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(jumpToPage);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      handlePageChange(page);
      setJumpToPage("");
    }
  };

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
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
        {/* Pagination Info and Controls */}
        <div className="mb-8 space-y-4">
          <div className="text-center">
            <p className="text-gray-600">
              Halaman {currentPage} dari {totalPages} • Menampilkan hadis{" "}
              {(currentPage - 1) * HADIS_PER_PAGE + 1} -{" "}
              {Math.min(currentPage * HADIS_PER_PAGE, bookInfo?.available || 0)}
            </p>
          </div>

          {/* Jump to Page Form */}
          <div className="flex justify-center">
            <form
              onSubmit={handleJumpToPage}
              className="flex items-center gap-2"
            >
              <label htmlFor="jump-page" className="text-sm text-gray-600">
                Lompat ke halaman:
              </label>
              <input
                type="number"
                id="jump-page"
                value={jumpToPage}
                onChange={(e) => setJumpToPage(e.target.value)}
                placeholder={`1-${totalPages}`}
                min="1"
                max={totalPages}
                className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <button
                type="submit"
                className="px-3 py-1 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
              >
                Go
              </button>
            </form>
          </div>
        </div>

        {/* Hadis List - Arabic Only */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat hadis...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {hadisList.map((hadis) => (
              <Link
                key={hadis.number}
                href={`/hadis/${bookId}/${hadis.number}`}
              >
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-100 rounded-full">
                      <BookOpen className="w-5 h-5 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                      Hadis No. {hadis.number}
                    </h3>
                  </div>

                  {/* Arabic Text Only */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-right text-xl leading-relaxed text-gray-800 font-arabic line-clamp-3">
                      {hadis.arab}
                    </p>
                  </div>

                  {/* Read More Indicator */}
                  <div className="mt-4 text-center">
                    <span className="text-sm text-orange-600 group-hover:text-orange-700 font-medium">
                      Klik untuk membaca terjemahan →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 space-y-4">
            {/* Main Pagination Controls */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {/* First Page */}
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Halaman Pertama"
              >
                <ChevronsLeft className="w-4 h-4" />
                <span className="hidden sm:inline">First</span>
              </button>

              {/* Previous Page */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Sebelumnya</span>
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {getPageNumbers().map((pageNum, index) =>
                  pageNum === "..." ? (
                    <span
                      key={`dots-${index}`}
                      className="px-2 py-2 text-gray-500"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum as number)}
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        currentPage === pageNum
                          ? "bg-orange-500 text-white"
                          : "bg-white border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                )}
              </div>

              {/* Next Page */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span className="hidden sm:inline">Selanjutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Last Page */}
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Halaman Terakhir"
              >
                <span className="hidden sm:inline">Last</span>
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Jump Options */}
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="text-gray-500">Lompat cepat:</span>
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 10))}
                disabled={currentPage <= 10}
                className="px-2 py-1 text-orange-600 hover:text-orange-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                -10
              </button>
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 100))}
                disabled={currentPage <= 100}
                className="px-2 py-1 text-orange-600 hover:text-orange-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                -100
              </button>
              <span className="text-gray-400">|</span>
              <button
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 100))
                }
                disabled={currentPage >= totalPages - 100}
                className="px-2 py-1 text-orange-600 hover:text-orange-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                +100
              </button>
              <button
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 10))
                }
                disabled={currentPage >= totalPages - 10}
                className="px-2 py-1 text-orange-600 hover:text-orange-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                +10
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
