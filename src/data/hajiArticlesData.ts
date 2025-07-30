// src/data/hajiArticlesData.ts
import { HajiArticle } from '../types/haji';

export const hajiArticlesData: HajiArticle[] = [
  {
    id: 1,
    slug: 'kriteria-batu-jamrah',
    title: 'Kriteria Batu Kerikil untuk Lempar Jamrah',
    summary: 'Memahami ukuran, jenis, dan cara memperoleh batu kerikil yang sah untuk ibadah lempar jamrah.',
    content: [
      { title: 'Ukuran Batu', content: 'Ukuran batu kerikil untuk melontar jamrah dianjurkan tidak terlalu besar dan tidak terlalu kecil, kira-kira sebesar biji kacang atau ujung ruas jari kelingking. Tujuannya adalah untuk menunjukkan kepatuhan, bukan untuk menyakiti setan secara fisik.' },
      { title: 'Jenis Batu', content: 'Jenis batunya adalah kerikil biasa yang suci (bukan najis). Tidak disyaratkan harus jenis batu tertentu. Boleh menggunakan batu yang ditemukan di mana saja, namun dianjurkan mengambilnya di area Muzdalifah.' },
      { title: 'Cara Memperoleh', content: ['Batu kerikil bisa diambil di Muzdalifah saat mabit (bermalam), dan ini adalah yang paling utama. Namun, boleh juga mengambilnya di Mina atau di mana saja di tanah haram, asalkan bukan dari area sekitar jamrah itu sendiri.', 'Dianjurkan untuk mencuci kerikil sebelum digunakan, meskipun ini bukan syarat sah.'] },
    ],
  },
  {
    id: 2,
    slug: 'hikmah-lempar-jamrah',
    title: 'Lempar Jamrah: Hikmah, Kesunnahan, dan Tata Cara',
    summary: 'Menyelami makna di balik lempar jamrah, serta sunnah dan tata cara pelaksanaannya yang benar.',
    content: [
      { title: 'Hikmah Lempar Jamrah', content: ['Melambangkan permusuhan abadi seorang hamba terhadap setan.', 'Meneladani perbuatan Nabi Ibrahim AS ketika beliau diganggu oleh setan saat akan menyembelih putranya, Nabi Ismail AS.', 'Merupakan bentuk dzikir dan pengagungan kepada Allah SWT di tempat-tempat manasik haji.'] },
      { title: 'Kesunnahan dalam Lempar Jamrah', content: ['Bertakbir (mengucapkan \'Allahu Akbar\') setiap kali melempar satu kerikil.', 'Melempar dengan tangan kanan.', 'Berhenti sejenak untuk berdoa setelah melontar Jumrah Ula dan Wustha (pada hari Tasyrik), menghadap kiblat.'] },
      { title: 'Tata Cara', content: ['Melontar Jumrah Aqabah pada 10 Dzulhijjah.', 'Melontar tiga jumrah (Ula, Wustha, Aqabah) pada hari-hari Tasyrik (11, 12, 13 Dzulhijjah).', 'Setiap jumrah dilempar dengan tujuh batu kerikil, satu per satu.'] },
    ],
  },
  {
    id: 3,
    slug: 'sunnah-saat-wukuf',
    title: '5 Hal yang Sunnah Dilakukan saat Wukuf di Arafah',
    summary: 'Mengoptimalkan puncak ibadah haji dengan amalan-amalan sunnah yang dianjurkan saat wukuf.',
    content: [
      { title: '1. Menghadap Kiblat', content: 'Saat berdoa dan berdzikir, dianjurkan untuk menghadap kiblat.' },
      { title: '2. Memperbanyak Doa', content: 'Waktu wukuf adalah waktu mustajab untuk berdoa. Perbanyaklah doa untuk kebaikan dunia dan akhirat. Doa terbaik adalah doa yang diajarkan Nabi: \'Laa ilaaha illallahu wahdahu laa syariika lahu, lahul mulku wa lahul hamdu wa huwa \'ala kulli syai-in qadiir\'.' },
      { title: '3. Memperbanyak Dzikir dan Talbiyah', content: 'Isi waktu wukuf dengan berdzikir, membaca tahlil, tahmid, takbir, dan talbiyah.' },
      { title: '4. Membaca Al-Qur\'an', content: 'Menyibukkan diri dengan membaca dan merenungi ayat-ayat Al-Qur\'an.' },
      { title: '5. Menjama\' dan Meng-qashar Shalat', content: 'Melaksanakan shalat Dzuhur dan Ashar dengan cara dijama\' taqdim dan diqashar di awal waktu Dzuhur.' },
    ],
  },
  {
    id: 4,
    slug: 'mabit-di-muzdalifah',
    title: 'Mabit di Muzdalifah: Menginap, Mampir, atau Lewat?',
    summary: 'Kupas tuntas hukum mabit di Muzdalifah menurut para ulama, apakah harus bermalam suntuk atau ada keringanan.',
    content: [
      { title: 'Hukum Mabit di Muzdalifah', content: 'Mabit di Muzdalifah adalah salah satu wajib haji. Meninggalkannya tanpa uzur syar\'i mengharuskan pembayaran dam (denda).' },
      { title: 'Durasi Mabit', content: ['Menurut mayoritas ulama (Maliki, Syafi\'i, Hambali), kewajiban mabit terpenuhi dengan berada di wilayah Muzdalifah sesaat pada paruh kedua malam (setelah tengah malam), meskipun hanya lewat.', 'Menurut madzhab Hanafi, wajib berada di Muzdalifah pada waktu antara terbit fajar hingga terbit matahari pada tanggal 10 Dzulhijjah.', 'Yang paling utama adalah bermalam di sana hingga shalat Subuh, kemudian berangkat ke Mina setelah matahari mulai terang.'] },
      { title: 'Keringanan', content: 'Bagi jamaah yang memiliki uzur, seperti orang tua, wanita, anak-anak, atau orang sakit, diperbolehkan meninggalkan Muzdalifah setelah tengah malam.' },
    ],
  },
  {
    id: 5,
    slug: 'hukum-meninggalkan-mabit',
    title: 'Hukum Meninggalkan Mabit di Muzdalifah dan Mina karena Uzur',
    summary: 'Penjelasan mengenai hukum bagi jamaah haji yang tidak dapat melaksanakan mabit karena alasan yang dibenarkan syariat.',
    content: [
      { title: 'Definisi Uzur Syar\'i', content: 'Uzur syar\'i adalah halangan yang dibenarkan oleh syariat, seperti sakit keras, merawat orang sakit, menjaga harta yang dikhawatirkan hilang, atau petugas haji yang sibuk melayani jamaah.' },
      { title: 'Hukum Meninggalkan Mabit karena Uzur', content: 'Jika seorang jamaah haji meninggalkan mabit (baik di Muzdalifah maupun di Mina) karena uzur syar\'i, maka ia tidak berdosa dan tidak diwajibkan membayar dam. Kewajiban mabit gugur baginya.' },
      { title: 'Pentingnya Niat', content: 'Meskipun memiliki uzur, niat untuk melaksanakan mabit harus tetap ada di dalam hati. Gugurnya kewajiban bukan berarti meremehkan amalan tersebut.' },
    ],
  },
  {
    id: 6,
    slug: 'solusi-haji-tetap-suci',
    title: 'Solusi agar Ibadah Haji selalu dalam Keadaan Suci',
    summary: 'Tips dan panduan praktis menjaga kesucian (thaharah) selama menjalankan rangkaian ibadah haji yang padat.',
    content: [
      { title: 'Memahami Keringanan (Rukhsah)', content: 'Islam memberikan keringanan seperti tayamum jika sulit menemukan air, atau menjama\' shalat untuk efisiensi waktu.' },
      { title: 'Manajemen Air', content: 'Selalu membawa botol semprot (spray) berisi air untuk berwudhu atau istinja di tempat-tempat yang mungkin sulit air.' },
      { title: 'Menggunakan Alas Kaki Khusus', content: 'Gunakan alas kaki yang mudah dilepas dan dipakai, terutama saat akan berwudhu di tempat umum.' },
      { title: 'Bagi Wanita', content: 'Wanita yang khawatir akan datang haid bisa menggunakan obat penunda haid setelah berkonsultasi dengan dokter, meskipun ini bukan keharusan.' },
      { title: 'Menjaga dari Najis', content: 'Selalu berhati-hati saat menggunakan toilet umum dan pastikan pakaian ihram tetap dalam keadaan suci.' },
    ],
  },
  {
    id: 7,
    slug: 'ihram-wanita-haid',
    title: 'Hukum Niat Ihram dan Miqat bagi Wanita Haid atau Nifas',
    summary: 'Penjelasan fikih mengenai bagaimana wanita yang sedang haid atau nifas melaksanakan niat ihram dari miqat.',
    content: [
      { title: 'Hukum Ihram', content: 'Wanita yang sedang haid atau nifas tetap wajib berniat ihram jika melewati miqat. Ihram adalah niat, dan niat tidak disyaratkan harus dalam keadaan suci.' },
      { title: 'Amalan yang Boleh Dilakukan', content: 'Ia boleh melakukan semua amalan haji seperti wukuf di Arafah, mabit di Muzdalifah dan Mina, serta melempar jamrah. Ia seperti jamaah lainnya, hanya saja tidak boleh shalat dan tawaf di Ka\'bah.' },
      { title: 'Kapan Melakukan Tawaf?', content: 'Ia harus menunggu sampai suci dari haid/nifas untuk melaksanakan rukun haji yaitu Tawaf Ifadhah. Jika haid datang setelah ia melakukan Tawaf Ifadhah, maka hajinya tetap sah.' },
    ],
  },
  {
    id: 8,
    slug: 'badal-haji-lebih-dari-satu',
    title: 'Bolehkah Menjadi Badal Haji Lebih dari Satu Orang?',
    summary: 'Kajian tentang hukum membadalkan (mewakilkan) haji untuk beberapa orang dalam satu kali perjalanan haji.',
    content: [
      { title: 'Prinsip Dasar', content: 'Satu ibadah haji hanya boleh untuk satu orang. Oleh karena itu, seseorang tidak boleh membadalkan haji untuk dua orang atau lebih dalam satu musim haji yang sama.' },
      { title: 'Dalil', content: 'Hal ini didasarkan pada hadits di mana Nabi SAW mendengar seseorang bertalbiyah untuk orang lain bernama Syubrumah setelah untuk dirinya sendiri. Nabi memerintahkannya untuk berhaji bagi dirinya dulu, baru kemudian untuk Syubrumah. Ini menunjukkan satu perjalanan haji hanya untuk satu niat individu.' },
      { title: 'Solusi', content: 'Jika ingin membadalkan haji untuk beberapa orang (misalnya kedua orang tua), maka harus dilakukan pada musim haji yang berbeda. Satu tahun untuk ayah, tahun berikutnya untuk ibu.' },
    ],
  },
  {
    id: 9,
    slug: 'perlu-pindah-mazhab-saat-haji',
    title: 'Apakah Perlu Pindah Mazhab ketika Haji dan Umrah?',
    summary: 'Menjawab kebingungan jamaah mengenai perlukah mengikuti mazhab tertentu saat berada di Tanah Suci.',
    content: [
      { title: 'Tidak Ada Keharusan', content: 'Tidak ada keharusan untuk pindah atau taklid buta pada satu mazhab tertentu saat berhaji. Seorang jamaah boleh tetap berpegang pada mazhab yang dianutnya di negaranya.' },
      { title: 'Mengambil Pendapat Lain (Talfiq)', content: 'Namun, dalam kondisi darurat atau sulit, diperbolehkan mengambil pendapat (rukhsah) dari mazhab lain untuk kemudahan, selama hal itu bukan untuk mencari-cari yang mudah saja. Contoh: dalam masalah bersentuhan kulit dengan lawan jenis yang bukan mahram, banyak jamaah dari mazhab Syafi\'i mengambil pendapat mazhab Hanafi yang tidak membatalkan wudhu.' },
      { title: 'Tujuan Utama', content: 'Tujuannya adalah untuk kelancaran ibadah, bukan untuk memperdebatkan perbedaan pendapat (khilafiyah). Yang terpenting adalah ibadah haji dilaksanakan sesuai syarat dan rukunnya.' },
    ],
  },
  {
    id: 10,
    slug: 'doa-meraih-haji-mabrur',
    title: 'Doa Meraih Haji Mabrur: Tata Cara, Waktu dan Keutamaannya',
    summary: 'Panduan doa-doa kunci, waktu mustajab, dan adab berdoa agar dianugerahi haji yang mabrur.',
    content: [
      { title: 'Doa Paling Utama', content: 'Doa yang paling sering dibaca dan mencakup kebaikan dunia akhirat adalah: \'Rabbanā, ātinā fid-dunyā hasanah, wa fil-ākhirati hasanah, wa qinā \'adzāban-nār\'. Juga perbanyak doa saat wukuf di Arafah.' },
      { title: 'Waktu Mustajab', content: ['Saat Tawaf', 'Di Multazam (antara Hajar Aswad dan pintu Ka\'bah)', 'Di bawah Mizab (pancuran emas Ka\'bah)', 'Di dalam Ka\'bah (jika memungkinkan masuk Hijr Ismail)', 'Saat Sa\'i di Shafa dan Marwah', 'Saat Wukuf di Arafah', 'Saat di Muzdalifah dan Mina', 'Setelah melontar jamrah Ula dan Wustha.'] },
      { title: 'Adab Berdoa', content: 'Ikhlas, menghadap kiblat, mengangkat kedua tangan, memulai dengan memuji Allah dan bershalawat, serta yakin doa akan dikabulkan.' },
    ],
  },
  {
    id: 11,
    slug: 'hindari-ini-agar-haji-mabrur',
    title: 'Hal yang Harus Dihindari Jamaah Haji agar Dapat Predikat Mabrur',
    summary: 'Mengenali perbuatan-perbuatan yang dapat mengurangi bahkan merusak pahala haji.',
    content: [
      { title: 'Rafats (Kata-kata Kotor)', content: 'Menghindari ucapan yang tidak senonoh, berbau syahwat, atau jorok.' },
      { title: 'Fusuq (Kefasikan)', content: 'Menghindari segala bentuk kemaksiatan, seperti berbohong, menggunjing, bertengkar, dan melanggar aturan Allah lainnya.' },
      { title: 'Jidal (Bantah-bantahan)', content: 'Menghindari perdebatan dan pertengkaran sengit yang tidak perlu yang dapat menimbulkan permusuhan.' },
      { title: 'Riya dan Sum\'ah', content: 'Menjaga keikhlasan niat, beribadah hanya karena Allah, bukan untuk pamer atau ingin didengar orang lain.' },
      { title: 'Menyakiti Orang Lain', content: 'Menghindari perbuatan menyakiti sesama jamaah, baik dengan perkataan maupun perbuatan, seperti menyerobot antrean atau mendorong-dorong.' },
    ],
  },
  {
    id: 12,
    slug: 'hukum-badal-haji-lintas-gender',
    title: 'Hukum Laki-Laki Membadalkan Hajinya kepada Perempuan atau Sebaliknya',
    summary: 'Penjelasan fikih mengenai keabsahan badal haji yang dilakukan oleh wakil dengan gender yang berbeda.',
    content: [
      { title: 'Hukumnya Boleh', content: 'Jumhur (mayoritas) ulama memperbolehkan seorang laki-laki membadalkan haji untuk perempuan, dan sebaliknya, seorang perempuan membadalkan haji untuk laki-laki.' },
      { title: 'Syarat Utama', content: 'Syarat utamanya bukanlah kesamaan gender, melainkan orang yang membadalkan (wakil) harus sudah pernah menunaikan haji untuk dirinya sendiri. Ia juga harus seorang Muslim, baligh, dan berakal sehat.' },
      { title: 'Dalil', content: 'Dalil yang digunakan adalah keumuman perintah untuk melaksanakan haji bagi yang mampu, dan badal haji adalah bagian dari perwujudan kemampuan tersebut bagi orang yang berhalangan (misalnya sudah wafat atau sakit keras). Tidak ada dalil yang mensyaratkan kesamaan gender.' },
    ],
  },
  {
    id: 13,
    slug: '5-pesan-imam-ghazali-untuk-jamaah-haji',
    title: '5 Pesan Imam Ghazali pada Umat Islam yang Berangkat Haji',
    summary: 'Nasihat mendalam dari Hujjatul Islam Imam Al-Ghazali untuk para tamu Allah.',
    content: [
      { title: '1. Luruskan Niat', content: 'Pastikan niat berhaji murni karena Allah, bukan karena riya, ingin gelar, atau tujuan duniawi lainnya.' },
      { title: '2. Bertaubat dan Selesaikan Urusan Dunia', content: 'Bertaubat dari segala dosa, mengembalikan hak orang lain (hutang, dll), dan menyiapkan bekal yang halal.' },
      { title: '3. Pelajari Manasik Haji', content: 'Membekali diri dengan ilmu tentang tata cara haji yang benar sebelum berangkat.' },
      { title: '4. Jaga Akhlak', content: 'Bersabar, tidak mengeluh, dan berakhlak mulia selama perjalanan dan pelaksanaan ibadah.' },
      { title: '5. Hayati Setiap Prosesi', content: 'Jangan hanya melakukan gerakan fisik, tetapi resapi makna dan hikmah di balik setiap rukun dan wajib haji untuk mencapai ma\'rifatullah.' },
    ],
  },
  {
    id: 14,
    slug: 'hukum-haji-berkali-kali',
    title: 'Menunaikan Ibadah Haji sampai Berkali-kali, Bagaimana Hukumnya?',
    summary: 'Kajian tentang prioritas dalam beribadah: antara menunaikan haji sunnah berulang kali atau menyedekahkan biayanya.',
    content: [
      { title: 'Hukum Asal', content: 'Haji yang kedua, ketiga, dan seterusnya hukumnya adalah sunnah dan merupakan perbuatan yang baik.' },
      { title: 'Skala Prioritas (Fiqh Aulawiyat)', content: ['Para ulama mengingatkan pentingnya melihat kondisi sekitar. Jika di lingkungan sekitar masih banyak fakir miskin, anak yatim yang terlantar, atau kebutuhan umat yang mendesak (seperti pembangunan sekolah atau rumah sakit), maka menyedekahkan biaya haji sunnah tersebut untuk mereka bisa jadi lebih utama.', 'Abdullah bin Mubarak pernah membatalkan hajinya dan memberikan seluruh bekalnya kepada sebuah keluarga miskin yang kelaparan.'] },
      { title: 'Kesimpulan', content: 'Melaksanakan haji berulang kali adalah baik, tetapi menjadi lebih baik jika seorang Muslim peka terhadap kondisi sosial di sekitarnya dan mampu menempatkan prioritas amalan sesuai dengan yang lebih dibutuhkan oleh umat.' },
    ],
  },
];
