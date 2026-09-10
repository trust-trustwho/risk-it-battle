import React, { useState, useEffect } from 'react';
import { playCursorSound, playSelectSound } from '../game/soundFx';
import CreditsScene from './CreditsScene';

/**
 * StartScreen - Layar Beranda / Title Screen Retro JRPG yang Dipoles & Seimbang
 * Hirarki Visual:
 * 1. Judul Utama: RISK IT BATTLE
 * 2. Subtitle: SIMULASI MANAJEMEN RISIKO TI
 * 3. Badge Kecil: 5 MISI · EDISI EDUKASI
 * 4. Menu Box: MULAI MISI, MODE PRESENTASI, RISKDEX, CARA BERMAIN
 * 5. Identitas Pendukung: PERAN: ANALIS RISIKO
 * 6. Footer Tombol: TENTANG & KREDIT
 */
export default function StartScreen({
  onStartMissions,
  onStartPresentation,
  onOpenRiskDex,
  isOpeningArrival = false,
  progress,
  onResetProgress,
  onViewCampaignResult,
}) {
  const [selectedOption, setSelectedOption] = useState(0); // 0 = MULAI, 1 = PRESENTASI, 2 = RISKDEX, 3 = CARA BERMAIN
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetConfirmChoice, setResetConfirmChoice] = useState(1); // 0 = YA, 1 = BATAL
  const [isTransitioning, setIsTransitioning] = useState(false);

  const completed = progress?.completedMissions || [];
  const allCompleted = [1, 2, 3, 4, 5].every((id) => completed.includes(id));
  const hasProgress = completed.length > 0 || (progress?.discoveredRiskDex && progress.discoveredRiskDex.length > 1);

  // Kontrol Keyboard
  useEffect(() => {
    if (isTransitioning) return;

    // Jika modal konfirmasi reset sedang terbuka
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
            if (onResetProgress) onResetProgress();
            setShowResetModal(false);
          } else {
            playSelectSound();
            setShowResetModal(false);
          }
        } else if (e.key === 'Escape') {
          e.preventDefault();
          playSelectSound();
          setShowResetModal(false);
        }
      };
      window.addEventListener('keydown', handleModalKeyDown);
      return () => window.removeEventListener('keydown', handleModalKeyDown);
    }

    const handleKeyDown = (e) => {
      // Jika modal kredit sedang terbuka, tangani penutupan
      if (showCredits) {
        if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          playSelectSound();
          setShowCredits(false);
        }
        return;
      }

      // Jika modal cara bermain sedang terbuka, tangani penutupan
      if (showHowToPlay) {
        if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          playSelectSound();
          setShowHowToPlay(false);
        }
        return;
      }

      // Navigasi menu utama
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedOption((prev) => (prev > 0 ? prev - 1 : 3));
        playCursorSound();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedOption((prev) => (prev < 3 ? prev + 1 : 0));
        playCursorSound();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleConfirm(selectedOption);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOption, showHowToPlay, showCredits, showResetModal, resetConfirmChoice, isTransitioning, onResetProgress]);

  const handleConfirm = (option) => {
    playSelectSound();
    if (option === 0) {
      // Transisi retro menuju Pilih Misi
      setIsTransitioning(true);
      setTimeout(() => {
        onStartMissions();
      }, 500);
    } else if (option === 1) {
      if (onStartPresentation) onStartPresentation();
    } else if (option === 2) {
      onOpenRiskDex();
    } else {
      setShowHowToPlay(true);
    }
  };

  const handleHover = (option) => {
    if (showHowToPlay || showCredits || isTransitioning) return;
    if (selectedOption !== option) {
      setSelectedOption(option);
      playCursorSound();
    }
  };

  return (
    <div className={`title-screen ${isTransitioning ? 'battle-shutter-transition' : ''} ${isOpeningArrival ? 'title-opening-arrival' : ''}`}>
      {/* Ornamen Latar Pixel Halus */}
      <div className="title-grid-bg" />
      <div className="title-ambient-glow" aria-hidden="true" />

      {/* 1 & 2 & 3. Blok Judul Utama yang Bernapas & Seimbang */}
      <header className="title-header-box">
        <div className="title-badge-pill">
          <span className="badge-sparkle">★</span>
          <span className="badge-text">5 MISI · EDISI EDUKASI</span>
          <span className="badge-sparkle">★</span>
        </div>

        <h1 className="title-main">RISK IT BATTLE</h1>

        <p className="title-subtitle">SIMULASI MANAJEMEN RISIKO TI</p>
      </header>

      {/* 4 & 5. Bagian Tengah: Menu Box JRPG Klasik & Badge Identitas Peran */}
      <div className="title-center-content">
        <nav className="title-menu-box" role="menu" aria-label="Menu Utama">
          <button
            type="button"
            className={`title-menu-item ${selectedOption === 0 ? 'active' : ''}`}
            onMouseEnter={() => handleHover(0)}
            onClick={() => handleConfirm(0)}
            role="menuitem"
          >
            <span className="menu-cursor">{selectedOption === 0 ? '▶' : '\u00A0'}</span>
            <span className="menu-text">MULAI MISI</span>
          </button>

          <button
            type="button"
            className={`title-menu-item ${selectedOption === 1 ? 'active' : ''}`}
            onMouseEnter={() => handleHover(1)}
            onClick={() => handleConfirm(1)}
            role="menuitem"
          >
            <span className="menu-cursor">{selectedOption === 1 ? '▶' : '\u00A0'}</span>
            <span className="menu-text">MODE PRESENTASI</span>
            <span className="title-menu-tag">{allCompleted ? 'AKTIF ✓' : 'CHEAT'}</span>
          </button>

          <button
            type="button"
            className={`title-menu-item ${selectedOption === 2 ? 'active' : ''}`}
            onMouseEnter={() => handleHover(2)}
            onClick={() => handleConfirm(2)}
            role="menuitem"
          >
            <span className="menu-cursor">{selectedOption === 2 ? '▶' : '\u00A0'}</span>
            <span className="menu-text">RISKDEX</span>
          </button>

          <button
            type="button"
            className={`title-menu-item ${selectedOption === 3 ? 'active' : ''}`}
            onMouseEnter={() => handleHover(3)}
            onClick={() => handleConfirm(3)}
            role="menuitem"
          >
            <span className="menu-cursor">{selectedOption === 3 ? '▶' : '\u00A0'}</span>
            <span className="menu-text">CARA BERMAIN</span>
          </button>
        </nav>

        {/* 5. Identitas Pendukung Tunggal yang Bersih */}
        <div className="title-role-banner">
          <span className="role-gem">◆</span>
          <span className="role-text">PERAN: ANALIS RISIKO</span>
        </div>
      </div>

      {/* 6. Footer Tombol: Ringkasan Campaign, Reset Progres, Tentang & Kredit */}
      <footer className="title-footer-area">
        {allCompleted && (
          <button
            type="button"
            className="title-summary-btn"
            onClick={() => {
              playSelectSound();
              if (onViewCampaignResult) onViewCampaignResult();
            }}
            title="Lihat Ringkasan Penyelesaian Seluruh Kampanye"
          >
            <span className="summary-gem">★</span>
            <span>RINGKASAN CAMPAIGN</span>
          </button>
        )}

        {hasProgress && (
          <button
            type="button"
            className="title-reset-btn"
            onClick={() => {
              playSelectSound();
              setResetConfirmChoice(1);
              setShowResetModal(true);
            }}
            title="Reset Seluruh Progres Kampanye"
          >
            <span className="reset-gem">🔄</span>
            <span>RESET PROGRES</span>
          </button>
        )}

        <button
          type="button"
          className="title-credits-btn"
          onClick={() => {
            playSelectSound();
            setShowCredits(true);
          }}
          title="Lihat Tentang Website & Kredit Kelompok"
        >
          <span className="credits-gem">📜</span>
          <span>TENTANG & KREDIT</span>
        </button>
      </footer>

      {/* Modal Cara Bermain Retro yang Terstruktur & Rapi */}
      {showHowToPlay && (
        <div
          className="how-to-play-modal-backdrop"
          onClick={() => {
            playSelectSound();
            setShowHowToPlay(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="guide-modal-title"
        >
          <div className="how-to-play-card" onClick={(e) => e.stopPropagation()}>
            <header className="modal-header">
              <div className="modal-title-wrap">
                <span className="modal-title-tag">PANDUAN</span>
                <h2 id="guide-modal-title">PANDUAN ANALIS RISIKO</h2>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => {
                  playSelectSound();
                  setShowHowToPlay(false);
                }}
                aria-label="Tutup Panduan"
              >
                ✕
              </button>
            </header>

            <div className="modal-body-scroll">
              {/* Seksi 1: PERAN ANDA */}
              <section className="guide-section">
                <h3 className="section-title">
                  <span className="title-marker">01</span> PERAN ANDA
                </h3>
                <p className="section-desc">
                  Kamu berperan sebagai <strong>ANALIS RISIKO</strong> yang bertugas membantu organisasi menghadapi berbagai insiden TI.
                </p>
              </section>

              {/* Seksi 2: TUJUAN GAME */}
              <section className="guide-section">
                <h3 className="section-title">
                  <span className="title-marker">02</span> TUJUAN GAME
                </h3>
                <p className="section-desc">
                  Selesaikan <strong>5 misi edukasi</strong> untuk memahami best practice TI dan penerapan Risk IT.
                </p>
              </section>

              {/* Seksi 3: 5 MISI EDUKASI */}
              <section className="guide-section">
                <h3 className="section-title">
                  <span className="title-marker">03</span> 5 MISI EDUKASI
                </h3>
                <ul className="guide-bullet-list">
                  <li><span className="bullet">▸</span> <strong>Misi 01:</strong> Kenali perbedaan best practice</li>
                  <li><span className="bullet">▸</span> <strong>Misi 02:</strong> Penerapan alur Risk IT</li>
                  <li><span className="bullet">▸</span> <strong>Misi 03:</strong> Penerapan di berbagai sektor</li>
                  <li><span className="bullet">▸</span> <strong>Misi 04:</strong> Keunggulan dan keterbatasan</li>
                  <li><span className="bullet">▸</span> <strong>Misi 05:</strong> Final Boss pemilihan best practice</li>
                </ul>
              </section>

              {/* Seksi 4: MEKANIK PERTARUNGAN */}
              <section className="guide-section">
                <h3 className="section-title">
                  <span className="title-marker">04</span> MEKANIK PERTARUNGAN
                </h3>
                <ul className="guide-bullet-list">
                  <li><span className="bullet text-green">✓</span> <strong>Jawaban benar</strong> → menyerang musuh</li>
                  <li><span className="bullet text-red">✗</span> <strong>Jawaban salah</strong> → musuh menyerang balik</li>
                  <li><span className="bullet text-blue">★</span> <strong>Kurangi HP musuh</strong> untuk menang</li>
                </ul>
              </section>

              {/* Seksi 5: KONTROL */}
              <section className="guide-section">
                <h3 className="section-title">
                  <span className="title-marker">05</span> KONTROL
                </h3>
                <div className="controls-summary-grid">
                  <div className="ctrl-box">
                    <span className="ctrl-key">↑ ↓ ← →</span>
                    <span className="ctrl-label">Pilih menu</span>
                  </div>
                  <div className="ctrl-box">
                    <span className="ctrl-key">ENTER / SPASI</span>
                    <span className="ctrl-label">Konfirmasi / lanjutkan</span>
                  </div>
                  <div className="ctrl-box">
                    <span className="ctrl-key">MOUSE</span>
                    <span className="ctrl-label">Klik menu</span>
                  </div>
                </div>
              </section>
            </div>

            <footer className="modal-footer">
              <button
                type="button"
                className="retro-button-primary modal-action-btn"
                onClick={() => {
                  playSelectSound();
                  setShowHowToPlay(false);
                }}
              >
                <span className="menu-cursor">▶</span>
                <span>TUTUP</span>
              </button>
            </footer>
          </div>
        </div>
      )}

      {/* Cinematic Scrolling Credit Scene */}
      {showCredits && (
        <CreditsScene onClose={() => setShowCredits(false)} />
      )}

      {/* Dialog Konfirmasi Reset Progres Retro */}
      {showResetModal && (
        <div
          className="how-to-play-modal-backdrop"
          onClick={() => {
            playSelectSound();
            setShowResetModal(false);
          }}
          role="dialog"
          aria-modal="true"
        >
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
                  if (onResetProgress) onResetProgress();
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
