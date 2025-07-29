// app/penyaluran/page.tsx
import Link from "next/link";
import { HeartHandshake, Wheat, Beef, HandCoins, Scale } from "lucide-react";

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
    <div className="bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-emerald-50 rounded-2xl">
              <HeartHandshake className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Penyaluran On-Chain
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Salurkan harta Anda secara transparan dan aman menggunakan teknologi
            blockchain
          </p>
        </div>

        {/* Penyaluran Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {penyaluranItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                href={item.href}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${item.color} text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Information Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-start gap-4">
            <HandCoins className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Keuntungan Penyaluran On-Chain
              </h2>
              <ul className="text-gray-600 space-y-2 text-sm">
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
