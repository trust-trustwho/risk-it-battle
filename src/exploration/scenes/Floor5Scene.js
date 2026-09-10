// Floor5Scene.js - Explorable Lantai 5 (Crisis Command Center) in RISK IT TOWER
// Final floor of the campaign: executive decision center, culmination of all best practices
import Phaser from 'phaser';
import BaseExplorationScene from './BaseExplorationScene';
import { FLOOR5_DIALOGUES } from '../data/floor5Data';
import { createFloor5Textures } from '../textures/textureGenerator';

export default class Floor5Scene extends BaseExplorationScene {
  constructor() {
    super('Floor5Scene');
  }

  init(data) {
    const registrySpawn = this.game.registry.get('initialSpawn') || {};
    this.spawnData = data && Object.keys(data).length > 0 ? data : registrySpawn;
  }

  create() {
    // Ensure Floor 5 textures are present
    createFloor5Textures(this);

    const MAP_W = 480;
    const MAP_H = 352;
    const TILE = 32;

    // Check if Mission 05 is already completed from registry
    const isCompleted = Boolean(this.game.registry.get('mission5Completed'));

    // 1. Determine Initial Spawn Position
    let spawnX = 95;
    let spawnY = 185;
    let spawnFacing = 'right';

    if (this.spawnData.spawn === 'missionRoom') {
      // Returning after battle: spawn in front of Ruang Komando door facing left
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

    // 3. Build Floor Tiles (15 cols x 11 rows = 480 x 352 px)
    // Executive dark navy & steel-blue tiles with richer center zone
    for (let x = 0; x < MAP_W; x += TILE) {
      for (let y = 0; y < MAP_H; y += TILE) {
        const col = Math.floor(x / TILE);
        const row = Math.floor(y / TILE);

        let tileKey = (col + row) % 2 === 0 ? 'tile_floor_floor5' : 'tile_floor_floor5_alt';

        // Executive center zone around Command Table (Rows 2..4, Cols 5..9)
        if (row >= 2 && row <= 4 && col >= 5 && col <= 9) {
          tileKey = 'tile_floor_floor5_center';
        }

        this.add.image(x + TILE / 2, y + TILE / 2, tileKey).setDepth(0);
      }
    }

    // Central Transit Corridor Runner (Row 5: connecting Elevator at West to Ruang Komando at East)
    // Minimalist, clean, deep navy runner with restrained cyan edges — no arrows, numbers, or large symbols
    for (let col = 3; col <= 11; col++) {
      const px = col * TILE + TILE / 2;
      const py = 5 * TILE + TILE / 2; // y = 176

      let runnerKey = 'tile_floor_floor5_runner';
      if (col === 3) {
        runnerKey = 'tile_floor_floor5_runner_start';
      } else if (col === 11) {
        runnerKey = 'tile_floor_floor5_runner_end';
      }

      this.add.image(px, py, runnerKey).setDepth(0);
    }

    // Subtle Corner Vignette Lighting (Darker and quieter corners)
    this.add.rectangle(32, MAP_H - 24, 64, 48, 0x03050a, 0.28).setDepth(1);
    this.add.rectangle(MAP_W - 32, MAP_H - 24, 64, 48, 0x03050a, 0.28).setDepth(1);
    this.add.rectangle(24, 80, 48, 48, 0x03050a, 0.22).setDepth(1);
    this.add.rectangle(MAP_W - 24, 80, 48, 48, 0x03050a, 0.22).setDepth(1);

    // 4. Perimeter Walls & Architectural Facade
    // North Wall Graphic Tiles (y: 0 to 64)
    for (let x = 0; x < MAP_W; x += TILE) {
      this.add.image(x + TILE / 2, 16, 'tile_wall_top').setDepth(1);
      this.add.image(x + TILE / 2, 48, 'tile_wall_face').setDepth(2);
    }

    // Slim architectural columns framing the executive bays
    const columnXPositions = [48, 140, 340, 432];
    columnXPositions.forEach((cx) => {
      this.add.image(cx, 48, 'tile_wall_column').setDepth(2);
    });

    // North Wall Mounted Fixtures:
    // Architectural Plaque: CRISIS COMMAND CENTER
    this.add.image(240, 36, 'prop_floor5_header').setDepth(3);

    // Subtle telemetry scanline across the header panel
    const headerScanline = this.add.rectangle(240, 38, 90, 1.5, 0x38bdf8, 0.35).setDepth(4);
    this.tweens.add({
      targets: headerScanline,
      alpha: { from: 0.15, to: 0.55 },
      x: { from: 220, to: 260 },
      duration: 2500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Wall Collision Boxes
    this.addCollisionBox(MAP_W / 2, 32, MAP_W, 64); // North Wall
    this.addCollisionBox(8, MAP_H / 2, 16, MAP_H); // Left Wall
    this.addCollisionBox(MAP_W - 8, MAP_H / 2, 16, MAP_H); // Right Wall
    this.addCollisionBox(MAP_W / 2, MAP_H - 8, MAP_W, 16); // South Wall

    // Decorative wall baseboard kickplate
    this.add.rectangle(MAP_W / 2, MAP_H - 4, MAP_W, 8, 0x060912).setDepth(2);

    // 5. Elevator (West Wall - AKSES LANTAI / L5 - Full 64 x 48 Architectural Scale)
    const elevX = 40;
    const elevY = 175;
    this.addStaticProp(elevX, elevY, 'prop_elevator_l5', 56, 44, 0, 2);

    // Grounded floor threshold marking & restrained cyan ambient glow (No portal beam!)
    this.add.rectangle(elevX + 26, elevY + 23, 14, 2, 0x0284c7, 0.4).setDepth(1);
    const elevGlow = this.add.image(elevX + 24, elevY + 20, 'prop_elevator_l5_glow').setDepth(1).setAlpha(0.45);
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
      id: 'prop_elevator_floor5',
      x: elevX + 28,
      y: elevY + 10,
      radius: 42,
      label: '[E] LIFT TOWER',
      onInteract: () => {
        this.game.events.emit('openElevator', { currentFloor: 'floor5' });
      },
    });

    // 6. Ruang Komando Door (East Wall - PRIMARY FOCAL DESTINATION - Full 64 x 48 Architectural Scale)
    // Most prestigious mission doorway in the tower
    const doorX = 440;
    const doorY = 175;
    const doorTex = isCompleted ? 'prop_door_komando_complete' : 'prop_door_komando';
    this.addStaticProp(doorX, doorY, doorTex, 56, 44, 0, 2);

    // Grounded floor threshold marking & restrained access glow (No green cone spotlight!)
    const thresholdColor = isCompleted ? 0x059669 : 0xb45309;
    this.add.rectangle(doorX - 26, doorY + 23, 14, 2, thresholdColor, 0.4).setDepth(1);

    const glowTex = isCompleted ? 'prop_door_komando_glow_complete' : 'prop_door_komando_glow';
    const doorGlow = this.add.image(doorX - 24, doorY + 20, glowTex).setDepth(1).setAlpha(0.45);
    this.tweens.add({
      targets: doorGlow,
      alpha: { from: 0.3, to: 0.5 },
      scaleX: { from: 0.98, to: 1.02 },
      duration: isCompleted ? 2600 : 1600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Dual Status Light Indicators on door frame (restrained amber before completion, serene emerald after)
    const doorLedLeft = this.add.circle(doorX + 27, doorY + 1, 1.2, isCompleted ? 0x10b981 : 0xf59e0b, 0.85).setDepth(doorY + 14);
    const doorLedRight = this.add.circle(doorX + 29, doorY + 1, 1.2, isCompleted ? 0x10b981 : 0xf59e0b, 0.85).setDepth(doorY + 14);
    this.tweens.add({
      targets: doorLedLeft,
      alpha: { from: 0.35, to: 0.95 },
      duration: isCompleted ? 2200 : 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
    this.tweens.add({
      targets: doorLedRight,
      alpha: { from: 0.35, to: 0.95 },
      duration: isCompleted ? 2200 : 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'prop_ruang_komando',
      x: doorX - 28,
      y: doorY + 10,
      radius: 44,
      label: isCompleted ? '[E] RUANG KOMANDO (KRISIS TERKENDALI ✓)' : '[E] MASUK',
      onInteract: () => {
        this.game.events.emit('openMissionDoor', {
          isCompleted,
          missionId: 5,
          missionTitle: 'KRISIS SISTEM',
        });
      },
    });

    // 7. Executive Command Table (Center Workstation - SECONDARY FOCAL ANCHOR)
    // Upgraded 68 x 36 px executive desk with sturdy pedestals and recessed slots
    // Generous clearance: positioned at (240, 120) with wide walkable space all around
    const tableX = 240;
    const tableY = 120;
    const tableTex = isCompleted ? 'prop_table_command_executive_complete' : 'prop_table_command_executive';
    this.addStaticProp(tableX, tableY, tableTex, 64, 32);

    // Micro-animations on Command Table indicator lights
    const tablePulse = this.add.rectangle(tableX, tableY - 4, 54, 2, isCompleted ? 0x10b981 : 0x38bdf8, 0.6).setDepth(tableY + 14);
    this.tweens.add({
      targets: tablePulse,
      alpha: { from: 0.3, to: 0.85 },
      duration: isCompleted ? 2400 : 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'command_table',
      x: tableX,
      y: tableY + 14,
      radius: 42,
      label: '[E] ANALISIS',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR5_DIALOGUES.command_table });
      },
    });

    // 8. NPCs (Standard 24 x 32 px character scale with grounded feet)
    // NPC 01: ANALIS SENIOR (West of Executive Command Table)
    const npcA_X = 180;
    const npcA_Y = 120;
    const npcA = this.addStaticProp(npcA_X, npcA_Y, 'npc_analis_senior', 20, 28);
    this.tweens.add({
      targets: npcA,
      y: npcA_Y - 0.8,
      duration: 2400,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'analis_senior',
      x: npcA_X,
      y: npcA_Y,
      radius: 38,
      label: '[E] ANALIS SENIOR',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR5_DIALOGUES.analis_senior });
      },
    });

