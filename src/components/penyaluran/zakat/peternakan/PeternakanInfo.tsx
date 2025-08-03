import { Info } from "lucide-react";

export default function PeternakanInfo() {
  return (
    <div className="bg-gray-50 rounded-2xl border border-b-4 border-gray-900 p-6 my-8">
      <div className="flex items-center gap-3 mb-4">
        <Info className="w-6 h-6 text-[#03533d]" />
        <h2 className="text-xl font-medium text-gray-900">Informasi Zakat Peternakan</h2>
      </div>
      <div className="space-y-4 text-sm text-gray-700">
        <p>
          Zakat peternakan dikenakan pada hewan ternak (unta, sapi, kerbau, kambing, domba) yang telah mencapai nisab dan haul. Tujuannya adalah untuk membersihkan harta dan membantu fakir miskin.
        </p>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-medium text-[#03533d] mb-1">Nisab</h3>
            <p className="text-gray-700"><strong>Kambing/Domba:</strong> 40 ekor</p>
            <p className="text-gray-700"><strong>Sapi/Kerbau:</strong> 30 ekor</p>
            <p className="text-gray-700"><strong>Unta:</strong> 5 ekor</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-medium text-[#03533d] mb-1">Haul</h3>
            <p className="text-gray-700">Kepemilikan selama 1 tahun hijriah.</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-medium text-[#03533d] mb-1">Kadar</h3>
            <p className="text-gray-700">Jumlah zakat bervariasi tergantung pada jumlah dan jenis hewan ternak. Lihat tabel referensi untuk detailnya.</p>
          </div>
        </div>
        <div>
          <h3 className="font-medium text-gray-800 mt-2">Catatan Penting:</h3>
          <ul className="list-disc list-inside space-y-1 mt-1">
            <li>Hewan yang digembalakan dan tidak dipekerjakan (sawah, angkutan) yang wajib dizakati.</li>
            <li>Zakat dikeluarkan dalam bentuk hewan ternak dengan kriteria umur dan kesehatan tertentu.</li>
            <li>Jika sulit mengeluarkan dalam bentuk hewan, dapat dikonversi menjadi nilai uang (qimah).</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
