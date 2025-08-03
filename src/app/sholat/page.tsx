import { shalatData } from "@/data/shalatData";
import Header from "@/components/sholat/Header";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edukasi Shalat | DeenVerse",
  description:
    "Panduan lengkap macam-macam shalat dalam Islam, dari shalat fardhu hingga shalat sunnah. Pelajari niat, tata cara, dan keutamaannya.",
};

export default function SholatPage() {
  // Group shalats by category
  const groupedShalats: Record<string, typeof shalatData> = {};
  shalatData.forEach((shalat) => {
    if (!groupedShalats[shalat.category]) {
      groupedShalats[shalat.category] = [];
    }
    groupedShalats[shalat.category].push(shalat);
  });

  // Define category order
  const categoryOrder = [
    "Wajib",
    "Sunnah Muakkad",
    "Sunnah Ghairu Muakkad",
    "Khusus",
  ];

  return (
    <div className="py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <Header
          title="Panduan Lengkap Edukasi Shalat"
          subtitle="Pelajari berbagai jenis shalat, mulai dari yang wajib hingga sunnah, untuk menyempurnakan ibadah Anda."
          showBackButton={false}
        />
        <div className="space-y-12">
          {categoryOrder.map(
            (category) =>
              groupedShalats[category] && (
                <div key={category}>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2 border-b-4 border-emerald-500 pb-2">
                    Shalat {category}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {category === "Wajib" &&
                      "Shalat wajib yang harus dilaksanakan oleh setiap Muslim yang telah memenuhi syarat."}
                    {category === "Sunnah Muakkad" &&
                      "Shalat sunnah yang sangat dianjurkan dan hampir wajib."}
                    {category === "Sunnah Ghairu Muakkad" &&
                      "Shalat sunnah yang dianjurkan namun tidak seberat sunnah muakkad."}
                    {category === "Khusus" &&
                      "Shalat khusus yang dilakukan dalam kondisi atau situasi tertentu."}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedShalats[category].map((shalat) => (
                      <Link
                        key={shalat.id}
                        href={`/sholat/${shalat.slug}`}
                        className="group bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out p-6 h-full flex flex-col justify-between"
                      >
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                            {shalat.title}
                          </h3>
                          <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                            {shalat.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-end text-sm font-medium text-emerald-600 mt-4 group-hover:underline">
                          Selengkapnya
                          <svg
                            className="ml-1 h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            ></path>
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}
