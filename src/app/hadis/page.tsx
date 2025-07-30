"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Scroll, BookOpen, ArrowRight } from "lucide-react";
import { getHadisBooks } from "@/lib/api/hadis";
import { HadisBook } from "@/types/hadis";

export default function HadisPage() {
  const [books, setBooks] = useState<HadisBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true);
        const response = await getHadisBooks();
        if (response.error) {
          throw new Error("Failed to fetch hadis books");
        }
        setBooks(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat koleksi hadis...</p>
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
            <div className="p-4 bg-red-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Scroll className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Gagal Memuat Hadis
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="p-4 bg-white/10 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Scroll className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Koleksi Hadis</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Jelajahi hadis shahih dari berbagai kitab hadis terpercaya sebagai
              pedoman hidup umat Islam
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Kitab Hadis Tersedia
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Pilih kitab hadis yang ingin Anda baca. Setiap kitab berisi ribuan
            hadis yang telah dikumpulkan dan diverifikasi oleh para ulama.
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <Link href={`/hadis/${book.id}`} key={book.id}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col border-l-4 border-orange-400 group">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-orange-100 rounded-full">
                      <BookOpen className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                        {book.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {book.available.toLocaleString()} hadis tersedia
                      </p>
                    </div>
                  </div>

                  {/* View Button */}
                  <div className="mt-auto pt-4">
                    <div className="flex items-center justify-center gap-2 py-2 text-orange-600 group-hover:text-orange-700 transition-colors">
                      <span className="text-sm font-medium">Baca Hadis</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-xl p-8 shadow-md">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Tentang Hadis
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Hadis adalah perkataan, perbuatan, dan persetujuan Nabi Muhammad
              SAW yang menjadi sumber hukum Islam kedua setelah Al-Qur'an.
              Koleksi hadis ini dikumpulkan dari kitab-kitab hadis yang telah
              diverifikasi keasliannya oleh para ulama hadis.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
