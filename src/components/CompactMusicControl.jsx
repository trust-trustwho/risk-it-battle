// CompactMusicControl.jsx - Pixel-art compact BGM control for RISK IT BATTLE
import React, { useState, useEffect, useRef } from 'react';
import { bgmManager } from '../audio/bgmManager';
import { playCursorSound, playSelectSound } from '../game/soundFx';

export default function CompactMusicControl({ className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [bgmState, setBgmState] = useState(() => bgmManager.getState());
  const popoverRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const unsubscribe = bgmManager.subscribe((newState) => {
      setBgmState(newState);
    });
    return () => unsubscribe();
  }, []);

  // Close popover on click outside or ESC
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDownOutside = (e) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setIsOpen(false);
        if (buttonRef.current) buttonRef.current.focus();
      }
    };

    window.addEventListener('pointerdown', handlePointerDownOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDownOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleToggleOpen = (e) => {
    e.stopPropagation();
    playSelectSound();
    setIsOpen((prev) => !prev);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    playCursorSound();
    bgmManager.prevTrack();
  };

  const handleTogglePlay = (e) => {
    e.stopPropagation();
    playSelectSound();
    bgmManager.togglePlay();
  };

  const handleNext = (e) => {
    e.stopPropagation();
    playCursorSound();
    bgmManager.nextTrack();
  };

  return (
    <div className={`compact-bgm-wrapper ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        className={`compact-bgm-trigger ${isOpen ? 'active' : ''}`}
        onClick={handleToggleOpen}
        title="Pengaturan Musik (BGM)"
        aria-label="Pengaturan Musik (BGM)"
        aria-expanded={isOpen}
      >
        <span className="bgm-trigger-icon">♪</span>
        <span className="bgm-trigger-label">BGM</span>
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          className="compact-bgm-popover"
          role="dialog"
          aria-label="Kontrol Musik"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bgm-popover-header">
            <span className="bgm-header-gem">◆</span>
            <span className="bgm-header-title">MUSIK</span>
          </div>

          <div className="bgm-controls-row">
            <button
              type="button"
              className="bgm-ctrl-btn"
              onClick={handlePrev}
              title="Lagu Sebelumnya"
              aria-label="Lagu Sebelumnya"
            >
              ◀
            </button>

            <button
              type="button"
              className={`bgm-ctrl-btn bgm-play-btn ${bgmState.isPlaying ? 'is-playing' : 'is-paused'}`}
              onClick={handleTogglePlay}
              title={bgmState.isPlaying ? 'Jeda' : 'Putar'}
              aria-label={bgmState.isPlaying ? 'Jeda Musik' : 'Putar Musik'}
            >
              {bgmState.isPlaying ? '❚❚' : '▶'}
            </button>

            <button
              type="button"
              className="bgm-ctrl-btn"
              onClick={handleNext}
              title="Lagu Berikutnya"
              aria-label="Lagu Berikutnya"
            >
              ▶
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
