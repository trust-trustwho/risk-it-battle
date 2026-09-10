// Floor3Scene.js - Explorable Lantai 3 (Sector Simulation Center) in RISK IT TOWER
// Balanced, modular, and minimalist multi-sector simulation floor
import Phaser from 'phaser';
import BaseExplorationScene from './BaseExplorationScene';
import { FLOOR3_DIALOGUES } from '../data/floor3Data';

export default class Floor3Scene extends BaseExplorationScene {
  constructor() {
    super('Floor3Scene');
  }

  init(data) {
    const registrySpawn = this.game.registry.get('initialSpawn') || {};
    this.spawnData = data && Object.keys(data).length > 0 ? data : registrySpawn;
  }

  create() {
    const MAP_W = 480;
    const MAP_H = 352;
    const TILE = 32;

    // Check if Mission 03 is already completed from registry
    const isCompleted = Boolean(this.game.registry.get('mission3Completed'));

    // 1. Determine Initial Spawn Position
    let spawnX = 95;
    let spawnY = 185;
    let spawnFacing = 'right';

    if (this.spawnData.spawn === 'missionRoom') {
      // Returning after battle: spawn in front of Ruang Simulasi door facing left
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

    // 3. Build Floor Tiles (15 cols x 11 rows = 480 x 352 px) with Sector Zonal Contrast
    for (let x = 0; x < MAP_W; x += TILE) {
      for (let y = 0; y < MAP_H; y += TILE) {
        const col = Math.floor(x / TILE);
        const row = Math.floor(y / TILE);

        // Default: Alternating cool navy / steel blue floor tile
        let tileKey = (col + row) % 2 === 0 ? 'tile_floor_floor3' : 'tile_floor_floor3_alt';

        // Zone 1: Universitas Station Zone (North-West, Rows 2..3, Cols 2..4)
        if (row >= 2 && row <= 3 && col >= 2 && col <= 4) {
          tileKey = 'tile_floor_sector_zone';
        }
        // Zone 2: Rumah Sakit Station Zone (North-East, Rows 2..3, Cols 10..12)
        else if (row >= 2 && row <= 3 && col >= 10 && col <= 12) {
          tileKey = 'tile_floor_sector_zone';
        }
        // Zone 3: Sector Simulation Core Zone (Center, Rows 3..4, Cols 6..8)
        else if (row >= 3 && row <= 4 && col >= 6 && col <= 8) {
          tileKey = 'tile_floor_core_zone';
        }
        // Zone 4: Perbankan Station Zone (Mid-West, Rows 7..8, Cols 2..4)
        else if (row >= 7 && row <= 8 && col >= 2 && col <= 4) {
          tileKey = 'tile_floor_sector_zone';
        }
        // Zone 5: E-Commerce Station Zone (Mid-East, Rows 7..8, Cols 10..12)
        else if (row >= 7 && row <= 8 && col >= 10 && col <= 12) {
          tileKey = 'tile_floor_sector_zone';
        }
        // Zone 6: Pemerintahan Station Zone (South-Center, Rows 8..9, Cols 6..8)
        else if (row >= 8 && row <= 9 && col >= 6 && col <= 8) {
          tileKey = 'tile_floor_sector_zone';
        }
        // Zone 7: Ruang Simulasi Access Threshold (Row 5, Col 12)
        else if (row === 5 && col === 12) {
          tileKey = 'tile_floor_sim_marker';
        }

        this.add.image(x + TILE / 2, y + TILE / 2, tileKey).setDepth(0);
      }
    }

    // Central Transit Runner (Row 5: connecting Elevator at West to Ruang Simulasi at East)
    // Minimalist, clean, navy/steel blue runner with subtle cyan borders — no arrows, numbers, or symbols
    for (let col = 3; col <= 11; col++) {
      const px = col * TILE + TILE / 2;
      const py = 5 * TILE + TILE / 2; // y = 176

      let runnerKey = 'tile_floor_floor3_runner';
      if (col === 3) {
        runnerKey = 'tile_floor_floor3_runner_start';
      } else if (col === 11) {
        runnerKey = 'tile_floor_floor3_runner_end';
      }

      this.add.image(px, py, runnerKey).setDepth(0);
    }

    // Lighting Hierarchy - Subtle Vignette Shading on Outer Corners
    this.add.rectangle(32, MAP_H - 24, 64, 48, 0x050811, 0.25).setDepth(1);
    this.add.rectangle(MAP_W - 32, MAP_H - 24, 64, 48, 0x050811, 0.25).setDepth(1);
    this.add.rectangle(24, 80, 48, 48, 0x050811, 0.18).setDepth(1);
    this.add.rectangle(MAP_W - 24, 80, 48, 48, 0x050811, 0.18).setDepth(1);

    // 4. Perimeter Walls & Architectural Facade
    // North Wall Graphic Tiles (y: 0 to 64)
    for (let x = 0; x < MAP_W; x += TILE) {
      this.add.image(x + TILE / 2, 16, 'tile_wall_top').setDepth(1);
      this.add.image(x + TILE / 2, 48, 'tile_wall_face').setDepth(2);
    }

    // Thin structural columns framing the simulation bays
    const columnXPositions = [48, 140, 340, 432];
    columnXPositions.forEach((cx) => {
      this.add.image(cx, 48, 'tile_wall_column').setDepth(2);
    });

    // North Wall Mounted Fixtures:
    // 1) Sector Simulation Center Header Marquee (Center)
    this.add.image(240, 36, 'prop_secsim_header').setDepth(3);

    // Subtle animated telemetry scanline across the header panel
    const headerScanline = this.add.rectangle(240, 40, 160, 2, 0x38bdf8, 0.35).setDepth(4);
    this.tweens.add({
      targets: headerScanline,
      alpha: { from: 0.15, to: 0.55 },
      y: { from: 38, to: 44 },
      duration: 2200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // 2) West and East Bay HVAC Vents
    this.add.image(90, 22, 'prop_wall_vent').setDepth(3);
    this.add.image(390, 22, 'prop_wall_vent').setDepth(3);

    // Static Wall Collision Boxes
    this.addCollisionBox(MAP_W / 2, 32, MAP_W, 64); // North Wall
    this.addCollisionBox(8, MAP_H / 2, 16, MAP_H); // Left Wall
    this.addCollisionBox(MAP_W - 8, MAP_H / 2, 16, MAP_H); // Right Wall
    this.addCollisionBox(MAP_W / 2, MAP_H - 8, MAP_W, 16); // South Wall

    // Decorative wall baseboard kickplate
    this.add.rectangle(MAP_W / 2, MAP_H - 4, MAP_W, 8, 0x090d16).setDepth(2);

    // 5. Elevator (West Wall - AKSES LANTAI / L3)
    const elevX = 40;
    const elevY = 175;
    this.addStaticProp(elevX, elevY, 'prop_elevator_l3', 56, 36);

    // Floor safety threshold marking & focused cyan progression glow
    this.add.rectangle(elevX + 30, elevY + 20, 36, 6, 0x0284c7, 0.5).setDepth(1);
    const elevGlow = this.add.image(elevX + 30, elevY + 14, 'prop_elevator_glow').setDepth(1).setAlpha(0.75);
    this.tweens.add({
      targets: elevGlow,
      alpha: { from: 0.55, to: 0.9 },
      scaleX: { from: 0.95, to: 1.05 },
      duration: 1800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Pulsing illuminated call button on elevator frame (Cyan for Floor 3)
    const elevLed = this.add.circle(elevX + 28, elevY + 1, 1.5, 0x38bdf8, 0.9).setDepth(elevY + 14);
    this.tweens.add({
      targets: elevLed,
      alpha: { from: 0.35, to: 1 },
      duration: 1250,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'prop_elevator_floor3',
      x: elevX + 30,
      y: elevY + 10,
      radius: 42,
      label: '[E] LIFT TOWER',
      onInteract: () => {
        this.game.events.emit('openElevator', { currentFloor: 'floor3' });
      },
    });

    // 6. Ruang Simulasi Door (East Wall - PRIMARY FOCAL DESTINATION)
    const doorX = 440;
    const doorY = 175;
    const doorTex = isCompleted ? 'prop_door_simulasi_complete' : 'prop_door_simulasi';
    this.addStaticProp(doorX, doorY, doorTex, 60, 40);

    // Safety threshold marking & focused progression glow (Restrained cyan pulse before, steady green-cyan after)
    const thresholdColor = isCompleted ? 0x059669 : 0x0284c7;
    this.add.rectangle(doorX - 30, doorY + 20, 36, 6, thresholdColor, 0.55).setDepth(1);

    const glowTex = isCompleted ? 'prop_door_simulasi_glow_complete' : 'prop_door_simulasi_glow';
    const doorGlow = this.add.image(doorX - 28, doorY + 14, glowTex).setDepth(1).setAlpha(0.85);
    this.tweens.add({
      targets: doorGlow,
      alpha: { from: 0.65, to: 1.0 },
      scaleX: { from: 0.95, to: 1.06 },
      duration: isCompleted ? 2600 : 1700,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Status access panel indicator LED (Cyan simulation-ready before, Green completed after)
    const doorLedColor = isCompleted ? 0x22c55e : 0x38bdf8;
    const doorLed = this.add.circle(doorX + 28, doorY + 3, 1.5, doorLedColor, 0.95).setDepth(doorY + 14);
    this.tweens.add({
      targets: doorLed,
      alpha: { from: 0.3, to: 1 },
      duration: isCompleted ? 1500 : 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'prop_ruang_simulasi',
      x: doorX - 32,
      y: doorY + 10,
      radius: 44,
      label: isCompleted ? '[E] RUANG SIMULASI (SIMULASI SELESAI ✓)' : '[E] MASUK',
      onInteract: () => {
        this.game.events.emit('openMissionDoor', {
          isCompleted,
          missionId: 3,
          missionTitle: 'KRISIS SEKTOR',
        });
      },
    });

    // 7. Sector Simulation Core (Center of Room - SECONDARY FOCAL POINT)
    const coreX = 240;
    const coreY = 136;
    this.addStaticProp(coreX, coreY, 'prop_simulation_core', 48, 28);

    // Subtle cyan ambient pulse under core
    const coreGlow = this.add.image(coreX, coreY + 10, 'prop_learning_hub_glow').setDepth(1).setAlpha(0.55);
    this.tweens.add({
      targets: coreGlow,
      alpha: { from: 0.4, to: 0.7 },
      scaleX: { from: 0.96, to: 1.04 },
      duration: 2500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Five tiny multi-colored sector status LEDs across the core console:
    // Universitas (cyan), Rumah Sakit (teal), Perbankan (amber), E-Commerce (violet), Pemerintahan (green)
    const sectorLedConfigs = [
      { x: coreX - 16, color: 0x38bdf8, duration: 1100, delay: 0 },
      { x: coreX - 8,  color: 0x2dd4bf, duration: 1300, delay: 200 },
      { x: coreX,      color: 0xfbbf24, duration: 1200, delay: 400 },
      { x: coreX + 8,  color: 0xa78bfa, duration: 1400, delay: 600 },
      { x: coreX + 16, color: 0x4ade80, duration: 1250, delay: 300 },
    ];

    sectorLedConfigs.forEach((cfg) => {
      const led = this.add.circle(cfg.x, coreY - 4, 1.2, cfg.color, 0.9).setDepth(coreY + 14);
      this.tweens.add({
        targets: led,
        alpha: { from: 0.3, to: 1 },
        duration: cfg.duration,
        delay: cfg.delay,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
    });

    this.registerInteractable({
      id: 'simulation_core',
      x: coreX,
      y: coreY + 14,
      radius: 40,
      label: '[E] SIMULATION CORE',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR3_DIALOGUES.simulation_core });
      },
    });

    // 8. NPCs (Positioned contextually outside the primary circulation corridor)
    // NPC 01: ANALIS SEKTOR (Near Simulation Core)
    const npcA_X = 192;
    const npcA_Y = 136;
    const npcA = this.addStaticProp(npcA_X, npcA_Y, 'npc_analis_sektor', 20, 24);
    this.tweens.add({
      targets: npcA,
      y: npcA_Y - 0.8,
      duration: 2400,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'sector_analyst',
      x: npcA_X,
      y: npcA_Y,
      radius: 38,
      label: '[E] ANALIS SEKTOR',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR3_DIALOGUES.sector_analyst });
      },
    });

    // NPC 02: KOORDINATOR SIMULASI (Near Ruang Simulasi approach)
    const npcB_X = 380;
    const npcB_Y = 148;
    const npcB = this.addStaticProp(npcB_X, npcB_Y, 'npc_koordinator_simulasi', 20, 24);
    this.tweens.add({
      targets: npcB,
      y: npcB_Y - 0.8,
      duration: 2600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'simulation_coordinator',
      x: npcB_X,
      y: npcB_Y,
      radius: 38,
      label: '[E] KOORDINATOR SIMULASI',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR3_DIALOGUES.simulation_coordinator });
      },
    });

    // 9. Five Optional Sector Stations (Distributed Across The Map for Vertical & Horizontal Balance)
    // STATION 01: UNIVERSITAS (Upper-West)
    const st1X = 104;
    const st1Y = 84;
    this.addStaticProp(st1X, st1Y, 'prop_station_universitas', 26, 22);
    const st1Led = this.add.circle(st1X, st1Y - 6, 1.2, 0x38bdf8, 0.9).setDepth(st1Y + 14);
    this.tweens.add({
      targets: st1Led,
      alpha: { from: 0.3, to: 1 },
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'station_universitas',
      x: st1X,
      y: st1Y + 18,
      radius: 38,
      label: '[E] UNIVERSITAS',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR3_DIALOGUES.station_universitas });
      },
    });

