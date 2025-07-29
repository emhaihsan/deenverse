// data/zakatData.ts
import { ZakatType, ZakatCategory } from "@/types/zakat";

export const zakatTypes: ZakatType[] = [
  {
    id: "zakat-fitrah",
    title: "Zakat Fitrah",
    description: "Zakat yang wajib dikeluarkan setiap Muslim menjelang Hari Raya Idul Fitri",
    icon: "🌙",
    category: "wajib",
    definisi: "Zakat fitrah adalah zakat yang wajib dikeluarkan oleh setiap Muslim pada bulan Ramadan sebelum shalat Idul Fitri. Zakat ini bertujuan untuk mensucikan jiwa dari dosa-dosa kecil dan membantu fakir miskin agar dapat merayakan Idul Fitri dengan layak.",
    dalil: {
      quran: [
        "قَدْ أَفْلَحَ مَن زَكَّاهَا - Sesungguhnya beruntunglah orang yang mensucikan jiwa itu (QS. Asy-Syams: 9)"
      ],
      hadits: [
        "فَرَضَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ زَكَاةَ الْفِطْرِ - Rasulullah SAW mewajibkan zakat fitrah (HR. Bukhari Muslim)"
      ]
    },
    madzhabOpinions: [
      {
        madzhab: "Hanafi",
        nisab: "Tidak ada nisab khusus",
        kadar: "1 sha' (±2,5 kg) makanan pokok atau setara uang",
        syarat: ["Muslim", "Hidup saat terbenam matahari akhir Ramadan", "Memiliki kelebihan dari kebutuhan pokok", "Merdeka"],
        catatan: "Boleh mengeluarkan dalam bentuk uang dengan nilai setara makanan pokok"
      },
      {
        madzhab: "Maliki",
        nisab: "Tidak ada nisab khusus",
        kadar: "1 mudd (±0,6 kg) gandum atau 1 sha' (±2,5 kg) selain gandum",
        syarat: ["Muslim", "Hidup saat terbenam matahari akhir Ramadan", "Memiliki kelebihan dari kebutuhan pokok", "Merdeka"],
        catatan: "Membedakan kadar antara gandum dengan makanan pokok lainnya"
      },
      {
        madzhab: "Syafii",
        nisab: "Tidak ada nisab khusus",
        kadar: "1 sha' (±2,5 kg) makanan pokok daerah setempat",
        syarat: ["Muslim", "Hidup saat terbenam matahari akhir Ramadan", "Mampu mengeluarkan", "Merdeka"],
        catatan: "Harus berupa makanan pokok, tidak boleh uang"
      },
      {
        madzhab: "Hambali",
        nisab: "Tidak ada nisab khusus",
        kadar: "1 sha' (±2,5 kg) makanan pokok",
        syarat: ["Muslim", "Hidup saat terbenam matahari akhir Ramadan", "Memiliki kelebihan dari kebutuhan pokok", "Merdeka"],
        catatan: "Lebih utama berupa makanan, namun boleh uang jika lebih maslahat"
      }
    ],
    praktis: {
      caraPerhitungan: "Zakat fitrah dihitung per jiwa. Setiap Muslim wajib mengeluarkan 1 sha' (±2,5 kg) beras atau makanan pokok, atau senilai uangnya (sekitar Rp 35.000-50.000 per orang tahun 2024).",
      contohKasus: "Keluarga dengan 4 anggota (ayah, ibu, 2 anak) wajib mengeluarkan zakat fitrah untuk 4 orang = 4 x Rp 40.000 = Rp 160.000",
      tipsZakat: [
        "Keluarkan sebelum shalat Idul Fitri",
        "Lebih utama dikeluarkan di daerah tempat tinggal",
        "Dapat diwakilkan kepada amil zakat terpercaya",
        "Jika terlambat, tetap wajib dibayar sebagai qadha"
      ]
    },
    lastUpdated: "2024-01-15",
    sources: ["Fiqh Az-Zakat - Yusuf Qardhawi", "Al-Mughni - Ibnu Qudamah", "Fatwa MUI No. 3 Tahun 2022"]
  },
  {
    id: "zakat-tabungan",
    title: "Zakat Tabungan",
    description: "Zakat yang dikeluarkan dari uang simpanan yang telah mencapai nisab dan haul",
    icon: "💰",
    category: "wajib",
    definisi: "Zakat tabungan adalah zakat yang wajib dikeluarkan dari uang simpanan (tabungan, deposito, giro) yang telah mencapai nisab dan berlalu satu tahun (haul). Termasuk dalam kategori zakat mal (harta).",
    dalil: {
      quran: [
        "وَالَّذِينَ يَكْنِزُونَ الذَّهَبَ وَالْفِضَّةَ وَلاَ يُنفِقُونَهَا فِي سَبِيلِ اللّهِ - Dan orang-orang yang menyimpan emas dan perak dan tidak menafkahkannya pada jalan Allah (QS. At-Taubah: 34)"
      ],
      hadits: [
        "مَا مِنْ صَاحِبِ ذَهَبٍ وَلَا فِضَّةٍ لَا يُؤَدِّي مِنْهَا حَقَّهَا - Tidak ada pemilik emas dan perak yang tidak menunaikan haknya (HR. Bukhari Muslim)"
      ]
    },
    madzhabOpinions: [
      {
        madzhab: "Hanafi",
        nisab: "85 gram emas atau setara (±Rp 85 juta)",
        kadar: "2,5% dari total tabungan",
        syarat: ["Mencapai nisab", "Berlalu satu tahun (haul)", "Milik penuh", "Berkembang atau dapat berkembang"],
        catatan: "Uang kertas diperlakukan sama dengan emas/perak sebagai alat tukar"
      },
      {
        madzhab: "Maliki",
        nisab: "85 gram emas atau 595 gram perak (yang lebih rendah)",
        kadar: "2,5% dari total tabungan",
        syarat: ["Mencapai nisab", "Berlalu satu tahun", "Milik penuh", "Tidak untuk kebutuhan pokok"],
        catatan: "Menggunakan nisab yang lebih rendah antara emas atau perak"
      },
      {
        madzhab: "Syafii",
        nisab: "85 gram emas atau 595 gram perak",
        kadar: "2,5% dari total tabungan",
        syarat: ["Mencapai nisab", "Berlalu satu tahun", "Milik penuh", "Tidak berkurang dari nisab selama haul"],
        catatan: "Jika berkurang dari nisab di tengah tahun, haul dimulai lagi"
      },
      {
        madzhab: "Hambali",
        nisab: "85 gram emas atau 595 gram perak",
        kadar: "2,5% dari total tabungan",
        syarat: ["Mencapai nisab", "Berlalu satu tahun", "Milik penuh", "Kelebihan dari kebutuhan pokok"],
        catatan: "Sama dengan madzhab Syafii dalam perhitungan haul"
      }
    ],
    praktis: {
      caraPerhitungan: "Hitung total tabungan pada akhir tahun Hijriah. Jika mencapai nisab (±Rp 85 juta), keluarkan 2,5%. Contoh: tabungan Rp 100 juta, zakat = Rp 100 juta x 2,5% = Rp 2,5 juta.",
      contohKasus: "Ahmad memiliki tabungan Rp 120 juta selama 1 tahun penuh. Zakat yang wajib dikeluarkan = Rp 120 juta x 2,5% = Rp 3 juta",
      tipsZakat: [
        "Catat tanggal pertama mencapai nisab sebagai awal haul",
        "Hitung semua simpanan (tabungan, deposito, giro)",
        "Potong dahulu hutang yang jatuh tempo",
        "Bayar segera setelah haul genap satu tahun"
      ]
    },
    lastUpdated: "2024-01-15",
    sources: ["Fiqh Az-Zakat - Yusuf Qardhawi", "Fatwa DSN-MUI No. 3/DSN-MUI/IV/2000", "Panduan Zakat BAZNAS"]
  },
  {
    id: "zakat-emas",
    title: "Zakat Emas",
    description: "Zakat yang dikeluarkan dari kepemilikan emas yang mencapai nisab",
    icon: "🏅",
    category: "wajib",
    definisi: "Zakat emas adalah zakat yang wajib dikeluarkan dari kepemilikan emas, baik berupa perhiasan, batangan, maupun koin emas yang telah mencapai nisab dan haul.",
    dalil: {
      quran: [
        "وَالَّذِينَ يَكْنِزُونَ الذَّهَبَ وَالْفِضَّةَ وَلاَ يُنفِقُونَهَا فِي سَبِيلِ اللّهِ فَبَشِّرْهُم بِعَذَابٍ أَلِيمٍ - Dan orang-orang yang menyimpan emas dan perak dan tidak menafkahkannya pada jalan Allah, maka beritahukanlah kepada mereka (bahwa mereka akan mendapat) siksa yang pedih (QS. At-Taubah: 34)"
      ],
      hadits: [
        "فِي كُلِّ عِشْرِينَ مِثْقَالاً مِنَ الذَّهَبِ نِصْفُ مِثْقَالٍ - Pada setiap 20 mitsqal emas (zakatnya) setengah mitsqal (HR. Abu Dawud)"
      ]
    },
    madzhabOpinions: [
      {
        madzhab: "Hanafi",
        nisab: "85 gram emas (20 mitsqal)",
        kadar: "2,5% atau 1/40 dari total emas",
        syarat: ["Mencapai nisab 85 gram", "Berlalu satu tahun (haul)", "Milik penuh", "Tidak untuk perdagangan aktif"],
        catatan: "Perhiasan yang dipakai sehari-hari tetap wajib zakat jika mencapai nisab"
      },
      {
        madzhab: "Maliki",
        nisab: "85 gram emas",
        kadar: "2,5% dari total emas",
        syarat: ["Mencapai nisab", "Berlalu satu tahun", "Milik penuh", "Tidak untuk kebutuhan"],
        catatan: "Perhiasan yang dipakai wajar tidak wajib zakat, yang berlebihan wajib zakat"
      },
      {
        madzhab: "Syafii",
        nisab: "85 gram emas",
        kadar: "2,5% dari total emas",
        syarat: ["Mencapai nisab", "Berlalu satu tahun", "Milik penuh", "Tidak berkurang dari nisab"],
        catatan: "Semua emas wajib zakat, termasuk perhiasan yang dipakai"
      },
      {
        madzhab: "Hambali",
        nisab: "85 gram emas",
        kadar: "2,5% dari total emas",
        syarat: ["Mencapai nisab", "Berlalu satu tahun", "Milik penuh", "Kelebihan dari kebutuhan"],
        catatan: "Sama dengan madzhab Syafii, semua emas wajib zakat"
      }
    ],
    praktis: {
      caraPerhitungan: "Timbang semua emas yang dimiliki. Jika mencapai 85 gram dan telah dimiliki 1 tahun, keluarkan 2,5%. Contoh: 100 gram emas, zakat = 100 x 2,5% = 2,5 gram emas atau senilai uang.",
      contohKasus: "Siti memiliki perhiasan emas total 120 gram selama 2 tahun. Zakat yang wajib = 120 gram x 2,5% = 3 gram emas (atau senilai Rp 3 juta jika harga emas Rp 1 juta/gram)",
      tipsZakat: [
        "Timbang emas secara berkala",
        "Catat tanggal pembelian untuk menghitung haul",
        "Boleh bayar dengan uang senilai emas",
        "Perhiasan rusak/tidak terpakai tetap dihitung"
      ]
    },
    lastUpdated: "2024-01-15",
    sources: ["Fiqh Az-Zakat - Yusuf Qardhawi", "Al-Majmu' - An-Nawawi", "Fatwa MUI tentang Zakat Perhiasan"]
  },
  {
    id: "zakat-perak",
    title: "Zakat Perak",
    description: "Zakat yang dikeluarkan dari kepemilikan perak yang mencapai nisab",
    icon: "🥈",
    category: "wajib",
    definisi: "Zakat perak adalah zakat yang wajib dikeluarkan dari kepemilikan perak, baik berupa perhiasan, batangan, maupun koin perak yang telah mencapai nisab dan haul.",
    dalil: {
      quran: [
        "وَالَّذِينَ يَكْنِزُونَ الذَّهَبَ وَالْفِضَّةَ وَلاَ يُنفِقُونَهَا فِي سَبِيلِ اللّهِ فَبَشِّرْهُم بِعَذَابٍ أَلِيمٍ - Dan orang-orang yang menyimpan emas dan perak dan tidak menafkahkannya pada jalan Allah, maka beritahukanlah kepada mereka (bahwa mereka akan mendapat) siksa yang pedih (QS. At-Taubah: 34)"
      ],
      hadits: [
        "وَفِي الرِّقَّةِ رُبُعُ الْعُشْرِ - Dan pada perak (zakatnya) seperempat dari sepersepuluh (2,5%) (HR. Bukhari)"
      ]
    },
    madzhabOpinions: [
      {
        madzhab: "Hanafi",
        nisab: "595 gram perak (200 dirham)",
        kadar: "2,5% atau 1/40 dari total perak",
        syarat: ["Mencapai nisab 595 gram", "Berlalu satu tahun (haul)", "Milik penuh", "Tidak untuk perdagangan aktif"],
        catatan: "Perhiasan perak yang dipakai tetap wajib zakat jika mencapai nisab"
      },
      {
        madzhab: "Maliki",
        nisab: "595 gram perak",
        kadar: "2,5% dari total perak",
        syarat: ["Mencapai nisab", "Berlalu satu tahun", "Milik penuh", "Tidak untuk kebutuhan wajar"],
        catatan: "Perhiasan yang dipakai secara wajar tidak wajib zakat"
      },
      {
        madzhab: "Syafii",
        nisab: "595 gram perak",
        kadar: "2,5% dari total perak",
        syarat: ["Mencapai nisab", "Berlalu satu tahun", "Milik penuh", "Tidak berkurang dari nisab"],
        catatan: "Semua perak wajib zakat, termasuk perhiasan yang dipakai"
      },
      {
        madzhab: "Hambali",
        nisab: "595 gram perak",
        kadar: "2,5% dari total perak",
        syarat: ["Mencapai nisab", "Berlalu satu tahun", "Milik penuh", "Kelebihan dari kebutuhan"],
        catatan: "Sama dengan madzhab Syafii dalam kewajiban zakat perak"
      }
    ],
    praktis: {
      caraPerhitungan: "Timbang semua perak yang dimiliki. Jika mencapai 595 gram dan telah dimiliki 1 tahun, keluarkan 2,5%. Contoh: 700 gram perak, zakat = 700 x 2,5% = 17,5 gram perak.",
      contohKasus: "Fatimah memiliki perhiasan perak total 800 gram selama 1,5 tahun. Zakat yang wajib = 800 gram x 2,5% = 20 gram perak (atau senilai uang sesuai harga perak saat itu)",
      tipsZakat: [
        "Nisab perak lebih rendah dari emas, sehingga lebih mudah tercapai",
        "Perak antik/bersejarah dihitung berdasarkan berat, bukan nilai antik",
        "Boleh bayar dengan uang senilai perak",
        "Gabungkan dengan emas jika keduanya dimiliki"
      ]
    },
    lastUpdated: "2024-01-15",
    sources: ["Fiqh Az-Zakat - Yusuf Qardhawi", "Bidayatul Mujtahid - Ibnu Rusyd", "Panduan Zakat Logam Mulia BAZNAS"]
  },
  {
    id: "zakat-ternak",
    title: "Zakat Ternak",
    description: "Zakat yang dikeluarkan dari hewan ternak (unta, sapi, kambing/domba)",
    icon: "🐄",
    category: "wajib",
    definisi: "Zakat ternak adalah zakat yang wajib dikeluarkan dari kepemilikan hewan ternak seperti unta, sapi/kerbau, dan kambing/domba yang dipelihara untuk dikembangbiakkan dan telah mencapai nisab serta haul.",
    dalil: {
      quran: [
        "وَمِنَ الأَنْعَامِ حَمُولَةً وَفَرْشًا كُلُوا مِمَّا رَزَقَكُمُ اللّهُ - Dan di antara hewan ternak itu ada yang untuk pengangkutan dan ada yang untuk disembelih. Makanlah dari rezeki yang telah diberikan Allah kepadamu (QS. Al-An'am: 142)"
      ],
      hadits: [
        "فِي كُلِّ خَمْسٍ مِنَ الإِبِلِ شَاةٌ - Pada setiap lima ekor unta (zakatnya) seekor kambing (HR. Bukhari)"
      ]
    },
    madzhabOpinions: [
      {
        madzhab: "Hanafi",
        nisab: "Unta: 5 ekor, Sapi: 30 ekor, Kambing: 40 ekor",
        kadar: "Bervariasi sesuai jumlah dan jenis ternak",
        syarat: ["Mencapai nisab", "Berlalu satu tahun", "Digembalakan di padang umum", "Untuk dikembangbiakkan, bukan diperdagangkan"],
        catatan: "Ternak yang diberi pakan (ma'lufa) tidak wajib zakat menurut pendapat yang kuat"
      },
      {
        madzhab: "Maliki",
        nisab: "Unta: 5 ekor, Sapi: 30 ekor, Kambing: 40 ekor",
        kadar: "Sesuai tabel nisab masing-masing ternak",
        syarat: ["Mencapai nisab", "Berlalu satu tahun", "Untuk pengembangbiakan", "Tidak untuk perdagangan aktif"],
        catatan: "Ternak yang diberi pakan tetap wajib zakat jika untuk pengembangbiakan"
      },
      {
        madzhab: "Syafii",
        nisab: "Unta: 5 ekor, Sapi: 30 ekor, Kambing: 40 ekor",
        kadar: "Sesuai tabel nisab yang detail",
        syarat: ["Mencapai nisab", "Berlalu satu tahun", "Digembalakan sebagian besar tahun", "Untuk dikembangbiakkan"],
        catatan: "Lebih detail dalam perhitungan nisab dan kadar zakat"
      },
      {
        madzhab: "Hambali",
        nisab: "Unta: 5 ekor, Sapi: 30 ekor, Kambing: 40 ekor",
        kadar: "Mengikuti tabel nisab yang sama dengan Syafii",
        syarat: ["Mencapai nisab", "Berlalu satu tahun", "Digembalakan", "Untuk dikembangbiakkan"],
        catatan: "Sama dengan madzhab Syafii dalam detail perhitungan"
      }
    ],
    praktis: {
      caraPerhitungan: "Hitung jumlah ternak pada akhir haul. Lihat tabel nisab: Unta 5-9 ekor = 1 kambing, 10-14 = 2 kambing, dst. Sapi 30-39 = 1 anak sapi 1 tahun, 40-59 = 1 anak sapi 2 tahun. Kambing 40-120 = 1 kambing, 121-200 = 2 kambing.",
      contohKasus: "Pak Ahmad memiliki 50 ekor kambing selama 2 tahun untuk dikembangbiakkan. Zakat yang wajib = 1 ekor kambing (sesuai nisab 40-120 ekor)",
      tipsZakat: [
        "Ternak yang sakit/cacat tidak boleh untuk zakat",
        "Pilih ternak yang berkualitas sedang (tidak terbaik/terburuk)",
        "Ternak untuk konsumsi pribadi tidak wajib zakat",
        "Gabungkan ternak sejenis untuk mencapai nisab"
      ]
    },
    lastUpdated: "2024-01-15",
    sources: ["Fiqh Az-Zakat - Yusuf Qardhawi", "Nail Al-Authar - Asy-Syaukani", "Panduan Zakat Ternak Kemenag RI"]
  },
  {
    id: "zakat-perdagangan",
    title: "Zakat Perdagangan",
    description: "Zakat yang dikeluarkan dari harta yang diperuntukkan untuk perdagangan",
    icon: "🏪",
    category: "wajib",
    definisi: "Zakat perdagangan adalah zakat yang wajib dikeluarkan dari harta yang diniatkan untuk diperdagangkan, termasuk barang dagangan, modal usaha, dan keuntungan yang telah mencapai nisab dan haul.",
    dalil: {
      quran: [
        "يَا أَيُّهَا الَّذِينَ آمَنُواْ أَنفِقُواْ مِن طَيِّبَاتِ مَا كَسَبْتُمْ - Hai orang-orang yang beriman, nafkahkanlah sebagian dari hasil usahamu yang baik-baik (QS. Al-Baqarah: 267)"
      ],
      hadits: [
        "كَانَ رَسُولُ اللَّهِ يَأْمُرُنَا أَنْ نُخْرِجَ الصَّدَقَةَ مِنَ الَّذِي نُعِدُّ لِلْبَيْعِ - Rasulullah SAW memerintahkan kami mengeluarkan sedekah dari barang yang kami sediakan untuk dijual (HR. Abu Dawud)"
      ]
    },
    madzhabOpinions: [
      {
        madzhab: "Hanafi",
        nisab: "Senilai 85 gram emas",
        kadar: "2,5% dari nilai barang dagangan + modal + keuntungan",
        syarat: ["Niat untuk diperdagangkan", "Mencapai nisab", "Berlalu satu tahun", "Milik penuh"],
        catatan: "Dinilai berdasarkan harga pada akhir haul, bukan harga beli"
      },
      {
        madzhab: "Maliki",
        nisab: "Senilai 85 gram emas atau 595 gram perak",
        kadar: "2,5% dari nilai total barang dagangan",
        syarat: ["Niat perdagangan sejak awal", "Mencapai nisab", "Berlalu satu tahun", "Aktif diperdagangkan"],
        catatan: "Barang yang tidak laku dijual tetap dihitung jika masih diniatkan untuk dagang"
      },
      {
        madzhab: "Syafii",
        nisab: "Senilai 85 gram emas",
        kadar: "2,5% dari nilai barang dagangan",
        syarat: ["Niat perdagangan", "Mencapai nisab", "Berlalu satu tahun", "Tidak berkurang dari nisab"],
        catatan: "Jika nilai turun di bawah nisab di tengah tahun, haul dimulai lagi"
      },
      {
        madzhab: "Hambali",
        nisab: "Senilai 85 gram emas",
        kadar: "2,5% dari nilai barang dagangan",
        syarat: ["Niat perdagangan", "Mencapai nisab", "Berlalu satu tahun", "Kelebihan dari kebutuhan"],
        catatan: "Sama dengan madzhab Syafii dalam perhitungan haul"
      }
    ],
    praktis: {
      caraPerhitungan: "Hitung nilai seluruh barang dagangan pada akhir haul berdasarkan harga pasar saat itu. Tambahkan modal dan keuntungan. Jika mencapai nisab (±Rp 85 juta), keluarkan 2,5%.",
      contohKasus: "Toko Pak Budi: Stok barang Rp 80 juta + modal tunai Rp 30 juta = Rp 110 juta. Zakat = Rp 110 juta x 2,5% = Rp 2,75 juta",
      tipsZakat: [
        "Catat tanggal mulai berdagang sebagai awal haul",
        "Nilai barang berdasarkan harga jual, bukan harga beli",
        "Kurangi hutang dagang yang jatuh tempo",
        "Pisahkan barang untuk dagang dan konsumsi pribadi"
      ]
    },
    lastUpdated: "2024-01-15",
    sources: ["Fiqh Az-Zakat - Yusuf Qardhawi", "Al-Mughni - Ibnu Qudamah", "Fatwa DSN-MUI tentang Zakat Perdagangan"]
  },
  {
    id: "zakat-pertanian",
    title: "Zakat Pertanian",
    description: "Zakat yang dikeluarkan dari hasil pertanian dan perkebunan",
    icon: "🌾",
    category: "wajib",
    definisi: "Zakat pertanian adalah zakat yang wajib dikeluarkan dari hasil pertanian seperti padi, gandum, kurma, dan hasil perkebunan lainnya yang mencapai nisab.",
    dalil: {
      quran: [
        "وَآتُواْ حَقَّهُ يَوْمَ حَصَادِهِ - Dan tunaikanlah haknya di hari memetik hasilnya (QS. Al-An'am: 141)"
      ],
      hadits: [
        "فِيمَا سَقَتِ السَّمَاءُ وَالْعُيُونُ أَوْ كَانَ عَثَرِيًّا الْعُشْرُ وَفِيمَا سُقِيَ بِالنَّضْحِ نِصْفُ الْعُشْرِ - Yang diairi hujan dan mata air (zakatnya) sepersepuluh, yang diairi dengan penyiraman (zakatnya) setengah sepersepuluh (HR. Bukhari)"
      ]
    },
    madzhabOpinions: [
      {
        madzhab: "Hanafi",
        nisab: "Tidak ada nisab (semua hasil wajib zakat)",
        kadar: "10% jika diairi hujan/sungai, 5% jika diairi irigasi buatan",
        syarat: ["Tanaman makanan pokok", "Dapat disimpan/tahan lama", "Milik penuh", "Hasil panen"],
        catatan: "Hanya tanaman yang dapat disimpan dan menjadi makanan pokok"
      },
      {
        madzhab: "Maliki",
        nisab: "5 wasaq (±653 kg)",
        kadar: "10% atau 5% tergantung sistem pengairan",
        syarat: ["Mencapai nisab", "Tanaman makanan pokok", "Dapat disimpan", "Milik penuh"],
        catatan: "Buah-buahan dan sayuran tidak wajib zakat"
      },
      {
        madzhab: "Syafii",
        nisab: "5 wasaq (±653 kg)",
        kadar: "10% atau 5% sesuai pengairan",
        syarat: ["Mencapai nisab", "Tanaman makanan pokok", "Dapat disimpan", "Milik penuh"],
        catatan: "Sama dengan Maliki, fokus pada makanan pokok yang tahan lama"
      },
      {
        madzhab: "Hambali",
        nisab: "5 wasaq (±653 kg)",
        kadar: "10% atau 5% sesuai pengairan",
        syarat: ["Mencapai nisab", "Tanaman makanan pokok", "Dapat disimpan", "Milik penuh"],
        catatan: "Mengikuti pendapat Syafii dan Maliki"
      }
    ],
    praktis: {
      caraPerhitungan: "Timbang hasil panen setelah dibersihkan. Jika mencapai nisab (±653 kg), keluarkan 10% jika tadah hujan atau 5% jika pakai irigasi/pompa.",
      contohKasus: "Pak Tani panen padi 1 ton (1000 kg) dengan tadah hujan. Zakat = 1000 kg x 10% = 100 kg beras atau senilai uang",
      tipsZakat: [
        "Zakat dikeluarkan saat panen, tidak menunggu haul",
        "Hitung setelah dikurangi biaya produksi menurut pendapat kontemporer",
        "Buah dan sayuran tidak wajib zakat menurut jumhur ulama",
        "Dapat dibayar dengan uang senilai hasil panen"
      ]
    },
    lastUpdated: "2024-01-15",
    sources: ["Fiqh Az-Zakat - Yusuf Qardhawi", "Al-Majmu' - An-Nawawi", "Panduan Zakat Pertanian Kemenag RI"]
  },
  {
    id: "zakat-profesi",
    title: "Zakat Profesi",
    description: "Zakat yang dikeluarkan dari penghasilan profesi dan pekerjaan",
    icon: "💼",
    category: "wajib",
    definisi: "Zakat profesi adalah zakat yang dikeluarkan dari penghasilan yang diperoleh melalui pekerjaan, profesi, atau keahlian tertentu seperti gaji, honorarium, dan fee jasa profesional.",
    dalil: {
      quran: [
        "يَا أَيُّهَا الَّذِينَ آمَنُواْ أَنفِقُواْ مِن طَيِّبَاتِ مَا كَسَبْتُمْ - Hai orang-orang yang beriman, nafkahkanlah sebagian dari hasil usahamu yang baik-baik (QS. Al-Baqarah: 267)"
      ],
      hadits: [
        "مَا مِنْ يَوْمٍ يُصْبِحُ الْعِبَادُ فِيهِ إِلاَّ مَلَكَانِ يَنْزِلاَنِ - Tidak ada hari dimana hamba-hamba Allah berada di dalamnya kecuali dua malaikat turun (HR. Bukhari Muslim)"
      ]
    },
    madzhabOpinions: [
      {
        madzhab: "Hanafi",
        nisab: "Senilai 85 gram emas per tahun",
        kadar: "2,5% dari total penghasilan bersih per tahun",
        syarat: ["Mencapai nisab", "Berlalu satu tahun", "Penghasilan halal", "Kelebihan dari kebutuhan pokok"],
        catatan: "Diqiyaskan dengan zakat harta, dihitung per tahun"
      },
      {
        madzhab: "Maliki",
        nisab: "Senilai 85 gram emas",
        kadar: "2,5% dari penghasilan bersih",
        syarat: ["Mencapai nisab", "Penghasilan rutin", "Halal", "Milik penuh"],
        catatan: "Dapat dihitung per bulan jika penghasilan rutin dan mencapai nisab"
      },
      {
        madzhab: "Syafii",
        nisab: "Senilai 85 gram emas",
        kadar: "2,5% dari penghasilan bersih",
        syarat: ["Mencapai nisab", "Berlalu haul", "Penghasilan halal", "Tidak berkurang dari nisab"],
        catatan: "Lebih hati-hati dalam penerapan, mengikuti aturan zakat harta"
      },
      {
        madzhab: "Hambali",
        nisab: "Senilai 85 gram emas",
        kadar: "2,5% dari penghasilan bersih",
        syarat: ["Mencapai nisab", "Berlalu haul", "Penghasilan halal", "Kelebihan kebutuhan"],
        catatan: "Mengikuti pendapat Syafii dalam kehati-hatian penerapan"
      }
    ],
    praktis: {
      caraPerhitungan: "Hitung total penghasilan bersih per tahun (gaji + tunjangan + bonus - pajak). Jika mencapai nisab (±Rp 85 juta/tahun), keluarkan 2,5%. Atau per bulan jika gaji bulanan mencapai nisab.",
      contohKasus: "Dokter dengan penghasilan Rp 15 juta/bulan = Rp 180 juta/tahun. Zakat = Rp 180 juta x 2,5% = Rp 4,5 juta per tahun atau Rp 375 ribu per bulan",
      tipsZakat: [
        "Dapat dibayar langsung saat terima gaji (tidak menunggu haul)",
        "Hitung penghasilan bersih setelah dikurangi pajak",
        "Termasuk bonus, tunjangan, dan penghasilan sampingan",
        "Konsisten dalam metode perhitungan (bulanan atau tahunan)"
      ]
    },
    lastUpdated: "2024-01-15",
    sources: ["Fiqh Az-Zakat - Yusuf Qardhawi", "Fatwa MUI No. 3 Tahun 2003", "Panduan Zakat Profesi BAZNAS"]
  },
  {
    id: "zakat-investasi",
    title: "Zakat Investasi",
    description: "Zakat yang dikeluarkan dari hasil investasi seperti saham, obligasi, dan reksadana",
    icon: "📈",
    category: "wajib",
    definisi: "Zakat investasi adalah zakat yang wajib dikeluarkan dari hasil investasi dalam bentuk saham, obligasi, reksadana, dan instrumen investasi lainnya yang halal dan telah mencapai nisab serta haul.",
    dalil: {
      quran: [
        "يَا أَيُّهَا الَّذِينَ آمَنُواْ أَنفِقُواْ مِن طَيِّبَاتِ مَا كَسَبْتُمْ - Hai orang-orang yang beriman, nafkahkanlah sebagian dari hasil usahamu yang baik-baik (QS. Al-Baqarah: 267)"
      ],
      hadits: [
        "فِي الرِّكَازِ الْخُمُسُ - Pada rikaz (harta temuan) seperlima (HR. Bukhari Muslim)"
      ]
    },
    madzhabOpinions: [
      {
        madzhab: "Hanafi",
        nisab: "Senilai 85 gram emas",
        kadar: "2,5% dari nilai investasi + keuntungan",
        syarat: ["Investasi halal", "Mencapai nisab", "Berlalu satu tahun", "Dapat dicairkan"],
        catatan: "Diqiyaskan dengan zakat perdagangan, dihitung berdasarkan nilai pasar"
      },
      {
        madzhab: "Maliki",
        nisab: "Senilai 85 gram emas",
        kadar: "2,5% dari total nilai investasi",
        syarat: ["Investasi halal", "Mencapai nisab", "Berlalu haul", "Milik penuh"],
        catatan: "Saham diperlakukan seperti barang dagangan"
      },
      {
        madzhab: "Syafii",
        nisab: "Senilai 85 gram emas",
        kadar: "2,5% dari nilai investasi",
        syarat: ["Investasi halal", "Mencapai nisab", "Berlalu haul", "Tidak berkurang dari nisab"],
        catatan: "Mengikuti aturan zakat perdagangan dengan ketat"
      },
      {
        madzhab: "Hambali",
        nisab: "Senilai 85 gram emas",
        kadar: "2,5% dari nilai investasi",
        syarat: ["Investasi halal", "Mencapai nisab", "Berlalu haul", "Kelebihan kebutuhan"],
        catatan: "Sama dengan madzhab Syafii dalam perhitungan"
      }
    ],
    praktis: {
      caraPerhitungan: "Hitung nilai total portofolio investasi pada akhir haul berdasarkan harga pasar. Jika mencapai nisab (±Rp 85 juta), keluarkan 2,5%. Termasuk dividen dan capital gain.",
      contohKasus: "Ibu Sari memiliki saham senilai Rp 120 juta + reksadana Rp 50 juta = Rp 170 juta. Zakat = Rp 170 juta x 2,5% = Rp 4,25 juta",
      tipsZakat: [
        "Pastikan investasi sesuai prinsip syariah",
        "Hitung berdasarkan nilai pasar saat akhir haul",
        "Termasuk dividen dan keuntungan yang diterima",
        "Kurangi biaya investasi yang wajib dibayar"
      ]
    },
    lastUpdated: "2024-01-15",
    sources: ["Fatwa DSN-MUI tentang Zakat Saham", "Panduan Zakat Investasi BAZNAS", "Contemporary Fiqh Issues - Wahbah Zuhaili"]
  },
  {
    id: "zakat-rikaz",
    title: "Zakat Rikaz",
    description: "Zakat yang dikeluarkan dari harta temuan atau harta karun",
    icon: "💎",
    category: "wajib",
    definisi: "Zakat rikaz adalah zakat yang wajib dikeluarkan dari harta temuan berupa emas, perak, atau barang berharga lainnya yang ditemukan dalam tanah, baik peninggalan zaman jahiliyah maupun yang tidak diketahui pemiliknya.",
    dalil: {
      quran: [
        "وَاعْلَمُواْ أَنَّمَا غَنِمْتُم مِّن شَيْءٍ فَأَنَّ لِلّهِ خُمُسَهُ - Ketahuilah, sesungguhnya apa saja yang dapat kamu peroleh sebagai rampasan perang, maka sesungguhnya seperlima untuk Allah (QS. Al-Anfal: 41)"
      ],
      hadits: [
        "وَفِي الرِّكَازِ الْخُمُسُ - Dan pada rikaz (zakatnya) seperlima (HR. Bukhari Muslim)"
      ]
    },
    madzhabOpinions: [
      {
        madzhab: "Hanafi",
        nisab: "Tidak ada nisab",
        kadar: "20% (seperlima) dari nilai temuan",
        syarat: ["Harta temuan dari zaman jahiliyah", "Ditemukan di tanah", "Tidak diketahui pemiliknya", "Berupa logam mulia"],
        catatan: "Hanya berlaku untuk temuan zaman jahiliyah, bukan temuan modern"
      },
      {
        madzhab: "Maliki",
        nisab: "Tidak ada nisab",
        kadar: "20% dari nilai temuan",
        syarat: ["Harta temuan", "Tidak diketahui pemiliknya", "Ditemukan di tanah", "Berupa logam atau barang berharga"],
        catatan: "Termasuk temuan modern jika tidak diketahui pemiliknya"
      },
      {
        madzhab: "Syafii",
        nisab: "Tidak ada nisab",
        kadar: "20% dari nilai temuan",
        syarat: ["Harta temuan zaman jahiliyah", "Ditemukan di tanah", "Berupa emas/perak", "Tidak ada tanda kepemilikan"],
        catatan: "Lebih spesifik pada temuan zaman jahiliyah"
      },
      {
        madzhab: "Hambali",
        nisab: "Tidak ada nisab",
        kadar: "20% dari nilai temuan",
        syarat: ["Harta temuan", "Tidak diketahui pemiliknya", "Ditemukan di tanah", "Berupa logam mulia"],
        catatan: "Mengikuti pendapat yang lebih umum seperti Maliki"
      }
    ],
    praktis: {
      caraPerhitungan: "Nilai harta temuan berdasarkan harga pasar saat ditemukan. Langsung keluarkan 20% tanpa menunggu haul. Sisanya 80% menjadi milik penemu.",
      contohKasus: "Pak Ahmad menemukan emas antik senilai Rp 100 juta di tanahnya. Zakat rikaz = Rp 100 juta x 20% = Rp 20 juta. Sisanya Rp 80 juta menjadi miliknya.",
      tipsZakat: [
        "Segera keluarkan zakat setelah temuan dinilai",
        "Tidak perlu menunggu haul seperti zakat lainnya",
        "Konsultasi dengan ahli untuk menentukan nilai dan keaslian",
        "Jika ada petunjuk pemilik, kembalikan kepada pemilik"
      ]
    },
    lastUpdated: "2024-01-15",
    sources: ["Fiqh Az-Zakat - Yusuf Qardhawi", "Al-Mughni - Ibnu Qudamah", "Fiqh Sunnah - Sayyid Sabiq"]
  }
];

export const zakatCategories: ZakatCategory[] = [
  {
    id: "zakat-harta",
    name: "Zakat Harta",
    description: "Zakat yang dikeluarkan dari harta kekayaan",
    zakatTypes: ["zakat-tabungan", "zakat-emas", "zakat-perak", "zakat-perdagangan", "zakat-investasi"]
  },
  {
    id: "zakat-fitrah",
    name: "Zakat Fitrah",
    description: "Zakat yang wajib dikeluarkan pada bulan Ramadan",
    zakatTypes: ["zakat-fitrah"]
  },
  {
    id: "zakat-penghasilan",
    name: "Zakat Penghasilan",
    description: "Zakat dari hasil usaha dan profesi",
    zakatTypes: ["zakat-profesi", "zakat-pertanian", "zakat-ternak"]
  },
  {
    id: "zakat-temuan",
    name: "Zakat Temuan",
    description: "Zakat dari harta temuan",
    zakatTypes: ["zakat-rikaz"]
  }
];
