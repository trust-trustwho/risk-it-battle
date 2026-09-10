import React from 'react';

/**
 * DataBreachSprite - Karakter monster KEBOCORAN DATA (Data Breach)
 * Visual: Monster digital terdistorsi bernuansa ungu-merah gelap, serpihan file/data retak,
 * simbol peringatan '!', mata digital menyala, dan siluet bayangan pixel retro.
 */
export default function DataBreachSprite({
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
        {/* Bayangan di platform (pixel shadow) */}
        <ellipse cx="26" cy="49" rx="16" ry="2.5" fill="rgba(30, 40, 50, 0.35)" />

        {/* Serpihan Data Mengambang Kiri (Corrupted Bits / Shards) */}
        <rect x="5" y="14" width="3" height="3" fill="#ec4899" />
        <rect x="4" y="24" width="4" height="2" fill="#a855f7" />
        <rect x="7" y="32" width="2" height="3" fill="#f43f5e" />

        {/* Serpihan Data Mengambang Kanan */}
        <rect x="44" y="12" width="3" height="3" fill="#f43f5e" />
        <rect x="45" y="22" width="4" height="3" fill="#ec4899" />
        <rect x="42" y="34" width="3" height="2" fill="#a855f7" />

        {/* Tanduk / Bentuk Puncak File Rusak (Broken File Shape & Horns) */}
        <rect x="18" y="4" width="5" height="4" fill="#3b0764" />
        <rect x="29" y="4" width="5" height="4" fill="#3b0764" />
        <rect x="19" y="6" width="3" height="2" fill="#9333ea" />
        <rect x="30" y="6" width="3" height="2" fill="#9333ea" />

        {/* Aura Luar Glitch (Distortion outer pixel border) */}
        <rect x="14" y="8" width="24" height="4" fill="#581c87" />
        <rect x="11" y="12" width="30" height="20" fill="#4a044e" />
        <rect x="13" y="32" width="26" height="8" fill="#581c87" />
        <rect x="16" y="40" width="20" height="4" fill="#3b0764" />

        {/* Tubuh Utama Monster (Dark Purple-Crimson Core) */}
        <rect x="14" y="12" width="24" height="18" fill="#701a75" />
        <rect x="16" y="10" width="20" height="22" fill="#86198f" />
        <rect x="17" y="32" width="18" height="6" fill="#701a75" />

        {/* Corrupted Digital Glitch Lines (Garis data error) */}
        <rect x="14" y="16" width="7" height="2" fill="#ec4899" />
        <rect x="31" y="16" width="7" height="2" fill="#ec4899" />
        <rect x="13" y="26" width="10" height="2" fill="#e11d48" />
        <rect x="29" y="26" width="10" height="2" fill="#e11d48" />

        {/* Mata Digital Jahat / Sensor Kerusakan (Corrupted Eyes) */}
        {/* Mata Kiri */}
        <rect x="17" y="19" width="6" height="4" fill="#ffe4e6" />
        <rect x="19" y="20" width="3" height="3" fill="#dc2626" />
        <rect x="20" y="21" width="1" height="1" fill="#fef08a" />

        {/* Mata Kanan */}
        <rect x="29" y="19" width="6" height="4" fill="#ffe4e6" />
        <rect x="30" y="20" width="3" height="3" fill="#dc2626" />
        <rect x="31" y="21" width="1" height="1" fill="#fef08a" />

        {/* Mulut Digital / Garis Data Bocor */}
        <rect x="21" y="27" width="10" height="2" fill="#0f172a" />
        <rect x="22" y="28" width="2" height="2" fill="#f43f5e" />
        <rect x="25" y="27" width="2" height="3" fill="#f43f5e" />
        <rect x="28" y="28" width="2" height="2" fill="#f43f5e" />

        {/* Core Tengah: Simbol Peringatan / Data Bocor (Exclamation Warning Core) */}
        <rect x="24" y="32" width="4" height="6" fill="#fef08a" />
        <rect x="25" y="33" width="2" height="3" fill="#ea580c" />
        <rect x="25" y="37" width="2" height="1" fill="#ea580c" />

        {/* Tentakel / Ujung Bawah Data (Pixel Spikes) */}
        <rect x="17" y="42" width="3" height="3" fill="#581c87" />
        <rect x="22" y="43" width="3" height="3" fill="#3b0764" />
        <rect x="27" y="43" width="3" height="3" fill="#3b0764" />
        <rect x="32" y="42" width="3" height="3" fill="#581c87" />
      </svg>
    </div>
  );
}
