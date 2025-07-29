import Link from "next/link";
import {
  BookOpen,
  HandHelping,
  Home,
  Sparkles,
  Github,
  Twitter,
  Mail,
  Heart,
} from "lucide-react";

export default function Footer() {
  const navigation = {
    main: [
      { name: "Beranda", href: "/" },
      { name: "Al-Qur'an", href: "/quran" },
      { name: "Kumpulan Doa", href: "/doa" },
    ],
    features: [
      { name: "One Day One Ayat", href: "/" },
      { name: "One Day One Doa", href: "/" },
      { name: "Tafsir Al-Qur'an", href: "/quran" },
      { name: "Filter Doa", href: "/doa" },
    ],
    social: [
      {
        name: "GitHub",
        href: "https://github.com/emhaihsan/deenverse",
        icon: Github,
      },
      {
        name: "Twitter",
        href: "#",
        icon: Twitter,
      },
      {
        name: "Email",
        href: "mailto:contact@deenverse.com",
        icon: Mail,
      },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand Section */}
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Sparkles className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">DeenVerse</span>
                <span className="text-sm text-gray-400">Muslim Superapp</span>
              </div>
            </div>
            <p className="text-gray-400 text-base max-w-md">
              Platform digital untuk mempermudah ibadah dan memperdalam
              pemahaman agama Islam. Dilengkapi dengan Al-Qur'an, kumpulan doa,
              dan fitur pembelajaran interaktif.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-emerald-400 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{item.name}</span>
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Navigasi
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base text-gray-400 hover:text-emerald-400 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Fitur
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.features.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base text-gray-400 hover:text-emerald-400 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* About Section */}
            <div className="md:grid md:grid-cols-1">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Tentang Proyek
                </h3>
                <div className="mt-4 space-y-4">
                  <p className="text-base text-gray-400">
                    DeenVerse adalah proyek hackathon yang dikembangkan untuk
                    Lisk Builders Challenge, menggabungkan teknologi Web3 dengan
                    nilai-nilai Islam.
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span>Dibuat dengan</span>
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>menggunakan Next.js & Tailwind CSS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <p className="text-sm text-gray-400">
                API oleh{" "}
                <a
                  href="https://equran.id"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  equran.id
                </a>
              </p>
            </div>
            <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
              &copy; 2024 DeenVerse. Semua hak cipta dilindungi.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
