import { BookOpen } from "lucide-react";

export default function QurbanEdu() {
  return (
    <div className="bg-gray-100 rounded-2xl border border-b-4 border-gray-900 p-6">
      <div className="flex items-start gap-4">
        <BookOpen className="w-6 h-6 text-[#03533d] mt-1 flex-shrink-0" />
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-3">
            Tentang Qurban
          </h2>
          <div className="text-gray-600 space-y-3 text-sm leading-relaxed">
            <p>
              <strong>Qurban</strong> adalah ibadah menyembelih hewan ternak
              yang dilakukan pada Hari Raya Idul Adha dan hari-hari tasyrik
              sebagai bentuk ketaatan dan rasa syukur kepada Allah SWT.
            </p>
            <p>
              Ibadah ini meneladani ketaatan Nabi Ibrahim AS dan putranya, Nabi
              Ismail AS. Daging qurban dibagikan kepada yang membutuhkan,
              mempererat tali persaudaraan dan kepedulian sosial.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
