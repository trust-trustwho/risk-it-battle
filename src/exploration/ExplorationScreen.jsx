// ExplorationScreen.jsx - Main React Component for Exploration Prototype
import React, { useState, useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { createPhaserConfig } from './phaserConfig';
import { isSoundEnabled, toggleSound, playCursorSound, playSelectSound } from '../game/soundFx';
import {
  playElevatorDingSound,
  playDialogueBlipSound,
  playIncidentAlertSound,
} from './audio/explorationAudio';
import CompactMusicControl from '../components/CompactMusicControl';
import BgmVolumeSlider from '../components/BgmVolumeSlider';
import { bgmManager } from '../audio/bgmManager';

export default function ExplorationScreen({
  progress,
  initialLocation = 'lobby',
  initialSpawn = {},
  justCompletedMission1 = false,
  justCompletedMission2 = false,
  justCompletedMission3 = false,
  justCompletedMission4 = false,
  justCompletedMission5 = false,
  onStartMission,
  onOpenRiskDex,
  onReturnToTitle,
  onViewCampaignResult,
  onLocationChange,
  crtEnabled,
  onToggleCrt,
}) {
  const gameContainerRef = useRef(null);
  const phaserGameRef = useRef(null);

  // Active Location & Floor Name
  const [currentLocation, setCurrentLocation] = useState(initialLocation);

  // Proximity Hint
  const [proximityItem, setProximityItem] = useState(null);

  // Active Modal States (Only one can be active at a time)
  const [activeDialogue, setActiveDialogue] = useState(null); // { dialogue: [{ speaker, text }] }
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [typedChars, setTypedChars] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [showElevatorModal, setShowElevatorModal] = useState(false);
  const [elevatorSelectedFloor, setElevatorSelectedFloor] = useState(0);
  const [elevatorNotice, setElevatorNotice] = useState(null);

  const [showMissionBoard, setShowMissionBoard] = useState(false);

  const [missionDoorConfirm, setMissionDoorConfirm] = useState(null); // { isCompleted, missionId }
  const [confirmChoiceIndex, setConfirmChoiceIndex] = useState(1); // 0 = YA / ULANGI, 1 = TIDAK / BATAL

  // Transition / Alert Animation Overlays
  const [floorTransitionText, setFloorTransitionText] = useState(null);
  const [incidentAlertText, setIncidentAlertText] = useState(null);

  // Post-victory notification state
  const [showVictoryNotice, setShowVictoryNotice] = useState(
    justCompletedMission1 || justCompletedMission2 || justCompletedMission3 || justCompletedMission4 || justCompletedMission5
  );
  const completedMissionNumber = justCompletedMission5
    ? 5
    : justCompletedMission4
    ? 4
    : justCompletedMission3
    ? 3
    : justCompletedMission2
    ? 2
    : justCompletedMission1
    ? 1
    : null;

  // In-Game Exploration Settings Menu
  const [isExplorationSettingsOpen, setIsExplorationSettingsOpen] = useState(false);
  const [settingsSelectedIdx, setSettingsSelectedIdx] = useState(0);
  const [soundOn, setSoundOn] = useState(isSoundEnabled);

  // Sinkronisasi status suara dari custom event
  useEffect(() => {
    const handleSoundChange = (e) => {
      if (e.detail && typeof e.detail.enabled === 'boolean') {
        setSoundOn(e.detail.enabled);
      } else {
        setSoundOn(isSoundEnabled());
      }
    };
    window.addEventListener('risk-sound-changed', handleSoundChange);
    return () => window.removeEventListener('risk-sound-changed', handleSoundChange);
  }, []);

  useEffect(() => {
    if (isExplorationSettingsOpen) {
      setSettingsSelectedIdx(0);
    }
  }, [isExplorationSettingsOpen]);

  const isMission1Completed = Boolean(
    progress && progress.completedMissions && progress.completedMissions.includes(1)
  );
  const isMission2Completed = Boolean(
    progress && progress.completedMissions && progress.completedMissions.includes(2)
  );
  const isMission3Completed = Boolean(
    progress && progress.completedMissions && progress.completedMissions.includes(3)
  );
  const isMission4Completed = Boolean(
    progress && progress.completedMissions && progress.completedMissions.includes(4)
  );
  const isMission5Completed = Boolean(
    progress && progress.completedMissions && progress.completedMissions.includes(5)
  );
  const isFloor2Unlocked = Boolean(
    progress && progress.unlockedMissions && progress.unlockedMissions.includes(2)
  );
  const isFloor3Unlocked = Boolean(
    progress && progress.unlockedMissions && progress.unlockedMissions.includes(3)
  );
  const isFloor4Unlocked = Boolean(
    progress && progress.unlockedMissions && progress.unlockedMissions.includes(4)
  );
  const isFloor5Unlocked = Boolean(
    progress && progress.unlockedMissions && progress.unlockedMissions.includes(5)
  );



  // Shared ref mirrors to prevent stale closure & double triggers
  const currentLocationRef = useRef(currentLocation);
  currentLocationRef.current = currentLocation;

  const isFloor2UnlockedRef = useRef(isFloor2Unlocked);
  isFloor2UnlockedRef.current = isFloor2Unlocked;

  const isFloor3UnlockedRef = useRef(isFloor3Unlocked);
  isFloor3UnlockedRef.current = isFloor3Unlocked;

  const isFloor4UnlockedRef = useRef(isFloor4Unlocked);
  isFloor4UnlockedRef.current = isFloor4Unlocked;

  const isFloor5UnlockedRef = useRef(isFloor5Unlocked);
  isFloor5UnlockedRef.current = isFloor5Unlocked;

  const isMission3CompletedRef = useRef(isMission3Completed);
  isMission3CompletedRef.current = isMission3Completed;

  const isMission4CompletedRef = useRef(isMission4Completed);
  isMission4CompletedRef.current = isMission4Completed;

  const isMission5CompletedRef = useRef(isMission5Completed);
  isMission5CompletedRef.current = isMission5Completed;

  const elevatorSelectedFloorRef = useRef(elevatorSelectedFloor);
  elevatorSelectedFloorRef.current = elevatorSelectedFloor;
  const isTransitioningRef = useRef(false);

  // Synchronous mirrors & timer references for authoritative dialogue control
  const activeDialogueRef = useRef(activeDialogue);
  activeDialogueRef.current = activeDialogue;

  const dialogueIndexRef = useRef(dialogueIndex);
  dialogueIndexRef.current = dialogueIndex;

  const isTypingRef = useRef(isTyping);
  isTypingRef.current = isTyping;

  const typingTimerRef = useRef(null);
  const dialogueOpenedTimeRef = useRef(0);
  const lastDialogueActionTimeRef = useRef(0);

  // Are any overlays active? When true, Phaser player controls MUST be disabled
  const isAnyOverlayActive =
    Boolean(activeDialogue) ||
    showElevatorModal ||
    showMissionBoard ||
    Boolean(missionDoorConfirm) ||
    Boolean(floorTransitionText) ||
    Boolean(incidentAlertText) ||
    isExplorationSettingsOpen;

  // Sync Input Disabled state to Phaser
  useEffect(() => {
    if (phaserGameRef.current) {
      phaserGameRef.current.events.emit('setInputDisabled', isAnyOverlayActive);
    }
  }, [isAnyOverlayActive]);

  // Hide Victory Notice after 5 seconds
  useEffect(() => {
    if (showVictoryNotice) {
      playElevatorDingSound();
      const t = setTimeout(() => setShowVictoryNotice(false), 5000);
      return () => clearTimeout(t);
    }
  }, [showVictoryNotice]);

  // =========================================================================
  // INITIALIZE PHASER GAME
  // =========================================================================
  useEffect(() => {
    if (!gameContainerRef.current) return;

    // StrictMode safeguard: clean up existing instance if any
    if (phaserGameRef.current) {
      phaserGameRef.current.destroy(true);
      phaserGameRef.current = null;
    }
    if (gameContainerRef.current) {
      gameContainerRef.current.innerHTML = '';
    }

    const config = createPhaserConfig(gameContainerRef.current, initialLocation);
    const game = new Phaser.Game(config);
    phaserGameRef.current = game;

    // Set Global Registry from React progress immediately on boot
    game.registry.set('mission1Completed', isMission1Completed);
    game.registry.set('mission2Completed', isMission2Completed);
    game.registry.set('mission3Completed', isMission3Completed);
    game.registry.set('mission4Completed', isMission4Completed);
    game.registry.set('mission5Completed', isMission5Completed);
    game.registry.set('floor2Unlocked', isFloor2Unlocked);
    game.registry.set('floor3Unlocked', isFloor3Unlocked);
    game.registry.set('floor4Unlocked', isFloor4Unlocked);
    game.registry.set('floor5Unlocked', isFloor5Unlocked);
    game.registry.set('initialSpawn', initialSpawn);

    // Event Listeners from Phaser Scenes to React
    game.events.on('proximityChanged', (item) => {
      setProximityItem(item);
    });

    game.events.on('openDialogue', (payload) => {
      if (!payload || !payload.dialogue || !payload.dialogue.length) {
        return;
      }
      playSelectSound();
      const now = Date.now();
      dialogueOpenedTimeRef.current = now;
      lastDialogueActionTimeRef.current = now;

      // Clear any prior running typing timer
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }

      activeDialogueRef.current = payload.dialogue;
      dialogueIndexRef.current = 0;
      isTypingRef.current = true;

      setActiveDialogue(payload.dialogue);
      setDialogueIndex(0);
      setTypedChars('');
      setIsTyping(true);

      // Disable Phaser input synchronously so player immediately halts
      if (phaserGameRef.current) {
        phaserGameRef.current.events.emit('setInputDisabled', true);
      }
    });

    game.events.on('openMissionBoard', () => {
      playSelectSound();
      setShowMissionBoard(true);
    });

    game.events.on('openElevator', (payload) => {
      playSelectSound();
      setShowElevatorModal(true);
      const activeLoc = (payload && payload.currentFloor) || currentLocationRef.current;
      let initialHighlight = 0;
      if (activeLoc === 'lobby') {
        initialHighlight = 1;
      } else if (activeLoc === 'floor1') {
        initialHighlight = isFloor2UnlockedRef.current ? 2 : 0;
      } else if (activeLoc === 'floor2') {
        initialHighlight = isFloor3UnlockedRef.current ? 3 : 1;
      } else if (activeLoc === 'floor3') {
        initialHighlight = isFloor4UnlockedRef.current ? 4 : 2;
      } else if (activeLoc === 'floor4') {
        initialHighlight = isFloor5UnlockedRef.current ? 5 : 3;
      } else if (activeLoc === 'floor5') {
        initialHighlight = 4;
      }
      setElevatorSelectedFloor(initialHighlight);
      elevatorSelectedFloorRef.current = initialHighlight;
      setElevatorNotice(null);
    });

    game.events.on('openMissionDoor', (payload) => {
      playSelectSound();
      setMissionDoorConfirm(payload);
      setConfirmChoiceIndex(1); // Default to TIDAK / BATAL
    });

    game.events.on('openRiskDex', (payload) => {
      playSelectSound();
      if (onOpenRiskDex) {
        onOpenRiskDex(payload);
      }
    });

    // ResizeObserver ensures canvas scale stays sharp and centered if container flex dimensions change
    const resizeObserver = new ResizeObserver(() => {
      if (phaserGameRef.current && phaserGameRef.current.scale) {
        phaserGameRef.current.scale.refresh();
      }
    });
    if (gameContainerRef.current) {
      resizeObserver.observe(gameContainerRef.current);
    }

    // Safeguard scene starting if auto-boot didn't fire
    game.events.once('ready', () => {
      if (!phaserGameRef.current || phaserGameRef.current !== game) return;
      const initialSceneKey = initialLocation === 'floor5'
        ? 'Floor5Scene'
        : initialLocation === 'floor4'
        ? 'Floor4Scene'
        : initialLocation === 'floor3'
        ? 'Floor3Scene'
        : initialLocation === 'floor2'
        ? 'Floor2Scene'
        : initialLocation === 'floor1'
        ? 'Floor1Scene'
        : 'LobbyScene';
      const sceneManager = game.scene;
      const currentScene = sceneManager.getScene(initialSceneKey);
      if (!currentScene || !currentScene.scene.isActive()) {
        sceneManager.start(initialSceneKey, initialSpawn);
      }
    });

    return () => {
      resizeObserver.disconnect();
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true);
        phaserGameRef.current = null;
      }
      if (gameContainerRef.current) {
        gameContainerRef.current.innerHTML = '';
      }
    };
  }, []);

  // Cleanup typing timer on component unmount
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    };
  }, []);

  // =========================================================================
  // TYPEWRITER EFFECT FOR ACTIVE DIALOGUE
  // =========================================================================
  useEffect(() => {
    // Clear any previous running typewriter timer
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
    }

    if (!activeDialogue || !activeDialogue[dialogueIndex]) {
      setTypedChars('');
      setIsTyping(false);
      isTypingRef.current = false;
      return;
    }

    const fullText = activeDialogue[dialogueIndex].text || '';
    if (!fullText) {
      setTypedChars('');
      setIsTyping(false);
      isTypingRef.current = false;
      return;
    }

    setTypedChars('');
    setIsTyping(true);
    isTypingRef.current = true;

    let charIdx = 0;
    const interval = setInterval(() => {
      charIdx++;
      setTypedChars(fullText.slice(0, charIdx));
      playDialogueBlipSound();

      if (charIdx >= fullText.length) {
        if (typingTimerRef.current) {
          clearInterval(typingTimerRef.current);
          typingTimerRef.current = null;
        }
        setIsTyping(false);
        isTypingRef.current = false;
      }
    }, 24);

    typingTimerRef.current = interval;

    return () => {
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    };
  }, [activeDialogue, dialogueIndex]);

  // Advance or reveal dialogue (Strict Two-Step JRPG Logic)
  const handleAdvanceDialogue = () => {
    const curDialogue = activeDialogueRef.current;
    const curIndex = dialogueIndexRef.current;
    if (!curDialogue || !curDialogue[curIndex]) return;

    const fullText = curDialogue[curIndex].text || '';

    // STATE 1: If text is still animating character-by-character
    if (isTypingRef.current) {
      // 1. Cancel active typing timer immediately
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
      // 2. Instantly reveal the full current text
      setTypedChars(fullText);
      setIsTyping(false);
      isTypingRef.current = false;
      // 3. Early return: stay on the same dialogue page! Never advance here!
      return;
    }

    // STATE 2: If current text is already fully visible
    playCursorSound();
    if (curIndex < curDialogue.length - 1) {
      // Advance to next dialogue page
      const nextIndex = curIndex + 1;
      dialogueIndexRef.current = nextIndex;
      setDialogueIndex(nextIndex);
    } else {
      // Final page complete -> close dialogue cleanly
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
      activeDialogueRef.current = null;
      dialogueIndexRef.current = 0;
      isTypingRef.current = false;

      setActiveDialogue(null);
      setDialogueIndex(0);
      setTypedChars('');
      setIsTyping(false);

      if (phaserGameRef.current) {
        const stillDisabled =
          showElevatorModal ||
          showMissionBoard ||
          Boolean(missionDoorConfirm) ||
          Boolean(floorTransitionText) ||
          Boolean(incidentAlertText) ||
          isExplorationSettingsOpen;
        phaserGameRef.current.events.emit('setInputDisabled', stillDisabled);
      }
    }
  };

  // =========================================================================
  // ELEVATOR FLOOR TRANSITION & CONFIRMATION HANDLER
  // =========================================================================
  const confirmElevatorSelection = (floorIndex) => {
    if (isTransitioningRef.current) return;

    setElevatorSelectedFloor(floorIndex);
    elevatorSelectedFloorRef.current = floorIndex;

    const curLoc = currentLocationRef.current;
    const floor2Unlocked = isFloor2UnlockedRef.current;
    const floor3Unlocked = isFloor3UnlockedRef.current;

    if (floorIndex === 0) {
      // Travel to LOBBY
      if (curLoc === 'lobby') {
        playSelectSound();
        setShowElevatorModal(false);
        setElevatorNotice(null);
        return;
      }
      executeFloorTransition('lobby', 'LobbyScene', 'LOBBY · RISK IT TOWER');
    } else if (floorIndex === 1) {
      // Travel to LANTAI 1 (Always unlocked: TERSEDIA or SELESAI ✓)
      if (curLoc === 'floor1') {
        playSelectSound();
        setShowElevatorModal(false);
        setElevatorNotice(null);
        return;
      }
      executeFloorTransition('floor1', 'Floor1Scene', 'LANTAI 1 · FRAMEWORK DIVISION');
    } else if (floorIndex === 2) {
      // Travel to LANTAI 2
      if (curLoc === 'floor2') {
        playSelectSound();
        setShowElevatorModal(false);
        setElevatorNotice(null);
        return;
      }
      if (floor2Unlocked) {
        executeFloorTransition('floor2', 'Floor2Scene', 'LANTAI 2 · SECURITY OPERATIONS');
      } else {
        playCursorSound();
        setElevatorNotice({
          title: 'LANTAI 2 TERKUNCI',
          body: 'Selesaikan evaluasi pada LANTAI 1 untuk memperoleh izin akses.',
        });
      }
    } else if (floorIndex === 3) {
      // Travel to LANTAI 3
      if (curLoc === 'floor3') {
        playSelectSound();
        setShowElevatorModal(false);
        setElevatorNotice(null);
        return;
      }
      if (floor3Unlocked) {
        executeFloorTransition('floor3', 'Floor3Scene', 'LANTAI 3 · SECTOR SIMULATION CENTER');
      } else {
        playCursorSound();
        setElevatorNotice({
          title: 'LANTAI 3 TERKUNCI',
          body: 'Selesaikan penanganan insiden pada LANTAI 2 untuk memperoleh izin akses.',
        });
      }
    } else if (floorIndex === 4) {
      // Travel to LANTAI 4
      if (curLoc === 'floor4') {
        playSelectSound();
        setShowElevatorModal(false);
        setElevatorNotice(null);
        return;
      }
      if (isFloor4UnlockedRef.current) {
        executeFloorTransition('floor4', 'Floor4Scene', 'LANTAI 4 · TRADE-OFF ANALYSIS');
      } else {
        playCursorSound();
        setElevatorNotice({
          title: 'LANTAI 4 TERKUNCI',
          body: 'Selesaikan simulasi multi-sektor pada LANTAI 3 untuk memperoleh izin akses.',
        });
      }
    } else if (floorIndex === 5) {
      if (curLoc === 'floor5') {
        playSelectSound();
        setShowElevatorModal(false);
        setElevatorNotice(null);
        return;
      }
      if (isFloor5UnlockedRef.current) {
        executeFloorTransition('floor5', 'Floor5Scene', 'LANTAI 5 · CRISIS COMMAND CENTER');
      } else {
        playCursorSound();
        setElevatorNotice({
          title: 'LANTAI 5 TERKUNCI',
          body: 'Selesaikan analisis trade-off pada LANTAI 4 untuk memperoleh izin akses.',
        });
      }
    } else {
      playCursorSound();
      setElevatorNotice({
        title: `LANTAI ${floorIndex} TERKUNCI`,
        body: 'Akses tingkat tinggi belum diizinkan oleh Otoritas Manajemen Risiko.',
      });
    }
  };

  const handleElevatorSelect = confirmElevatorSelection;

  const executeFloorTransition = (targetLoc, targetSceneKey, headerTitle) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    setShowElevatorModal(false);
    setElevatorNotice(null);
    playElevatorDingSound();
    setFloorTransitionText(headerTitle);

    const fromLoc = currentLocationRef.current;

    setTimeout(() => {
      const game = phaserGameRef.current;
      if (game) {
        const fromScene = fromLoc === 'floor5'
          ? 'Floor5Scene'
          : fromLoc === 'floor4'
          ? 'Floor4Scene'
          : fromLoc === 'floor3'
          ? 'Floor3Scene'
          : fromLoc === 'floor2'
          ? 'Floor2Scene'
          : fromLoc === 'floor1'
          ? 'Floor1Scene'
          : 'LobbyScene';
        game.registry.set('initialSpawn', { spawn: 'elevator' });
        game.scene.stop(fromScene);
        game.scene.start(targetSceneKey, { spawn: 'elevator' });
      }
      setCurrentLocation(targetLoc);
      currentLocationRef.current = targetLoc;
      if (onLocationChange) onLocationChange(targetLoc, { spawn: 'elevator' });

      setTimeout(() => {
        setFloorTransitionText(null);
        isTransitioningRef.current = false;
      }, 700);
    }, 600);
  };

  // =========================================================================
  // MISSION ROOM BATTLE ENTRY
  // =========================================================================
  const handleConfirmMissionEntry = () => {
    if (confirmChoiceIndex === 1) {
      // Cancelled
      playSelectSound();
      setMissionDoorConfirm(null);
      return;
    }

    // Confirmed Entry (Choice 0)
    const targetMid = missionDoorConfirm ? (missionDoorConfirm.missionId || 1) : 1;
    setMissionDoorConfirm(null);
    playIncidentAlertSound();
    const alertTitle = targetMid === 5
      ? 'KRISIS SISTEM'
      : targetMid === 4
      ? 'TRADE-OFF RISK IT'
      : targetMid === 3
      ? 'KRISIS SEKTOR'
      : targetMid === 2
      ? 'KEBOCORAN DATA'
      : 'KEBINGUNGAN FRAMEWORK';
    setIncidentAlertText(alertTitle);

    setTimeout(() => {
      setIncidentAlertText(null);
      if (onStartMission) {
        onStartMission(targetMid);
      }
    }, 1300);
  };

  // =========================================================================
  // KEYBOARD NAVIGATION FOR ACTIVE MODALS
  // =========================================================================
  useEffect(() => {
    const handleKeyDown = (e) => {
      // 1. Dialogue Box Keyboard Handling (AUTHORITATIVE & HIGHEST PRIORITY)
      if (activeDialogueRef.current) {
        const isSpace = e.key === ' ' || e.code === 'Space' || e.key === 'Spacebar';
        const isEnter = e.key === 'Enter';
        const isE = e.key === 'e' || e.key === 'E';

        // While dialogue is open, consume SPACE, ENTER, and E completely
        if (isSpace || isEnter || isE) {
          e.preventDefault();
          e.stopPropagation();

          // Ignore keyboard auto-repeat (holding key down)
          if (e.repeat) {
            return;
          }

          // Debounce initial opening keypress (so the same E or Enter that opened dialogue does not advance)
          if (Date.now() - dialogueOpenedTimeRef.current < 180) {
            return;
          }

          // Small conservative safety throttle (80ms) against accidental frame double-tap
          if (Date.now() - lastDialogueActionTimeRef.current < 80) {
            return;
          }

          // Constraint 1 & 2: ENTER and SPACE are the ONLY keys that advance dialogue.
          // E is consumed to prevent leaking, but does NOT call handleAdvanceDialogue().
          if (isEnter || isSpace) {
            lastDialogueActionTimeRef.current = Date.now();
            handleAdvanceDialogue();
          }
          return;
        }

        // If Escape is pressed while dialogue is open, consume it so settings cannot open behind dialogue
        if (e.key === 'Escape') {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        return;
      }

      // 2. ESC / Backquote toggles In-Exploration Settings
      if (e.key === 'Escape') {
        e.preventDefault();
        if (showElevatorModal) {
          setShowElevatorModal(false);
          setElevatorNotice(null);
          playCursorSound();
        } else if (showMissionBoard) {
          setShowMissionBoard(false);
          playCursorSound();
        } else if (missionDoorConfirm) {
          setMissionDoorConfirm(null);
          playCursorSound();
        } else {
          setIsExplorationSettingsOpen((prev) => !prev);
          playCursorSound();
        }
        return;
      }

      // 3. Settings Menu Keyboard Handling
      if (isExplorationSettingsOpen) {
        const isFloorScene =
          currentLocation === 'floor1' ||
          currentLocation === 'floor2' ||
          currentLocation === 'floor3' ||
          currentLocation === 'floor4' ||
          currentLocation === 'floor5';
        const menuCount = isFloorScene ? 5 : 4;
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSettingsSelectedIdx((prev) => (prev > 0 ? prev - 1 : menuCount - 1));
          playCursorSound();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSettingsSelectedIdx((prev) => (prev < menuCount - 1 ? prev + 1 : 0));
          playCursorSound();
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          playSelectSound();
          if (settingsSelectedIdx === 0) {
            // Suara NYALA/MATI
            const next = toggleSound();
            setSoundOn(next);
          } else if (settingsSelectedIdx === 1) {
            // VOLUME BGM (aktif)
          } else if (settingsSelectedIdx === 2) {
            // CRT NYALA/MATI
            if (onToggleCrt) onToggleCrt();
          } else if (settingsSelectedIdx === 3 && isFloorScene) {
            // Kembali ke Lobby
            setIsExplorationSettingsOpen(false);
            executeFloorTransition('lobby', 'LobbyScene', 'LOBBY · RISK IT TOWER');
          } else {
            // Kembali ke Beranda (Title)
            setIsExplorationSettingsOpen(false);
            if (onReturnToTitle) onReturnToTitle();
          }
        }
        return;
      }

      // 4. Mission Door Confirm Modal
      if (missionDoorConfirm) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          e.preventDefault();
          setConfirmChoiceIndex((prev) => (prev === 0 ? 1 : 0));
          playCursorSound();
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleConfirmMissionEntry();
        }
        return;
      }

      // 5. Elevator Selector Modal
      if (showElevatorModal) {
        const totalFloors = 6; // 0 to 5
        const isSpaceKey = e.key === ' ' || e.code === 'Space' || e.key === 'Spacebar';
        const isEnterKey = e.key === 'Enter';

        if (e.key === 'ArrowUp') {
          e.preventDefault();
          e.stopPropagation();
          setElevatorSelectedFloor((prev) => {
            const nextIdx = prev > 0 ? prev - 1 : totalFloors - 1;
            elevatorSelectedFloorRef.current = nextIdx;
            return nextIdx;
          });
          setElevatorNotice(null);
          playCursorSound();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          e.stopPropagation();
          setElevatorSelectedFloor((prev) => {
            const nextIdx = prev < totalFloors - 1 ? prev + 1 : 0;
            elevatorSelectedFloorRef.current = nextIdx;
            return nextIdx;
          });
          setElevatorNotice(null);
          playCursorSound();
        } else if (isEnterKey || isSpaceKey) {
          e.preventDefault();
          e.stopPropagation();
          confirmElevatorSelection(elevatorSelectedFloorRef.current);
        }
        return;
      }

      // 6. Mission Board Modal
      if (showMissionBoard) {
        if (e.key === 'Enter' || e.key === 'e' || e.key === 'E' || e.key === ' ') {
          e.preventDefault();
          setShowMissionBoard(false);
          playSelectSound();
        }
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isExplorationSettingsOpen,
    settingsSelectedIdx,
    activeDialogue,
    dialogueIndex,
    isTyping,
    missionDoorConfirm,
    confirmChoiceIndex,
    showElevatorModal,
    elevatorSelectedFloor,
    showMissionBoard,
    currentLocation,
  ]);

  return (
    <div className="exploration-screen-container">
      {/* 1. Top Exploration Minimal HUD */}
      <div className="exploration-hud-strip">
        <div className="hud-location-badge">
          <span className="location-pin">📍</span>
          <span className="location-name">
            {currentLocation === 'lobby'
              ? 'RISK IT TOWER · LOBBY'
              : currentLocation === 'floor5'
              ? 'LANTAI 5 · CRISIS COMMAND CENTER'
              : currentLocation === 'floor4'
              ? 'LANTAI 4 · TRADE-OFF ANALYSIS'
              : currentLocation === 'floor3'
              ? 'LANTAI 3 · SECTOR SIMULATION CENTER'
              : currentLocation === 'floor2'
              ? 'LANTAI 2 · SECURITY OPERATIONS'
              : 'LANTAI 1 · FRAMEWORK DIVISION'}
          </span>
        </div>

        <div className="hud-right-actions">
          <CompactMusicControl />
          <span className="analyst-pill">ANALIS RISIKO</span>
          <button
            type="button"
            className="exploration-gear-btn"
            title="Pengaturan (ESC)"
            onClick={() => {
              playCursorSound();
              setIsExplorationSettingsOpen((prev) => !prev);
            }}
          >
            ⚙
          </button>
        </div>
      </div>

      {/* 2. Phaser Canvas Viewport */}
      <div className="exploration-canvas-wrapper" ref={gameContainerRef} />

      {/* 3. Proximity Interaction Hint Pill */}
      {proximityItem && !isAnyOverlayActive && (
        <div className="exploration-proximity-pill" aria-live="polite">
          <span className="key-badge">E</span>
          <span className="action-text">{proximityItem.label.replace('[E] ', '')}</span>
        </div>
      )}

      {/* 4. Post-Victory Return / Unlock Notification */}
      {showVictoryNotice && (
        <div className="exploration-victory-banner" aria-live="assertive">
          <span className="banner-sparkle">✦</span>
          <span className="banner-title">
            {completedMissionNumber === 5 ? 'MISI FINAL SELESAI' : 'MISI SELESAI'}
          </span>
          {completedMissionNumber === 5 ? (
            <>
              <span className="banner-sub-desc">KRISIS SISTEM TERKENDALI</span>
              <span className="banner-desc">RISK IT TOWER SELESAI</span>
            </>
          ) : completedMissionNumber === 4 ? (
            <>
              <span className="banner-sub-desc">TRADE-OFF DIANALISIS</span>
              <span className="banner-desc">AKSES LANTAI 5 DIBERIKAN</span>
            </>
          ) : completedMissionNumber === 3 ? (
            <>
              <span className="banner-sub-desc">SIMULASI SEKTOR BERHASIL</span>
              <span className="banner-desc">AKSES LANTAI 4 DIBERIKAN</span>
            </>
          ) : completedMissionNumber === 2 ? (
            <>
              <span className="banner-sub-desc">RISIKO TERMITIGASI</span>
              <span className="banner-desc">AKSES LANTAI 3 DIBERIKAN</span>
            </>
          ) : (
            <span className="banner-desc">AKSES LANTAI 2 DIBERIKAN</span>
          )}
          <span className="banner-sparkle">✦</span>
        </div>
      )}

      {/* 5. Typewriter Retro Dialogue Box */}
      {activeDialogue && activeDialogue[dialogueIndex] && (
        <div
          className="exploration-dialogue-card"
          onClick={handleAdvanceDialogue}
          role="dialog"
          aria-modal="true"
        >
          <div className="dialogue-speaker-tag">
            {activeDialogue[dialogueIndex].speaker}
          </div>
          <div className="dialogue-body-text">
            {typedChars}
            <span className="typewriter-cursor">_</span>
          </div>
          <div className="dialogue-advance-prompt">
            <span>
              {isTyping ? '[ENTER / SPACE] Tampilkan' : '[ENTER / SPACE] Lanjut'}
            </span>
            <span className="advance-arrow">▶</span>
          </div>
        </div>
      )}

      {/* 6. Elevator Floor Selector Modal */}
      {showElevatorModal && (
        <div
          className="exploration-modal-backdrop"
          onClick={(e) => {
            e.stopPropagation();
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
        >
          <div
            className="elevator-selector-card"
            role="dialog"
            aria-modal="true"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="elevator-header">
              <span className="elevator-icon">🛗</span>
              <span className="elevator-title">PILIH LANTAI (ELEVATOR)</span>
            </div>

            <div className="elevator-floors-list">
              {[
                { id: 0, label: 'LOBBY', status: 'TERSEDIA' },
                {
                  id: 1,
                  label: 'LANTAI 1 — FRAMEWORK',
                  status: isMission1Completed ? 'SELESAI ✓' : 'TERSEDIA',
                },
                {
                  id: 2,
                  label: 'LANTAI 2 — SECURITY OPS',
                  status: isMission2Completed
                    ? 'SELESAI ✓'
                    : isFloor2Unlocked
                    ? 'TERBUKA'
                    : 'TERKUNCI',
                },
                {
                  id: 3,
                  label: 'LANTAI 3 — SECTOR SIMULATION',
                  status: isMission3Completed
                    ? 'SELESAI ✓'
                    : isFloor3Unlocked
                    ? 'TERBUKA'
                    : 'TERKUNCI',
                },
                {
                  id: 4,
                  label: 'LANTAI 4 — TRADE-OFF',
                  status: isMission4Completed
                    ? 'SELESAI ✓'
                    : isFloor4Unlocked
                    ? 'TERBUKA'
                    : 'TERKUNCI',
                },
                {
                  id: 5,
                  label: 'LANTAI 5 — CRISIS COMMAND',
                  status: isMission5Completed
                    ? 'SELESAI ✓'
                    : isFloor5Unlocked
                    ? 'TERBUKA'
                    : 'TERKUNCI',
                },
              ].map((f) => {
                const isSelected = elevatorSelectedFloor === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    className={`elevator-floor-row ${isSelected ? 'active' : ''}`}
                    onMouseEnter={() => {
                      if (elevatorSelectedFloor !== f.id) {
                        setElevatorSelectedFloor(f.id);
                        elevatorSelectedFloorRef.current = f.id;
                        setElevatorNotice(null);
                        playCursorSound();
                      }
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      confirmElevatorSelection(f.id);
                    }}
                    onKeyDown={(e) => {
                      const isSpace = e.key === ' ' || e.code === 'Space' || e.key === 'Spacebar';
                      if (e.key === 'Enter' || isSpace) {
                        e.preventDefault();
                        e.stopPropagation();
                        confirmElevatorSelection(f.id);
                      }
                    }}
                  >
                    <span className="menu-cursor">{isSelected ? '▶' : '\u00A0'}</span>
                    <span className="floor-label">{f.label}</span>
                    <span
                      className={`floor-status ${
                        f.status.includes('SELESAI')
                          ? 'status-done'
                          : f.status.includes('TERBUKA') || f.status === 'TERSEDIA'
                          ? 'status-open'
                          : 'status-locked'
                      }`}
                    >
                      {f.status}
                    </span>
                  </button>
                );
              })}
            </div>

            {elevatorNotice && (
              <div className="elevator-notice-box">
                <div className="notice-title">
                  {elevatorNotice.isInfo ? 'ℹ️ ' : '⚠️ '}
                  {elevatorNotice.title}
                </div>
                <div className="notice-body">{elevatorNotice.body}</div>
              </div>
            )}

            <div className="elevator-footer-instructions">
              <span>[↑/↓] PILIH</span>
              <span>[ENTER/SPACE] KONFIRMASI</span>
              <span>[ESC] TUTUP</span>
            </div>
          </div>
        </div>
      )}

      {/* 7. Tower Status Board Modal */}
      {showMissionBoard && (
        <div className="exploration-modal-backdrop">
          <div className="tower-board-card" role="dialog" aria-modal="true">
            <div className="board-header">
              <span className="board-icon">📋</span>
              <span className="board-title">STATUS RISK IT TOWER</span>
            </div>

            <div className="board-rows-list">
              {[
                {
                  floor: 'LANTAI 1',
                  mission: 'KENALI FRAMEWORK',
                  status: isMission1Completed ? 'SELESAI ✓' : 'TERBUKA',
                },
                {
                  floor: 'LANTAI 2',
                  mission: 'KEBOCORAN DATA',
                  status: isMission2Completed
                    ? 'SELESAI ✓'
                    : isFloor2Unlocked
                    ? 'TERBUKA'
                    : 'TERKUNCI',
                },
                {
                  floor: 'LANTAI 3',
                  mission: 'KRISIS SEKTOR',
                  status: isMission3Completed
                    ? 'SELESAI ✓'
                    : isFloor3Unlocked
                    ? 'TERBUKA'
                    : 'TERKUNCI',
                },
                {
                  floor: 'LANTAI 4',
                  mission: 'TRADE-OFF RISK IT',
                  status: isMission4Completed
                    ? 'SELESAI ✓'
                    : isFloor4Unlocked
                    ? 'TERBUKA'
                    : 'TERKUNCI',
                },
                {
                  floor: 'LANTAI 5',
                  mission: 'KRISIS SISTEM',
                  status: isMission5Completed
                    ? 'SELESAI ✓'
                    : isFloor5Unlocked
                    ? 'AKTIF'
                    : 'TERKUNCI',
                },
              ].map((item, idx) => (
                <div key={idx} className="board-row-item">
                  <div className="board-row-left">
                    <span className="board-floor-badge">{item.floor}</span>
                    <span className="board-mission-name">{item.mission}</span>
                  </div>
                  <span
                    className={`board-status-badge ${
                      item.status.includes('SELESAI')
                        ? 'status-done'
                        : item.status.includes('TERBUKA')
                        ? 'status-open'
                        : 'status-locked'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="board-footer">
              <button
                type="button"
                className="retro-button-primary modal-ok-btn"
                onClick={() => {
                  playSelectSound();
                  setShowMissionBoard(false);
                }}
              >
                TUTUP [ENTER / E]
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Mission Room Confirmation Modal */}
      {missionDoorConfirm && (
        <div className="exploration-modal-backdrop">
          <div className="mission-confirm-card" role="dialog" aria-modal="true">
            <div className="confirm-icon">🚪</div>
            <h3 className="confirm-title">
              {missionDoorConfirm.missionId === 5
                ? 'RUANG KOMANDO'
                : missionDoorConfirm.missionId === 4
                ? 'RUANG KEPUTUSAN'
                : missionDoorConfirm.missionId === 3
                ? 'RUANG SIMULASI · KRISIS SEKTOR'
                : missionDoorConfirm.missionId === 2
                ? 'RUANG INSIDEN · KEBOCORAN DATA'
                : 'RUANG EVALUASI FRAMEWORK'}
            </h3>
            <p className="confirm-desc">
              {missionDoorConfirm.missionId === 5
                ? missionDoorConfirm.isCompleted
                  ? 'Krisis sistem telah berhasil dikendalikan.'
                  : 'Krisis sistem memengaruhi berbagai aspek organisasi secara bersamaan. Tidak semua masalah dapat diselesaikan menggunakan pendekatan yang sama. Tentukan best practice yang paling sesuai untuk setiap kebutuhan.'
                : missionDoorConfirm.missionId === 4
                ? missionDoorConfirm.isCompleted
                  ? 'Analisis trade-off telah diselesaikan. Ingin menguji pemahaman keunggulan & keterbatasan kembali?'
                  : 'Setiap pendekatan memiliki keunggulan dan keterbatasan. Evaluasi setiap pernyataan sebelum menentukan klasifikasinya.'
                : missionDoorConfirm.missionId === 3
                ? missionDoorConfirm.isCompleted
                  ? 'Simulasi sektor telah diselesaikan. Ingin menguji pemahaman multi-sektor kembali?'
                  : 'Lima sektor sedang menghadapi gangguan teknologi informasi. Analisis bagaimana risiko TI dapat diterapkan pada konteks organisasi yang berbeda.'
                : missionDoorConfirm.missionId === 2
                ? missionDoorConfirm.isCompleted
                  ? 'Insiden ini telah berhasil dimitigasi. Ingin mengulang simulasi penanganan risiko?'
                  : 'Terdeteksi kemungkinan kebocoran informasi pelanggan. Insiden membutuhkan analisis risiko.'
                : missionDoorConfirm.isCompleted
                ? 'Misi ini telah diselesaikan sebelumnya. Ingin menguji pemahaman kembali?'
                : 'Uji pemahamanmu mengenai perbedaan best practice (COBIT, RISK IT, ITIL, ISO, PMI, CMMI).'}
            </p>
            <p className="confirm-question">
              {missionDoorConfirm.isCompleted
                ? 'Ulangi misi final?'
                : missionDoorConfirm.missionId === 5
                ? 'Masuk ke Ruang Komando?'
                : missionDoorConfirm.missionId === 4
                ? 'Mulai analisis trade-off?'
                : missionDoorConfirm.missionId === 3
                ? 'Mulai simulasi sektor?'
                : missionDoorConfirm.missionId === 2
                ? 'Masuk ke Ruang Insiden?'
                : 'Masuk ke ruang evaluasi sekarang?'}
            </p>

            <div className="confirm-choice-buttons">
              <button
                type="button"
                className={`retro-button-primary ${confirmChoiceIndex === 0 ? 'active' : ''}`}
                onMouseEnter={() => {
                  if (confirmChoiceIndex !== 0) {
                    setConfirmChoiceIndex(0);
                    playCursorSound();
                  }
                }}
                onClick={() => {
                  setConfirmChoiceIndex(0);
                  handleConfirmMissionEntry();
                }}
              >
                <span className="menu-cursor">{confirmChoiceIndex === 0 ? '▶' : '\u00A0'}</span>
                <span>
                  {missionDoorConfirm.isCompleted
                    ? 'ULANGI MISI'
                    : (missionDoorConfirm.missionId === 5 || missionDoorConfirm.missionId === 4 || missionDoorConfirm.missionId === 3)
                    ? 'YA'
                    : 'YA, MASUK'}
                </span>
              </button>

              <button
                type="button"
                className={`retro-button-secondary ${confirmChoiceIndex === 1 ? 'active' : ''}`}
                onMouseEnter={() => {
                  if (confirmChoiceIndex !== 1) {
                    setConfirmChoiceIndex(1);
                    playCursorSound();
                  }
                }}
                onClick={() => {
                  setConfirmChoiceIndex(1);
                  handleConfirmMissionEntry();
                }}
              >
                <span className="menu-cursor">{confirmChoiceIndex === 1 ? '▶' : '\u00A0'}</span>
                <span>
                  {missionDoorConfirm.isCompleted
                    ? 'BATAL'
                    : 'TIDAK'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Floor Travel Transition Curtain */}
      {floorTransitionText && (
        <div className="floor-transition-curtain">
          <div className="transition-spinner">🛗</div>
          <h2 className="transition-title">{floorTransitionText}</h2>
          <span className="transition-sub">MEMINDAHKAN ANALIS RISIKO...</span>
        </div>
      )}

      {/* 10. Incident Alert Transition Curtain (Pre-Battle) */}
      {incidentAlertText && (
        <div className="incident-alert-curtain">
          <div className="alert-hazard-strip">
            {incidentAlertText === 'KRISIS SISTEM'
              ? 'KRISIS TERDETEKSI'
              : incidentAlertText === 'TRADE-OFF RISK IT'
              ? 'ANALISIS DIAKTIFKAN'
              : incidentAlertText === 'KRISIS SEKTOR'
              ? '🌐 SIMULASI DIAKTIFKAN 🌐'
              : '⚠️ PERINGATAN SISTEM ⚠️'}
          </div>
          <h1 className="alert-incident-title">
            {incidentAlertText === 'KRISIS SISTEM'
              ? 'SEMUA SISTEM TERDAMPAK'
              : incidentAlertText === 'TRADE-OFF RISK IT'
              ? 'KEUNGGULAN ↔ KETERBATASAN'
              : incidentAlertText === 'KRISIS SEKTOR'
              ? '5 SEKTOR TERHUBUNG'
              : 'INSIDEN TERDETEKSI'}
          </h1>
          <h2 className="alert-enemy-name">
            {incidentAlertText === 'KRISIS SISTEM'
              ? 'KEPUTUSAN STRATEGIS DIPERLUKAN'
              : incidentAlertText}
          </h2>
          {incidentAlertText === 'KRISIS SISTEM' && (
            <div style={{ color: '#ef4444', fontSize: '11px', marginTop: '6px', fontWeight: 'bold', letterSpacing: '1px' }}>
              KRISIS SISTEM
            </div>
          )}
          <div className="alert-scanning-line" />
        </div>
      )}

      {/* 11. In-Exploration Settings Dropdown */}
      {isExplorationSettingsOpen && (
        <div className="exploration-settings-modal">
          <div className="settings-box-panel">
            <div className="settings-panel-header">
              <span className="settings-gem">⚙</span>
              <span>PENGATURAN EKSPLORASI</span>
            </div>

            <div className="settings-menu-list">
              {/* 1. SUARA */}
              <button
                type="button"
                className={`settings-menu-item ${settingsSelectedIdx === 0 ? 'active' : ''}`}
                onMouseEnter={() => {
                  if (settingsSelectedIdx !== 0) {
                    setSettingsSelectedIdx(0);
                    playCursorSound();
                  }
                }}
                onClick={() => {
                  playSelectSound();
                  const next = toggleSound();
                  setSoundOn(next);
                }}
              >
                <span className="menu-cursor">{settingsSelectedIdx === 0 ? '▶' : '\u00A0'}</span>
                <span className="item-label">SUARA</span>
                <span className={`toggle-state-badge ${soundOn ? 'state-on' : 'state-off'}`}>
                  <span className="state-dot">{soundOn ? '●' : '○'}</span>
                  <span>{soundOn ? 'NYALA' : 'MATI'}</span>
                </span>
              </button>

              {/* 2. VOLUME BGM */}
              <BgmVolumeSlider
                isActive={settingsSelectedIdx === 1}
                onActivate={() => {
                  if (settingsSelectedIdx !== 1) {
                    setSettingsSelectedIdx(1);
                    playCursorSound();
                  }
                }}
                onNavigateUp={() => {
                  setSettingsSelectedIdx(0);
                  playCursorSound();
                }}
                onNavigateDown={() => {
                  setSettingsSelectedIdx(2);
                  playCursorSound();
                }}
                id="exploration-bgm-volume-slider"
              />

              {/* 3. CRT */}
              <button
                type="button"
                className={`settings-menu-item ${settingsSelectedIdx === 2 ? 'active' : ''}`}
                onMouseEnter={() => {
                  if (settingsSelectedIdx !== 2) {
                    setSettingsSelectedIdx(2);
                    playCursorSound();
                  }
                }}
                onClick={() => {
                  playSelectSound();
                  if (onToggleCrt) onToggleCrt();
                }}
              >
                <span className="menu-cursor">{settingsSelectedIdx === 2 ? '▶' : '\u00A0'}</span>
                <span className="item-label">CRT</span>
                <span className={`toggle-state-badge ${crtEnabled ? 'state-on' : 'state-off'}`}>
                  <span className="state-dot">{crtEnabled ? '●' : '○'}</span>
                  <span>{crtEnabled ? 'NYALA' : 'MATI'}</span>
                </span>
              </button>

              {/* 4. KEMBALI KE LOBBY (Jika di lantai misi) */}
              {(currentLocation === 'floor1' || currentLocation === 'floor2' || currentLocation === 'floor3' || currentLocation === 'floor4' || currentLocation === 'floor5') && (
                <button
                  type="button"
                  className={`settings-menu-item ${settingsSelectedIdx === 3 ? 'active' : ''}`}
                  onMouseEnter={() => {
                    if (settingsSelectedIdx !== 3) {
                      setSettingsSelectedIdx(3);
                      playCursorSound();
                    }
                  }}
                  onClick={() => {
                    playSelectSound();
                    setIsExplorationSettingsOpen(false);
                    executeFloorTransition('lobby', 'LobbyScene', 'LOBBY · RISK IT TOWER');
                  }}
                >
                  <span className="menu-cursor">{settingsSelectedIdx === 3 ? '▶' : '\u00A0'}</span>
                  <span className="item-label">KEMBALI KE LOBBY</span>
                </button>
              )}

              {/* 5. KEMBALI KE BERANDA */}
              <button
                type="button"
                className={`settings-menu-item ${
                  settingsSelectedIdx === (currentLocation === 'floor1' || currentLocation === 'floor2' || currentLocation === 'floor3' || currentLocation === 'floor4' || currentLocation === 'floor5' ? 4 : 3) ? 'active' : ''
                }`}
                onMouseEnter={() => {
                  const targetIdx = (currentLocation === 'floor1' || currentLocation === 'floor2' || currentLocation === 'floor3' || currentLocation === 'floor4' || currentLocation === 'floor5' ? 4 : 3);
                  if (settingsSelectedIdx !== targetIdx) {
                    setSettingsSelectedIdx(targetIdx);
                    playCursorSound();
                  }
                }}
                onClick={() => {
                  playSelectSound();
                  setIsExplorationSettingsOpen(false);
                  if (onReturnToTitle) onReturnToTitle();
                }}
              >
                <span className="menu-cursor">
                  {settingsSelectedIdx === (currentLocation === 'floor1' || currentLocation === 'floor2' || currentLocation === 'floor3' || currentLocation === 'floor4' || currentLocation === 'floor5' ? 4 : 3) ? '▶' : '\u00A0'}
                </span>
                <span className="item-label">KEMBALI KE BERANDA</span>
              </button>
            </div>

            <div className="settings-panel-footer">
              <span>[ESC] TUTUP PENGATURAN</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
