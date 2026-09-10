// Floor4Scene.js - Explorable Lantai 4 (Trade-Off Analysis) in RISK IT TOWER
// Balanced, professional, executive decision analysis floor
import Phaser from 'phaser';
import BaseExplorationScene from './BaseExplorationScene';
import { FLOOR4_DIALOGUES } from '../data/floor4Data';

export default class Floor4Scene extends BaseExplorationScene {
  constructor() {
    super('Floor4Scene');
  }

  init(data) {
    const registrySpawn = this.game.registry.get('initialSpawn') || {};
    this.spawnData = data && Object.keys(data).length > 0 ? data : registrySpawn;
  }

  create() {
    const MAP_W = 480;
    const MAP_H = 352;
    const TILE = 32;

    // Check if Mission 04 is already completed from registry
    const isCompleted = Boolean(this.game.registry.get('mission4Completed'));

    // 1. Determine Initial Spawn Position
    let spawnX = 95;
    let spawnY = 185;
    let spawnFacing = 'right';

    if (this.spawnData.spawn === 'missionRoom') {
      // Returning after battle: spawn in front of Ruang Keputusan door facing left
      spawnX = 385;
      spawnY = 185;
      spawnFacing = 'left';
    } else if (this.spawnData.spawn === 'elevator') {
      spawnX = 95;
      spawnY = 185;
      spawnFacing = 'right';
    } else if (this.spawnData.exactX && this.spawnData.exactY) {
      spawnX = this.spawnData.exactX;
      spawnY = this.spawnData.exactY;
      spawnFacing = this.spawnData.facing || 'down';
    }

    // 2. Initialize Base Systems (Camera, Physics, Obstacles Group, Player)
    this.initBase(MAP_W, MAP_H, spawnX, spawnY, spawnFacing);

    // 3. Build Floor Tiles (15 cols x 11 rows = 480 x 352 px) with Balanced Zonal Accents
    for (let x = 0; x < MAP_W; x += TILE) {
      for (let y = 0; y < MAP_H; y += TILE) {
        const col = Math.floor(x / TILE);
        const row = Math.floor(y / TILE);

        // Default: Alternating executive navy / steel tile
        let tileKey = (col + row) % 2 === 0 ? 'tile_floor_floor4' : 'tile_floor_floor4_alt';

        // Zone 01: Keunggulan Bay (North-West: Rows 2..3, Cols 2..4; Mid-West: Rows 7..8, Cols 2..4)
        if ((row >= 2 && row <= 3 && col >= 2 && col <= 4) ||
            (row >= 7 && row <= 8 && col >= 2 && col <= 4)) {
          tileKey = 'tile_floor_keunggulan_zone';
        }
        // Zone 02: Keterbatasan Bay (North-East: Rows 2..3, Cols 10..12; Mid-East: Rows 7..8, Cols 10..12)
        else if ((row >= 2 && row <= 3 && col >= 10 && col <= 12) ||
                 (row >= 7 && row <= 8 && col >= 10 && col <= 12)) {
          tileKey = 'tile_floor_keterbatasan_zone';
        }

        this.add.image(x + TILE / 2, y + TILE / 2, tileKey).setDepth(0);
      }
    }

    // Central Transit Corridor Runner (Row 5: connecting Elevator at West to Ruang Keputusan at East)
    // Minimalist, clean, deep navy runner with restrained cyan edges — no arrows, numbers, or large symbols
    for (let col = 3; col <= 11; col++) {
      const px = col * TILE + TILE / 2;
      const py = 5 * TILE + TILE / 2; // y = 176

      let runnerKey = 'tile_floor_floor4_runner';
      if (col === 3) {
        runnerKey = 'tile_floor_floor4_runner_start';
      } else if (col === 11) {
        runnerKey = 'tile_floor_floor4_runner_end';
      }

      this.add.image(px, py, runnerKey).setDepth(0);
    }

    // Subtle Corner Vignette Lighting
    this.add.rectangle(32, MAP_H - 24, 64, 48, 0x050811, 0.22).setDepth(1);
    this.add.rectangle(MAP_W - 32, MAP_H - 24, 64, 48, 0x050811, 0.22).setDepth(1);
    this.add.rectangle(24, 80, 48, 48, 0x050811, 0.16).setDepth(1);
    this.add.rectangle(MAP_W - 24, 80, 48, 48, 0x050811, 0.16).setDepth(1);

    // 4. Perimeter Walls & Architectural Facade
    // North Wall Graphic Tiles (y: 0 to 64)
    for (let x = 0; x < MAP_W; x += TILE) {
      this.add.image(x + TILE / 2, 16, 'tile_wall_top').setDepth(1);
      this.add.image(x + TILE / 2, 48, 'tile_wall_face').setDepth(2);
    }

    // Slim architectural columns framing the analysis bays
    const columnXPositions = [48, 140, 340, 432];
    columnXPositions.forEach((cx) => {
      this.add.image(cx, 48, 'tile_wall_column').setDepth(2);
    });

    // North Wall Mounted Fixtures:
    // 1) Trade-Off Analysis Header Marquee (Center)
    this.add.image(240, 36, 'prop_tradeoff_header').setDepth(3);

    // Subtle telemetry scanline across the header panel
    const headerScanline = this.add.rectangle(240, 38, 108, 1.5, 0x38bdf8, 0.35).setDepth(4);
    this.tweens.add({
      targets: headerScanline,
      alpha: { from: 0.15, to: 0.55 },
      x: { from: 220, to: 260 },
      duration: 2400,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // 2) West and East Bay Vents
    this.add.image(90, 22, 'prop_wall_vent').setDepth(3);
    this.add.image(390, 22, 'prop_wall_vent').setDepth(3);

    // Static Wall Collision Boxes
    this.addCollisionBox(MAP_W / 2, 32, MAP_W, 64); // North Wall
    this.addCollisionBox(8, MAP_H / 2, 16, MAP_H); // Left Wall
    this.addCollisionBox(MAP_W - 8, MAP_H / 2, 16, MAP_H); // Right Wall
    this.addCollisionBox(MAP_W / 2, MAP_H - 8, MAP_W, 16); // South Wall

    // Decorative wall baseboard kickplate
    this.add.rectangle(MAP_W / 2, MAP_H - 4, MAP_W, 8, 0x080d17).setDepth(2);

    // 5. Elevator (West Wall - AKSES LANTAI / L4 - Full 64 x 48 Architectural Scale)
    const elevX = 40;
    const elevY = 175;
    this.addStaticProp(elevX, elevY, 'prop_elevator_l4', 56, 44, 0, 2);

    // Grounded floor threshold marking & restrained cyan ambient glow (No portal beam!)
    this.add.rectangle(elevX + 26, elevY + 23, 14, 2, 0x0284c7, 0.4).setDepth(1);
    const elevGlow = this.add.image(elevX + 24, elevY + 20, 'prop_elevator_l4_glow').setDepth(1).setAlpha(0.45);
    this.tweens.add({
      targets: elevGlow,
      alpha: { from: 0.3, to: 0.5 },
      scaleX: { from: 0.98, to: 1.02 },
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Elevator illuminated call button LED on right frame
    const elevLed = this.add.circle(elevX + 28, elevY + 1, 1.2, 0x38bdf8, 0.85).setDepth(elevY + 14);
    this.tweens.add({
      targets: elevLed,
      alpha: { from: 0.4, to: 0.9 },
      duration: 1400,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'prop_elevator_floor4',
      x: elevX + 28,
      y: elevY + 10,
      radius: 42,
      label: '[E] LIFT TOWER',
      onInteract: () => {
        this.game.events.emit('openElevator', { currentFloor: 'floor4' });
      },
    });

    // 6. Ruang Keputusan Door (East Wall - PRIMARY FOCAL DESTINATION - Full 64 x 48 Architectural Scale)
    const doorX = 440;
    const doorY = 175;
    const doorTex = isCompleted ? 'prop_door_keputusan_complete' : 'prop_door_keputusan';
    this.addStaticProp(doorX, doorY, doorTex, 56, 44, 0, 2);

    // Grounded floor threshold marking & restrained access glow (No green cone spotlight!)
    const thresholdColor = isCompleted ? 0x059669 : 0x0f766e;
    this.add.rectangle(doorX - 26, doorY + 23, 14, 2, thresholdColor, 0.4).setDepth(1);

    const glowTex = isCompleted ? 'prop_door_keputusan_glow_complete' : 'prop_door_keputusan_glow';
    const doorGlow = this.add.image(doorX - 24, doorY + 20, glowTex).setDepth(1).setAlpha(0.45);
    this.tweens.add({
      targets: doorGlow,
      alpha: { from: 0.3, to: 0.5 },
      scaleX: { from: 0.98, to: 1.02 },
      duration: isCompleted ? 2600 : 1800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Dual Teal & Amber Status Light Indicators on door frame
    const doorLedLeft = this.add.circle(doorX + 27, doorY + 1, 1.2, isCompleted ? 0x10b981 : 0x14b8a6, 0.85).setDepth(doorY + 14);
    const doorLedRight = this.add.circle(doorX + 29, doorY + 1, 1.2, isCompleted ? 0x10b981 : 0xf59e0b, 0.85).setDepth(doorY + 14);
    this.tweens.add({
      targets: doorLedLeft,
      alpha: { from: 0.35, to: 0.95 },
      duration: isCompleted ? 2000 : 1300,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
    this.tweens.add({
      targets: doorLedRight,
      alpha: { from: 0.35, to: 0.95 },
      duration: isCompleted ? 2000 : 1100,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'prop_ruang_keputusan',
      x: doorX - 28,
      y: doorY + 10,
      radius: 44,
      label: isCompleted ? '[E] RUANG KEPUTUSAN (ANALISIS SELESAI ✓)' : '[E] MASUK',
      onInteract: () => {
        this.game.events.emit('openMissionDoor', {
          isCompleted,
          missionId: 4,
          missionTitle: 'TRADE-OFF RISK IT',
        });
      },
    });

    // 7. Decision Analysis Table (Center of Room - SECONDARY FOCAL ANCHOR)
    // Generous clearance: positioned at y=136 (40px north of corridor runner at y=176)
    const tableX = 240;
    const tableY = 136;
    this.addStaticProp(tableX, tableY, 'prop_table_decision_analysis', 54, 26);

    // Micro-animations on Decision Analysis Table:
    // Left Teal LED (Keunggulan)
    const tableTealLed = this.add.circle(tableX - 18, tableY - 4, 1.3, 0x2dd4bf, 0.9).setDepth(tableY + 14);
    this.tweens.add({
      targets: tableTealLed,
      alpha: { from: 0.3, to: 1 },
      duration: 1400,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Right Amber LED (Keterbatasan)
    const tableAmberLed = this.add.circle(tableX + 18, tableY - 4, 1.3, 0xfbbf24, 0.9).setDepth(tableY + 14);
    this.tweens.add({
      targets: tableAmberLed,
      alpha: { from: 0.3, to: 1 },
      duration: 1150,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Center balance needle subtle fluctuation
    const tableCenterLine = this.add.rectangle(tableX, tableY - 4, 2, 3, 0x38bdf8, 0.8).setDepth(tableY + 14);
    this.tweens.add({
      targets: tableCenterLine,
      alpha: { from: 0.4, to: 1 },
      x: { from: tableX - 0.8, to: tableX + 0.8 },
      duration: 2100,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'decision_analysis',
      x: tableX,
      y: tableY + 14,
      radius: 40,
      label: '[E] ANALISIS',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR4_DIALOGUES.decision_analysis });
      },
    });

    // 8. NPCs (Framing the Decision Analysis Table with generous passage)
    // NPC 01: ANALIS TATA KELOLA (West of table, Keunggulan side)
    const npcA_X = 180;
    const npcA_Y = 136;
    const npcA = this.addStaticProp(npcA_X, npcA_Y, 'npc_analis_tata_kelola', 20, 24);
    this.tweens.add({
      targets: npcA,
      y: npcA_Y - 0.8,
      duration: 2400,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'analis_tata_kelola',
      x: npcA_X,
      y: npcA_Y,
      radius: 38,
      label: '[E] ANALIS TATA KELOLA',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR4_DIALOGUES.analis_tata_kelola });
      },
    });

    // NPC 02: KOORDINATOR RISIKO (East of table, Keterbatasan side)
    const npcB_X = 300;
    const npcB_Y = 136;
    const npcB = this.addStaticProp(npcB_X, npcB_Y, 'npc_koordinator_risiko', 20, 24);
    this.tweens.add({
      targets: npcB,
      y: npcB_Y - 0.8,
      duration: 2600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'koordinator_risiko',
      x: npcB_X,
      y: npcB_Y,
      radius: 38,
      label: '[E] KOORDINATOR RISIKO',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR4_DIALOGUES.koordinator_risiko });
      },
    });

    // 9. Four Educational Terminals (Tertiary focal points, distributed across bays)
    // TERMINAL 01: CATATAN ANALISIS 01 (Upper-West)
    const t1X = 104;
    const t1Y = 84;
    this.addStaticProp(t1X, t1Y, 'prop_terminal_keunggulan', 26, 22);
    const t1Led = this.add.circle(t1X + 6, t1Y - 6, 1.2, 0x14b8a6, 0.9).setDepth(t1Y + 14);
    this.tweens.add({
      targets: t1Led,
      alpha: { from: 0.3, to: 1 },
      duration: 1300,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'terminal_keunggulan_1',
      x: t1X,
      y: t1Y + 18,
      radius: 38,
      label: '[E] CATATAN ANALISIS 01',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR4_DIALOGUES.terminal_keunggulan_1 });
      },
    });

    // TERMINAL 02: CATATAN ANALISIS 02 (Lower-West, south of runner)
    const t2X = 104;
    const t2Y = 246;
    this.addStaticProp(t2X, t2Y, 'prop_terminal_keunggulan', 26, 22);
    const t2Led = this.add.circle(t2X + 6, t2Y - 6, 1.2, 0x2dd4bf, 0.9).setDepth(t2Y + 14);
    this.tweens.add({
      targets: t2Led,
      alpha: { from: 0.35, to: 1 },
      duration: 1450,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'terminal_keunggulan_2',
      x: t2X,
      y: t2Y + 18,
      radius: 38,
      label: '[E] CATATAN ANALISIS 02',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR4_DIALOGUES.terminal_keunggulan_2 });
      },
    });

    // TERMINAL 03: CATATAN ANALISIS 03 (Upper-East)
    const t3X = 376;
    const t3Y = 84;
    this.addStaticProp(t3X, t3Y, 'prop_terminal_keterbatasan', 26, 22);
    const t3Led = this.add.circle(t3X + 6, t3Y - 6, 1.2, 0xf59e0b, 0.9).setDepth(t3Y + 14);
    this.tweens.add({
      targets: t3Led,
      alpha: { from: 0.3, to: 1 },
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'terminal_keterbatasan_1',
      x: t3X,
      y: t3Y + 18,
      radius: 38,
      label: '[E] CATATAN ANALISIS 03',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR4_DIALOGUES.terminal_keterbatasan_1 });
      },
    });

    // TERMINAL 04: CATATAN ANALISIS 04 (Lower-East, south of runner)
    const t4X = 376;
    const t4Y = 246;
    this.addStaticProp(t4X, t4Y, 'prop_terminal_keterbatasan', 26, 22);
    const t4Led = this.add.circle(t4X + 6, t4Y - 6, 1.2, 0xfbbf24, 0.9).setDepth(t4Y + 14);
    this.tweens.add({
      targets: t4Led,
      alpha: { from: 0.35, to: 1 },
      duration: 1350,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'terminal_keterbatasan_2',
      x: t4X,
      y: t4Y + 18,
      radius: 38,
      label: '[E] CATATAN ANALISIS 04',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR4_DIALOGUES.terminal_keterbatasan_2 });
      },
    });

    // 10. Restrained & Asymmetrical Executive Decor (Constraint 2 & 6)
    // Floor 4 Directory Stand (Near Elevator Exit)
    const dirX = 138;
    const dirY = 146;
    this.addStaticProp(dirX, dirY, 'prop_tradeoff_directory', 18, 20);
    this.registerInteractable({
      id: 'tradeoff_directory',
      x: dirX,
      y: dirY + 14,
      radius: 34,
      label: '[E] DIREKTORI TRADE-OFF',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR4_DIALOGUES.tradeoff_directory });
      },
    });

    // Executive Plants: Flanking southern corners
    this.addStaticProp(34, MAP_H - 28, 'prop_floor4_plant', 16, 16, 0, 8);
    this.addStaticProp(446, MAP_H - 28, 'prop_floor4_plant', 16, 16, 0, 8);

    // Asymmetric furniture on South Wall: Bench on West flank, Archive on East flank
    this.addStaticProp(195, 280, 'prop_floor4_bench', 28, 14);
    this.addStaticProp(285, 280, 'prop_floor4_archive', 20, 18);

    // 11. Location Arrival Badge (Top-Left, 3.5s Fade)
    const bannerText = this.add.text(0, 0, 'L4 - TRADE-OFF ANALYSIS', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '7px',
      color: '#38bdf8',
    }).setOrigin(0.5).setDepth(101).setScrollFactor(0);

    const badgeW = Math.max(185, Math.ceil(bannerText.width + 20));
    const badgeH = 20;
    const badgeX = badgeW / 2 + 12;
    const badgeY = badgeH / 2 + 10;
    bannerText.setPosition(badgeX, badgeY);

    const bannerBg = this.add.rectangle(badgeX, badgeY, badgeW, badgeH, 0x080d17, 0.88)
      .setStrokeStyle(1, 0x0284c7, 0.75)
      .setDepth(100)
      .setScrollFactor(0);

    this.tweens.add({
      targets: [bannerBg, bannerText],
      alpha: { from: 1, to: 0 },
      delay: 3500,
      duration: 800,
      ease: 'Power2',
      onComplete: () => {
        bannerBg.destroy();
        bannerText.destroy();
      },
    });
  }
}
