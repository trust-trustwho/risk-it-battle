// BaseExplorationScene.js - Shared Exploration Engine Logic
import Phaser from 'phaser';
import { generateExplorationTextures } from '../textures/textureGenerator';

export default class BaseExplorationScene extends Phaser.Scene {
  constructor(key) {
    super({ key });
    this.player = null;
    this.cursors = null;
    this.wasd = null;
    this.keyE = null;
    this.keyEnter = null;
    this.obstacles = null;
    this.interactables = [];
    this.activeInteractable = null;
    this.isInputDisabled = false;
    this.playerFacing = 'down';
    this.playerSpeed = 135;
    this.walkFrameTimer = 0;
    this.walkFrameIndex = 0;
  }

  preload() {
    generateExplorationTextures(this);
  }

  /**
   * Initializes base systems: physics bounds, camera, static obstacle group, inputs, and player.
   * MUST be called at the very beginning of create() in child scenes!
   */
  initBase(width, height, spawnX, spawnY, spawnFacing = 'down') {
    // 0. Ensure textures are generated
    generateExplorationTextures(this);

    // 1. Set Physics World & Camera Bounds
    this.physics.world.setBounds(0, 0, width, height);

    const cam = this.cameras.main;
    cam.setBounds(0, 0, width, height);
    cam.setBackgroundColor('#090e1a');
    cam.setScroll(0, 0);

    // 2. Setup Input Keys
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
    this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    if (this.input && this.input.keyboard) {
      this.input.keyboard.clearCaptures();
    }

    // 3. Create Static Obstacles Group (GUARANTEED READY BEFORE ANY PROP IS ADDED)
    this.obstacles = this.physics.add.staticGroup();

    // 4. Create Player Sprite
    this.playerFacing = spawnFacing;
    const initialTexture = `player_${spawnFacing}_0`;
    this.player = this.physics.add.sprite(spawnX, spawnY, initialTexture);
    this.player.setCollideWorldBounds(true);
    // RPG footprint collision box (feet collide with walls, torso/head can layer over)
    this.player.body.setSize(16, 12);
    this.player.body.setOffset(4, 20);
    this.player.setDepth(spawnY + 16);

    // 5. Player collides with all static obstacles
    this.physics.add.collider(this.player, this.obstacles);

    // 6. Camera handling
    if (width > 480 || height > 352) {
      cam.startFollow(this.player, false, 0.1, 0.1);
    } else {
      cam.setScroll(0, 0);
    }

    // 7. Reset interactables list
    this.interactables = [];
    this.activeInteractable = null;

    // 8. Listen to global React bridge events
    const onSetInputDisabled = (disabled) => {
      this.setInputDisabled(disabled);
    };
    this.game.events.on('setInputDisabled', onSetInputDisabled);

    this.events.once('shutdown', () => {
      this.game.events.off('setInputDisabled', onSetInputDisabled);
    });
  }

  /**
   * Helper to create an invisible rectangular static collision box (walls, boundaries).
   */
  addCollisionBox(x, y, width, height) {
    const zone = this.add.zone(x, y, width, height);
    this.physics.add.existing(zone, true);
    this.obstacles.add(zone);
    return zone;
  }

  /**
   * Helper to add an obstacle prop with automatic depth sorting and optional custom physics body.
   */
  addStaticProp(x, y, textureKey, bodyW, bodyH, bodyOffsetX = 0, bodyOffsetY = 0) {
    const prop = this.add.image(x, y, textureKey);
    prop.setDepth(y + 12);
    this.physics.add.existing(prop, true);
    if (bodyW && bodyH) {
      prop.body.setSize(bodyW, bodyH);
      prop.body.setOffset(bodyOffsetX, bodyOffsetY);
    }
    this.obstacles.add(prop);
    return prop;
  }

  registerInteractable(item) {
    this.interactables.push({
      radius: 38,
      ...item,
    });
  }

  setInputDisabled(disabled) {
    this.isInputDisabled = Boolean(disabled);
    if (this.isInputDisabled && this.player && this.player.body) {
      this.player.setVelocity(0, 0);
      this.player.setTexture(`player_${this.playerFacing}_0`);
    }
  }

  update(time, delta) {
    if (!this.player || !this.player.body) return;

    // Y-sorting: Player depth dynamically updated based on foot position
    this.player.setDepth(this.player.y + 16);

    // If input is disabled (Dialogue, Elevator, Modal, etc.), halt immediately
    if (this.isInputDisabled) {
      this.player.setVelocity(0, 0);
      return;
    }

    // Handle Movement Inputs
    let vx = 0;
    let vy = 0;

    const left = this.cursors.left.isDown || this.wasd.left.isDown;
    const right = this.cursors.right.isDown || this.wasd.right.isDown;
    const up = this.cursors.up.isDown || this.wasd.up.isDown;
    const down = this.cursors.down.isDown || this.wasd.down.isDown;

    if (left) vx = -this.playerSpeed;
    else if (right) vx = this.playerSpeed;

    if (up) vy = -this.playerSpeed;
    else if (down) vy = this.playerSpeed;

    // Diagonal speed normalization
    if (vx !== 0 && vy !== 0) {
      vx *= 0.7071;
      vy *= 0.7071;
    }

    this.player.setVelocity(vx, vy);

    // Walk animation cycle
    const isMoving = vx !== 0 || vy !== 0;

    if (isMoving) {
      if (Math.abs(vx) > Math.abs(vy)) {
        this.playerFacing = vx < 0 ? 'left' : 'right';
      } else {
        this.playerFacing = vy < 0 ? 'up' : 'down';
      }

      this.walkFrameTimer += delta;
      if (this.walkFrameTimer > 140) {
        this.walkFrameTimer = 0;
        this.walkFrameIndex = (this.walkFrameIndex + 1) % 4;
      }
      const frameMap = [0, 1, 0, 2];
      const frameNum = frameMap[this.walkFrameIndex];
      this.player.setTexture(`player_${this.playerFacing}_${frameNum}`);
    } else {
      this.walkFrameTimer = 0;
      this.walkFrameIndex = 0;
      this.player.setTexture(`player_${this.playerFacing}_0`);
    }

    // Check Proximity to Interactable Items
    this.checkProximity();

    // Check Interaction Keys (E or Enter)
    if (Phaser.Input.Keyboard.JustDown(this.keyE) || Phaser.Input.Keyboard.JustDown(this.keyEnter)) {
      if (this.activeInteractable && this.activeInteractable.onInteract) {
        this.activeInteractable.onInteract();
      }
    }
  }

  checkProximity() {
    let closest = null;
    let closestDist = Infinity;

    for (const item of this.interactables) {
      const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, item.x, item.y);
      if (dist <= item.radius && dist < closestDist) {
        closestDist = dist;
        closest = item;
      }
    }

    if (closest !== this.activeInteractable) {
      this.activeInteractable = closest;
      this.game.events.emit('proximityChanged', closest ? { id: closest.id, label: closest.label } : null);
    }
  }

  setPlayerPosition(x, y, facing) {
    if (this.player) {
      this.player.setPosition(x, y);
      if (facing) {
        this.playerFacing = facing;
        this.player.setTexture(`player_${facing}_0`);
      }
    }
  }

  getPlayerState() {
    if (!this.player) return null;
    return {
      x: this.player.x,
      y: this.player.y,
      facing: this.playerFacing,
    };
  }
}
