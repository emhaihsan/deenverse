// app/penyaluran/page.tsx
import Link from "next/link";
import { HeartHandshake, Wheat, Beef, HandCoins, Scale } from "lucide-react";
import Image from "next/image";

export default function PenyaluranPage() {
  const penyaluranItems = [
    {
      title: "Zakat",
      description:
        "Salurkan zakat Anda secara transparan menggunakan teknologi blockchain",
      icon: Scale,
      href: "/penyaluran/zakat",
      color: "bg-emerald-500",
    },
    {
      title: "Infaq & Sedekah",
      description:
        "Salurkan infaq dan sedekah Anda untuk berbagai kebutuhan kemanusiaan",
      icon: HeartHandshake,
      href: "/penyaluran/infak-sedekah",
      color: "bg-blue-500",
    },
    {
      title: "Fidyah",
      description: "Bayar fidyah puasa Anda dengan mudah dan tepat sasaran",
      icon: Wheat,
      href: "/penyaluran/fidyah",
      color: "bg-amber-500",
    },
    {
      title: "Qurban",
      description: "Salurkan hewan qurban Anda untuk keluarga yang membutuhkan",
      icon: Beef,
      href: "/penyaluran/qurban", // Fix the qurban link
      color: "bg-rose-500",
    },
  ];

  return (
    <div className="py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-[#03533d] text-white rounded-xl overflow-hidden border-b-6 border-gray-900 p-6">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/icons/onchaindonationicon.png"
              alt="Penyaluran"
              width={120}
              height={120}
            />
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Penyaluran On-Chain
            </h1>
            <p className="text-emerald-100 text-lg max-w-2xl">
              Salurkan harta Anda secara transparan dan aman menggunakan
              teknologi blockchain
            </p>
          </div>
        </div>

        {/* Penyaluran Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {penyaluranItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                href={item.href}
                className="bg-white rounded-2xl border-b-4 border-gray-900 p-6 hover:border-b-6 hover:border-[#03533d]  hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-4 text-gray-900 hover:text-[#03533d]">
                  <div className={`p-3 rounded-xl`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                    <p className="text-sm">{item.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Information Section */}
        <div className="bg-gray-100 rounded-2xl  border  border-b-6 border-gray-900 p-6">
          <div className="flex items-start gap-4">
            <HandCoins className="w-6 h-6 text-gray-900 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Keuntungan Penyaluran On-Chain
              </h2>
              <ul className="text-gray-900 space-y-2 text-sm">
                <li>• Transparansi penuh dalam penyaluran dana</li>
                <li>• Keamanan tinggi dengan teknologi blockchain</li>
                <li>• Bukti digital sebagai NFT untuk setiap penyaluran</li>
                <li>• Pelacakan real-time penggunaan dana</li>
                <li>• Efisiensi biaya operasional</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
