// floor2Data.js - Data & Dialogues for LANTAI 2 (SECURITY OPERATIONS)

export const FLOOR2_DIALOGUES = {
  // NPC 01: Analis Keamanan (near Analysis Desk)
  // Provides hint for risk context and ownership
  security_analyst: [
    {
      speaker: 'ANALIS KEAMANAN',
      text: 'Setelah kondisi darurat dikendalikan, pengelolaan risiko tidak boleh berhenti pada sisi teknis.',
    },
    {
      speaker: 'ANALIS KEAMANAN',
      text: 'Petakan aset dan proses bisnis yang terdampak, lalu tentukan siapa pemilik risikonya.',
    },
  ],

  // NPC 02: Petugas Insiden (near Incident Room side)
  // Provides hint for business impact and risk tolerance
  incident_officer: [
    {
      speaker: 'PETUGAS INSIDEN',
      text: 'Nilai risiko dari kemungkinan kejadian dan dampaknya terhadap operasional, keuangan, reputasi, serta tujuan bisnis.',
    },
    {
      speaker: 'PETUGAS INSIDEN',
      text: 'Bandingkan hasilnya dengan batas toleransi organisasi sebelum menentukan respons.',
    },
  ],

  // Terminal 01: KONTEKS & KEPEMILIKAN (Optional Learning Terminal in Data Archive area)
  terminal_identifikasi: [
    {
      speaker: 'KONTEKS & KEPEMILIKAN',
      text: 'Pengelolaan risiko dimulai dengan memahami aset, proses bisnis, pihak terdampak, dan pemilik risiko.',
    },
  ],

  // Terminal 02: PENILAIAN BISNIS (Optional Learning Terminal in Ops Hub area)
  terminal_penilaian: [
    {
      speaker: 'PENILAIAN BISNIS',
      text: 'Kemungkinan dan dampak bisnis menentukan tingkat risiko serta prioritas penanganannya.',
    },
  ],

  // Terminal 03: RESPONS & PEMANTAUAN (Optional Learning Terminal near Incident Room approach)
  terminal_penanganan_pemantauan: [
    {
      speaker: 'RESPONS & KONTROL',
      text: 'Jika risiko melebihi batas toleransi, tetapkan respons, kontrol, penanggung jawab, dan target penyelesaian.',
    },
    {
      speaker: 'PEMANTAUAN & PELAPORAN',
      text: 'Pantau indikator risiko utama (KRI), efektivitas kontrol, dan risiko residual, lalu laporkan hasilnya kepada manajemen.',
    },
  ],

  // Ruang Insiden Pre-battle Entry Dialogues
  ruang_insiden_intro: [
    {
      speaker: 'RUANG INSIDEN',
      text: 'Akses mencurigakan telah dibatasi, tetapi dampak risikonya terhadap bisnis belum selesai dikelola.',
    },
    {
      speaker: 'SISTEM KEAMANAN',
      text: 'Terapkan Risk IT untuk menetapkan konteks dan kepemilikan, menilai dampak bisnis, menentukan respons, serta memantau dan melaporkan risiko.',
    },
  ],

  // Ruang Insiden Replay Dialogues (Post-Victory)
  ruang_insiden_completed: [
    {
      speaker: 'RUANG INSIDEN',
      text: 'Insiden ini telah berhasil dimitigasi.',
    },
  ],
};
