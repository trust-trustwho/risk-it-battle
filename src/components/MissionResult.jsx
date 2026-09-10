import React, { useState, useEffect } from 'react';
import { playCursorSound, playSelectSound, playVictorySound } from '../game/soundFx';

/**
 * MissionResult - Layar Laporan Penyelesaian Misi Edukasi
 * Redesigned into a polished, elegant retro JRPG tactical debrief.
 * Menampilkan:
 * 1. Top Celebration / Status Bar (Misi Selesai, Level-up, Unlock)
 * 2. Mission Summary Dossier Bar (Misi & Insiden target)
 * 3. Performance Metric Cards (Skor, Akurasi, Benar, Salah)
 * 4. Rank Highlight Ribbon (Peringkat S/A/B/C/D dengan aksen warna retro)
 * 5. Educational Summary Debrief Panel (Tata letak rapi, bebas tabrakan teks)
 * 6. Action Buttons (Lanjut, Ulangi, Pilih Misi dengan cursor pixel)
 */
export default function MissionResult({
  resultData,
  newMissionUnlocked,
  onContinue,
  onFinishCampaign,
  onReplay,
  onViewCampaignResult,
  continueButtonLabel,
}) {
  const [selectedBtnIndex, setSelectedBtnIndex] = useState(0);

  const {
    missionId = 1,
    missionTitle = 'MISI',
    enemyName = 'RISIKO',
    score = 1000,
    correctAnswers = 4,
    wrongAnswers = 0,
    rank = 'PERINGKAT S',
    summary,
  } = resultData || {};

  const isFinalMission = missionId === 5;

  const totalAnswers = correctAnswers + wrongAnswers;
  const accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 100;

  // Ekstrak huruf peringkat (S, A, B, C, D) untuk tier styling
  const rankLetter = (rank.match(/[SABCD]/i) || ['A'])[0].toUpperCase();

  useEffect(() => {
    playVictorySound();
  }, []);

  // Daftar tombol aksi: Misi 5 hanya 1 tombol (SELESAIKAN CAMPAIGN), Misi 1-4 ada 2 tombol (KEMBALI KE LANTAI & ULANGI MISI)
  const buttonCount = isFinalMission ? 1 : 2;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isFinalMission) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          playSelectSound();
          if (onFinishCampaign) {
            onFinishCampaign();
          } else {
            onContinue();
          }
        }
        return;
      }

      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedBtnIndex((prev) => (prev > 0 ? prev - 1 : buttonCount - 1));
        playCursorSound();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedBtnIndex((prev) => (prev < buttonCount - 1 ? prev + 1 : 0));
        playCursorSound();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        playSelectSound();
        if (selectedBtnIndex === 0) {
          onContinue();
        } else if (selectedBtnIndex === 1) {
          onReplay();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedBtnIndex, isFinalMission, buttonCount, onContinue, onReplay, onFinishCampaign]);

  return (
    <div className="result-screen">
      <div className="result-container">
        {/* ===================================================================
            1. TOP CELEBRATION / STATUS BAR
            =================================================================== */}
        <header className="result-header">
          <div className="result-badge">
            <span className="badge-flair">◄</span>
            <span>LAPORAN EVALUASI MISI</span>
            <span className="badge-flair">►</span>
          </div>
          <h1 className="result-title">MISI SELESAI</h1>
        </header>

        {/* Pemberitahuan Misi Baru Terbuka */}
        {newMissionUnlocked && (
          <div className="unlock-banner" aria-live="assertive">
            <span className="unlock-icon">🔓</span>
            <span className="unlock-text">
              MISI BARU TERBUKA: <strong className="text-cyan">MISI 0{newMissionUnlocked}</strong>
            </span>
          </div>
        )}

        {/* ===================================================================
            2. MISSION SUMMARY HEADER (Dossier Bar)
            =================================================================== */}
        <div className="result-dossier-bar">
          <div className="dossier-col mission-col">
            <span className="dossier-badge">MISI 0{missionId}</span>
            <div className="dossier-data">
              <span className="dossier-label">MISI</span>
              <span className="dossier-val text-cyan">{missionTitle}</span>
            </div>
          </div>
          <div className="dossier-separator" aria-hidden="true"></div>
          <div className="dossier-col incident-col">
            <span className="dossier-badge badge-incident">TARGET</span>
            <div className="dossier-data">
              <span className="dossier-label">INSIDEN</span>
              <span className="dossier-val text-crimson">{enemyName}</span>
            </div>
          </div>
        </div>

        {/* ===================================================================
            3. PERFORMANCE STATS (4 Metric Cards)
            =================================================================== */}
        <div className="result-stats-grid">
          <div className="stat-metric-card stat-score">
            <span className="metric-label">SKOR AKHIR</span>
            <span className="metric-value text-gold">{score}</span>
          </div>
          <div className="stat-metric-card stat-accuracy">
            <span className="metric-label">AKURASI</span>
            <span className="metric-value text-cyan">{accuracy}%</span>
          </div>
          <div className="stat-metric-card stat-correct">
            <span className="metric-label">JAWABAN BENAR</span>
            <span className="metric-value text-green">{correctAnswers}</span>
          </div>
          <div className="stat-metric-card stat-wrong">
            <span className="metric-label">KESALAHAN</span>
            <span className="metric-value text-red">{wrongAnswers}</span>
          </div>
        </div>

        {/* ===================================================================
            4. RANK HIGHLIGHT (Prominent Evaluation Badge)
            =================================================================== */}
        <div className={`rank-highlight-card rank-tier-${rankLetter.toLowerCase()}`}>
          <div className="rank-title-row">
            <span className="rank-sparkle">✦</span>
            <span className="rank-title-text">HASIL EVALUASI</span>
            <span className="rank-sparkle">✦</span>
          </div>
          <div className="rank-badge-wrap">
            <span className="rank-badge-text">{rank}</span>
          </div>
        </div>

        {/* ===================================================================
            5. EDUCATIONAL SUMMARY PANEL (Debrief Dossier)
            =================================================================== */}
        {summary && (
          <section className="education-summary-card" aria-label="Ringkasan Edukasi Misi">
            <div className="education-header">
              <div className="education-header-tag">DEBRIEF MATERI</div>
              <h3 className="education-title">{summary.title || 'RINGKASAN EDUKASI'}</h3>
            </div>

            {summary.items && summary.items.length > 0 && (
              <div className="flow-list">
                {summary.items.map((item, idx) => {
                  const labelLower = (item.label || '').toLowerCase();
                  const isKeunggulan = labelLower.includes('keunggulan');
                  const isTantangan = labelLower.includes('tantangan');
                  const tagType = isKeunggulan ? 'tag-pro' : isTantangan ? 'tag-con' : 'tag-neutral';

                  return (
                    <div key={idx} className="flow-item">
                      <span className={`flow-step ${tagType}`}>{item.label}</span>
                      <span className="flow-desc">{item.desc}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {summary.academicNote && (
              <div className="academic-note-box">
                <div className="academic-note-title">
                  📌 {summary.academicNote.title}
                </div>
                <div className="academic-note-body">
                  {summary.academicNote.body}
                </div>
              </div>
            )}
          </section>
        )}

        {/* ===================================================================
            6. ACTION BUTTONS (Keyboard & Mouse Navigable)
            =================================================================== */}
        {isFinalMission ? (
          <div className="result-actions final-campaign-actions">
            <button
              type="button"
              className="retro-button-primary final-campaign-btn active"
              onClick={() => {
                playSelectSound();
                if (onFinishCampaign) {
                  onFinishCampaign();
                } else {
                  onContinue();
                }
              }}
            >
              <span className="menu-cursor">▶</span>
              <span>SELESAIKAN CAMPAIGN</span>
            </button>
          </div>
        ) : (
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
                onContinue();
              }}
            >
              <span className="menu-cursor">{selectedBtnIndex === 0 ? '▶' : '\u00A0'}</span>
              <span>{continueButtonLabel || 'LANJUT'}</span>
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
                onReplay();
              }}
            >
              <span className="menu-cursor">{selectedBtnIndex === 1 ? '▶' : '\u00A0'}</span>
              <span>ULANGI MISI</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
