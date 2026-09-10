import React, { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import BattleScreen from './components/BattleScreen';
import MissionResult from './components/MissionResult';
import CampaignResult from './components/CampaignResult';
import RiskDex from './components/RiskDex';
import AudioToggle from './components/AudioToggle';
import BattleSettingsDropdown from './components/BattleSettingsDropdown';
import CompactMusicControl from './components/CompactMusicControl';
import CreditsScene from './components/CreditsScene';
import OpeningCinematic from './components/OpeningCinematic';
import ExplorationScreen from './exploration/ExplorationScreen';
import ReturnFloorModal from './components/ReturnFloorModal';
import { playSelectSound } from './game/soundFx';
import { bgmManager } from './audio/bgmManager';
import { getMissionById } from './game/missions';
import {
  completeCampaignForPresentation,
  loadProgress,
  recordMissionVictory,
  resetProgress,
} from './game/progressStore';
import './styles/game.css';

const CRT_STORAGE_KEY = 'risk-it-battle-crt';

function getInitialCrtState() {
  if (typeof window === 'undefined') return true;
  try {
    const saved = localStorage.getItem(CRT_STORAGE_KEY);
    return saved !== null ? saved === 'true' : true;
  } catch (e) {
    return true;
  }
}

/**
 * App - RISK IT BATTLE Mini Campaign
 * Mengelola seluruh alur transisi antar-layar:
 * - 'opening'         -> Prolog sinematik saat website dibuka
 * - 'title'           -> Layar judul kampanye
 * - 'exploration'     -> Eksplorasi RISK IT TOWER (Lobby & Lantai 1-5)
 * - 'battle'          -> Arena pertarungan data-driven
 * - 'missionResult'   -> Laporan evaluasi kemenangan misi
 * - 'campaignResult'  -> Puncak laporan kelulusan kampanye
 * - 'riskDex'         -> Ensiklopedia berkas panduan best practice
 */
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('opening');
  const [previousScreen, setPreviousScreen] = useState('title');
  const [activeMissionId, setActiveMissionId] = useState(1);
  const [progress, setProgress] = useState(loadProgress);
  const [crtEnabled, setCrtEnabled] = useState(getInitialCrtState);

  // Status Eksplorasi RISK IT TOWER (Lobby, Lantai 1, Lantai 2, Lantai 3)
  const [explorationLocation, setExplorationLocation] = useState('lobby');
  const [explorationSpawn, setExplorationSpawn] = useState({ spawn: 'default' });
  const [savedExplorationState, setSavedExplorationState] = useState(null);
  const [enteredBattleFromExploration, setEnteredBattleFromExploration] = useState(false);
  const [justCompletedMission1, setJustCompletedMission1] = useState(false);
  const [justCompletedMission2, setJustCompletedMission2] = useState(false);
  const [justCompletedMission3, setJustCompletedMission3] = useState(false);
  const [justCompletedMission4, setJustCompletedMission4] = useState(false);
  const [justCompletedMission5, setJustCompletedMission5] = useState(false);

  // Status Menu Pengaturan Dropdown saat Pertarungan
  const [isBattleSettingsOpen, setIsBattleSettingsOpen] = useState(false);
  const [isBattleAnimating, setIsBattleAnimating] = useState(false);
  const [battleRestartKey, setBattleRestartKey] = useState(0);
  const [isReturnFloorModalOpen, setIsReturnFloorModalOpen] = useState(false);

  // Simpan preferensi CRT ke localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CRT_STORAGE_KEY, crtEnabled ? 'true' : 'false');
    } catch (e) {}
  }, [crtEnabled]);

  // Pastikan menu pengaturan dan modal konfirmasi tertutup saat berpindah layar
  useEffect(() => {
    setIsBattleSettingsOpen(false);
    setIsReturnFloorModalOpen(false);
  }, [currentScreen]);

  // Koordinator BGM global berdasarkan status layar & progres
  useEffect(() => {
    if (currentScreen === 'opening' || currentScreen === 'title') {
      bgmManager.setContext('beranda');
    } else if (currentScreen === 'exploration') {
      bgmManager.setContext(explorationLocation === 'floor5' ? 'boss' : 'lobby');
    } else if (currentScreen === 'battle') {
      if (activeMissionId === 1 || activeMissionId === 2) {
        bgmManager.setContext('battle1');
      } else if (activeMissionId === 3 || activeMissionId === 4) {
        bgmManager.setContext('battle2');
      } else if (activeMissionId === 5) {
        bgmManager.setContext('boss');
      }
    } else if (currentScreen === 'missionResult') {
      if (activeMissionId === 5) {
        bgmManager.setContext('boss');
      } else {
        bgmManager.setContext('lobby');
      }
    } else if (currentScreen === 'finalCredits') {
      bgmManager.setContext('boss');
    } else if (currentScreen === 'campaignResult') {
      bgmManager.setContext('boss');
    } else if (currentScreen === 'riskDex') {
      bgmManager.setContext(
        previousScreen === 'exploration' && explorationLocation === 'floor5' ? 'boss' : 'lobby'
      );
    }
  }, [currentScreen, activeMissionId, explorationLocation, previousScreen]);

  // Data hasil evaluasi misi yang baru saja selesai
  const [lastResultData, setLastResultData] = useState(null);
  const [lastVictoryMeta, setLastVictoryMeta] = useState({});

  // Muat ulang progres jika ada pembaruan
  const refreshProgress = () => {
    setProgress(loadProgress());
  };

  const navigateTo = (newScreen) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(newScreen);
  };

  const handleFinishOpening = () => {
    setPreviousScreen('opening');
    setCurrentScreen('title');
  };

  // Kemenangan misi tercapai dari BattleScreen
  const handleMissionVictory = (resultData) => {
    const meta = recordMissionVictory(
      resultData.missionId,
      resultData.score,
      resultData.rank,
      resultData.correctAnswers,
      resultData.wrongAnswers
    );

    setLastResultData(resultData);
    setLastVictoryMeta(meta);
    refreshProgress();
    navigateTo('missionResult');
  };

  // Lanjut setelah melihat hasil misi -> kembali ke lantai di depan pintu misi
  const handleContinueFromMissionResult = () => {
    const floorMap = { 1: 'floor1', 2: 'floor2', 3: 'floor3', 4: 'floor4', 5: 'floor5' };
    const targetFloor = floorMap[activeMissionId] || 'floor1';
    setExplorationLocation(targetFloor);
    setExplorationSpawn({ spawn: 'missionRoom' });
    setJustCompletedMission1(activeMissionId === 1);
    setJustCompletedMission2(activeMissionId === 2);
    setJustCompletedMission3(activeMissionId === 3);
    setJustCompletedMission4(activeMissionId === 4);
    setJustCompletedMission5(activeMissionId === 5);
    navigateTo('exploration');
  };

  // Selesaikan kampanye setelah Misi 05: buka Credit Scene dengan BGM boss berlanjut
  const handleFinishCampaign = () => {
    navigateTo('finalCredits');
  };

  // Selesai kredit akhir: kembali ke Beranda & alihkan BGM ke 'beranda'
  const handleCloseCampaignEndingCredits = () => {
    setEnteredBattleFromExploration(false);
    navigateTo('title');
  };

  // Reset seluruh progres kampanye
  const handleResetProgress = () => {
    const def = resetProgress();
    setProgress(def);
    setActiveMissionId(1);
  };

  // Cheat presentasi: tamatkan campaign tanpa menjalankan battle satu per satu.
  const handleEnablePresentationMode = () => {
    const completedProgress = completeCampaignForPresentation();
    setProgress(completedProgress);
  };

  // Handlers untuk Pengaturan Pertarungan (Ulangi Misi & Kembali ke Beranda)
  const handleRestartCurrentBattle = () => {
    setIsBattleSettingsOpen(false);
    setBattleRestartKey((prev) => prev + 1);
  };

  const handleReturnHomeFromBattle = () => {
    setIsBattleSettingsOpen(false);
    setEnteredBattleFromExploration(false);
    navigateTo('title');
  };

  // Handler Kembali ke Lantai saat Pertarungan Berlangsung
  const handleConfirmReturnToFloor = () => {
    setIsReturnFloorModalOpen(false);
    setIsBattleSettingsOpen(false);

    // Pemetaan langsung berdasarkan activeMissionId:
    // Mission 01 -> floor1
    // Mission 02 -> floor2
    // Mission 03 -> floor3
    // Mission 04 -> floor4
    // Mission 05 -> floor5
    const missionFloorMap = {
      1: 'floor1',
      2: 'floor2',
      3: 'floor3',
      4: 'floor4',
      5: 'floor5',
    };
    const targetFloor = missionFloorMap[activeMissionId] || 'floor1';

    // Bersihkan penanda kemenangan sementara agar tidak memicu animasi/banner selesai
    setJustCompletedMission1(false);
    setJustCompletedMission2(false);
    setJustCompletedMission3(false);
    setJustCompletedMission4(false);
    setJustCompletedMission5(false);

    // Atur lokasi lantai & spawn tepat di depan pintu ruang misi
    setExplorationLocation(targetFloor);
    setExplorationSpawn({ spawn: 'missionRoom' });

    navigateTo('exploration');
  };

  // Sinkronisasi lokasi & spawn eksplorasi saat transisi lift
  const handleExplorationLocationChange = (targetLoc, targetSpawn = { spawn: 'elevator' }) => {
    setExplorationSpawn(targetSpawn);
    setExplorationLocation(targetLoc);
  };

  // Indikator ringkas kemajuan kampanye untuk ditampilkan di HUD atas
  const completedCount = (progress.completedMissions || []).length;
  const showProgressHUD = currentScreen !== 'opening' && currentScreen !== 'title' && currentScreen !== 'exploration' && currentScreen !== 'finalCredits';

  const activeMissionData = getMissionById(activeMissionId);

  return (
    <div className="fullscreen-app-shell">
      {/* CRT Screen Housing - Monitor Retro Proporsional */}
      <div className={`crt-screen-housing ${crtEnabled ? 'crt-mode-on' : 'crt-mode-off'}`}>
        {/* Top HUD Safe Area — disembunyikan selama opening cinematic */}
        {currentScreen !== 'opening' && (
        <header className="crt-hud-bar">
          <div className="hud-brand">
            <span className="hud-brand-text">RISK IT BATTLE</span>
            <span className="hud-brand-sub">MINI CAMPAIGN</span>
            {currentScreen === 'battle' ? (
              <span className="hud-progress-pill">
                MISI {activeMissionId}/5
              </span>
            ) : showProgressHUD ? (
              <span className="hud-progress-pill">
                MISI {completedCount}/5
              </span>
            ) : null}
          </div>

          <div className="hud-actions">
            {currentScreen === 'battle' ? (
              <>
                <button
                  type="button"
                  className="hud-return-floor-btn"
                  onClick={() => {
                    if (!isBattleAnimating && !isBattleSettingsOpen) {
                      playSelectSound();
                      setIsReturnFloorModalOpen(true);
                    }
                  }}
                  disabled={isBattleAnimating || isBattleSettingsOpen}
                  title={isBattleAnimating ? 'Animasi sedang berlangsung' : 'Kembali ke Lantai Eksplorasi'}
                  aria-label="Kembali ke Lantai"
                >
                  <span className="return-arrow" aria-hidden="true">←</span>
                  <span className="return-text">KEMBALI KE LANTAI</span>
                </button>
                <BattleSettingsDropdown
                  isOpen={isBattleSettingsOpen}
                  onToggleOpen={() => {
                    if (!isBattleAnimating && !isReturnFloorModalOpen) {
                      setIsBattleSettingsOpen((prev) => !prev);
                    }
                  }}
                  onClose={() => setIsBattleSettingsOpen(false)}
                  isDisabled={isBattleAnimating || isReturnFloorModalOpen}
                  crtEnabled={crtEnabled}
                  onToggleCrt={() => setCrtEnabled((prev) => !prev)}
                  onRestartMission={handleRestartCurrentBattle}
                  onReturnToHome={handleReturnHomeFromBattle}
                />
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="crt-toggle-btn"
                  onClick={() => setCrtEnabled(!crtEnabled)}
                  title="Nyalakan / Matikan Efek Layar CRT"
                >
                  <span className="toggle-dot">{crtEnabled ? '🟢' : '⚪'}</span>
                  <span className="toggle-text">{crtEnabled ? 'CRT: NYALA' : 'CRT: MATI'}</span>
                </button>
                <AudioToggle />
                {currentScreen === 'title' && <CompactMusicControl />}
              </>
            )}
          </div>
        </header>
        )}

        {/* Game Stage Viewport */}
        <main className="crt-game-stage">
          <div className="stage-content-viewport">
            {currentScreen === 'opening' && (
              <OpeningCinematic onFinish={handleFinishOpening} />
            )}

            {currentScreen === 'title' && (
              <StartScreen
                progress={progress}
                isOpeningArrival={previousScreen === 'opening'}
                onStartMissions={() => {
                  bgmManager.unlock();
                  setExplorationLocation('lobby');
                  setExplorationSpawn({ spawn: 'default' });
                  setJustCompletedMission1(false);
                  setJustCompletedMission2(false);
                  setJustCompletedMission3(false);
                  setJustCompletedMission4(false);
                  setJustCompletedMission5(false);
                  navigateTo('exploration');
                }}
                onOpenRiskDex={() => navigateTo('riskDex')}
                onStartPresentation={handleEnablePresentationMode}
                onResetProgress={handleResetProgress}
                onViewCampaignResult={() => navigateTo('campaignResult')}
              />
            )}

            {currentScreen === 'exploration' && (
              <ExplorationScreen
                key="exploration-screen"
                progress={progress}
                initialLocation={explorationLocation}
                initialSpawn={explorationSpawn}
                justCompletedMission1={justCompletedMission1}
                justCompletedMission2={justCompletedMission2}
                justCompletedMission3={justCompletedMission3}
                justCompletedMission4={justCompletedMission4}
                justCompletedMission5={justCompletedMission5}
                onStartMission={(missionId) => {
                  setEnteredBattleFromExploration(true);
                  setActiveMissionId(Number(missionId));
                  navigateTo('battle');
                }}
                onOpenRiskDex={(payload) => {
                  setSavedExplorationState({
                    location: payload.returnLocation,
                    x: payload.returnState.x,
                    y: payload.returnState.y,
                    facing: payload.returnState.facing,
                  });
                  navigateTo('riskDex');
                }}
                onReturnToTitle={() => {
                  setEnteredBattleFromExploration(false);
                  navigateTo('title');
                }}
                onLocationChange={handleExplorationLocationChange}
                onViewCampaignResult={() => navigateTo('campaignResult')}
                crtEnabled={crtEnabled}
                onToggleCrt={() => setCrtEnabled((prev) => !prev)}
              />
            )}

            {currentScreen === 'battle' && (
              <BattleScreen
                key={`battle-${activeMissionId}-${battleRestartKey}`}
                mission={activeMissionData}
                onMissionVictory={handleMissionVictory}
                onReturnToFloor={() => {
                  const floorMap = { 1: 'floor1', 2: 'floor2', 3: 'floor3', 4: 'floor4', 5: 'floor5' };
                  setExplorationLocation(floorMap[activeMissionId] || 'floor1');
                  setExplorationSpawn({ spawn: 'missionRoom' });
                  navigateTo('exploration');
                }}
                isPaused={isBattleSettingsOpen || isReturnFloorModalOpen}
                onAnimationStateChange={(animating) => setIsBattleAnimating(animating)}
              />
            )}

            {currentScreen === 'missionResult' && (
              <MissionResult
                resultData={lastResultData}
                newMissionUnlocked={lastVictoryMeta.newMissionUnlocked}
                onContinue={handleContinueFromMissionResult}
                onFinishCampaign={handleFinishCampaign}
                onReplay={() => navigateTo('battle')}
                onViewCampaignResult={() => navigateTo('campaignResult')}
                continueButtonLabel="KEMBALI KE LANTAI"
              />
            )}

            {currentScreen === 'campaignResult' && (
              <CampaignResult
                progress={progress}
                onReturnToFloor={
                  previousScreen === 'exploration' || previousScreen === 'missionResult'
                    ? () => {
                        setExplorationLocation('floor5');
                        setExplorationSpawn({ spawn: 'missionRoom' });
                        navigateTo('exploration');
                      }
                    : null
                }
                onReturnToTitle={() => navigateTo('title')}
                onOpenRiskDex={() => navigateTo('riskDex')}
                onReplayFinalBoss={() => {
                  setActiveMissionId(5);
                  navigateTo('battle');
                }}
              />
            )}

            {currentScreen === 'riskDex' && (
              <RiskDex
                discoveredKeys={progress.discoveredRiskDex || ['RISK_IT']}
                onReturn={() => {
                  if (previousScreen === 'exploration' && savedExplorationState) {
                    setExplorationLocation(savedExplorationState.location || 'lobby');
                    setExplorationSpawn({
                      exactX: savedExplorationState.x,
                      exactY: savedExplorationState.y,
                      facing: savedExplorationState.facing,
                    });
                    navigateTo('exploration');
                  } else {
                    navigateTo('title');
                  }
                }}
              />
            )}

            {currentScreen === 'finalCredits' && (
              <CreditsScene
                mode="campaignEnding"
                onClose={handleCloseCampaignEndingCredits}
              />
            )}
          </div>

          {/* CRT Overlay Effect ONLY */}
          {crtEnabled && (
            <div className="crt-display-overlay" aria-hidden="true">
              <div className="crt-scanlines" />
              <div className="crt-triad-grille" />
              <div className="crt-vignette-curvature" />
              <div className="crt-glass-sheen" />
            </div>
          )}
        </main>

        {/* Modal Konfirmasi Kembali ke Lantai saat Battle */}
        {currentScreen === 'battle' && (
          <ReturnFloorModal
            isOpen={isReturnFloorModalOpen}
            onConfirm={handleConfirmReturnToFloor}
            onCancel={() => setIsReturnFloorModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
