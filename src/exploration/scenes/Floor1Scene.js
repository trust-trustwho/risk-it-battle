// Floor1Scene.js - Explorable Lantai 1 (Framework Division) in RISK IT TOWER
import Phaser from 'phaser';
import BaseExplorationScene from './BaseExplorationScene';
import { FLOOR1_DIALOGUES } from '../data/floor1Data';

export default class Floor1Scene extends BaseExplorationScene {
  constructor() {
    super('Floor1Scene');
  }

  init(data) {
    const registrySpawn = this.game.registry.get('initialSpawn') || {};
    this.spawnData = data && Object.keys(data).length > 0 ? data : registrySpawn;
  }

  create() {
    const MAP_W = 480;
    const MAP_H = 352;
    const TILE = 32;

    // Check if Mission 01 is already completed
    const isCompleted = Boolean(this.game.registry.get('mission1Completed'));

    // 1. Determine Initial Spawn Position
    let spawnX = 95;
    let spawnY = 185;
    let spawnFacing = 'right';

    if (this.spawnData.spawn === 'missionRoom') {
      // Returning after battle: spawn in front of Mission Room door facing left
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

    // 2. Initialize Base Systems (Camera, Physics, Obstacles Group, Player) FIRST!
    this.initBase(MAP_W, MAP_H, spawnX, spawnY, spawnFacing);

    // 3. Build Floor Tiles (15 x 11 tiles) with Intentional Visual Zoning & Guideways
    for (let x = 0; x < MAP_W; x += TILE) {
      for (let y = 0; y < MAP_H; y += TILE) {
        const col = Math.floor(x / TILE);
        const row = Math.floor(y / TILE);

        // Alternating cool-grey corporate tile to eliminate repetition while staying clean
        let tileKey = (col + row) % 2 === 0 ? 'tile_floor_floor1' : 'tile_floor_floor1_alt';

        // Framework Learning Hub Technical Plating (Row 2, cols 3..11)
        if (row === 2 && col >= 3 && col <= 11) {
          tileKey = 'tile_floor_tech_zone';
        }
        // Discussion & Analysis Zone Acoustic Inlay (Rows 7..8, cols 5..9)
        else if ((row === 7 || row === 8) && col >= 5 && col <= 9) {
          tileKey = 'tile_floor_discussion';
        }
        // Technical Plating in front of Elevator (Rows 5..6, cols 2..3)
        else if ((row === 5 || row === 6) && (col === 2 || col === 3)) {
          tileKey = 'tile_floor_tech_zone';
        }
        // Technical Plating in front of Ruang Evaluasi (Rows 5..6, cols 11..12)
        else if ((row === 5 || row === 6) && (col === 11 || col === 12)) {
          tileKey = 'tile_floor_tech_zone';
        }

        this.add.image(x + TILE / 2, y + TILE / 2, tileKey).setDepth(0);
      }
    }

    // Central Transit Promenade (Connecting Elevator at West to Ruang Evaluasi at East)
    // Row 5 (y = 160) from col 3 (x: 96) to col 11 (x: 384)
    // Clean, minimalist, elegant runner - completely free of symbols, arrows, numbers, or signage
    for (let col = 3; col <= 11; col++) {
      const px = col * TILE + TILE / 2;
      const py = 5 * TILE + TILE / 2; // y = 176

      let runnerKey = 'tile_floor_floor1_runner';
      if (col === 3) {
        runnerKey = 'tile_floor_floor1_runner_start';
      } else if (col === 11) {
        runnerKey = 'tile_floor_floor1_runner_end';
      }

      this.add.image(px, py, runnerKey).setDepth(0);
    }

    // Lighting Hierarchy - Controlled Darker Outer Corners (Vignette Shading)
    this.add.rectangle(32, MAP_H - 24, 64, 48, 0x060911, 0.22).setDepth(1);
    this.add.rectangle(MAP_W - 32, MAP_H - 24, 64, 48, 0x060911, 0.22).setDepth(1);
    this.add.rectangle(24, 80, 48, 48, 0x060911, 0.15).setDepth(1);
    this.add.rectangle(MAP_W - 24, 80, 48, 48, 0x060911, 0.15).setDepth(1);

    // 4. Perimeter Walls & Architectural Facade
    // North Wall Graphic Tiles (y: 0 to 64)
    for (let x = 0; x < MAP_W; x += TILE) {
      this.add.image(x + TILE / 2, 16, 'tile_wall_top').setDepth(1);
      this.add.image(x + TILE / 2, 48, 'tile_wall_face').setDepth(2);
    }

    // Architectural Columns framing the learning bays
    const columnXPositions = [48, 116, 364, 432];
    columnXPositions.forEach((cx) => {
      this.add.image(cx, 48, 'tile_wall_column').setDepth(2);
    });

    // North Wall Mounted Fixtures:
    // 1) Grand Framework Division Header Marquee (Center Bay)
    this.add.image(240, 36, 'prop_framework_header').setDepth(3);

    // Subtle animated telemetry scanline across the header panel
    const headerScanline = this.add.rectangle(240, 40, 160, 2, 0x38bdf8, 0.35).setDepth(4);
    this.tweens.add({
      targets: headerScanline,
      alpha: { from: 0.2, to: 0.6 },
      y: { from: 38, to: 44 },
      duration: 2200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // 2) West Bay: Architectural HVAC Vent & Wall Comparison Chart
    this.add.image(80, 22, 'prop_wall_vent').setDepth(3);
    this.add.image(80, 38, 'prop_framework_chart_wall').setDepth(3);

    // 3) East Bay: Wall-Mounted Telemetry Monitor & HVAC Vent
    this.add.image(400, 22, 'prop_wall_vent').setDepth(3);
    this.add.image(400, 38, 'prop_wall_monitor').setDepth(3);

    // Static Wall Collision Boxes
    this.addCollisionBox(MAP_W / 2, 32, MAP_W, 64); // North Wall
    this.addCollisionBox(8, MAP_H / 2, 16, MAP_H); // Left Wall
    this.addCollisionBox(MAP_W - 8, MAP_H / 2, 16, MAP_H); // Right Wall
    this.addCollisionBox(MAP_W / 2, MAP_H - 8, MAP_W, 16); // South Wall

    // Decorative wall baseboard kickplate
    this.add.rectangle(MAP_W / 2, MAP_H - 4, MAP_W, 8, 0x0f172a).setDepth(2);

    // 5. Elevator (West Wall - AKSES LANTAI / L1)
    const elevX = 40;
    const elevY = 175;
    this.addStaticProp(elevX, elevY, 'prop_elevator_l1', 56, 36);

    // Floor safety threshold marking & focused futuristic progression glow
    this.add.rectangle(elevX + 30, elevY + 20, 36, 6, 0xca8a04, 0.5).setDepth(1);
    const elevGlow = this.add.image(elevX + 30, elevY + 14, 'prop_elevator_glow').setDepth(1).setAlpha(0.75);
    this.tweens.add({
      targets: elevGlow,
      alpha: { from: 0.6, to: 0.95 },
      scaleX: { from: 0.95, to: 1.06 },
      duration: 1900,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Pulsing illuminated call button on elevator frame
    const elevLed = this.add.circle(elevX + 28, elevY + 1, 1.5, 0xf59e0b, 0.9).setDepth(elevY + 14);
    this.tweens.add({
      targets: elevLed,
      alpha: { from: 0.35, to: 1 },
      duration: 1300,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'prop_elevator_floor1',
      x: elevX + 30,
      y: elevY + 10,
      radius: 42,
      label: '[E] LIFT TOWER',
      onInteract: () => {
        this.game.events.emit('openElevator', { currentFloor: 'floor1' });
      },
    });

    // 6. Mission Room Door (East Wall - RUANG EVALUASI - SECOND STRONGEST FOCAL POINT)
    const doorX = 440;
    const doorY = 175;
    const doorTex = isCompleted ? 'prop_mission_door_complete_v2' : 'prop_mission_door_v2';
    this.addStaticProp(doorX, doorY, doorTex, 60, 40);

    // Safety threshold marking & focused progression glow
    this.add.rectangle(doorX - 30, doorY + 20, 36, 6, 0xca8a04, 0.5).setDepth(1);
    const doorGlow = this.add.image(doorX - 28, doorY + 14, 'prop_mission_door_glow').setDepth(1).setAlpha(0.8);
    this.tweens.add({
      targets: doorGlow,
      alpha: { from: 0.65, to: 0.98 },
      scaleX: { from: 0.96, to: 1.06 },
      duration: 2100,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Status access panel indicator LED (Amber when ready, Green when cleared)
    const doorLedColor = isCompleted ? 0x22c55e : 0xf59e0b;
    const doorLed = this.add.circle(doorX + 28, doorY + 3, 1.5, doorLedColor, 0.9).setDepth(doorY + 14);
    this.tweens.add({
      targets: doorLed,
      alpha: { from: 0.35, to: 1 },
      duration: 1100,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'prop_mission_door',
      x: doorX - 32,
      y: doorY + 10,
      radius: 44,
      label: isCompleted ? '[E] RUANG EVALUASI (SELESAI)' : '[E] MASUK RUANG EVALUASI',
      onInteract: () => {
        this.game.events.emit('openMissionDoor', {
          isCompleted,
          missionId: 1,
          missionTitle: 'KENALI FRAMEWORK',
        });
      },
    });

    // 7. Framework Learning Hub (North Center - BRIGHTEST EDUCATIONAL FOCAL ZONE)
    // Central Learning Hub Spotlight Pool
    const hubGlow = this.add.image(240, 102, 'prop_learning_hub_glow').setDepth(1).setAlpha(0.85);
    this.tweens.add({
      targets: hubGlow,
      alpha: { from: 0.72, to: 0.96 },
      scaleX: { from: 0.98, to: 1.04 },
      duration: 2600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Station A: COBIT (Blue) + RISK IT (Amber)
    const stationAX = 140;
    const stationAY = 84;
    this.add.image(stationAX, stationAY + 6, 'prop_station_pod_glow').setDepth(1);
    this.addStaticProp(stationAX, stationAY, 'prop_framework_station_a', 48, 28);

    // Blinking activity LEDs on Station A
    const stALed1 = this.add.circle(stationAX - 12, stationAY - 10, 1.2, 0x3b82f6, 0.9).setDepth(stationAY + 14);
    const stALed2 = this.add.circle(stationAX + 12, stationAY - 10, 1.2, 0xf59e0b, 0.9).setDepth(stationAY + 14);
    this.tweens.add({
      targets: [stALed1, stALed2],
      alpha: { from: 0.3, to: 1 },
      duration: 1400,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'terminal_a',
      x: stationAX,
      y: stationAY + 26,
      radius: 38,
      label: '[E] TERMINAL A (COBIT & RISK IT)',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR1_DIALOGUES.terminal_a });
      },
    });

    // Station B: ITIL (Cyan) + ISO 27001 (Green)
    const stationBX = 240;
    const stationBY = 84;
    this.add.image(stationBX, stationBY + 6, 'prop_station_pod_glow').setDepth(1);
    this.addStaticProp(stationBX, stationBY, 'prop_framework_station_b', 48, 28);

    // Blinking activity LEDs on Station B
    const stBLed1 = this.add.circle(stationBX - 12, stationBY - 10, 1.2, 0x06b6d4, 0.9).setDepth(stationBY + 14);
    const stBLed2 = this.add.circle(stationBX + 12, stationBY - 10, 1.2, 0x22c55e, 0.9).setDepth(stationBY + 14);
    this.tweens.add({
      targets: [stBLed1, stBLed2],
      alpha: { from: 0.3, to: 1 },
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'terminal_b',
      x: stationBX,
      y: stationBY + 26,
      radius: 38,
      label: '[E] TERMINAL B (ITIL & ISO 27001)',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR1_DIALOGUES.terminal_b });
      },
    });

    // Station C: PMI (Orange) + CMMI (Purple)
    const stationCX = 340;
    const stationCY = 84;
    this.add.image(stationCX, stationCY + 6, 'prop_station_pod_glow').setDepth(1);
    this.addStaticProp(stationCX, stationCY, 'prop_framework_station_c', 48, 28);

    // Blinking activity LEDs on Station C
    const stCLed1 = this.add.circle(stationCX - 12, stationCY - 10, 1.2, 0xf97316, 0.9).setDepth(stationCY + 14);
    const stCLed2 = this.add.circle(stationCX + 12, stationCY - 10, 1.2, 0xa855f7, 0.9).setDepth(stationCY + 14);
    this.tweens.add({
      targets: [stCLed1, stCLed2],
      alpha: { from: 0.3, to: 1 },
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'terminal_c',
      x: stationCX,
      y: stationCY + 26,
      radius: 38,
      label: '[E] TERMINAL C (PMI & CMMI)',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR1_DIALOGUES.terminal_c });
      },
    });

    // Flanking Upper Technical Props
    // 1) Mini Server Rack against West Wall with active LED pulse
    this.addStaticProp(42, 78, 'prop_server_rack_mini', 18, 30);
    const srvLed = this.add.circle(49, 70, 1.5, 0x22c55e, 0.9).setDepth(78 + 14);
    this.tweens.add({
      targets: srvLed,
      alpha: { from: 0.25, to: 1 },
      duration: 850,
      yoyo: true,
      repeat: -1,
      ease: 'Stepped',
    });

    // 2) Documentation Archive Bookshelf
    this.addStaticProp(74, 76, 'prop_bookshelf', 28, 30);

    // 3) Executive Planter on East flank
    this.addStaticProp(406, 78, 'prop_plant_deluxe', 20, 16, 0, 10);

    // 8. Discussion & Analysis Zone (Middle-Lower Zone - BALANCED MID-LEVEL LIGHTING)
    // Soft Ambient Discussion Floor Glow
    const discGlow = this.add.image(240, 252, 'prop_floor_glow').setDepth(1).setAlpha(0.48);
    this.tweens.add({
      targets: discGlow,
      alpha: { from: 0.38, to: 0.58 },
      duration: 3000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Freestanding Mobile Framework Whiteboard (Comparison Matrix)
    const boardX = 240;
    const boardY = 224;
    this.addStaticProp(boardX, boardY, 'prop_framework_whiteboard', 44, 24);

    // Analysis / Meeting Table with Laptop & Dossiers
    const tableX = 240;
    const tableY = 264;
    this.addStaticProp(tableX, tableY, 'prop_analysis_table', 34, 18);

    // Ergonomic Swivel Chairs flanking the table
    this.addStaticProp(212, 264, 'prop_office_chair', 16, 16);
    this.addStaticProp(268, 264, 'prop_office_chair', 16, 16);

    // 9. NPCs with Contextual Workstations & Idle Micro-Animations
    // NPC A: Staf Tata Kelola (with dedicated Standing Analysis Console)
    this.addStaticProp(152, 222, 'prop_standing_desk', 20, 18);
    const npcA_X = 180;
    const npcA_Y = 222;
    const npcA = this.addStaticProp(npcA_X, npcA_Y, 'npc_governance', 20, 24);

    // Staf Tata Kelola idle breathing micro-animation
    this.tweens.add({
      targets: npcA,
      y: npcA_Y - 0.8,
      duration: 2500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'npc_governance',
      x: npcA_X,
      y: npcA_Y,
      radius: 40,
      label: '[E] STAF TATA KELOLA',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR1_DIALOGUES.governance_staff });
      },
    });

