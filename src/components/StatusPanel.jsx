import React from 'react';
import HPBar from './HPBar';

/**
 * StatusPanel - Panel status karakter khas handheld JRPG (GBA)
 * - Pemain: Nama ("ANALIS RISIKO"), Bar HP, Angka HP ("current HP / max HP")
 * - Musuh: Nama, Bar HP
 */
export default function StatusPanel({
  name,
  level,
  currentHP,
  maxHP = 100,
  isPlayer = false,
  isShaking = false,
}) {
  return (
    <div
      className={`status-panel ${isPlayer ? 'player-status-panel' : 'enemy-status-panel'} ${
        isShaking ? 'panel-shake' : ''
      }`}
    >
      <div className="status-header">
        <span className="status-name">{name}</span>
      </div>

      <div className="status-hp-row">
        <HPBar currentHP={currentHP} maxHP={maxHP} showNumbers={isPlayer} />
      </div>
    </div>
  );
}
