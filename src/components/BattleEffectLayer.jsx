import React from 'react';
import { COMMANDS } from '../game/battleData';

/**
 * BattleEffectLayer - Lapisan efek visual pertarungan JRPG retro
 * - Proyektil Analis Risiko (berjalan dari kiri-bawah ke kanan-atas) dengan variasi aksi:
 *   1. IDENTIFIKASI / framework: [ + ] (scanning brackets & pixel plus)
 *   2. PENILAIAN / analysis: ▮ ▮ ▮ (analytic pixel bars)
 *   3. PENANGANAN / control: ◆ (shield / control pixel diamond)
 *   4. PEMANTAUAN / monitor: ◎ (radar circular pulse)
 * - Proyektil Musuh (berjalan dari kanan-atas ke kiri-bawah):
 *   corrupted data packets / glitch blocks merah-magenta
 * - Efek benturan pixel impact (✦ burst) pada musuh dan pemain
 * - Red damage flash tint pada saat pemain terkena serangan
 */
export default function BattleEffectLayer({
  activeEffect = 'none', // 'none' | 'player-projectile' | 'enemy-projectile' | 'enemy-impact' | 'player-impact'
  actionType = COMMANDS.IDENTIFIKASI,
  showRedFlash = false,
}) {
  const normType = String(actionType || '').toUpperCase();

  const isFrameworkOrId =
    normType === 'FRAMEWORK' ||
    normType === COMMANDS.IDENTIFIKASI ||
    normType === 'COBIT' ||
    normType === 'ITIL' ||
    normType === 'PMI';

  const isAnalysisOrPenilaian =
    normType === 'ANALYSIS' ||
    normType === COMMANDS.PENILAIAN ||
    normType === 'RISK_IT' ||
    normType === 'KEUNGGULAN';

  const isControlOrPenanganan =
    normType === 'CONTROL' ||
    normType === COMMANDS.PENANGANAN ||
    normType === 'ISO_27001' ||
    normType === 'KETERBATASAN' ||
    normType === 'KEAMANAN_DATA';

  const isMonitorOrPemantauan =
    normType === 'MONITOR' ||
    normType === COMMANDS.PEMANTAUAN ||
    normType === 'CMMI' ||
    normType === 'LAYANAN_PUBLIK';

  return (
    <div className="battle-effect-layer" aria-hidden="true">
      {/* Red damage tint flash saat pemain terkena serangan */}
      {showRedFlash && <div className="player-damage-red-tint" />}

      {/* Proyektil Analis Risiko Menuju Musuh */}
      {activeEffect === 'player-projectile' && (
        <div className="projectile-track player-to-enemy-track">
          <div className={`risk-projectile action-${normType.toLowerCase()}`}>
            {isAnalysisOrPenilaian ? (
              <svg viewBox="0 0 24 16" className="projectile-svg" shapeRendering="crispEdges">
                {/* ▮ ▮ ▮ Analytic Bars */}
                <rect x="3" y="8" width="4" height="6" fill="#06b6d4" />
                <rect x="3" y="8" width="4" height="2" fill="#ffffff" />
                <rect x="10" y="4" width="4" height="10" fill="#f59e0b" />
                <rect x="10" y="4" width="4" height="2" fill="#ffffff" />
                <rect x="17" y="2" width="4" height="12" fill="#ef4444" />
                <rect x="17" y="2" width="4" height="2" fill="#ffffff" />
              </svg>
            ) : isControlOrPenanganan ? (
              <svg viewBox="0 0 24 16" className="projectile-svg" shapeRendering="crispEdges">
                {/* ◆ Security Control Diamond / Shield Burst */}
                <rect x="10" y="2" width="4" height="2" fill="#10b981" />
                <rect x="8" y="4" width="8" height="2" fill="#10b981" />
                <rect x="6" y="6" width="12" height="4" fill="#34d399" />
                <rect x="10" y="6" width="4" height="4" fill="#ffffff" />
                <rect x="8" y="10" width="8" height="2" fill="#10b981" />
                <rect x="10" y="12" width="4" height="2" fill="#10b981" />
              </svg>
            ) : isMonitorOrPemantauan ? (
              <svg viewBox="0 0 24 16" className="projectile-svg" shapeRendering="crispEdges">
                {/* ◎ Radar Concentric Ring Pulse */}
                <rect x="6" y="2" width="12" height="2" fill="#14b8a6" />
                <rect x="4" y="4" width="2" height="8" fill="#14b8a6" />
                <rect x="18" y="4" width="2" height="8" fill="#14b8a6" />
                <rect x="6" y="12" width="12" height="2" fill="#14b8a6" />
                <rect x="10" y="6" width="4" height="4" fill="#ffffff" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 16" className="projectile-svg" shapeRendering="crispEdges">
                {/* [ + ] Scanning Brackets & Data Pulse (Default) */}
                <rect x="1" y="2" width="2" height="12" fill="#38bdf8" />
                <rect x="3" y="2" width="4" height="2" fill="#38bdf8" />
                <rect x="3" y="12" width="4" height="2" fill="#38bdf8" />
                <rect x="11" y="5" width="2" height="6" fill="#ffffff" />
                <rect x="9" y="7" width="6" height="2" fill="#ffffff" />
                <rect x="21" y="2" width="2" height="12" fill="#38bdf8" />
                <rect x="17" y="2" width="4" height="2" fill="#38bdf8" />
                <rect x="17" y="12" width="4" height="2" fill="#38bdf8" />
              </svg>
            )}
          </div>
        </div>
      )}

      {/* Proyektil Serangan Balik Musuh Menuju Pemain */}
      {activeEffect === 'enemy-projectile' && (
        <div className="projectile-track enemy-to-player-track">
          <div className="enemy-corruption-projectile">
            <svg viewBox="0 0 24 16" className="projectile-svg" shapeRendering="crispEdges">
              {/* Corrupted glitch data blocks ▓▒░ */}
              <rect x="2" y="3" width="5" height="4" fill="#e11d48" />
              <rect x="4" y="5" width="2" height="2" fill="#fecdd3" />
              <rect x="8" y="6" width="6" height="5" fill="#701a75" />
              <rect x="10" y="7" width="2" height="2" fill="#f43f5e" />
              <rect x="15" y="2" width="4" height="4" fill="#be123c" />
              <rect x="16" y="9" width="6" height="4" fill="#e11d48" />
              <rect x="18" y="10" width="2" height="2" fill="#ffffff" />
            </svg>
          </div>
        </div>
      )}

      {/* Impact Burst pada Musuh (Kanan Atas) */}
      {activeEffect === 'enemy-impact' && (
        <div className="pixel-impact-anchor enemy-impact-pos">
          <div className="pixel-impact-burst">
            <svg viewBox="0 0 24 24" className="impact-svg" shapeRendering="crispEdges">
              <rect x="10" y="2" width="4" height="4" fill="#ffffff" />
              <rect x="4" y="8" width="4" height="4" fill="#38bdf8" />
              <rect x="8" y="8" width="8" height="8" fill="#ffffff" />
              <rect x="16" y="8" width="4" height="4" fill="#38bdf8" />
              <rect x="10" y="16" width="4" height="4" fill="#38bdf8" />
              <rect x="2" y="10" width="2" height="4" fill="#93c5fd" />
              <rect x="20" y="10" width="2" height="4" fill="#93c5fd" />
            </svg>
          </div>
        </div>
      )}

      {/* Impact Burst pada Pemain (Kiri Bawah) */}
      {activeEffect === 'player-impact' && (
        <div className="pixel-impact-anchor player-impact-pos">
          <div className="pixel-impact-burst player-hit-burst">
            <svg viewBox="0 0 24 24" className="impact-svg" shapeRendering="crispEdges">
              <rect x="10" y="2" width="4" height="4" fill="#f43f5e" />
              <rect x="4" y="8" width="4" height="4" fill="#fda4af" />
              <rect x="8" y="8" width="8" height="8" fill="#ffffff" />
              <rect x="16" y="8" width="4" height="4" fill="#e11d48" />
              <rect x="10" y="16" width="4" height="4" fill="#be123c" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
