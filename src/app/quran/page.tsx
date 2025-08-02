"use client";

import { useEffect, useState } from "react";
import { getAllSurat } from "@/lib/api/surat";
import { SuratListItem } from "@/types/surat";
import Link from "next/link";
import {
  BookOpen,
  MapPin,
  Loader2,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export default function QuranPage() {
  const [suratList, setSuratList] = useState<SuratListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchSuratList = async () => {
      setLoading(true);
      try {
        const data = await getAllSurat();
        setSuratList(data);
      } catch (error) {
        console.error("Error fetching surat list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuratList();
  }, []);

  const filteredSurat = suratList.filter((surat) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      surat.namaLatin.toLowerCase().includes(searchLower) ||
      surat.nama.toLowerCase().includes(searchLower) ||
      surat.arti.toLowerCase().includes(searchLower) ||
      surat.nomor.toString().includes(searchLower)
    );
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredSurat.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSurat = filteredSurat.slice(startIndex, endIndex);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const goToPage = (page: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    // First page button
    if (currentPage > 1) {
      buttons.push(
        <button
          key="first"
          onClick={() => goToPage(1)}
          className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          <ChevronsLeft className="h-5 w-5" />
        </button>
      );
      buttons.push(
        <button
          key="prev"
          onClick={() => goToPage(currentPage - 1)}
          className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      );
    }

    // Page number buttons
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
            currentPage === i
              ? "z-10 bg-emerald-600 text-white focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
          }`}
        >
          {i}
        </button>
      );
    }

    // Next and last page buttons
    if (currentPage < totalPages) {
      buttons.push(
        <button
          key="next"
          onClick={() => goToPage(currentPage + 1)}
          className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      );
      buttons.push(
        <button
          key="last"
          onClick={() => goToPage(totalPages)}
          className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          <ChevronsRight className="h-5 w-5" />
        </button>
      );
    }

    return buttons;
  };

  if (loading) {
    return (
      <div className="bg-gray-50 py-8 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Al-Qur&apos;an
              </h1>
              <p className="text-gray-600">
                Bacalah Al-Qur&apos;an dengan khusyuk
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              placeholder="Cari surat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Results Info */}
        {!loading && (
          <div className="text-sm text-gray-600">
            {filteredSurat.length > 0 ? (
              <span>
                Menampilkan {startIndex + 1}-
                {Math.min(endIndex, filteredSurat.length)} dari{" "}
                {filteredSurat.length} surat
                {totalPages > 1 &&
                  ` (Halaman ${currentPage} dari ${totalPages})`}
              </span>
            ) : (
              <span>Tidak ada surat yang ditemukan</span>
            )}
          </div>
        )}

        {/* Surat List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentSurat.map((surat) => (
            <Link key={surat.nomor} href={`/quran/${surat.nomor}`}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 border-l-4 border-emerald-500 hover:-translate-y-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 font-semibold text-sm">
                        {surat.nomor}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {surat.namaLatin}
                      </h3>
                      <p className="text-emerald-600 text-sm font-medium">
                        {surat.arti}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-arabic text-gray-800 mb-1">
                      {surat.nama}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{surat.tempatTurun}</span>
                  </div>
                  <span>{surat.jumlahAyat} ayat</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-center">
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                {renderPaginationButtons()}
              </nav>
            </div>
          </div>
        )}

        {filteredSurat.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">Tidak ada surat yang ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
}
