// Floor2Scene.js - Explorable Lantai 2 (Security Operations) in RISK IT TOWER
// Rebalanced, minimalist, and vertically distributed layout
import Phaser from 'phaser';
import BaseExplorationScene from './BaseExplorationScene';
import { FLOOR2_DIALOGUES } from '../data/floor2Data';

export default class Floor2Scene extends BaseExplorationScene {
  constructor() {
    super('Floor2Scene');
  }

  init(data) {
    const registrySpawn = this.game.registry.get('initialSpawn') || {};
    this.spawnData = data && Object.keys(data).length > 0 ? data : registrySpawn;
  }

  create() {
    const MAP_W = 480;
    const MAP_H = 352;
    const TILE = 32;

    // Check if Mission 02 is already completed from registry
    const isCompleted = Boolean(this.game.registry.get('mission2Completed'));

    // 1. Determine Initial Spawn Position
    let spawnX = 95;
    let spawnY = 185;
    let spawnFacing = 'right';

    if (this.spawnData.spawn === 'missionRoom') {
      // Returning after battle: spawn in front of Ruang Insiden door facing left
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

    // 2. Initialize Base Systems (Camera, Physics, Obstacles Group, Player) FIRST
    this.initBase(MAP_W, MAP_H, spawnX, spawnY, spawnFacing);

    // 3. Build Floor Tiles (15 cols x 11 rows = 480 x 352 px) with Zonal Contrast
    for (let x = 0; x < MAP_W; x += TILE) {
      for (let y = 0; y < MAP_H; y += TILE) {
        const col = Math.floor(x / TILE);
        const row = Math.floor(y / TILE);

        // Default: Alternating steel blue corporate tile
        let tileKey = (col + row) % 2 === 0 ? 'tile_floor_floor2' : 'tile_floor_floor2_alt';

        // Zone 1: Data Archive Area (North-West, Rows 2..3, Cols 1..4) - Darker Steel Tone
        if (row >= 2 && row <= 3 && col >= 1 && col <= 4) {
          tileKey = 'tile_floor_archive_zone';
        }
        // Zone 2: Security Operations Hub (North-Center, Rows 2..3, Cols 6..10) - Cyan Tech Plating
        else if (row >= 2 && row <= 3 && col >= 6 && col <= 10) {
          tileKey = 'tile_floor_sec_hub';
        }
        // Zone 3: Lower Evaluation & Support Bay (Rows 7..8, Cols 4..7) - Subtle Tech Plating
        else if (row >= 7 && row <= 8 && col >= 4 && col <= 7) {
          tileKey = 'tile_floor_sec_hub';
        }
        // Zone 4: Incident Response Threshold (Row 5, Col 12) - Amber warning marker
        else if (row === 5 && col === 12) {
          tileKey = 'tile_floor_incident_marker';
        }

        this.add.image(x + TILE / 2, y + TILE / 2, tileKey).setDepth(0);
      }
    }

    // Central Transit Runner (Row 5: connecting Elevator at West to Ruang Insiden at East)
    // Clean, minimalist, elegant carpet runner - completely free of symbols, arrows, numbers, or signage
    for (let col = 3; col <= 11; col++) {
      const px = col * TILE + TILE / 2;
      const py = 5 * TILE + TILE / 2; // y = 176

      let runnerKey = 'tile_floor_floor2_runner';
      if (col === 3) {
        runnerKey = 'tile_floor_floor2_runner_start';
      } else if (col === 11) {
        runnerKey = 'tile_floor_floor2_runner_end';
      }

      this.add.image(px, py, runnerKey).setDepth(0);
    }

    // Lighting Hierarchy - Subtle Vignette Shading on Outer Corners
    this.add.rectangle(32, MAP_H - 24, 64, 48, 0x050811, 0.28).setDepth(1);
    this.add.rectangle(MAP_W - 32, MAP_H - 24, 64, 48, 0x050811, 0.28).setDepth(1);
    this.add.rectangle(24, 80, 48, 48, 0x050811, 0.2).setDepth(1);
    this.add.rectangle(MAP_W - 24, 80, 48, 48, 0x050811, 0.2).setDepth(1);

    // 4. Perimeter Walls & Architectural Facade
    // North Wall Graphic Tiles (y: 0 to 64)
    for (let x = 0; x < MAP_W; x += TILE) {
      this.add.image(x + TILE / 2, 16, 'tile_wall_top').setDepth(1);
      this.add.image(x + TILE / 2, 48, 'tile_wall_face').setDepth(2);
    }

    // Thin structural columns framing the operational bays
    const columnXPositions = [48, 140, 340, 432];
    columnXPositions.forEach((cx) => {
      this.add.image(cx, 48, 'tile_wall_column').setDepth(2);
    });

    // North Wall Mounted Fixtures (Simplified, clean, no clutter):
    // 1) Security Operations Header Marquee (Center)
    this.add.image(240, 36, 'prop_secops_header').setDepth(3);

    // Subtle animated telemetry scanline across the header panel
    const headerScanline = this.add.rectangle(240, 40, 150, 2, 0x38bdf8, 0.35).setDepth(4);
    this.tweens.add({
      targets: headerScanline,
      alpha: { from: 0.15, to: 0.55 },
      y: { from: 38, to: 44 },
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // 2) West Bay HVAC Vent & East Bay Security Status Panel
    this.add.image(90, 22, 'prop_wall_vent').setDepth(3);
    this.add.image(390, 36, 'prop_security_status_panel').setDepth(3);
    this.add.image(390, 20, 'prop_wall_vent').setDepth(3);

    // Static Wall Collision Boxes
    this.addCollisionBox(MAP_W / 2, 32, MAP_W, 64); // North Wall
    this.addCollisionBox(8, MAP_H / 2, 16, MAP_H); // Left Wall
    this.addCollisionBox(MAP_W - 8, MAP_H / 2, 16, MAP_H); // Right Wall
    this.addCollisionBox(MAP_W / 2, MAP_H - 8, MAP_W, 16); // South Wall

    // Decorative wall baseboard kickplate
    this.add.rectangle(MAP_W / 2, MAP_H - 4, MAP_W, 8, 0x090d16).setDepth(2);

    // 5. Elevator (West Wall - AKSES LANTAI / L2)
    const elevX = 40;
    const elevY = 175;
    this.addStaticProp(elevX, elevY, 'prop_elevator_l2', 56, 36);

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

    // Pulsing illuminated call button on elevator frame (Cyan for Floor 2)
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
      id: 'prop_elevator_floor2',
      x: elevX + 30,
      y: elevY + 10,
      radius: 42,
      label: '[E] LIFT TOWER',
      onInteract: () => {
        this.game.events.emit('openElevator', { currentFloor: 'floor2' });
      },
    });

    // 6. Ruang Insiden Door (East Wall - PRIMARY FOCAL DESTINATION)
    const doorX = 440;
    const doorY = 175;
    const doorTex = isCompleted ? 'prop_ruang_insiden_door_complete' : 'prop_ruang_insiden_door';
    this.addStaticProp(doorX, doorY, doorTex, 60, 40);

    // Safety threshold marking & focused progression glow (Restrained amber before, calm green after)
    const thresholdColor = isCompleted ? 0x059669 : 0xd97706;
    this.add.rectangle(doorX - 30, doorY + 20, 36, 6, thresholdColor, 0.55).setDepth(1);

    const glowTex = isCompleted ? 'prop_ruang_insiden_glow_complete' : 'prop_ruang_insiden_glow';
    const doorGlow = this.add.image(doorX - 28, doorY + 14, glowTex).setDepth(1).setAlpha(0.85);
    this.tweens.add({
      targets: doorGlow,
      alpha: { from: 0.65, to: 1.0 },
      scaleX: { from: 0.95, to: 1.06 },
      duration: isCompleted ? 2400 : 1600, // Amber warning pulse before, calm green pulse after
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Status access panel indicator LED (Amber before, Green after)
    const doorLedColor = isCompleted ? 0x22c55e : 0xf59e0b;
    const doorLed = this.add.circle(doorX + 28, doorY + 3, 1.5, doorLedColor, 0.95).setDepth(doorY + 14);
    this.tweens.add({
      targets: doorLed,
      alpha: { from: 0.3, to: 1 },
      duration: isCompleted ? 1400 : 950,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'prop_ruang_insiden',
      x: doorX - 32,
      y: doorY + 10,
      radius: 44,
      label: isCompleted ? '[E] RUANG INSIDEN (TERKENDALI ✓)' : '[E] MASUK RUANG INSIDEN',
      onInteract: () => {
        this.game.events.emit('openMissionDoor', {
          isCompleted,
          missionId: 2,
          missionTitle: 'KEBOCORAN DATA',
        });
      },
    });

    // 7. Data Archive Cluster (North-West - RESTRAINED & SPACIOUS: 1 rack, 1 cabinet group, Terminal 01)
    // 1) Single compact server/storage rack against west wall
    this.addStaticProp(38, 82, 'prop_server_storage_rack', 18, 30);
    const srvLed1 = this.add.circle(45, 74, 1.2, 0x22c55e, 0.9).setDepth(82 + 14);
    const srvLed2 = this.add.circle(45, 82, 1.2, 0x38bdf8, 0.9).setDepth(82 + 14);
    this.tweens.add({
      targets: srvLed1,
      alpha: { from: 0.25, to: 1 },
      duration: 850,
      yoyo: true,
      repeat: -1,
      ease: 'Stepped',
    });
    this.tweens.add({
      targets: srvLed2,
      alpha: { from: 0.25, to: 1 },
      duration: 1150,
      yoyo: true,
      repeat: -1,
      ease: 'Stepped',
    });

    // 2) Primary archive cabinet group
    this.addStaticProp(84, 82, 'prop_archive_cabinets', 44, 24);

    // 3) Terminal 01: KONTEKS & KEPEMILIKAN (Cleanly placed in Archive Zone)
    const term1X = 136;
    const term1Y = 82;
    this.addStaticProp(term1X, term1Y, 'prop_terminal_identifikasi', 24, 22);
    const term1Led = this.add.circle(term1X, term1Y - 6, 1.2, 0xf59e0b, 0.9).setDepth(term1Y + 14);
    this.tweens.add({
      targets: term1Led,
      alpha: { from: 0.35, to: 1 },
      duration: 1350,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'terminal_identifikasi',
      x: term1X,
      y: term1Y + 22,
      radius: 38,
      label: '[E] TERMINAL 01 (KONTEKS RISIKO)',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR2_DIALOGUES.terminal_identifikasi });
      },
    });

    // 8. Security Operations Hub Cluster (North-Center - SECONDARY FOCAL POINT, UNCLUTTERED)
    // Controlled Cyan Ambient Hub Glow Pool
    const hubGlow = this.add.image(250, 96, 'prop_learning_hub_glow').setDepth(1).setAlpha(0.65);
    this.tweens.add({
      targets: hubGlow,
      alpha: { from: 0.52, to: 0.78 },
      scaleX: { from: 0.96, to: 1.04 },
      duration: 2400,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // NPC 01: Analis Keamanan (contextual at the analysis desk)
    const npcA_X = 190;
    const npcA_Y = 86;
    const npcA = this.addStaticProp(npcA_X, npcA_Y, 'npc_sec_analyst', 20, 24);

    // Subtle idle breathing
    this.tweens.add({
      targets: npcA,
      y: npcA_Y - 0.8,
      duration: 2400,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'npc_sec_analyst',
      x: npcA_X,
      y: npcA_Y,
      radius: 40,
      label: '[E] ANALIS KEAMANAN',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR2_DIALOGUES.security_analyst });
      },
    });

