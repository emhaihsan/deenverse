// components/doa/DoaList.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { getDoaList } from "@/lib/api/doa";
import { Doa } from "@/types/doa";
import Link from "next/link";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Loader2,
  BookOpen,
} from "lucide-react";
import CompactFilter from "@/components/doa/CompactFilter";

type FilterParams = {
  categories?: string[];
  tags?: string[];
  search?: string;
  page?: number;
  limit?: number;
};

export default function DoaList() {
  const [doas, setDoas] = useState<Doa[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterParams>({
    categories: [],
    tags: [],
    page: 1,
    limit: 12,
  });
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDoas = useCallback(async () => {
    try {
      setLoading(true);

      // Since the API doesn't support server-side pagination, we'll do client-side filtering
      const response = await getDoaList({});
      let filteredDoas = response.data || [];

      // Apply search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        filteredDoas = filteredDoas.filter((doa) => {
          const title = (doa.nama || "").toLowerCase();
          const translation = (doa.idn || "").toLowerCase();
          const group = (doa.grup || "").toLowerCase();

          return (
            title.includes(searchLower) ||
            translation.includes(searchLower) ||
            group.includes(searchLower) ||
            doa.tag?.some((tag) => tag.toLowerCase().includes(searchLower))
          );
        });
      }

      // Apply category filter
      if (filters.categories && filters.categories.length > 0) {
        filteredDoas = filteredDoas.filter((doa) =>
          filters.categories!.includes(doa.grup)
        );
      }

      // Apply tag filter
      if (filters.tags && filters.tags.length > 0) {
        filteredDoas = filteredDoas.filter((doa) =>
          doa.tag?.some((tag) => filters.tags!.includes(tag))
        );
      }

      // Calculate pagination
      const totalFiltered = filteredDoas.length;
      const startIndex = ((filters.page || 1) - 1) * (filters.limit || 12);
      const endIndex = startIndex + (filters.limit || 12);
      const paginatedDoas = filteredDoas.slice(startIndex, endIndex);

      setDoas(paginatedDoas);
      setTotalItems(totalFiltered);
      setTotalPages(Math.ceil(totalFiltered / (filters.limit || 12)));
    } catch (error) {
      console.error("Error fetching doas:", error);
      setDoas([]);
    } finally {
      setLoading(false);
    }
  }, [filters, searchTerm]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchDoas();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [fetchDoas]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setFilters((prev) => ({ ...prev, page: 1 }));
  };

  const handleFilterChange = (newFilters: {
    categories: string[];
    tags: string[];
  }) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1, // Reset to first page when filters change
    }));
  };

  const goToPage = (page: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  if (loading && doas.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              placeholder="Cari doa atau dzikir..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <CompactFilter onFilterChange={handleFilterChange} />
        </div>
      </div>

      {/* Results Info */}
      {!loading && (
        <div className="text-sm text-gray-600">
          {totalItems > 0 ? (
            <span>
              Menampilkan {doas.length} dari {totalItems} doa
            </span>
          ) : (
            <span>Tidak ada doa yang ditemukan</span>
          )}
        </div>
      )}

      {/* Doa Cards Grid */}
      {!loading && doas.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Tidak ada doa yang ditemukan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doas.map((doa) => (
            <Link key={doa.id} href={`/doa/${doa.id}`} className="group">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 h-full border-l-4 border-indigo-500 hover:-translate-y-1">
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="p-3 rounded-lg bg-indigo-100 text-indigo-600 flex-shrink-0">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {doa.nama}
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 mt-1">
                        {doa.grup}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {doa.idn}
                  </p>
                  {doa.tag && doa.tag.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {doa.tag.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                      {doa.tag.length > 3 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                          +{doa.tag.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg shadow-sm">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => goToPage(filters.page! - 1)}
              disabled={filters.page === 1}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => goToPage(filters.page! + 1)}
              disabled={filters.page === totalPages}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Menampilkan{" "}
                <span className="font-medium">
                  {(filters.page! - 1) * filters.limit! + 1}
                </span>{" "}
                sampai{" "}
                <span className="font-medium">
                  {Math.min(filters.page! * filters.limit!, totalItems)}
                </span>{" "}
                dari <span className="font-medium">{totalItems}</span> hasil
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  onClick={() => goToPage(1)}
                  disabled={filters.page === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                >
                  <span className="sr-only">First</span>
                  <ChevronsLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  onClick={() => goToPage(filters.page! - 1)}
                  disabled={filters.page === 1}
                  className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (filters.page! <= 3) {
                    pageNum = i + 1;
                  } else if (filters.page! >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = filters.page! - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                        filters.page === pageNum
                          ? "z-10 bg-emerald-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                          : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => goToPage(filters.page! + 1)}
                  disabled={filters.page === totalPages}
                  className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  onClick={() => goToPage(totalPages)}
                  disabled={filters.page === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                >
                  <span className="sr-only">Last</span>
                  <ChevronsRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
