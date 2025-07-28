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
} from "lucide-react";
import FilterSidebar from "@/components/doa/FilterSidebar";

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
    limit: 10,
  });
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDoas = useCallback(async () => {
    try {
      setLoading(true);
      const params: any = {
        page: filters.page,
        limit: filters.limit,
      };

      if (filters.categories?.length) {
        params.grup = filters.categories.join(",");
      }

      if (filters.tags?.length) {
        params.tag = filters.tags.join(",");
      }

      if (searchTerm) {
        params.search = searchTerm;
      }

      const response = await getDoaList(params);
      setDoas(response.data || []);
      setTotalItems(response.total || 0);
      setTotalPages(Math.ceil((response.total || 1) / (filters.limit || 10)));
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

  if (!doas.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Tidak ada doa yang ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="relative">
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <FilterSidebar onFilterChange={handleFilterChange} />
        </div>
        <div className="md:col-span-3">
          <div className="space-y-4">
            {doas.map((doa) => (
              <Link
                key={doa.id}
                href={`/doa/${doa.id}`}
                className="block group"
              >
                <div className="bg-white rounded-lg border border-gray-100 p-4 hover:border-emerald-200 hover:shadow-sm transition-all duration-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900 group-hover:text-emerald-700">
                        {doa.nama}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {doa.idn}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 ml-2">
                      {doa.grup}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
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
      </div>
    </div>
  );
}
