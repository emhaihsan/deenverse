// data/zakatData.ts
import { ZakatType } from "@/types/zakat";

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
    id: "zakat-perdagangan",
    title: "Zakat Perdagangan",
    description: "Zakat atas barang dagangan yang diperjualbelikan untuk mendapatkan keuntungan.",
    icon: "🛒",
    category: "wajib",
    definisi:
      "Zakat perdagangan adalah zakat yang dikenakan atas barang yang diperjualbelikan dengan tujuan memperoleh keuntungan. Zakat ini wajib dikeluarkan bila nilai barang dagangan mencapai nisab setara 85 gram emas dan telah dimiliki selama 1 haul.",
    dalil: {
      quran: [
        "خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ - Ambillah zakat dari sebagian harta mereka, dengan zakat itu kamu membersihkan dan mensucikan mereka (QS. At-Taubah: 103)"
      ],
      hadits: [
        "فِيما سَقَتِ السَّمَاءُ العُشْرُ - Pada hasil bumi yang diairi hujan zakatnya 10% (HR. Bukhari Muslim) — diqiyaskan pada perdagangan"
      ]
    },
    madzhabOpinions: [
      {
        madzhab: "Hanafi",
        nisab: "85 gram emas",
        kadar: "2,5% dari total nilai barang + kas + piutang lancar",
        syarat: ["Dimiliki selama 1 haul", "Mencapai nisab", "Barang untuk diperjualbelikan"],
        catatan: "Modal awal dan keuntungan digabung untuk perhitungan"
      },
      {
        madzhab: "Maliki",
        nisab: "85 gram emas",
        kadar: "2,5% dari nilai barang dagangan",
        syarat: ["Dimiliki selama 1 haul", "Mencapai nisab"],
        catatan: "Barang dagangan dinilai berdasarkan harga pasar saat haul"
      },
      {
        madzhab: "Syafii",
        nisab: "85 gram emas",
        kadar: "2,5%",
        syarat: ["Dimiliki selama 1 haul", "Mencapai nisab"],
        catatan: "Barang dagangan dihitung bersama modal dan keuntungan"
      },
      {
        madzhab: "Hambali",
        nisab: "85 gram emas",
        kadar: "2,5%",
        syarat: ["Dimiliki selama 1 haul", "Mencapai nisab"],
        catatan: "Wajib zakat walaupun perdagangan mengalami kerugian di tengah tahun"
      }
    ],
    praktis: {
      caraPerhitungan:
        "Nilai barang dagangan + kas + piutang lancar - utang jatuh tempo × 2,5%.",
      contohKasus:
        "Nilai barang dagangan Rp 200 juta, kas Rp 50 juta, utang jatuh tempo Rp 20 juta → (200 + 50 - 20) × 2,5% = Rp 5.750.000",
      tipsZakat: [
        "Gunakan harga pasar saat haul",
        "Gabungkan modal dan keuntungan untuk menghitung nisab",
        "Catat piutang yang kemungkinan besar tertagih",
        "Bayarkan zakat di akhir tahun usaha"
      ]
    },
    lastUpdated: "2025-07-30",
    sources: ["Fiqh Az-Zakat - Yusuf Qardhawi", "Al-Majmu’ - Imam Nawawi", "Fatwa DSN MUI No. 23/DSN-MUI/III/2002"]
  },

  // =========================
  // ZAKAT TANAMAN PANGAN
  // =========================
  {
    id: "zakat-tanaman-pangan",
    title: "Zakat Tanaman Pangan",
    description: "Zakat yang dikenakan atas hasil tanaman pangan yang menjadi makanan pokok.",
    icon: "🌾",
    category: "wajib",
    definisi:
      "Zakat tanaman pangan adalah zakat yang dikenakan pada hasil pertanian yang menjadi makanan pokok, seperti padi, gandum, jagung, dan kurma, apabila mencapai nisab ±653 kg gabah kering dan dipanen sekali dalam setahun.",
    dalil: {
      quran: [
        "وَآتُوا حَقَّهُ يَوْمَ حَصَادِهِ - Tunaikanlah haknya (zakat) di hari panennya (QS. Al-An’am: 141)"
      ],
      hadits: [
        "لَيْسَ فِيمَا دُونَ خَمْسَةِ أَوْسُقٍ صَدَقَةٌ - Tidak ada zakat pada hasil pertanian kurang dari 5 wasaq (±653 kg gabah) (HR. Bukhari Muslim)"
      ]
    },
    madzhabOpinions: [
      {
        madzhab: "Hanafi",
        nisab: "653 kg gabah kering",
        kadar: "5% jika diairi dengan biaya, 10% jika diairi hujan",
        syarat: ["Mencapai nisab", "Tanaman menjadi makanan pokok"],
        catatan: "Zakat dikeluarkan setiap kali panen"
      },
      {
        madzhab: "Maliki",
        nisab: "653 kg gabah kering",
        kadar: "5% atau 10%",
        syarat: ["Mencapai nisab", "Hasil tahan lama"],
        catatan: "Tidak mensyaratkan haul"
      },
      {
        madzhab: "Syafii",
        nisab: "653 kg gabah kering",
        kadar: "5% atau 10%",
        syarat: ["Mencapai nisab", "Tanaman yang mengenyangkan"],
        catatan: "Zakat wajib pada setiap panen"
      },
      {
        madzhab: "Hambali",
        nisab: "653 kg gabah kering",
        kadar: "5% atau 10%",
        syarat: ["Mencapai nisab"],
        catatan: "Perhitungan kadar berdasarkan cara pengairan"
      }
    ],
    praktis: {
      caraPerhitungan:
        "Hasil panen × 5% (diairi dengan biaya) atau × 10% (diairi hujan).",
      contohKasus:
        "Panen padi 2 ton diairi hujan → 2.000 kg × 10% = 200 kg beras",
      tipsZakat: [
        "Hitung setiap kali panen",
        "Gunakan timbangan bersih tanpa sekam",
        "Boleh dibayar dengan uang senilai hasil panen",
        "Sebaiknya dibagikan di daerah setempat"
      ]
    },
    lastUpdated: "2025-07-30",
    sources: ["Fiqh Az-Zakat - Yusuf Qardhawi", "Al-Mughni - Ibnu Qudamah"]
  },
  {
    id: "zakat-tambak",
    title: "Zakat Tambak",
    description: "Zakat yang dikenakan atas hasil tambak perikanan seperti udang, ikan, atau bandeng.",
    icon: "🐟",
    category: "wajib",
    definisi:
      "Zakat tambak adalah zakat yang dikenakan pada hasil budidaya perikanan seperti udang, ikan, bandeng, atau kepiting. Ulama kontemporer mengqiyaskan zakat tambak dengan zakat pertanian atau perdagangan tergantung metode usaha dan perputaran modalnya.",
    dalil: {
      quran: [
        "وَهُوَ الَّذِي سَخَّرَ الْبَحْرَ لِتَأْكُلُوا مِنْهُ لَحْمًا طَرِيًّا - Dia-lah yang menundukkan laut untukmu agar kamu dapat memakan darinya daging yang segar (QS. An-Nahl: 14)"
      ],
      hadits: [
        "فِيمَا سَقَتِ السَّمَاءُ الْعُشْرُ - Pada hasil yang diairi hujan zakatnya 10% (HR. Bukhari Muslim) — diqiyaskan pada hasil tambak"
      ]
    },
    madzhabOpinions: [
      {
        madzhab: "Hanafi",
        nisab: "85 gram emas (jika dianggap perdagangan)",
        kadar: "2,5% (perdagangan) atau 5-10% (pertanian)",
        syarat: ["Mencapai nisab", "Dimiliki muslim", "Hasil usaha yang halal"],
        catatan: "Boleh memilih qiyas pada pertanian atau perdagangan"
      },
      {
        madzhab: "Maliki",
        nisab: "653 kg setara harga pasar",
        kadar: "5% atau 10%",
        syarat: ["Mencapai nisab", "Hasil dapat disimpan"],
        catatan: "Jika hasil tambak tidak tahan lama, dihitung perdagangan"
      },
      {
        madzhab: "Syafii",
        nisab: "85 gram emas",
        kadar: "2,5% nilai hasil panen per haul",
        syarat: ["Mencapai nisab", "Hasil diperjualbelikan"],
        catatan: "Umumnya dianggap zakat perdagangan"
      },
      {
        madzhab: "Hambali",
        nisab: "85 gram emas",
        kadar: "2,5% atau 5-10%",
        syarat: ["Mencapai nisab"],
        catatan: "Kadar mengikuti analogi perdagangan/pertanian"
      }
    ],
    praktis: {
      caraPerhitungan:
        "Total nilai hasil panen dikurangi biaya operasional × 2,5% atau 5-10% tergantung metode qiyas.",
      contohKasus:
        "Hasil panen tambak udang senilai Rp 300 juta, biaya operasional Rp 100 juta → (300 - 100) × 2,5% = Rp 5 juta",
      tipsZakat: [
        "Gunakan harga jual pasar saat panen",
        "Pilih metode qiyas yang lebih maslahat",
        "Jika panen beberapa kali setahun, zakat setiap kali panen",
        "Boleh dibayar dengan uang"
      ]
    },
    lastUpdated: "2025-07-30",
    sources: ["Fiqh Az-Zakat - Yusuf Qardhawi", "Fatwa MUI No. 2 Tahun 2003"]
  },

  // =========================
  // ZAKAT PERUSAHAAN
  // =========================
  {
    id: "zakat-perusahaan",
    title: "Zakat Perusahaan",
    description: "Zakat atas keuntungan perusahaan yang telah mencapai nisab dan haul.",
    icon: "🏢",
    category: "wajib",
    definisi:
      "Zakat perusahaan adalah zakat yang dikeluarkan atas keuntungan bersih atau modal kerja perusahaan yang telah mencapai nisab dan haul. Zakat ini berlaku untuk semua jenis badan usaha, baik milik individu maupun bersama.",
    dalil: {
      quran: [
        "خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً - Ambillah zakat dari sebagian harta mereka (QS. At-Taubah: 103)"
      ],
      hadits: [
        "فِي الرِّقَةِ رُبُعُ الْعُشْرِ - Pada perak zakatnya seperempat puluh (2,5%) (HR. Abu Dawud)"
      ]
    },
    madzhabOpinions: [
      {
        madzhab: "Hanafi",
        nisab: "85 gram emas",
        kadar: "2,5% dari aset zakat perusahaan",
        syarat: ["Perusahaan muslim", "Aset untuk diperdagangkan"],
        catatan: "Dihitung seperti zakat perdagangan"
      },
      {
        madzhab: "Maliki",
        nisab: "85 gram emas",
        kadar: "2,5%",
        syarat: ["Dimiliki muslim", "Mencapai nisab"],
        catatan: "Modal dan keuntungan dihitung bersama"
      },
      {
        madzhab: "Syafii",
        nisab: "85 gram emas",
        kadar: "2,5%",
        syarat: ["Dimiliki selama 1 haul", "Mencapai nisab"],
        catatan: "Zakat dikeluarkan dari kas bersih dan barang dagangan"
      },
      {
        madzhab: "Hambali",
        nisab: "85 gram emas",
        kadar: "2,5%",
        syarat: ["Mencapai nisab"],
        catatan: "Jika usaha rugi, zakat tetap wajib jika aset bersih mencapai nisab"
      }
    ],
    praktis: {
      caraPerhitungan:
        "Aset lancar + persediaan - kewajiban jangka pendek × 2,5%.",
      contohKasus:
        "Aset lancar Rp 1 miliar, persediaan Rp 500 juta, kewajiban jangka pendek Rp 300 juta → (1.000 + 500 - 300) × 2,5% = Rp 30 juta",
      tipsZakat: [
        "Libatkan akuntan untuk perhitungan akurat",
        "Bayarkan zakat pada akhir tahun buku",
        "Zakat boleh dibayar perusahaan, tidak hanya oleh pemegang saham",
        "Catat aset zakat secara terpisah dari aset tetap"
      ]
    },
    lastUpdated: "2025-07-30",
    sources: ["Fiqh Az-Zakat - Yusuf Qardhawi", "Fatwa DSN MUI No. 8/DSN-MUI/IV/2000"]
  },

  // =========================
  // ZAKAT PROPERTI
  // =========================
  {
    id: "zakat-properti",
    title: "Zakat Properti",
    description: "Zakat atas properti yang dimiliki untuk diperjualbelikan atau disewakan.",
    icon: "🏠",
    category: "wajib",
    definisi:
      "Zakat properti adalah zakat yang dikenakan pada kepemilikan properti yang dimaksudkan untuk diperjualbelikan atau disewakan, dengan perhitungan berbeda tergantung tujuan kepemilikan.",
    dalil: {
      quran: [
        "وَالَّذِينَ يَكْنِزُونَ الذَّهَبَ وَالْفِضَّةَ - Orang-orang yang menimbun emas dan perak... beritakanlah kepada mereka siksa yang pedih (QS. At-Taubah: 34)"
      ],
      hadits: [
        "فِي الرِّقَةِ رُبُعُ الْعُشْرِ - Pada perak zakatnya seperempat puluh (HR. Abu Dawud)"
      ]
    },
    madzhabOpinions: [
      {
        madzhab: "Hanafi",
        nisab: "85 gram emas",
        kadar: "2,5% (jual-beli) atau 10% hasil sewa",
        syarat: ["Dimiliki untuk diperjualbelikan atau disewakan"],
        catatan: "Properti pribadi tidak dikenai zakat"
      },
      {
        madzhab: "Maliki",
        nisab: "85 gram emas",
        kadar: "2,5%",
        syarat: ["Untuk tujuan komersial"],
        catatan: "Zakat dihitung dari nilai jual properti dagang"
      },
      {
        madzhab: "Syafii",
        nisab: "85 gram emas",
        kadar: "2,5%",
        syarat: ["Dimiliki 1 haul"],
        catatan: "Zakat properti sewa dihitung dari pendapatan bersih"
      },
      {
        madzhab: "Hambali",
        nisab: "85 gram emas",
        kadar: "2,5%",
        syarat: ["Untuk tujuan komersial"],
        catatan: "Properti pribadi bebas zakat"
      }
    ],
    praktis: {
      caraPerhitungan:
        "Properti jual-beli → nilai pasar × 2,5%. Properti sewa → pendapatan bersih × 2,5%.",
      contohKasus:
        "Pendapatan sewa setahun Rp 240 juta, biaya perawatan Rp 40 juta → (240 - 40) × 2,5% = Rp 5 juta",
      tipsZakat: [
        "Pisahkan properti komersial dari properti pribadi",
        "Gunakan harga pasar terkini",
        "Jika properti rugi namun nilai jual tetap tinggi, zakat tetap wajib",
        "Boleh membayar dengan uang tunai"
      ]
    },
    lastUpdated: "2025-07-30",
    sources: ["Fiqh Az-Zakat - Yusuf Qardhawi", "Fatwa DSN MUI No. 32/DSN-MUI/IX/2002"]
  },
  {
    id: "zakat-profesi",
    title: "Zakat Profesi",
    description: "Zakat atas penghasilan dari profesi, gaji, honorarium, atau jasa.",
    icon: "💼",
    category: "wajib",
    definisi:
      "Zakat profesi adalah zakat atas penghasilan dari gaji, upah, atau pendapatan profesional seperti dokter, pengacara, konsultan, seniman, dan lain-lain. Ulama kontemporer mengqiyaskan zakat ini dengan zakat pertanian (langsung saat menerima) atau zakat perdagangan (setelah setahun).",
    dalil: {
      quran: [
        "وَآتُوا حَقَّهُ يَوْمَ حَصَادِهِ - Tunaikanlah haknya pada hari panennya (QS. Al-An'am: 141)"
      ],
      hadits: [
        "فِي الرِّقَةِ رُبُعُ الْعُشْرِ - Pada harta perak zakatnya seperempat puluh (HR. Abu Dawud)"
      ]
    },
    madzhabOpinions: [
      {
        madzhab: "Hanafi",
        nisab: "85 gram emas",
        kadar: "2,5% (per tahun) atau 2,5% dari gaji bulanan bila langsung dikeluarkan",
        syarat: ["Penghasilan halal", "Mencapai nisab"],
        catatan: "Boleh zakat saat menerima atau di akhir tahun"
      },
      {
        madzhab: "Maliki",
        nisab: "85 gram emas",
        kadar: "2,5%",
        syarat: ["Penghasilan halal", "Dimiliki selama haul"],
        catatan: "Disamakan dengan zakat perdagangan"
      },
      {
        madzhab: "Syafii",
        nisab: "85 gram emas",
        kadar: "2,5%",
        syarat: ["Dimiliki selama haul", "Mencapai nisab"],
        catatan: "Boleh zakat langsung jika lebih maslahat"
      },
      {
        madzhab: "Hambali",
        nisab: "85 gram emas",
        kadar: "2,5%",
        syarat: ["Mencapai nisab"],
        catatan: "Boleh mengikuti metode haul atau langsung"
      }
    ],
    praktis: {
      caraPerhitungan:
        "Pendapatan bersih bulanan × 2,5% (langsung) atau akumulasi tahunan × 2,5%.",
      contohKasus:
        "Gaji Rp 15 juta/bulan → Rp 15.000.000 × 2,5% = Rp 375.000 zakat tiap bulan",
      tipsZakat: [
        "Lebih mudah jika dibayar bulanan",
        "Hitung dari gaji bersih setelah kebutuhan pokok",
        "Pisahkan rekening zakat agar mudah kontrol",
        "Boleh dibayar lebih awal dari haul"
      ]
    },
    lastUpdated: "2025-07-30",
    sources: ["Fiqh Az-Zakat - Yusuf Qardhawi", "Fatwa MUI No. 3 Tahun 2003"]
  },

  // =========================
  // ZAKAT TANAMAN PRODUKTIF
  // =========================
  {
    id: "zakat-tanaman-produktif",
    title: "Zakat Tanaman Produktif",
    description: "Zakat atas hasil kebun, perkebunan, atau tanaman tahunan produktif.",
    icon: "🌳",
    category: "wajib",
    definisi:
      "Zakat tanaman produktif adalah zakat yang dikenakan atas hasil kebun atau tanaman yang berbuah secara periodik, seperti kelapa sawit, karet, kopi, teh, atau buah-buahan, apabila hasilnya mencapai nisab setara 653 kg gabah per tahun.",
    dalil: {
      quran: [
        "وَآتُوا حَقَّهُ يَوْمَ حَصَادِهِ - Tunaikanlah haknya pada hari panennya (QS. Al-An'am: 141)"
      ],
      hadits: [
        "لَيْسَ فِيمَا دُونَ خَمْسَةِ أَوْسُقٍ صَدَقَةٌ - Tidak ada zakat pada hasil pertanian kurang dari 5 wasaq (HR. Bukhari Muslim)"
      ]
    },
    madzhabOpinions: [
      {
        madzhab: "Hanafi",
        nisab: "653 kg gabah setara nilai",
        kadar: "5% atau 10%",
        syarat: ["Hasil tanaman tahan lama", "Mencapai nisab"],
        catatan: "Tidak mensyaratkan haul"
      },
      {
        madzhab: "Maliki",
        nisab: "653 kg gabah setara nilai",
        kadar: "5% atau 10%",
        syarat: ["Mencapai nisab"],
        catatan: "Zakat setiap kali panen"
      },
      {
        madzhab: "Syafii",
        nisab: "653 kg gabah setara nilai",
        kadar: "5% atau 10%",
        syarat: ["Mencapai nisab"],
        catatan: "Dihitung saat panen"
      },
      {
        madzhab: "Hambali",
        nisab: "653 kg gabah setara nilai",
        kadar: "5% atau 10%",
        syarat: ["Mencapai nisab"],
        catatan: "Kadar mengikuti cara pengairan"
      }
    ],
    praktis: {
      caraPerhitungan:
        "Nilai hasil panen × 10% (diairi hujan) atau × 5% (diairi dengan biaya).",
      contohKasus:
        "Panen sawit senilai Rp 200 juta diairi hujan → Rp 200 juta × 10% = Rp 20 juta zakat",
      tipsZakat: [
        "Hitung saat panen",
        "Pisahkan hasil tiap panen",
        "Boleh dibayar dalam bentuk hasil atau uang",
        "Boleh distribusi ke mustahik sekitar kebun"
      ]
    },
    lastUpdated: "2025-07-30",
    sources: ["Fiqh Az-Zakat - Yusuf Qardhawi", "Fatwa DSN MUI No. 86/DSN-MUI/XII/2012"]
  },

  // =========================
  // ZAKAT PETERNAKAN
  // =========================
  {
    id: "zakat-peternakan",
    title: "Zakat Peternakan",
    description: "Zakat atas hewan ternak seperti unta, sapi, dan kambing yang digembalakan.",
    icon: "🐄",
    category: "wajib",
    definisi:
      "Zakat peternakan adalah zakat yang dikenakan atas kepemilikan hewan ternak yang digembalakan di padang rumput bebas dan mencapai nisab tertentu selama 1 haul.",
    dalil: {
      quran: [
        "وَالأنْعَامَ خَلَقَهَا لَكُمْ فِيهَا دِفْءٌ وَمَنَافِعُ - Dan Dia menciptakan binatang ternak untuk kamu, padanya ada kehangatan dan berbagai manfaat (QS. An-Nahl: 5)"
      ],
      hadits: [
        "فِي سَائِمَةِ الْغَنَمِ إِذَا كَانَتْ أَرْبَعِينَ فِيهَا شَاةٌ - Pada kambing yang digembalakan jika mencapai 40 ekor, zakatnya 1 ekor kambing (HR. Bukhari)"
      ]
    },
    madzhabOpinions: [
      {
        madzhab: "Hanafi",
        nisab: "40 kambing, 30 sapi, atau 5 unta",
        kadar: "Berdasarkan tabel zakat ternak",
        syarat: ["Digembalakan bebas", "Dimiliki 1 haul"],
        catatan: "Ternak pekerja tidak wajib zakat"
      },
      {
        madzhab: "Maliki",
        nisab: "Sama seperti Hanafi",
        kadar: "Berdasarkan nisab masing-masing ternak",
        syarat: ["Digembalakan bebas"],
        catatan: "Jika diberi pakan dari rumah, tidak wajib"
      },
      {
        madzhab: "Syafii",
        nisab: "Sama seperti Hanafi",
        kadar: "Berdasarkan nisab ternak",
        syarat: ["Dimiliki 1 haul"],
        catatan: "Mengikuti tabel zakat ternak"
      },
      {
        madzhab: "Hambali",
        nisab: "Sama seperti Hanafi",
        kadar: "Mengacu nisab ternak",
        syarat: ["Digembalakan bebas"],
        catatan: "Ternak dagang dihitung zakat perdagangan"
      }
    ],
    praktis: {
      caraPerhitungan:
        "Ikuti nisab dan kadar sesuai jenis ternak (misal: 40 kambing → zakat 1 ekor kambing).",
      contohKasus:
        "Memiliki 50 kambing digembalakan → zakat 1 ekor kambing",
      tipsZakat: [
        "Catat jumlah ternak tiap tahun",
        "Pastikan ternak bukan ternak pekerja",
        "Boleh zakat dalam bentuk uang senilai ternak",
        "Serahkan pada amil untuk distribusi"
      ]
    },
    lastUpdated: "2025-07-30",
    sources: ["Fiqh Az-Zakat - Yusuf Qardhawi", "Al-Mughni - Ibnu Qudamah"]
  },

  // =========================
  // ZAKAT SIMPANAN EMAS, PERAK & PERHIASAN
  // =========================
  {
    id: "zakat-emas-perak-perhiasan",
    title: "Zakat Simpanan Emas, Perak & Perhiasan",
    description: "Zakat atas emas, perak, dan perhiasan yang disimpan sebagai harta.",
    icon: "🥇",
    category: "wajib",
    definisi:
      "Zakat emas, perak, dan perhiasan adalah zakat yang dikenakan pada logam mulia yang dimiliki untuk simpanan atau investasi, bukan untuk dipakai sehari-hari, jika mencapai nisab 85 gram emas atau 595 gram perak.",
    dalil: {
      quran: [
        "وَالَّذِينَ يَكْنِزُونَ الذَّهَبَ وَالْفِضَّةَ - Orang-orang yang menimbun emas dan perak... beritakanlah kepada mereka siksa yang pedih (QS. At-Taubah: 34)"
      ],
      hadits: [
        "لَيْسَ فِيمَا دُونَ خَمْسِ أَوَاقٍ صَدَقَةٌ - Tidak ada zakat pada emas kurang dari 5 uqiyah (±85 gram) (HR. Muslim)"
      ]
    },
    madzhabOpinions: [
      {
        madzhab: "Hanafi",
        nisab: "85g emas / 595g perak",
        kadar: "2,5%",
        syarat: ["Dimiliki 1 haul", "Mencapai nisab"],
        catatan: "Perhiasan untuk dipakai tetap wajib zakat"
      },
      {
        madzhab: "Maliki",
        nisab: "85g emas / 595g perak",
        kadar: "2,5%",
        syarat: ["Untuk simpanan/investasi"],
        catatan: "Perhiasan pakai bebas zakat"
      },
      {
        madzhab: "Syafii",
        nisab: "85g emas / 595g perak",
        kadar: "2,5%",
        syarat: ["Simpanan"],
        catatan: "Perhiasan pakai bebas zakat"
      },
      {
        madzhab: "Hambali",
        nisab: "85g emas / 595g perak",
        kadar: "2,5%",
        syarat: ["Simpanan"],
        catatan: "Perhiasan pakai bebas zakat"
      }
    ],
    praktis: {
      caraPerhitungan:
        "(Berat emas × harga/gram) × 2,5%.",
      contohKasus:
        "Emas 100g harga Rp 1 juta/gram → 100 × 1.000.000 × 2,5% = Rp 2,5 juta",
      tipsZakat: [
        "Hitung harga pasar emas/perak terbaru",
        "Pisahkan emas investasi dari emas pakai",
        "Zakat setiap tahun",
        "Boleh dibayar dengan emas fisik atau uang"
      ]
    },
    lastUpdated: "2025-07-30",
    sources: ["Fiqh Az-Zakat - Yusuf Qardhawi", "Fatwa MUI No. 14 Tahun 2011"]
  },

  // =========================
  // ZAKAT TABUNGAN & INVESTASI
  // =========================
  {
    id: "zakat-tabungan-investasi",
    title: "Zakat Tabungan & Investasi",
    description: "Zakat atas uang tabungan, deposito, saham, reksa dana, atau instrumen investasi halal.",
    icon: "🏦",
    category: "wajib",
    definisi:
      "Zakat tabungan & investasi adalah zakat yang dikenakan pada simpanan uang dan instrumen investasi halal seperti deposito, saham, sukuk, reksa dana, apabila totalnya mencapai nisab setara 85 gram emas dan dimiliki selama 1 haul.",
    dalil: {
      quran: [
        "خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً - Ambillah zakat dari sebagian harta mereka (QS. At-Taubah: 103)"
      ],
      hadits: [
        "فِي الرِّقَةِ رُبُعُ الْعُشْرِ - Pada harta perak zakatnya seperempat puluh (2,5%) (HR. Abu Dawud)"
      ]
    },
    madzhabOpinions: [
      {
        madzhab: "Hanafi",
        nisab: "85g emas",
        kadar: "2,5%",
        syarat: ["Dimiliki 1 haul", "Mencapai nisab"],
        catatan: "Nilai investasi dihitung harga pasar"
      },
      {
        madzhab: "Maliki",
        nisab: "85g emas",
        kadar: "2,5%",
        syarat: ["Dimiliki 1 haul"],
        catatan: "Saham perusahaan zakat dari nilai pasar"
      },
      {
        madzhab: "Syafii",
        nisab: "85g emas",
        kadar: "2,5%",
        syarat: ["Dimiliki 1 haul"],
        catatan: "Tabungan dan investasi halal wajib zakat"
      },
      {
        madzhab: "Hambali",
        nisab: "85g emas",
        kadar: "2,5%",
        syarat: ["Dimiliki 1 haul"],
        catatan: "Investasi jangka panjang tetap wajib zakat"
      }
    ],
    praktis: {
      caraPerhitungan:
        "(Saldo tabungan + nilai pasar investasi) × 2,5%.",
      contohKasus:
        "Tabungan Rp 100 juta, reksa dana Rp 50 juta → (100 + 50) × 2,5% = Rp 3,75 juta",
      tipsZakat: [
        "Gunakan nilai pasar terkini",
        "Gabungkan semua rekening dan investasi halal",
        "Pisahkan dari dana konsumtif",
        "Zakat setiap tahun pada tanggal haul"
      ]
    },
    lastUpdated: "2025-07-30",
    sources: ["Fiqh Az-Zakat - Yusuf Qardhawi", "Fatwa MUI No. 3 Tahun 2003"]
  }
];
