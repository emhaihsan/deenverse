"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSurat, getTafsir } from "@/lib/api/surat";
import { SuratData, TafsirData } from "@/types/surat";
import {
  BookOpen,
  MapPin,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Home,
  FileText,
  X,
} from "lucide-react";
import Link from "next/link";

export default function SuratPage() {
  const params = useParams();
  const [surat, setSurat] = useState<SuratData | null>(null);
  const [tafsirData, setTafsirData] = useState<TafsirData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTafsir, setSelectedTafsir] = useState<{
    ayat: number;
    teks: string;
  } | null>(null);
  const [loadingTafsir, setLoadingTafsir] = useState(false);

  const suratId = parseInt(params.id as string);

  useEffect(() => {
    const fetchSurat = async () => {
      if (!suratId || suratId < 1 || suratId > 114) {
        setError("Nomor surat tidak valid");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await getSurat(suratId);
        if (response.code === 200 && response.data) {
          setSurat(response.data);
        } else {
          setError("Gagal memuat surat");
        }
      } catch (error) {
        console.error("Error fetching surat:", error);
        setError("Terjadi kesalahan saat memuat surat");
      } finally {
        setLoading(false);
      }
    };

    fetchSurat();
  }, [suratId]);

  const handleTafsirClick = async (ayatNumber: number) => {
    if (!tafsirData) {
      setLoadingTafsir(true);
      try {
        const response = await getTafsir(suratId);
        if (response.code === 200 && response.data) {
          setTafsirData(response.data);
          const tafsirAyat = response.data.tafsir.find(
            (t) => t.ayat === ayatNumber
          );
          if (tafsirAyat) {
            setSelectedTafsir({
              ayat: ayatNumber,
              teks: tafsirAyat.teks,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching tafsir:", error);
      } finally {
        setLoadingTafsir(false);
      }
    } else {
      const tafsirAyat = tafsirData.tafsir.find((t) => t.ayat === ayatNumber);
      if (tafsirAyat) {
        setSelectedTafsir({
          ayat: ayatNumber,
          teks: tafsirAyat.teks,
        });
      }
    }
  };

  const closeTafsirModal = () => {
    setSelectedTafsir(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !surat) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">
              {error || "Surat tidak ditemukan"}
            </p>
            <Link
              href="/quran"
              className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Home className="w-4 h-4 mr-2" />
              Kembali ke Daftar Surat
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/quran"
              className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Kembali ke Daftar Surat
            </Link>

            <div className="flex items-center gap-2">
              {suratId > 1 && (
                <Link
                  href={`/quran/${suratId - 1}`}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Surat Sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Link>
              )}
              {suratId < 114 && (
                <Link
                  href={`/quran/${suratId + 1}`}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Surat Selanjutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {surat.namaLatin}
                </h1>
                <p className="text-emerald-600 font-medium">{surat.arti}</p>
              </div>
            </div>

            <div className="text-4xl font-arabic text-gray-800 mb-4">
              {surat.nama}
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{surat.tempatTurun}</span>
              </div>
              <span>{surat.jumlahAyat} ayat</span>
              <span>Surat ke-{surat.nomor}</span>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 text-sm leading-relaxed">
                {surat.deskripsi}
              </p>
            </div>
          </div>
        </div>

        {/* Bismillah (except for At-Taubah and Al-Fatihah) */}
        {suratId !== 9 && suratId !== 1 && (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <p className="text-3xl font-arabic text-gray-800 leading-loose">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className="text-gray-600 text-sm mt-2 italic">
              Bismillahir-rahmanir-rahim
            </p>
            <p className="text-gray-700 text-sm">
              Dengan nama Allah Yang Maha Pengasih, Maha Penyayang
            </p>
          </div>
        )}

        {/* Ayat List */}
        <div className="space-y-6">
          {surat.ayat.map((ayat) => (
            <div
              key={ayat.nomorAyat}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-600 font-semibold text-sm">
                    {ayat.nomorAyat}
                  </span>
                </div>

                <button
                  onClick={() => handleTafsirClick(ayat.nomorAyat)}
                  className="inline-flex items-center px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg transition-colors text-sm font-medium"
                  disabled={loadingTafsir}
                >
                  <FileText className="w-4 h-4 mr-1" />
                  {loadingTafsir ? "Loading..." : "Lihat Tafsir"}
                </button>
              </div>

              <div className="space-y-4">
                <div className="text-right">
                  <p className="text-2xl font-arabic leading-loose text-gray-800 mb-2">
                    {ayat.teksArab}
                  </p>
                </div>

                <div className="text-gray-600 italic text-sm">
                  {ayat.teksLatin}
                </div>

                <div className="border-l-4 border-emerald-500 pl-4">
                  <p className="text-gray-700 leading-relaxed">
                    {ayat.teksIndonesia}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Footer */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              {suratId > 1 && (
                <Link
                  href={`/quran/${suratId - 1}`}
                  className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Surat Sebelumnya
                </Link>
              )}
            </div>

            <Link
              href="/quran"
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Home className="w-4 h-4 mr-2" />
              Daftar Surat
            </Link>

            <div>
              {suratId < 114 && (
                <Link
                  href={`/quran/${suratId + 1}`}
                  className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Surat Selanjutnya
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tafsir Modal */}
      {selectedTafsir && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">
                Tafsir Ayat {selectedTafsir.ayat} - {surat.namaLatin}
              </h3>
              <button
                onClick={closeTafsirModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div
                className="prose prose-gray max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: selectedTafsir.teks }}
              />
            </div>
            <div className="flex justify-end p-6 border-t border-gray-200">
              <button
                onClick={closeTafsirModal}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
