import React from 'react';

/**
 * ConfusionFrameworkSprite - Karakter monster KEBINGUNGAN FRAMEWORK (Misi 01)
 * Visual: Monster pixel berkas dokumentasi kusut bertumpuk, kartu framework beterbangan,
 * simbol tanda tanya '?', ekspresi digital bingung, nuansa ungu muda dan biru pastel.
 */
export default function ConfusionFrameworkSprite({
  isHit = false,
  isDefeated = false,
  isLunging = false,
  isHitFlash = false,
}) {
  return (
    <div
      className={`sprite-container enemy-sprite-box ${isLunging ? 'enemy-attack-lunge' : ''
        } ${isHit || isHitFlash ? 'enemy-hit-flash shake-enemy' : ''} ${isDefeated ? 'enemy-defeated-sink' : 'enemy-float-idle'
        }`}
    >
      <svg
        viewBox="0 0 52 52"
        className="pixel-sprite enemy-svg"
        shapeRendering="crispEdges"
      >
        {/* Bayangan di platform */}
        <ellipse cx="26" cy="49" rx="16" ry="2.5" fill="rgba(30, 40, 50, 0.35)" />

        {/* Lembaran Dokumen Melayang Kiri */}
        <rect x="6" y="12" width="6" height="8" fill="#e2e8f0" />
        <rect x="7" y="14" width="4" height="1" fill="#94a3b8" />
        <rect x="7" y="16" width="4" height="1" fill="#94a3b8" />
        <rect x="4" y="22" width="5" height="6" fill="#cbd5e1" />

        {/* Lembaran Dokumen Melayang Kanan */}
        <rect x="42" y="10" width="7" height="9" fill="#e2e8f0" />
        <rect x="43" y="12" width="5" height="1" fill="#94a3b8" />
        <rect x="43" y="14" width="5" height="1" fill="#94a3b8" />
        <rect x="41" y="26" width="6" height="7" fill="#cbd5e1" />

        {/* Tanda Tanya Pixel Kiri Atas */}
        <rect x="12" y="4" width="4" height="2" fill="#818cf8" />
        <rect x="14" y="6" width="2" height="3" fill="#818cf8" />
        <rect x="14" y="10" width="2" height="2" fill="#818cf8" />

        {/* Tanda Tanya Pixel Kanan Atas */}
        <rect x="36" y="3" width="4" height="2" fill="#a78bfa" />
        <rect x="38" y="5" width="2" height="3" fill="#a78bfa" />
        <rect x="38" y="9" width="2" height="2" fill="#a78bfa" />

        {/* Tubuh Utama: Tumpukan Bundel Buku / Panduan Kusut */}
        <rect x="14" y="12" width="24" height="28" fill="#4338ca" />
        <rect x="16" y="10" width="20" height="30" fill="#4f46e5" />
        <rect x="18" y="14" width="16" height="24" fill="#6366f1" />

        {/* Halaman / Tumpukan Kertas di Tengah */}
        <rect x="19" y="16" width="14" height="2" fill="#e0e7ff" />
        <rect x="19" y="20" width="14" height="2" fill="#c7d2fe" />
        <rect x="19" y="24" width="14" height="2" fill="#e0e7ff" />

        {/* Mata Digital Bingung (Pola Silang / Spiral) */}
        {/* Mata Kiri (Bentuk X) */}
        <rect x="20" y="28" width="2" height="2" fill="#ffffff" />
        <rect x="23" y="28" width="2" height="2" fill="#ffffff" />
        <rect x="21" y="29" width="3" height="2" fill="#312e81" />
        <rect x="20" y="31" width="2" height="2" fill="#ffffff" />
        <rect x="23" y="31" width="2" height="2" fill="#ffffff" />

        {/* Mata Kanan (Bentuk ?) */}
        <rect x="28" y="28" width="4" height="2" fill="#ffffff" />
        <rect x="30" y="30" width="2" height="2" fill="#ffffff" />
        <rect x="30" y="33" width="2" height="1" fill="#ffffff" />
        <rect x="29" y="29" width="2" height="2" fill="#312e81" />

        {/* Mulut Bergelombang (Garis Kebingungan) */}
        <rect x="22" y="37" width="2" height="2" fill="#1e1b4b" />
        <rect x="24" y="36" width="3" height="2" fill="#1e1b4b" />
        <rect x="27" y="37" width="3" height="2" fill="#1e1b4b" />

        {/* Kaki / Serat Halaman di Bawah */}
        <rect x="17" y="42" width="4" height="3" fill="#3730a3" />
        <rect x="24" y="42" width="4" height="4" fill="#312e81" />
        <rect x="31" y="42" width="4" height="3" fill="#3730a3" />
      </svg>
    </div>
  );
}
