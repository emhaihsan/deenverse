// src/data/shalatData.ts
import { Shalat } from "../types/shalat";

export const shalatData: Shalat[] = [
  {
    id: 1,
    slug: "shalat-5-waktu",
    title: "Shalat 5 Waktu",
    category: "Wajib",
    description: "Panduan lengkap mengenai Shalat Fardhu 5 waktu yang menjadi tiang agama dalam Islam, meliputi Subuh, Dzuhur, Ashar, Maghrib, dan Isya.",
    dalil: [
      "QS. Al-Baqarah [2]: 43 - \"Dan laksanakanlah shalat, tunaikanlah zakat, dan rukuklah beserta orang yang rukuk.\"",
      "Hadits Riwayat Bukhari dan Muslim - \"Islam dibangun di atas lima perkara: bersaksi bahwa tiada Tuhan selain Allah dan Muhammad adalah utusan-Nya, mendirikan shalat, menunaikan zakat, haji ke Baitullah, dan puasa di bulan Ramadhan.\""
    ],
    niat: {
      arabic: "(Sebutkan niat sesuai shalatnya, contoh: Subuh) أُصَلِّى فَرْضَ الصُّبْح رَكَعتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لله تَعَالَى",
      latin: "(Sebutkan niat sesuai shalatnya, contoh: Subuh) Ushalli fardhash shubhi rak'ataini mustaqbilal qiblati adaa'an lillaahi ta'aalaa.",
      translation: "(Sebutkan niat sesuai shalatnya, contoh: Subuh) Aku berniat shalat fardhu Subuh dua rakaat, menghadap kiblat, tepat waktu, karena Allah ta'ala."
    },
    jumlahRakaat: "Subuh: 2, Dzuhur: 4, Ashar: 4, Maghrib: 3, Isya: 4",
    waktu: "Subuh (fajar hingga terbit matahari), Dzuhur (setelah matahari tergelincir), Ashar (saat bayangan sama panjang dengan benda), Maghrib (setelah matahari terbenam), Isya (setelah hilangnya cahaya merah di ufuk barat).",
    tataCara: [
      { step: 1, description: "Berwudhu dengan sempurna." },
      { step: 2, description: "Berdiri tegak menghadap kiblat dan membaca niat." },
      { step: 3, description: "Takbiratul Ihram (mengangkat kedua tangan sejajar telinga sambil mengucapkan 'Allahu Akbar')." },
      { step: 4, description: "Membaca Doa Iftitah." },
      { step: 5, description: "Membaca Surat Al-Fatihah." },
      { step: 6, description: "Membaca surat pendek dari Al-Qur'an." },
      { step: 7, description: "Rukuk dengan tuma'ninah." },
      { step: 8, description: "I'tidal (bangkit dari rukuk) dengan tuma'ninah." },
      { step: 9, description: "Sujud dua kali dengan tuma'ninah." },
      { step: 10, description: "Duduk di antara dua sujud dengan tuma'ninah." },
      { step: 11, description: "Mengulangi gerakan untuk rakaat berikutnya." },
      { step: 12, description: "Tasyahud Awal (pada rakaat kedua)." },
      { step: 13, description: "Tasyahud Akhir (pada rakaat terakhir)." },
      { step: 14, description: "Salam ke kanan dan ke kiri." }
    ],
    keutamaan: [
      "Menjadi tiang agama dan amalan pertama yang dihisab.",
      "Menghapuskan dosa-dosa kecil.",
      "Mendatangkan ketenangan jiwa dan mencegah perbuatan keji dan mungkar."
    ]
  },
  {
    id: 2,
    slug: "shalat-jumat",
    title: "Shalat Jumat",
    category: "Wajib",
    description: "Shalat dua rakaat yang wajib dilaksanakan oleh laki-laki Muslim secara berjamaah pada waktu Dzuhur di hari Jumat, didahului oleh dua khutbah.",
    dalil: [
      "QS. Al-Jumu'ah [62]: 9 - \"Wahai orang-orang yang beriman! Apabila telah diseru untuk melaksanakan shalat pada hari Jum’at, maka segeralah kamu mengingat Allah dan tinggalkanlah jual beli.\""
    ],
    niat: {
      arabic: "أُصَلِّى فَرْضَ الْجُمُعَةِ رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً مَأْمُوْمًا لِلهِ تَعَالَى",
      latin: "Ushalli fardhal jumu'ati rak'ataini mustaqbilal qiblati adaa'an ma'muuman lillaahi ta'aalaa.",
      translation: "Aku berniat shalat fardhu Jumat dua rakaat, menghadap kiblat, sebagai makmum, karena Allah ta'ala."
    },
    jumlahRakaat: "2 rakaat",
    waktu: "Waktu Dzuhur pada hari Jumat.",
    tataCara: [
      { step: 1, description: "Mandi, memakai pakaian terbaik, dan menggunakan wewangian sebelum ke masjid." },
      { step: 2, description: "Melaksanakan shalat sunnah Tahiyyatul Masjid saat tiba di masjid." },
      { step: 3, description: "Mendengarkan dua khutbah Jumat dengan khidmat." },
      { step: 4, description: "Melaksanakan shalat Jumat dua rakaat secara berjamaah dipimpin oleh imam." },
      { step: 5, description: "Tata cara shalat sama seperti shalat fardhu dua rakaat pada umumnya." }
    ],
    keutamaan: [
      "Hari Jumat adalah hari terbaik di sisi Allah.",
      "Setiap langkah menuju shalat Jumat dihitung pahala.",
      "Dosa-dosa di antara dua Jumat diampuni."
    ]
  },
  {
    id: 3,
    slug: "shalat-jenazah",
    title: "Shalat Jenazah",
    category: "Wajib",
    description: "Shalat yang dilakukan untuk mendoakan jenazah seorang Muslim. Hukumnya fardhu kifayah, yaitu kewajiban gugur jika sudah ada sebagian Muslim yang melakukannya.",
    dalil: [
      "Hadits Riwayat Bukhari dan Muslim - \"Barangsiapa yang menyalati jenazah dan tidak mengikutinya (ke pemakaman), maka baginya pahala satu qirath. Jika ia mengikutinya, maka baginya dua qirath. Ditanyakan, 'Apa itu dua qirath?' Beliau menjawab, 'Seperti dua gunung yang besar.'\""
    ],
    niat: {
      arabic: "(Untuk jenazah laki-laki) أُصَلِّى عَلَى هَذَا الْمَيِّتِ أَرْبَعَ تَكْبِيْرَاتٍ فَرْضَ كِفَايَةٍ مَأْمُوْمًا لِلّٰهِ تَعَالَى",
      latin: "(Untuk jenazah laki-laki) Ushalli 'ala hadzal mayyiti arba'a takbiratin fardho kifayatin ma'muman lillahi ta'ala.",
      translation: "(Untuk jenazah laki-laki) Aku niat shalat atas jenazah ini dengan empat kali takbir, fardhu kifayah, sebagai makmum karena Allah Ta'ala."
    },
    jumlahRakaat: "Tidak ada rakaat, hanya 4 kali takbir.",
    waktu: "Kapan saja setelah jenazah dimandikan dan dikafani, sebelum dimakamkan.",
    tataCara: [
      { step: 1, description: "Berdiri dan niat dalam hati." },
      { step: 2, description: "Takbir pertama, kemudian membaca Surat Al-Fatihah." },
      { step: 3, description: "Takbir kedua, kemudian membaca shalawat kepada Nabi Muhammad SAW." },
      { step: 4, description: "Takbir ketiga, kemudian membaca doa untuk jenazah." },
      { step: 5, description: "Takbir keempat, kemudian membaca doa untuk jenazah dan kaum muslimin." },
      { step: 6, description: "Salam ke kanan dan ke kiri." }
    ],
    keutamaan: [
      "Memberikan syafaat (pertolongan) bagi jenazah.",
      "Mendapatkan pahala sebesar gunung Uhud.",
      "Menunaikan hak sesama Muslim."
    ]
  },
  {
    id: 4,
    slug: "shalat-gaib",
    title: "Shalat Gaib",
    category: "Wajib",
    description: "Shalat jenazah yang dilakukan untuk mendoakan jenazah seorang Muslim yang meninggal di tempat yang jauh dan tidak dapat dijangkau.",
    dalil: [
      "Hadits Riwayat Bukhari dan Muslim - Nabi Muhammad SAW memberitakan kematian Raja Najasyi (Ashamah) di Habasyah pada hari kematiannya, lalu beliau bersama para sahabat keluar ke tanah lapang, membuat shaf, dan bertakbir empat kali untuk menyalatkannya."
    ],
    niat: {
      arabic: "أُصَلِّى عَلَى مَنْ صَلَّى عَلَيْهِ الْإِمَامُ أَرْبَعَ تَكْبِيْرَاتٍ فَرْضَ كِفَايَةٍ غَائِبًا مَأْمُوْمًا لِلّٰهِ تَعَالَى",
      latin: "Ushalli 'ala man sholla 'alaihil imamu arba'a takbiratin fardho kifayatin ghoiban ma'muman lillahi ta'ala.",
      translation: "Aku niat shalat gaib atas jenazah yang dishalati oleh imam dengan empat kali takbir, fardhu kifayah, sebagai makmum karena Allah Ta'ala."
    },
    jumlahRakaat: "Tidak ada rakaat, hanya 4 kali takbir.",
    waktu: "Kapan saja setelah mendapat kabar kematian seseorang.",
    tataCara: [
      { step: 1, description: "Tata cara pelaksanaan Shalat Gaib sama persis dengan Shalat Jenazah." },
      { step: 2, description: "Berdiri dan niat dalam hati untuk shalat gaib." },
      { step: 3, description: "Takbir pertama, membaca Surat Al-Fatihah." },
      { step: 4, description: "Takbir kedua, membaca shalawat kepada Nabi Muhammad SAW." },
      { step: 5, description: "Takbir ketiga, membaca doa untuk jenazah." },
      { step: 6, description: "Takbir keempat, membaca doa untuk jenazah dan kaum muslimin." },
      { step: 7, description: "Salam ke kanan dan ke kiri." }
    ],
    keutamaan: [
      "Menunaikan hak sesama Muslim meskipun terpisah jarak.",
      "Mendapatkan pahala yang besar seperti menyalatkan jenazah secara langsung."
    ]
  },
  {
    id: 5,
    slug: "shalat-sunnah-wudhu",
    title: "Shalat Sunnah Wudhu",
    category: "Sunnah Ghairu Muakkad",
    description: "Shalat sunnah dua rakaat yang dikerjakan setelah selesai berwudhu sebagai bentuk rasa syukur (Syukrul Wudhu).",
    dalil: [
      "Hadits Riwayat Bukhari dan Muslim - Rasulullah SAW bertanya kepada Bilal, 'Wahai Bilal, ceritakanlah kepadaku amal paling utama yang kamu lakukan dalam Islam, sebab aku mendengar suara terompahmu di surga.' Bilal menjawab, 'Tidak ada amal yang lebih utama yang aku lakukan selain bahwa setiap kali aku bersuci (wudhu) pada waktu malam atau siang, aku selalu shalat dengan wudhuku itu.'"
    ],
    niat: {
      arabic: "أُصَلِّى سُنَّةَ الْوُضُوْءِ رَكْعَتَيْنِ لِلهِ تَعَالَى",
      latin: "Ushalli sunnatal wudhuu'i rak'ataini lillaahi ta'aalaa.",
      translation: "Aku niat shalat sunnah wudhu dua rakaat karena Allah ta'ala."
    },
    jumlahRakaat: "2 rakaat",
    waktu: "Setelah selesai berwudhu, sebelum anggota wudhu mengering.",
    tataCara: [
      { step: 1, description: "Niat shalat sunnah wudhu." },
      { step: 2, description: "Melaksanakan shalat dua rakaat seperti shalat sunnah pada umumnya." },
      { step: 3, description: "Pada rakaat pertama setelah Al-Fatihah dianjurkan membaca Surat Al-Kafirun." },
      { step: 4, description: "Pada rakaat kedua setelah Al-Fatihah dianjurkan membaca Surat Al-Ikhlas." },
      { step: 5, description: "Salam." }
    ],
    keutamaan: [
      "Menjadi salah satu amalan yang dapat mengantarkan ke surga, sebagaimana kisah Bilal bin Rabah.",
      "Menyempurnakan wudhu dan menambah pahala."
    ]
  },
  {
    id: 6,
    slug: "shalat-tahajud",
    title: "Shalat Tahajud",
    category: "Sunnah Muakkad",
    description: "Shalat sunnah yang sangat dianjurkan, dikerjakan pada malam hari setelah bangun dari tidur, terutama pada sepertiga malam terakhir.",
    dalil: [
      "QS. Al-Isra [17]: 79 - \"Dan pada sebagian malam, lakukanlah shalat tahajud (sebagai suatu ibadah) tambahan bagimu; mudah-mudahan Tuhanmu mengangkatmu ke tempat yang terpuji.\""
    ],
    niat: {
      arabic: "أُصَلِّى سُنَّةَ التَّهَجُّدِ رَكْعَتَيْنِ لِلهِ تَعَالَى",
      latin: "Ushalli sunnatat tahajjudi rak'ataini lillaahi ta'aalaa.",
      translation: "Aku niat shalat sunnah Tahajud dua rakaat karena Allah ta'ala."
    },
    jumlahRakaat: "Minimal 2 rakaat dan tidak terbatas, dikerjakan 2 rakaat salam.",
    waktu: "Setelah shalat Isya hingga masuk waktu Subuh, dan harus setelah tidur terlebih dahulu.",
    tataCara: [
      { step: 1, description: "Bangun tidur di malam hari." },
      { step: 2, description: "Niat shalat Tahajud." },
      { step: 3, description: "Melaksanakan shalat minimal dua rakaat dengan salam setiap dua rakaat." },
      { step: 4, description: "Dianjurkan memperpanjang bacaan surat dan sujud." },
      { step: 5, description: "Ditutup dengan shalat Witir jika belum melaksanakannya." },
      { step: 6, description: "Memperbanyak doa setelah shalat karena merupakan waktu yang mustajab." }
    ],
    keutamaan: [
      "Diangkat ke tempat yang terpuji di sisi Allah.",
      "Doa-doanya lebih mudah dikabulkan.",
      "Kebiasaan orang-orang shalih dan mendekatkan diri kepada Allah."
    ]
  },
  {
    id: 7,
    slug: "shalat-dhuha",
    title: "Shalat Dhuha",
    category: "Sunnah Muakkad",
    description: "Shalat sunnah yang dikerjakan pada waktu dhuha, yaitu ketika matahari mulai naik setinggi tombak hingga sebelum waktu Dzuhur.",
    dalil: [
      "Hadits Riwayat Muslim - \"Setiap pagi, setiap ruas anggota badanmu wajib dikeluarkan sedekahnya. Setiap tasbih adalah sedekah, setiap tahmid adalah sedekah, setiap tahlil adalah sedekah, setiap takbir adalah sedekah, menyuruh kebaikan adalah sedekah, dan melarang kemungkaran adalah sedekah. Dan semua itu dapat dicukupi dengan dua rakaat shalat Dhuha.\""
    ],
    niat: {
      arabic: "أُصَلِّى سُنَّةَ الضُّحَى رَكْعَتَيْنِ لِلهِ تَعَالَى",
      latin: "Ushalli sunnatadh dhuhaa rak'ataini lillaahi ta'aalaa.",
      translation: "Aku niat shalat sunnah Dhuha dua rakaat karena Allah ta'ala."
    },
    jumlahRakaat: "Minimal 2 rakaat, umumnya 4, 6, 8, hingga 12 rakaat. Dikerjakan 2 rakaat salam.",
    waktu: "Sejak matahari terbit setinggi tombak (sekitar 15-20 menit setelah terbit) hingga menjelang waktu Dzuhur.",
    tataCara: [
      { step: 1, description: "Niat shalat Dhuha." },
      { step: 2, description: "Pada rakaat pertama setelah Al-Fatihah, dianjurkan membaca Surat Asy-Syams." },
      { step: 3, description: "Pada rakaat kedua setelah Al-Fatihah, dianjurkan membaca Surat Ad-Dhuha." },
      { step: 4, description: "Melaksanakan shalat seperti biasa." },
      { step: 5, description: "Setelah salam, dianjurkan membaca doa shalat Dhuha." }
    ],
    keutamaan: [
      "Mencukupi sedekah seluruh persendian tubuh.",
      "Membuka pintu rezeki dan diampuni dosa-dosanya.",
      "Dibangunkan sebuah rumah di surga bagi yang rutin mengerjakannya."
    ]
  },
  {
    id: 8,
    slug: "shalat-isyraq",
    title: "Shalat Isyraq",
    category: "Sunnah Ghairu Muakkad",
    description: "Shalat sunnah dua rakaat yang dikerjakan setelah matahari terbit sepenuhnya, sekitar 15-20 menit setelah waktu syuruq.",
    dalil: [
      "Hadits Riwayat Tirmidzi - \"Barangsiapa yang shalat Subuh berjamaah lalu ia duduk berdzikir kepada Allah hingga matahari terbit, kemudian ia shalat dua rakaat, maka baginya pahala seperti pahala haji dan umrah yang sempurna, sempurna, sempurna.\""
    ],
    niat: {
      arabic: "أُصَلِّى سُنَّةَ الْإِشْرَاقِ رَكْعَتَيْنِ لِلهِ تَعَالَى",
      latin: "Ushalli sunnatal isyraqi rak'ataini lillaahi ta'aalaa.",
      translation: "Aku niat shalat sunnah Isyraq dua rakaat karena Allah ta'ala."
    },
    jumlahRakaat: "2 rakaat",
    waktu: "Sekitar 15-20 menit setelah matahari terbit.",
    tataCara: [
      { step: 1, description: "Dianjurkan untuk tetap di tempat shalat setelah Subuh berjamaah sambil berdzikir." },
      { step: 2, description: "Ketika matahari telah terbit sepenuhnya, berdiri untuk shalat." },
      { step: 3, description: "Niat shalat Isyraq." },
      { step: 4, description: "Melaksanakan shalat dua rakaat seperti biasa." }
    ],
    keutamaan: [
      "Mendapatkan pahala seperti haji dan umrah yang sempurna."
    ]
  },
  {
    id: 9,
    slug: "shalat-tahiyyatul-masjid",
    title: "Shalat Tahiyyatul Masjid",
    category: "Sunnah Muakkad",
    description: "Shalat sunnah dua rakaat sebagai penghormatan kepada masjid, dikerjakan setiap kali memasuki masjid dan sebelum duduk.",
    dalil: [
      "Hadits Riwayat Bukhari dan Muslim - \"Jika salah seorang di antara kalian memasuki masjid, maka janganlah ia duduk sampai ia shalat dua rakaat.\""
    ],
    niat: {
      arabic: "أُصَلِّى سُنَّةَ تَحِيَّةِ الْمَسْجِدِ رَكْعَتَيْنِ لِلهِ تَعَالَى",
      latin: "Ushalli sunnata tahiyyatil masjidi rak'ataini lillaahi ta'aalaa.",
      translation: "Aku niat shalat sunnah Tahiyyatul Masjid dua rakaat karena Allah ta'ala."
    },
    jumlahRakaat: "2 rakaat",
    waktu: "Setiap kali memasuki masjid dan sebelum duduk, selama bukan waktu terlarang untuk shalat.",
    tataCara: [
      { step: 1, description: "Masuk masjid dengan kaki kanan dan membaca doa masuk masjid." },
      { step: 2, description: "Sebelum duduk, langsung berdiri untuk shalat." },
      { step: 3, description: "Niat shalat Tahiyyatul Masjid." },
      { step: 4, description: "Melaksanakan shalat dua rakaat seperti biasa." }
    ],
    keutamaan: [
      "Menghormati rumah Allah (masjid).",
      "Menjalankan perintah Rasulullah SAW dan mendapatkan pahala sunnah."
    ]
  },
  {
    id: 10,
    slug: "shalat-gerhana-matahari",
    title: "Shalat Gerhana Matahari (Kusuf)",
    category: "Sunnah Muakkad",
    description: "Shalat sunnah yang dikerjakan ketika terjadi fenomena gerhana matahari.",
    dalil: [
      "Hadits Riwayat Bukhari dan Muslim - \"Sesungguhnya matahari dan bulan adalah dua tanda di antara tanda-tanda kebesaran Allah. Keduanya tidak mengalami gerhana karena kematian atau kelahiran seseorang. Jika kalian melihat gerhana, maka berdoalah kepada Allah, bertakbirlah, kerjakan shalat, dan bersedekahlah.\""
    ],
    niat: {
      arabic: "أُصَلِّى سُنَّةً لِكُسُوْفِ الشَّمْسِ رَكْعَتَيْنِ إِمَامًا/مَأْمُوْمًا لِلهِ تَعَالَى",
      latin: "Ushalli sunnatan likusuufisy syamsi rak'ataini imaaman/makmuuman lillaahi ta'aalaa.",
      translation: "Aku niat shalat sunnah gerhana matahari dua rakaat sebagai imam/makmum karena Allah ta'ala."
    },
    jumlahRakaat: "2 rakaat, dengan 4 kali rukuk dan 4 kali sujud.",
    waktu: "Sejak dimulainya gerhana matahari hingga gerhana berakhir.",
    tataCara: [
      { step: 1, description: "Niat dan Takbiratul Ihram." },
      { step: 2, description: "Membaca Al-Fatihah dan surat panjang." },
      { step: 3, description: "Rukuk yang lama." },
      { step: 4, description: "I'tidal, lalu membaca Al-Fatihah dan surat yang lebih pendek dari sebelumnya (tidak langsung sujud)." },
      { step: 5, description: "Rukuk kedua yang lebih singkat dari rukuk pertama." },
      { step: 6, description: "I'tidal." },
      { step: 7, description: "Sujud dua kali seperti biasa." },
      { step: 8, description: "Berdiri untuk rakaat kedua dan mengulangi gerakan seperti rakaat pertama (2 kali berdiri, 2 kali rukuk)." },
      { step: 9, description: "Tasyahud akhir dan salam." },
      { step: 10, description: "Setelah shalat, imam memberikan khutbah." }
    ],
    keutamaan: [
      "Mengingat kebesaran Allah SWT.",
      "Memohon perlindungan dari segala keburukan."
    ]
  },
  {
    id: 11,
    slug: "shalat-gerhana-bulan",
    title: "Shalat Gerhana Bulan (Khusuf)",
    category: "Sunnah Muakkad",
    description: "Shalat sunnah yang dikerjakan ketika terjadi fenomena gerhana bulan.",
    dalil: [
      "Sama dengan dalil shalat gerhana matahari."
    ],
    niat: {
      arabic: "أُصَلِّى سُنَّةً لِخُسُوْفِ الْقَمَرِ رَكْعَتَيْنِ إِمَامًا/مَأْمُوْمًا لِلهِ تَعَالَى",
      latin: "Ushalli sunnatan likhusuufil qamari rak'ataini imaaman/makmuuman lillaahi ta'aalaa.",
      translation: "Aku niat shalat sunnah gerhana bulan dua rakaat sebagai imam/makmum karena Allah ta'ala."
    },
    jumlahRakaat: "2 rakaat, dengan 4 kali rukuk dan 4 kali sujud.",
    waktu: "Sejak dimulainya gerhana bulan hingga gerhana berakhir.",
    tataCara: [
      { step: 1, description: "Tata cara pelaksanaan Shalat Gerhana Bulan sama persis dengan Shalat Gerhana Matahari." },
      { step: 2, description: "Perbedaannya, pada shalat gerhana bulan bacaan suratnya dinyaringkan (jahr), sedangkan pada gerhana matahari tidak (sirr)." }
    ],
    keutamaan: [
      "Mengingat kebesaran Allah SWT.",
      "Memohon perlindungan dari segala keburukan."
    ]
  },
  {
    id: 12,
    slug: "shalat-istisqa",
    title: "Shalat Istisqa'",
    category: "Sunnah Muakkad",
    description: "Shalat sunnah yang dilakukan untuk memohon hujan kepada Allah SWT saat terjadi kemarau panjang.",
    dalil: [
      "QS. Nuh [71]: 10-12 - \"Maka aku katakan kepada mereka: ‘Mohonlah ampun kepada Tuhanmu, sesungguhnya Dia adalah Maha Pengampun, niscaya Dia akan mengirimkan hujan kepadamu dengan lebat, dan membanyakkan harta dan anak-anakmu…\""
    ],
    niat: {
      arabic: "أُصَلِّى سُنَّةَ الْإِسْتِسْقَاءِ رَكْعَتَيْنِ إِمَامًا/مَأْمُوْمًا لِلهِ تَعَالَى",
      latin: "Ushalli sunnatal istisqa'i rak'ataini imaaman/makmuuman lillaahi ta'aalaa.",
      translation: "Aku niat shalat sunnah Istisqa dua rakaat sebagai imam/makmum karena Allah ta'ala."
    },
    jumlahRakaat: "2 rakaat",
    waktu: "Siang hari, di tanah lapang.",
    tataCara: [
      { step: 1, description: "Dilakukan di tanah lapang dengan pakaian sederhana dan penuh kerendahan hati." },
      { step: 2, description: "Shalat dua rakaat seperti shalat Id. Rakaat pertama 7 kali takbir, rakaat kedua 5 kali takbir." },
      { step: 3, description: "Bacaan shalat dinyaringkan (jahr)." },
      { step: 4, description: "Setelah shalat, diadakan dua khutbah yang berisi anjuran bertaubat, beristighfar, dan berdoa memohon hujan." },
      { step: 5, description: "Saat khutbah kedua, khatib membalikkan selendang (rida') sebagai simbol harapan perubahan kondisi dari kemarau menjadi hujan." }
    ],
    keutamaan: [
      "Menunjukkan kerendahan diri di hadapan Allah untuk memohon rahmat-Nya.",
      "Menjadi sarana terkabulnya doa memohon hujan."
    ]
  },
  {
    id: 13,
    slug: "shalat-mutlak",
    title: "Shalat Mutlak",
    category: "Sunnah Ghairu Muakkad",
    description: "Shalat sunnah yang dilakukan tanpa sebab atau waktu tertentu, selama bukan di waktu-waktu yang terlarang untuk shalat.",
    dalil: [
      "Hadits Riwayat Muslim - \"Shalat adalah sebaik-baiknya amalan, maka perbanyaklah atau persedikitlah.\""
    ],
    niat: {
      arabic: "أُصَلِّى سُنَّةً رَكْعَتَيْنِ لِلهِ تَعَالَى",
      latin: "Ushalli sunnatan rak'ataini lillaahi ta'aalaa.",
      translation: "Aku niat shalat sunnah dua rakaat karena Allah ta'ala."
    },
    jumlahRakaat: "Tidak terbatas, dikerjakan 2 rakaat salam.",
    waktu: "Kapan saja, kecuali di lima waktu terlarang (setelah Subuh hingga matahari terbit, saat matahari tepat di atas, setelah Ashar hingga terbenam, saat matahari terbenam, dan saat khutbah Jumat).",
    tataCara: [
      { step: 1, description: "Niat shalat sunnah mutlak." },
      { step: 2, description: "Melaksanakan shalat dua rakaat seperti biasa." },
      { step: 3, description: "Dapat dilakukan sebanyak yang diinginkan." }
    ],
    keutamaan: [
      "Memperbanyak amalan dan pahala.",
      "Mengisi waktu luang dengan ibadah."
    ]
  },
  {
    id: 14,
    slug: "shalat-sunnah-safar",
    title: "Shalat Sunnah Safar",
    category: "Sunnah Ghairu Muakkad",
    description: "Shalat sunnah dua rakaat yang dilakukan sebelum memulai perjalanan (safar) dan setelah kembali dari perjalanan.",
    dalil: [
      "Hadits Riwayat Thabrani - \"Tidak ada sesuatu yang lebih utama yang ditinggalkan seorang hamba bagi keluarganya, daripada dua rakaat yang ia kerjakan di tengah-tengah mereka ketika ia hendak berpergian.\""
    ],
    niat: {
      arabic: "أُصَلِّى سُنَّةَ السَّفَرِ رَكْعَتَيْنِ لِلهِ تَعَالَى",
      latin: "Ushalli sunnatas safari rak'ataini lillaahi ta'aalaa.",
      translation: "Aku niat shalat sunnah safar dua rakaat karena Allah ta'ala."
    },
    jumlahRakaat: "2 rakaat",
    waktu: "Sebelum berangkat bepergian dan saat tiba di rumah setelah bepergian.",
    tataCara: [
      { step: 1, description: "Saat akan berangkat, shalat 2 rakaat di rumah." },
      { step: 2, description: "Setelah shalat, berdoa memohon keselamatan dan kemudahan dalam perjalanan." },
      { step: 3, description: "Saat tiba kembali dari perjalanan, dianjurkan untuk singgah ke masjid terlebih dahulu untuk shalat 2 rakaat sebelum pulang ke rumah." }
    ],
    keutamaan: [
      "Memohon perlindungan dan keselamatan kepada Allah selama perjalanan.",
      "Menjadi penjaga bagi keluarga yang ditinggalkan."
    ]
  },
  {
    id: 15,
    slug: "shalat-tarawih",
    title: "Shalat Tarawih",
    category: "Sunnah Muakkad",
    description: "Shalat sunnah khusus yang dilakukan pada malam hari di bulan Ramadhan.",
    dalil: [
      "Hadits Riwayat Bukhari dan Muslim - \"Barangsiapa yang menunaikan shalat malam di bulan Ramadhan (shalat tarawih) karena iman dan mengharap pahala dari Allah, maka diampuni dosa-dosanya yang telah lalu.\""
    ],
    niat: {
      arabic: "أُصَلِّى سُنَّةَ التَّرَاوِيْحِ رَكْعَتَيْنِ (إِمَامًا/مَأْمُوْمًا) لِلهِ تَعَالَى",
      latin: "Ushalli sunnatat tarawiihi rak'ataini (imaaman/makmuuman) lillaahi ta'aalaa.",
      translation: "Aku niat shalat sunnah Tarawih dua rakaat (sebagai imam/makmum) karena Allah ta'ala."
    },
    jumlahRakaat: "Umumnya 8 rakaat + 3 witir, atau 20 rakaat + 3 witir. Dikerjakan 2 rakaat salam.",
    waktu: "Setelah shalat Isya hingga sebelum fajar, khusus di bulan Ramadhan.",
    tataCara: [
      { step: 1, description: "Dilakukan secara berjamaah di masjid atau sendiri di rumah." },
      { step: 2, description: "Niat shalat Tarawih." },
      { step: 3, description: "Melaksanakan shalat dengan salam setiap dua rakaat hingga mencapai jumlah yang diinginkan (8 atau 20)." },
      { step: 4, description: "Setelah selesai, ditutup dengan shalat Witir." }
    ],
    keutamaan: [
      "Diampuni dosa-dosa yang telah lalu.",
      "Menghidupkan malam-malam Ramadhan dan meraih Lailatul Qadar."
    ]
  },
  {
    id: 16,
    slug: "shalat-witir",
    title: "Shalat Witir",
    category: "Sunnah Muakkad",
    description: "Shalat sunnah dengan jumlah rakaat ganjil yang dilakukan sebagai penutup shalat malam.",
    dalil: [
      "Hadits Riwayat Bukhari dan Muslim - \"Jadikanlah akhir shalat malam kalian adalah shalat Witir.\""
    ],
    niat: {
      arabic: "(Untuk 3 rakaat) أُصَلِّى سُنَّةَ الْوِتْرِ ثَلَاثَ رَكَعَاتٍ لِلهِ تَعَالَى",
      latin: "(Untuk 3 rakaat) Ushalli sunnatal witri tsalaatsa raka'aatin lillaahi ta'aalaa.",
      translation: "(Untuk 3 rakaat) Aku niat shalat sunnah Witir tiga rakaat karena Allah ta'ala."
    },
    jumlahRakaat: "Ganjil, minimal 1 rakaat, umumnya 3 rakaat. Bisa juga 5, 7, 9, atau 11 rakaat.",
    waktu: "Setelah shalat Isya hingga sebelum fajar.",
    tataCara: [
      { step: 1, description: "Niat shalat Witir." },
      { step: 2, description: "Jika 3 rakaat, bisa dikerjakan dengan 2 rakaat salam lalu 1 rakaat salam, atau langsung 3 rakaat dengan satu tasyahud akhir." },
      { step: 3, description: "Pada rakaat terakhir, setelah rukuk (saat i'tidal), dianjurkan membaca Doa Qunut." },
      { step: 4, description: "Setelah salam, dianjurkan berdzikir 'Subhanal Malikil Quddus' tiga kali." }
    ],
    keutamaan: [
      "Allah itu witir (ganjil) dan mencintai yang ganjil.",
      "Menjadi penutup shalat malam yang sempurna."
    ]
  },
  {
    id: 17,
    slug: "shalat-idul-fitri",
    title: "Shalat Idul Fitri",
    category: "Sunnah Muakkad",
    description: "Shalat sunnah yang dilakukan pada pagi hari tanggal 1 Syawal sebagai puncak perayaan Idul Fitri setelah sebulan berpuasa Ramadhan.",
    dalil: [
      "QS. Al-Kautsar [108]: 2 - \"Maka laksanakanlah shalat karena Tuhanmu, dan berkurbanlah.\" (Dianalogikan untuk shalat Id)"
    ],
    niat: {
      arabic: "أُصَلِّى سُنَّةً لِعِيْدِ الْفِطْرِ رَكْعَتَيْنِ (إِمَامًا/مَأْمُوْمًا) لِلهِ تَعَالَى",
      latin: "Ushalli sunnatan li'iidil fitri rak'ataini (imaaman/makmuuman) lillaahi ta'aalaa.",
      translation: "Aku niat shalat sunnah Idul Fitri dua rakaat (sebagai imam/makmum) karena Allah ta'ala."
    },
    jumlahRakaat: "2 rakaat",
    waktu: "Pagi hari tanggal 1 Syawal, sejak matahari terbit setinggi tombak hingga masuk waktu Dzuhur.",
    tataCara: [
      { step: 1, description: "Disunnahkan makan terlebih dahulu sebelum berangkat shalat." },
      { step: 2, description: "Rakaat pertama: 7 kali takbir setelah takbiratul ihram, sebelum membaca Al-Fatihah. Di sela-sela takbir membaca tasbih." },
      { step: 3, description: "Rakaat kedua: 5 kali takbir setelah takbir bangkit dari sujud, sebelum membaca Al-Fatihah." },
      { step: 4, description: "Setelah shalat, dilanjutkan dengan dua khutbah." }
    ],
    keutamaan: [
      "Menandai hari kemenangan setelah Ramadhan.",
      "Menjalin silaturahmi dan kebersamaan umat Islam."
    ]
  },
  {
    id: 18,
    slug: "shalat-idul-adha",
    title: "Shalat Idul Adha",
    category: "Sunnah Muakkad",
    description: "Shalat sunnah yang dilakukan pada pagi hari tanggal 10 Dzulhijjah sebagai bagian dari perayaan Idul Adha.",
    dalil: [
      "Sama dengan dalil shalat Idul Fitri."
    ],
    niat: {
      arabic: "أُصَلِّى سُنَّةً لِعِيْدِ الْأَضْحَى رَكْعَتَيْنِ (إِمَامًا/مَأْمُوْمًا) لِلهِ تَعَالَى",
      latin: "Ushalli sunnatan li'iidil adha rak'ataini (imaaman/makmuuman) lillaahi ta'aalaa.",
      translation: "Aku niat shalat sunnah Idul Adha dua rakaat (sebagai imam/makmum) karena Allah ta'ala."
    },
    jumlahRakaat: "2 rakaat",
    waktu: "Pagi hari tanggal 10 Dzulhijjah.",
    tataCara: [
      { step: 1, description: "Tata cara sama persis dengan shalat Idul Fitri (7 takbir di rakaat pertama, 5 takbir di rakaat kedua)." },
      { step: 2, description: "Perbedaannya, disunnahkan untuk tidak makan sebelum shalat Idul Adha, dan baru makan dari daging kurban setelahnya." },
      { step: 3, description: "Setelah shalat, dilanjutkan dengan dua khutbah dan penyembelihan hewan kurban." }
    ],
    keutamaan: [
      "Memperingati kisah ketaatan Nabi Ibrahim AS.",
      "Menjadi bagian dari syiar Islam di hari raya kurban."
    ]
  },
  {
    id: 19,
    slug: "shalat-tawaf",
    title: "Shalat Sunnah Tawaf",
    category: "Sunnah Muakkad",
    description: "Shalat sunnah dua rakaat yang dikerjakan setelah selesai melakukan tawaf (mengelilingi Ka'bah 7 kali) dalam rangkaian ibadah haji atau umrah.",
    dalil: [
      "Praktik Nabi Muhammad SAW yang selalu shalat dua rakaat setelah tawaf."
    ],
    niat: {
      arabic: "أُصَلِّى سُنَّةَ الطَّوَافِ رَكْعَتَيْنِ لِلهِ تَعَالَى",
      latin: "Ushalli sunnatat thawaafi rak'ataini lillaahi ta'aalaa.",
      translation: "Aku niat shalat sunnah tawaf dua rakaat karena Allah ta'ala."
    },
    jumlahRakaat: "2 rakaat",
    waktu: "Segera setelah selesai melakukan tawaf.",
    tataCara: [
      { step: 1, description: "Dikerjakan di belakang Maqam Ibrahim jika memungkinkan, jika tidak, di mana saja di area Masjidil Haram." },
      { step: 2, description: "Niat shalat sunnah tawaf." },
      { step: 3, description: "Pada rakaat pertama setelah Al-Fatihah, dianjurkan membaca Surat Al-Kafirun." },
      { step: 4, description: "Pada rakaat kedua setelah Al-Fatihah, dianjurkan membaca Surat Al-Ikhlas." },
      { step: 5, description: "Salam." }
    ],
    keutamaan: [
      "Menyempurnakan ibadah tawaf.",
      "Mendapatkan pahala seperti memerdekakan seorang budak dari Bani Ismail."
    ]
  },
  {
    id: 20,
    slug: "shalat-rawatib",
    title: "Shalat Rawatib",
    category: "Sunnah Muakkad",
    description: "Shalat sunnah yang mengiringi shalat fardhu lima waktu, baik sebelum (qabliyah) maupun sesudah (ba'diyah).",
    dalil: [
      "Hadits Riwayat Muslim - \"Tidaklah seorang hamba muslim shalat karena Allah setiap hari 12 rakaat shalat sunnah selain fardhu, melainkan Allah akan membangunkan untuknya sebuah rumah di surga.\""
    ],
    niat: {
      arabic: "(Contoh: Qabliyah Subuh) أُصَلِّى سُنَّةَ الصُّبْحِ رَكْعَتَيْنِ قَبْلِيَّةً لِلهِ تَعَالَى",
      latin: "(Contoh: Qabliyah Subuh) Ushalli sunnatas shubhi rak'ataini qabliyyatan lillaahi ta'aalaa.",
      translation: "(Contoh: Qabliyah Subuh) Aku niat shalat sunnah sebelum Subuh dua rakaat karena Allah ta'ala."
    },
    jumlahRakaat: "Total 12 rakaat yang muakkad: 2 sebelum Subuh, 4 sebelum Dzuhur, 2 setelah Dzuhur, 2 setelah Maghrib, 2 setelah Isya.",
    waktu: "Sebelum atau sesudah shalat fardhu sesuai ketentuannya.",
    tataCara: [
      { step: 1, description: "Niat sesuai dengan jenis shalat rawatib yang dikerjakan." },
      { step: 2, description: "Dikerjakan dua rakaat salam, kecuali 4 rakaat sebelum Dzuhur bisa 2x2 rakaat." },
      { step: 3, description: "Bacaan tidak dinyaringkan." }
    ],
    keutamaan: [
      "Dibangunkan rumah di surga.",
      "Menutupi kekurangan dalam shalat fardhu.",
      "Dua rakaat sebelum Subuh lebih baik dari dunia dan seisinya."
    ]
  },
  {
    id: 21,
    slug: "shalat-hajat",
    title: "Shalat Hajat",
    category: "Sunnah Ghairu Muakkad",
    description: "Shalat sunnah yang dilakukan ketika seseorang memiliki keinginan atau hajat tertentu dan ingin memohon kepada Allah agar dikabulkan.",
    dalil: [
      "Hadits Riwayat Tirmidzi dan Ibnu Majah - \"Barangsiapa yang mempunyai kebutuhan kepada Allah atau kepada seseorang dari Bani Adam, maka berwudhulah dan sempurnakanlah wudhunya, kemudian shalat dua rakaat…\""
    ],
    niat: {
      arabic: "أُصَلِّى سُنَّةَ الْحَاجَةِ رَكْعَتَيْنِ لِلهِ تَعَالَى",
      latin: "Ushalli sunnatal haajati rak'ataini lillaahi ta'aalaa.",
      translation: "Aku niat shalat sunnah hajat dua rakaat karena Allah ta'ala."
    },
    jumlahRakaat: "Minimal 2 rakaat, maksimal 12 rakaat.",
    waktu: "Bisa dilakukan kapan saja di luar waktu terlarang, namun lebih utama di sepertiga malam terakhir.",
    tataCara: [
      { step: 1, description: "Niat shalat hajat." },
      { step: 2, description: "Melaksanakan shalat dua rakaat seperti biasa." },
      { step: 3, description: "Setelah salam, memuji Allah dan bershalawat kepada Nabi Muhammad SAW." },
      { step: 4, description: "Membaca doa shalat hajat dan menyampaikan keinginan spesifik kepada Allah dengan penuh harap." }
    ],
    keutamaan: [
      "Menjadi sarana agar hajat dan keinginan lebih mudah dikabulkan oleh Allah.",
      "Menunjukkan ketergantungan seorang hamba kepada Tuhannya."
    ]
  },
  {
    id: 22,
    slug: "shalat-tasbih",
    title: "Shalat Tasbih",
    category: "Sunnah Ghairu Muakkad",
    description: "Shalat sunnah khusus yang di dalamnya dibaca kalimat tasbih (Subhanallah walhamdulillah wala ilaha illallah wallahu akbar) sebanyak 300 kali dalam 4 rakaat.",
    dalil: [
      "Hadits yang diriwayatkan oleh Abu Dawud dari Ikrimah dari Ibnu Abbas, di mana Rasulullah mengajarkan shalat ini kepada pamannya, Abbas bin Abdul Muthalib."
    ],
    niat: {
      arabic: "أُصَلِّى سُنَّةَ التَّسْبِيْحِ أَرْبَعَ رَكَعَاتٍ لِلهِ تَعَالَى",
      latin: "Ushalli sunnatat tasbiihi arba'a raka'aatin lillaahi ta'aalaa.",
      translation: "Aku niat shalat sunnah tasbih empat rakaat karena Allah ta'ala."
    },
    jumlahRakaat: "4 rakaat, bisa dengan satu salam (satu tasyahud) atau dua salam (setiap dua rakaat).",
    waktu: "Bisa dilakukan kapan saja di luar waktu terlarang.",
    tataCara: [
      { step: 1, description: "Niat dan takbiratul ihram." },
      { step: 2, description: "Setelah bacaan surat, membaca tasbih 15 kali." },
      { step: 3, description: "Dalam rukuk, setelah bacaan rukuk, membaca tasbih 10 kali." },
      { step: 4, description: "Dalam i'tidal, setelah bacaan i'tidal, membaca tasbih 10 kali." },
      { step: 5, description: "Dalam sujud pertama, setelah bacaan sujud, membaca tasbih 10 kali." },
      { step: 6, description: "Duduk di antara dua sujud, setelah bacaan, membaca tasbih 10 kali." },
      { step: 7, description: "Dalam sujud kedua, setelah bacaan sujud, membaca tasbih 10 kali." },
      { step: 8, description: "Duduk istirahat sebelum berdiri, membaca tasbih 10 kali. Total 75 kali per rakaat." },
      { step: 9, description: "Ulangi untuk 4 rakaat." }
    ],
    keutamaan: [
      "Dapat menghapus dosa-dosa besar dan kecil, yang disengaja atau tidak."
    ]
  },
  {
    id: 23,
    slug: "shalat-taubat",
    title: "Shalat Taubat",
    category: "Sunnah Ghairu Muakkad",
    description: "Shalat sunnah dua rakaat yang dilakukan sebagai wujud penyesalan atas dosa yang telah dilakukan dan memohon ampunan kepada Allah SWT.",
    dalil: [
      "Hadits Riwayat Abu Dawud - \"Tidaklah seorang hamba melakukan dosa kemudian ia bersuci dengan baik, lalu berdiri untuk shalat dua rakaat, kemudian memohon ampun kepada Allah, melainkan Allah akan mengampuninya.\""
    ],
    niat: {
      arabic: "أُصَلِّى سُنَّةَ التَّوْبَةِ رَكْعَتَيْنِ لِلهِ تَعَالَى",
      latin: "Ushalli sunnatat taubati rak'ataini lillaahi ta'aalaa.",
      translation: "Aku niat shalat sunnah taubat dua rakaat karena Allah ta'ala."
    },
    jumlahRakaat: "2 rakaat",
    waktu: "Bisa dilakukan kapan saja di luar waktu terlarang, lebih utama dilakukan sesegera mungkin setelah menyadari perbuatan dosa.",
    tataCara: [
      { step: 1, description: "Menyesali perbuatan dosa dengan tulus." },
      { step: 2, description: "Berwudhu dengan sempurna." },
      { step: 3, description: "Niat shalat taubat." },
      { step: 4, description: "Melaksanakan shalat dua rakaat seperti biasa." },
      { step: 5, description: "Setelah shalat, memperbanyak istighfar, menyesali dosa, dan bertekad untuk tidak mengulanginya lagi." }
    ],
    keutamaan: [
      "Menjadi sarana diterimanya taubat oleh Allah SWT.",
      "Menghapuskan dosa dan membersihkan diri."
    ]
  },
  {
    id: 24,
    slug: "shalat-jama",
    title: "Shalat Jama'",
    category: "Khusus",
    description: "Menggabungkan dua shalat fardhu dalam satu waktu, yaitu Dzuhur dengan Ashar, atau Maghrib dengan Isya. Ini adalah keringanan (rukhsah) bagi musafir atau dalam kondisi tertentu.",
    dalil: [
      "Hadits Riwayat Muslim - Ibnu Abbas berkata, 'Rasulullah SAW pernah menjama' antara Dzuhur dan Ashar, serta Maghrib dan Isya di Madinah, bukan karena takut atau hujan.' Ditanyakan, 'Apa yang beliau inginkan?' Ia menjawab, 'Beliau tidak ingin memberatkan umatnya.'"
    ],
    niat: {
      arabic: "(Contoh: Jama' Taqdim Dzuhur & Ashar) أُصَلِّى فَرْضَ الظُّهْرِ أَرْبَعَ رَكَعَاتٍ مَجْمُوْعًا بِالْعَصْرِ جَمْعَ تَقْدِيْمٍ لِلهِ تَعَالَى",
      latin: "(Contoh: Jama' Taqdim Dzuhur & Ashar) Ushalli fardhadz dzuhri arba'a raka'aatin majmuu'an bil 'ashri jam'a taqdiimin lillaahi ta'aalaa.",
      translation: "(Contoh: Jama' Taqdim Dzuhur & Ashar) Aku niat shalat fardhu Dzuhur empat rakaat dijamak dengan Ashar dengan jama' taqdim karena Allah ta'ala."
    },
    jumlahRakaat: "Sesuai jumlah rakaat shalat asli.",
    waktu: "Jama' Taqdim (di waktu shalat pertama) atau Jama' Takhir (di waktu shalat kedua).",
    tataCara: [
      { step: 1, description: "Jama' Taqdim: Mengerjakan shalat Dzuhur lalu Ashar di waktu Dzuhur. Atau Maghrib lalu Isya di waktu Maghrib." },
      { step: 2, description: "Jama' Takhir: Mengerjakan shalat Dzuhur lalu Ashar di waktu Ashar. Atau Maghrib lalu Isya di waktu Isya." },
      { step: 3, description: "Niat jama' harus dilakukan pada shalat yang pertama." },
      { step: 4, description: "Setelah salam dari shalat pertama, langsung berdiri untuk shalat kedua tanpa diselingi dzikir atau kegiatan lain yang lama." }
    ],
    keutamaan: [
      "Merupakan keringanan dari Allah untuk memudahkan hamba-Nya.",
      "Menunjukkan fleksibilitas syariat Islam."
    ]
  },
  {
    id: 25,
    slug: "shalat-qashar",
    title: "Shalat Qashar",
    category: "Khusus",
    description: "Meringkas jumlah rakaat shalat fardhu yang aslinya 4 rakaat (Dzuhur, Ashar, Isya) menjadi 2 rakaat. Ini adalah keringanan (rukhsah) khusus bagi musafir.",
    dalil: [
      "QS. An-Nisa [4]: 101 - \"Dan apabila kamu bepergian di muka bumi, maka tidaklah mengapa kamu men-qashar sembahyang(mu), jika kamu takut diserang orang-orang kafir.\""
    ],
    niat: {
      arabic: "(Contoh: Qashar Dzuhur) أُصَلِّى فَرْضَ الظُّهْرِ رَكْعَتَيْنِ قَصْرًا لِلهِ تَعَالَى",
      latin: "(Contoh: Qashar Dzuhur) Ushalli fardhadz dzuhri rak'ataini qasran lillaahi ta'aalaa.",
      translation: "(Contoh: Qashar Dzuhur) Aku niat shalat fardhu Dzuhur dua rakaat diqashar karena Allah ta'ala."
    },
    jumlahRakaat: "Dzuhur, Ashar, dan Isya menjadi 2 rakaat. Subuh dan Maghrib tetap.",
    waktu: "Dilakukan saat dalam perjalanan (safar) yang memenuhi syarat jarak tertentu (umumnya sekitar 89 km).",
    tataCara: [
      { step: 1, description: "Niat shalat fardhu dengan qashar." },
      { step: 2, description: "Melaksanakan shalat yang 4 rakaat menjadi 2 rakaat." },
      { step: 3, description: "Shalat Qashar bisa digabungkan dengan Jama' (Jama' Qashar)." }
    ],
    keutamaan: [
      "Merupakan sedekah dari Allah yang sebaiknya diterima.",
      "Memberikan kemudahan bagi orang yang sedang dalam perjalanan."
    ]
  },
  {
    id: 26,
    slug: "shalat-li-hurmatil-waqti",
    title: "Shalat Li Hurmatil Waqti",
    category: "Khusus",
    description: "Shalat yang dilakukan untuk menghormati waktu shalat ketika seseorang berada dalam kondisi yang tidak memungkinkan untuk bersuci secara sempurna (tidak ada air untuk wudhu/tayammum atau ada najis yang tidak bisa dihilangkan).",
    dalil: [
      "Prinsip umum dalam fiqh untuk tetap melaksanakan shalat pada waktunya sebisa mungkin, berdasarkan kaidah 'Al-Maysur la yasqutu bil ma'sur' (Sesuatu yang mudah tidak gugur karena adanya kesulitan)."
    ],
    niat: {
      arabic: "أُصَلِّى فَرْضَ (sebutkan shalatnya) لِحُرْمَةِ الْوَقْتِ لِلهِ تَعَالَى",
      latin: "Ushalli fardha (...) li hurmatil waqti lillaahi ta'aalaa.",
      translation: "Aku niat shalat fardhu (...) untuk menghormati waktu karena Allah ta'ala."
    },
    jumlahRakaat: "Sesuai jumlah rakaat shalat fardhu yang dikerjakan.",
    waktu: "Pada waktu shalat fardhu yang bersangkutan.",
    tataCara: [
      { step: 1, description: "Dilakukan dalam keadaan darurat tanpa bersuci." },
      { step: 2, description: "Melakukan gerakan shalat semampunya untuk menghormati waktu shalat." },
      { step: 3, description: "Wajib mengulangi (i'adah) shalat tersebut ketika sudah menemukan air atau bisa menghilangkan najis." }
    ],
    keutamaan: [
      "Menunjukkan komitmen seorang hamba untuk tidak meninggalkan shalat dalam kondisi apapun.",
      "Menghormati waktu shalat yang telah ditetapkan Allah."
    ]
  }
];
