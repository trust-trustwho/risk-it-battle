import React from 'react';

/**
 * SystemCrisisBossSprite - Karakter Final Boss KRISIS SISTEM (Misi 05)
 * Visual: Composite digital crisis titan dengan multi-core anomali,
 * tanduk distorsi tata kelola, kode glitch merah-violet yang retak,
 * mata sensor multi-spektrum, dan serpihan peringatan darurat.
 */
export default function SystemCrisisBossSprite({
  isHit = false,
  isDefeated = false,
  isLunging = false,
  isHitFlash = false,
}) {
  return (
    <div
      className={`sprite-container enemy-sprite-box boss-sprite-box ${
        isLunging ? 'enemy-attack-lunge' : ''
      } ${isHit || isHitFlash ? 'enemy-hit-flash shake-enemy' : ''} ${
        isDefeated ? 'enemy-defeated-sink' : 'enemy-float-idle'
      }`}
    >
      <svg
        viewBox="0 0 56 56"
        className="pixel-sprite enemy-svg"
        shapeRendering="crispEdges"
      >
        {/* Bayangan di platform */}
        <ellipse cx="28" cy="52" rx="19" ry="3" fill="rgba(20, 10, 30, 0.45)" />

        {/* Serpihan Krisis Glitch Melayang di Sekitar */}
        <rect x="3" y="10" width="4" height="4" fill="#dc2626" />
        <rect x="4" y="22" width="3" height="5" fill="#9333ea" />
        <rect x="5" y="36" width="4" height="3" fill="#ef4444" />
        <rect x="49" y="8" width="4" height="4" fill="#dc2626" />
        <rect x="48" y="24" width="4" height="4" fill="#ec4899" />
        <rect x="47" y="38" width="3" height="4" fill="#9333ea" />

        {/* Tanduk Ganda Distorsi Tata Kelola (Crown of Crisis) */}
        {/* Tanduk Kiri */}
        <rect x="14" y="2" width="4" height="8" fill="#581c87" />
        <rect x="12" y="4" width="4" height="4" fill="#7e22ce" />
        <rect x="16" y="1" width="2" height="3" fill="#f43f5e" />
        {/* Tanduk Kanan */}
        <rect x="38" y="2" width="4" height="8" fill="#581c87" />
        <rect x="40" y="4" width="4" height="4" fill="#7e22ce" />
        <rect x="38" y="1" width="2" height="3" fill="#f43f5e" />

        {/* Mahkota Pusat: Simbol Peringatan Darurat */}
        <rect x="24" y="3" width="8" height="4" fill="#b91c1c" />
        <rect x="26" y="1" width="4" height="2" fill="#fef08a" />

        {/* Cangkang Luar Titan Krisis */}
        <rect x="10" y="8" width="36" height="36" fill="#180426" />
        <rect x="12" y="10" width="32" height="32" fill="#3b0764" />
        <rect x="14" y="12" width="28" height="28" fill="#4c0519" />

        {/* Retakan Glitch Merah & Neon Menyala */}
        <rect x="14" y="16" width="10" height="2" fill="#f43f5e" />
        <rect x="32" y="16" width="10" height="2" fill="#ec4899" />
        <rect x="16" y="24" width="8" height="2" fill="#fbbf24" />
        <rect x="32" y="24" width="8" height="2" fill="#fbbf24" />

        {/* Tiga Mata Sensor Krisis Multi-Dimensi */}
        {/* Mata Kiri (Keamanan/Regulasi) */}
        <rect x="16" y="19" width="6" height="4" fill="#ffe4e6" />
        <rect x="18" y="20" width="3" height="2" fill="#e11d48" />
        <rect x="19" y="21" width="1" height="1" fill="#fef08a" />

        {/* Mata Pusat (Tata Kelola Korporat / Boss Eye) */}
        <rect x="25" y="17" width="6" height="5" fill="#fef08a" />
        <rect x="27" y="18" width="2" height="3" fill="#dc2626" />

        {/* Mata Kanan (Layanan & Operasi) */}
        <rect x="34" y="19" width="6" height="4" fill="#ffe4e6" />
        <rect x="35" y="20" width="3" height="2" fill="#e11d48" />
        <rect x="36" y="21" width="1" height="1" fill="#fef08a" />

        {/* Inti Reaktor Risiko TI (Tengah) */}
        <rect x="22" y="28" width="12" height="8" fill="#0f172a" />
        <rect x="24" y="29" width="8" height="6" fill="#7f1d1d" />
        <rect x="26" y="31" width="4" height="2" fill="#f43f5e" />
        <rect x="27" y="32" width="2" height="1" fill="#ffffff" />

        {/* Mulut Digital Error / Simbol Bahaya */}
        <rect x="18" y="38" width="20" height="3" fill="#020617" />
        <rect x="20" y="39" width="4" height="2" fill="#dc2626" />
        <rect x="26" y="39" width="4" height="2" fill="#dc2626" />
        <rect x="32" y="39" width="4" height="2" fill="#dc2626" />

        {/* Tentakel Data Ganda di Bagian Bawah */}
        <rect x="12" y="44" width="6" height="5" fill="#4c0519" />
        <rect x="20" y="44" width="5" height="4" fill="#3b0764" />
        <rect x="31" y="44" width="5" height="4" fill="#3b0764" />
        <rect x="38" y="44" width="6" height="5" fill="#4c0519" />
      </svg>
    </div>
  );
}
