// floor3Data.js - Data & Dialogues for LANTAI 3 (SECTOR SIMULATION CENTER)

export const FLOOR3_DIALOGUES = {
  // Station 01: UNIVERSITAS (Academic Sector)
  station_universitas: [
    {
      speaker: 'UNIVERSITAS',
      text: 'Ketergantungan pada sistem akademik membuat universitas memiliki risiko TI yang perlu dikelola.',
    },
    {
      speaker: 'UNIVERSITAS',
      text: 'Gangguan sistem dapat memengaruhi registrasi, pembelajaran, dan pengelolaan data mahasiswa.',
    },
  ],

  // Station 02: RUMAH SAKIT (Healthcare Sector)
  station_rumahsakit: [
    {
      speaker: 'RUMAH SAKIT',
      text: 'Sistem informasi mendukung akses data dan keberlangsungan pelayanan rumah sakit.',
    },
    {
      speaker: 'RUMAH SAKIT',
      text: 'Risiko TI dapat memengaruhi ketersediaan informasi dan proses pelayanan.',
    },
  ],

  // Station 03: PERBANKAN (Financial Sector)
  station_perbankan: [
    {
      speaker: 'PERBANKAN',
      text: 'Perbankan sangat bergantung pada keandalan sistem transaksi dan informasi.',
    },
    {
      speaker: 'PERBANKAN',
      text: 'Gangguan TI dapat berdampak pada layanan, transaksi, dan kepercayaan nasabah.',
    },
  ],

  // Station 04: E-COMMERCE (Retail / Digital Platform Sector)
  station_ecommerce: [
    {
      speaker: 'E-COMMERCE',
      text: 'Platform e-commerce bergantung pada sistem transaksi, pembayaran, dan pemenuhan pesanan.',
    },
    {
      speaker: 'E-COMMERCE',
      text: 'Gangguan teknologi dapat menghambat operasi bisnis dan pengalaman pelanggan.',
    },
  ],

  // Station 05: PEMERINTAHAN (Public Sector)
  station_pemerintahan: [
    {
      speaker: 'PEMERINTAHAN',
      text: 'Layanan pemerintahan juga bergantung pada informasi dan teknologi.',
    },
    {
      speaker: 'PEMERINTAHAN',
      text: 'Risiko TI dapat memengaruhi pelayanan publik dan pengelolaan informasi.',
    },
  ],

  // NPC 01: Analis Sektor (near Simulation Core)
  sector_analyst: [
    {
      speaker: 'ANALIS SEKTOR',
      text: 'Risiko TI tidak hanya terjadi pada perusahaan teknologi.',
    },
    {
      speaker: 'ANALIS SEKTOR',
      text: 'Setiap organisasi yang bergantung pada informasi dan teknologi memiliki risiko yang perlu dikelola.',
    },
  ],

  // NPC 02: Koordinator Simulasi (near Ruang Simulasi route)
  simulation_coordinator: [
    {
      speaker: 'KOORDINATOR SIMULASI',
      text: 'Dampak risiko dapat berbeda pada setiap sektor.',
    },
    {
      speaker: 'KOORDINATOR SIMULASI',
      text: 'Penerapan pengelolaan risiko perlu menyesuaikan konteks dan tujuan organisasi.',
    },
  ],

  // Sector Simulation Core Console
  simulation_core: [
    {
      speaker: 'SIMULATION CORE',
      text: 'Pusat simulasi menghubungkan berbagai konteks organisasi untuk membandingkan bagaimana risiko TI dapat muncul dan berdampak.',
    },
    {
      speaker: 'SIMULATION CORE',
      text: 'Setiap sektor memiliki karakteristik, ketergantungan teknologi, dan konsekuensi risiko yang berbeda.',
    },
  ],

  // Floor Directory Kiosk
  simulation_directory: [
    {
      speaker: 'DIREKTORI SIMULASI',
      text: 'Simulasi tersedia untuk lima sektor: Universitas, Rumah Sakit, Perbankan, E-Commerce, dan Pemerintahan.',
    },
    {
      speaker: 'DIREKTORI SIMULASI',
      text: 'Pelajari setiap sektor secara opsional sebelum memasuki Ruang Simulasi.',
    },
  ],

  // Ruang Simulasi Pre-Battle Dialogues
  ruang_simulasi_intro: [
    {
      speaker: 'RUANG SIMULASI',
      text: 'Lima sektor sedang menghadapi gangguan teknologi informasi.',
    },
    {
      speaker: 'RUANG SIMULASI',
      text: 'Analisis bagaimana Risk IT dapat diterapkan pada konteks organisasi yang berbeda.',
    },
  ],
};

// Aliases for maximum compatibility across conventions
FLOOR3_DIALOGUES.analis_sektor = FLOOR3_DIALOGUES.sector_analyst;
FLOOR3_DIALOGUES.npc_analis_sektor = FLOOR3_DIALOGUES.sector_analyst;

FLOOR3_DIALOGUES.koordinator_simulasi = FLOOR3_DIALOGUES.simulation_coordinator;
FLOOR3_DIALOGUES.npc_koordinator_simulasi = FLOOR3_DIALOGUES.simulation_coordinator;

FLOOR3_DIALOGUES.prop_simulation_core = FLOOR3_DIALOGUES.simulation_core;
FLOOR3_DIALOGUES.core_simulasi = FLOOR3_DIALOGUES.simulation_core;

FLOOR3_DIALOGUES.floor_directory = FLOOR3_DIALOGUES.simulation_directory;
FLOOR3_DIALOGUES.prop_secsim_directory = FLOOR3_DIALOGUES.simulation_directory;
FLOOR3_DIALOGUES.direktori_simulasi = FLOOR3_DIALOGUES.simulation_directory;

FLOOR3_DIALOGUES.universitas = FLOOR3_DIALOGUES.station_universitas;
FLOOR3_DIALOGUES.rumahsakit = FLOOR3_DIALOGUES.station_rumahsakit;
FLOOR3_DIALOGUES.perbankan = FLOOR3_DIALOGUES.station_perbankan;
FLOOR3_DIALOGUES.ecommerce = FLOOR3_DIALOGUES.station_ecommerce;
FLOOR3_DIALOGUES.pemerintahan = FLOOR3_DIALOGUES.station_pemerintahan;

export const floor3Dialogues = FLOOR3_DIALOGUES;
export default FLOOR3_DIALOGUES;
