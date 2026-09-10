// missions.js - Konfigurasi Data 5 Misi Mini Campaign RISK IT BATTLE (Bahasa Indonesia)

import { COMMANDS } from './battleData';

export const MISSIONS = [
  // =========================================================================
  // MISI 01: KENALI FRAMEWORK (Perbedaan Best Practice)
  // =========================================================================
  {
    id: 1,
    number: '01',
    title: 'KENALI FRAMEWORK',
    subtitle: 'Perbedaan Best Practice',
    lecturerQuestion: 'Apa perbedaan dari masing-masing best practice?',
    isFinal: false,
    enemy: {
      name: 'KEBINGUNGAN FRAMEWORK',
      level: 10,
      maxHP: 120,
      spriteKey: 'confusion-framework',
      titleBadge: 'INSIDEN 01: TUMPANG TINDIH PANDUAN',
    },
    backgroundKey: 'framework',
    commandMode: 'grid4',
    introDialogues: [
      'KEBINGUNGAN FRAMEWORK muncul!',
      'Organisasi bingung memilih standar yang tepat untuk kebutuhan mereka.',
      'Bantu organisasi mencocokkan setiap kebutuhan dengan best practice yang sesuai!',
    ],
    turns: [
      {
        turnNumber: 1,
        scenario: 'Sebuah organisasi ingin memperkuat tata kelola dan pengelolaan TI agar selaras dengan tujuan perusahaan.',
        question: 'Framework mana yang paling sesuai?',
        options: [
          { id: 'COBIT', label: 'COBIT' },
          { id: 'RISK_IT', label: 'RISK IT' },
          { id: 'ITIL', label: 'ITIL' },
          { id: 'ISO_27001', label: 'ISO 27001' },
        ],
        correctAction: 'COBIT',
        damage: 20,
        attackEffect: 'framework',
        discoveredFramework: 'COBIT',
        correctDialogues: [
          'Tepat! COBIT berfokus pada tata kelola dan pengelolaan informasi dan teknologi perusahaan.',
          'COBIT membantu menyelaraskan strategi TI dengan sasaran bisnis korporat.',
        ],
        wrongDialogues: [
          'Pilihan kurang tepat untuk tata kelola TI perusahaan secara menyeluruh.',
          'Untuk penyelarasan strategi TI tingkat organisasi, COBIT adalah standar utama.',
        ],
      },
      {
        turnNumber: 2,
        scenario: 'Manajemen ingin memahami dan mengelola risiko TI yang dapat memengaruhi tujuan bisnis.',
        question: 'Framework mana yang paling sesuai?',
        options: [
          { id: 'RISK_IT', label: 'RISK IT' },
          { id: 'ITIL', label: 'ITIL' },
          { id: 'PMI', label: 'PMI' },
          { id: 'CMMI', label: 'CMMI' },
        ],
        correctAction: 'RISK_IT',
        damage: 20,
        attackEffect: 'analysis',
        discoveredFramework: 'RISK_IT',
        correctDialogues: [
          'Tepat! Risk IT berfokus pada risiko yang berkaitan dengan penggunaan TI dan dampaknya terhadap bisnis.',
          'Risk IT memastikan risiko teknologi dinilai dalam konteks kerugian bisnis.',
        ],
        wrongDialogues: [
          'Pilihan tersebut tidak berfokus khusus pada mitigasi risiko bisnis terkait TI.',
          'Risk IT dirancang khusus untuk menghubungkan risiko TI dengan sasaran bisnis.',
        ],
      },
      {
        turnNumber: 3,
        scenario: 'Tim TI ingin meningkatkan pengelolaan layanan, insiden, perubahan, dan kualitas layanan TI.',
        question: 'Framework mana yang paling sesuai?',
        options: [
          { id: 'ITIL', label: 'ITIL' },
          { id: 'COBIT', label: 'COBIT' },
          { id: 'PMI', label: 'PMI' },
          { id: 'CMMI', label: 'CMMI' },
        ],
        correctAction: 'ITIL',
        damage: 20,
        attackEffect: 'framework',
        discoveredFramework: 'ITIL',
        correctDialogues: [
          'Tepat! ITIL berfokus pada manajemen layanan TI (IT Service Management).',
          'ITIL membantu menangani insiden operasional, helpdesk, dan transisi layanan.',
        ],
        wrongDialogues: [
          'Framework tersebut tidak fokus pada siklus hidup operasional layanan TI harian.',
          'ITIL adalah panduan standar internasional untuk manajemen layanan TI.',
        ],
      },
      {
        turnNumber: 4,
        scenario: 'Organisasi ingin membangun sistem manajemen keamanan informasi yang terstruktur.',
        question: 'Framework mana yang paling sesuai?',
        options: [
          { id: 'ISO_27001', label: 'ISO 27001' },
          { id: 'ITIL', label: 'ITIL' },
          { id: 'RISK_IT', label: 'RISK IT' },
          { id: 'PMI', label: 'PMI' },
        ],
        correctAction: 'ISO_27001',
        damage: 20,
        attackEffect: 'control',
        discoveredFramework: 'ISO_27001',
        correctDialogues: [
          'Tepat! ISO 27001 berfokus pada Sistem Manajemen Keamanan Informasi (SMKI).',
          'Standar ini melindungi kerahasiaan, integritas, dan ketersediaan aset data.',
        ],
        wrongDialogues: [
          'Standar tersebut bukan acuan spesifikasi sertifikasi keamanan informasi.',
          'ISO 27001 adalah acuan sertifikasi global untuk sistem keamanan informasi.',
        ],
      },
      {
        turnNumber: 5,
        scenario: 'Perusahaan ingin mengelola proyek secara terstruktur mulai dari perencanaan hingga pengendalian.',
        question: 'Framework mana yang paling sesuai?',
        options: [
          { id: 'PMI', label: 'PMI' },
          { id: 'ITIL', label: 'ITIL' },
          { id: 'CMMI', label: 'CMMI' },
          { id: 'RISK_IT', label: 'RISK IT' },
        ],
        correctAction: 'PMI',
        damage: 20,
        attackEffect: 'framework',
        discoveredFramework: 'PMI',
        correctDialogues: [
          'Tepat! Praktik PMI (PMBOK) digunakan untuk mendukung pengelolaan proyek terstruktur.',
          'PMI memastikan jadwal, anggaran, dan ruang lingkup proyek terkendali.',
        ],
        wrongDialogues: [
          'Pendekatan tersebut lebih ditujukan untuk proses operasional atau tata kelola rutin.',
          'PMI menyediakan standar metodologi manajemen proyek teruji.',
        ],
      },
      {
        turnNumber: 6,
        scenario: 'Organisasi ingin meningkatkan kematangan dan kemampuan proses pengembangan secara berkelanjutan.',
        question: 'Framework mana yang paling sesuai?',
        options: [
          { id: 'CMMI', label: 'CMMI' },
          { id: 'COBIT', label: 'COBIT' },
          { id: 'ITIL', label: 'ITIL' },
          { id: 'ISO_27001', label: 'ISO 27001' },
        ],
        correctAction: 'CMMI',
        damage: 20,
        attackEffect: 'monitor',
        discoveredFramework: 'CMMI',
        correctDialogues: [
          'Tepat! CMMI digunakan untuk meningkatkan kemampuan dan kematangan proses rekayasa sistem.',
          'Tingkat kematangan proses meningkat secara bertahap dari Level 1 hingga Level 5.',
        ],
        wrongDialogues: [
          'Kerangka tersebut tidak fokus pada penilaian tingkat kematangan rekayasa software.',
          'CMMI adalah model acuan kematangan proses pengembangan sistem.',
        ],
      },
    ],
    victoryDialogues: [
      'KEBINGUNGAN FRAMEWORK berhasil diatasi!',
      'Organisasi kini memahami perbedaan fokus dari setiap best practice.',
    ],
    educationalSummary: {
      title: 'PERBEDAAN BEST PRACTICE',
      items: [
        { label: 'COBIT', desc: 'Tata kelola dan pengelolaan TI enterprise.' },
        { label: 'RISK IT', desc: 'Pengelolaan risiko TI terhadap tujuan bisnis.' },
        { label: 'ITIL', desc: 'Manajemen layanan dan operasional TI.' },
        { label: 'ISO 27001', desc: 'Sistem Manajemen Keamanan Informasi (SMKI).' },
        { label: 'PMI', desc: 'Metodologi dan pengelolaan proyek.' },
        { label: 'CMMI', desc: 'Peningkatan kemampuan dan kematangan proses.' },
      ],
      academicNote: null,
    },
  },

  // =========================================================================
  // MISI 02: KEBOCORAN DATA (Penerapan Risk IT)
  // Mempertahankan 100% alur pertarungan orisinal yang sudah bekerja sempurna
  // =========================================================================
  {
    id: 2,
    number: '02',
    title: 'KEBOCORAN DATA',
    subtitle: 'Penerapan Risk IT',
    lecturerQuestion: 'Bagaimana penerapannya?',
    isFinal: false,
    enemy: {
      name: 'KEBOCORAN DATA',
      level: 12,
      maxHP: 100,
      spriteKey: 'data-breach',
      titleBadge: 'INSIDEN 02: AKSES TANPA IZIN',
    },
    backgroundKey: 'databreach',
    commandMode: 'grid4',
    introDialogues: [
      'KEBOCORAN DATA muncul!',
      'ANALIS RISIKO menghadapi insiden keamanan data pelanggan.',
      'Akses mencurigakan telah dibatasi sementara, tetapi risiko terhadap bisnis masih harus dikelola.',
      'Terapkan prinsip Risk IT untuk menilai, menangani, dan memantau risiko tersebut!',
    ],
    turns: [
      {
        turnNumber: 1,
        scenario: 'Akses mencurigakan ke database pelanggan telah dibatasi sementara. Organisasi perlu memulai pengelolaan risiko secara terstruktur.',
        question: 'Apa langkah awal yang paling tepat?',
        options: [
          { id: 'BELI_FIREWALL', label: 'BELI FIREWALL BARU' },
          { id: 'PETAKAN_RISIKO', label: 'PETAKAN ASET & PEMILIK RISIKO' },
          { id: 'TUTUP_LAYANAN', label: 'TUTUP SEMUA LAYANAN' },
          { id: 'ABAIKAN_ANOMALI', label: 'ABAIKAN ANOMALI' },
        ],
        correctAction: 'PETAKAN_RISIKO',
        damage: 20,
        attackEffect: 'IDENTIFIKASI',
        discoveredFramework: 'RISK_IT',
        correctDialogues: [
          'Konteks risiko berhasil ditetapkan!',
          'Organisasi harus memahami aset dan proses bisnis yang terdampak serta menentukan pihak yang bertanggung jawab sebagai pemilik risiko.',
        ],
        wrongDialogues: [
          'Tindakan tersebut belum menetapkan konteks risiko.',
          'Petakan dahulu aset, proses bisnis, dan pemilik risiko agar penanganannya memiliki arah dan tanggung jawab yang jelas.',
        ],
      },
      {
        turnNumber: 2,
        scenario: 'Database yang terdampak berisi identitas dan informasi transaksi pelanggan. Sumber ancaman dan aset terdampak telah diketahui.',
        question: 'Bagaimana organisasi menentukan tingkat risikonya?',
        options: [
          { id: 'NILAI_RISIKO', label: 'NILAI KEMUNGKINAN & DAMPAK' },
          { id: 'UMUMKAN_INSIDEN', label: 'UMUMKAN INSIDEN LANGSUNG' },
          { id: 'TERIMA_RISIKO', label: 'TERIMA TANPA ANALISIS' },
          { id: 'GANTI_SISTEM', label: 'GANTI SELURUH SISTEM' },
        ],
        correctAction: 'NILAI_RISIKO',
        damage: 25,
        attackEffect: 'PENILAIAN',
        discoveredFramework: 'RISK_IT',
        correctDialogues: [
          'Tingkat risiko berhasil dinilai!',
          'Nilai kemungkinan kejadian dan dampaknya terhadap operasional, keuangan, reputasi, serta tujuan bisnis, lalu bandingkan dengan batas toleransi risiko organisasi.',
        ],
        wrongDialogues: [
          'Keputusan belum didasarkan pada tingkat risiko.',
          'Organisasi perlu menilai kemungkinan dan dampak bisnis sebelum menentukan prioritas serta respons yang sesuai.',
        ],
      },
      {
        turnNumber: 3,
        scenario: 'Hasil penilaian menunjukkan bahwa kebocoran data dapat menyebabkan kerugian finansial dan merusak reputasi. Risikonya melebihi batas toleransi organisasi.',
        question: 'Apa tindakan selanjutnya yang paling tepat?',
        options: [
          { id: 'ABAIKAN_INSIDEN', label: 'ABAIKAN INSIDEN' },
          { id: 'TUTUP_PERMANEN', label: 'TUTUP LAYANAN PERMANEN' },
          { id: 'TERAPKAN_KONTROL', label: 'TERAPKAN RESPONS & KONTROL' },
          { id: 'SERAHKAN_VENDOR', label: 'SERAHKAN KEPADA VENDOR' },
        ],
        correctAction: 'TERAPKAN_KONTROL',
        damage: 35,
        attackEffect: 'PENANGANAN',
        discoveredFramework: 'RISK_IT',
        correctDialogues: [
          'Respons risiko berhasil diterapkan!',
          'Karena risiko melebihi batas toleransi, organisasi perlu menerapkan kontrol, menetapkan penanggung jawab, dan menentukan target penyelesaiannya.',
        ],
        wrongDialogues: [
          'Respons tersebut tidak sesuai dengan tingkat risiko yang tinggi.',
          'Organisasi harus menerapkan respons dan kontrol yang terukur karena risiko telah melebihi batas toleransinya.',
        ],
      },
      {
        turnNumber: 4,
        scenario: 'Akses ilegal telah dihentikan, kredensial telah diganti, dan kontrol keamanan tambahan sudah diterapkan.',
        question: 'Bagaimana organisasi memastikan penanganannya efektif?',
        options: [
          { id: 'HENTIKAN_EVALUASI', label: 'HENTIKAN EVALUASI' },
          { id: 'PANTAU_RISIKO', label: 'PANTAU KRI & RISIKO RESIDUAL' },
          { id: 'HAPUS_CATATAN', label: 'HAPUS CATATAN INSIDEN' },
          { id: 'RISIKO_SELESAI', label: 'ANGGAP RISIKO SELESAI' },
        ],
        correctAction: 'PANTAU_RISIKO',
        damage: 20, // Mengurangi sisa 20 HP hingga 0 HP
        attackEffect: 'PEMANTAUAN',
        discoveredFramework: 'RISK_IT',
        correctDialogues: [
          'Pemantauan risiko dimulai!',
          'Pantau indikator risiko utama (KRI), efektivitas kontrol, dan risiko residual, lalu laporkan hasilnya kepada manajemen.',
        ],
        wrongDialogues: [
          'Risiko belum otomatis selesai setelah kontrol diterapkan.',
          'Pemantauan KRI dan risiko residual diperlukan untuk memastikan kontrol tetap efektif dan mendukung pelaporan kepada manajemen.',
        ],
      },
    ],
    victoryDialogues: [
      'KEBOCORAN DATA berhasil dimitigasi!',
      'ANALIS RISIKO berhasil menerapkan Risk IT untuk mengelola dampak risiko terhadap bisnis.',
    ],
    educationalSummary: {
      title: 'PENERAPAN RISK IT PADA KEBOCORAN DATA',
      items: [
        { label: 'KONTEKS & KEPEMILIKAN', desc: 'Memetakan aset, proses bisnis, pihak terdampak, dan pemilik risiko.' },
        { label: 'PENILAIAN BISNIS', desc: 'Menilai kemungkinan dan dampak, lalu membandingkannya dengan toleransi risiko.' },
        { label: 'RESPONS & KONTROL', desc: 'Menentukan respons, kontrol, penanggung jawab, dan target penyelesaian.' },
        { label: 'PEMANTAUAN & PELAPORAN', desc: 'Memantau KRI, efektivitas kontrol, dan risiko residual, lalu melaporkannya kepada manajemen.' },
      ],
      academicNote: {
        title: 'Kesimpulan Penerapan Risk IT:',
        body: 'Risk IT membantu organisasi menghubungkan risiko teknologi dengan tujuan bisnis melalui tata kelola, penilaian, respons, pemantauan, dan pelaporan risiko. Alur dalam misi ini disederhanakan agar mudah dipahami melalui gameplay.',
      },
    },
  },

  // =========================================================================
  // MISI 03: KRISIS SEKTOR (Penerapan di Berbagai Organisasi)
  // =========================================================================
  {
    id: 3,
    number: '03',
    title: 'KRISIS SEKTOR',
    subtitle: 'Penerapan di Berbagai Organisasi',
    lecturerQuestion: 'Dapat diterapkan di mana saja?',
    isFinal: false,
    enemy: {
      name: 'RISIKO SEKTOR',
      level: 16,
      maxHP: 100,
      spriteKey: 'sector-risk',
      titleBadge: 'INSIDEN 03: GANGGUAN MULTI-INDUSTRI',
    },
    backgroundKey: 'sector',
    commandMode: 'grid4',
    introDialogues: [
      'RISIKO SEKTOR muncul!',
      'Risiko TI berdampak pada berbagai jenis organisasi dari universitas hingga instansi pemerintahan.',
      'Kendalikan dampak bisnis utama pada setiap sektor yang terdampak!',
    ],
    turns: [
      {
        turnNumber: 1,
        environmentLabel: 'UNIVERSITAS',
        scenario: 'Sistem KRS tidak dapat diakses ketika ribuan mahasiswa melakukan pengisian secara bersamaan.',
        question: 'Dampak bisnis utama yang harus menjadi perhatian?',
        options: [
          { id: 'OPERASIONAL', label: 'OPERASIONAL' },
          { id: 'KEUANGAN', label: 'KEUANGAN' },
          { id: 'REPUTASI', label: 'REPUTASI' },
          { id: 'VENDOR', label: 'VENDOR' },
        ],
        correctAction: 'OPERASIONAL',
        damage: 20,
        attackEffect: 'control',
        discoveredFramework: 'RISK_IT',
        correctDialogues: [
          'Tepat! Gangguan sistem dapat menghentikan proses akademik dan layanan kepada mahasiswa.',
          'Pada perguruan tinggi, kelancaran operasional akademik adalah prioritas langsung.',
        ],
        wrongDialogues: [
          'Dampak tersebut bukan merupakan dampak langsung yang menghentikan kegiatan mahasiswa saat KRS.',
          'Dampak operasional akademik adalah perhatian paling mendesak.',
        ],
      },
      {
        turnNumber: 2,
        environmentLabel: 'RUMAH SAKIT',
        scenario: 'Sistem rekam medis elektronik tidak dapat diakses ketika pelayanan pasien berlangsung.',
        question: 'Dampak utama yang paling kritis?',
        options: [
          { id: 'LAYANAN', label: 'LAYANAN' },
          { id: 'PEMASARAN', label: 'PEMASARAN' },
          { id: 'PROYEK', label: 'PROYEK' },
          { id: 'PENGADAAN', label: 'PENGADAAN' },
        ],
        correctAction: 'LAYANAN',
        damage: 20,
        attackEffect: 'control',
        discoveredFramework: 'RISK_IT',
        correctDialogues: [
          'Tepat! Risiko TI dapat memengaruhi kontinuitas dan kualitas pelayanan keselamatan pasien.',
          'Pada sektor kesehatan, terhentinya layanan medis membawa risiko terhadap nyawa dan penanganan pasien.',
        ],
        wrongDialogues: [
          'Pada rumah sakit, penundaan tindakan pasien akibat hilangnya data rekam medis adalah isu layanan vital.',
          'Kelangsungan layanan medis pasien adalah dampak paling kritis.',
        ],
      },
      {
        turnNumber: 3,
        environmentLabel: 'PERBANKAN',
        scenario: 'Terjadi transaksi tidak sah pada layanan perbankan digital nasabah.',
        question: 'Dampak utama yang harus segera dikendalikan?',
        options: [
          { id: 'KEUANGAN', label: 'KEUANGAN' },
          { id: 'DESAIN', label: 'DESAIN' },
          { id: 'SDM', label: 'SDM' },
          { id: 'LOGISTIK', label: 'LOGISTIK' },
        ],
        correctAction: 'KEUANGAN',
        damage: 20,
        attackEffect: 'analysis',
        discoveredFramework: 'RISK_IT',
        correctDialogues: [
          'Tepat! Risiko TI dapat menimbulkan kerugian finansial langsung dan merusak kepercayaan nasabah.',
          'Sektor perbankan sangat sensitif terhadap risiko integritas transaksi dan kerugian dana.',
        ],
        wrongDialogues: [
          'Isu transaksi ilegal berkaitan langsung dengan kerugian saldo dan keuangan.',
          'Kerugian finansial dan kepatuhan perbankan adalah dampak utama.',
        ],
      },
      {
        turnNumber: 4,
        environmentLabel: 'E-COMMERCE',
        scenario: 'Data pribadi jutaan pelanggan berpotensi terekspos akibat celah keamanan sistem pembayaran.',
        question: 'Risiko utama yang dihadapi?',
        options: [
          { id: 'KEAMANAN_DATA', label: 'KEAMANAN DATA' },
          { id: 'PRODUKSI', label: 'PRODUKSI' },
          { id: 'GEDUNG', label: 'GEDUNG' },
          { id: 'TRANSPORTASI', label: 'TRANSPORTASI' },
        ],
        correctAction: 'KEAMANAN_DATA',
        damage: 20,
        attackEffect: 'control',
        discoveredFramework: 'RISK_IT',
        correctDialogues: [
          'Tepat! Risiko TI mencakup perlindungan informasi dan dampaknya terhadap pelanggan serta bisnis.',
          'Kebocoran data di e-commerce memicu tuntutan hukum, denda regulasi, dan hilangnya kepercayaan pengguna.',
        ],
        wrongDialogues: [
          'Celah sistem pada data pelanggan berkaitan langsung dengan risiko keamanan informasi.',
          'Keamanan data pelanggan adalah risiko paling signifikan bagi e-commerce.',
        ],
      },
      {
        turnNumber: 5,
        environmentLabel: 'PEMERINTAHAN',
        scenario: 'Layanan publik digital mengalami gangguan sehingga masyarakat tidak dapat mengurus perizinan.',
        question: 'Dampak utama yang terjadi?',
        options: [
          { id: 'LAYANAN_PUBLIK', label: 'LAYANAN PUBLIK' },
          { id: 'PENJUALAN', label: 'PENJUALAN' },
          { id: 'PRODUKSI', label: 'PRODUKSI' },
          { id: 'INVENTARIS', label: 'INVENTARIS' },
        ],
        correctAction: 'LAYANAN_PUBLIK',
        damage: 20,
        attackEffect: 'monitor',
        discoveredFramework: 'RISK_IT',
        correctDialogues: [
          'Tepat! Pengelolaan risiko TI sangat penting dalam menjaga kontinuitas layanan publik kepada masyarakat.',
          'Pemerintahan berbasis elektronik (SPBE) harus memastikan layanan warga tetap berjalan andal.',
        ],
        wrongDialogues: [
          'Instansi pemerintah tidak berfokus pada penjualan produk melainkan pelayanan publik.',
          'Kontinuitas layanan publik adalah esensi tata kelola TI pemerintahan.',
        ],
      },
    ],
    victoryDialogues: [
      'RISIKO SEKTOR berhasil dikendalikan!',
      'Terbukti bahwa Risk IT dapat diterapkan di berbagai bidang industri.',
    ],
    educationalSummary: {
      title: 'PENERAPAN DI BERBAGAI ORGANISASI',
      items: [
        { label: 'Universitas', desc: 'Menjaga kelancaran sistem akademik dan pendaftaran mahasiswa.' },
        { label: 'Rumah Sakit', desc: 'Menjamin ketersediaan rekam medis elektronik demi keselamatan pasien.' },
        { label: 'Perbankan', desc: 'Melindungi transaksi keuangan nasabah dan stabilitas sistem pembayaran.' },
        { label: 'E-Commerce', desc: 'Mengamankan data pribadi pelanggan dan keandalan platform belanja.' },
        { label: 'Pemerintahan', desc: 'Memastikan kontinuitas layanan publik digital bagi masyarakat.' },
      ],
      academicNote: {
        title: 'Kesimpulan:',
        body: 'Risk IT tidak terbatas pada satu industri tertentu. Setiap organisasi yang bergantung pada teknologi informasi memiliki risiko yang perlu dikelola agar tujuan operasional dan strategisnya tercapai.',
      },
    },
  },

  // =========================================================================
  // MISI 04: TRADE-OFF RISK IT (Keunggulan & Keterbatasan)
  // Mode Menu 2 Perintah: KEUNGGULAN vs KETERBATASAN
  // =========================================================================
  {
    id: 4,
    number: '04',
    title: 'TRADE-OFF RISK IT',
    subtitle: 'Keunggulan & Keterbatasan',
    lecturerQuestion: 'Apa keunggulan dan kelemahannya?',
    isFinal: false,
    enemy: {
      name: 'BEBAN KOMPLEKSITAS',
      level: 20,
      maxHP: 120,
      spriteKey: 'complexity',
      titleBadge: 'INSIDEN 04: BIROKRASI & KOMPLEKSITAS',
    },
    backgroundKey: 'complexity',
    commandMode: 'twoChoice',
    customCommands: [
      { id: 'KEUNGGULAN', label: 'KEUNGGULAN' },
      { id: 'KETERBATASAN', label: 'KETERBATASAN' },
    ],
    introDialogues: [
      'BEBAN KOMPLEKSITAS muncul!',
      'Setiap best practice memiliki kekuatan dan tantangan implementasi.',
      'Evaluasi setiap pernyataan: apakah merupakan KEUNGGULAN atau KETERBATASAN Risk IT!',
    ],
    turns: [
      {
        turnNumber: 1,
        scenario: 'Risk IT membantu organisasi menghubungkan pengelolaan risiko TI dengan tujuan bisnis.',
        question: 'Apakah pernyataan di atas merupakan keunggulan atau keterbatasan?',
        options: [
          { id: 'KEUNGGULAN', label: 'KEUNGGULAN' },
          { id: 'KETERBATASAN', label: 'KETERBATASAN' },
        ],
        correctAction: 'KEUNGGULAN',
        damage: 20,
        attackEffect: 'analysis',
        discoveredFramework: 'RISK_IT',
        correctDialogues: [
          'Tepat! Risk IT membantu melihat risiko TI dalam konteks dampaknya terhadap bisnis, bukan sekadar masalah teknis.',
        ],
        wrongDialogues: [
          'Penyelarasan risiko TI dengan tujuan bisnis merupakan salah satu keunggulan terbesar Risk IT.',
        ],
      },
      {
        turnNumber: 2,
        scenario: 'Risk IT membantu manajemen memahami dan memprioritaskan risiko TI.',
        question: 'Apakah pernyataan di atas merupakan keunggulan atau keterbatasan?',
        options: [
          { id: 'KEUNGGULAN', label: 'KEUNGGULAN' },
          { id: 'KETERBATASAN', label: 'KETERBATASAN' },
        ],
        correctAction: 'KEUNGGULAN',
        damage: 20,
        attackEffect: 'analysis',
        discoveredFramework: 'RISK_IT',
        correctDialogues: [
          'Tepat! Visibilitas dan panduan prioritas risiko merupakan keunggulan bagi pimpinan organisasi.',
        ],
        wrongDialogues: [
          'Kemampuan memprioritaskan risiko merupakan keunggulan utama dalam alokasi sumber daya.',
        ],
      },
      {
        turnNumber: 3,
        scenario: 'Risk IT mendukung pengambilan keputusan berdasarkan tingkat risiko.',
        question: 'Apakah pernyataan di atas merupakan keunggulan atau keterbatasan?',
        options: [
          { id: 'KEUNGGULAN', label: 'KEUNGGULAN' },
          { id: 'KETERBATASAN', label: 'KETERBATASAN' },
        ],
        correctAction: 'KEUNGGULAN',
        damage: 20,
        attackEffect: 'analysis',
        discoveredFramework: 'RISK_IT',
        correctDialogues: [
          'Tepat! Keputusan investasi dan mitigasi menjadi lebih rasional berdasarkan profil risiko bisnis.',
        ],
        wrongDialogues: [
          'Dukungan pengambilan keputusan berbasis risiko adalah keunggulan strategis Risk IT.',
        ],
      },
      {
        turnNumber: 4,
        scenario: 'Penerapan Risk IT membutuhkan pemahaman dan kompetensi manajemen risiko yang memadai.',
        question: 'Apakah pernyataan di atas merupakan keunggulan atau keterbatasan?',
        options: [
          { id: 'KEUNGGULAN', label: 'KEUNGGULAN' },
          { id: 'KETERBATASAN', label: 'KETERBATASAN' },
        ],
        correctAction: 'KETERBATASAN',
        damage: 20,
        attackEffect: 'control',
        discoveredFramework: 'RISK_IT',
        correctDialogues: [
          'Tepat! Ini adalah keterbatasan / tantangan karena organisasi harus menginvestasikan waktu dan biaya pelatihan SDM.',
        ],
        wrongDialogues: [
          'Kebutuhan kompetensi khusus merupakan keterbatasan/syarat awal yang menantang bagi organisasi pemula.',
        ],
      },
      {
        turnNumber: 5,
        scenario: 'Penerapan yang matang dapat memerlukan koordinasi lintas bagian dan komitmen manajemen.',
        question: 'Apakah pernyataan di atas merupakan keunggulan atau keterbatasan?',
        options: [
          { id: 'KEUNGGULAN', label: 'KEUNGGULAN' },
          { id: 'KETERBATASAN', label: 'KETERBATASAN' },
        ],
        correctAction: 'KETERBATASAN',
        damage: 20,
        attackEffect: 'control',
        discoveredFramework: 'RISK_IT',
        correctDialogues: [
          'Tepat! Jika manajemen kurang berkomitmen atau terjadi silo komunikasi antar divisi, implementasi dapat terhambat.',
        ],
        wrongDialogues: [
          'Kebutuhan koordinasi yang intensif antar departemen adalah salah satu tantangan penerapan.',
        ],
      },
      {
        turnNumber: 6,
        scenario: 'Implementasi dapat membutuhkan waktu dan sumber daya, terutama pada organisasi yang proses risikonya belum matang.',
        question: 'Apakah pernyataan di atas merupakan keunggulan atau keterbatasan?',
        options: [
          { id: 'KEUNGGULAN', label: 'KEUNGGULAN' },
          { id: 'KETERBATASAN', label: 'KETERBATASAN' },
        ],
        correctAction: 'KETERBATASAN',
        damage: 20,
        attackEffect: 'control',
        discoveredFramework: 'RISK_IT',
        correctDialogues: [
          'Tepat! Membangun proses manajemen risiko yang matang memerlukan waktu bertahap dan alokasi sumber daya memadai.',
        ],
        wrongDialogues: [
          'Kebutuhan waktu dan sumber daya implementasi adalah keterbatasan praktis yang perlu diantisipasi.',
        ],
      },
    ],
    victoryDialogues: [
      'BEBAN KOMPLEKSITAS berhasil diatasi!',
      'Pemain berhasil memahami sisi keunggulan sekaligus tantangan penerapan Risk IT.',
    ],
    educationalSummary: {
      title: 'KEUNGGULAN & KETERBATASAN RISK IT',
      items: [
        { label: 'Keunggulan', desc: 'Selaras dengan tujuan bisnis korporat.' },
        { label: 'Keunggulan', desc: 'Membantu penentuan prioritas risiko secara terukur.' },
        { label: 'Keunggulan', desc: 'Mendukung pengambilan keputusan berbasis tingkat toleransi risiko.' },
        { label: 'Keunggulan', desc: 'Memberikan visibilitas holistik terhadap risiko TI.' },
        { label: 'Tantangan', desc: 'Membutuhkan kompetensi dan pemahaman manajemen risiko.' },
        { label: 'Tantangan', desc: 'Memerlukan koordinasi lintas departemen dan dukungan manajemen.' },
        { label: 'Tantangan', desc: 'Implementasi membutuhkan waktu dan sumber daya bertahap.' },
      ],
      academicNote: {
        title: 'Prinsip Evaluasi:',
        body: 'Keterbatasan di atas bukanlah kelemahan mutlak, melainkan faktor pemungkin (enablers) dan prasyarat yang harus dipersiapkan organisasi agar Risk IT dapat berjalan efektif.',
      },
    },
  },

  // =========================================================================
  // MISI 05: KRISIS SISTEM (Final Boss - Best Practice Terbaik?)
  // =========================================================================
  {
    id: 5,
    number: '05',
    title: 'KRISIS SISTEM',
    subtitle: 'Pilih Best Practice yang Tepat',
    lecturerQuestion: 'Best practice terbaik?',
    isFinal: true,
    enemy: {
      name: 'KRISIS SISTEM',
      level: 30,
      maxHP: 120,
      spriteKey: 'system-crisis',
      titleBadge: 'FINAL BOSS: ANOMALI MULTI-DIMENSI',
    },
    backgroundKey: 'crisis',
    commandMode: 'grid4',
    introDialogues: [
      'KRISIS SISTEM muncul!',
      'Berbagai masalah TI terjadi secara bersamaan di seluruh organisasi.',
      'Tidak semua masalah dapat diselesaikan dengan pendekatan yang sama.',
      'Buktikan bahwa kamu dapat memilih best practice yang tepat untuk setiap krisis!',
    ],
    turns: [
      {
        turnNumber: 1,
        scenario: 'Manajemen membutuhkan kerangka tata kelola dan pengelolaan TI pada tingkat organisasi.',
        question: 'Best practice mana yang paling sesuai?',
        options: [
          { id: 'COBIT', label: 'COBIT' },
          { id: 'RISK_IT', label: 'RISK IT' },
          { id: 'ITIL', label: 'ITIL' },
          { id: 'ISO_27001', label: 'ISO 27001' },
        ],
        correctAction: 'COBIT',
        damage: 20,
        attackEffect: 'framework',
        discoveredFramework: 'COBIT',
        correctDialogues: [
          'Serangan berhasil! COBIT menangani tata kelola TI tingkat enterprise dan penyelarasan strategi bisnis.',
        ],
        wrongDialogues: [
          'Untuk tata kelola TI menyeluruh pada tingkat dewan dan manajemen puncak, COBIT adalah yang paling tepat.',
        ],
      },
      {
        turnNumber: 2,
        scenario: 'Layanan TI sering mengalami gangguan dan proses pengelolaan layanan perlu diperbaiki.',
        question: 'Best practice mana yang paling sesuai?',
        options: [
          { id: 'ITIL', label: 'ITIL' },
          { id: 'COBIT', label: 'COBIT' },
          { id: 'PMI', label: 'PMI' },
          { id: 'CMMI', label: 'CMMI' },
        ],
        correctAction: 'ITIL',
        damage: 20,
        attackEffect: 'framework',
        discoveredFramework: 'ITIL',
        correctDialogues: [
          'Serangan berhasil! ITIL berfokus pada manajemen insiden, problem, dan peningkatan kualitas layanan TI.',
        ],
        wrongDialogues: [
          'ITIL adalah standar utama untuk pemulihan stabilitas dan manajemen operasional layanan TI.',
        ],
      },
      {
        turnNumber: 3,
        scenario: 'Organisasi membutuhkan sistem manajemen keamanan informasi yang terstruktur dan terstandarisasi.',
        question: 'Best practice mana yang paling sesuai?',
        options: [
          { id: 'ISO_27001', label: 'ISO 27001' },
          { id: 'RISK_IT', label: 'RISK IT' },
          { id: 'ITIL', label: 'ITIL' },
          { id: 'PMI', label: 'PMI' },
        ],
        correctAction: 'ISO_27001',
        damage: 20,
        attackEffect: 'control',
        discoveredFramework: 'ISO_27001',
        correctDialogues: [
          'Serangan berhasil! ISO 27001 adalah acuan sertifikasi dan standar internasional keamanan informasi.',
        ],
        wrongDialogues: [
          'ISO 27001 adalah kerangka spesifik untuk Sistem Manajemen Keamanan Informasi (SMKI).',
        ],
      },
      {
        turnNumber: 4,
        scenario: 'Proyek implementasi sistem baru sering terlambat dan sulit dikendalikan anggarannya.',
        question: 'Best practice mana yang paling sesuai?',
        options: [
          { id: 'PMI', label: 'PMI' },
          { id: 'ITIL', label: 'ITIL' },
          { id: 'RISK_IT', label: 'RISK IT' },
          { id: 'ISO_27001', label: 'ISO 27001' },
        ],
        correctAction: 'PMI',
        damage: 20,
        attackEffect: 'framework',
        discoveredFramework: 'PMI',
        correctDialogues: [
          'Serangan berhasil! Standar PMI mengendalikan ruang lingkup, jadwal, dan deliverables proyek teknologi.',
        ],
        wrongDialogues: [
          'Metodologi PMI (PMBOK) dirancang khusus untuk memandu manajemen proyek terstruktur.',
        ],
      },
      {
        turnNumber: 5,
        scenario: 'Organisasi ingin meningkatkan kemampuan dan kematangan proses pengembangan sistem secara terukur.',
        question: 'Best practice mana yang paling sesuai?',
        options: [
          { id: 'CMMI', label: 'CMMI' },
          { id: 'COBIT', label: 'COBIT' },
          { id: 'ITIL', label: 'ITIL' },
          { id: 'PMI', label: 'PMI' },
        ],
        correctAction: 'CMMI',
        damage: 20,
        attackEffect: 'monitor',
        discoveredFramework: 'CMMI',
        correctDialogues: [
          'Serangan berhasil! CMMI mengukur dan meningkatkan tingkat kematangan proses rekayasa software.',
        ],
        wrongDialogues: [
          'CMMI adalah model peningkatan kapabilitas proses rekayasa dan pengembangan sistem.',
        ],
      },
      {
        turnNumber: 6,
        scenario: 'Manajemen ingin memahami risiko terkait TI dan memastikan risiko tersebut dikelola sesuai tujuan bisnis.',
        question: 'Best practice mana yang paling sesuai untuk konteks ini?',
        options: [
          { id: 'RISK_IT', label: 'RISK IT' },
          { id: 'ITIL', label: 'ITIL' },
          { id: 'PMI', label: 'PMI' },
          { id: 'ISO_27001', label: 'ISO 27001' },
        ],
        correctAction: 'RISK_IT',
        damage: 20,
        attackEffect: 'IDENTIFIKASI',
        discoveredFramework: 'RISK_IT',
        correctDialogues: [
          'SERANGAN PEMUNGKAS! Risk IT menghubungkan risiko teknologi langsung dengan tujuan dan nilai bisnis!',
          'Krisis sistem berhasil dinetralisir dengan pendekatan yang tepat sasaran!',
        ],
        wrongDialogues: [
          'Untuk mengelola risiko TI dalam kaitannya dengan pencapaian tujuan bisnis, Risk IT adalah pilihan paling tepat!',
        ],
      },
    ],
    victoryDialogues: [
      'KRISIS SISTEM berhasil diatasi!',
      'Tidak ada satu best practice yang selalu terbaik untuk seluruh kebutuhan.',
      'Pemilihan best practice harus disesuaikan dengan tujuan dan masalah organisasi.',
      'Untuk pengelolaan risiko TI yang berdampak pada tujuan bisnis, RISK IT merupakan pendekatan yang paling sesuai.',
    ],
    educationalSummary: {
      title: 'KESIMPULAN: BEST PRACTICE TERBAIK?',
      items: [
        { label: 'Prinsip 1', desc: 'Tidak ada satu best practice tunggal yang "terbaik" untuk seluruh kebutuhan organisasi.' },
        { label: 'Prinsip 2', desc: 'Setiap framework memiliki fokus spesifik (Tata Kelola, Layanan, Keamanan, Proyek, Proses, atau Risiko).' },
        { label: 'Prinsip 3', desc: 'Pemilihan best practice harus diselaraskan dengan masalah nyata dan sasaran strategis yang ingin dicapai.' },
        { label: 'Prinsip 4', desc: 'Untuk pengelolaan risiko TI yang berkaitan langsung dengan tujuan bisnis, RISK IT adalah pendekatan yang paling tepat.' },
      ],
      academicNote: {
        title: 'Menjawab Pertanyaan 5 Dosen:',
        body: 'Best practice terbaik adalah best practice yang paling sesuai (fit-for-purpose) dengan konteks dan kebutuhan spesifik organisasi pada saat itu, seringkali diterapkan secara saling melengkapi (komplementer).',
      },
    },
  },
];

export function getMissionById(id) {
  return MISSIONS.find((m) => m.id === Number(id)) || MISSIONS[0];
}
