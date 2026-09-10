// bgmManager.js - Global Background Music Singleton for RISK IT BATTLE
import {
  DEFAULT_BGM_VOLUME,
  AUDIO_STORAGE_KEY,
  MUSIC_PLAYLISTS,
} from './musicConfig';

class BgmManager {
  static instance = null;

  constructor() {
    // 1. Strict singleton guarantee across HMR and imports
    if (typeof window !== 'undefined' && window.__RISK_IT_BGM_SINGLETON__) {
      return window.__RISK_IT_BGM_SINGLETON__;
    }
    if (BgmManager.instance) {
      return BgmManager.instance;
    }

    // 2. Stop and clear any previous dangling Audio instances on window
    if (typeof window !== 'undefined') {
      try {
        if (window.__RISK_IT_AUDIO_INSTANCE__) {
          window.__RISK_IT_AUDIO_INSTANCE__.pause();
          window.__RISK_IT_AUDIO_INSTANCE__.src = '';
        }
        document.querySelectorAll('audio').forEach((el) => {
          try {
            el.pause();
            el.src = '';
          } catch (_) {}
        });
      } catch (_) {}
    }

    // 3. Exactly ONE HTMLAudioElement for the entire application lifetime
    this.audio = typeof Audio !== 'undefined' ? new Audio() : null;
    this.transitionId = 0;
    this.currentContext = null;
    this.currentTrackIndex = 0;
    this.isPlaying = false;
    this.isMuted = false;
    this.bgmVolume = DEFAULT_BGM_VOLUME;
    this.playlistIndices = {
      beranda: 0,
      lobby: 0,
      battle1: 0,
      battle2: 0,
      boss: 0,
    };

    this.fadeTimer = null;
    this.isTransitioning = false;
    this.autoplayBlocked = false;
    this.listeners = new Set();
    this.pendingContext = null;

    if (typeof window !== 'undefined') {
      window.__RISK_IT_BGM_SINGLETON__ = this;
      window.__RISK_IT_AUDIO_INSTANCE__ = this.audio;
    }
    BgmManager.instance = this;

    this.initFromStorage();
    this.setupAudioListeners();
    this.setupAutoplayUnlock();

    console.log('[BGM] manager initialized once. Audio instance:', this.audio);
  }

  get userVolume() {
    return this.bgmVolume;
  }

  set userVolume(val) {
    this.bgmVolume = val;
  }

  initFromStorage() {
    if (typeof window === 'undefined') return;
    try {
      // Check sound mute state from storage
      const soundSaved = localStorage.getItem('risk-it-battle-sound');
      if (soundSaved !== null) {
        this.isMuted = soundSaved === 'false';
      }

      const saved = localStorage.getItem(AUDIO_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (soundSaved === null && typeof parsed.musicEnabled === 'boolean') {
          this.isMuted = !parsed.musicEnabled;
        }
        // Canonical source of truth: bgmVolume (fallback to legacy userVolume)
        const savedVolume =
          typeof parsed.bgmVolume === 'number'
            ? parsed.bgmVolume
            : typeof parsed.userVolume === 'number'
            ? parsed.userVolume
            : null;
        if (savedVolume !== null && !isNaN(savedVolume)) {
          this.bgmVolume = Math.max(0, Math.min(1, savedVolume));
        }
        if (parsed.playlistIndices && typeof parsed.playlistIndices === 'object') {
          this.playlistIndices = { ...this.playlistIndices, ...parsed.playlistIndices };
        }
      }
    } catch (e) {
      // Gracefully ignore storage read errors
    }
  }

  saveToStorage() {
    if (typeof window === 'undefined') return;
    try {
      let existing = {};
      const saved = localStorage.getItem(AUDIO_STORAGE_KEY);
      if (saved) {
        try {
          existing = JSON.parse(saved) || {};
        } catch (_) {}
      }
      localStorage.setItem(
        AUDIO_STORAGE_KEY,
        JSON.stringify({
          ...existing,
          musicEnabled: !this.isMuted,
          bgmVolume: this.bgmVolume,
          playlistIndices: this.playlistIndices,
        })
      );
    } catch (e) {
      // Gracefully ignore storage write errors
    }
  }

