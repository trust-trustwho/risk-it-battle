import React, { useState, useEffect } from 'react';
import { playCursorSound, playSelectSound, playDefeatSound } from '../game/soundFx';

/**
 * DefeatScreen - Layar jika HP Analis Risiko habis (0 HP)
 * Menampilkan:
 * "MANAJEMEN RISIKO GAGAL"
 * "Insiden semakin memburuk karena terlalu banyak keputusan yang tidak tepat."
 * Tombol: "ULANGI PERTARUNGAN" & "KEMBALI KE MENU UTAMA"
 */
export default function DefeatScreen({ onRetry, onReturnToTitle }) {
  const [selectedBtn, setSelectedBtn] = useState(0); // 0 = ULANGI, 1 = KEMBALI

  useEffect(() => {
    playDefeatSound();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedBtn((prev) => (prev === 0 ? 1 : 0));
        playCursorSound();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        playSelectSound();
        if (selectedBtn === 0) {
          onRetry();
        } else {
          onReturnToTitle();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedBtn, onRetry, onReturnToTitle]);

  return (
    <div className="defeat-screen">
      <div className="defeat-card">
        <div className="defeat-icon">⚠️</div>
        <h1 className="defeat-title">MANAJEMEN RISIKO GAGAL</h1>
        <p className="defeat-desc">
          Insiden semakin memburuk karena terlalu banyak keputusan yang tidak tepat.
        </p>

        <div className="defeat-actions">
          <button
            type="button"
            className={`retro-button-primary ${selectedBtn === 0 ? 'active' : ''}`}
            onMouseEnter={() => {
              if (selectedBtn !== 0) {
                setSelectedBtn(0);
                playCursorSound();
              }
            }}
            onClick={() => {
              playSelectSound();
              onRetry();
            }}
          >
            <span className="menu-cursor">{selectedBtn === 0 ? '▶' : '\u00A0'}</span>
            <span>ULANGI PERTARUNGAN</span>
          </button>

          <button
            type="button"
            className={`retro-button-secondary ${selectedBtn === 1 ? 'active' : ''}`}
            onMouseEnter={() => {
              if (selectedBtn !== 1) {
                setSelectedBtn(1);
                playCursorSound();
              }
            }}
            onClick={() => {
              playSelectSound();
              onReturnToTitle();
            }}
          >
            <span className="menu-cursor">{selectedBtn === 1 ? '▶' : '\u00A0'}</span>
            <span>KEMBALI KE MENU UTAMA</span>
          </button>
        </div>
      </div>
    </div>
  );
}
