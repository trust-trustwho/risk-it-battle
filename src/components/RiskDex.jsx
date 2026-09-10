import React, { useState, useEffect } from 'react';
import { FRAMEWORKS, FRAMEWORK_KEYS } from '../game/frameworkData';
import { playCursorSound, playSelectSound } from '../game/soundFx';

/**
 * RiskDex - Ensiklopedia / Field-Guide Panduan Tata Kelola & Risiko TI Orisinal
 * Menggunakan tata letak JRPG dossier 2 kolom retro:
 * - Kiri: Indeks framework (01 hingga 06), dengan status nama atau '???' jika belum ditemukan.
 * - Kanan: Lembar berkas dossier intelijen edukasi lengkap.
 * - Kontrol keyboard penuh (↑ / ↓ untuk navigasi, ESC / Backspace untuk kembali) dan mouse.
 */
export default function RiskDex({ discoveredKeys = ['RISK_IT'], onReturn }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedKey = FRAMEWORK_KEYS[selectedIndex];
  const selectedFramework = FRAMEWORKS[selectedKey];
  const isDiscovered = discoveredKeys.includes(selectedKey);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : FRAMEWORK_KEYS.length - 1));
        playCursorSound();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < FRAMEWORK_KEYS.length - 1 ? prev + 1 : 0));
        playCursorSound();
      } else if (e.key === 'Escape' || e.key === 'Backspace') {
        e.preventDefault();
        playSelectSound();
        onReturn();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onReturn]);

  const handleSelect = (idx) => {
    if (selectedIndex !== idx) {
      setSelectedIndex(idx);
      playCursorSound();
    }
  };

  return (
    <div className="riskdex-screen">
      {/* Header Ensiklopedia */}
      <header className="riskdex-header">
        <div className="riskdex-title-box">
          <div className="retro-badge">BERKAS PANDUAN ANALIS</div>
          <h1 className="riskdex-title">RISKDEX</h1>
          <p className="riskdex-sub">ENSIKLOPEDIA BEST PRACTICE & TATA KELOLA TI</p>
        </div>

        <div className="riskdex-counter-badge">
          <span className="counter-label">TERCATAT:</span>
          <span className="counter-number">
            {discoveredKeys.length} / {FRAMEWORK_KEYS.length}
          </span>
        </div>
      </header>

      {/* Konten Utama 2 Kolom Klasik Field-Guide */}
      <div className="riskdex-main-layout">
        {/* Kolom Kiri: Indeks Berkas 01 - 06 */}
        <aside className="riskdex-index-column">
          <div className="index-column-header">DAFTAR DOKUMEN</div>
          <div className="index-list">
            {FRAMEWORK_KEYS.map((key, idx) => {
              const item = FRAMEWORKS[key];
              const isUnlocked = discoveredKeys.includes(key);
              const isSelected = selectedIndex === idx;

              return (
                <button
                  key={key}
                  type="button"
                  className={`index-item-row ${isSelected ? 'selected' : ''} ${!isUnlocked ? 'locked' : ''}`}
                  onMouseEnter={() => handleSelect(idx)}
                  onClick={() => handleSelect(idx)}
                >
                  <span className="index-cursor">{isSelected ? '▶' : '\u00A0'}</span>
                  <span className="index-code">{item.code}</span>
                  <span className="index-name">
                    {isUnlocked ? item.name : '???'}
                  </span>
                  {isUnlocked ? (
                    <span className="index-status-icon">✓</span>
                  ) : (
                    <span className="index-status-icon lock">🔒</span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Kolom Kanan: Lembar Berkas Intelijen Edukasi */}
        <main className="riskdex-dossier-column">
          {isDiscovered && selectedFramework ? (
            <div className="dossier-sheet">
              {/* Header Berkas */}
              <div className="dossier-header">
                <div className="dossier-id-row">
                  <span className="dossier-tag">BERKAS #{selectedFramework.code}</span>
                  <span className="dossier-category">{selectedFramework.category}</span>
                </div>
                <h2 className="dossier-title">{selectedFramework.name}</h2>
              </div>

              {/* Isi Berkas */}
              <div className="dossier-scroll-content">
                <div className="dossier-section">
                  <h4 className="section-label">FOKUS UTAMA</h4>
                  <p className="section-text">{selectedFramework.focus}</p>
                </div>

                {selectedFramework.domains && selectedFramework.domains.length > 0 && (
                  <div className="dossier-section">
                    <h4 className="section-label">DOMAIN / AREA INTI</h4>
                    <ul className="dossier-bullet-list">
                      {selectedFramework.domains.map((dom, i) => (
                        <li key={i}>{dom}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedFramework.advantages && (
                  <div className="dossier-section">
                    <h4 className="section-label">KEUNGGULAN UTAMA</h4>
                    <ul className="dossier-bullet-list">
                      {selectedFramework.advantages.map((adv, i) => (
                        <li key={i}>{adv}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedFramework.limitations && (
                  <div className="dossier-section">
                    <h4 className="section-label">TANTANGAN PENERAPAN</h4>
                    <ul className="dossier-bullet-list text-muted">
                      {selectedFramework.limitations.map((lim, i) => (
                        <li key={i}>{lim}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="dossier-section">
                  <h4 className="section-label">PENERAPAN ORGANISASI</h4>
                  <p className="section-text">{selectedFramework.application}</p>
                </div>

                {selectedFramework.gameplayNote && (
                  <div className="dossier-gameplay-note">
                    <span className="note-badge">CATATAN GAMEPLAY:</span>
                    <p className="note-text">{selectedFramework.gameplayNote}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="dossier-locked-empty">
              <div className="locked-icon-large">🔒</div>
              <h3>DOKUMEN BELUM TERBUKA</h3>
              <p>
                Framework ini belum ditemukan oleh Analis Risiko.<br />
                Selesaikan <strong>Misi 01</strong> atau <strong>Misi 05</strong> untuk mencatat
                pengetahuan tentang best practice ini ke dalam RiskDex.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Footer Navigasi */}
      <footer className="riskdex-footer">
        <button
          type="button"
          className="retro-button-secondary"
          onClick={() => {
            playSelectSound();
            onReturn();
          }}
        >
          <span className="menu-cursor">◀</span>
          <span>KEMBALI KE MENU</span>
        </button>

        <div className="footer-keyboard-hint">
          <span>Gunakan Tombol Panah (↑ / ↓) untuk Memilih · ESC untuk Kembali</span>
        </div>
      </footer>
    </div>
  );
}
