import React, { useState, useEffect } from 'react';
import { playCursorSound, playSelectSound, playVictorySound } from '../game/soundFx';
import { MISSIONS } from '../game/missions';

/**
 * CampaignResult - Layar Puncak Penyelesaian Seluruh Kampanye (5 Misi)
 * Menampilkan:
 * - CAMPAIGN SELESAI
 * - Misi 5 / 5
 * - Skor Total Akumulasi Misi
 * - Akurasi & Total Kesalahan
 * - Framework Dipelajari 6 / 6
 * - Peringkat Keseluruhan Kampanye
 * - Lima halaman jawaban untuk pertanyaan tugas dosen
 */
export default function CampaignResult({
  progress,
  onReturnToFloor,
  onReturnToTitle,
  onOpenRiskDex,
  onReplayFinalBoss,
}) {
  const [selectedBtnIndex, setSelectedBtnIndex] = useState(0);
  const [activePage, setActivePage] = useState(0);

  const stats = progress.missionStats || {};

  // Hitung agregasi skor
  let totalScore = 0;
  let totalCorrect = 0;
  let totalWrong = 0;

  [1, 2, 3, 4, 5].forEach((id) => {
    const s = stats[id];
    if (s) {
      totalScore += s.bestScore || 0;
      totalCorrect += s.correctCount || 0;
      totalWrong += s.wrongCount || 0;
    }
  });

  const totalAttempts = totalCorrect + totalWrong;
  const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 100;

  // Peringkat keseluruhan kampanye berdasarkan rata-rata skor per misi
  const avgScore = totalScore / 5;
  let overallRank = 'PERINGKAT S';
  if (avgScore < 400) overallRank = 'PERINGKAT D';
  else if (avgScore < 600) overallRank = 'PERINGKAT C';
  else if (avgScore < 750) overallRank = 'PERINGKAT B';
  else if (avgScore < 900) overallRank = 'PERINGKAT A';

  useEffect(() => {
    playVictorySound();
  }, []);

  const actionButtons = [];
  if (onReturnToFloor) {
    actionButtons.push({
      label: 'KEMBALI KE LANTAI',
      action: onReturnToFloor,
      primary: true,
    });
  }
  actionButtons.push(
    {
      label: 'BUKA RISKDEX',
      action: onOpenRiskDex,
      primary: !onReturnToFloor,
    },
    {
      label: 'KEMBALI KE BERANDA',
      action: onReturnToTitle,
      primary: false,
    },
    {
      label: 'ULANGI FINAL BOSS',
      action: onReplayFinalBoss,
      primary: false,
    }
  );

  const buttonCount = actionButtons.length;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (activePage > 0) {
          setActivePage((prev) => prev - 1);
          playCursorSound();
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (activePage < MISSIONS.length - 1) {
          setActivePage((prev) => prev + 1);
          playCursorSound();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedBtnIndex((prev) => (prev > 0 ? prev - 1 : buttonCount - 1));
        playCursorSound();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedBtnIndex((prev) => (prev < buttonCount - 1 ? prev + 1 : 0));
        playCursorSound();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setActivePage(0);
        playCursorSound();
      } else if (e.key === 'End') {
        e.preventDefault();
        setActivePage(MISSIONS.length - 1);
        playCursorSound();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        playSelectSound();
        onReturnToTitle();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        playSelectSound();
        if (actionButtons[selectedBtnIndex] && actionButtons[selectedBtnIndex].action) {
          actionButtons[selectedBtnIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedBtnIndex, activePage, actionButtons, buttonCount, onReturnToTitle]);

  const activeMission = MISSIONS[activePage];
  const activeSummary = activeMission.educationalSummary;

  const goToPage = (pageIndex) => {
    const target = Math.max(0, Math.min(MISSIONS.length - 1, pageIndex));
    if (target !== activePage) {
      setActivePage(target);
      playCursorSound();
    }
  };

  return (
    <div className="campaign-result-screen">
      <div className="campaign-result-scrollbox">
        {/* Banner Puncak Kemenangan Kampanye */}
        <header className="campaign-header">
          <div className="retro-badge">RISK IT TOWER</div>
          <h1 className="campaign-title">CAMPAIGN COMPLETE</h1>
          <p className="campaign-subtitle">SELURUH 5 MISI STRATEGIS BERHASIL DISELESAIKAN</p>
        </header>

        {/* Kartu Ringkasan Prestasi Kampanye */}
        <div className="campaign-stats-card">
          <div className="campaign-stats-grid">
            <div className="camp-stat-pill">
              <span className="camp-pill-label">Total Misi</span>
              <span className="camp-pill-val text-green">5 / 5</span>
            </div>
            <div className="camp-stat-pill">
              <span className="camp-pill-label">Skor Akumulasi</span>
              <span className="camp-pill-val text-gold">{totalScore}</span>
            </div>
            <div className="camp-stat-pill">
              <span className="camp-pill-label">Akurasi Analis</span>
              <span className="camp-pill-val text-blue">{accuracy}%</span>
            </div>
            <div className="camp-stat-pill">
              <span className="camp-pill-label">Framework Terbuka</span>
              <span className="camp-pill-val text-purple">
                {(progress.discoveredRiskDex || []).length} / 6
              </span>
            </div>
          </div>

          <div className="campaign-rank-row">
            <span className="campaign-rank-title">PERINGKAT AKHIR KAMPANYE:</span>
            <span className="campaign-rank-badge">{overallRank}</span>
          </div>
        </div>

        {/* Navigasi 5 halaman jawaban tugas dosen */}
        <nav className="presentation-tabs campaign-question-tabs" aria-label="Pilih pertanyaan ringkasan">
          {MISSIONS.map((mission, index) => (
            <button
              key={mission.id}
              type="button"
              className={`presentation-tab ${activePage === index ? 'active' : ''}`}
              onClick={() => goToPage(index)}
              aria-current={activePage === index ? 'page' : undefined}
              title={`Pertanyaan ${mission.id}: ${mission.lecturerQuestion}`}
            >
              <span className="presentation-tab-number">{String(mission.id).padStart(2, '0')}</span>
              <span className="presentation-tab-label">{mission.title}</span>
            </button>
          ))}
        </nav>

        <div className="campaign-presentation-page" key={activeMission.id}>
          <section className="presentation-question-card">
            <div className="presentation-question-meta">
              <span>PERTANYAAN DOSEN {activeMission.id}</span>
              <span>MISI {activeMission.number}</span>
            </div>
            <h2>{activeMission.lecturerQuestion}</h2>
            <p>{activeMission.subtitle}</p>
          </section>

          <section className="presentation-answer-card" aria-label={`Jawaban pertanyaan ${activeMission.id}`}>
            <div className="presentation-answer-header">
              <span className="presentation-answer-kicker">JAWABAN</span>
              <h3>{activeSummary.title}</h3>
            </div>

            <div className="presentation-answer-grid">
              {(activeSummary.items || []).map((item, index) => (
                <article className="presentation-answer-item" key={`${item.label}-${index}`}>
                  <span className="presentation-answer-index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <strong>{item.label}</strong>
                    <p>{item.desc}</p>
                  </div>
                </article>
              ))}
            </div>

            {activeSummary.academicNote && (
              <div className="presentation-academic-note">
                <span className="presentation-note-icon" aria-hidden="true">▣</span>
                <div>
                  <strong>{activeSummary.academicNote.title}</strong>
                  <p>{activeSummary.academicNote.body}</p>
                </div>
              </div>
            )}
          </section>
        </div>

        <div className="campaign-page-nav">
          <button type="button" onClick={() => goToPage(activePage - 1)} disabled={activePage === 0}>
            ◀ SEBELUMNYA
          </button>
          <span>PERTANYAAN {activePage + 1} DARI {MISSIONS.length}</span>
          <button
            type="button"
            className="campaign-page-next"
            onClick={() => goToPage(activePage + 1)}
            disabled={activePage === MISSIONS.length - 1}
          >
            SELANJUTNYA ▶
          </button>
        </div>

        {/* Tombol Aksi Bawah */}
        <div className="campaign-actions-row">
          {actionButtons.map((btn, idx) => {
            const isSelected = selectedBtnIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                className={`${btn.primary ? 'retro-button-primary' : 'retro-button-secondary'} ${
                  isSelected ? 'active' : ''
                }`}
                onMouseEnter={() => {
                  if (selectedBtnIndex !== idx) {
                    setSelectedBtnIndex(idx);
                    playCursorSound();
                  }
                }}
                onClick={() => {
                  playSelectSound();
                  if (btn.action) btn.action();
                }}
              >
                <span className="menu-cursor">{isSelected ? '▶' : '\u00A0'}</span>
                <span>{btn.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
