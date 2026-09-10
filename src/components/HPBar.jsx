import React from 'react';

/**
 * HPBar - Bar nyawa retro khas GBA
 * Warna:
 * > 50%: Hijau
 * 20% - 50%: Kuning
 * < 20%: Merah
 * Dilengkapi animasi pengurangan halus (smooth drain animation)
 */
export default function HPBar({ currentHP, maxHP = 100, showNumbers = false }) {
  const safeHP = Math.max(0, Math.min(currentHP, maxHP));
  const percentage = (safeHP / maxHP) * 100;

  // Tentukan warna berdasarkan persentase
  let barColorClass = 'hp-green';
  if (percentage <= 20) {
    barColorClass = 'hp-red';
  } else if (percentage <= 50) {
    barColorClass = 'hp-yellow';
  }

  return (
    <div className="hp-bar-wrapper">
      <div className="hp-label-badge">HP</div>
      <div className="hp-track">
        <div
          className={`hp-fill ${barColorClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showNumbers && (
        <div className="hp-numeric-display">
          <span>{safeHP}</span> / <span>{maxHP}</span>
        </div>
      )}
    </div>
  );
}
