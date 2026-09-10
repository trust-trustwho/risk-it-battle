import React, { useState, useEffect, useRef, useCallback } from 'react';
import { playTypeSound, playSelectSound } from '../game/soundFx';

/**
 * DialogueBox - Kotak dialog dengan efek typewriter, antrean pesan, dan navigasi Enter/Klik.
 * Memenuhi spesifikasi:
 * - Klik/Enter saat mengetik -> teks langsung selesai penuh.
 * - Klik/Enter saat selesai -> lanjut ke pesan berikutnya atau selesai.
 * - Menampilkan indikator segitiga berkedip (▼) saat menunggu input.
 */
export default function DialogueBox({
  messages = [],
  onComplete,
  typingSpeed = 22, // ms per karakter
  scenarioSubtitle = '',
  disabled = false,
}) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Reset index jika antrean pesan berubah
  useEffect(() => {
    setCurrentMessageIndex(0);
  }, [messages]);

  const currentMessage = messages[currentMessageIndex] || '';
  const timerRef = useRef(null);

  // Mulai typewriter ketika pesan berubah
  useEffect(() => {
    if (!currentMessage) {
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    setDisplayedText('');
    setIsTyping(true);

    let charIndex = 0;
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      charIndex += 1;
      setDisplayedText(currentMessage.slice(0, charIndex));

      if (charIndex % 3 === 0) {
        playTypeSound();
      }

      if (charIndex >= currentMessage.length) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setIsTyping(false);
      }
    }, typingSpeed);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [currentMessageIndex, currentMessage, typingSpeed]);

  // Handler untuk melanjutkan atau mempercepat teks
  const handleAdvance = useCallback(() => {
    if (disabled) return;

    if (isTyping) {
      // Jika sedang mengetik, langsung selesaikan teks
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setDisplayedText(currentMessage);
      setIsTyping(false);
      playSelectSound();
    } else {
      // Jika sudah selesai mengetik, periksa apakah ada pesan selanjutnya
      playSelectSound();
      if (currentMessageIndex < messages.length - 1) {
        setCurrentMessageIndex((prev) => prev + 1);
      } else {
        if (onComplete) {
          onComplete();
        }
      }
    }
  }, [disabled, isTyping, currentMessage, currentMessageIndex, messages.length, onComplete]);

  // Listener keyboard (Enter & Space)
  useEffect(() => {
    if (disabled) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleAdvance();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [disabled, handleAdvance]);

  return (
    <div
      className={`dialogue-box ${disabled ? 'disabled' : ''}`}
      onClick={handleAdvance}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      title={disabled ? undefined : 'Klik atau tekan ENTER untuk melanjutkan'}
    >
      {scenarioSubtitle && (
        <div className="dialogue-scenario-badge">{scenarioSubtitle}</div>
      )}

      <div className="dialogue-text">
        {displayedText}
      </div>

      {/* Indikator retro tanda panah berkedip saat siap lanjut */}
      {!isTyping && currentMessage && (
        <div className="dialogue-advance-prompt">
          <span className="advance-arrow">▼</span>
        </div>
      )}
    </div>
  );
}
