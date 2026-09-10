import React from 'react';
import RiskAnalystSprite from '../assets/sprites/RiskAnalystSprite';
import DataBreachSprite from '../assets/sprites/DataBreachSprite';
import ConfusionFrameworkSprite from '../assets/sprites/ConfusionFrameworkSprite';
import SectorRiskSprite from '../assets/sprites/SectorRiskSprite';
import ComplexitySprite from '../assets/sprites/ComplexitySprite';
import SystemCrisisBossSprite from '../assets/sprites/SystemCrisisBossSprite';
import StatusPanel from './StatusPanel';
import BattleEffectLayer from './BattleEffectLayer';

/**
 * BattleArena - Arena pertarungan komposisi 4:3 klasik handheld JRPG
 * Mendukung:
 * - Render musuh dinamis (5 jenis monster)
 * - Latar belakang dinamis sesuai misi (framework, databreach, sector, complexity, crisis)
 * - Label lingkungan dinamis untuk Misi 03 (Universitas, RS, Bank, dll)
 * - Lapisan efek visual proyektil dan benturan pixel
 */
export default function BattleArena({
  playerHP,
  playerMaxHP,
  enemyHP,
  enemyMaxHP,
  isEnemyHit,
  isEnemyDefeated,
  isPlayerHit,
  isPlayerLunging = false,
  isPlayerHitFlash = false,
  isEnemyLunging = false,
  isEnemyHitFlash = false,
  isArenaShaking = false,
  activeEffect = 'none',
  actionType = 'IDENTIFIKASI',
  showRedFlash = false,
  playerName = 'ANALIS RISIKO',
  enemyName = 'KEBOCORAN DATA',
  enemyLevel = 12,
  enemySpriteKey = 'data-breach',
  backgroundKey = 'databreach',
  environmentLabel = '',
}) {
  const renderEnemySprite = () => {
    const commonProps = {
      isHit: isEnemyHit,
      isDefeated: isEnemyDefeated,
      isLunging: isEnemyLunging,
      isHitFlash: isEnemyHitFlash,
    };

    switch (enemySpriteKey) {
      case 'confusion-framework':
        return <ConfusionFrameworkSprite {...commonProps} />;
      case 'sector-risk':
        return <SectorRiskSprite {...commonProps} />;
      case 'complexity':
        return <ComplexitySprite {...commonProps} />;
      case 'system-crisis':
        return <SystemCrisisBossSprite {...commonProps} />;
      case 'data-breach':
      default:
        return <DataBreachSprite {...commonProps} />;
    }
  };

  return (
    <div className={`battle-arena arena-theme-${backgroundKey} ${isArenaShaking ? 'arena-shake' : ''}`}>
      {/* Background Arena Retro Dinamis */}
      <div className={`arena-sky arena-sky-${backgroundKey}`} />
      <div className={`arena-ground arena-ground-${backgroundKey}`} />
      <div className="arena-scanlines" />

      {/* Label Lingkungan Sektor Dinamis (Misi 03) */}
      {environmentLabel && (
        <div className="arena-environment-banner" aria-live="polite">
          <span className="environment-tag">LOKASI:</span>
          <span className="environment-name">{environmentLabel}</span>
        </div>
      )}

      {/* Layer Efek Visual Proyektil & Benturan Pixel */}
      <BattleEffectLayer
        activeEffect={activeEffect}
        actionType={actionType}
        showRedFlash={showRedFlash}
      />

      {/* Baris Atas: Status Musuh (kiri) & Monster Musuh (kanan) */}
      <div className="arena-upper-row">
        <div className="enemy-status-anchor">
          <StatusPanel
            name={enemyName}
            level={enemyLevel}
            currentHP={enemyHP}
            maxHP={enemyMaxHP}
            isPlayer={false}
            isShaking={isEnemyHit}
          />
        </div>

        <div className="enemy-stage-anchor">
          {/* Platform Elips Musuh */}
          <div className={`battle-platform enemy-platform platform-${backgroundKey}`} />
          {renderEnemySprite()}
        </div>
      </div>

      {/* Baris Bawah: Karakter Pemain (kiri) & Status Pemain (kanan) */}
      <div className="arena-lower-row">
        <div className="player-stage-anchor">
          {/* Platform Elips Pemain */}
          <div className="battle-platform player-platform" />
          <RiskAnalystSprite
            isShaking={isPlayerHit}
            isLunging={isPlayerLunging}
            isHitFlash={isPlayerHitFlash}
          />
        </div>

        <div className="player-status-anchor">
          <StatusPanel
            name={playerName}
            currentHP={playerHP}
            maxHP={playerMaxHP}
            isPlayer={true}
            isShaking={isPlayerHit}
          />
        </div>
      </div>
    </div>
  );
}
