import React, { useState, useEffect } from 'react';
import { playCursorSound, playSelectSound } from '../game/soundFx';

/**
 * ReturnFloorModal - Modal Konfirmasi Retro untuk Meninggalkan Pertarungan & Kembali ke Lantai
 * 
 * Sesuai spesifikasi:
 * - Judul: KEMBALI KE LANTAI
 * - Teks konfirmasi: "Keluar dari battle ini dan kembali ke lantai?"
 * - Pilihan: YA (0) / TIDAK (1)
 * - Default: TIDAK (1)
 * - Input Isolation: Mencegah kebocoran tombol ke dialog, perintah bertarung, dan settings.
 * - ESC hanya membatalkan modal ini (tidak membuka battle settings).
 */
export default function ReturnFloorModal({
  isOpen,
  onConfirm,
  onCancel,
}) {
  const [choice, setChoice] = useState(1); // 0: YA, 1: TIDAK (Default TIDAK)

  // Reset pilihan ke default TIDAK setiap kali modal dibuka
  useEffect(() => {
    if (isOpen) {
      setChoice(1);
    }
  }, [isOpen]);

  // Isolasi input keyboard ketat (Capture-phase listener)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      // 1. Navigasi Pilihan (Panah Kiri / Atas -> YA; Panah Kanan / Bawah -> TIDAK)
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        e.stopPropagation();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        if (choice !== 0) {
          setChoice(0);
          playCursorSound();
        }
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        e.stopPropagation();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        if (choice !== 1) {
          setChoice(1);
          playCursorSound();
        }
        return;
      }

      // 2. Eksekusi Pilihan (Enter / Space)
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        playSelectSound();
        if (choice === 0) {
          onConfirm();
        } else {
          onCancel();
        }
        return;
      }

      // 3. Tombol Escape: Tutup modal saja (batal/TIDAK), jangan buka settings!
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        playSelectSound();
        onCancel();
        return;
      }

      // 4. Tangkap dan blokir tombol lainnya agar tidak tembus ke sistem pertarungan
      e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    };

    // Gunakan useCapture = true agar menangkap event sebelum listener komponen lain
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isOpen, choice, onConfirm, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="return-floor-backdrop"
      onClick={(e) => {
        e.stopPropagation();
        playSelectSound();
        onCancel();
      }}
      aria-hidden="true"
    >
      <div
        className="return-floor-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="return-floor-modal-title"
      >
        <div className="settings-menu-header confirm-header">
          <span className="settings-header-gem" aria-hidden="true">⚠</span>
          <span id="return-floor-modal-title" className="settings-header-title">
            KEMBALI KE LANTAI
          </span>
        </div>

        <div className="confirm-body">
          <p className="confirm-prompt-text">
            Keluar dari battle ini dan kembali ke lantai?
          </p>

          <div className="confirm-actions-row">
            {/* Pilihan YA (Index 0) */}
            <button
              type="button"
              className={`confirm-action-btn ${choice === 0 ? 'active' : ''}`}
              onMouseEnter={() => {
                if (choice !== 0) {
                  setChoice(0);
                  playCursorSound();
                }
              }}
              onClick={() => {
                playSelectSound();
                onConfirm();
              }}
              aria-label="Ya, kembali ke lantai"
            >
              <span className="menu-cursor" aria-hidden="true">
                {choice === 0 ? '▶' : '\u00A0'}
              </span>
              <span>YA</span>
            </button>

            {/* Pilihan TIDAK (Index 1, Default) */}
            <button
              type="button"
              className={`confirm-action-btn ${choice === 1 ? 'active' : ''}`}
              onMouseEnter={() => {
                if (choice !== 1) {
                  setChoice(1);
                  playCursorSound();
                }
              }}
              onClick={() => {
                playSelectSound();
                onCancel();
              }}
              aria-label="Tidak, lanjutkan pertarungan"
            >
              <span className="menu-cursor" aria-hidden="true">
                {choice === 1 ? '▶' : '\u00A0'}
              </span>
              <span>TIDAK</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
