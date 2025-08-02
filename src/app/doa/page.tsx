// app/doa/page.tsx
import { Metadata } from "next";
import DoaList from "@/components/doa/DoaList";

export const metadata: Metadata = {
  title: "Kumpulan Doa & Dzikir",
  description:
    "Koleksi doa dan dzikir harian berdasarkan sunnah dengan terjemahan lengkap",
};

export default function DoaPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Kumpulan Doa & Dzikir
        </h1>
        <p className="text-gray-600">
          Temukan doa-doa pilihan berdasarkan Al-Qur&apos;an dan Hadits shahih
        </p>
      </div>

      <DoaList />
    </div>
  );
}