    // Incident Analysis Workstation (Central analysis workstation)
    const analysisX = 236;
    const analysisY = 82;
    this.addStaticProp(analysisX, analysisY, 'prop_analysis_workstation', 44, 24);
    const monitorLed = this.add.circle(analysisX - 10, analysisY - 10, 1.2, 0xf59e0b, 0.95).setDepth(analysisY + 14);
    this.tweens.add({
      targets: monitorLed,
      alpha: { from: 0.3, to: 1 },
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Operations Telemetry Console (East side of central hub)
    const secDeskX = 304;
    const secDeskY = 82;
    this.addStaticProp(secDeskX, secDeskY, 'prop_security_desk', 48, 24);
    const deskLed = this.add.circle(secDeskX + 18, secDeskY - 4, 1.2, 0x38bdf8, 0.9).setDepth(secDeskY + 14);
    this.tweens.add({
      targets: deskLed,
      alpha: { from: 0.35, to: 1 },
      duration: 1100,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // 9. Lower Area Support (Rows 7-8 - VERTICAL BALANCE & NOT EMPTY)
    // Soft Ambient Lower Floor Glow Pool
    const lowerGlow = this.add.image(200, 252, 'prop_floor_glow').setDepth(1).setAlpha(0.42);
    this.tweens.add({
      targets: lowerGlow,
      alpha: { from: 0.34, to: 0.52 },
      duration: 2800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // A) Modern Deluxe Planter (Left flank accent)
    this.addStaticProp(98, 254, 'prop_plant_deluxe', 20, 16, 0, 10);

    // B) Terminal 02: PENILAIAN BISNIS (Relocated to Lower Bay for vertical balance)
    const term2X = 150;
    const term2Y = 252;
    this.addStaticProp(term2X, term2Y, 'prop_terminal_penilaian', 24, 22);
    const term2Led = this.add.circle(term2X, term2Y - 6, 1.2, 0xea580c, 0.9).setDepth(term2Y + 14);
    this.tweens.add({
      targets: term2Led,
      alpha: { from: 0.3, to: 1 },
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'terminal_penilaian',
      x: term2X,
      y: term2Y + 20,
      radius: 38,
      label: '[E] TERMINAL 02 (PENILAIAN BISNIS)',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR2_DIALOGUES.terminal_penilaian });
      },
    });

    // C) Standing Incident Support Console
    this.addStaticProp(194, 252, 'prop_incident_console', 22, 22);

    // D) Secure Document Safe (Relocated from top wall)
    this.addStaticProp(260, 252, 'prop_doc_safe', 20, 22);

    // E) NPC 02: Petugas Insiden (South-East approach near Ruang Insiden)
    const npcB_X = 366;
    const npcB_Y = 236;
    const npcB = this.addStaticProp(npcB_X, npcB_Y, 'npc_incident_officer', 20, 24);

    // Subtle idle breathing
    this.tweens.add({
      targets: npcB,
      y: npcB_Y - 0.8,
      duration: 2600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'npc_incident_officer',
      x: npcB_X,
      y: npcB_Y,
      radius: 40,
      label: '[E] PETUGAS INSIDEN',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR2_DIALOGUES.incident_officer });
      },
    });

