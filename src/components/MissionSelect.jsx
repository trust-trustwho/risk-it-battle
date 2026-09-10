import React, { useState, useEffect } from 'react';
import { MISSIONS } from '../game/missions';
import { playCursorSound, playSelectSound, playWrongSound } from '../game/soundFx';

/**
 * MissionSelect - Layar Pemilihan Misi Bergaya JRPG Quest Cartridge Klasik
 * - Menampilkan 5 misi berurutan dengan indikator TERBUKA / TERKUNCI / SELESAI
 * - Menampilkan Skor Terbaik & Peringkat untuk misi yang sudah tuntas
 * - Status Pemain: ANALIS RISIKO, Status Penyelesaian Misi
 * - Navigasi keyboard penuh (Arrow Up/Down, Enter, ESC) & mouse
 * - Opsi Reset Progres dengan dialog konfirmasi retro
 */
export default function MissionSelect({
  progress,
  onSelectMission,
  onReturnToTitle,
  onResetProgress,
  onViewCampaignResult,
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetConfirmChoice, setResetConfirmChoice] = useState(1); // 0 = YA, 1 = TIDAK

  const unlocked = progress.unlockedMissions || [1];
  const completed = progress.completedMissions || [];
  const stats = progress.missionStats || {};
  const allCompleted = [1, 2, 3, 4, 5].every((id) => completed.includes(id));

  // Keyboard navigation
  useEffect(() => {
    if (showResetModal) {
      const handleModalKeyDown = (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          e.preventDefault();
          setResetConfirmChoice((prev) => (prev === 0 ? 1 : 0));
          playCursorSound();
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (resetConfirmChoice === 0) {
            playSelectSound();
            onResetProgress();
            setShowResetModal(false);
          } else {
            playSelectSound();
            setShowResetModal(false);
          }
        } else if (e.key === 'Escape') {
          e.preventDefault();
          setShowResetModal(false);
        }
      };
      window.addEventListener('keydown', handleModalKeyDown);
      return () => window.removeEventListener('keydown', handleModalKeyDown);
    }

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : MISSIONS.length - 1));
        playCursorSound();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < MISSIONS.length - 1 ? prev + 1 : 0));
        playCursorSound();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleChoose(selectedIndex);
      } else if (e.key === 'Escape' || e.key === 'Backspace') {
        e.preventDefault();
        playSelectSound();
        onReturnToTitle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, showResetModal, resetConfirmChoice, unlocked, onResetProgress, onReturnToTitle]);

  const handleChoose = (idx) => {
    const mission = MISSIONS[idx];
    const isUnlocked = unlocked.includes(mission.id);

    if (isUnlocked) {
      playSelectSound();
      onSelectMission(mission.id);
    } else {
      playWrongSound();
    }
  };

  const handleHover = (idx) => {
    if (showResetModal) return;
    if (selectedIndex !== idx) {
      setSelectedIndex(idx);
      playCursorSound();
    }
  };

  return (
    <div className="mission-select-screen">
      {/* Header Panel Quest */}
      <header className="mission-select-header">
        <div className="header-title-row">
          <div className="retro-badge">PAPAN TUGAS ANALIS</div>
          <h1 className="mission-select-title">PILIH MISI</h1>
        </div>

        <div className="player-summary-badge">
          <span className="player-role">ANALIS RISIKO</span>
          <span className="player-stat-item completion-stat">
            SELESAI: {completed.length}/5
          </span>
        </div>
      </header>

      {/* Cartridge List Misi Bergaya JRPG Klasik */}
      <div className="mission-list-container">
        {MISSIONS.map((m, idx) => {
          const isSelected = selectedIndex === idx;
          const isUnlocked = unlocked.includes(m.id);
          const isCompleted = completed.includes(m.id);
          const missionStat = stats[m.id];

          return (
            <div
              key={m.id}
              className={`mission-entry-cartridge ${
                isSelected ? 'active' : ''
              } ${!isUnlocked ? 'locked' : ''} ${
                isCompleted ? 'completed' : ''
              }`}
              onMouseEnter={() => handleHover(idx)}
              onClick={() => handleChoose(idx)}
              role="button"
              tabIndex={0}
            >
              {/* Sisi Kiri: Kursor, Nomor Misi & Ikon Status */}
              <div className="cartridge-left">
                <span className="menu-cursor">{isSelected ? '▶' : '\u00A0'}</span>
                <span className="cartridge-number">MISI {m.number}</span>
                {m.isFinal && <span className="final-boss-tag">FINAL</span>}
              </div>

              {/* Sisi Tengah: Judul Misi, Subtitle & Nama Musuh */}
              <div className="cartridge-middle">
                <div className="cartridge-title">{m.title}</div>
                <div className="cartridge-subtitle">{m.subtitle}</div>
                <div className="cartridge-enemy">
                  {isUnlocked ? (
                    <span>Lawan: <strong className="enemy-name-highlight">{m.enemy.name}</strong> (Lv. {m.enemy.level})</span>
                  ) : (
                    <span className="text-locked">Terkunci · Selesaikan Misi Sebelumnya</span>
                  )}
                </div>
              </div>

              {/* Sisi Kanan: Status & Skor Terbaik */}
              <div className="cartridge-right">
                {isCompleted ? (
                  <div className="cartridge-status-box completed-box">
                    <span className="status-label-badge status-done">SELESAI</span>
                    {missionStat && (
                      <div className="score-summary-row">
                        <span className="mini-score">SKOR {missionStat.bestScore}</span>
                        <span className="mini-rank">{missionStat.bestRank}</span>
                      </div>
                    )}
                  </div>
                ) : isUnlocked ? (
                  <div className="cartridge-status-box unlocked-box">
                    <span className="status-label-badge status-open">TERBUKA</span>
                    <span className="play-hint">SIAP DIJALANKAN</span>
                  </div>
                ) : (
                  <div className="cartridge-status-box locked-box">
                    <span className="status-label-badge status-lock">TERKUNCI</span>
                    <span className="lock-icon">🔒</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Navigasi & Aksi Tambahan */}
      <footer className="mission-select-footer">
        <div className="footer-left-actions">
          <button
            type="button"
            className="retro-button-secondary"
            onClick={onReturnToTitle}
          >
            <span className="menu-cursor">◀</span>
            <span>MENU UTAMA</span>
          </button>

          <button
            type="button"
            className="retro-button-danger"
            onClick={() => {
              playSelectSound();
              setShowResetModal(true);
            }}
          >
            <span>RESET PROGRES</span>
          </button>
        </div>

        <div className="footer-right-actions">
          {allCompleted && (
            <button
              type="button"
              className="retro-button-gold"
              onClick={onViewCampaignResult}
            >
              <span className="menu-cursor">★</span>
              <span>RINGKASAN CAMPAIGN</span>
            </button>
          )}
        </div>
      </footer>

      {/* Dialog Konfirmasi Reset Progres Retro */}
      {showResetModal && (
        <div className="how-to-play-modal-backdrop" onClick={() => setShowResetModal(false)}>
          <div className="retro-dialog-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>KONFIRMASI RESET</h2>
            </div>
            <div className="dialog-content">
              <p className="warning-text">⚠️ PERINGATAN</p>
              <p>
                Apakah kamu yakin ingin mereset seluruh progres kampanye?<br />
                Misi yang terbuka, rekor skor, dan penemuan RiskDex akan kembali ke awal.
              </p>
            </div>
            <div className="dialog-actions-row">
              <button
                type="button"
                className={`retro-button-danger ${resetConfirmChoice === 0 ? 'active' : ''}`}
                onMouseEnter={() => setResetConfirmChoice(0)}
                onClick={() => {
                  playSelectSound();
                  onResetProgress();
                  setShowResetModal(false);
                }}
              >
                <span className="menu-cursor">{resetConfirmChoice === 0 ? '▶' : '\u00A0'}</span>
                <span>YA, RESET</span>
              </button>

              <button
                type="button"
                className={`retro-button-primary ${resetConfirmChoice === 1 ? 'active' : ''}`}
                onMouseEnter={() => setResetConfirmChoice(1)}
                onClick={() => {
                  playSelectSound();
                  setShowResetModal(false);
                }}
              >
                <span className="menu-cursor">{resetConfirmChoice === 1 ? '▶' : '\u00A0'}</span>
                <span>BATAL</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
