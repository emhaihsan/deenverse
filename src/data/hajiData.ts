// src/data/hajiData.ts
import { HajiData } from '../types/haji';

export const hajiData: HajiData = {
  haji: {
    id: 'haji',
    title: 'Panduan Lengkap Ibadah Haji',
    definition: {
      title: 'Definisi Haji',
      content: 'Haji secara bahasa berarti \'menyengaja\' atau \'menuju\'. Secara istilah syar\'i, haji adalah menyengaja menuju Ka\'bah (Baitullah) di Mekkah untuk melaksanakan serangkaian ibadah tertentu, pada waktu yang telah ditentukan (bulan-bulan haji), dengan syarat-syarat yang khusus, demi memenuhi panggilan Allah SWT.',
    },
    history: {
      title: 'Sejarah Singkat Haji',
      content: [
        'Ibadah haji berakar dari zaman Nabi Ibrahim AS. Allah SWT memerintahkan Nabi Ibrahim untuk membangun kembali Ka\'bah bersama putranya, Nabi Ismail AS.',
        'Setelah Ka\'bah berdiri, Allah memerintahkan Nabi Ibrahim untuk menyeru seluruh umat manusia agar datang berziarah (berhaji) ke Baitullah.',
        'Seiring waktu, praktik haji tercampur dengan kemusyrikan hingga diutusnya Nabi Muhammad SAW.',
        'Nabi Muhammad SAW menyucikan kembali ibadah haji sesuai dengan syariat Nabi Ibrahim AS. Beliau melaksanakan haji sekali seumur hidup, yang dikenal sebagai Haji Wada\' (Haji Perpisahan), yang menjadi pedoman pelaksanaan haji bagi umat Islam hingga kini.',
      ],
    },
    wisdom: {
      title: 'Hikmah Ibadah Haji',
      content: [
        'Meningkatkan ketakwaan dan keimanan kepada Allah SWT.',
        'Menghapus dosa-dosa sehingga kembali suci seperti bayi yang baru lahir (untuk haji mabrur).',
        'Mewujudkan persatuan dan kesetaraan umat Islam dari seluruh dunia, tanpa memandang suku, ras, dan status sosial.',
        'Melatih kesabaran, pengorbanan, dan disiplin diri.',
        'Mengenang dan meneladani perjuangan Nabi Ibrahim AS, Siti Hajar, dan Nabi Ismail AS.',
      ],
    },
    virtues: {
      title: 'Keutamaan-Keutamaan Haji',
      content: [
        'Haji adalah salah satu amalan yang paling utama.',
        'Haji yang mabrur (diterima) tidak ada balasan baginya kecuali surga.',
        'Menghapuskan dosa-dosa yang telah lalu.',
        'Merupakan jihad di jalan Allah bagi wanita, orang tua, dan orang yang lemah.',
        'Doa orang yang berhaji dikabulkan oleh Allah SWT.',
      ],
    },
    syaratWajib: {
      title: 'Syarat Wajib Haji',
      content: [
        'Islam: Hanya diwajibkan bagi seorang Muslim.',
        'Baligh: Sudah mencapai usia dewasa.',
        'Aqil (Berakal): Tidak gila atau mengalami gangguan jiwa.',
        'Merdeka: Bukan seorang budak.',
        'Istitha\'ah (Mampu): Mampu secara fisik (kesehatan), finansial (biaya perjalanan, bekal keluarga yang ditinggalkan), dan keamanan (perjalanan yang aman).',
      ],
    },
    hukum: {
      title: 'Hukum Haji',
      content: 'Hukum melaksanakan ibadah haji adalah Fardhu \'Ain, yaitu wajib sekali seumur hidup bagi setiap Muslim yang telah memenuhi syarat wajibnya. Kewajiban ini didasarkan pada Al-Qur\'an (QS. Ali Imran: 97) dan Hadits.',
    },
    perbedaanRukunWajib: {
      title: 'Perbedaan Rukun dan Wajib Haji',
      content: [
        'Rukun Haji: Adalah amalan-amalan inti dalam ibadah haji. Jika salah satu rukun ditinggalkan, maka hajinya tidak sah dan tidak bisa diganti dengan denda (dam). Ia wajib mengulang hajinya di lain kesempatan.',
        'Wajib Haji: Adalah amalan-amalan yang harus dikerjakan dalam ibadah haji. Jika salah satu wajib haji ditinggalkan dengan sengaja atau tanpa uzur, hajinya tetap sah, namun ia wajib membayar denda (dam).',
      ],
    },
    pillars: {
      title: 'Rukun Haji',
      items: [
        { title: 'Ihram', explanation: 'Niat memulai ibadah haji dari miqat (batas waktu dan tempat yang ditentukan) dengan mengenakan pakaian ihram.' },
        { title: 'Wukuf di Arafah', explanation: 'Puncak ibadah haji. Berdiam diri di padang Arafah pada tanggal 9 Dzulhijjah, dari tergelincirnya matahari hingga terbit fajar pada hari berikutnya.' },
        { title: 'Tawaf Ifadhah', explanation: 'Mengelilingi Ka\'bah sebanyak tujuh kali putaran. Tawaf ini merupakan rukun dan penentu sahnya haji.' },
        { title: 'Sa\'i', explanation: 'Berjalan atau berlari-lari kecil antara bukit Shafa dan Marwah sebanyak tujuh kali.' },
        { title: 'Tahallul', explanation: 'Mencukur atau memotong sebagian rambut kepala sebagai tanda telah bebas dari sebagian atau seluruh larangan ihram.' },
        { title: 'Tertib', explanation: 'Melaksanakan rukun-rukun haji secara berurutan sesuai dengan yang telah ditetapkan.' },
      ],
      notes: 'Meninggalkan salah satu rukun ini menyebabkan haji tidak sah.',
    },
    wajib: {
      title: 'Wajib Haji',
      items: [
        { title: 'Ihram dari Miqat', explanation: 'Memulai niat dan mengenakan pakaian ihram dari batas-batas yang telah ditentukan.' },
        { title: 'Mabit (Bermalam) di Muzdalifah', explanation: 'Bermalam di Muzdalifah pada malam tanggal 10 Dzulhijjah setelah wukuf di Arafah.' },
        { title: 'Mabit (Bermalam) di Mina', explanation: 'Bermalam di Mina pada hari-hari Tasyrik (tanggal 11, 12, dan 13 Dzulhijjah).' },
        { title: 'Melontar Jumrah Aqabah', explanation: 'Melontar jumrah Aqabah dengan tujuh batu kerikil pada tanggal 10 Dzulhijjah.' },
        { title: 'Melontar Tiga Jumrah', explanation: 'Melontar jumrah Ula, Wustha, dan Aqabah pada hari-hari Tasyrik.' },
        { title: 'Tawaf Wada\'', explanation: 'Tawaf perpisahan yang dilakukan sebelum meninggalkan kota Mekkah.' },
      ],
      notes: 'Meninggalkan salah satu wajib haji ini hajinya tetap sah, tetapi wajib membayar dam (denda).',
    },
  },
  umroh: {
    id: 'umroh',
    title: 'Panduan Lengkap Ibadah Umroh',
    definition: {
      title: 'Definisi Umroh',
      content: 'Umroh secara bahasa berarti \'berziarah\'. Secara istilah syar\'i, umroh adalah berziarah ke Ka\'bah (Baitullah) di Mekkah untuk melaksanakan serangkaian ibadah tertentu (tawaf, sa\'i, dan tahallul) dengan syarat-syarat yang telah ditentukan.',
    },
    history: {
      title: 'Sejarah Singkat Umroh',
      content: 'Ibadah umroh juga telah disyariatkan sejak zaman Nabi Muhammad SAW. Beliau melaksanakan umroh sebanyak empat kali dalam hidupnya. Berbeda dengan haji yang waktunya ditentukan, umroh dapat dilaksanakan kapan saja sepanjang tahun.',
    },
    wisdom: {
      title: 'Hikmah Ibadah Umroh',
      content: [
        'Sebagai sarana untuk mendekatkan diri kepada Allah SWT.',
        'Menghapus dosa-dosa di antara satu umroh dengan umroh berikutnya.',
        'Menghilangkan kefakiran dan memenuhi kebutuhan.',
        'Menjadi tamu Allah yang doanya akan dikabulkan.',
      ],
    },
    virtues: {
      title: 'Keutamaan-Keutamaan Umroh',
      content: [
        'Satu umroh ke umroh berikutnya adalah penghapus dosa di antara keduanya.',
        'Melaksanakan umroh di bulan Ramadhan pahalanya setara dengan berhaji bersama Nabi Muhammad SAW.',
        'Orang yang melaksanakan umroh adalah tamu Allah; jika mereka berdoa, Allah akan mengabulkannya.',
      ],
    },
    hukum: {
      title: 'Hukum Umroh',
      content: 'Terdapat perbedaan pendapat di kalangan ulama. Jumhur (mayoritas) ulama, seperti Imam Syafi\'i dan Imam Ahmad, berpendapat hukumnya wajib sekali seumur hidup bagi yang mampu. Sementara Imam Malik dan Imam Abu Hanifah berpendapat hukumnya adalah sunnah muakkadah (sunnah yang sangat dianjurkan).',
    },
    pillars: {
      title: 'Rukun Umroh',
      items: [
        { title: 'Ihram', explanation: 'Niat memulai ibadah umroh dari miqat.' },
        { title: 'Tawaf', explanation: 'Mengelilingi Ka\'bah sebanyak tujuh kali putaran.' },
        { title: 'Sa\'i', explanation: 'Berjalan atau berlari-lari kecil antara bukit Shafa dan Marwah sebanyak tujuh kali.' },
        { title: 'Tahallul', explanation: 'Mencukur atau memotong rambut sebagai tanda berakhirnya ibadah umroh.' },
        { title: 'Tertib', explanation: 'Melaksanakan rukun-rukun secara berurutan.' },
      ],
      notes: 'Meninggalkan salah satu rukun ini menyebabkan umroh tidak sah.',
    },
    wajib: {
      title: 'Wajib Umroh',
      items: [
        { title: 'Ihram dari Miqat', explanation: 'Berniat umroh dari batas tempat yang telah ditentukan.' },
        { title: 'Menjauhi Larangan Ihram', explanation: 'Menghindari semua hal yang dilarang selama dalam keadaan ihram hingga tahallul.' },
      ],
      notes: 'Menurut madzhab Syafi\'i, hanya ada satu wajib umroh yaitu Ihram dari Miqat. Rukun dan wajibnya hampir sama. Jika melanggar larangan ihram, wajib membayar dam.',
    },
  },
};
