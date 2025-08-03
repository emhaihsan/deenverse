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
      <div className="py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
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
      <div className="py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
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
    <div className="py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {bookInfo && (
          <div className="bg-[#03533d] rounded-xl p-6 mb-8 shadow-lg border-b-4 border-gray-900">
            <Link
              href="/hadis"
              className="inline-flex items-center text-emerald-200 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke daftar kitab
            </Link>
            <div className="flex items-center">
              <div className="p-3 bg-white/10 rounded-lg mr-4">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {bookInfo.name}
                </h1>
                <p className="text-emerald-100">
                  Total {bookInfo.available.toLocaleString()} hadis
                </p>
              </div>
            </div>
          </div>
        )}

        {totalPages > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <form
              onSubmit={handleJumpToPage}
              className="flex flex-col sm:flex-row items-center gap-3"
            >
              <label htmlFor="jump-page" className="font-medium text-gray-700">
                Lompat ke Halaman:
              </label>
              <input
                id="jump-page"
                type="number"
                value={jumpToPage}
                onChange={(e) => setJumpToPage(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-32 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                placeholder={`1 - ${totalPages}`}
                min="1"
                max={totalPages}
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Lompat
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat hadis...</p>
          </div>
        ) : (
          <div className="mb-8 space-y-6">
            {hadisList.map((hadis) => (
              <Link
                href={`/hadis/${bookId}/${hadis.number}`}
                key={hadis.number}
                className="block"
              >
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-emerald-600 hover:shadow-lg hover:border-emerald-700 transition-all space-y-2">
                  <p className="text-lg font-semibold text-emerald-800 mb-3">
                    Hadis No. {hadis.number}
                  </p>
                  <p
                    className="text-2xl text-right leading-loose font-naskh text-gray-900 mb-4 line-clamp-3"
                    dir="rtl"
                  >
                    {hadis.arab}
                  </p>
                  <p className="text-gray-700 leading-relaxed text-justify line-clamp-2">
                    {hadis.id}
                  </p>
                  <div className="text-center mt-4">
                    <span className="text-sm font-medium text-emerald-600 group-hover:text-emerald-700">
                      Baca Selengkapnya →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-10">
            <div className="flex items-center justify-center gap-1 sm:gap-2 mb-4 flex-wrap">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Halaman Pertama"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              <div className="flex items-center gap-1 flex-wrap justify-center">
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
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        currentPage === pageNum
                          ? "bg-emerald-600 text-white shadow-md"
                          : "bg-white border border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Halaman Terakhir"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
