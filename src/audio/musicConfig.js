// musicConfig.js - Playlist definitions for RISK IT BATTLE
// Contextual background music mapped to public/lagu/

export const DEFAULT_BGM_VOLUME = 0.30;
export const AUDIO_STORAGE_KEY = 'risk-it-battle-audio-v1';

export const MUSIC_PLAYLISTS = {
  beranda: [
    '/lagu/beranda/4_Wake_Up_Get_Up_Get_Out_There_SpotiDost.mp3',
  ],

  lobby: [
    '/lagu/lobby/1_No_More_What_Ifs_SpotiDost.mp3',
    '/lagu/lobby/2_Beneath_the_Mask_SpotiDost.mp3',
    '/lagu/lobby/A Way of Life - Release (youtube).mp3',
  ],

  battle1: [
    '/lagu/battle1/3_Last_Surprise_SpotiDost.mp3',
  ],

  battle2: [
    '/lagu/battle2/Life Will Change_spotdown.org.mp3',
  ],

  boss: [
    '/lagu/boss/Aria of the Soul - P3R ver._spotdown.org.mp3',
  ],
};
