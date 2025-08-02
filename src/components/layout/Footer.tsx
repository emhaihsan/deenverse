import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white w-full">
      <div className="max-w-7xl mx-auto py-12 px-16 sm:px-6 lg:py-16 lg:px-16">
        <div className="flex flex-col gap-6">
          {/* Project Overview */}
          <div className="flex items-center space-x-3">
            <div className="p-1">
              <Image
                src="/DeenVerse-White.png"
                alt="DeenVerse Logo"
                width={40}
                height={40}
              />
            </div>
            <div>
              <span className="block text-xl font-bold">DeenVerse</span>
              <span className="block text-sm text-gray-400">
                Platform Digital Islami
              </span>
            </div>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed ">
            DeenVerse adalah platform digital yang menyediakan akses mudah
            terhadap Al-Qur&apos;an, Hadis, Doa, dan informasi keislaman
            lainnya. Dibangun dengan teknologi modern untuk memudahkan umat
            Islam dalam mempelajari dan mengamalkan ajaran agama.
          </p>

          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400 border-t border-gray-800 pt-4">
            <span>{currentYear} DeenVerse</span>
            <span>•</span>
            <span>Dibuat dalam rangka Lisk Builders Challenge 2</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
