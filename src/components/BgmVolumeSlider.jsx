import React, { useState, useEffect, useRef } from 'react';
import { bgmManager } from '../audio/bgmManager';
import { playCursorSound } from '../game/soundFx';

/**
 * BgmVolumeSlider - Kontrol Slider Volume BGM Retro Pixel Art Bersama
 * Digunakan pada Exploration Settings dan Battle Settings.
 * Single source of truth: bgmManager (bgmVolume).
 */
export default function BgmVolumeSlider({
  isActive = false,
  onActivate,
  onNavigateUp,
  onNavigateDown,
  className = '',
  id = 'bgm-volume-slider',
}) {
  const [volumePercent, setVolumePercent] = useState(() =>
    Math.round((bgmManager.getState().bgmVolume ?? 0.3) * 100)
  );
  const sliderRef = useRef(null);

  // Berlangganan perubahan state dari bgmManager realtime
  useEffect(() => {
    const unsubscribe = bgmManager.subscribe((state) => {
      const canonicalVol = state.bgmVolume ?? state.volume ?? 0.3;
      setVolumePercent(Math.round(canonicalVol * 100));
    });
    return () => unsubscribe();
  }, []);

  // Fokus elemen slider ketika item ini aktif / dipilih via navigasi keyboard
  useEffect(() => {
    if (isActive && sliderRef.current) {
      sliderRef.current.focus();
    }
  }, [isActive]);

  const applyVolumeChange = (newPercent) => {
    const clamped = Math.max(0, Math.min(100, Math.round(newPercent)));
    setVolumePercent(clamped);
    bgmManager.setVolume(clamped / 100);
  };

  const handleSliderInput = (e) => {
    applyVolumeChange(Number(e.target.value));
  };

  const handleKeyDown = (e) => {
    // Tangani 4 tombol arah penting dan cegah propagasi
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      e.stopPropagation();
      if (onNavigateUp) onNavigateUp();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      e.stopPropagation();
      if (onNavigateDown) onNavigateDown();
      return;
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      e.stopPropagation();
      applyVolumeChange(volumePercent - 5);
      playCursorSound();
      return;
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      e.stopPropagation();
      applyVolumeChange(volumePercent + 5);
      playCursorSound();
      return;
    }

    // Pastikan tombol gerak / aksi (spasi, enter, WASD) di slider tidak bocor ke Phaser
    if (['w', 'a', 's', 'd', 'W', 'A', 'S', 'D', ' ', 'Enter'].includes(e.key)) {
      e.stopPropagation();
    }
  };

  return (
    <div
      className={`settings-volume-item ${isActive ? 'active' : ''} ${className}`}
      onMouseEnter={onActivate}
      onClick={() => {
        if (onActivate) onActivate();
        sliderRef.current?.focus();
      }}
      role="menuitem"
    >
      <div className="volume-item-header">
        <div className="volume-item-title-wrap">
          <span className="menu-cursor">{isActive ? '▶' : '\u00A0'}</span>
          <span className="item-label">VOLUME BGM</span>
        </div>
        <span className="volume-percent-text">{volumePercent}%</span>
      </div>

      <div className="volume-slider-row">
        <input
          ref={sliderRef}
          id={id}
          type="range"
          min="0"
          max="100"
          step="5"
          value={volumePercent}
          onChange={handleSliderInput}
          onInput={handleSliderInput}
          onKeyDown={handleKeyDown}
          className="retro-volume-slider"
          style={{ '--slider-fill': `${volumePercent}%` }}
          aria-label="Volume BGM"
        />
      </div>
    </div>
  );
}
