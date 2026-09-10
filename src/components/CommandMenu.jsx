import React, { useState, useEffect } from 'react';
import { COMMAND_LIST } from '../game/battleData';
import { playCursorSound, playSelectSound } from '../game/soundFx';

/**
 * CommandMenu - Menu pertarungan dinamis khas JRPG GBA
 * Mendukung:
 * - Mode 'grid4': grid 2x2 klasik (default)
 * - Mode 'twoChoice': 2 tombol horizontal/vertikal (misal KEUNGGULAN vs KETERBATASAN pada Misi 04)
 * - Navigasi keyboard (panah + Enter / Space) dan mouse hover & klik.
 */
export default function CommandMenu({
  commands = COMMAND_LIST,
  commandMode = 'grid4',
  onSelectCommand,
  disabled = false,
  playerName = 'ANALIS RISIKO',
  promptText,
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Reset indeks saat daftar perintah berubah
  useEffect(() => {
    setSelectedIndex(0);
  }, [commands]);

  // Navigasi Keyboard
  useEffect(() => {
    if (disabled) return;

    const count = commands.length;
    if (count === 0) return;

    const handleKeyDown = (e) => {
      let nextIndex = selectedIndex;

      if (count === 2 || commandMode === 'twoChoice') {
        // Mode 2 Perintah: Panah Kiri/Atas -> 0, Kanan/Bawah -> 1
        switch (e.key) {
          case 'ArrowLeft':
          case 'ArrowUp':
            nextIndex = 0;
            break;
          case 'ArrowRight':
          case 'ArrowDown':
            nextIndex = 1;
            break;
          case 'Enter':
          case ' ':
            e.preventDefault();
            handleConfirm(selectedIndex);
            return;
          default:
            return;
        }
      } else {
        // Mode Grid 4 (2x2)
        switch (e.key) {
          case 'ArrowRight':
            if (selectedIndex % 2 === 0 && selectedIndex + 1 < count) {
              nextIndex = selectedIndex + 1;
            }
            break;
          case 'ArrowLeft':
            if (selectedIndex % 2 === 1) {
              nextIndex = selectedIndex - 1;
            }
            break;
          case 'ArrowDown':
            if (selectedIndex + 2 < count) {
              nextIndex = selectedIndex + 2;
            }
            break;
          case 'ArrowUp':
            if (selectedIndex >= 2) {
              nextIndex = selectedIndex - 2;
            }
            break;
          case 'Enter':
          case ' ':
            e.preventDefault();
            handleConfirm(selectedIndex);
            return;
          default:
            return;
        }
      }

      if (nextIndex !== selectedIndex && nextIndex < count) {
        e.preventDefault();
        setSelectedIndex(nextIndex);
        playCursorSound();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, disabled, commands, commandMode]);

  const handleConfirm = (index) => {
    if (disabled) return;
    playSelectSound();
    const command = commands[index];
    if (command && onSelectCommand) {
      onSelectCommand(command.id);
    }
  };

  const handleHover = (index) => {
    if (disabled) return;
    if (selectedIndex !== index) {
      setSelectedIndex(index);
      playCursorSound();
    }
  };

  const defaultPrompt = (
    <p className="command-prompt-text">
      Apa yang akan dilakukan <span className="highlight-player">{playerName}</span>?
    </p>
  );

  return (
    <div className={`command-bar ${commandMode === 'twoChoice' ? 'command-bar-two-choice' : ''} ${disabled ? 'command-bar-disabled' : ''}`}>
      {/* Bagian Kiri: Pertanyaan aksi */}
      <div className="command-prompt-box">
        {promptText ? <p className="command-prompt-text">{promptText}</p> : defaultPrompt}
      </div>

      {/* Bagian Kanan: Grid/Pilihan Perintah */}
      <div className={`command-grid-box ${commandMode === 'twoChoice' ? 'two-choice-box' : ''}`}>
        {commands.map((cmd, idx) => {
          const isSelected = selectedIndex === idx;
          return (
            <button
              key={cmd.id}
              type="button"
              className={`command-button ${isSelected ? 'selected' : ''} ${commandMode === 'twoChoice' ? 'two-choice-button' : ''}`}
              disabled={disabled}
              onMouseEnter={() => handleHover(idx)}
              onClick={() => handleConfirm(idx)}
            >
              <span className="command-cursor">{isSelected ? '▶' : '\u00A0'}</span>
              <span className="command-label">{cmd.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