    // NPC 02: DIREKTUR RISIKO (East side, along route toward Ruang Komando)
    const npcB_X = 330;
    const npcB_Y = 140;
    const npcB = this.addStaticProp(npcB_X, npcB_Y, 'npc_direktur_risiko', 20, 28);
    this.tweens.add({
      targets: npcB,
      y: npcB_Y - 0.8,
      duration: 2600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'direktur_risiko',
      x: npcB_X,
      y: npcB_Y,
      radius: 38,
      label: '[E] DIREKTUR RISIKO',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR5_DIALOGUES.direktur_risiko });
      },
    });

    // 9. Three Grouped Framework Decision Modules (South-Central Flank - Row 8 / y: 256)
    // Standardized 32 x 28 px workstation pedestals with subtle framework differentiation
    // GROUP 01: GOVERNANCE & RISK (COBIT & Risk IT)
    const m1X = 130;
    const m1Y = 256;
    this.addStaticProp(m1X, m1Y, 'prop_module_gov_risk', 28, 24);
    const m1Led = this.add.circle(m1X + 7, m1Y - 6, 1.2, 0x0d9488, 0.9).setDepth(m1Y + 14);
    this.tweens.add({
      targets: m1Led,
      alpha: { from: 0.35, to: 1 },
      duration: 1300,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'module_gov_risk',
      x: m1X,
      y: m1Y + 16,
      radius: 38,
      label: '[E] BACA',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR5_DIALOGUES.module_gov_risk });
      },
    });

    // GROUP 02: SERVICE & SECURITY (ITIL & ISO 27001)
    const m2X = 240;
    const m2Y = 256;
    this.addStaticProp(m2X, m2Y, 'prop_module_service_security', 28, 24);
    const m2Led = this.add.circle(m2X + 7, m2Y - 6, 1.2, 0x38bdf8, 0.9).setDepth(m2Y + 14);
    this.tweens.add({
      targets: m2Led,
      alpha: { from: 0.35, to: 1 },
      duration: 1450,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'module_service_security',
      x: m2X,
      y: m2Y + 16,
      radius: 38,
      label: '[E] BACA',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR5_DIALOGUES.module_service_security });
      },
    });

    // GROUP 03: PROJECT & MATURITY (PMI & CMMI)
    const m3X = 350;
    const m3Y = 256;
    this.addStaticProp(m3X, m3Y, 'prop_module_project_maturity', 28, 24);
    const m3Led = this.add.circle(m3X + 7, m3Y - 6, 1.2, 0x10b981, 0.9).setDepth(m3Y + 14);
    this.tweens.add({
      targets: m3Led,
      alpha: { from: 0.35, to: 1 },
      duration: 1250,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'module_project_maturity',
      x: m3X,
      y: m3Y + 16,
      radius: 38,
      label: '[E] BACA',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR5_DIALOGUES.module_project_maturity });
      },
    });

    // 10. Crisis Status Area (North-East Wall - 48 x 30 Architectural Wall Panel)
    const csX = 376;
    const csY = 76;
    const csTex = isCompleted ? 'prop_crisis_status_board_complete' : 'prop_crisis_status_board';
    this.addStaticProp(csX, csY, csTex, 46, 28);

    const csIndicator = this.add.circle(csX + 15, csY - 8, 1.4, isCompleted ? 0x10b981 : 0xf59e0b, 0.9).setDepth(csY + 14);
    this.tweens.add({
      targets: csIndicator,
      alpha: { from: 0.3, to: 1 },
      duration: isCompleted ? 2000 : 1100,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'crisis_status',
      x: csX,
      y: csY + 16,
      radius: 38,
      label: '[E] STATUS SISTEM',
      onInteract: () => {
        const dlg = isCompleted ? FLOOR5_DIALOGUES.crisis_status_resolved : FLOOR5_DIALOGUES.crisis_status;
        this.game.events.emit('openDialogue', { dialogue: dlg });
      },
    });

    // 11. Restrained Executive Decor
    // Executive Directory Stand (Near Elevator Exit)
    const dirX = 138;
    const dirY = 146;
    this.addStaticProp(dirX, dirY, 'prop_floor5_directory', 18, 22);
    this.registerInteractable({
      id: 'floor5_directory',
      x: dirX,
      y: dirY + 14,
      radius: 34,
      label: '[E] DIREKTORI LANTAI 5',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR5_DIALOGUES.floor5_directory });
      },
    });

    // Executive Documentation Cabinet (North-West)
    this.addStaticProp(104, 76, 'prop_floor5_cabinet', 22, 24);

    // Waiting Bench on South Wall Flank
    this.addStaticProp(185, 296, 'prop_floor5_bench', 30, 16);

    // Executive Planters: Southern Corners (Upgraded 24 x 36 architectural planters)
    this.addStaticProp(34, MAP_H - 26, 'prop_floor5_plant', 20, 24, 0, 8);
    this.addStaticProp(446, MAP_H - 26, 'prop_floor5_plant', 20, 24, 0, 8);

    // 12. Location Arrival Badge (Top-Left, 3.5s Fade)
    const bannerText = this.add.text(0, 0, 'L5 - CRISIS COMMAND CENTER', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '7px',
      color: '#38bdf8',
    }).setOrigin(0.5).setDepth(101).setScrollFactor(0);

    const badgeW = Math.max(215, Math.ceil(bannerText.width + 20));
    const badgeH = 20;
    const badgeX = badgeW / 2 + 12;
    const badgeY = badgeH / 2 + 10;
    bannerText.setPosition(badgeX, badgeY);

    const bannerBg = this.add.rectangle(badgeX, badgeY, badgeW, badgeH, 0x060a12, 0.9)
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
