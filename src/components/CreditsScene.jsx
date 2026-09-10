// CreditsScene.jsx - Cinematic Scrolling Credit Scene for RISK IT BATTLE
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { playSelectSound } from '../game/soundFx';

export default function CreditsScene({ onClose, mode = 'standard' }) {
  const closeBtnRef = useRef(null);
  const viewportRef = useRef(null);
  const contentRef = useRef(null);
  const completedRef = useRef(false);
  const completionTimerRef = useRef(null);
  const fadeTimerRef = useRef(null);
  const rafRef = useRef(null);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Automatic completion handler
  const handleCreditsComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;

    // Stop monitoring frame position
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    // Cinematic delay (~800ms) after all content has completely exited viewport
    completionTimerRef.current = setTimeout(() => {
      // Start fade out transition
      setIsFadingOut(true);

      // Transition completes -> return to title screen
      fadeTimerRef.current = setTimeout(() => {
        onClose();
      }, 400);
    }, 800);
  }, [onClose]);

  // Immediate manual exit (ESC, TUTUP button, or backdrop click)
  const handleManualClose = useCallback(() => {
    // If already completed and navigated, ignore
    if (completedRef.current && !completionTimerRef.current && !fadeTimerRef.current) {
      return;
    }
    completedRef.current = true;

    // Cancel all running timers and RAF immediately
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (completionTimerRef.current) {
      clearTimeout(completionTimerRef.current);
      completionTimerRef.current = null;
    }
    if (fadeTimerRef.current) {
      clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }

    playSelectSound();
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (closeBtnRef.current) {
      closeBtnRef.current.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleManualClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Keep CSS variable --viewport-height strictly synced with current viewport size
    const updateViewportHeight = () => {
      if (viewportRef.current) {
        const vh = viewportRef.current.clientHeight;
        viewportRef.current.style.setProperty('--viewport-height', `${vh}px`);
      }
    };
    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight);

    // Lightweight requestAnimationFrame completion check using actual DOM bounding rectangles
    // Finished ONLY when contentRect.bottom <= viewportRect.top
    const checkCreditsCompletion = () => {
      if (completedRef.current) return;
      if (!viewportRef.current || !contentRef.current) return;

      const viewportRect = viewportRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();

      // Guard against zero-height initial paint states
      if (viewportRect.height === 0 || contentRect.height === 0) {
        rafRef.current = requestAnimationFrame(checkCreditsCompletion);
        return;
      }

      // When the entire scrolling content (including the final line and outro)
      // has completely moved above the top edge of the visible viewport
      if (contentRect.bottom <= viewportRect.top) {
        handleCreditsComplete();
        return;
      }

      rafRef.current = requestAnimationFrame(checkCreditsCompletion);
    };

    rafRef.current = requestAnimationFrame(checkCreditsCompletion);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', updateViewportHeight);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (completionTimerRef.current) {
        clearTimeout(completionTimerRef.current);
        completionTimerRef.current = null;
      }
      if (fadeTimerRef.current) {
        clearTimeout(fadeTimerRef.current);
        fadeTimerRef.current = null;
      }
    };
  }, [handleManualClose, handleCreditsComplete]);

  return (
    <div
      className={`credits-scene-backdrop ${isFadingOut ? 'credits-fading-out' : ''}`}
      onClick={handleManualClose}
      role="dialog"
      aria-modal="true"
      aria-label="Tentang Website dan Kredit Kelompok"
    >
      {/* Top action bar with quick dismiss */}
      <div className="credits-hud-header" onClick={(e) => e.stopPropagation()}>
        <div className="credits-hud-pill">
          <span className="credits-dot">●</span>
          <span>{mode === 'campaignEnding' ? 'CAMPAIGN COMPLETE · CREDIT ROLL' : 'CREDIT ROLL · TKTI'}</span>
        </div>
        <button
          ref={closeBtnRef}
          type="button"
          className="credits-close-button"
          onClick={handleManualClose}
          title="Tutup Kredit (ESC)"
        >
          ✕ TUTUP [ESC]
        </button>
      </div>

      {/* Cinematic Viewport with vertical edge gradient fades */}
      <div
        ref={viewportRef}
        className="credits-viewport"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={contentRef}
          className="credits-scroll-track"
        >
          {/* Main Title Banner */}
          <div className="credits-header-group">
            <div className="credits-badge">◆ TENTANG WEBSITE ◆</div>
            <h1 className="credits-main-title">RISK IT BATTLE</h1>
            <p className="credits-subtitle">SIMULASI MANAJEMEN RISIKO TEKNOLOGI INFORMASI</p>
          </div>

          <div className="credits-divider">
            <span className="divider-line" />
            <span className="divider-gem">◆</span>
            <span className="divider-line" />
          </div>

          {/* Purpose Section */}
          <section className="credits-section">
            <h2 className="credits-section-title">TUJUAN WEBSITE INI</h2>
            <p className="credits-purpose-text">
              Website ini dibuat untuk memenuhi tugas kelompok mata kuliah
            </p>
            <p className="credits-course-highlight">
              Tata Kelola TI (TKTI)
            </p>
            <p className="credits-purpose-text">
              dengan konsep pembelajaran interaktif berbasis game
              agar materi best practice, khususnya <strong>Risk IT</strong>,
              dapat dipahami dengan cara yang lebih menarik, visual, dan mudah dipelajari.
            </p>
          </section>

          <div className="credits-divider">
            <span className="divider-line" />
            <span className="divider-gem">◆</span>
            <span className="divider-line" />
          </div>

          {/* Group Credit Section */}
          <section className="credits-section">
            <h3 className="credits-section-label">DIBUAT OLEH</h3>
            <div className="credits-group-name">KELOMPOK 5</div>
          </section>

          <div className="credits-divider">
            <span className="divider-line" />
            <span className="divider-gem">◆</span>
            <span className="divider-line" />
          </div>

          {/* Members List */}
          <section className="credits-section">
            <h3 className="credits-section-label">ANGGOTA KELOMPOK:</h3>
            <div className="credits-members-grid">
              <div className="member-card">
                <span className="member-name">Muchamad Hafizh Septiarahman</span>
                <span className="member-npm">25082010142</span>
              </div>
              <div className="member-card">
                <span className="member-name">Julia Loren Br. Simanjuntak</span>
                <span className="member-npm">25082010146</span>
              </div>
              <div className="member-card">
                <span className="member-name">Muhammad Rizky Ramadhan</span>
                <span className="member-npm">25082010148</span>
              </div>
              <div className="member-card">
                <span className="member-name">Muhammad Rizky Aulia</span>
                <span className="member-npm">25082010157</span>
              </div>
              <div className="member-card">
                <span className="member-name">Moh Iqbal Awansyah</span>
                <span className="member-npm">25082010173</span>
              </div>
              <div className="member-card">
                <span className="member-name">Lola Amalia Cantika</span>
                <span className="member-npm">25082010187</span>
              </div>
            </div>
          </section>

          <div className="credits-divider">
            <span className="divider-line" />
            <span className="divider-gem">★</span>
            <span className="divider-line" />
          </div>

          {/* Ending Outro */}
          <footer className="credits-outro">
            <p className="outro-star">✦ ✦ ✦</p>
            <p className="outro-thanks">TERIMA KASIH TELAH BERMAIN</p>
            <p className="outro-copy">RISK IT BATTLE · MINI CAMPAIGN 2026</p>
          </footer>
        </div>
      </div>

      {/* Floating Bottom Navigation Tip */}
      <div className="credits-hud-footer" onClick={(e) => e.stopPropagation()}>
        <span className="footer-tip">ARAHKAN KURSOR UNTUK MENJEDA · ESC UNTUK TUTUP</span>
      </div>
    </div>
  );
}
