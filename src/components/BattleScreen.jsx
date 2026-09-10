import React, { useState, useEffect, useRef } from 'react';
import BattleArena from './BattleArena';
import DialogueBox from './DialogueBox';
import CommandMenu from './CommandMenu';
import DefeatScreen from './DefeatScreen';
import { MISSIONS } from '../game/missions';
import { calculateRank } from '../game/battleData';
import { discoverFramework } from '../game/progressStore';
import {
  playHitSound,
  playWrongSound,
  playSelectSound,
  playAttackWhooshSound,
  playEnemyAttackSound,
  playPlayerHurtSound,
  playVictorySound,
  playDefeatSound,
} from '../game/soundFx';

/**
 * BattleScreen - Mesin pertarungan JRPG berbasis data (Data-Driven)
 * Mendukung seluruh 5 misi secara konsisten tanpa duplikasi logika:
 * - Menangani 2-choice (Misi 04) maupun 4-choice (Misi 01, 02, 03, 05)
 * - Menjaga 100% alur animasi retro: serangan -> proyektil -> benturan -> kurangi HP -> edukasi
 * - Menghubungkan penemuan framework dengan RiskDex
 * - Mengembalikan laporan hasil ke MissionResult saat menang
 */
export default function BattleScreen({
  mission = MISSIONS[1], // Default Misi 02 (KEBOCORAN DATA)
  onMissionVictory,
  onReturnToFloor,
  isPaused = false,
  onAnimationStateChange,
  registerRestartHandler,
}) {
  const enemyMaxHP = mission.enemy.maxHP || 100;

  // Karakter & Musuh
  const [playerHP, setPlayerHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(enemyMaxHP);

  // Ronde pertarungan
  const [turnIndex, setTurnIndex] = useState(0);

  // Skor & Statistik
  const [score, setScore] = useState(1000);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  // Animasi Visual Retro
  const [isPlayerLunging, setIsPlayerLunging] = useState(false);
  const [isPlayerHitFlash, setIsPlayerHitFlash] = useState(false);
  const [isPlayerHit, setIsPlayerHit] = useState(false);
  const [isEnemyLunging, setIsEnemyLunging] = useState(false);
  const [isEnemyHitFlash, setIsEnemyHitFlash] = useState(false);
  const [isEnemyHit, setIsEnemyHit] = useState(false);
  const [isEnemyDefeated, setIsEnemyDefeated] = useState(false);
  const [isArenaShaking, setIsArenaShaking] = useState(false);
  const [activeEffect, setActiveEffect] = useState('none');
  const [actionEffectType, setActionEffectType] = useState('IDENTIFIKASI');
  const [showRedFlash, setShowRedFlash] = useState(false);

  // Status Alur Game
  // 'intro' | 'turnPrompt' | 'playerTurn' | 'animating' | 'actionFeedback' | 'victoryDialog' | 'defeat'
  const [battleState, setBattleState] = useState('intro');
  const [activeDialogues, setActiveDialogues] = useState(mission.introDialogues);
  const [dialogueScenarioTag, setDialogueScenarioTag] = useState(mission.enemy.titleBadge || 'INSIDEN BARU');
  const [announcementText, setAnnouncementText] = useState('');
  const [announcementBadge, setAnnouncementBadge] = useState('');
  const [isCommandLocked, setIsCommandLocked] = useState(false);

  const timersRef = useRef([]);

  const addTimer = (fn, delay) => {
    const id = setTimeout(fn, delay);
    timersRef.current.push(id);
    return id;
  };

  const clearAllTimers = () => {
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current = [];
  };

  const isAnimationActive =
    battleState === 'animating' ||
    isPlayerLunging ||
    isPlayerHit ||
    isPlayerHitFlash ||
    isEnemyLunging ||
    isEnemyHit ||
    isEnemyHitFlash ||
    isEnemyDefeated ||
    isArenaShaking ||
    activeEffect !== 'none' ||
    showRedFlash;

  useEffect(() => {
    if (onAnimationStateChange) {
      onAnimationStateChange(isAnimationActive);
    }
  }, [isAnimationActive, onAnimationStateChange]);

  useEffect(() => {
    if (registerRestartHandler) {
      registerRestartHandler(handleRestartMission);
    }
  }, [registerRestartHandler]);

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  const currentTurn = mission.turns[turnIndex] || mission.turns[0];

  // Selesai Dialog Intro -> Masuk ke skenario Ronde 1
  const handleIntroComplete = () => {
    startTurnPrompt(0);
  };

  // Memulai narasi skenario & pertanyaan untuk ronde tertentu
  const startTurnPrompt = (targetTurnIndex) => {
    const turn = mission.turns[targetTurnIndex];
    if (!turn) return;

    setBattleState('turnPrompt');
    setDialogueScenarioTag(`RONDE ${turn.turnNumber}: ${mission.title}`);

    const messages = [];
    if (turn.scenario) messages.push(turn.scenario);
    if (turn.question) messages.push(turn.question);

    setActiveDialogues(messages.length > 0 ? messages : ['Apa tindakan selanjutnya?']);
  };

  // Selesai mendengarkan skenario ronde -> Aktifkan Command Menu
  const handleTurnPromptComplete = () => {
    setBattleState('playerTurn');
    setIsCommandLocked(false);
  };

  // Daftar opsi perintah saat ini
  const activeCommands = mission.commandMode === 'twoChoice'
    ? (mission.customCommands || currentTurn.options)
    : (currentTurn.options || [
      { id: 'IDENTIFIKASI', label: 'IDENTIFIKASI' },
      { id: 'PENILAIAN', label: 'PENILAIAN' },
      { id: 'PENANGANAN', label: 'PENANGANAN' },
      { id: 'PEMANTAUAN', label: 'PEMANTAUAN' },
    ]);

  // Eksekusi Pilihan Aksi Pemain
  const handleSelectCommand = (commandId) => {
    if (battleState !== 'playerTurn' || isCommandLocked) return;

    setIsCommandLocked(true);
    clearAllTimers();

    const isCorrect = commandId === currentTurn.correctAction;
    const selectedCmd = activeCommands.find((c) => c.id === commandId);
    const commandLabel = selectedCmd ? selectedCmd.label : commandId;

    const isReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isCorrect) {
      // ==========================================
      // ALUR JAWABAN BENAR
      // ==========================================
      if (currentTurn.discoveredFramework) {
        discoverFramework(currentTurn.discoveredFramework);
      }

      setActionEffectType(currentTurn.attackEffect || commandId);
      setBattleState('animating');
      setAnnouncementBadge(`AKSI ANALIS: ${commandLabel}`);
      setAnnouncementText(
        mission.id === 2
          ? `ANALIS RISIKO menggunakan ${commandLabel}!`
          : `ANALIS RISIKO memilih ${commandLabel}!`
      );

      // STEP 2 — Player Attack Motion (~150ms)
      addTimer(() => {
        setIsPlayerLunging(true);
        playAttackWhooshSound();
      }, 150);

      // Reset lunge pemain (~280ms)
      addTimer(() => {
        setIsPlayerLunging(false);
      }, 280);

      // STEP 3 — Proyektil Orisinal (~250ms)
      addTimer(() => {
        if (!isReducedMotion) {
          setActiveEffect('player-projectile');
        }
      }, 250);

      // STEP 4 — Benturan pada Musuh (~510ms)
      addTimer(() => {
        setActiveEffect('enemy-impact');
        playHitSound();
        setIsEnemyHit(true);
        setIsEnemyHitFlash(true);
        setIsArenaShaking(true);
      }, 510);

      // STEP 5 — Pengurangan HP Musuh (~530ms)
      const targetDamage = currentTurn.damage || 20;
      const nextEnemyHP = Math.max(0, enemyHP - targetDamage);
      addTimer(() => {
        setEnemyHP(nextEnemyHP);
        setCorrectAnswers((prev) => prev + 1);
      }, 530);

      // Bersihkan benturan & guncangan arena (~660ms)
      addTimer(() => {
        setIsArenaShaking(false);
        setActiveEffect('none');
      }, 660);

      // Bersihkan flash & getar musuh (~730ms)
      addTimer(() => {
        setIsEnemyHit(false);
        setIsEnemyHitFlash(false);
      }, 730);

      const isFinalTurn = turnIndex >= mission.turns.length - 1 || nextEnemyHP <= 0;

      if (isFinalTurn) {
        // ALUR KEMENANGAN MISI (VICTORY FLOW)
        addTimer(() => {
          setIsEnemyHitFlash(true);
          setIsEnemyHit(true);
          setIsArenaShaking(true);
        }, 1080);

        addTimer(() => {
          setIsArenaShaking(false);
        }, 1230);

        addTimer(() => {
          setIsEnemyHit(false);
          setIsEnemyHitFlash(false);
          setIsEnemyDefeated(true);
          playVictorySound();
        }, 1450);

        addTimer(() => {
          setBattleState('victoryDialog');
          setDialogueScenarioTag('MISI SELESAI');
          setActiveDialogues(mission.victoryDialogues);
          setIsCommandLocked(false);
        }, 2100);
      } else {
        // STEP 6 — Dialog Penjelasan Edukasi (~1150ms)
        addTimer(() => {
          setBattleState('actionFeedback');
          setDialogueScenarioTag(`AKSI TEPAT: ${commandLabel}`);
          setActiveDialogues(currentTurn.correctDialogues);
          setIsCommandLocked(false);
        }, 1150);
      }
    } else {
      // ==========================================
      // ALUR JAWABAN SALAH (SERANGAN BALIK MUSUH)
      // ==========================================
      setWrongAnswers((prev) => prev + 1);
      setScore((prev) => Math.max(0, prev - 100));

      setBattleState('animating');
      setAnnouncementBadge('KEPUTUSAN TIDAK TEPAT');
      setAnnouncementText('Pilihan kurang tepat!');
      playWrongSound();

      // Teks peringatan musuh menyerang balik (~650ms)
      addTimer(() => {
        setAnnouncementText(`${mission.enemy.name} menyerang balik!`);
      }, 650);

      // STEP 1 — Gerakan Serangan Musuh (~1200ms)
      addTimer(() => {
        setIsEnemyLunging(true);
        playEnemyAttackSound();
      }, 1200);

      // Reset lunge musuh (~1350ms)
      addTimer(() => {
        setIsEnemyLunging(false);
      }, 1350);

      // STEP 2 — Proyektil Corrupted Data (~1320ms)
      addTimer(() => {
        if (!isReducedMotion) {
          setActiveEffect('enemy-projectile');
        }
      }, 1320);

      // STEP 3 — Benturan pada Pemain (~1580ms)
      addTimer(() => {
        setActiveEffect('player-impact');
        setShowRedFlash(true);
        playPlayerHurtSound();
        setIsPlayerHit(true);
        setIsPlayerHitFlash(true);
        setIsArenaShaking(true);
      }, 1580);

      // STEP 4 — Pengurangan HP Pemain (-10 HP) (~1600ms)
      const nextPlayerHP = Math.max(0, playerHP - 10);
      addTimer(() => {
        setPlayerHP(nextPlayerHP);
      }, 1600);

      // Bersihkan red flash & guncangan arena (~1700ms)
      addTimer(() => {
        setShowRedFlash(false);
        setIsArenaShaking(false);
        setActiveEffect('none');
      }, 1700);

      // Bersihkan flash & getar pemain (~1800ms)
      addTimer(() => {
        setIsPlayerHit(false);
        setIsPlayerHitFlash(false);
      }, 1800);

      if (nextPlayerHP <= 0) {
        // ALUR KEKALAHAN PEMAIN (DEFEAT FLOW)
        addTimer(() => {
          setIsPlayerHitFlash(true);
          setIsPlayerHit(true);
          playDefeatSound();
        }, 2050);

        addTimer(() => {
          setIsPlayerHitFlash(false);
          setIsPlayerHit(false);
          setBattleState('defeat');
          setIsCommandLocked(false);
        }, 2650);
      } else {
        // BERTAHAN: Dialog Koreksi Edukasi (~2050ms)
        addTimer(() => {
          setBattleState('actionFeedback');
          setDialogueScenarioTag('KEPUTUSAN TIDAK TEPAT');
          setActiveDialogues(currentTurn.wrongDialogues);
          setIsCommandLocked(false);
        }, 2050);
      }
    }
  };

  // Selesai membaca dialog edukasi
  const handleActionFeedbackComplete = () => {
    if (playerHP <= 0) {
      setBattleState('defeat');
      return;
    }

    const wasCorrectAction = activeDialogues === currentTurn.correctDialogues;

    if (wasCorrectAction) {
      if (turnIndex >= mission.turns.length - 1 || enemyHP <= 0) {
        setBattleState('victoryDialog');
        setDialogueScenarioTag('MISI SELESAI');
        setActiveDialogues(mission.victoryDialogues);
      } else {
        const nextTurnIndex = turnIndex + 1;
        setTurnIndex(nextTurnIndex);
        startTurnPrompt(nextTurnIndex);
      }
    } else {
      // Jika salah, pemain mencoba memilih kembali di ronde yang sama
      setBattleState('playerTurn');
      setIsCommandLocked(false);
    }
  };

  // Selesai Dialog Kemenangan -> Oper hasil ke callback onMissionVictory
  const handleVictoryDialogComplete = () => {
    const finalRank = calculateRank(score);
    if (onMissionVictory) {
      onMissionVictory({
        missionId: mission.id,
        missionTitle: mission.title,
        enemyName: mission.enemy.name,
        score,
        correctAnswers,
        wrongAnswers,
        rank: finalRank,
        summary: mission.educationalSummary,
      });
    }
  };

  // Restart misi saat ini
  const handleRestartMission = () => {
    clearAllTimers();
    setPlayerHP(100);
    setEnemyHP(enemyMaxHP);
    setTurnIndex(0);
    setScore(1000);
    setCorrectAnswers(0);
    setWrongAnswers(0);

    setIsPlayerLunging(false);
    setIsPlayerHitFlash(false);
    setIsPlayerHit(false);
    setIsEnemyLunging(false);
    setIsEnemyHitFlash(false);
    setIsEnemyHit(false);
    setIsEnemyDefeated(false);
    setIsArenaShaking(false);
    setActiveEffect('none');
    setShowRedFlash(false);
    setIsCommandLocked(false);

    setBattleState('intro');
    setActiveDialogues(mission.introDialogues);
    setDialogueScenarioTag(mission.enemy.titleBadge || 'INSIDEN BARU');
  };

  // Layar Kekalahan
  if (battleState === 'defeat') {
    return (
      <DefeatScreen
        onRetry={handleRestartMission}
        onReturnToTitle={onReturnToFloor}
      />
    );
  }

  return (
    <div className="battle-screen-wrapper">
      {/* Panggung Arena Handheld JRPG 4:3 */}
      <BattleArena
        playerHP={playerHP}
        playerMaxHP={100}
        enemyHP={enemyHP}
        enemyMaxHP={enemyMaxHP}
        isEnemyHit={isEnemyHit}
        isEnemyDefeated={isEnemyDefeated}
        isPlayerHit={isPlayerHit}
        isPlayerLunging={isPlayerLunging}
        isPlayerHitFlash={isPlayerHitFlash}
        isEnemyLunging={isEnemyLunging}
        isEnemyHitFlash={isEnemyHitFlash}
        isArenaShaking={isArenaShaking}
        activeEffect={activeEffect}
        actionType={actionEffectType}
        showRedFlash={showRedFlash}
        playerName="ANALIS RISIKO"
        enemyName={mission.enemy.name}
        enemyLevel={mission.enemy.level}
        enemySpriteKey={mission.enemy.spriteKey}
        backgroundKey={mission.backgroundKey}
        environmentLabel={currentTurn.environmentLabel || ''}
      />

      {/* Bagian Bawah: Dialog, Pengumuman Animasi Serangan, atau Menu Perintah */}
      <div className="battle-control-area">
        {battleState === 'playerTurn' ? (
          <CommandMenu
            commands={activeCommands}
            commandMode={mission.commandMode || 'grid4'}
            onSelectCommand={handleSelectCommand}
            disabled={isCommandLocked || isPaused}
            playerName="ANALIS RISIKO"
            promptText={
              mission.commandMode === 'twoChoice'
                ? 'Tentukan klasifikasi pernyataan:'
                : undefined
            }
          />
        ) : battleState === 'animating' ? (
          <div className="dialogue-box dialogue-box-announcement">
            {announcementBadge && (
              <div className="dialogue-scenario-badge">{announcementBadge}</div>
            )}
            <div className="dialogue-text">{announcementText}</div>
          </div>
        ) : (
          <DialogueBox
            key={`${battleState}-${turnIndex}-${dialogueScenarioTag}`}
            messages={activeDialogues}
            scenarioSubtitle={dialogueScenarioTag}
            disabled={isPaused}
            onComplete={
              battleState === 'intro'
                ? handleIntroComplete
                : battleState === 'turnPrompt'
                  ? handleTurnPromptComplete
                  : battleState === 'actionFeedback'
                    ? handleActionFeedbackComplete
                    : battleState === 'victoryDialog'
                      ? handleVictoryDialogComplete
                      : undefined
            }
          />
        )}
      </div>
    </div>
  );
}