    // F) Terminal 03: RESPONS & PEMANTAUAN (South-East perimeter path)
    const term3X = 414;
    const term3Y = 236;
    this.addStaticProp(term3X, term3Y, 'prop_terminal_pemantauan', 24, 22);
    const term3Led = this.add.circle(term3X, term3Y - 6, 1.2, 0x22c55e, 0.9).setDepth(term3Y + 14);
    this.tweens.add({
      targets: term3Led,
      alpha: { from: 0.35, to: 1 },
      duration: 1600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'terminal_pemantauan',
      x: term3X,
      y: term3Y + 20,
      radius: 38,
      label: '[E] TERMINAL 03 (RESPONS & PEMANTAUAN)',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR2_DIALOGUES.terminal_penanganan_pemantauan });
      },
    });

    // 10. South Wall Perimeter Planters (Corner Aesthetic)
    this.addStaticProp(34, MAP_H - 28, 'prop_plant_deluxe', 20, 16, 0, 10);
    this.addStaticProp(446, MAP_H - 28, 'prop_plant_deluxe', 20, 16, 0, 10);

    // 11. Extremely Subtle Ambient Motes (3 motes, very low alpha)
    for (let i = 0; i < 3; i++) {
      const mote = this.add.circle(
        Phaser.Math.Between(80, MAP_W - 80),
        Phaser.Math.Between(100, MAP_H - 60),
        1.0,
        0x38bdf8,
        Phaser.Math.FloatBetween(0.04, 0.1)
      ).setDepth(20);

      this.tweens.add({
        targets: mote,
        x: mote.x + Phaser.Math.Between(-15, 15),
        y: mote.y - Phaser.Math.Between(10, 20),
        alpha: { from: mote.alpha, to: 0.02 },
        duration: Phaser.Math.Between(5500, 8500),
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
        delay: i * 1200,
      });
    }

    // 12. Location Arrival Badge (Top-Left, 3.5s Fade)
    const bannerText = this.add.text(0, 0, 'L2 - SECURITY OPERATIONS', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '7px',
      color: '#38bdf8',
    }).setOrigin(0.5).setDepth(101).setScrollFactor(0);

    const badgeW = Math.max(185, Math.ceil(bannerText.width + 20));
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
