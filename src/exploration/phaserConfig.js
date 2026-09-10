// phaserConfig.js - Phaser 3 Configuration for Exploration Mode
import Phaser from 'phaser';
import LobbyScene from './scenes/LobbyScene';
import Floor1Scene from './scenes/Floor1Scene';
import Floor2Scene from './scenes/Floor2Scene';
import Floor3Scene from './scenes/Floor3Scene';
import Floor4Scene from './scenes/Floor4Scene';
import Floor5Scene from './scenes/Floor5Scene';

export function createPhaserConfig(parentContainer, initialLocation = 'lobby') {
  const allScenes = [LobbyScene, Floor1Scene, Floor2Scene, Floor3Scene, Floor4Scene, Floor5Scene];
  const scenes = initialLocation === 'floor5'
    ? [Floor5Scene, Floor4Scene, Floor3Scene, Floor2Scene, Floor1Scene, LobbyScene]
    : initialLocation === 'floor4'
    ? [Floor4Scene, Floor5Scene, Floor3Scene, Floor2Scene, Floor1Scene, LobbyScene]
    : initialLocation === 'floor3'
    ? [Floor3Scene, Floor5Scene, Floor4Scene, Floor2Scene, Floor1Scene, LobbyScene]
    : initialLocation === 'floor2'
    ? [Floor2Scene, Floor5Scene, Floor4Scene, Floor3Scene, Floor1Scene, LobbyScene]
    : initialLocation === 'floor1'
    ? [Floor1Scene, Floor5Scene, Floor4Scene, Floor2Scene, Floor3Scene, LobbyScene]
    : [LobbyScene, Floor1Scene, Floor2Scene, Floor3Scene, Floor4Scene, Floor5Scene];

  return {
    type: Phaser.AUTO,
    parent: parentContainer,
    width: 480,
    height: 352,
    pixelArt: true,
    roundPixels: true,
    backgroundColor: '#090e1a',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false,
      },
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 480,
      height: 352,
    },
    scene: scenes,
  };
}
