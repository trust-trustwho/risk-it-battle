import React, { useState, useEffect } from 'react';
import { isSoundEnabled, toggleSound } from '../game/soundFx';

/**
 * AudioToggle - Tombol pengatur audio 8-bit retro (Bahasa Indonesia)
 */
export default function AudioToggle() {
  const [enabled, setEnabled] = useState(isSoundEnabled());

  useEffect(() => {
    const handleSoundChange = (e) => {
      if (e.detail && typeof e.detail.enabled === 'boolean') {
        setEnabled(e.detail.enabled);
      } else {
        setEnabled(isSoundEnabled());
      }
    };
    window.addEventListener('risk-sound-changed', handleSoundChange);
    return () => window.removeEventListener('risk-sound-changed', handleSoundChange);
  }, []);

  const handleToggle = () => {
    const nextState = toggleSound();
    setEnabled(nextState);
  };

  return (
    <button
      type="button"
      className="audio-toggle-button"
      onClick={handleToggle}
      title="Nyalakan / Matikan Suara"
    >
      <span className="audio-icon">{enabled ? '🔊' : '🔇'}</span>
      <span className="audio-label">{enabled ? 'SUARA: NYALA' : 'SUARA: MATI'}</span>
    </button>
  );
}
