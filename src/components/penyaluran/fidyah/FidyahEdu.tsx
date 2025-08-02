import { BookOpen } from "lucide-react";

export default function FidyahEdu() {
  return (
    <div className="bg-gray-100 rounded-2xl border border-b-2 border-gray-900 p-6">
      <div className="flex items-start gap-4">
        <BookOpen className="w-6 h-6 text-[#03533d] mt-1 flex-shrink-0" />
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-3">
            Tentang Fidyah
          </h2>
          <div className="text-gray-600 space-y-3 text-sm leading-relaxed">
            <p>
              <strong>Fidyah</strong> adalah denda yang wajib dibayar oleh
              seseorang yang tidak dapat melaksanakan puasa Ramadhan karena
              alasan syar&apos;i yang permanen, seperti:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Orang tua yang sudah sangat lemah</li>
              <li>Orang sakit yang tidak ada harapan sembuh</li>
              <li>
                Ibu hamil atau menyusui yang khawatir pada dirinya atau bayinya
              </li>
            </ul>
            <p>
              <strong>Besaran fidyah:</strong> 1 mud (sekitar 650 gram) makanan
              pokok per hari puasa yang tidak dapat dilaksanakan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