    // STATION 02: RUMAH SAKIT (Upper-East)
    const st2X = 376;
    const st2Y = 84;
    this.addStaticProp(st2X, st2Y, 'prop_station_rumahsakit', 26, 22);
    const st2Led = this.add.circle(st2X, st2Y - 6, 1.2, 0x2dd4bf, 0.9).setDepth(st2Y + 14);
    this.tweens.add({
      targets: st2Led,
      alpha: { from: 0.35, to: 1 },
      duration: 1350,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'station_rumahsakit',
      x: st2X,
      y: st2Y + 18,
      radius: 38,
      label: '[E] RUMAH SAKIT',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR3_DIALOGUES.station_rumahsakit });
      },
    });

    // STATION 03: PERBANKAN (Mid-West, south of runner)
    const st3X = 104;
    const st3Y = 236;
    this.addStaticProp(st3X, st3Y, 'prop_station_perbankan', 26, 22);
    const st3Led = this.add.circle(st3X, st3Y - 6, 1.2, 0xfbbf24, 0.9).setDepth(st3Y + 14);
    this.tweens.add({
      targets: st3Led,
      alpha: { from: 0.3, to: 1 },
      duration: 1100,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'station_perbankan',
      x: st3X,
      y: st3Y + 18,
      radius: 38,
      label: '[E] PERBANKAN',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR3_DIALOGUES.station_perbankan });
      },
    });

    // STATION 04: E-COMMERCE (Mid-East, south of runner)
    const st4X = 376;
    const st4Y = 236;
    this.addStaticProp(st4X, st4Y, 'prop_station_ecommerce', 26, 22);
    const st4Led = this.add.circle(st4X, st4Y - 6, 1.2, 0xa78bfa, 0.9).setDepth(st4Y + 14);
    this.tweens.add({
      targets: st4Led,
      alpha: { from: 0.35, to: 1 },
      duration: 1450,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'station_ecommerce',
      x: st4X,
      y: st4Y + 18,
      radius: 38,
      label: '[E] E-COMMERCE',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR3_DIALOGUES.station_ecommerce });
      },
    });

    // STATION 05: PEMERINTAHAN (South-Center)
    const st5X = 240;
    const st5Y = 280;
    this.addStaticProp(st5X, st5Y, 'prop_station_pemerintahan', 26, 22);
    const st5Led = this.add.circle(st5X, st5Y - 6, 1.2, 0x4ade80, 0.9).setDepth(st5Y + 14);
    this.tweens.add({
      targets: st5Led,
      alpha: { from: 0.25, to: 1 },
      duration: 1300,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'station_pemerintahan',
      x: st5X,
      y: st5Y + 18,
      radius: 38,
      label: '[E] PEMERINTAHAN',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR3_DIALOGUES.station_pemerintahan });
      },
    });

    // 10. Restrained Decorative & Informational Elements
    // Floor 3 Directory Stand (Near Elevator Exit)
    const dirX = 138;
    const dirY = 146;
    this.addStaticProp(dirX, dirY, 'prop_secsim_directory', 18, 20);
    this.registerInteractable({
      id: 'simulation_directory',
      x: dirX,
      y: dirY + 14,
      radius: 34,
      label: '[E] DIREKTORI SIMULASI',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR3_DIALOGUES.simulation_directory });
      },
    });

    // Plants: Flanking corners & South bay
    this.addStaticProp(34, MAP_H - 28, 'prop_floor3_plant', 18, 16, 0, 10);
    this.addStaticProp(446, MAP_H - 28, 'prop_floor3_plant', 18, 16, 0, 10);
    this.addStaticProp(170, 280, 'prop_floor3_plant', 18, 16, 0, 8);

    // Bench: South bay flank
    this.addStaticProp(310, 280, 'prop_floor3_bench', 28, 14);

    // 11. Location Arrival Badge (Top-Left, 3.5s Fade)
    const bannerText = this.add.text(0, 0, 'L3 - SECTOR SIMULATION CENTER', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '7px',
      color: '#38bdf8',
    }).setOrigin(0.5).setDepth(101).setScrollFactor(0);

    const badgeW = Math.max(220, Math.ceil(bannerText.width + 20));
    const badgeH = 20;
    const badgeX = badgeW / 2 + 12;
    const badgeY = badgeH / 2 + 10;
    bannerText.setPosition(badgeX, badgeY);

    const bannerBg = this.add.rectangle(badgeX, badgeY, badgeW, badgeH, 0x090e1a, 0.88)
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
