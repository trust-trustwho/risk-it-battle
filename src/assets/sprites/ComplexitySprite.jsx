import React from 'react';

/**
 * ComplexitySprite - Karakter monster BEBAN KOMPLEKSITAS (Misi 04)
 * Visual: Golem proses digital bertingkat, balok birokrasi bertumpuk,
 * alur flowchart yang kusut dan saling mengunci, warna perunggu-slate dan amber gelap.
 */
export default function ComplexitySprite({
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

        {/* Serpihan Balok Birokrasi Mengambang */}
        <rect x="5" y="18" width="4" height="4" fill="#78716c" />
        <rect x="43" y="16" width="5" height="3" fill="#b45309" />
        <rect x="7" y="30" width="3" height="4" fill="#a8a29e" />
        <rect x="42" y="32" width="4" height="4" fill="#78716c" />

        {/* Mahkota Balok Bertingkat Atas */}
        <rect x="20" y="4" width="12" height="4" fill="#44403c" />
        <rect x="22" y="2" width="8" height="2" fill="#78716c" />
        <rect x="24" y="6" width="4" height="2" fill="#d97706" />

        {/* Lapisan 1: Blok Flowchart Atas */}
        <rect x="15" y="8" width="22" height="8" fill="#57534e" />
        <rect x="17" y="10" width="18" height="4" fill="#78716c" />
        {/* Garis Konektor Flowchart */}
        <rect x="25" y="14" width="2" height="6" fill="#f59e0b" />

        {/* Lapisan 2: Tubuh Tengah Bertumpuk (Matriks Kompleksitas) */}
        <rect x="12" y="18" width="28" height="14" fill="#292524" />
        <rect x="14" y="20" width="24" height="10" fill="#44403c" />

        {/* Simbol Keputusan Belah Ketupat (Decision Diamond di Inti) */}
        <rect x="24" y="22" width="4" height="2" fill="#d97706" />
        <rect x="22" y="24" width="8" height="2" fill="#f59e0b" />
        <rect x="24" y="26" width="4" height="2" fill="#d97706" />

        {/* Mata Pengukur Kompleksitas (Sensor Tajam Sempit) */}
        <rect x="16" y="23" width="5" height="2" fill="#fef08a" />
        <rect x="18" y="24" width="2" height="1" fill="#ea580c" />
        <rect x="31" y="23" width="5" height="2" fill="#fef08a" />
        <rect x="32" y="24" width="2" height="1" fill="#ea580c" />

        {/* Lapisan 3: Basis Dokumen Tebal (Birokrasi Bawah) */}
        <rect x="11" y="32" width="30" height="8" fill="#78716c" />
        <rect x="13" y="34" width="26" height="2" fill="#d6d3d1" />
        <rect x="13" y="37" width="26" height="2" fill="#a8a29e" />

        {/* Kaki Blok Penopang Berat */}
        <rect x="14" y="40" width="6" height="4" fill="#44403c" />
        <rect x="23" y="40" width="6" height="3" fill="#292524" />
        <rect x="32" y="40" width="6" height="4" fill="#44403c" />
      </svg>
    </div>
  );
}
