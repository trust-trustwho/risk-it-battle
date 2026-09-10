// battleData.js - Konfigurasi data pertarungan & materi edukasi Manajemen Risiko TI (Bahasa Indonesia)

export const COMMANDS = {
  IDENTIFIKASI: 'IDENTIFIKASI',
  PENILAIAN: 'PENILAIAN',
  PENANGANAN: 'PENANGANAN',
  PEMANTAUAN: 'PEMANTAUAN',
};

export const COMMAND_LIST = [
  { id: COMMANDS.IDENTIFIKASI, label: 'IDENTIFIKASI', row: 0, col: 0 },
  { id: COMMANDS.PENILAIAN, label: 'PENILAIAN', row: 0, col: 1 },
  { id: COMMANDS.PENANGANAN, label: 'PENANGANAN', row: 1, col: 0 },
  { id: COMMANDS.PEMANTAUAN, label: 'PEMANTAUAN', row: 1, col: 1 },
];

export const INITIAL_PLAYER = {
  name: 'ANALIS RISIKO',
  maxHP: 100,
  initialHP: 100,
};

export const INITIAL_ENEMY = {
  name: 'KEBOCORAN DATA',
  level: 12,
  maxHP: 100,
  initialHP: 100,
};

export const BATTLE_INTRO_DIALOGUES = [
  'KEBOCORAN DATA muncul!',
  'ANALIS RISIKO menghadapi insiden!',
  'Organisasi mendeteksi sebuah insiden keamanan TI.',
  'Apa yang akan dilakukan ANALIS RISIKO?',
];

export const BATTLE_TURNS = [
  {
    turnNumber: 1,
    correctAction: COMMANDS.IDENTIFIKASI,
    damage: 20,
    scenario: 'Terdeteksi kemungkinan kebocoran informasi pelanggan.',
    question: 'Apa yang harus dilakukan terlebih dahulu?',
    correctDialogues: [
      'Risiko berhasil diidentifikasi!',
      'Tim menentukan kejadian yang terjadi, aset yang terdampak, sumber ancaman, dan potensi dampaknya terhadap bisnis.',
    ],
    wrongDialogues: [
      'Tindakan tersebut masih terlalu dini.',
      'Risiko harus diidentifikasi dengan jelas sebelum dilakukan penilaian atau penanganan.',
    ],
  },
  {
    turnNumber: 2,
    correctAction: COMMANDS.PENILAIAN,
    damage: 25,
    scenario: 'Insiden telah diidentifikasi sebagai akses tanpa izin terhadap data pelanggan.',
    question: 'Apa yang harus dilakukan selanjutnya?',
    correctDialogues: [
      'Risiko berhasil dinilai!',
      'Organisasi mengevaluasi kemungkinan terjadinya risiko, besarnya dampak, tingkat keparahan, dan prioritas penanganannya.',
    ],
    wrongDialogues: [
      'Risiko perlu dinilai sebelum organisasi menentukan tindakan penanganan.',
    ],
  },
  {
    turnNumber: 3,
    correctAction: COMMANDS.PENANGANAN,
    damage: 35,
    scenario: 'Kebocoran tersebut memiliki tingkat risiko TINGGI karena data sensitif pelanggan berpotensi terekspos.',
    question: 'Apa yang harus dilakukan organisasi selanjutnya?',
    correctDialogues: [
      'Penanganan risiko dilakukan!',
      'Organisasi memilih dan menerapkan tindakan untuk mengurangi, menghindari, mengalihkan, atau menerima risiko secara tepat.',
    ],
    wrongDialogues: [
      'Organisasi harus menentukan dan menjalankan penanganan risiko yang sesuai.',
    ],
  },
  {
    turnNumber: 4,
    correctAction: COMMANDS.PEMANTAUAN,
    damage: 20, // Mengurangi sisa 20 HP hingga 0 HP
    scenario: 'Akses telah dibatasi, kredensial yang terdampak telah diganti, dan kontrol mitigasi sudah diterapkan.',
    question: 'Apa yang harus dilakukan selanjutnya?',
    correctDialogues: [
      'Pemantauan risiko dimulai!',
      'Organisasi terus memantau risiko, efektivitas kontrol, indikator risiko, dan perubahan tingkat paparan risiko.',
    ],
    wrongDialogues: [
      'Pemantauan berkelanjutan diperlukan untuk memastikan efektivitas kontrol mitigasi.',
    ],
  },
];

export const VICTORY_DIALOGUES = [
  'KEBOCORAN DATA berhasil dimitigasi!',
  'MISI SELESAI',
];

export const EDUCATIONAL_SUMMARY = [
  {
    step: 'IDENTIFIKASI',
    description: 'Memahami risiko, kejadian, ancaman, dan aset yang terdampak.',
  },
  {
    step: 'PENILAIAN',
    description: 'Menilai kemungkinan, dampak, tingkat risiko, dan prioritas.',
  },
  {
    step: 'PENANGANAN',
    description: 'Menentukan dan menerapkan tindakan penanganan risiko yang sesuai.',
  },
  {
    step: 'PEMANTAUAN',
    description: 'Memantau perubahan risiko dan efektivitas kontrol secara berkelanjutan.',
  },
];

export function calculateRank(score) {
  if (score >= 900) return 'PERINGKAT S';
  if (score >= 750) return 'PERINGKAT A';
  if (score >= 600) return 'PERINGKAT B';
  if (score >= 400) return 'PERINGKAT C';
  return 'PERINGKAT D';
}
