import React, { useState, useEffect } from 'react';
import { isSoundEnabled, toggleSound, playCursorSound, playSelectSound } from '../game/soundFx';
import BgmVolumeSlider from './BgmVolumeSlider';

/**
 * BattleSettingsDropdown - Menu Pengaturan Minimalis Retro JRPG untuk Layar Pertarungan
 * Opsi:
 * 1. SUARA (NYALA / MATI)
 * 2. CRT (NYALA / MATI)
 * 3. ULANGI MISI (Konfirmasi: YA / TIDAK, default TIDAK)
 * 4. KEMBALI KE BERANDA (Konfirmasi: YA / TIDAK, default TIDAK)
 */
export default function BattleSettingsDropdown({
  isOpen,
  onToggleOpen,
  onClose,
  isDisabled = false,
  crtEnabled,
  onToggleCrt,
  onRestartMission,
  onReturnToHome,
}) {
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0); // 0: SUARA, 1: VOLUME BGM, 2: CRT, 3: ULANGI, 4: BERANDA
  const [confirmMode, setConfirmMode] = useState(null); // null | 'restart' | 'home'
  const [confirmChoice, setConfirmChoice] = useState(1); // 0: YA, 1: TIDAK (default TIDAK)
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  // Sinkronisasi status audio lokal
  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, [isOpen]);

  // Reset pilihan ketika menu dibuka/ditutup
  useEffect(() => {
    if (isOpen) {
      setSelectedMenuIndex(0);
      setConfirmMode(null);
      setConfirmChoice(1); // Default TIDAK
    }
  }, [isOpen]);

  // Global Keyboard Listener (ESC untuk buka/tutup, Panah & Enter untuk navigasi)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Tombol ESC: Buka/Tutup pengaturan
      if (e.key === 'Escape') {
        e.preventDefault();
        if (isDisabled) return;

        if (!isOpen) {
          playSelectSound();
          onToggleOpen();
        } else {
          if (confirmMode) {
            // Jika dalam mode konfirmasi, batalkan ke menu utama pengaturan
            playSelectSound();
            setConfirmMode(null);
            setConfirmChoice(1);
          } else {
            playSelectSound();
            onClose();
          }
        }
        return;
      }

      if (!isOpen) return;

      // Navigasi saat dalam Mode Konfirmasi
      if (confirmMode) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          if (confirmChoice !== 0) {
            setConfirmChoice(0); // YA
            playCursorSound();
          }
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          if (confirmChoice !== 1) {
            setConfirmChoice(1); // TIDAK
            playCursorSound();
          }
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          executeConfirmChoice(confirmChoice);
        }
        return;
      }

      // Navigasi Menu Pengaturan Utama
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedMenuIndex((prev) => (prev > 0 ? prev - 1 : 4));
        playCursorSound();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedMenuIndex((prev) => (prev < 4 ? prev + 1 : 0));
        playCursorSound();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        executeMenuItem(selectedMenuIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, confirmMode, confirmChoice, selectedMenuIndex, isDisabled, onToggleOpen, onClose]);

  // Eksekusi pilihan menu utama
  const executeMenuItem = (index) => {
    playSelectSound();
    if (index === 0) {
      // Toggle Suara
      const next = toggleSound();
      setSoundOn(next);
    } else if (index === 1) {
      // Volume BGM (aktif)
    } else if (index === 2) {
      // Toggle CRT
      onToggleCrt();
    } else if (index === 3) {
      // Buka konfirmasi Ulangi Misi
      setConfirmMode('restart');
      setConfirmChoice(1); // Default TIDAK
    } else if (index === 4) {
      // Buka konfirmasi Kembali ke Beranda
      setConfirmMode('home');
      setConfirmChoice(1); // Default TIDAK
    }
  };

  // Eksekusi pilihan konfirmasi (YA / TIDAK)
  const executeConfirmChoice = (choice) => {
    playSelectSound();
    if (choice === 0) {
      // YA
      if (confirmMode === 'restart') {
        setConfirmMode(null);
        onClose();
        onRestartMission();
      } else if (confirmMode === 'home') {
        setConfirmMode(null);
        onClose();
        onReturnToHome();
      }
    } else {
      // TIDAK (Batalkan konfirmasi, kembali ke menu pengaturan)
      setConfirmMode(null);
      setConfirmChoice(1);
    }
  };

  return (
    <div className="battle-settings-wrapper">
      {/* Tombol Gear Minimalis Retro */}
      <button
        type="button"
        className={`hud-settings-btn ${isOpen ? 'active' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          if (!isDisabled) {
            playSelectSound();
            onToggleOpen();
          }
        }}
        disabled={isDisabled}
        title={isDisabled ? 'Animasi sedang berlangsung' : 'Pengaturan (ESC)'}
        aria-label="Pengaturan"
        aria-expanded={isOpen}
      >
        <svg
          className="pixel-gear-icon"
          width="15"
          height="15"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
        >
          {/* Pixel-art gear pattern */}
          <path d="M6 0h4v2h1v1h1v1h2v4h-2v1h-1v1h-1v2H6v-2H5v-1H4v-1H2V6h2V5h1V4h1V0zm-1 5H4v6h2v1h4v-1h2V5h-2V4H6v1H5zm2 2h2v2H7V7z" />
        </svg>
      </button>

      {/* Backdrop penangkap klik di luar dropdown */}
      {isOpen && (
        <div
          className="settings-click-outside-catcher"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            playSelectSound();
            onClose();
          }}
          aria-hidden="true"
        />
      )}

      {/* Dropdown Menu Pengaturan Retro */}
      {isOpen && (
        <div
          className="battle-settings-dropdown"
          onClick={(e) => e.stopPropagation()}
          role="menu"
          aria-label="Menu Pengaturan Pertarungan"
        >
          {!confirmMode ? (
            /* TAMPILAN MENU UTAMA */
            <>
              <div className="settings-menu-header">
                <span className="settings-header-gem">◆</span>
                <span className="settings-header-title">PENGATURAN</span>
              </div>

              <div className="settings-menu-body">
                {/* 1. SUARA */}
                <button
                  type="button"
                  className={`settings-menu-item ${selectedMenuIndex === 0 ? 'active' : ''}`}
                  onMouseEnter={() => {
                    if (selectedMenuIndex !== 0) {
                      setSelectedMenuIndex(0);
                      playCursorSound();
                    }
                  }}
                  onClick={() => executeMenuItem(0)}
                  role="menuitem"
                >
                  <span className="menu-cursor">{selectedMenuIndex === 0 ? '▶' : '\u00A0'}</span>
                  <span className="item-label">SUARA</span>
                  <span className={`toggle-state-badge ${soundOn ? 'state-on' : 'state-off'}`}>
                    <span className="state-dot">{soundOn ? '●' : '○'}</span>
                    <span>{soundOn ? 'NYALA' : 'MATI'}</span>
                  </span>
                </button>

                {/* 2. VOLUME BGM */}
                <BgmVolumeSlider
                  isActive={selectedMenuIndex === 1}
                  onActivate={() => {
                    if (selectedMenuIndex !== 1) {
                      setSelectedMenuIndex(1);
                      playCursorSound();
                    }
                  }}
                  onNavigateUp={() => {
                    setSelectedMenuIndex(0);
                    playCursorSound();
                  }}
                  onNavigateDown={() => {
                    setSelectedMenuIndex(2);
                    playCursorSound();
                  }}
                  id="battle-bgm-volume-slider"
                />

                {/* 3. CRT */}
                <button
                  type="button"
                  className={`settings-menu-item ${selectedMenuIndex === 2 ? 'active' : ''}`}
                  onMouseEnter={() => {
                    if (selectedMenuIndex !== 2) {
                      setSelectedMenuIndex(2);
                      playCursorSound();
                    }
                  }}
                  onClick={() => executeMenuItem(2)}
                  role="menuitem"
                >
                  <span className="menu-cursor">{selectedMenuIndex === 2 ? '▶' : '\u00A0'}</span>
                  <span className="item-label">CRT</span>
                  <span className={`toggle-state-badge ${crtEnabled ? 'state-on' : 'state-off'}`}>
                    <span className="state-dot">{crtEnabled ? '●' : '○'}</span>
                    <span>{crtEnabled ? 'NYALA' : 'MATI'}</span>
                  </span>
                </button>

                {/* Pemisah Garis Pixel */}
                <div className="settings-divider" />

                {/* 4. ULANGI MISI */}
                <button
                  type="button"
                  className={`settings-menu-item ${selectedMenuIndex === 3 ? 'active' : ''}`}
                  onMouseEnter={() => {
                    if (selectedMenuIndex !== 3) {
                      setSelectedMenuIndex(3);
                      playCursorSound();
                    }
                  }}
                  onClick={() => executeMenuItem(3)}
                  role="menuitem"
                >
                  <span className="menu-cursor">{selectedMenuIndex === 3 ? '▶' : '\u00A0'}</span>
                  <span className="item-label">ULANGI MISI</span>
                </button>

                {/* 5. KEMBALI KE BERANDA */}
                <button
                  type="button"
                  className={`settings-menu-item ${selectedMenuIndex === 4 ? 'active' : ''}`}
                  onMouseEnter={() => {
                    if (selectedMenuIndex !== 4) {
                      setSelectedMenuIndex(4);
                      playCursorSound();
                    }
                  }}
                  onClick={() => executeMenuItem(4)}
                  role="menuitem"
                >
                  <span className="menu-cursor">{selectedMenuIndex === 4 ? '▶' : '\u00A0'}</span>
                  <span className="item-label">KEMBALI KE BERANDA</span>
                </button>
              </div>
            </>
          ) : (
            /* TAMPILAN KONFIRMASI (ULANGI MISI / KEMBALI KE BERANDA) */
            <div className="settings-confirm-panel">
              <div className="settings-menu-header confirm-header">
                <span className="settings-header-gem">⚠</span>
                <span className="settings-header-title">
                  {confirmMode === 'restart' ? 'ULANGI MISI' : 'KEMBALI KE BERANDA'}
                </span>
              </div>

              <div className="confirm-body">
                <p className="confirm-prompt-text">
                  {confirmMode === 'restart'
                    ? 'Ulangi misi dari awal?'
                    : 'Kembali ke beranda?'}
                </p>

                {confirmMode === 'home' && (
                  <p className="confirm-sub-text">
                    Progres pertarungan saat ini akan hilang.
                  </p>
                )}

                <div className="confirm-actions-row">
                  {/* Pilihan YA */}
                  <button
                    type="button"
                    className={`confirm-action-btn ${confirmChoice === 0 ? 'active' : ''}`}
                    onMouseEnter={() => {
                      if (confirmChoice !== 0) {
                        setConfirmChoice(0);
                        playCursorSound();
                      }
                    }}
                    onClick={() => executeConfirmChoice(0)}
                  >
                    <span className="menu-cursor">{confirmChoice === 0 ? '▶' : '\u00A0'}</span>
                    <span>YA</span>
                  </button>

                  {/* Pilihan TIDAK (Default) */}
                  <button
                    type="button"
                    className={`confirm-action-btn ${confirmChoice === 1 ? 'active' : ''}`}
                    onMouseEnter={() => {
                      if (confirmChoice !== 1) {
                        setConfirmChoice(1);
                        playCursorSound();
                      }
                    }}
                    onClick={() => executeConfirmChoice(1)}
                  >
                    <span className="menu-cursor">{confirmChoice === 1 ? '▶' : '\u00A0'}</span>
                    <span>TIDAK</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
