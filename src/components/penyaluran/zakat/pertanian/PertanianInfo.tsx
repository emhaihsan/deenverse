import { Info } from "lucide-react";

export default function PertanianInfo() {
  return (
    <div className="bg-gray-50 rounded-2xl border border-b-4 border-gray-900 p-6 my-8">
      <div className="flex items-center gap-3 mb-4">
        <Info className="w-6 h-6 text-[#03533d]" />
        <h2 className="text-xl font-medium text-gray-900">Informasi Zakat Pertanian</h2>
      </div>
      <div className="space-y-4 text-sm text-gray-700">
        <p>
          Zakat pertanian dikenakan pada hasil tanaman yang menjadi makanan pokok (seperti padi, gandum, jagung) dan hasil perkebunan. Zakat ini wajib dikeluarkan setiap kali panen jika telah mencapai nisab.
        </p>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-medium text-[#03533d] mb-1">Nisab</h3>
            <p className="text-gray-700">653 kg gabah atau setara 520 kg beras.</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-medium text-[#03533d] mb-1">Kadar</h3>
            <p className="text-gray-700"><strong>5%</strong> jika pengairan menggunakan biaya (irigasi, pompa air).</p>
            <p className="text-gray-700"><strong>10%</strong> jika pengairan alami (tadah hujan, mata air).</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-medium text-[#03533d] mb-1">Haul</h3>
            <p className="text-gray-700">Tidak ada haul, zakat dikeluarkan setiap kali panen.</p>
          </div>
        </div>
        <div>
          <h3 className="font-medium text-gray-800 mt-2">Catatan Penting:</h3>
          <ul className="list-disc list-inside space-y-1 mt-1">
            <li>Biaya produksi seperti bibit, pupuk, dan pestisida dapat dikurangkan dari hasil panen sebelum menghitung zakat.</li>
            <li>Jika dalam satu lahan terdapat jenis pengairan yang berbeda, maka perhitungannya disesuaikan secara proporsional.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
