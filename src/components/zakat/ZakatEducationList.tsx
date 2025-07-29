"use client";

import { zakatTypes } from "@/data/zakatData";
import ZakatCard from "@/components/zakat/ZakatCard";

export default function ZakatEducationList() {
  return (
    <div className="space-y-6">
      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Menampilkan {zakatTypes.length} jenis zakat
      </div>

      {/* Zakat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {zakatTypes.map((zakat) => (
          <ZakatCard key={zakat.id} zakat={zakat} />
        ))}
      </div>

      {/* No Results - Not needed since we're showing all zakat types */}
    </div>
  );
}
