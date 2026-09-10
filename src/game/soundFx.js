// soundFx.js - Web Audio API 8-bit Retro Synthesizer
const SOUND_STORAGE_KEY = 'risk-it-battle-sound';

function getInitialSoundState() {
  if (typeof window === 'undefined') return true;
  try {
    const saved = localStorage.getItem(SOUND_STORAGE_KEY);
    return saved !== null ? saved === 'true' : true;
  } catch (e) {
    return true;
  }
}

let audioCtx = null;
let soundEnabled = getInitialSoundState();

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  try {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
  } catch (e) {
    return null;
  }
  return audioCtx;
}

import { bgmManager } from '../audio/bgmManager';

// Sync initial state to bgmManager
if (typeof window !== 'undefined') {
  bgmManager.setMuted(!soundEnabled);
  if (!window.__RISK_IT_SOUND_TOGGLE_LISTENER__) {
    window.__RISK_IT_SOUND_TOGGLE_LISTENER__ = true;
    window.addEventListener('toggle-sound', () => {
      toggleSound();
    });
  }
}

export function isSoundEnabled() {
  return soundEnabled;
}

export function toggleSound() {
  soundEnabled = !soundEnabled;
  try {
    localStorage.setItem(SOUND_STORAGE_KEY, soundEnabled ? 'true' : 'false');
  } catch (e) {}
  bgmManager.setMuted(!soundEnabled);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('risk-sound-changed', { detail: { enabled: soundEnabled } }));
  }
  return soundEnabled;
}

export function setSoundEnabled(enabled) {
  soundEnabled = enabled;
  try {
    localStorage.setItem(SOUND_STORAGE_KEY, soundEnabled ? 'true' : 'false');
  } catch (e) {}
  bgmManager.setMuted(!soundEnabled);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('risk-sound-changed', { detail: { enabled: soundEnabled } }));
  }
}

// 8-bit Menu Cursor Move
export function playCursorSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'square';
  osc.frequency.setValueAtTime(480, ctx.currentTime);
  osc.frequency.setValueAtTime(600, ctx.currentTime + 0.02);

  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.05);
}

// 8-bit Confirm / Action Select
export function playSelectSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'square';
  osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
  osc.frequency.setValueAtTime(880, ctx.currentTime + 0.06); // A5

  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.16);
}

// 8-bit Hit / Damage Impact
export function playHitSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(240, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.15);

  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.16);
}

// 8-bit Wrong Decision Sound (Buzz / Thud)
export function playWrongSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(140, ctx.currentTime);
  osc.frequency.setValueAtTime(110, ctx.currentTime + 0.08);

  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.22);
}

// 8-bit Victory Fanfare
export function playVictorySound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [
    { freq: 440.0, time: 0, duration: 0.12 }, // A4
    { freq: 554.37, time: 0.12, duration: 0.12 }, // C#5
    { freq: 659.25, time: 0.24, duration: 0.12 }, // E5
    { freq: 880.0, time: 0.36, duration: 0.35 }, // A5
  ];

  notes.forEach((note) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(note.freq, ctx.currentTime + note.time);

    gain.gain.setValueAtTime(0.15, ctx.currentTime + note.time);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.time + note.duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + note.time);
    osc.stop(ctx.currentTime + note.time + note.duration);
  });
}

// 8-bit Defeat Sound
export function playDefeatSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [
    { freq: 330.0, time: 0, duration: 0.15 },
    { freq: 311.13, time: 0.15, duration: 0.15 },
    { freq: 293.66, time: 0.30, duration: 0.15 },
    { freq: 261.63, time: 0.45, duration: 0.40 },
  ];

  notes.forEach((note) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(note.freq, ctx.currentTime + note.time);

    gain.gain.setValueAtTime(0.12, ctx.currentTime + note.time);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.time + note.duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + note.time);
    osc.stop(ctx.currentTime + note.time + note.duration);
  });
}

// 8-bit Player Attack Whoosh / Data Pulse Sound
export function playAttackWhooshSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(280, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(740, ctx.currentTime + 0.12);

  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.14);
}

// 8-bit Enemy Corrupted Attack Launch Sound
export function playEnemyAttackSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(190, ctx.currentTime);
  osc.frequency.setValueAtTime(140, ctx.currentTime + 0.05);
  osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.14);

  gain.gain.setValueAtTime(0.14, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.15);
}

// 8-bit Player Hurt Impact Sound
export function playPlayerHurtSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(210, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.18);

  gain.gain.setValueAtTime(0.22, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.19);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.19);
}

// 8-bit Typewriter tick
export function playTypeSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'square';
  osc.frequency.setValueAtTime(800, ctx.currentTime);

  gain.gain.setValueAtTime(0.015, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.015);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.015);
}

