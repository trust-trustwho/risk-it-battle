import React, { useState, useEffect } from 'react';
import { EDUCATIONAL_SUMMARY, calculateRank } from '../game/battleData';
import { playCursorSound, playSelectSound, playVictorySound } from '../game/soundFx';

/**
 * ResultScreen - Layar Hasil Pertandingan (Bahasa Indonesia)
 * Menampilkan:
 * - MISI SELESAI
 * - Insiden: KEBOCORAN DATA
 * - Skor, Jawaban Benar, Kesalahan, Status Risiko: TERMITIGASI
 * - Peringkat (PERINGKAT S / A / B / C / D)
 * - Ringkasan Edukasi Alur Manajemen Risiko
 * - Tombol: MAIN LAGI, KEMBALI KE MENU UTAMA
 */
export default function ResultScreen({
  score = 1000,
  correctAnswers = 4,
  wrongAnswers = 0,
  onPlayAgain,
  onReturnToTitle,
}) {
  const [selectedBtnIndex, setSelectedBtnIndex] = useState(0); // 0 = MAIN LAGI, 1 = KEMBALI
  const rank = calculateRank(score);

  useEffect(() => {
    playVictorySound();
  }, []);

  // Kontrol Keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedBtnIndex((prev) => (prev === 0 ? 1 : 0));
        playCursorSound();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (selectedBtnIndex === 0) {
          playSelectSound();
          onPlayAgain();
        } else {
          playSelectSound();
          onReturnToTitle();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedBtnIndex, onPlayAgain, onReturnToTitle]);

  return (
    <div className="result-screen">
      <div className="result-container">
        {/* Banner Misi Selesai */}
        <div className="result-header">
          <div className="result-badge">LAPORAN INSIDEN SELESAI</div>
          <h1 className="result-title">MISI SELESAI</h1>
        </div>

        {/* Kotak Statistik Pertandingan */}
        <div className="result-stats-card">
          <div className="stats-row highlight-row">
            <span className="stats-label">Insiden:</span>
            <span className="stats-value text-red">KEBOCORAN DATA</span>
          </div>

          <div className="stats-row">
            <span className="stats-label">Status Risiko:</span>
            <span className="stats-value text-green">TERMITIGASI</span>
          </div>

          <div className="stats-grid">
            <div className="stat-pill">
              <span className="pill-title">Skor Akhir</span>
              <span className="pill-number score-number">{score}</span>
            </div>
            <div className="stat-pill">
              <span className="pill-title">Jawaban Benar</span>
              <span className="pill-number text-green">{correctAnswers}</span>
            </div>
            <div className="stat-pill">
              <span className="pill-title">Kesalahan</span>
              <span className="pill-number text-red">{wrongAnswers}</span>
            </div>
          </div>

          {/* Badge Peringkat */}
          <div className="rank-banner">
            <span className="rank-title">HASIL EVALUASI:</span>
            <span className="rank-badge">{rank}</span>
          </div>
        </div>

        {/* Ringkasan Edukasi Alur Manajemen Risiko */}
        <div className="education-summary-card">
          <div className="education-header">
            <h3>ALUR MANAJEMEN RISIKO</h3>
          </div>
          <div className="flow-list">
            {EDUCATIONAL_SUMMARY.map((item, idx) => (
              <React.Fragment key={item.step}>
                <div className="flow-item">
                  <div className="flow-step-name">{item.step}</div>
                  <div className="flow-step-desc">{item.description}</div>
                </div>
                {idx < EDUCATIONAL_SUMMARY.length - 1 && (
                  <div className="flow-arrow">↓</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="result-actions">
          <button
            type="button"
            className={`retro-button-primary ${selectedBtnIndex === 0 ? 'active' : ''}`}
            onMouseEnter={() => {
              if (selectedBtnIndex !== 0) {
                setSelectedBtnIndex(0);
                playCursorSound();
              }
            }}
            onClick={() => {
              playSelectSound();
              onPlayAgain();
            }}
          >
            <span className="menu-cursor">{selectedBtnIndex === 0 ? '▶' : '\u00A0'}</span>
            <span>MAIN LAGI</span>
          </button>

          <button
            type="button"
            className={`retro-button-secondary ${selectedBtnIndex === 1 ? 'active' : ''}`}
            onMouseEnter={() => {
              if (selectedBtnIndex !== 1) {
                setSelectedBtnIndex(1);
                playCursorSound();
              }
            }}
            onClick={() => {
              playSelectSound();
              onReturnToTitle();
            }}
          >
            <span className="menu-cursor">{selectedBtnIndex === 1 ? '▶' : '\u00A0'}</span>
            <span>KEMBALI KE MENU UTAMA</span>
          </button>
        </div>
      </div>
    </div>
  );
}
