// app/penyaluran/page.tsx
import Link from "next/link";
import {
  HeartHandshake,
  Wheat,
  Beef,
  HandCoins,
  Scale,
  Clock,
} from "lucide-react";
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
      isActive: false, // Disabled temporarily
    },
    {
      title: "Infaq & Sedekah",
      description:
        "Salurkan infaq dan sedekah Anda untuk berbagai kebutuhan kemanusiaan",
      icon: HeartHandshake,
      href: "/penyaluran/infak-sedekah",
      color: "bg-blue-500",
      isActive: true, // Only this one is active
    },
    {
      title: "Fidyah",
      description: "Bayar fidyah puasa Anda dengan mudah dan tepat sasaran",
      icon: Wheat,
      href: "/penyaluran/fidyah",
      color: "bg-amber-500",
      isActive: false, // Disabled temporarily
    },
    {
      title: "Qurban",
      description: "Salurkan hewan qurban Anda untuk keluarga yang membutuhkan",
      icon: Beef,
      href: "/penyaluran/qurban", // Fix the qurban link
      color: "bg-rose-500",
      isActive: false, // Disabled temporarily
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

            // Render active items as links
            if (item.isActive) {
              return (
                <Link
                  key={index}
                  href={item.href}
                  className="bg-white rounded-2xl border-b-4 border-gray-900 p-6 hover:border-b-6 hover:border-[#03533d] hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-4 text-gray-900 hover:text-[#03533d]">
                    <div className={`p-3 rounded-xl`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                      <p className="text-sm">{item.description}</p>
                    </div>
                  </div>
                </Link>
              );
            }

            // Render inactive items as disabled cards
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border-b-4 border-gray-300 p-6 opacity-60 cursor-not-allowed relative"
              >
                <div className="flex items-start gap-4 text-gray-500">
                  <div className={`p-3 rounded-xl bg-gray-100`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-medium">{item.title}</h3>
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        <Clock className="w-3 h-3" />
                        Coming Soon
                      </span>
                    </div>
                    <p className="text-sm">{item.description}</p>
                  </div>
                </div>
                {/* Overlay to prevent interaction */}
                <div className="absolute inset-0 bg-transparent"></div>
              </div>
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