    // NPC B: Staf Layanan TI (with dedicated Standing Analysis Console)
    this.addStaticProp(328, 222, 'prop_standing_desk', 20, 18);
    const npcB_X = 300;
    const npcB_Y = 222;
    const npcB = this.addStaticProp(npcB_X, npcB_Y, 'npc_service', 20, 24);

    // Staf Layanan TI idle breathing micro-animation
    this.tweens.add({
      targets: npcB,
      y: npcB_Y - 0.8,
      duration: 2700,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'npc_service',
      x: npcB_X,
      y: npcB_Y,
      radius: 40,
      label: '[E] STAF LAYANAN TI',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: FLOOR1_DIALOGUES.service_staff });
      },
    });

    // 10. South Perimeter Planters (Corners)
    this.addStaticProp(34, MAP_H - 28, 'prop_plant_deluxe', 20, 16, 0, 10);
    this.addStaticProp(MAP_W - 34, MAP_H - 28, 'prop_plant_deluxe', 20, 16, 0, 10);

    // 11. Subtle Ambient Atmosphere: Slow Floating Dust Motes
    for (let i = 0; i < 6; i++) {
      const mote = this.add.circle(
        Phaser.Math.Between(50, MAP_W - 50),
        Phaser.Math.Between(80, MAP_H - 50),
        1.2,
        0x38bdf8,
        Phaser.Math.FloatBetween(0.08, 0.2)
      ).setDepth(20);

      this.tweens.add({
        targets: mote,
        x: mote.x + Phaser.Math.Between(-20, 20),
        y: mote.y - Phaser.Math.Between(15, 30),
        alpha: { from: mote.alpha, to: 0.04 },
        duration: Phaser.Math.Between(4500, 7500),
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
        delay: i * 700,
      });
    }

    // 12. Location Arrival Badge (Top-Left, Tasteful 3.5s Fade)
    const bannerText = this.add.text(0, 0, 'L1 - FRAMEWORK DIVISION', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '7px',
      color: '#38bdf8',
    }).setOrigin(0.5).setDepth(101).setScrollFactor(0);

    const badgeW = Math.max(180, Math.ceil(bannerText.width + 20));
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

