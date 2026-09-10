import React, { useEffect, useRef, useState } from 'react';
import { playCursorSound, playSelectSound } from '../game/soundFx';

const OPENING_SCENES = [
  {
    eyebrow: 'RISK IT TOWER · PROLOG',
    title: 'SETIAP SISTEM\nMENYIMPAN RISIKO',
    body: 'Di balik layanan digital, keputusan teknologi selalu membawa dampak bagi tujuan bisnis.',
    accent: 'cyan',
    duration: 2700,
  },
  {
    eyebrow: 'KETIKA RISIKO MENJADI NYATA',
    title: 'KEPUTUSAN MENENTUKAN\nBESARNYA DAMPAK',
    body: 'Organisasi membutuhkan tata kelola, penilaian, respons, dan pemantauan yang tepat.',
    accent: 'amber',
    duration: 2900,
  },
  {
    eyebrow: 'SEORANG ANALIS DIPANGGIL',
    title: 'RISK IT\nBATTLE',
    body: 'Naiki lima lantai. Hadapi setiap krisis. Lindungi nilai bisnis dari risiko teknologi.',
    accent: 'red',
    duration: 3400,
  },
];

export default function OpeningCinematic({ onFinish }) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const finishRef = useRef(onFinish);
  const exitTimerRef = useRef(null);
  const scene = OPENING_SCENES[sceneIndex];
  const isFinalScene = sceneIndex === OPENING_SCENES.length - 1;

  useEffect(() => {
    finishRef.current = onFinish;
  }, [onFinish]);

  const finishOpening = (withSound = true) => {
    if (isExiting) return;
    if (withSound) playSelectSound();
    setIsExiting(true);
    exitTimerRef.current = setTimeout(() => {
      finishRef.current?.();
    }, 720);
  };

  const advanceOpening = () => {
    if (isExiting) return;
    if (isFinalScene) {
      finishOpening();
      return;
    }
    playCursorSound();
    setSceneIndex((current) => current + 1);
  };

  useEffect(() => {
    if (isExiting) return undefined;

    const timer = setTimeout(() => {
      if (isFinalScene) {
        finishOpening(false);
      } else {
        setSceneIndex((current) => current + 1);
      }
    }, scene.duration);

    return () => clearTimeout(timer);
  }, [scene.duration, isFinalScene, isExiting]);

  useEffect(() => () => clearTimeout(exitTimerRef.current), []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        finishOpening();
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        advanceOpening();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFinalScene, isExiting]);

  return (
    <div className={`opening-cinematic opening-accent-${scene.accent} ${isExiting ? 'opening-is-exiting' : ''}`}>
      <div className="opening-grid" aria-hidden="true" />
      <div className="opening-scan-beam" aria-hidden="true" />

      <div className="opening-tower-wrap" aria-hidden="true">
        <div className="opening-signal-ring opening-signal-ring-a" />
        <div className="opening-signal-ring opening-signal-ring-b" />
        <div className="opening-tower-antenna" />
        <div className="opening-tower">
          {[5, 4, 3, 2, 1].map((floor) => (
            <div className="opening-tower-floor" key={floor}>
              <span>L{floor}</span>
              <i />
              <i />
              <i />
            </div>
          ))}
          <div className="opening-tower-door" />
        </div>
      </div>

      <section className="opening-copy" key={sceneIndex} aria-live="polite">
        <span className="opening-eyebrow">{scene.eyebrow}</span>
        <h1>
          {scene.title.split('\n').map((line) => (
            <React.Fragment key={line}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </h1>
        <p>{scene.body}</p>
        <button type="button" className="opening-advance-btn" onClick={advanceOpening} disabled={isExiting}>
          <span>{isFinalScene ? 'MASUK KE RISK IT TOWER' : 'LANJUTKAN PROLOG'}</span>
          <span aria-hidden="true">▶</span>
        </button>
      </section>

      <button type="button" className="opening-skip-btn" onClick={() => finishOpening()} disabled={isExiting}>
        LEWATI INTRO <span>[ESC]</span>
      </button>

      <div className="opening-cinematic-bars" aria-hidden="true" />
      <div className="opening-transition-curtain" aria-hidden="true" />
    </div>
  );
}
