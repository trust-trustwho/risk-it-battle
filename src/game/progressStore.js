// progressStore.js - Sistem Penyimpanan Progres Kampanye (localStorage v1)

const STORAGE_KEY = 'risk-it-battle-progress-v1';

const DEFAULT_PROGRESS = {
  version: 1,
  unlockedMissions: [1],
  completedMissions: [],
  missionStats: {},
  discoveredRiskDex: ['RISK_IT'],
};

/**
 * Memuat progres dari localStorage dengan validasi tipe data dan fallback aman.
 */
export function loadProgress() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return { ...DEFAULT_PROGRESS };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { ...DEFAULT_PROGRESS };
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return { ...DEFAULT_PROGRESS };
    }

    // Validasi field kritis
    const unlockedMissions = Array.isArray(parsed.unlockedMissions) && parsed.unlockedMissions.length > 0
      ? parsed.unlockedMissions.map((n) => Number(n)).filter((n) => !isNaN(n))
      : [1];

    if (!unlockedMissions.includes(1)) {
      unlockedMissions.unshift(1);
    }

    const completedMissions = Array.isArray(parsed.completedMissions)
      ? parsed.completedMissions.map((n) => Number(n)).filter((n) => !isNaN(n))
      : [];

    const discoveredRiskDex = Array.isArray(parsed.discoveredRiskDex)
      ? parsed.discoveredRiskDex.filter((k) => typeof k === 'string')
      : ['RISK_IT'];

    if (!discoveredRiskDex.includes('RISK_IT')) {
      discoveredRiskDex.unshift('RISK_IT');
    }

    return {
      version: 1,
      unlockedMissions,
      completedMissions,
      missionStats: parsed.missionStats && typeof parsed.missionStats === 'object' ? parsed.missionStats : {},
      discoveredRiskDex,
    };
  } catch (err) {
    console.warn('Gagal membaca progres dari localStorage, menggunakan default:', err);
    return { ...DEFAULT_PROGRESS };
  }
}

/**
 * Menyimpan objek progres ke localStorage.
 */
export function saveProgress(progress) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.warn('Gagal menyimpan progres ke localStorage:', err);
  }
}

/**
 * Mencatat penyelesaian misi, memperbarui skor terbaik, dan membuka misi berikutnya.
 * Mengembalikan objek status apakah ada misi baru terbuka.
 */
export function recordMissionVictory(missionId, score, rank, correctCount, wrongCount) {
  const current = loadProgress();
  const mid = Number(missionId);

  // 1. Tambahkan ke completedMissions jika belum ada
  const completedMissions = current.completedMissions.includes(mid)
    ? current.completedMissions
    : [...current.completedMissions, mid];

  // 2. Perbarui best score & rank untuk misi ini
  const existingStats = current.missionStats[mid] || {};
  const currentBestScore = existingStats.bestScore ?? -1;
  const isBetterScore = score >= currentBestScore;

  const missionStats = {
    ...current.missionStats,
    [mid]: {
      bestScore: isBetterScore ? score : currentBestScore,
      bestRank: isBetterScore ? rank : existingStats.bestRank || rank,
      correctCount: Math.max(existingStats.correctCount || 0, correctCount),
      wrongCount: Math.min(existingStats.wrongCount ?? 999, wrongCount),
      completedAt: Date.now(),
    },
  };

  // 3. Buka misi berikutnya jika ada (misal Misi 1 selesai -> Misi 2 terbuka)
  let newMissionUnlocked = null;
  const nextMissionId = mid + 1;
  let unlockedMissions = [...current.unlockedMissions];
  if (nextMissionId <= 5 && !unlockedMissions.includes(nextMissionId)) {
    unlockedMissions.push(nextMissionId);
    newMissionUnlocked = nextMissionId;
  }

  const updated = {
    ...current,
    unlockedMissions,
    completedMissions,
    missionStats,
  };

  // Bersihkan field legacy jika ada
  delete updated.totalExp;
  delete updated.level;

  saveProgress(updated);

  return {
    progress: updated,
    newMissionUnlocked,
  };
}

/**
 * Mendaftarkan penemuan framework ke RiskDex.
 */
export function discoverFramework(frameworkKey) {
  if (!frameworkKey) return;
  const current = loadProgress();
  if (current.discoveredRiskDex.includes(frameworkKey)) return;

  const updated = {
    ...current,
    discoveredRiskDex: [...current.discoveredRiskDex, frameworkKey],
  };
  saveProgress(updated);
}

/**
 * Membuka seluruh campaign untuk kebutuhan presentasi kelas.
 * Statistik yang sudah diperoleh pemain tetap dipertahankan; misi yang belum
 * dimainkan mendapat statistik demo agar ringkasan campaign tetap valid.
 */
export function completeCampaignForPresentation() {
  const current = loadProgress();
  const missionQuestionCounts = { 1: 6, 2: 4, 3: 5, 4: 6, 5: 6 };
  const missionStats = { ...current.missionStats };
  const completedAt = Date.now();

  [1, 2, 3, 4, 5].forEach((missionId) => {
    if (!missionStats[missionId]) {
      missionStats[missionId] = {
        bestScore: 1000,
        bestRank: 'PERINGKAT S',
        correctCount: missionQuestionCounts[missionId],
        wrongCount: 0,
        completedAt,
      };
    }
  });

  const updated = {
    ...current,
    unlockedMissions: [1, 2, 3, 4, 5],
    completedMissions: [1, 2, 3, 4, 5],
    missionStats,
    discoveredRiskDex: ['RISK_IT', 'COBIT', 'ITIL', 'ISO_27001', 'PMI', 'CMMI'],
  };

  saveProgress(updated);
  return updated;
}

/**
 * Menghapus seluruh progres kampanye dan mengembalikan ke default.
 */
export function resetProgress() {
  if (typeof window === 'undefined' || !window.localStorage) return DEFAULT_PROGRESS;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Gagal mereset localStorage:', err);
  }
  return { ...DEFAULT_PROGRESS };
}