  setupAudioListeners() {
    if (!this.audio) return;

    this.audio.preload = 'auto';
    this.audio.muted = this.isMuted;
    this.audio.volume = this.isMuted ? 0 : this.bgmVolume;

    // Auto-advance on track end (attached ONCE in constructor)
    this.audio.addEventListener('ended', () => {
      this.handleTrackEnded();
    });

    // Error handling
    this.audio.addEventListener('error', (e) => {
      console.warn('[BGM] Track error on source:', this.audio?.src, e);
      const playlist = this.getPlaylist(this.currentContext);
      if (playlist && playlist.length > 1) {
        this.nextTrack(true);
      }
    });
  }

  setupAutoplayUnlock() {
    if (typeof window === 'undefined') return;

    const cleanup = () => {
      window.removeEventListener('pointerdown', unlockHandler);
      window.removeEventListener('keydown', unlockHandler);
      window.removeEventListener('click', unlockHandler);
    };

    const unlockHandler = () => {
      cleanup();
      if (this.autoplayBlocked && this.pendingContext) {
        this.autoplayBlocked = false;
        const ctx = this.pendingContext;
        this.pendingContext = null;
        this.setContext(ctx);
      } else if (this.audio && this.isPlaying && this.audio.paused) {
        this.autoplayBlocked = false;
        this.safePlay();
      }
    };

    window.addEventListener('pointerdown', unlockHandler, { passive: true, once: true });
    window.addEventListener('keydown', unlockHandler, { passive: true, once: true });
    window.addEventListener('click', unlockHandler, { passive: true, once: true });
  }

  getPlaylist(context) {
    if (!context || !MUSIC_PLAYLISTS[context]) return [];
    return MUSIC_PLAYLISTS[context];
  }

  getCurrentTrackUrl(context, index) {
    const playlist = this.getPlaylist(context);
    if (!playlist || playlist.length === 0) return null;
    const safeIndex = ((index % playlist.length) + playlist.length) % playlist.length;
    return playlist[safeIndex];
  }

  cancelFade() {
    if (this.fadeTimer) {
      clearInterval(this.fadeTimer);
      this.fadeTimer = null;
    }
    this.isTransitioning = false;
  }

  /**
   * Set music context (e.g. 'beranda', 'lobby', 'battle1', 'battle2', 'boss')
   * Strictly idempotent: if newContext === currentContext, returns immediately!
   */
  setContext(newContext) {
    if (!newContext || !MUSIC_PLAYLISTS[newContext]) return;

    if (newContext === this.currentContext) {
      return;
    }

    console.log(`[BGM] context ${newContext}`);
    const playlist = this.getPlaylist(newContext);
    if (playlist.length === 0) {
      this.stop();
      this.currentContext = newContext;
      this.notify();
      return;
    }

    const savedIndex = this.playlistIndices[newContext] || 0;
    const trackIndex = ((savedIndex % playlist.length) + playlist.length) % playlist.length;
    const targetUrl = playlist[trackIndex];

    const oldContext = this.currentContext;
    this.currentContext = newContext;
    this.currentTrackIndex = trackIndex;

    this.transitionToTrack(targetUrl, oldContext !== null);
  }

