// LobbyScene.js - Compact Explorable Main Lobby in RISK IT TOWER
import Phaser from 'phaser';
import BaseExplorationScene from './BaseExplorationScene';
import { LOBBY_DIALOGUES } from '../data/lobbyData';

export default class LobbyScene extends BaseExplorationScene {
  constructor() {
    super('LobbyScene');
  }

  init(data) {
    const registrySpawn = this.game.registry.get('initialSpawn') || {};
    this.spawnData = data && Object.keys(data).length > 0 ? data : registrySpawn;
  }

  create() {
    const MAP_W = 480;
    const MAP_H = 352;
    const TILE = 32;

    // 1. Determine Initial Spawn Position
    let spawnX = 240;
    let spawnY = 295;
    let spawnFacing = 'up';

    if (this.spawnData.spawn === 'elevator') {
      spawnX = 385;
      spawnY = 185;
      spawnFacing = 'left';
    } else if (this.spawnData.exactX && this.spawnData.exactY) {
      spawnX = this.spawnData.exactX;
      spawnY = this.spawnData.exactY;
      spawnFacing = this.spawnData.facing || 'down';
    }

    // 2. Initialize Base Systems (Camera, Physics, Obstacles Group, Player) FIRST!
    this.initBase(MAP_W, MAP_H, spawnX, spawnY, spawnFacing);

    // 3. Build Floor Tiles (15 x 11 tiles) with Intentional Visual Zoning
    for (let x = 0; x < MAP_W; x += TILE) {
      for (let y = 0; y < MAP_H; y += TILE) {
        const col = Math.floor(x / TILE);
        const row = Math.floor(y / TILE);

        // Alternating marble panel grid to eliminate repetition while staying clean
        let tileKey = (col + row) % 2 === 0 ? 'tile_floor_lobby' : 'tile_floor_lobby_alt';

        // Executive Lounge Rug (South-West: cols 1..4, rows 6..8)
        if (col >= 1 && col <= 4 && row >= 6 && row <= 8) {
          const isBorder = (col === 1 || col === 4 || row === 6 || row === 8);
          tileKey = isBorder ? 'tile_floor_lounge_border' : 'tile_floor_lounge_carpet';
        }
        // Tech zone under Mission Board (North-West: cols 1..3, row 2)
        else if (col >= 1 && col <= 3 && row === 2) {
          tileKey = 'tile_floor_tech_zone';
        }
        // Tech zone under RiskDex station (North-East: cols 11..13, row 2)
        else if (col >= 11 && col <= 13 && row === 2) {
          tileKey = 'tile_floor_tech_zone';
        }
        // Tech zone in front of Elevator (East: cols 12..13, rows 5..6)
        else if ((col === 12 || col === 13) && (row === 5 || row === 6)) {
          tileKey = 'tile_floor_tech_zone';
        }

        this.add.image(x + TILE / 2, y + TILE / 2, tileKey).setDepth(0);
      }
    }

    // Central Executive Promenade (Prestigious entrance leading directly to reception)
    // 64px wide runner centered at MAP_W / 2 = 240 (x: 208..272)
    for (let row = 4; row <= 10; row++) {
      const y = row * TILE;
      // Staggered illuminated directional lane guides on rows 6 and 8
      const runnerKey = (row === 6 || row === 8) ? 'tile_floor_lane_guide' : 'tile_floor_lobby_runner';
      this.add.image(224, y + TILE / 2, runnerKey).setDepth(0);
      this.add.image(256, y + TILE / 2, runnerKey).setDepth(0);
    }

    // Lighting Hierarchy - Controlled Darker Outer Corners (Vignette Shading)
    this.add.rectangle(32, MAP_H - 24, 64, 48, 0x060911, 0.22).setDepth(1);
    this.add.rectangle(MAP_W - 32, MAP_H - 24, 64, 48, 0x060911, 0.22).setDepth(1);
    this.add.rectangle(24, 80, 48, 48, 0x060911, 0.15).setDepth(1);
    this.add.rectangle(MAP_W - 24, 80, 48, 48, 0x060911, 0.15).setDepth(1);

    // 4. Build Perimeter Walls & Architectural Facade
    // North Wall Graphic Tiles (y: 0 to 64)
    for (let x = 0; x < MAP_W; x += TILE) {
      this.add.image(x + TILE / 2, 16, 'tile_wall_top').setDepth(1);
      this.add.image(x + TILE / 2, 48, 'tile_wall_face').setDepth(2);
    }

    // Architectural Pilasters / Columns with cyan LED lines framing functional bays
    const columnXPositions = [48, 144, 336, 432];
    columnXPositions.forEach((cx) => {
      this.add.image(cx, 48, 'tile_wall_column').setDepth(2);
    });

    // North Wall Mounted High-Tech Architectural Fixtures
    // 1) Central Grand Feature Wall Marquee: "RISK IT TOWER" Signage & Telemetry Display
    this.add.image(240, 38, 'prop_reception_backdrop').setDepth(3);

    // Subtle animated telemetry scanline across the central reception screen
    const telemetryScanline = this.add.rectangle(240, 44, 86, 2, 0x38bdf8, 0.4).setDepth(4);
    this.tweens.add({
      targets: telemetryScanline,
      alpha: { from: 0.2, to: 0.65 },
      y: { from: 41, to: 47 },
      duration: 2200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // 2) West Bay: Architectural HVAC Vent & Framed Risk Charter Certificate
    this.add.image(64, 22, 'prop_wall_vent').setDepth(3);
    this.add.image(116, 38, 'prop_wall_certificate').setDepth(3);

    // 3) East Bay: Wall-Mounted Telemetry Monitor & Executive Wall Clock
    this.add.image(362, 38, 'prop_wall_monitor').setDepth(3);
    this.add.image(416, 22, 'prop_wall_vent').setDepth(3);
    this.add.image(444, 36, 'prop_wall_clock').setDepth(3);

    // Static Wall Collision Boundaries
    this.addCollisionBox(MAP_W / 2, 32, MAP_W, 64); // North Wall
    this.addCollisionBox(8, MAP_H / 2, 16, MAP_H); // Left Wall
    this.addCollisionBox(MAP_W - 8, MAP_H / 2, 16, MAP_H); // Right Wall
    this.addCollisionBox(80, MAP_H - 8, 160, 16); // South Wall L
    this.addCollisionBox(MAP_W - 80, MAP_H - 8, 160, 16); // South Wall R

    // South Entrance Mat & Glass Threshold (y: 324 to 352, centered at 240)
    this.add.rectangle(MAP_W / 2, 338, 64, 26, 0x0284c7, 0.4).setDepth(1);
    this.add.rectangle(MAP_W / 2, 338, 60, 22, 0x0369a1, 0.25).setDepth(1);
    this.add.rectangle(MAP_W / 2, 350, 64, 4, 0x38bdf8, 0.9).setDepth(2);

    // 5. Reception Area & Petugas Informasi (North Center Visual Anchor - BRIGHTEST FOCAL ZONE)
    const deskX = 240;
    const deskY = 110;
    this.addStaticProp(deskX, deskY, 'prop_reception_desk', 80, 24, 0, 4);

    // Receptionist NPC standing professionally behind the desk with idle breathing animation
    const receptionist = this.add.image(deskX, deskY - 14, 'npc_receptionist').setDepth(deskY - 10);
    this.tweens.add({
      targets: receptionist,
      y: deskY - 14.8,
      duration: 2400,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Flanking Deluxe Planters
    this.addStaticProp(176, deskY, 'prop_plant_deluxe', 20, 16, 0, 10);
    this.addStaticProp(304, deskY, 'prop_plant_deluxe', 20, 16, 0, 10);

    // Reception Focal Spotlight Pool (Brightest lighting zone in the room)
    const receptionSpotlight = this.add.image(deskX, deskY + 18, 'prop_reception_spotlight')
      .setDepth(1)
      .setAlpha(0.85);
    this.tweens.add({
      targets: receptionSpotlight,
      alpha: { from: 0.72, to: 0.96 },
      scaleX: { from: 0.98, to: 1.03 },
      duration: 2600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Soft station floor illumination highlight
    const deskGlow = this.add.image(deskX, deskY + 24, 'prop_floor_glow').setDepth(1).setAlpha(0.65);
    this.tweens.add({
      targets: deskGlow,
      alpha: { from: 0.5, to: 0.8 },
      duration: 2200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'npc_receptionist',
      x: deskX,
      y: deskY + 24,
      radius: 42,
      label: '[E] PETUGAS INFORMASI',
      onInteract: () => {
        const hasSpoken = Boolean(this.game.registry.get('hasSpokenToReceptionist'));
        const dialogue = hasSpoken ? LOBBY_DIALOGUES.receptionist_repeat : LOBBY_DIALOGUES.receptionist_intro;
        if (!hasSpoken) {
          this.game.registry.set('hasSpokenToReceptionist', true);
        }
        this.game.events.emit('openDialogue', { dialogue });
      },
    });

    // 6. Mission Command Status Board Area (North-West)
    const boardX = 80;
    const boardY = 62;
    this.addStaticProp(boardX, boardY, 'prop_status_board', 56, 32);

    // IT Risk Archive Credenza against West Wall
    this.addStaticProp(34, 88, 'prop_archive_cabinet', 28, 20, 0, 4);

    // Soft floor glow for Mission Board
    const boardGlow = this.add.image(boardX, boardY + 26, 'prop_floor_glow').setDepth(1).setAlpha(0.55);
    this.tweens.add({
      targets: boardGlow,
      alpha: { from: 0.4, to: 0.7 },
      duration: 2600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Blinking telemetry indicator on Mission Board
    const boardLed = this.add.circle(boardX - 22, boardY - 11, 1.5, 0x22c55e, 0.9).setDepth(boardY + 14);
    this.tweens.add({
      targets: boardLed,
      alpha: { from: 0.3, to: 1 },
      duration: 1400,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'prop_status_board',
      x: boardX,
      y: boardY + 28,
      radius: 40,
      label: '[E] PAPAN STATUS TOWER',
      onInteract: () => {
        this.game.events.emit('openMissionBoard');
      },
    });

    // 7. RiskDex Dedicated Terminal Kiosk Station (North-East)
    const kioskX = 400;
    const kioskY = 64;
    this.addStaticProp(kioskX, kioskY, 'prop_riskdex_kiosk', 32, 32, 0, 4);

    // Retro Office Water Dispenser against East Wall
    this.addStaticProp(446, 76, 'prop_water_cooler', 14, 20, 0, 6);

    // RiskDex Beacon Light Pulse & Station Floor Glow
    const kioskGlow = this.add.image(kioskX, kioskY + 24, 'prop_floor_glow').setDepth(1).setAlpha(0.75);
    this.tweens.add({
      targets: kioskGlow,
      alpha: { from: 0.55, to: 0.95 },
      scaleX: { from: 0.95, to: 1.08 },
      duration: 1800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Cyan active terminal indicator LED
    const kioskLed = this.add.circle(kioskX - 10, kioskY - 9, 1.5, 0x38bdf8, 0.9).setDepth(kioskY + 14);
    this.tweens.add({
      targets: kioskLed,
      alpha: { from: 0.4, to: 1 },
      duration: 1100,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'prop_riskdex_kiosk',
      x: kioskX,
      y: kioskY + 28,
      radius: 40,
      label: '[E] TERMINAL RISKDEX',
      onInteract: () => {
        const pState = this.getPlayerState();
        this.game.events.emit('openRiskDex', {
          returnLocation: 'lobby',
          returnState: pState,
        });
      },
    });

    // 8. High-Speed Executive Elevator Area (East Wall - STRONG FOCUSED GLOW)
    const elevX = 440;
    const elevY = 175;
    this.addStaticProp(elevX, elevY, 'prop_elevator', 56, 36);

    // Floor safety threshold marking & focused futuristic progression glow
    this.add.rectangle(elevX - 30, elevY + 20, 36, 6, 0xca8a04, 0.5).setDepth(1);
    const elevGlow = this.add.image(elevX - 26, elevY + 14, 'prop_elevator_glow').setDepth(1).setAlpha(0.75);
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
    const elevCallLed = this.add.circle(elevX + 28, elevY + 1, 1.5, 0xf59e0b, 0.9).setDepth(elevY + 14);
    this.tweens.add({
      targets: elevCallLed,
      alpha: { from: 0.35, to: 1 },
      duration: 1300,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'prop_elevator',
      x: elevX - 32,
      y: elevY + 10,
      radius: 44,
      label: '[E] LIFT TOWER',
      onInteract: () => {
        this.game.events.emit('openElevator', { currentFloor: 'lobby' });
      },
    });

    // 9. Executive Lounge & Analis Senior Area (South-West Corner - SOFTER AMBIENT LIGHTING)
    // Smart Corporate Beverage Vending Machine against West Wall
    this.addStaticProp(34, 150, 'prop_vending_machine', 22, 26, 0, 5);

    // Vending machine ready indicator LED pulse
    const vendLed = this.add.circle(41, 142, 1.5, 0x22c55e, 0.9).setDepth(150 + 10);
    this.tweens.add({
      targets: vendLed,
      alpha: { from: 0.3, to: 1 },
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    const sofaX = 76;
    const sofaY = 224;
    this.addStaticProp(sofaX, sofaY, 'prop_lounge_sofa', 46, 20, 0, 2);

    const tableX = 76;
    const tableY = 254;
    this.addStaticProp(tableX, tableY, 'prop_lounge_table', 30, 16, 0, 2);

    const chairX = 124;
    const chairY = 254;
    this.addStaticProp(chairX, chairY, 'prop_lounge_chair', 20, 20, 0, 2);

    const seniorX = 124;
    const seniorY = 218;
    const analyst = this.addStaticProp(seniorX, seniorY, 'npc_analyst', 18, 22, 0, 4);
    // Senior Analyst idle breathing micro-animation
    this.tweens.add({
      targets: analyst,
      y: seniorY - 0.8,
      duration: 2700,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Lounge decorative planter
    this.addStaticProp(34, 196, 'prop_plant_deluxe', 20, 16, 0, 10);

    // Soft Warm Amber Ambient Lounge Glow (Cozy waiting area ambience)
    const loungeGlow = this.add.image(86, 238, 'prop_lounge_glow').setDepth(1).setAlpha(0.5);
    this.tweens.add({
      targets: loungeGlow,
      alpha: { from: 0.4, to: 0.65 },
      duration: 3000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.registerInteractable({
      id: 'npc_analyst',
      x: seniorX,
      y: seniorY,
      radius: 40,
      label: '[E] ANALIS SENIOR',
      onInteract: () => {
        this.game.events.emit('openDialogue', { dialogue: LOBBY_DIALOGUES.senior_analyst });
      },
    });

    // 10. South Perimeter Decorative Planters (Corners)
    this.addStaticProp(34, MAP_H - 28, 'prop_plant_deluxe', 20, 16, 0, 10);
    this.addStaticProp(MAP_W - 34, MAP_H - 28, 'prop_plant_deluxe', 20, 16, 0, 10);

    // 11. Subtle Ambient Atmosphere: Slow Floating Dust Motes (Clean, Non-Distracting)
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
    const bannerText = this.add.text(0, 0, 'GF - LOBBY UTAMA', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '7px',
      color: '#38bdf8',
    }).setOrigin(0.5).setDepth(101).setScrollFactor(0);

    const badgeW = Math.max(140, Math.ceil(bannerText.width + 20));
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
