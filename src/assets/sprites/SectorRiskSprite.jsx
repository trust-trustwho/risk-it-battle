import React from 'react';

/**
 * SectorRiskSprite - Karakter monster RISIKO SEKTOR (Misi 03)
 * Visual: Monster digital modular yang tubuhnya memancarkan simbol multi-sektor:
 * topi akademik (universitas), palang medis (RS), koin/brankas (bank), keranjang (e-commerce),
 * pilar gedung (pemerintahan). Nuansa amber-oranye, pirus, dan abu-abu kebiruan.
 */
export default function SectorRiskSprite({
  isHit = false,
  isDefeated = false,
  isLunging = false,
  isHitFlash = false,
}) {
  return (
    <div
      className={`sprite-container enemy-sprite-box ${
        isLunging ? 'enemy-attack-lunge' : ''
      } ${isHit || isHitFlash ? 'enemy-hit-flash shake-enemy' : ''} ${
        isDefeated ? 'enemy-defeated-sink' : 'enemy-float-idle'
      }`}
    >
      <svg
        viewBox="0 0 52 52"
        className="pixel-sprite enemy-svg"
        shapeRendering="crispEdges"
      >
        {/* Bayangan di platform */}
        <ellipse cx="26" cy="49" rx="16" ry="2.5" fill="rgba(30, 40, 50, 0.35)" />

        {/* Aura Luar Sektor Melayang */}
        <rect x="6" y="16" width="3" height="3" fill="#f59e0b" />
        <rect x="43" y="14" width="3" height="3" fill="#06b6d4" />
        <rect x="5" y="30" width="3" height="3" fill="#10b981" />
        <rect x="44" y="28" width="3" height="3" fill="#f43f5e" />

        {/* Mahkota / Puncak Menara Sektor */}
        <rect x="23" y="5" width="6" height="4" fill="#0f766e" />
        <rect x="25" y="3" width="2" height="2" fill="#14b8a6" />

        {/* Cangkang Tubuh Utama (Kubus Jaringan Multi-Sektor) */}
        <rect x="13" y="9" width="26" height="32" fill="#0f172a" />
        <rect x="15" y="11" width="22" height="28" fill="#1e293b" />

        {/* Ikon Sektor 1: Topi Toga Akademik (Kiri Atas) */}
        <rect x="17" y="14" width="6" height="2" fill="#38bdf8" />
        <rect x="19" y="16" width="2" height="2" fill="#38bdf8" />

        {/* Ikon Sektor 2: Palang Medis Rumah Sakit (Kanan Atas) */}
        <rect x="30" y="13" width="2" height="6" fill="#ef4444" />
        <rect x="28" y="15" width="6" height="2" fill="#ef4444" />

        {/* Mata Digital Pemantau Sektor (Tengah) */}
        <rect x="18" y="22" width="6" height="4" fill="#0284c7" />
        <rect x="20" y="23" width="2" height="2" fill="#ffffff" />
        <rect x="28" y="22" width="6" height="4" fill="#0284c7" />
        <rect x="30" y="23" width="2" height="2" fill="#ffffff" />

        {/* Ikon Sektor 3: Pilar Gedung Pemerintahan (Tengah Bawah) */}
        <rect x="23" y="29" width="6" height="2" fill="#e2e8f0" />
        <rect x="24" y="31" width="1" height="4" fill="#94a3b8" />
        <rect x="27" y="31" width="1" height="4" fill="#94a3b8" />
        <rect x="23" y="35" width="6" height="1" fill="#e2e8f0" />

        {/* Ikon Sektor 4: Simbol Finansial / Koin Emas (Kiri Bawah) */}
        <rect x="17" y="31" width="4" height="4" fill="#eab308" />
        <rect x="18" y="32" width="2" height="2" fill="#fef08a" />

        {/* Ikon Sektor 5: Keranjang E-Commerce (Kanan Bawah) */}
        <rect x="31" y="31" width="4" height="3" fill="#10b981" />
        <rect x="30" y="30" width="1" height="1" fill="#10b981" />
        <rect x="31" y="34" width="1" height="1" fill="#047857" />
        <rect x="34" y="34" width="1" height="1" fill="#047857" />

        {/* Pondasi / Tentakel Sinyal di Bawah */}
        <rect x="16" y="41" width="4" height="3" fill="#334155" />
        <rect x="24" y="41" width="4" height="4" fill="#1e293b" />
        <rect x="32" y="41" width="4" height="3" fill="#334155" />
      </svg>
    </div>
  );
}
