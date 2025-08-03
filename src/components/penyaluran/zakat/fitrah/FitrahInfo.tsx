import { Info } from "lucide-react";

export default function FitrahInfo() {
  return (
    <div className="bg-gray-50 rounded-2xl border border-b-4 border-gray-900 p-6 my-8">
      <div className="flex items-center gap-3 mb-4">
        <Info className="w-6 h-6 text-[#03533d]" />
        <h2 className="text-xl font-medium text-gray-900">Informasi Penting</h2>
      </div>
      <ul className="text-gray-700 space-y-2 text-sm">
        <li className="flex items-start gap-2">
          <span className="text-[#03533d] mt-1">•</span>
          <span>Zakat fitrah wajib dibayar sebelum shalat Idul Fitri.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#03533d] mt-1">•</span>
          <span>Boleh dibayar sejak awal Ramadan hingga sebelum shalat Id.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#03533d] mt-1">•</span>
          <span>Wajib untuk setiap jiwa, termasuk bayi yang baru lahir.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#03533d] mt-1">•</span>
          <span>Lebih utama dibayar dalam bentuk makanan pokok.</span>
        </li>
      </ul>
    </div>
  );
}
