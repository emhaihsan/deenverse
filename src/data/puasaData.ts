// src/data/puasaData.ts
import { Puasa } from "../types/puasa";

export const puasaData: Puasa[] = [
  {
    id: 1,
    slug: "puasa-ramadhan",
    title: "Puasa Ramadhan",
    category: "Wajib",
    description: "Puasa yang wajib dilaksanakan oleh seluruh umat Islam selama sebulan penuh di bulan Ramadhan, bulan kesembilan dalam kalender Hijriah.",
    dalil: [
      "QS. Al-Baqarah [2]: 183 - \"Wahai orang-orang yang beriman! Diwajibkan atas kamu berpuasa sebagaimana diwajibkan atas orang sebelum kamu agar kamu bertakwa.\""
    ],
    niat: {
      arabic: "نَوَيْتُ صَوْمَ غَدٍ عَنْ أَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هَذِهِ السَّنَةِ لِلّٰهِ تَعَالَى",
      latin: "Nawaitu shauma ghadin 'an adā'i fardhi syahri Ramadhāna hādzihis sanati lillāhi ta'ālā.",
      translation: "Aku niat berpuasa esok hari untuk menunaikan kewajiban puasa bulan Ramadhan tahun ini karena Allah Ta'ala."
    },
    waktu: "Dari terbit fajar (waktu Subuh) hingga terbenam matahari (waktu Maghrib) selama bulan Ramadhan.",
    tataCara: [
      "Berniat puasa di malam hari sebelum fajar.",
      "Makan sahur, dianjurkan untuk mengakhirkannya menjelang waktu imsak.",
      "Menahan diri dari segala hal yang membatalkan puasa, seperti makan, minum, dan berhubungan suami istri.",
      "Menyegerakan berbuka puasa saat waktu Maghrib tiba.",
      "Memperbanyak ibadah seperti shalat, membaca Al-Qur'an, dan bersedekah."
    ],
    keutamaan: [
      "Diampuni dosa-dosa yang telah lalu.",
      "Terdapat malam Lailatul Qadar yang lebih baik dari seribu bulan.",
      "Pintu surga Ar-Rayyan disediakan khusus bagi orang yang berpuasa."
    ],
    larangan: [
      "Makan dan minum dengan sengaja.",
      "Berhubungan suami istri di siang hari.",
      "Muntah dengan sengaja.",
      "Keluarnya darah haid atau nifas bagi wanita."
    ]
  },
  {
    id: 2,
    slug: "puasa-syawal",
    title: "Puasa Syawal",
    category: "Sunnah Muakkad",
    description: "Puasa sunnah enam hari yang dilakukan di bulan Syawal, setelah selesai menunaikan puasa Ramadhan.",
    dalil: [
      "Hadits Riwayat Muslim - \"Barangsiapa yang berpuasa Ramadhan kemudian berpuasa enam hari di bulan Syawal, maka dia berpuasa seperti setahun penuh.\""
    ],
    niat: {
      arabic: "نَوَيْتُ صَوْمَ غَدٍ عَنْ سِتَّةٍ مِنْ شَوَّالٍ سُنَّةً لِلّٰهِ تَعَالَى",
      latin: "Nawaitu shauma ghadin 'an sittatin min Syawwālin sunnatan lillāhi ta'ālā.",
      translation: "Aku niat berpuasa esok hari tentang puasa enam hari di bulan Syawal, sunnah karena Allah Ta'ala."
    },
    waktu: "Enam hari di bulan Syawal, setelah Hari Raya Idul Fitri. Boleh dilakukan berurutan maupun terpisah.",
    tataCara: [
      "Niat puasa Syawal di malam hari atau di siang hari sebelum tergelincir matahari (jika belum makan/minum).",
      "Melaksanakan puasa seperti puasa pada umumnya.",
      "Dianjurkan untuk menyegerakan pelaksanaannya setelah Idul Fitri."
    ],
    keutamaan: [
      "Pahalanya seperti berpuasa selama setahun penuh.",
      "Menyempurnakan ibadah puasa Ramadhan."
    ]
  },
  {
    id: 3,
    slug: "puasa-arafah-dzulhijjah",
    title: "Puasa Arafah (Bulan Dzulhijjah)",
    category: "Sunnah Muakkad",
    description: "Puasa sunnah yang sangat dianjurkan bagi yang tidak sedang menunaikan ibadah haji, dilaksanakan pada tanggal 9 Dzulhijjah.",
    dalil: [
      "Hadits Riwayat Muslim - \"Puasa hari Arafah, aku berharap kepada Allah, dapat menghapuskan dosa setahun sebelumnya dan setahun sesudahnya.\""
    ],
    niat: {
      arabic: "نَوَيْتُ صَوْمَ عَرَفَةَ سُنَّةً لِلّٰهِ تَعَالَى",
      latin: "Nawaitu shauma 'Arafata sunnatan lillāhi ta'ālā.",
      translation: "Aku niat puasa Arafah, sunnah karena Allah Ta'ala."
    },
    waktu: "Tanggal 9 Dzulhijjah, saat jamaah haji sedang wukuf di Arafah.",
    tataCara: [
      "Berniat puasa Arafah di malam hari.",
      "Melaksanakan puasa dari fajar hingga maghrib."
    ],
    keutamaan: [
      "Menghapus dosa selama dua tahun (setahun yang lalu dan setahun yang akan datang).",
      "Merupakan amalan terbaik di sepuluh hari pertama bulan Dzulhijjah."
    ]
  },
  {
    id: 4,
    slug: "puasa-muharram",
    title: "Puasa Muharram (Asyura & Tasu'a)",
    category: "Sunnah Muakkad",
    description: "Puasa sunnah yang dianjurkan di bulan Muharram, terutama pada hari Asyura (10 Muharram) dan dianjurkan didahului hari Tasu'a (9 Muharram).",
    dalil: [
      "Hadits Riwayat Muslim - \"Puasa yang paling utama setelah Ramadhan adalah puasa di bulan Allah, Muharram.\""
    ],
    niat: {
      arabic: "(Asyura) نَوَيْتُ صَوْمَ عَاشُورَاءَ سُنَّةً لِلّٰهِ تَعَالَى",
      latin: "(Asyura) Nawaitu shauma 'Āsyūrā'a sunnatan lillāhi ta'ālā.",
      translation: "(Asyura) Aku niat puasa Asyura, sunnah karena Allah Ta'ala."
    },
    waktu: "Tanggal 9 (Tasu'a) dan 10 (Asyura) Muharram. Boleh juga hanya tanggal 10, atau tanggal 10 dan 11.",
    tataCara: [
      "Berniat puasa di malam hari.",
      "Dianjurkan untuk berpuasa pada tanggal 9 dan 10 Muharram untuk menyelisihi kaum Yahudi."
    ],
    keutamaan: [
      "Puasa Asyura menghapus dosa setahun yang lalu.",
      "Merupakan puasa yang paling utama setelah puasa Ramadhan."
    ]
  },
  {
    id: 5,
    slug: "puasa-senin-kamis",
    title: "Puasa Senin-Kamis",
    category: "Sunnah",
    description: "Puasa sunnah yang rutin dilakukan setiap hari Senin dan Kamis.",
    dalil: [
      "Hadits Riwayat Tirmidzi - \"Amal perbuatan manusia dihadapkan kepada Allah pada hari Senin dan Kamis, maka aku suka jika amalku dihadapkan sementara aku sedang berpuasa.\""
    ],
    niat: {
      arabic: "(Senin) نَوَيْتُ صَوْمَ يَوْمِ الِاثْنَيْنِ سُنَّةً لِلّٰهِ تَعَالَى",
      latin: "(Senin) Nawaitu shauma yaumil itsnaini sunnatan lillāhi ta'ālā.",
      translation: "(Senin) Aku niat puasa hari Senin, sunnah karena Allah Ta'ala."
    },
    waktu: "Setiap hari Senin dan Kamis sepanjang tahun, kecuali hari-hari yang diharamkan berpuasa.",
    tataCara: [
      "Niat boleh dilakukan di malam hari atau di siang hari sebelum tergelincir matahari (jika belum makan/minum).",
      "Menahan diri dari yang membatalkan puasa hingga Maghrib."
    ],
    keutamaan: [
      "Pada hari Senin dan Kamis, pintu-pintu surga dibuka.",
      "Amal perbuatan diangkat dan dilaporkan kepada Allah."
    ]
  },
  {
    id: 6,
    slug: "puasa-dawud",
    title: "Puasa Dawud",
    category: "Sunnah",
    description: "Puasa sunnah yang paling disukai Allah, yaitu berpuasa selang-seling: sehari berpuasa, sehari tidak.",
    dalil: [
      "Hadits Riwayat Bukhari dan Muslim - \"Puasa yang paling disukai Allah adalah puasa Dawud; ia berpuasa sehari dan berbuka sehari.\""
    ],
    niat: {
      arabic: "نَوَيْتُ صَوْمَ دَاوُدَ سُنَّةً لِلّٰهِ تَعَالَى",
      latin: "Nawaitu shauma Dāwūda sunnatan lillāhi ta'ālā.",
      translation: "Aku niat puasa Dawud, sunnah karena Allah Ta'ala."
    },
    waktu: "Dilakukan selang-seling sepanjang tahun, kecuali pada hari-hari yang diharamkan berpuasa.",
    tataCara: [
      "Berniat di malam hari.",
      "Berpuasa satu hari, kemudian berbuka (tidak puasa) di hari berikutnya, dan begitu seterusnya."
    ],
    keutamaan: [
      "Merupakan puasa sunnah yang paling utama dan paling dicintai Allah.",
      "Melatih konsistensi dan pengendalian diri tingkat tinggi."
    ]
  },
  {
    id: 7,
    slug: "puasa-ayyamul-bidh",
    title: "Puasa Ayyamul Bidh",
    category: "Sunnah",
    description: "Puasa sunnah tiga hari yang dilakukan pada pertengahan bulan Hijriah, yaitu pada tanggal 13, 14, dan 15.",
    dalil: [
      "Hadits Riwayat Tirmidzi dan Nasa'i - \"Jika engkau ingin berpuasa tiga hari setiap bulannya, maka berpuasalah pada tanggal 13, 14, dan 15 (dari bulan Hijriyah). Puasa tersebut (pahalanya) seperti puasa setahun.\""
    ],
    niat: {
      arabic: "نَوَيْتُ صَوْمَ أَيَّامِ الْبِيْضِ سُنَّةً لِلّٰهِ تَعَالَى",
      latin: "Nawaitu shauma ayyāmil bīdhi sunnatan lillāhi ta'ālā.",
      translation: "Aku niat puasa Ayyamul Bidh, sunnah karena Allah Ta'ala."
    },
    waktu: "Tanggal 13, 14, dan 15 setiap bulan dalam kalender Hijriah.",
    tataCara: [
      "Berniat di malam hari untuk puasa tiga hari.",
      "Melaksanakan puasa pada tanggal-tanggal yang telah ditentukan."
    ],
    keutamaan: [
      "Pahalanya seperti berpuasa sepanjang tahun.",
      "Mengikuti kebiasaan Rasulullah SAW."
    ]
  },
  {
    id: 8,
    slug: "puasa-sya-ban",
    title: "Puasa Sya'ban",
    category: "Sunnah",
    description: "Memperbanyak puasa sunnah di bulan Sya'ban, sebagai persiapan menyambut bulan Ramadhan.",
    dalil: [
      "Hadits Riwayat Nasa'i - Aisyah berkata: \"Aku tidak pernah melihat Rasulullah SAW melakukan puasa satu bulan penuh kecuali puasa Ramadhan, dan aku tidak pernah melihat beliau lebih banyak berpuasa sunah melebihi puasa di bulan Sya'ban.\""
    ],
    niat: {
      arabic: "نَوَيْتُ صَوْمَ شَعْبَانَ سُنَّةً لِلّٰهِ تَعَالَى",
      latin: "Nawaitu shauma Sya'bāna sunnatan lillāhi ta'ālā.",
      translation: "Aku niat puasa Sya'ban, sunnah karena Allah Ta'ala."
    },
    waktu: "Sebagian besar hari di bulan Sya'ban. Dilarang berpuasa pada satu atau dua hari terakhir Sya'ban (hari syak).",
    tataCara: [
      "Dapat menggabungkan dengan puasa Senin-Kamis atau puasa Dawud.",
      "Berniat puasa sunnah Sya'ban di malam hari."
    ],
    keutamaan: [
      "Bulan diangkatnya amalan tahunan kepada Allah.",
      "Sebagai latihan dan pemanasan sebelum memasuki bulan Ramadhan."
    ]
  },
  {
    id: 9,
    slug: "puasa-rajab",
    title: "Puasa Rajab",
    category: "Sunnah",
    description: "Puasa sunnah yang dilakukan di bulan Rajab, salah satu dari empat bulan haram (bulan mulia) dalam Islam.",
    dalil: [
      "Tidak ada hadits shahih yang secara khusus menyebutkan keutamaan puasa di bulan Rajab. Namun, termasuk dalam anjuran umum untuk berpuasa di bulan-bulan haram (Dzulqa'dah, Dzulhijjah, Muharram, Rajab)."
    ],
    niat: {
      arabic: "نَوَيْتُ صَوْمَ رَجَبَ سُنَّةً لِلّٰهِ تَعَالَى",
      latin: "Nawaitu shauma Rajaba sunnatan lillāhi ta'ālā.",
      translation: "Aku niat puasa Rajab, sunnah karena Allah Ta'ala."
    },
    waktu: "Beberapa hari di bulan Rajab, tidak ada anjuran untuk berpuasa sebulan penuh.",
    tataCara: [
      "Berniat puasa sunnah di bulan Rajab.",
      "Dapat digabungkan dengan puasa sunnah rutin lainnya seperti Senin-Kamis."
    ],
    keutamaan: [
      "Mendapatkan pahala karena beribadah di salah satu bulan yang dimuliakan Allah."
    ]
  },
  {
    id: 10,
    slug: "puasa-nazar",
    title: "Puasa Nazar",
    category: "Wajib",
    description: "Puasa yang menjadi wajib karena seseorang telah berjanji (bernazar) kepada Allah untuk melakukannya jika suatu hajat atau keinginan terpenuhi.",
    dalil: [
      "QS. Al-Insan [76]: 7 - \"Mereka memenuhi nazar dan takut akan suatu hari yang azabnya merata di mana-mana.\"",
      "Hadits Riwayat Bukhari - \"Barangsiapa bernazar untuk menaati Allah, maka hendaklah ia melaksanakannya.\""
    ],
    niat: {
      arabic: "نَوَيْتُ صَوْمَ النَّذْرِ لِلّٰهِ تَعَالَى",
      latin: "Nawaitu shauman nadzri lillāhi ta'ālā.",
      translation: "Aku niat puasa nazar karena Allah Ta'ala."
    },
    waktu: "Sesuai dengan apa yang dinazarkan. Jika tidak ditentukan waktunya, maka wajib disegerakan.",
    tataCara: [
      "Wajib dilaksanakan sesuai dengan janji yang telah diucapkan.",
      "Jika nazar berpuasa 3 hari berturut-turut, maka harus dilaksanakan seperti itu."
    ],
    keutamaan: [
      "Memenuhi janji kepada Allah adalah bentuk ketaatan.",
      "Menunjukkan rasa syukur atas terkabulnya suatu hajat."
    ],
    larangan: [
      "Bernazar untuk melakukan maksiat adalah haram dan tidak boleh dilaksanakan."
    ]
  },
  {
    id: 11,
    slug: "puasa-dam",
    title: "Puasa Dam (Denda)",
    category: "Wajib",
    description: "Puasa yang wajib dilakukan sebagai denda (kafarat) karena melanggar larangan tertentu dalam ibadah, seperti haji, atau karena tidak mampu memenuhi kewajiban lain.",
    dalil: [
      "QS. Al-Baqarah [2]: 196 - \"...Tetapi jika ada di antara kamu yang sakit atau ada gangguan di kepalanya (lalu ia bercukur), maka wajiblah ia berfidyah, yaitu berpuasa atau bersedekah atau berkorban...\""
    ],
    niat: {
      arabic: "نَوَيْتُ صَوْمَ الْكَفَّارَةِ لِلّٰهِ تَعَالَى",
      latin: "Nawaitu shaumal kaffārati lillāhi ta'ālā.",
      translation: "Aku niat puasa kafarat (denda) karena Allah Ta'ala."
    },
    waktu: "Tergantung jenis pelanggaran. Contoh: Puasa 3 hari saat haji dan 7 hari di kampung halaman bagi yang melanggar larangan haji tertentu.",
    tataCara: [
      "Jumlah hari puasa ditentukan oleh jenis pelanggaran yang dilakukan.",
      "Wajib dilaksanakan sesuai ketentuan syariat sebagai penebus kesalahan."
    ],
    keutamaan: [
      "Menjadi penebus dosa atau kesalahan yang telah dilakukan.",
      "Menunjukkan ketaatan dan penyesalan seorang hamba."
    ]
  }
];