  /**
   * Tokenized smooth track transition.
   * Cancels old transitions cleanly.
   */
  transitionToTrack(trackUrl, withFade = true) {
    if (!this.audio) return;

    this.transitionId += 1;
    const token = this.transitionId;

    this.cancelFade();

    const targetVolume = this.isMuted ? 0 : this.bgmVolume;

    // If already playing audio, fade out first
    if (withFade && !this.audio.paused && this.audio.volume > 0.02 && !this.isMuted) {
      this.isTransitioning = true;
      const fadeOutStep = Math.max(0.01, this.audio.volume / 8);

      this.fadeTimer = setInterval(() => {
        if (this.transitionId !== token) {
          this.cancelFade();
          return;
        }

        if (this.isMuted) {
          this.cancelFade();
          this.audio.muted = true;
          this.audio.volume = 0;
          this.loadAndPlay(trackUrl, 0, token);
          return;
        }

        if (this.audio.volume > fadeOutStep) {
          this.audio.volume = Math.max(0, this.audio.volume - fadeOutStep);
        } else {
          this.cancelFade();
          this.loadAndPlay(trackUrl, targetVolume, token);
        }
      }, 25);
    } else {
      this.loadAndPlay(trackUrl, targetVolume, token);
    }
  }

  loadAndPlay(trackUrl, targetVolume, token) {
    if (!this.audio) return;
    if (token !== undefined && this.transitionId !== token) return;

    const currentSrcPath = this.audio.src ? new URL(this.audio.src, window.location.href).pathname : '';
    const newSrcPath = new URL(trackUrl, window.location.href).pathname;

    // If source is already loaded and playing, just adjust volume
    if (currentSrcPath === newSrcPath && !this.audio.paused) {
      this.audio.muted = this.isMuted;
      this.audio.volume = this.isMuted ? 0 : this.bgmVolume;
      this.isPlaying = true;
      this.isTransitioning = false;
      this.notify();
      return;
    }

    // Always pause before re-assigning source on the singleton
    try {
      this.audio.pause();
    } catch (_) {}

    this.audio.src = trackUrl;
    this.audio.muted = this.isMuted;
    this.audio.volume = 0;
    this.audio.currentTime = 0;

    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          if (token !== undefined && this.transitionId !== token) {
            this.audio.pause();
            return;
          }

          this.isPlaying = true;
          this.autoplayBlocked = false;

          if (this.isMuted) {
            this.audio.muted = true;
            this.audio.volume = 0;
            this.isTransitioning = false;
            this.notify();
            return;
          }

          // Fade in to current user volume
          const currentTarget = this.bgmVolume;
          if (currentTarget > 0) {
            this.isTransitioning = true;
            const fadeInStep = Math.max(0.01, currentTarget / 10);
            this.fadeTimer = setInterval(() => {
              if (token !== undefined && this.transitionId !== token) {
                this.cancelFade();
                return;
              }

              if (this.isMuted) {
                this.cancelFade();
                this.audio.muted = true;
                this.audio.volume = 0;
                return;
              }

              const dynamicTarget = this.bgmVolume;
              if (this.audio.volume < dynamicTarget - fadeInStep) {
                this.audio.volume = Math.min(dynamicTarget, this.audio.volume + fadeInStep);
              } else {
                this.audio.volume = dynamicTarget;
                this.cancelFade();
              }
            }, 25);
          } else {
            this.audio.volume = 0;
            this.isTransitioning = false;
          }
          this.notify();
        })
        .catch((err) => {
          if (token !== undefined && this.transitionId !== token) return;

          if (err.name === 'NotAllowedError') {
            this.autoplayBlocked = true;
            this.pendingContext = this.currentContext;
            this.isPlaying = true;
          } else {
            console.warn('[BGM] Playback rejected:', err);
          }
          this.isTransitioning = false;
          this.notify();
        });
    }
  }

  safePlay() {
    if (!this.audio || !this.audio.src) {
      if (this.currentContext) {
        const ctx = this.currentContext;
        this.currentContext = null; // reset to allow setContext
        this.setContext(ctx);
      }
      return;
    }

    this.audio.muted = this.isMuted;
    this.audio.volume = this.isMuted ? 0 : this.bgmVolume;

    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.autoplayBlocked = false;
          this.notify();
        })
        .catch((err) => {
          if (err.name === 'NotAllowedError') {
            this.autoplayBlocked = true;
          }
          this.notify();
        });
    }
  }

  handleTrackEnded() {
    const playlist = this.getPlaylist(this.currentContext);
    if (!playlist || playlist.length === 0) return;

    if (playlist.length === 1) {
      // Loop single track
      if (this.audio) {
        this.audio.currentTime = 0;
        this.safePlay();
      }
    } else {
      // Advance to next track in playlist
      this.nextTrack(true);
    }
  }

  nextTrack(isAuto = false) {
    const playlist = this.getPlaylist(this.currentContext);
    if (!playlist || playlist.length === 0) return;

    if (playlist.length === 1) {
      if (this.audio) {
        this.audio.currentTime = 0;
        this.safePlay();
      }
      return;
    }

    this.currentTrackIndex = (this.currentTrackIndex + 1) % playlist.length;
    if (this.currentContext) {
      this.playlistIndices[this.currentContext] = this.currentTrackIndex;
      this.saveToStorage();
    }

    const nextUrl = playlist[this.currentTrackIndex];
    this.transitionToTrack(nextUrl, !isAuto);
    this.notify();
  }

  prevTrack() {
    const playlist = this.getPlaylist(this.currentContext);
    if (!playlist || playlist.length === 0) return;

    if (playlist.length === 1) {
      if (this.audio) {
        this.audio.currentTime = 0;
        this.safePlay();
      }
      return;
    }

    this.currentTrackIndex =
      ((this.currentTrackIndex - 1) % playlist.length + playlist.length) % playlist.length;
    if (this.currentContext) {
      this.playlistIndices[this.currentContext] = this.currentTrackIndex;
      this.saveToStorage();
    }

    const prevUrl = playlist[this.currentTrackIndex];
    this.transitionToTrack(prevUrl, true);
    this.notify();
  }

  togglePlay() {
    if (!this.audio) return;

    if (this.isPlaying && !this.audio.paused) {
      this.audio.pause();
      this.isPlaying = false;
      this.notify();
    } else {
      this.safePlay();
    }
  }

  pause() {
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
      this.isPlaying = false;
      this.notify();
    }
  }

  resume() {
    this.safePlay();
  }

  stop() {
    if (!this.audio) return;
    this.transitionId += 1;
    this.cancelFade();
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlaying = false;
    this.notify();
  }

  setVolume(vol) {
    this.bgmVolume = Math.max(0, Math.min(1, vol));
    this.cancelFade();
    if (this.audio) {
      this.audio.muted = this.isMuted;
      this.audio.volume = this.isMuted ? 0 : this.bgmVolume;
    }
    this.saveToStorage();
    this.notify();
  }

  setMuted(muted) {
    this.isMuted = Boolean(muted);
    this.transitionId += 1;
    this.cancelFade();
    if (this.audio) {
      this.audio.muted = this.isMuted;
      this.audio.volume = this.isMuted ? 0 : this.bgmVolume;
    }
    this.saveToStorage();
    this.notify();
  }

  unlock() {
    if (this.autoplayBlocked || (this.isPlaying && this.audio?.paused)) {
      this.autoplayBlocked = false;
      this.safePlay();
    }
  }

  getState() {
    const playlist = this.getPlaylist(this.currentContext);
    return {
      currentContext: this.currentContext,
      isPlaying: this.isPlaying && (!this.audio || !this.audio.paused),
      isMuted: this.isMuted,
      volume: this.bgmVolume,
      bgmVolume: this.bgmVolume,
      hasMultipleTracks: playlist.length > 1,
    };
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  notify() {
    const state = this.getState();
    this.listeners.forEach((fn) => {
      try {
        fn(state);
      } catch (e) {
        console.error('[BGM] Listener error:', e);
      }
    });
  }
}

// Global Singleton Instance
export const bgmManager = new BgmManager();

export default bgmManager;
