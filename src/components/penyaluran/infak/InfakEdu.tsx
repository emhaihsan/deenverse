import { Info } from "lucide-react";

export default function InfakEdu() {
  return (
    <>
      <div className="bg-gray-100 rounded-2xl border border-b-6 border-gray-900 p-6">
        <div className="flex items-start gap-4 mb-4">
          <Info className="w-6 h-6 text-[#03533d] mt-1 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-3">
              Tentang Infak & Sedekah
            </h2>
            <div className="text-gray-600 space-y-3 text-sm">
              <p>
                <strong>Infak</strong> adalah pemberian harta yang dikeluarkan
                oleh seseorang atau badan usaha di luar zakat untuk kemaslahatan
                umat. Bersifat sunnah dan bisa diberikan kapan saja.
              </p>
              <p>
                <strong>Sedekah</strong> adalah pemberian sukarela yang
                diberikan oleh seorang muslim kepada orang lain, terutama kepada
                yang membutuhkan, semata-mata mengharap ridha Allah SWT.
              </p>
              <p>
                Keduanya memiliki keutamaan yang tinggi dalam Islam dan dapat
                menjadi sarana pembersih harta serta penambah pahala.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
