import React from 'react';

/**
 * RiskAnalystSprite - Karakter orisinal ANALIS RISIKO
 * Sudut pandang: Dari belakang / serong belakang (3/4 back view) menghadap ke arah musuh.
 * Gaya: Pixel art klasik GBA handheld JRPG, jaket teknis navy/teal, tali tas laptop selempang.
 */
export default function RiskAnalystSprite({
  isShaking = false,
  isLunging = false,
  isHitFlash = false,
}) {
  return (
    <div
      className={`sprite-container player-sprite-box ${isLunging ? 'player-attack-lunge' : ''
        } ${isShaking ? 'shake-player' : ''} ${isHitFlash ? 'player-hit-flash' : ''
        }`}
    >
      <svg
        viewBox="0 0 40 48"
        className="pixel-sprite player-svg"
        shapeRendering="crispEdges"
      >
        {/* Bayangan di tanah (pixel shadow) */}
        <ellipse cx="20" cy="46" rx="14" ry="2" fill="rgba(30, 40, 50, 0.4)" />

        {/* Rambut / Kepala belakang */}
        <rect x="15" y="4" width="10" height="3" fill="#2d1b10" />
        <rect x="13" y="7" width="14" height="4" fill="#3e2718" />
        <rect x="12" y="11" width="16" height="5" fill="#4d3220" />
        <rect x="14" y="10" width="4" height="2" fill="#6d472c" /> {/* Hair highlight */}
        <rect x="11" y="13" width="3" height="4" fill="#2d1b10" />
        <rect x="26" y="13" width="3" height="4" fill="#2d1b10" />
        {/* Headset / earpiece komunikator analis */}
        <rect x="9" y="13" width="2" height="3" fill="#00e5ff" />
        <rect x="10" y="14" width="2" height="1" fill="#ffffff" />

        {/* Leher / Kerah Kemeja */}
        <rect x="17" y="16" width="6" height="2" fill="#f0f4f8" />
        <rect x="18" y="17" width="4" height="1" fill="#cbd5e1" />

        {/* Jaket / Rompi Analis (Teal / Navy) */}
        {/* Bahu & Lengan */}
        <rect x="10" y="18" width="20" height="5" fill="#1e3a5f" />
        <rect x="8" y="21" width="4" height="8" fill="#1e3a5f" />
        <rect x="28" y="21" width="4" height="8" fill="#1e3a5f" />

        {/* Lengan Bawah / Tangan */}
        <rect x="8" y="28" width="3" height="4" fill="#152840" />
        <rect x="29" y="28" width="3" height="4" fill="#152840" />
        {/* Tangan / Sarung tangan teknis */}
        <rect x="8" y="31" width="3" height="2" fill="#38bdf8" />
        <rect x="29" y="31" width="3" height="2" fill="#38bdf8" />

        {/* Badan Belakang */}
        <rect x="12" y="20" width="16" height="10" fill="#2563eb" />
        <rect x="14" y="21" width="12" height="2" fill="#3b82f6" /> {/* Highlight */}

        {/* Tas Selempang Laptop / Analis (Brown Leather & Strap) */}
        {/* Tali selempang diagonal dari bahu kiri ke pinggul kanan */}
        <rect x="13" y="18" width="3" height="3" fill="#854d0e" />
        <rect x="15" y="21" width="3" height="3" fill="#713f12" />
        <rect x="17" y="24" width="3" height="3" fill="#854d0e" />
        <rect x="19" y="27" width="3" height="3" fill="#713f12" />

        {/* Tas Laptop di samping pinggang */}
        <rect x="21" y="25" width="8" height="7" fill="#854d0e" />
        <rect x="22" y="26" width="6" height="5" fill="#a16207" />
        <rect x="24" y="27" width="2" height="2" fill="#fef08a" /> {/* Gesper logam */}
        <rect x="21" y="32" width="8" height="1" fill="#451a03" />

        {/* Sabuk / Pinggang */}
        <rect x="13" y="30" width="14" height="2" fill="#0f172a" />
        <rect x="18" y="30" width="3" height="2" fill="#94a3b8" /> {/* Sabuk gesper */}

        {/* Celana Panjang (Dark Charcoal) */}
        <rect x="13" y="32" width="6" height="9" fill="#1e293b" />
        <rect x="21" y="32" width="6" height="9" fill="#1e293b" />
        <rect x="19" y="32" width="2" height="6" fill="#0f172a" /> {/* Sela celana */}

        {/* Lipatan Celana */}
        <rect x="13" y="37" width="5" height="1" fill="#334155" />
        <rect x="22" y="37" width="5" height="1" fill="#334155" />

        {/* Sepatu / Boots */}
        <rect x="12" y="41" width="7" height="4" fill="#090d16" />
        <rect x="21" y="41" width="7" height="4" fill="#090d16" />
        <rect x="11" y="44" width="8" height="2" fill="#020617" />
        <rect x="21" y="44" width="8" height="2" fill="#020617" />
        {/* Sol sepatu warna terang */}
        <rect x="11" y="45" width="8" height="1" fill="#0284c7" />
        <rect x="21" y="45" width="8" height="1" fill="#0284c7" />
      </svg>
    </div>
  );
}
