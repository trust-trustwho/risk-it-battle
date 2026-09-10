// textureGenerator.js - Programmatic Original Retro Pixel-Art Texture Generator for Phaser 3
// Creates all character spritesheets, NPC frames, tiles, and props directly on HTML5 Canvas.

export function generateExplorationTextures(scene) {
  const textures = scene.textures;

  // 1. Check if already generated
  if (textures.exists('player_down_0')) {
    return;
  }

  // Helper to create and register a canvas texture
  const registerCanvas = (key, width, height, drawFn) => {
    if (textures.exists(key)) return;
    try {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      drawFn(ctx, width, height);
      textures.addCanvas(key, canvas);
    } catch (err) {
      console.error(`[textureGenerator] Error creating texture "${key}":`, err);
    }
  };

  // =========================================================================
  // PLAYER SPRITES (ANALIS RISIKO - 4 Directions x 3 Frames)
  // Size: 24 x 32 px (Classic GBA scale)
  // Palette: Dark hair (#1e293b), Skin (#fed7aa), Tech Jacket (#1d4ed8),
  //          Shirt (#f8fafc), Tie (#38bdf8), Pants (#334155), Shoes (#0f172a)
  // =========================================================================
  const drawPlayer = (ctx, dir, frame) => {
    // Clear
    ctx.clearRect(0, 0, 24, 32);

    // Leg offsets for walk cycle (0 = idle, 1 = left step, 2 = right step)
    const legOffsetL = frame === 1 ? -2 : frame === 2 ? 2 : 0;
    const legOffsetR = frame === 1 ? 2 : frame === 2 ? -2 : 0;
    const bob = frame === 1 || frame === 2 ? -1 : 0;

    if (dir === 'down') {
      // Hair (Back/Top)
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(7, 3 + bob, 10, 4);
      ctx.fillRect(6, 5 + bob, 12, 4);

      // Face
      ctx.fillStyle = '#fed7aa';
      ctx.fillRect(7, 7 + bob, 10, 6);

      // Eyes
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(8, 9 + bob, 2, 2);
      ctx.fillRect(14, 9 + bob, 2, 2);

      // Torso / Jacket
      ctx.fillStyle = '#1e40af';
      ctx.fillRect(6, 13 + bob, 12, 8);
      // Collared Shirt & Tie
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(10, 13 + bob, 4, 4);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(11, 14 + bob, 2, 5);

      // Arms
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(4, 13 + bob + legOffsetR, 2, 6);
      ctx.fillRect(18, 13 + bob + legOffsetL, 2, 6);
      ctx.fillStyle = '#fed7aa';
      ctx.fillRect(4, 19 + bob + legOffsetR, 2, 2);
      ctx.fillRect(18, 19 + bob + legOffsetL, 2, 2);

      // Belt / Waist
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(7, 21 + bob, 10, 2);

      // Legs / Pants
      ctx.fillStyle = '#334155';
      ctx.fillRect(7, 23 + bob, 4, 6 + legOffsetL);
      ctx.fillRect(13, 23 + bob, 4, 6 + legOffsetR);

      // Shoes
      ctx.fillStyle = '#090d16';
      ctx.fillRect(6, 29 + bob + (frame === 1 ? -1 : 0), 5, 3);
      ctx.fillRect(13, 29 + bob + (frame === 2 ? -1 : 0), 5, 3);
    } else if (dir === 'up') {
      // Hair (Full back)
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(6, 3 + bob, 12, 9);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(7, 5 + bob, 10, 4);

      // Neck
      ctx.fillStyle = '#fed7aa';
      ctx.fillRect(9, 11 + bob, 6, 2);

      // Torso / Jacket Back
      ctx.fillStyle = '#1e40af';
      ctx.fillRect(6, 13 + bob, 12, 8);
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(11, 13 + bob, 2, 8); // Back seam

      // Arms
      ctx.fillRect(4, 13 + bob + legOffsetL, 2, 7);
      ctx.fillRect(18, 13 + bob + legOffsetR, 2, 7);

      // Pants
      ctx.fillStyle = '#334155';
      ctx.fillRect(7, 22 + bob, 4, 7 + legOffsetL);
      ctx.fillRect(13, 22 + bob, 4, 7 + legOffsetR);

      // Shoes
      ctx.fillStyle = '#090d16';
      ctx.fillRect(7, 29 + bob + (frame === 1 ? -1 : 0), 4, 3);
      ctx.fillRect(13, 29 + bob + (frame === 2 ? -1 : 0), 4, 3);
    } else if (dir === 'left') {
      // Hair
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(7, 3 + bob, 9, 5);
      ctx.fillRect(9, 8 + bob, 7, 3);

      // Face (Profile)
      ctx.fillStyle = '#fed7aa';
      ctx.fillRect(5, 7 + bob, 6, 6);

      // Eye
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(6, 9 + bob, 2, 2);

      // Torso
      ctx.fillStyle = '#1e40af';
      ctx.fillRect(7, 13 + bob, 9, 8);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(7, 14 + bob, 2, 4);

      // Arm
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(9, 14 + bob + legOffsetR, 4, 6);
      ctx.fillStyle = '#fed7aa';
      ctx.fillRect(9, 20 + bob + legOffsetR, 3, 2);

      // Pants
      ctx.fillStyle = '#334155';
      ctx.fillRect(8 + legOffsetL, 22 + bob, 6, 7);

      // Shoes
      ctx.fillStyle = '#090d16';
      ctx.fillRect(6 + legOffsetL, 29 + bob, 7, 3);
    } else if (dir === 'right') {
      // Hair
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(8, 3 + bob, 9, 5);
      ctx.fillRect(8, 8 + bob, 7, 3);

      // Face (Profile)
      ctx.fillStyle = '#fed7aa';
      ctx.fillRect(13, 7 + bob, 6, 6);

      // Eye
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(16, 9 + bob, 2, 2);

      // Torso
      ctx.fillStyle = '#1e40af';
      ctx.fillRect(8, 13 + bob, 9, 8);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(15, 14 + bob, 2, 4);

      // Arm
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(11, 14 + bob + legOffsetL, 4, 6);
      ctx.fillStyle = '#fed7aa';
      ctx.fillRect(12, 20 + bob + legOffsetL, 3, 2);

      // Pants
      ctx.fillStyle = '#334155';
      ctx.fillRect(10 + legOffsetR, 22 + bob, 6, 7);

      // Shoes
      ctx.fillStyle = '#090d16';
      ctx.fillRect(11 + legOffsetR, 29 + bob, 7, 3);
    }
  };

  ['down', 'up', 'left', 'right'].forEach((dir) => {
    for (let f = 0; f < 3; f++) {
      registerCanvas(`player_${dir}_${f}`, 24, 32, (ctx) => drawPlayer(ctx, dir, f));
    }
  });

  // =========================================================================
  // NPC SPRITES (24 x 32 px)
  // =========================================================================
  // NPC 1: Petugas Informasi (Receptionist in green/emerald uniform)
  registerCanvas('npc_receptionist', 24, 32, (ctx) => {
    // Hair (Neat bun)
    ctx.fillStyle = '#451a03';
    ctx.fillRect(7, 2, 10, 5);
    ctx.fillRect(9, 0, 6, 3); // Top bun
    // Face
    ctx.fillStyle = '#fde68a';
    ctx.fillRect(7, 7, 10, 6);
    // Eyes & smile
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(8, 9, 2, 2);
    ctx.fillRect(14, 9, 2, 2);
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(11, 11, 2, 1);
    // Uniform Blazer (Emerald corporate)
    ctx.fillStyle = '#065f46';
    ctx.fillRect(6, 13, 12, 8);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(10, 13, 4, 4);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(11, 14, 2, 3); // Gold scarf/badge
    // Arms
    ctx.fillStyle = '#047857';
    ctx.fillRect(4, 14, 2, 6);
    ctx.fillRect(18, 14, 2, 6);
    ctx.fillStyle = '#fde68a';
    ctx.fillRect(4, 20, 2, 2);
    ctx.fillRect(18, 20, 2, 2);
    // Skirt & legs
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(7, 21, 10, 5);
    ctx.fillStyle = '#fde68a';
    ctx.fillRect(8, 26, 3, 3);
    ctx.fillRect(13, 26, 3, 3);
    // Shoes
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(7, 29, 4, 3);
    ctx.fillRect(13, 29, 4, 3);
  });

  // NPC 2: Analis Senior (Glasses, charcoal suit, senior analyst)
  registerCanvas('npc_analyst', 24, 32, (ctx) => {
    // Grey/Silver Hair
    ctx.fillStyle = '#64748b';
    ctx.fillRect(6, 3, 12, 5);
    // Face
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(7, 7, 10, 6);
    // Glasses
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(7, 8, 4, 3);
    ctx.fillRect(13, 8, 4, 3);
    ctx.fillRect(11, 9, 2, 1);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(8, 9, 2, 1);
    ctx.fillRect(14, 9, 2, 1);
    // Suit
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(6, 13, 12, 9);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(10, 13, 4, 5);
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(11, 15, 2, 5); // Red tie
    // Arms
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(4, 14, 2, 6);
    ctx.fillRect(18, 14, 2, 6);
    // Pants & shoes
    ctx.fillStyle = '#334155';
    ctx.fillRect(7, 22, 4, 7);
    ctx.fillRect(13, 22, 4, 7);
    ctx.fillStyle = '#090d16';
    ctx.fillRect(6, 29, 5, 3);
    ctx.fillRect(13, 29, 5, 3);
  });

  // NPC 3: Staf Tata Kelola (Floor 1 NPC A - holding clipboard/binder)
  registerCanvas('npc_governance', 24, 32, (ctx) => {
    // Hair
    ctx.fillStyle = '#78350f';
    ctx.fillRect(6, 3, 12, 5);
    // Face
    ctx.fillStyle = '#fde68a';
    ctx.fillRect(7, 7, 10, 6);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(8, 9, 2, 2);
    ctx.fillRect(14, 9, 2, 2);
    // Outfit (Teal shirt + lanyard)
    ctx.fillStyle = '#0f766e';
    ctx.fillRect(6, 13, 12, 8);
    // Lanyard
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(9, 13, 1, 6);
    ctx.fillRect(14, 13, 1, 6);
    ctx.fillStyle = '#facc15';
    ctx.fillRect(11, 18, 2, 3); // Badge
    // Clipboard in left hand
    ctx.fillStyle = '#b45309';
    ctx.fillRect(4, 16, 5, 7);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(5, 17, 3, 5);
    // Right arm
    ctx.fillStyle = '#115e59';
    ctx.fillRect(18, 14, 2, 6);
    // Pants & shoes
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(7, 22, 4, 7);
    ctx.fillRect(13, 22, 4, 7);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(6, 29, 5, 3);
    ctx.fillRect(13, 29, 5, 3);
  });

  // NPC 4: Staf Layanan TI (Floor 1 NPC B - IT Support with headset)
  registerCanvas('npc_service', 24, 32, (ctx) => {
    // Hair
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(6, 3, 12, 5);
    // Headset
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(5, 4, 14, 2); // Headband
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(4, 6, 2, 4); // Left earcup
    ctx.fillRect(18, 6, 2, 4); // Right earcup
    ctx.fillRect(5, 9, 4, 1); // Mic boom
    // Face
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(7, 7, 10, 6);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(8, 9, 2, 2);
    ctx.fillRect(14, 9, 2, 2);
    // Outfit (Violet tech polo)
    ctx.fillStyle = '#6d28d9';
    ctx.fillRect(6, 13, 12, 8);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(10, 13, 4, 3);
    // Arms
    ctx.fillStyle = '#5b21b6';
    ctx.fillRect(4, 14, 2, 6);
    ctx.fillRect(18, 14, 2, 6);
    // Pants & shoes
    ctx.fillStyle = '#334155';
    ctx.fillRect(7, 22, 4, 7);
    ctx.fillRect(13, 22, 4, 7);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(6, 29, 5, 3);
    ctx.fillRect(13, 29, 5, 3);
  });

  // =========================================================================
  // TILES (32 x 32 px)
  // =========================================================================
  // Floor: Lobby Main (Polished deep slate-navy marble tile)
  registerCanvas('tile_floor_lobby', 32, 32, (ctx) => {
    // Base deep slate-navy
    ctx.fillStyle = '#141c2c';
    ctx.fillRect(0, 0, 32, 32);
    // Inner tile body with subtle bevel
    ctx.fillStyle = '#182337';
    ctx.fillRect(1, 1, 30, 30);
    // Subtle marble streak & diagonal grain
    ctx.fillStyle = '#22314a';
    ctx.fillRect(4, 7, 10, 1);
    ctx.fillRect(14, 8, 4, 1);
    ctx.fillRect(12, 18, 14, 1);
    ctx.fillRect(8, 25, 8, 1);
    // Soft specular highlight fleck
    ctx.fillStyle = '#2d3e5c';
    ctx.fillRect(6, 6, 2, 2);
    ctx.fillRect(20, 20, 2, 2);
    // Outer grout shadow and seam
    ctx.fillStyle = '#0c121d';
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(31, 0, 1, 32);
  });

  // Floor: Lobby Alternate Tile (Breaks tiling repetition with subtle diagonal micro-inlay)
  registerCanvas('tile_floor_lobby_alt', 32, 32, (ctx) => {
    ctx.fillStyle = '#141c2c';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#182337';
    ctx.fillRect(1, 1, 30, 30);
    // Alternate marble grain direction
    ctx.fillStyle = '#22314a';
    ctx.fillRect(8, 5, 14, 1);
    ctx.fillRect(4, 16, 12, 1);
    ctx.fillRect(16, 24, 10, 1);
    // Subtle corner inlay pips
    ctx.fillStyle = '#253450';
    ctx.fillRect(3, 3, 2, 2);
    ctx.fillRect(27, 27, 2, 2);
    // Specular highlight
    ctx.fillStyle = '#2d3e5c';
    ctx.fillRect(14, 14, 2, 2);
    // Grout shadow
    ctx.fillStyle = '#0c121d';
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(31, 0, 1, 32);
  });

  // Floor: Lobby Central Executive Runner (Prestigious entrance promenade)
  registerCanvas('tile_floor_lobby_runner', 32, 32, (ctx) => {
    // Dark base
    ctx.fillStyle = '#101724';
    ctx.fillRect(0, 0, 32, 32);
    // Rich deep sapphire/navy carpet body
    ctx.fillStyle = '#131e33';
    ctx.fillRect(2, 0, 28, 32);
    // Micro weave texture
    ctx.fillStyle = '#192640';
    for (let py = 2; py < 32; py += 4) {
      ctx.fillRect(6, py, 20, 2);
    }
    // Outer steel edge trim
    ctx.fillStyle = '#253552';
    ctx.fillRect(2, 0, 2, 32);
    ctx.fillRect(28, 0, 2, 32);
    // Inlaid Gold & Cyan pinstripes
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(5, 0, 1, 32);
    ctx.fillRect(26, 0, 1, 32);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(6, 0, 1, 32);
    ctx.fillRect(25, 0, 1, 32);
  });

  // Floor: Promenade Guide Tile with Illuminated Center Chevron
  registerCanvas('tile_floor_lane_guide', 32, 32, (ctx) => {
    // Base runner body
    ctx.fillStyle = '#101724';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#131e33';
    ctx.fillRect(2, 0, 28, 32);
    // Edge pinstripes
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(5, 0, 1, 32);
    ctx.fillRect(26, 0, 1, 32);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(6, 0, 1, 32);
    ctx.fillRect(25, 0, 1, 32);
    // Subtle upward directional chevron arrow in center
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(11, 18, 10, 2);
    ctx.fillRect(12, 16, 8, 2);
    ctx.fillRect(13, 14, 6, 2);
    ctx.fillRect(14, 12, 4, 2);
    ctx.fillRect(15, 10, 2, 2);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(15, 10, 2, 2);
    ctx.fillRect(14, 12, 4, 1);
  });

  // Floor: Executive Lounge Rug Tile (Warm, plush geometric weave)
  registerCanvas('tile_floor_lounge_carpet', 32, 32, (ctx) => {
    // Base carpet tone
    ctx.fillStyle = '#161f30';
    ctx.fillRect(0, 0, 32, 32);
    // Checkered plush weave
    ctx.fillStyle = '#1c283f';
    ctx.fillRect(2, 2, 13, 13);
    ctx.fillRect(17, 17, 13, 13);
    ctx.fillStyle = '#131a28';
    ctx.fillRect(17, 2, 13, 13);
    ctx.fillRect(2, 17, 13, 13);
    // Subtle cross-weave stitches
    ctx.fillStyle = '#253450';
    ctx.fillRect(5, 5, 7, 7);
    ctx.fillRect(20, 20, 7, 7);
    // Edge seam
    ctx.fillStyle = '#0e1420';
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(31, 0, 1, 32);
  });

  // Floor: Executive Lounge Rug Border Tile
  registerCanvas('tile_floor_lounge_border', 32, 32, (ctx) => {
    ctx.fillStyle = '#161f30';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#1c283f';
    ctx.fillRect(2, 2, 28, 28);
    // Dark mahogany/slate border inlay
    ctx.fillStyle = '#291102';
    ctx.fillRect(2, 2, 28, 2);
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(4, 4, 24, 1);
    // Inner weave
    ctx.fillStyle = '#19243a';
    ctx.fillRect(4, 5, 24, 23);
  });

  // Floor: Technical Plating Tile (RiskDex station & Operations Board zone)
  registerCanvas('tile_floor_tech_zone', 32, 32, (ctx) => {
    // Dark alloy base
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, 32, 32);
    // Brushed technical tile
    ctx.fillStyle = '#172235';
    ctx.fillRect(1, 1, 30, 30);
    // Tech etched grid lines
    ctx.fillStyle = '#1f2e46';
    ctx.fillRect(4, 15, 24, 2);
    ctx.fillRect(15, 4, 2, 24);
    // Corner mounting hex brackets
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(3, 3, 3, 3);
    ctx.fillRect(26, 3, 3, 3);
    ctx.fillRect(3, 26, 3, 3);
    ctx.fillRect(26, 26, 3, 3);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(4, 4, 1, 1);
    ctx.fillRect(27, 4, 1, 1);
  });

  // Floor: Floor 1 (Clean cool-grey corporate tile)
  registerCanvas('tile_floor_floor1', 32, 32, (ctx) => {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#263447';
    ctx.fillRect(1, 1, 30, 30);
    // Subtle cross-weave office texture
    ctx.fillStyle = '#2d3e54';
    ctx.fillRect(6, 6, 8, 8);
    ctx.fillRect(18, 18, 8, 8);
    ctx.fillStyle = '#16202e';
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(31, 0, 1, 32);
  });

  // Floor: Floor 1 Alternate Tile (Staggered checkerboard variation)
  registerCanvas('tile_floor_floor1_alt', 32, 32, (ctx) => {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#263447';
    ctx.fillRect(1, 1, 30, 30);
    // Alternate texture quadrant to break repetition
    ctx.fillStyle = '#2d3e54';
    ctx.fillRect(18, 6, 8, 8);
    ctx.fillRect(6, 18, 8, 8);
    // Subtle specular micro-pip
    ctx.fillStyle = '#384d69';
    ctx.fillRect(14, 14, 2, 2);
    ctx.fillStyle = '#16202e';
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(31, 0, 1, 32);
  });

  // Helper: Floor 1 Minimalist Transit Runner (Clean corridor carpet - 32 x 32 px)
  const drawFloor1Runner = (ctx) => {
    // 1. Surrounding floor margins (y: 0..3 and y: 28..31) blending with Floor 1 tiles (#1e293b / #263447)
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#263447';
    ctx.fillRect(1, 1, 30, 3);
    ctx.fillRect(1, 28, 30, 3);
    // Subtle floor tile grid seams
    ctx.fillStyle = '#16202e';
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(31, 0, 1, 32);

    // 2. Outer recessed shadow seams (y=3 and y=28)
    ctx.fillStyle = '#101725';
    ctx.fillRect(0, 3, 32, 1);
    ctx.fillRect(0, 28, 32, 1);

    // 3. Architectural steel hem (y=4 and y=27)
    ctx.fillStyle = '#1e2e42';
    ctx.fillRect(0, 4, 32, 1);
    ctx.fillRect(0, 27, 32, 1);

    // 4. Grounding deeper cyan trim (y=5 and y=26)
    ctx.fillStyle = '#0369a1';
    ctx.fillRect(0, 5, 32, 1);
    ctx.fillRect(0, 26, 32, 1);

    // 5. Thin luminous cyan edge lines (y=6 and y=25)
    ctx.fillStyle = '#06b6d4';
    ctx.fillRect(0, 6, 32, 1);
    ctx.fillRect(0, 25, 32, 1);

    // 6. Deep velvet navy / slate carpet bed (y: 7..24, 18px height)
    ctx.fillStyle = '#131e30';
    ctx.fillRect(0, 7, 32, 18);

    // 7. Subtle panel modular seams (vertical separator at tile edges)
    ctx.fillStyle = '#0e1724';
    ctx.fillRect(0, 7, 1, 18);
    ctx.fillRect(31, 7, 1, 18);

    // 8. Subtle center highlight / lane effect (y: 13..18, 6px height)
    ctx.fillStyle = '#18263a';
    ctx.fillRect(0, 13, 32, 6);
    ctx.fillStyle = '#1e3049';
    ctx.fillRect(0, 15, 32, 2);

    // 9. Soft segmented light strips / tiny embedded dashes (along center guideline)
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(5, 15, 6, 2);
    ctx.fillRect(21, 15, 6, 2);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(6, 15, 4, 1);
    ctx.fillRect(22, 15, 4, 1);

    // 10. Minimalist fabric micro-weave (understated vertical ribbing across runner)
    ctx.fillStyle = '#162334';
    for (let px = 3; px < 32; px += 4) {
      ctx.fillRect(px, 8, 1, 6);
      ctx.fillRect(px, 18, 1, 6);
    }
  };

  // Floor 1 Transit Runner (Clean Minimalist Carpet / Runner - 32 x 32 px)
  registerCanvas('tile_floor_floor1_runner', 32, 32, drawFloor1Runner);

  // Floor 1 Transit Runner Start (West End at Col 3, facing Elevator - 32 x 32 px)
  registerCanvas('tile_floor_floor1_runner_start', 32, 32, (ctx) => {
    drawFloor1Runner(ctx);
    // West finished vertical end-cap framing the entrance from elevator
    ctx.fillStyle = '#101725';
    ctx.fillRect(0, 3, 3, 26);
    ctx.fillStyle = '#1e2e42';
    ctx.fillRect(3, 4, 1, 24);
    ctx.fillStyle = '#0369a1';
    ctx.fillRect(4, 5, 1, 22);
    ctx.fillStyle = '#06b6d4';
    ctx.fillRect(5, 6, 1, 20);
    // Subtle corner light pips
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(5, 6, 2, 2);
    ctx.fillRect(5, 24, 2, 2);
  });

  // Floor 1 Transit Runner End (East End at Col 11, facing Ruang Evaluasi - 32 x 32 px)
  registerCanvas('tile_floor_floor1_runner_end', 32, 32, (ctx) => {
    drawFloor1Runner(ctx);
    // East finished vertical end-cap framing the entrance into Ruang Evaluasi
    ctx.fillStyle = '#101725';
    ctx.fillRect(29, 3, 3, 26);
    ctx.fillStyle = '#1e2e42';
    ctx.fillRect(28, 4, 1, 24);
    ctx.fillStyle = '#0369a1';
    ctx.fillRect(27, 5, 1, 22);
    ctx.fillStyle = '#06b6d4';
    ctx.fillRect(26, 6, 1, 20);
    // Subtle corner light pips
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(25, 6, 2, 2);
    ctx.fillRect(25, 24, 2, 2);
  });

  // Legacy / fallback registrations (Clean runner duplicates - all symbols/arrows/numbers removed)
  registerCanvas('tile_floor_floor1_guide', 32, 32, drawFloor1Runner);
  registerCanvas('tile_floor_floor1_stencil', 32, 32, drawFloor1Runner);

  // Floor: Floor 1 Discussion & Analysis Zone Carpet (Teal-slate acoustic inlay)
  registerCanvas('tile_floor_discussion', 32, 32, (ctx) => {
    ctx.fillStyle = '#131e2c';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#182739';
    ctx.fillRect(1, 1, 30, 30);
    // Acoustic square grid weave
    ctx.fillStyle = '#1c3148';
    ctx.fillRect(3, 3, 11, 11);
    ctx.fillRect(17, 17, 11, 11);
    ctx.fillStyle = '#142232';
    ctx.fillRect(17, 3, 11, 11);
    ctx.fillRect(3, 17, 11, 11);
    // Subtle border seam
    ctx.fillStyle = '#0d1622';
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(31, 0, 1, 32);
  });

  // Wall: Top Trim with Architectural Cornice & Ambient Glow Strip
  registerCanvas('tile_wall_top', 32, 32, (ctx) => {
    // Dark ceiling recess
    ctx.fillStyle = '#080c16';
    ctx.fillRect(0, 0, 32, 12);
    // Architectural crown molding
    ctx.fillStyle = '#131b2c';
    ctx.fillRect(0, 12, 32, 8);
    ctx.fillStyle = '#1a253b';
    ctx.fillRect(0, 20, 32, 6);
    // Recessed LED cove-light / blue corporate architectural accent
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(0, 26, 32, 3);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(0, 29, 32, 2);
    // Underside shadow
    ctx.fillStyle = '#0a0e1a';
    ctx.fillRect(0, 31, 32, 1);
  });

  // Wall: Face with Architectural Panelling & Baseboard
  registerCanvas('tile_wall_face', 32, 32, (ctx) => {
    // Wall surface
    ctx.fillStyle = '#121a2a';
    ctx.fillRect(0, 0, 32, 32);
    // Acoustic / wainscoting panel body
    ctx.fillStyle = '#172236';
    ctx.fillRect(2, 2, 28, 20);
    // Panel bevel highlight
    ctx.fillStyle = '#202e48';
    ctx.fillRect(3, 3, 26, 1);
    ctx.fillRect(3, 3, 1, 18);
    ctx.fillStyle = '#0d1320';
    ctx.fillRect(3, 21, 26, 1);
    ctx.fillRect(28, 3, 1, 19);
    // Baseboard assembly at bottom
    ctx.fillStyle = '#0a0e18';
    ctx.fillRect(0, 23, 32, 9);
    // Brushed metal trim kickplate
    ctx.fillStyle = '#334155';
    ctx.fillRect(0, 23, 32, 2);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 25, 32, 7);
  });

  // Wall: Structural Pilaster / Architectural Column (32 x 32 px)
  registerCanvas('tile_wall_column', 32, 32, (ctx) => {
    // Wall background
    ctx.fillStyle = '#121a2a';
    ctx.fillRect(0, 0, 32, 32);
    // Pilaster body (Columns give structural cadence to the wall)
    ctx.fillStyle = '#1e293c';
    ctx.fillRect(6, 0, 20, 23);
    // Column 3D highlight (left) and shadow (right)
    ctx.fillStyle = '#2c3b54';
    ctx.fillRect(6, 0, 2, 23);
    ctx.fillStyle = '#101724';
    ctx.fillRect(24, 0, 2, 23);
    // Column capital / top trim
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(4, 0, 24, 2);
    ctx.fillStyle = '#334155';
    ctx.fillRect(5, 2, 22, 2);
    // Embedded vertical cyan LED line
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(15, 4, 2, 18);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(15, 8, 2, 10);
    // Base plinth
    ctx.fillStyle = '#0a0e18';
    ctx.fillRect(4, 23, 24, 9);
    ctx.fillStyle = '#475569';
    ctx.fillRect(4, 23, 24, 2);
  });

  // =========================================================================
  // PROPS & FURNITURE
  // =========================================================================

  // Grand Reception Focal Backdrop & Central Telemetry Marquee (144 x 42 px)
  registerCanvas('prop_reception_backdrop', 144, 42, (ctx) => {
    // Dark architectural recess
    ctx.fillStyle = '#080c14';
    ctx.fillRect(0, 0, 144, 42);

    // Brushed titanium mounting frame with cyan glowing trim
    ctx.fillStyle = '#162235';
    ctx.fillRect(2, 2, 140, 38);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(4, 4, 136, 34);

    // Glowing Cyan Perimeter Trim
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(4, 4, 136, 1);
    ctx.fillRect(4, 37, 136, 1);
    ctx.fillRect(4, 4, 1, 34);
    ctx.fillRect(139, 4, 1, 34);

    // Corner brass hex-bolts
    ctx.fillStyle = '#facc15';
    ctx.fillRect(5, 5, 2, 2);
    ctx.fillRect(137, 5, 2, 2);
    ctx.fillRect(5, 35, 2, 2);
    ctx.fillRect(137, 35, 2, 2);

    // Top Header: "RISK IT TOWER" Corporate Logo & Typography Marquee
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(12, 7, 120, 10);
    ctx.fillStyle = '#0369a1';
    ctx.fillRect(13, 8, 118, 8);

    // Stylized Central Tower/Shield Crest
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(16, 9, 6, 6);
    ctx.fillStyle = '#facc15';
    ctx.fillRect(18, 10, 2, 4);

    // Text Marquee "RISK IT TOWER // HEADQUARTERS"
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(26, 10, 92, 4);
    ctx.fillStyle = '#facc15';
    ctx.fillRect(120, 10, 8, 4);

    // Main Central Screen: Mission Telemetry Display (96 x 14 px)
    ctx.fillStyle = '#070b12';
    ctx.fillRect(24, 20, 96, 14);
    ctx.fillStyle = '#0b1626';
    ctx.fillRect(25, 21, 94, 12);

    // Telemetry Security Level "DEFCON / SEC-LEVEL: ALPHA"
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(28, 23, 4, 4); // Green status LED
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(35, 24, 40, 2); // Status text rep
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(78, 24, 36, 2); // Telemetry graph

    // Waveform scanline monitor bar
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(28, 29, 88, 2);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(34, 28, 8, 3);
    ctx.fillRect(58, 28, 12, 3);
    ctx.fillRect(86, 28, 6, 3);

    // Flanking Downward Luminescent Lighting Strips
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(8, 8, 2, 26);
    ctx.fillRect(134, 8, 2, 26);
    ctx.fillStyle = '#7dd3fc';
    ctx.fillRect(9, 12, 1, 18);
    ctx.fillRect(134, 12, 1, 18);
  });

  // Corporate Crest Banner / Plaque (48 x 26 px)
  registerCanvas('prop_lobby_banner', 48, 26, (ctx) => {
    // Brushed titanium mounting plate
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, 48, 26);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(1, 1, 46, 24);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(3, 3, 42, 20);

    // Corner brass mounting bolts
    ctx.fillStyle = '#facc15';
    ctx.fillRect(2, 2, 2, 2);
    ctx.fillRect(44, 2, 2, 2);
    ctx.fillRect(2, 22, 2, 2);
    ctx.fillRect(44, 22, 2, 2);

    // Stylized Shield / Tower Crest
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(20, 5, 8, 8);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(22, 7, 4, 4);
    ctx.fillStyle = '#facc15';
    ctx.fillRect(23, 9, 2, 2); // Crest center gold gem

    // Corporate Name Bars "RISK IT TOWER"
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(10, 15, 28, 3);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(14, 19, 20, 2); // "HEADQUARTERS"
  });

  // Reception Focal Spotlight Disc (Soft warm-cyan illumination pool)
  registerCanvas('prop_reception_spotlight', 112, 36, (ctx) => {
    const gradient = ctx.createRadialGradient(56, 18, 2, 56, 18, 54);
    gradient.addColorStop(0, 'rgba(56, 189, 248, 0.55)');
    gradient.addColorStop(0.35, 'rgba(2, 132, 199, 0.28)');
    gradient.addColorStop(0.75, 'rgba(2, 132, 199, 0.08)');
    gradient.addColorStop(1, 'rgba(2, 132, 199, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(56, 18, 54, 17, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  // Wall Mounted Telemetry Monitor (24 x 18 px)
  registerCanvas('prop_wall_monitor', 24, 18, (ctx) => {
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, 24, 18);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(1, 1, 22, 16);
    ctx.fillStyle = '#0369a1';
    ctx.fillRect(2, 2, 20, 14);
    // Graph readouts
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(4, 4, 3, 8);
    ctx.fillRect(8, 7, 3, 5);
    ctx.fillRect(12, 5, 3, 7);
    ctx.fillRect(16, 9, 3, 3);
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(4, 13, 16, 1);
  });

  // Architectural HVAC Wall Vent (24 x 10 px)
  registerCanvas('prop_wall_vent', 24, 10, (ctx) => {
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, 24, 10);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(1, 1, 22, 8);
    // Louvers
    ctx.fillStyle = '#0a0e1a';
    ctx.fillRect(3, 2, 18, 1);
    ctx.fillRect(3, 4, 18, 1);
    ctx.fillRect(3, 6, 18, 1);
  });

  // Framed Risk Charter / Certificate (24 x 20 px)
  registerCanvas('prop_wall_certificate', 24, 20, (ctx) => {
    // Mahogany frame
    ctx.fillStyle = '#451a03';
    ctx.fillRect(0, 0, 24, 20);
    // Inner parchment mat
    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(2, 2, 20, 16);
    // Charter text lines
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(4, 5, 16, 1);
    ctx.fillRect(4, 8, 14, 1);
    ctx.fillRect(4, 11, 16, 1);
    // Gold seal / ribbon
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(14, 13, 4, 4);
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(15, 15, 2, 2);
  });

  // Executive Wall Clock (16 x 16 px)
  registerCanvas('prop_wall_clock', 16, 16, (ctx) => {
    // Dark outer rim
    ctx.fillStyle = '#090d16';
    ctx.fillRect(2, 0, 12, 16);
    ctx.fillRect(0, 2, 16, 12);
    // Bezel
    ctx.fillStyle = '#334155';
    ctx.fillRect(3, 1, 10, 14);
    ctx.fillRect(1, 3, 14, 10);
    // Clock face
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(4, 2, 8, 12);
    ctx.fillRect(2, 4, 12, 8);
    // Hands (10:10)
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(7, 7, 2, 2); // Center pin
    ctx.fillRect(5, 5, 3, 2); // Hour hand
    ctx.fillRect(8, 4, 2, 4); // Minute hand
    // Red second hand accent
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(8, 8, 3, 1);
  });

  // Elevator Focused Progression Glow (Amber & Cyan beam)
  registerCanvas('prop_elevator_glow', 48, 24, (ctx) => {
    const gradient = ctx.createRadialGradient(24, 12, 1, 24, 12, 23);
    gradient.addColorStop(0, 'rgba(245, 158, 11, 0.45)');
    gradient.addColorStop(0.4, 'rgba(2, 132, 199, 0.3)');
    gradient.addColorStop(0.8, 'rgba(2, 132, 199, 0.08)');
    gradient.addColorStop(1, 'rgba(2, 132, 199, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(24, 12, 23, 11, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  // Soft Warm Amber Lounge Glow (Cozy waiting area ambience)
  registerCanvas('prop_lounge_glow', 64, 36, (ctx) => {
    const gradient = ctx.createRadialGradient(32, 18, 2, 32, 18, 30);
    gradient.addColorStop(0, 'rgba(217, 119, 6, 0.35)');
    gradient.addColorStop(0.5, 'rgba(180, 83, 9, 0.15)');
    gradient.addColorStop(1, 'rgba(180, 83, 9, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(32, 18, 30, 16, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  // Smart Corporate Beverage Vending Machine (24 x 38 px)
  registerCanvas('prop_vending_machine', 24, 38, (ctx) => {
    // Shadow / base
    ctx.fillStyle = '#080d14';
    ctx.fillRect(0, 0, 24, 38);

    // Matte dark slate housing
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(1, 1, 22, 36);
    ctx.fillStyle = '#334155';
    ctx.fillRect(2, 2, 20, 34);

    // Illuminated Beverage Display Compartment
    ctx.fillStyle = '#090d16';
    ctx.fillRect(3, 4, 18, 16);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(4, 5, 16, 14);

    // Shelf 1 Cans (Cyan & Emerald)
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(5, 6, 3, 5);
    ctx.fillRect(9, 6, 3, 5);
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(13, 6, 3, 5);
    ctx.fillRect(17, 6, 3, 5);

    // Shelf divider
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(4, 11, 16, 1);

    // Shelf 2 Cans (Amber & Crimson)
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(5, 12, 3, 5);
    ctx.fillRect(9, 12, 3, 5);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(13, 12, 3, 5);
    ctx.fillRect(17, 12, 3, 5);

    // Payment / Card Slot & Keypad
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(3, 22, 18, 6);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(5, 23, 6, 2); // Digital price readout
    ctx.fillStyle = '#facc15';
    ctx.fillRect(13, 23, 2, 4); // Coin/card slot
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(17, 23, 2, 2); // Vend ready LED

    // Dispenser Door at Bottom
    ctx.fillStyle = '#090d16';
    ctx.fillRect(4, 30, 16, 5);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(5, 31, 14, 3);
  });

  // Upgraded Executive High-Speed Elevator (64 x 48 px)
  registerCanvas('prop_elevator', 64, 48, (ctx) => {
    // Exterior brushed steel architrave
    ctx.fillStyle = '#0d131f';
    ctx.fillRect(0, 0, 64, 48);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(2, 2, 60, 44);
    ctx.fillStyle = '#334155';
    ctx.fillRect(4, 4, 56, 40);

    // Overhead Digital Display Housing
    ctx.fillStyle = '#080c14';
    ctx.fillRect(16, 4, 32, 9);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(18, 5, 28, 7);

    // Floor Display ("GF" + Up Indicator)
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(21, 7, 4, 3); // Green upward direction arrow
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(29, 6, 6, 5); // "G" numeral
    ctx.fillRect(38, 6, 5, 5); // "F" numeral

    // Dual Sliding Steel Doors
    ctx.fillStyle = '#3b495e';
    ctx.fillRect(6, 14, 25, 33); // Left door
    ctx.fillRect(33, 14, 25, 33); // Right door

    // Door Panel Bevels & Vertical Brushed Texture
    ctx.fillStyle = '#4f617a';
    ctx.fillRect(8, 16, 21, 29);
    ctx.fillRect(35, 16, 21, 29);
    ctx.fillStyle = '#64748b';
    ctx.fillRect(10, 18, 8, 25);
    ctx.fillRect(37, 18, 8, 25);

    // Center door seam and shadow
    ctx.fillStyle = '#090d16';
    ctx.fillRect(31, 14, 2, 33);

    // Illuminated Call Button Panel (Right Frame)
    ctx.fillStyle = '#0b111c';
    ctx.fillRect(59, 22, 4, 10);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(60, 24, 2, 2); // Lit elevator call button
    ctx.fillStyle = '#64748b';
    ctx.fillRect(60, 28, 2, 2);

    // Bottom Safety Threshold Strip
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(6, 46, 52, 2);
  });

  // Upgraded Executive Reception Counter (80 x 32 px)
  registerCanvas('prop_reception_desk', 80, 32, (ctx) => {
    // Shadow / base
    ctx.fillStyle = '#080d16';
    ctx.fillRect(0, 0, 80, 32);

    // Deep slate & mahogany countertop
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(1, 1, 78, 10);
    ctx.fillStyle = '#334155';
    ctx.fillRect(2, 1, 76, 2); // Counter edge highlight
    ctx.fillStyle = '#291102';
    ctx.fillRect(2, 10, 76, 2); // Mahogany accent trim

    // Main Front Fascia (Dual-tone corporate slate panel)
    ctx.fillStyle = '#1a2538';
    ctx.fillRect(2, 12, 76, 18);
    ctx.fillStyle = '#22324a';
    ctx.fillRect(4, 13, 72, 16);

    // Integrated corporate emblem plate (Center)
    ctx.fillStyle = '#0b111c';
    ctx.fillRect(26, 16, 28, 10);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(27, 17, 26, 8);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(31, 19, 18, 4); // "RISK IT" text rep
    ctx.fillStyle = '#facc15';
    ctx.fillRect(28, 18, 2, 2); // Gold corner pip
    ctx.fillRect(51, 18, 2, 2);

    // Left Desktop: High-Resolution Reception Monitor
    ctx.fillStyle = '#090d16';
    ctx.fillRect(10, 0, 14, 10);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(12, 1, 10, 7); // Glow screen
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(13, 2, 8, 3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(14, 6, 6, 1);
    ctx.fillStyle = '#475569';
    ctx.fillRect(16, 10, 2, 2); // Monitor stand

    // Center Desktop: Executive Blotter Pad
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(34, 4, 18, 6);
    ctx.fillStyle = '#334155';
    ctx.fillRect(35, 5, 16, 4);

    // Right Desktop: Intercom & Gold Officer Nameplate
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(60, 4, 12, 5);
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(61, 5, 10, 3); // Gold badge
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(62, 6, 8, 1);
  });

  // Workstation Desk (48 x 32 px)
  registerCanvas('prop_workstation', 48, 32, (ctx) => {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 48, 32);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(2, 2, 44, 12); // Desk surface
    ctx.fillStyle = '#334155';
    ctx.fillRect(2, 14, 44, 16);

    // PC Monitor
    ctx.fillStyle = '#090d16';
    ctx.fillRect(16, 2, 16, 10);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(18, 3, 12, 7); // Glow screen

    // Keyboard & mouse
    ctx.fillStyle = '#64748b';
    ctx.fillRect(18, 14, 10, 3);
    ctx.fillRect(30, 14, 3, 3);
  });

  // Bookshelf / Document Archive (32 x 40 px)
  registerCanvas('prop_bookshelf', 32, 40, (ctx) => {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 32, 40);
    ctx.fillStyle = '#451a03'; // Rich mahogany wood
    ctx.fillRect(2, 2, 28, 36);

    // Shelf 1 (Top books)
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(4, 6, 4, 8);
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(9, 6, 4, 8);
    ctx.fillStyle = '#16a34a';
    ctx.fillRect(14, 6, 4, 8);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(19, 6, 4, 8);

    // Shelf divider 1
    ctx.fillStyle = '#291102';
    ctx.fillRect(2, 15, 28, 2);

    // Shelf 2 (Binders)
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(4, 18, 5, 8);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(10, 18, 5, 8);
    ctx.fillStyle = '#7c3aed';
    ctx.fillRect(16, 18, 5, 8);

    // Shelf divider 2
    ctx.fillStyle = '#291102';
    ctx.fillRect(2, 27, 28, 2);

    // Shelf 3 (Storage boxes)
    ctx.fillStyle = '#475569';
    ctx.fillRect(4, 30, 10, 6);
    ctx.fillRect(16, 30, 10, 6);
  });

  // Potted Office Plant (24 x 32 px)
  registerCanvas('prop_plant', 24, 32, (ctx) => {
    // Pot
    ctx.fillStyle = '#78350f';
    ctx.fillRect(6, 18, 12, 12);
    ctx.fillStyle = '#92400e';
    ctx.fillRect(5, 18, 14, 3);

    // Leaves / Foliage
    ctx.fillStyle = '#15803d';
    ctx.fillRect(4, 6, 16, 12);
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(6, 3, 12, 8);
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(8, 2, 8, 4);
  });

  // Deluxe Architectural Planter (24 x 36 px)
  registerCanvas('prop_plant_deluxe', 24, 36, (ctx) => {
    // Planter base shadow
    ctx.fillStyle = '#090d16';
    ctx.fillRect(3, 33, 18, 3);

    // Ceramic planter pot (Matte charcoal with brass accent)
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(4, 18, 16, 16);
    ctx.fillStyle = '#334155';
    ctx.fillRect(5, 19, 14, 14);
    // Gold/brass upper collar ring
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(3, 17, 18, 3);
    ctx.fillStyle = '#facc15';
    ctx.fillRect(4, 18, 16, 1);

    // Soil
    ctx.fillStyle = '#291102';
    ctx.fillRect(5, 17, 14, 2);

    // Rich Architectural Foliage (Ficus / Monstera leaves)
    ctx.fillStyle = '#14532d';
    ctx.fillRect(4, 8, 16, 10);
    ctx.fillStyle = '#16a34a';
    ctx.fillRect(5, 4, 14, 10);
    ctx.fillRect(2, 9, 7, 6);
    ctx.fillRect(15, 9, 7, 6);

    ctx.fillStyle = '#22c55e';
    ctx.fillRect(7, 2, 10, 8);
    ctx.fillRect(3, 10, 5, 4);
    ctx.fillRect(16, 10, 5, 4);

    // Top Leaf highlights
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(8, 2, 8, 3);
    ctx.fillRect(4, 11, 2, 2);
    ctx.fillRect(18, 11, 2, 2);
  });

  // Upgraded Executive Lounge Sofa (48 x 24 px)
  registerCanvas('prop_lounge_sofa', 48, 24, (ctx) => {
    // Shadow / base
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, 48, 24);

    // Solid walnut wood block feet
    ctx.fillStyle = '#451a03';
    ctx.fillRect(2, 20, 4, 4);
    ctx.fillRect(42, 20, 4, 4);

    // Deep navy/indigo tailored backrest
    ctx.fillStyle = '#172554';
    ctx.fillRect(2, 2, 44, 9);
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(4, 3, 40, 7);
    // Tufted cushion stitching
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(16, 4, 1, 5);
    ctx.fillRect(31, 4, 1, 5);

    // Padded Seat Cushions
    ctx.fillStyle = '#1d4ed8';
    ctx.fillRect(4, 10, 40, 11);
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(5, 11, 18, 9); // Left cushion
    ctx.fillRect(25, 11, 18, 9); // Right cushion

    // Padded Armrests (Left & Right)
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(0, 5, 5, 16);
    ctx.fillRect(43, 5, 5, 16);
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(1, 6, 3, 14);
    ctx.fillRect(44, 6, 3, 14);
  });

  // Executive Armchair (24 x 24 px)
  registerCanvas('prop_lounge_chair', 24, 24, (ctx) => {
    // Shadow
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, 24, 24);
    // Wood feet
    ctx.fillStyle = '#451a03';
    ctx.fillRect(2, 20, 3, 4);
    ctx.fillRect(19, 20, 3, 4);
    // Backrest
    ctx.fillStyle = '#172554';
    ctx.fillRect(2, 2, 20, 8);
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(4, 3, 16, 6);
    // Seat cushion
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(4, 10, 16, 10);
    // Armrests
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(0, 5, 4, 15);
    ctx.fillRect(20, 5, 4, 15);
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(1, 6, 2, 13);
    ctx.fillRect(21, 6, 2, 13);
  });

  // Executive Coffee Table with Documents (32 x 20 px)
  registerCanvas('prop_lounge_table', 32, 20, (ctx) => {
    // Shadow
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, 32, 20);
    // Walnut frame & legs
    ctx.fillStyle = '#451a03';
    ctx.fillRect(2, 2, 28, 16);
    ctx.fillRect(3, 16, 3, 4);
    ctx.fillRect(26, 16, 3, 4);

    // Smoked Tempered Glass Tabletop
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(4, 4, 24, 12);
    ctx.fillStyle = '#334155';
    ctx.fillRect(5, 5, 22, 10);

    // Glass reflection streak
    ctx.fillStyle = '#64748b';
    ctx.fillRect(7, 6, 12, 1);
    ctx.fillRect(6, 7, 8, 1);

    // IT Risk Management Report Dossier on Table
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(8, 9, 8, 5);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(9, 10, 6, 3); // White paper sheet

    // Ceramic Espresso Cup & Saucer
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(20, 9, 4, 4); // Saucer
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(21, 9, 2, 3); // Cup
    ctx.fillStyle = '#78350f';
    ctx.fillRect(21, 10, 2, 1); // Coffee
  });

  // Document Credenza / Risk Archive Cabinet (32 x 28 px)
  registerCanvas('prop_archive_cabinet', 32, 28, (ctx) => {
    // Shadow
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, 32, 28);
    // Dark mahogany body
    ctx.fillStyle = '#451a03';
    ctx.fillRect(2, 2, 28, 24);
    ctx.fillStyle = '#291102';
    ctx.fillRect(3, 3, 26, 22);

    // Dual Cabinet Doors
    ctx.fillStyle = '#78350f';
    ctx.fillRect(4, 5, 11, 19);
    ctx.fillRect(17, 5, 11, 19);

    // Brass handles
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(13, 13, 1, 4);
    ctx.fillRect(18, 13, 1, 4);

    // Countertop risk archive dossiers
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(5, 1, 8, 3);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(16, 1, 9, 3);
  });

  // Retro Office Water Dispenser (16 x 32 px)
  registerCanvas('prop_water_cooler', 16, 32, (ctx) => {
    // Shadow
    ctx.fillStyle = '#090d16';
    ctx.fillRect(1, 30, 14, 2);

    // Dispenser Stand (Clean office white/slate)
    ctx.fillStyle = '#334155';
    ctx.fillRect(2, 14, 12, 17);
    ctx.fillStyle = '#64748b';
    ctx.fillRect(3, 15, 10, 15);

    // Dispenser alcove & faucets
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(4, 17, 8, 8);
    // Cold spigot (Blue) & Hot spigot (Red)
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(5, 18, 2, 3);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(9, 18, 2, 3);

    // Inverted 5-Gallon Water Jug (Translucent blue water bottle)
    ctx.fillStyle = '#0369a1';
    ctx.fillRect(3, 2, 10, 12);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(4, 3, 8, 10);
    // Water level & reflection
    ctx.fillStyle = '#bae6fd';
    ctx.fillRect(5, 4, 3, 8);
    // Bottle neck
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(6, 13, 4, 2);
  });

  // Soft Elliptical Floor Illumination (32 x 16 px)
  registerCanvas('prop_floor_glow', 32, 16, (ctx) => {
    const gradient = ctx.createRadialGradient(16, 8, 1, 16, 8, 15);
    gradient.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
    gradient.addColorStop(0.5, 'rgba(2, 132, 199, 0.2)');
    gradient.addColorStop(1, 'rgba(2, 132, 199, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(16, 8, 15, 7, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  // Upgraded RiskDex Terminal Kiosk (32 x 40 px)
  registerCanvas('prop_riskdex_kiosk', 32, 40, (ctx) => {
    // Shadow / base
    ctx.fillStyle = '#080d16';
    ctx.fillRect(0, 0, 32, 40);

    // High-tech Weighted Base Pedestal
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(4, 22, 24, 17);
    ctx.fillStyle = '#334155';
    ctx.fillRect(6, 24, 20, 13);
    // Cyan LED base accent ring
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(6, 37, 20, 2);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(8, 37, 16, 1);

    // Angled Keyboard / Console Deck
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(2, 18, 28, 6);
    ctx.fillStyle = '#334155';
    ctx.fillRect(4, 19, 24, 4);
    // Keyboard buttons
    ctx.fillStyle = '#64748b';
    ctx.fillRect(6, 20, 14, 2);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(22, 20, 4, 2); // Holographic trackball / scanner

    // Holographic Terminal Hood
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(3, 2, 26, 17);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(4, 3, 24, 15);

    // Glowing RiskDex Hologram Screen
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(5, 4, 22, 13);
    ctx.fillStyle = '#0369a1';
    ctx.fillRect(6, 5, 20, 11);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(7, 6, 18, 9);

    // RiskDex Database / Open Codex Icon on Screen
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(10, 8, 5, 5); // Left codex page
    ctx.fillRect(17, 8, 5, 5); // Right codex page
    ctx.fillStyle = '#0369a1';
    ctx.fillRect(15, 8, 2, 5); // Center spine
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(11, 10, 3, 1);
    ctx.fillRect(18, 10, 3, 1);

    // Top Pulsing Beacon Light
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(14, 0, 4, 3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(15, 1, 2, 1);
  });

  // Upgraded Mission Command Status Board (56 x 40 px)
  registerCanvas('prop_status_board', 56, 40, (ctx) => {
    // Outer Heavy Frame
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, 56, 40);
    ctx.fillStyle = '#1a2333';
    ctx.fillRect(1, 1, 54, 38);
    ctx.fillStyle = '#0b101a';
    ctx.fillRect(3, 3, 50, 34);

    // 4 Corner Hex-Bolts
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(2, 2, 2, 2);
    ctx.fillRect(52, 2, 2, 2);
    ctx.fillRect(2, 36, 2, 2);
    ctx.fillRect(52, 36, 2, 2);

    // Header Display Strip: "TOWER OPERATIONS"
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(4, 4, 48, 7);
    ctx.fillStyle = '#025f8f';
    ctx.fillRect(5, 5, 46, 5);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(10, 6, 36, 3); // Illuminated Title text rep

    // 5 Floor Status Monitor Rows
    const floorColors = ['#22c55e', '#f59e0b', '#ef4444', '#ef4444', '#ef4444'];
    for (let i = 0; i < 5; i++) {
      const rowY = 13 + i * 5;
      // Row container
      ctx.fillStyle = '#111827';
      ctx.fillRect(5, rowY, 46, 4);
      // Floor identifier pill (e.g. F1, F2...)
      ctx.fillStyle = '#334155';
      ctx.fillRect(6, rowY + 1, 6, 2);
      // Status LED Indicator
      ctx.fillStyle = floorColors[i];
      ctx.fillRect(14, rowY + 1, 4, 2);
      // Telemetry / Activity bar graph
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(20, rowY + 1, 29, 2);
      ctx.fillStyle = floorColors[i];
      ctx.fillRect(20, rowY + 1, i === 0 ? 24 : 8, 2);
    }

    // Bottom diagnostic scanline strip
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(5, 35, 46, 1);
  });

  // Grouped Framework Learning Station (48 x 36 px)
  // Two clean dual monitors with glow
  registerCanvas('prop_framework_station', 48, 36, (ctx) => {
    // Desk
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 48, 36);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(2, 2, 44, 14);
    ctx.fillStyle = '#334155';
    ctx.fillRect(4, 16, 40, 18);

    // Monitor A (Left)
    ctx.fillStyle = '#090d16';
    ctx.fillRect(5, 3, 17, 10);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(7, 4, 13, 7); // Glow cyan
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(9, 6, 8, 2);

    // Monitor B (Right)
    ctx.fillStyle = '#090d16';
    ctx.fillRect(26, 3, 17, 10);
    ctx.fillStyle = '#d97706';
    ctx.fillRect(28, 4, 13, 7); // Glow amber
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(30, 6, 8, 2);

    // Indicator label on front
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(12, 22, 24, 6);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(14, 24, 20, 2);
  });

  // Mission Room Door (RUANG EVALUASI - 64 x 48 px)
  const drawMissionDoor = (ctx, completed) => {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 64, 48);

    // Frame
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(2, 2, 60, 44);

    // Overhead Sign
    ctx.fillStyle = completed ? '#065f46' : '#854d0e';
    ctx.fillRect(10, 4, 44, 8);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(14, 6, 36, 4); // "RUANG EVALUASI" text rep

    // Heavy Double Doors
    ctx.fillStyle = '#334155';
    ctx.fillRect(6, 14, 25, 32);
    ctx.fillRect(33, 14, 25, 32);

    // Windows / Hazard stripes
    ctx.fillStyle = completed ? '#22c55e' : '#f59e0b';
    ctx.fillRect(10, 18, 17, 8);
    ctx.fillRect(37, 18, 17, 8);

    // Card access pad & LED
    ctx.fillStyle = '#090d16';
    ctx.fillRect(31, 26, 2, 20); // Center seam
    ctx.fillStyle = completed ? '#4ade80' : '#ef4444';
    ctx.fillRect(35, 28, 4, 6); // Access terminal badge
  };

  registerCanvas('prop_mission_door', 64, 48, (ctx) => drawMissionDoor(ctx, false));
  registerCanvas('prop_mission_door_complete', 64, 48, (ctx) => drawMissionDoor(ctx, true));

  // =========================================================================
  // LANTAI 1 · FRAMEWORK DIVISION SPECIALIZED TEXTURES
  // =========================================================================

  // Grand Architectural Header Marquee: "FRAMEWORK DIVISION" (192 x 34 px)
  registerCanvas('prop_framework_header', 192, 34, (ctx) => {
    // Outer architectural titanium casing
    ctx.fillStyle = '#080c14';
    ctx.fillRect(0, 0, 192, 34);
    ctx.fillStyle = '#162235';
    ctx.fillRect(2, 2, 188, 30);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(3, 3, 186, 28);

    // Glowing Cyan Perimeter Trim & Corner Hex Bolts
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(3, 3, 186, 1);
    ctx.fillRect(3, 30, 186, 1);
    ctx.fillStyle = '#facc15';
    ctx.fillRect(4, 4, 2, 2);
    ctx.fillRect(186, 4, 2, 2);
    ctx.fillRect(4, 28, 2, 2);
    ctx.fillRect(186, 28, 2, 2);

    // Top Header Plate: "FRAMEWORK DIVISION // LANTAI 01"
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(12, 5, 168, 10);
    ctx.fillStyle = '#0369a1';
    ctx.fillRect(13, 6, 166, 8);

    // Stylized Learning / Shield Emblem (Left)
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(16, 7, 6, 6);
    ctx.fillStyle = '#facc15';
    ctx.fillRect(18, 8, 2, 4);

    // Marquee Typography Representation
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(26, 8, 136, 4); // "FRAMEWORK DIVISION // LANTAI 01"
    ctx.fillStyle = '#facc15';
    ctx.fillRect(166, 8, 8, 4);

    // Lower Sub-Panel: 6 Color-Coded Framework Identification Pills
    // 1) COBIT (Blue)
    ctx.fillStyle = '#1d4ed8';
    ctx.fillRect(12, 18, 25, 9);
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(13, 19, 23, 7);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(15, 21, 19, 3); // "COBIT"

    // 2) RISK IT (Amber/Red-Orange)
    ctx.fillStyle = '#b45309';
    ctx.fillRect(41, 18, 26, 9);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(42, 19, 24, 7);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(44, 21, 20, 3); // "RISK IT"

    // 3) ITIL (Cyan)
    ctx.fillStyle = '#0369a1';
    ctx.fillRect(71, 18, 22, 9);
    ctx.fillStyle = '#06b6d4';
    ctx.fillRect(72, 19, 20, 7);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(74, 21, 16, 3); // "ITIL"

    // 4) ISO 27001 (Emerald Green)
    ctx.fillStyle = '#15803d';
    ctx.fillRect(97, 18, 30, 9);
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(98, 19, 28, 7);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(100, 21, 24, 3); // "ISO 27001"

    // 5) PMI (Warm Orange)
    ctx.fillStyle = '#c2410c';
    ctx.fillRect(131, 18, 22, 9);
    ctx.fillStyle = '#f97316';
    ctx.fillRect(132, 19, 20, 7);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(134, 21, 16, 3); // "PMI"

    // 6) CMMI (Purple)
    ctx.fillStyle = '#6b21a8';
    ctx.fillRect(157, 18, 23, 9);
    ctx.fillStyle = '#a855f7';
    ctx.fillRect(158, 19, 21, 7);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(160, 21, 17, 3); // "CMMI"
  });

  // Framework Station A: COBIT (Blue) & RISK IT (Amber) (48 x 36 px)
  registerCanvas('prop_framework_station_a', 48, 36, (ctx) => {
    // Desk structure
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 48, 36);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(2, 2, 44, 14);
    ctx.fillStyle = '#334155';
    ctx.fillRect(4, 16, 40, 18);

    // Monitor 1: COBIT (Left - Governance Flowchart)
    ctx.fillStyle = '#090d16';
    ctx.fillRect(4, 3, 18, 11);
    ctx.fillStyle = '#1d4ed8';
    ctx.fillRect(5, 4, 16, 9); // Blue glow screen
    // Governance flowchart blocks
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(10, 5, 6, 2); // Top box
    ctx.fillStyle = '#93c5fd';
    ctx.fillRect(12, 7, 2, 2); // Connector
    ctx.fillRect(7, 9, 5, 2);  // Left child
    ctx.fillRect(14, 9, 5, 2); // Right child

    // Monitor 2: RISK IT (Right - Risk Heat Matrix)
    ctx.fillStyle = '#090d16';
    ctx.fillRect(26, 3, 18, 11);
    ctx.fillStyle = '#9a3412';
    ctx.fillRect(27, 4, 16, 9); // Amber-red glow screen
    // Heatmap grid (Green, Yellow, Red)
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(29, 5, 3, 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(33, 5, 4, 2);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(38, 5, 3, 2);
    ctx.fillRect(29, 8, 3, 2);
    ctx.fillRect(33, 8, 4, 2);
    ctx.fillRect(38, 8, 3, 2);

    // Front Fascia with Blue & Amber Identity Pills
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(6, 22, 36, 6);
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(8, 24, 14, 2); // COBIT indicator
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(26, 24, 14, 2); // RISK IT indicator
  });

  // Framework Station B: ITIL (Cyan) & ISO 27001 (Green) (48 x 36 px)
  registerCanvas('prop_framework_station_b', 48, 36, (ctx) => {
    // Desk structure
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 48, 36);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(2, 2, 44, 14);
    ctx.fillStyle = '#334155';
    ctx.fillRect(4, 16, 40, 18);

    // Monitor 1: ITIL (Left - Service Lifecycle Loop)
    ctx.fillStyle = '#090d16';
    ctx.fillRect(4, 3, 18, 11);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(5, 4, 16, 9); // Cyan glow screen
    // Lifecycle circle loop representation
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(9, 5, 8, 1);
    ctx.fillRect(9, 11, 8, 1);
    ctx.fillRect(8, 6, 2, 5);
    ctx.fillRect(16, 6, 2, 5);
    ctx.fillStyle = '#67e8f9';
    ctx.fillRect(11, 7, 4, 3); // Core service

    // Monitor 2: ISO 27001 (Right - ISMS Security Shield)
    ctx.fillStyle = '#090d16';
    ctx.fillRect(26, 3, 18, 11);
    ctx.fillStyle = '#166534';
    ctx.fillRect(27, 4, 16, 9); // Emerald glow screen
    // Security shield graphic
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(32, 5, 6, 2);
    ctx.fillRect(31, 7, 8, 3);
    ctx.fillRect(33, 10, 4, 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(34, 7, 2, 2); // Keyhole

    // Front Fascia with Cyan & Green Identity Pills
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(6, 22, 36, 6);
    ctx.fillStyle = '#06b6d4';
    ctx.fillRect(8, 24, 14, 2); // ITIL indicator
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(26, 24, 14, 2); // ISO 27001 indicator
  });

  // Framework Station C: PMI (Orange) & CMMI (Purple) (48 x 36 px)
  registerCanvas('prop_framework_station_c', 48, 36, (ctx) => {
    // Desk structure
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 48, 36);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(2, 2, 44, 14);
    ctx.fillStyle = '#334155';
    ctx.fillRect(4, 16, 40, 18);

    // Monitor 1: PMI (Left - Project Gantt Milestones)
    ctx.fillStyle = '#090d16';
    ctx.fillRect(4, 3, 18, 11);
    ctx.fillStyle = '#c2410c';
    ctx.fillRect(5, 4, 16, 9); // Orange glow screen
    // Gantt schedule bars
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(7, 5, 5, 2);
    ctx.fillRect(10, 8, 7, 2);
    ctx.fillRect(14, 11, 5, 1);

    // Monitor 2: CMMI (Right - 5-Level Maturity Ladder)
    ctx.fillStyle = '#090d16';
    ctx.fillRect(26, 3, 18, 11);
    ctx.fillStyle = '#6b21a8';
    ctx.fillRect(27, 4, 16, 9); // Purple glow screen
    // Stepped staircase / maturity levels (1..5)
    ctx.fillStyle = '#e9d5ff';
    ctx.fillRect(29, 11, 2, 1);
    ctx.fillRect(32, 9, 2, 3);
    ctx.fillRect(35, 7, 2, 5);
    ctx.fillRect(38, 5, 3, 7);

    // Front Fascia with Orange & Purple Identity Pills
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(6, 22, 36, 6);
    ctx.fillStyle = '#f97316';
    ctx.fillRect(8, 24, 14, 2); // PMI indicator
    ctx.fillStyle = '#a855f7';
    ctx.fillRect(26, 24, 14, 2); // CMMI indicator
  });

  // Framework Station Technical Pod Underlay Pad (56 x 20 px)
  registerCanvas('prop_station_pod_glow', 56, 20, (ctx) => {
    ctx.fillStyle = '#101827';
    ctx.fillRect(0, 0, 56, 20);
    ctx.fillStyle = '#182335';
    ctx.fillRect(1, 1, 54, 18);
    // Cyan perimeter mounting bevel
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(2, 2, 52, 1);
    ctx.fillRect(2, 17, 52, 1);
    ctx.fillRect(2, 2, 1, 16);
    ctx.fillRect(53, 2, 1, 16);
    // Corner bolt points
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(3, 3, 2, 2);
    ctx.fillRect(51, 3, 2, 2);
    ctx.fillRect(3, 15, 2, 2);
    ctx.fillRect(51, 15, 2, 2);
  });

  // Freestanding Framework Whiteboard / Analysis Board (48 x 36 px)
  registerCanvas('prop_framework_whiteboard', 48, 36, (ctx) => {
    // Aluminum mobile rolling caster frame
    ctx.fillStyle = '#090d16';
    ctx.fillRect(4, 30, 6, 6);  // Left caster
    ctx.fillRect(38, 30, 6, 6); // Right caster
    ctx.fillStyle = '#64748b';
    ctx.fillRect(6, 4, 3, 28);  // Left upright post
    ctx.fillRect(39, 4, 3, 28); // Right upright post
    ctx.fillRect(6, 30, 36, 2); // Cross brace

    // Board Surface
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(2, 2, 44, 28); // Board rim
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(3, 3, 42, 26); // Whiteboard face

    // Header Title: "FRAMEWORK MATRIX"
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(8, 5, 32, 2);

    // 6 Color-coded Comparison Sticky Cards on Board
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(6, 9, 5, 6);   // COBIT (Blue)
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(13, 9, 5, 6);  // RISK IT (Amber)
    ctx.fillStyle = '#06b6d4';
    ctx.fillRect(20, 9, 5, 6);  // ITIL (Cyan)
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(27, 9, 5, 6);  // ISO (Green)
    ctx.fillStyle = '#f97316';
    ctx.fillRect(34, 9, 5, 6);  // PMI (Orange)
    ctx.fillStyle = '#a855f7';
    ctx.fillRect(37, 17, 5, 6); // CMMI (Purple)

    // Flowchart connectors & lines
    ctx.fillStyle = '#64748b';
    ctx.fillRect(8, 17, 26, 1);
    ctx.fillRect(14, 18, 1, 4);
    ctx.fillRect(24, 18, 1, 4);

    // Marker Tray at bottom with 3 colored markers
    ctx.fillStyle = '#475569';
    ctx.fillRect(10, 28, 28, 2);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(13, 27, 4, 1); // Red marker
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(19, 27, 4, 1); // Blue marker
    ctx.fillStyle = '#090d16';
    ctx.fillRect(25, 27, 4, 1); // Black marker
  });

  // Analysis / Meeting Table with Laptops & Dossiers (36 x 22 px)
  registerCanvas('prop_analysis_table', 36, 22, (ctx) => {
    // Dark mahogany-slate tabletop
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, 36, 22);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(1, 1, 34, 20);
    ctx.fillStyle = '#2b3b52';
    ctx.fillRect(2, 2, 32, 18);

    // Laptop (Left)
    ctx.fillStyle = '#090d16';
    ctx.fillRect(4, 4, 10, 8);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(5, 5, 8, 6); // Glowing screen
    ctx.fillStyle = '#64748b';
    ctx.fillRect(3, 12, 12, 3); // Keyboard base

    // Framework Dossier Binders (Right)
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(19, 5, 8, 10);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(20, 6, 6, 8);
    ctx.fillStyle = '#d97706';
    ctx.fillRect(27, 7, 6, 9);
  });

  // Ergonomic Office Swivel Chair (18 x 20 px)
  registerCanvas('prop_office_chair', 18, 20, (ctx) => {
    // 5-Star Caster Base
    ctx.fillStyle = '#090d16';
    ctx.fillRect(4, 16, 10, 4);
    ctx.fillStyle = '#64748b';
    ctx.fillRect(8, 13, 2, 4);

    // Seat cushion (Navy mesh)
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(2, 9, 14, 6);
    ctx.fillStyle = '#2d3e54';
    ctx.fillRect(3, 10, 12, 4);

    // Backrest & Armrests
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(4, 2, 10, 8);
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(5, 3, 8, 6);
    // Armrests
    ctx.fillStyle = '#475569';
    ctx.fillRect(1, 6, 2, 6);
    ctx.fillRect(15, 6, 2, 6);
  });

  // Compact Standing Analysis Desk / Console (24 x 22 px)
  registerCanvas('prop_standing_desk', 24, 22, (ctx) => {
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, 24, 22);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(1, 1, 22, 20);
    ctx.fillStyle = '#334155';
    ctx.fillRect(2, 2, 20, 18);

    // Angled Top Surface with Tablet Screen
    ctx.fillStyle = '#090d16';
    ctx.fillRect(4, 3, 16, 10);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(5, 4, 14, 8); // Cyan dashboard screen
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(7, 6, 10, 2);

    // Lower storage shelf with folder
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(3, 14, 18, 5);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(6, 15, 8, 3); // Amber binder
  });

  // Wall-Mounted Framework Comparison Chart (28 x 20 px)
  registerCanvas('prop_framework_chart_wall', 28, 20, (ctx) => {
    // Mahogany/Titanium frame
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, 28, 20);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(1, 1, 26, 18);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(2, 2, 24, 16);

    // 6 Horizontal Framework Comparison Bars
    const barColors = ['#3b82f6', '#f59e0b', '#06b6d4', '#22c55e', '#f97316', '#a855f7'];
    for (let i = 0; i < 6; i++) {
      ctx.fillStyle = barColors[i];
      ctx.fillRect(4, 4 + i * 2, 14, 1);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(20, 4 + i * 2, 4, 1);
    }
  });

  // Slim High-Tech Server Blade Cabinet (20 x 36 px)
  registerCanvas('prop_server_rack_mini', 20, 36, (ctx) => {
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, 20, 36);
    ctx.fillStyle = '#172233';
    ctx.fillRect(1, 1, 18, 34);

    // 4 Blade Units
    for (let i = 0; i < 4; i++) {
      const by = 3 + i * 8;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(2, by, 16, 7);
      // Vent lines
      ctx.fillStyle = '#334155';
      ctx.fillRect(3, by + 2, 8, 1);
      ctx.fillRect(3, by + 4, 8, 1);
      // Activity LEDs (Green, Cyan, Amber)
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(13, by + 2, 2, 1);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(13, by + 4, 2, 1);
    }
  });

  // Elevator L1 Portal Frame with "L1" Floor Indicator (64 x 48 px)
  registerCanvas('prop_elevator_l1', 64, 48, (ctx) => {
    // Brushed titanium outer frame
    ctx.fillStyle = '#0d131f';
    ctx.fillRect(0, 0, 64, 48);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(2, 2, 60, 44);
    ctx.fillStyle = '#334155';
    ctx.fillRect(4, 4, 56, 40);

    // Overhead Digital Display Housing
    ctx.fillStyle = '#080c14';
    ctx.fillRect(16, 4, 32, 9);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(18, 5, 28, 7);

    // Floor Display ("L1" + Up Indicator)
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(21, 7, 4, 3); // Green upward direction arrow
    ctx.fillStyle = '#38bdf8';
    // Letter "L"
    ctx.fillRect(29, 6, 2, 5);
    ctx.fillRect(29, 10, 5, 1);
    // Digit "1"
    ctx.fillRect(38, 6, 4, 5);
    ctx.fillRect(36, 7, 2, 2);

    // Sliding Brushed Metal Doors
    ctx.fillStyle = '#3b495e';
    ctx.fillRect(6, 14, 25, 33);
    ctx.fillRect(33, 14, 25, 33);
    ctx.fillStyle = '#4f617a';
    ctx.fillRect(8, 16, 21, 29);
    ctx.fillRect(35, 16, 21, 29);
    ctx.fillStyle = '#64748b';
    ctx.fillRect(10, 18, 8, 25);
    ctx.fillRect(37, 18, 8, 25);

    // Center seam & shadow
    ctx.fillStyle = '#090d16';
    ctx.fillRect(31, 14, 2, 33);

    // Call button on right frame
    ctx.fillStyle = '#0b111c';
    ctx.fillRect(59, 22, 4, 10);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(60, 24, 2, 2); // Lit amber call button
    ctx.fillStyle = '#64748b';
    ctx.fillRect(60, 28, 2, 2);

    // Bottom Safety Threshold
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(6, 46, 52, 2);
  });

  // Upgraded Ruang Evaluasi Door (64 x 48 px)
  const drawRuangEvaluasiDoor = (ctx, completed) => {
    ctx.fillStyle = '#090e18';
    ctx.fillRect(0, 0, 64, 48);

    // Heavy reinforced architrave
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(2, 2, 60, 44);
    ctx.fillStyle = '#334155';
    ctx.fillRect(4, 4, 56, 40);

    // Overhead Header Sign: "RUANG EVALUASI"
    ctx.fillStyle = completed ? '#064e3b' : '#7c2d12';
    ctx.fillRect(10, 4, 44, 8);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(12, 6, 40, 4); // "RUANG EVALUASI" typography rep

    // Heavy Double Blast Doors with Brushed Texture
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(6, 14, 25, 32);
    ctx.fillRect(33, 14, 25, 32);
    ctx.fillStyle = '#334155';
    ctx.fillRect(8, 16, 21, 28);
    ctx.fillRect(35, 16, 21, 28);

    // Status / Inspection Windows
    ctx.fillStyle = completed ? '#22c55e' : '#f59e0b';
    ctx.fillRect(10, 18, 17, 8);
    ctx.fillRect(37, 18, 17, 8);
    ctx.fillStyle = completed ? '#86efac' : '#fef08a';
    ctx.fillRect(12, 20, 13, 2);
    ctx.fillRect(39, 20, 13, 2);

    // Center Door Seam
    ctx.fillStyle = '#090d16';
    ctx.fillRect(31, 14, 2, 32);

    // Status Panel Badge below window
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(14, 30, 36, 6);
    ctx.fillStyle = completed ? '#22c55e' : '#ea580c';
    ctx.fillRect(16, 32, 32, 2); // "STATUS: SIAP" or "SELESAI"

    // Card Access Terminal (Right jamb)
    ctx.fillStyle = '#090d16';
    ctx.fillRect(59, 24, 4, 10);
    ctx.fillStyle = completed ? '#4ade80' : '#f59e0b';
    ctx.fillRect(60, 26, 2, 3);

    // Yellow Hazard Safety Threshold
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(6, 45, 52, 2);
  };

  registerCanvas('prop_mission_door_v2', 64, 48, (ctx) => drawRuangEvaluasiDoor(ctx, false));
  registerCanvas('prop_mission_door_complete_v2', 64, 48, (ctx) => drawRuangEvaluasiDoor(ctx, true));

  // Framework Learning Hub Focal Glow Pool (128 x 40 px)
  registerCanvas('prop_learning_hub_glow', 128, 40, (ctx) => {
    const gradient = ctx.createRadialGradient(64, 20, 2, 64, 20, 60);
    gradient.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
    gradient.addColorStop(0.4, 'rgba(2, 132, 199, 0.22)');
    gradient.addColorStop(0.8, 'rgba(2, 132, 199, 0.06)');
    gradient.addColorStop(1, 'rgba(2, 132, 199, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(64, 20, 60, 18, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  // Ruang Evaluasi Focused Progression Glow Pool (52 x 28 px)
  registerCanvas('prop_mission_door_glow', 52, 28, (ctx) => {
    const gradient = ctx.createRadialGradient(26, 14, 2, 26, 14, 25);
    gradient.addColorStop(0, 'rgba(245, 158, 11, 0.4)');
    gradient.addColorStop(0.4, 'rgba(2, 132, 199, 0.25)');
    gradient.addColorStop(0.8, 'rgba(2, 132, 199, 0.06)');
    gradient.addColorStop(1, 'rgba(2, 132, 199, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(26, 14, 25, 13, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  // =========================================================================
  // LANTAI 2 · SECURITY OPERATIONS TEXTURES
  // =========================================================================

  // Floor 2 Base Tile (Steel Blue / Dark Navy Corporate Tile - 32 x 32 px)
  registerCanvas('tile_floor_floor2', 32, 32, (ctx) => {
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#182232';
    ctx.fillRect(1, 1, 30, 30);
    ctx.fillStyle = '#1f2d40';
    ctx.fillRect(5, 5, 10, 10);
    ctx.fillRect(17, 17, 10, 10);
    ctx.fillStyle = '#0c121d';
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(31, 0, 1, 32);
  });

  // Floor 2 Alternate Tile (Quadrant variation to break repetition - 32 x 32 px)
  registerCanvas('tile_floor_floor2_alt', 32, 32, (ctx) => {
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#182232';
    ctx.fillRect(1, 1, 30, 30);
    ctx.fillStyle = '#1f2d40';
    ctx.fillRect(17, 5, 10, 10);
    ctx.fillRect(5, 17, 10, 10);
    ctx.fillStyle = '#283b54';
    ctx.fillRect(15, 15, 2, 2);
    ctx.fillStyle = '#0c121d';
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(31, 0, 1, 32);
  });

  // Floor 2 Security Hub Floor Tile (Controlled Cyan Tech Inlay - 32 x 32 px)
  registerCanvas('tile_floor_sec_hub', 32, 32, (ctx) => {
    ctx.fillStyle = '#101926';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#172538';
    ctx.fillRect(1, 1, 30, 30);
    // Perimeter cyan micro-trim
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(2, 2, 3, 1);
    ctx.fillRect(2, 2, 1, 3);
    ctx.fillRect(27, 2, 3, 1);
    ctx.fillRect(29, 2, 1, 3);
    ctx.fillRect(2, 29, 3, 1);
    ctx.fillRect(2, 27, 1, 3);
    ctx.fillRect(27, 29, 3, 1);
    ctx.fillRect(29, 27, 1, 3);
    // Center acoustic tech grid
    ctx.fillStyle = '#21334b';
    ctx.fillRect(8, 8, 16, 16);
    ctx.fillStyle = '#172538';
    ctx.fillRect(10, 10, 12, 12);
  });

  // Floor 2 Data Archive Zone Tile (Restrained Dark Steel Tone - 32 x 32 px)
  registerCanvas('tile_floor_archive_zone', 32, 32, (ctx) => {
    ctx.fillStyle = '#0b1019';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#131b28';
    ctx.fillRect(1, 1, 30, 30);
    // Industrial rivets & metal plate seams
    ctx.fillStyle = '#1b2638';
    ctx.fillRect(4, 4, 24, 24);
    ctx.fillStyle = '#26374f';
    ctx.fillRect(6, 6, 2, 2);
    ctx.fillRect(24, 6, 2, 2);
    ctx.fillRect(6, 24, 2, 2);
    ctx.fillRect(24, 24, 2, 2);
    ctx.fillStyle = '#090d14';
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(31, 0, 1, 32);
  });

  const drawFloor2Runner = (ctx) => {
    // 1. Seamless corporate floor base (margins: y=0..4 and y=27..31)
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#182232';
    ctx.fillRect(1, 1, 30, 4);
    ctx.fillRect(1, 27, 30, 4);
    // Subtle floor tile grid seams
    ctx.fillStyle = '#0c121d';
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(31, 0, 1, 32);

    // 2. Outer Runner Border Seam (recessed shadow, y=5 and y=26)
    ctx.fillStyle = '#0c121d';
    ctx.fillRect(0, 5, 32, 1);
    ctx.fillRect(0, 26, 32, 1);

    // 3. Architectural Steel Hem (y=6 and y=25)
    ctx.fillStyle = '#1e2d40';
    ctx.fillRect(0, 6, 32, 1);
    ctx.fillRect(0, 25, 32, 1);

    // 4. Subtle Inner Accent Line (y=7 and y=24)
    ctx.fillStyle = '#253952';
    ctx.fillRect(0, 7, 32, 1);
    ctx.fillRect(0, 24, 32, 1);

    // 5. Guided Muted Cyan Trim Pinstripes (y=8 and y=23)
    ctx.fillStyle = '#0369a1';
    ctx.fillRect(0, 8, 32, 1);
    ctx.fillRect(0, 23, 32, 1);

    // 6. Deep Velvet Navy/Steel Carpet Bed (y=9..22, 14px height)
    ctx.fillStyle = '#131e33';
    ctx.fillRect(0, 9, 32, 14);

    // 7. Soft Walkway Center Shading (y=13..18, 6px height)
    ctx.fillStyle = '#17253d';
    ctx.fillRect(0, 13, 32, 6);

    // Faint center guideline core
    ctx.fillStyle = '#1b2a44';
    ctx.fillRect(0, 15, 32, 2);

    // 8. Minimalist Fabric Micro-Weave (Subtle understated ribbing across runner)
    ctx.fillStyle = '#18253d';
    for (let px = 3; px < 32; px += 4) {
      ctx.fillRect(px, 10, 1, 12);
    }
  };

  // Floor 2 Transit Runner (Clean Minimalist Carpet / Runner - 32 x 32 px)
  registerCanvas('tile_floor_floor2_runner', 32, 32, drawFloor2Runner);

  // Floor 2 Transit Runner Start (West End at Col 3, facing Elevator - 32 x 32 px)
  registerCanvas('tile_floor_floor2_runner_start', 32, 32, (ctx) => {
    // 1. Seamless corporate floor base
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#182232';
    ctx.fillRect(1, 1, 30, 4);
    ctx.fillRect(1, 27, 30, 4);
    ctx.fillRect(1, 5, 3, 22);
    ctx.fillStyle = '#0c121d';
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(31, 0, 1, 32);

    // 2. Horizontal Outer Seams & Hems (from x=4 to 32)
    ctx.fillStyle = '#0c121d';
    ctx.fillRect(4, 5, 28, 1);
    ctx.fillRect(4, 26, 28, 1);
    ctx.fillStyle = '#1e2d40';
    ctx.fillRect(4, 6, 28, 1);
    ctx.fillRect(4, 25, 28, 1);
    ctx.fillStyle = '#253952';
    ctx.fillRect(5, 7, 27, 1);
    ctx.fillRect(5, 24, 27, 1);
    ctx.fillStyle = '#0369a1';
    ctx.fillRect(6, 8, 26, 1);
    ctx.fillRect(6, 23, 26, 1);

    // 3. West Vertical Finished End-Cap (Framing the runner in front of elevator)
    ctx.fillStyle = '#0c121d';
    ctx.fillRect(3, 5, 1, 22);
    ctx.fillStyle = '#1e2d40';
    ctx.fillRect(4, 6, 1, 20);
    ctx.fillStyle = '#253952';
    ctx.fillRect(5, 7, 1, 18);
    ctx.fillStyle = '#0369a1';
    ctx.fillRect(6, 8, 1, 16);

    // 4. Main Carpet Bed (from x=7 to 32, y=9..22)
    ctx.fillStyle = '#131e33';
    ctx.fillRect(7, 9, 25, 14);

    // 5. Soft Center Walkway Shading & Gentle Elevator Ambient Glow
    ctx.fillStyle = '#17253d';
    ctx.fillRect(7, 13, 25, 6);
    ctx.fillStyle = '#1b2a44';
    ctx.fillRect(7, 15, 25, 2);

    // Subtle ambient entrance reflection near elevator rim
    ctx.fillStyle = '#1d324f';
    ctx.fillRect(7, 14, 4, 4);

    // 6. Micro-Weave
    ctx.fillStyle = '#18253d';
    for (let px = 11; px < 32; px += 4) {
      ctx.fillRect(px, 10, 1, 12);
    }
  });

  // Floor 2 Transit Runner End (East End at Col 11, facing Ruang Insiden - 32 x 32 px)
  registerCanvas('tile_floor_floor2_runner_end', 32, 32, (ctx) => {
    // 1. Seamless corporate floor base
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#182232';
    ctx.fillRect(1, 1, 30, 4);
    ctx.fillRect(1, 27, 30, 4);
    ctx.fillRect(28, 5, 3, 22);
    ctx.fillStyle = '#0c121d';
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(31, 0, 1, 32);

    // 2. Horizontal Outer Seams & Hems (from x=0 to 27)
    ctx.fillStyle = '#0c121d';
    ctx.fillRect(0, 5, 28, 1);
    ctx.fillRect(0, 26, 28, 1);
    ctx.fillStyle = '#1e2d40';
    ctx.fillRect(0, 6, 28, 1);
    ctx.fillRect(0, 25, 28, 1);
    ctx.fillStyle = '#253952';
    ctx.fillRect(0, 7, 27, 1);
    ctx.fillRect(0, 24, 27, 1);
    ctx.fillStyle = '#0369a1';
    ctx.fillRect(0, 8, 26, 1);
    ctx.fillRect(0, 23, 26, 1);

    // 3. Main Carpet Bed (from x=0 to 25, y=9..22)
    ctx.fillStyle = '#131e33';
    ctx.fillRect(0, 9, 25, 14);

    // 4. Soft Center Walkway Shading
    ctx.fillStyle = '#17253d';
    ctx.fillRect(0, 13, 25, 6);
    ctx.fillStyle = '#1b2a44';
    ctx.fillRect(0, 15, 25, 2);

    // 5. East Vertical Finished End-Cap (Soft amber-steel threshold transition)
    ctx.fillStyle = '#0369a1';
    ctx.fillRect(25, 8, 1, 16);
    // Subtle amber trim tick harmonizing with Ruang Insiden entrance
    ctx.fillStyle = '#92400e';
    ctx.fillRect(25, 13, 1, 6);
    ctx.fillStyle = '#253952';
    ctx.fillRect(26, 7, 1, 18);
    ctx.fillStyle = '#1e2d40';
    ctx.fillRect(27, 6, 1, 20);
    ctx.fillStyle = '#0c121d';
    ctx.fillRect(28, 5, 1, 22);

    // 6. Micro-Weave
    ctx.fillStyle = '#18253d';
    for (let px = 3; px < 24; px += 4) {
      ctx.fillRect(px, 10, 1, 12);
    }
  });

  // Legacy / fallback registrations (Clean runner duplicates - all symbols/arrows/numbers removed)
  registerCanvas('tile_floor_floor2_guide', 32, 32, drawFloor2Runner);
  registerCanvas('tile_floor_floor2_stencil', 32, 32, drawFloor2Runner);
  registerCanvas('tile_floor_sec_zone', 32, 32, drawFloor2Runner);

  // Floor 2 Incident Room Floor Warning Marker (32 x 32 px)
  registerCanvas('tile_floor_incident_marker', 32, 32, (ctx) => {
    ctx.fillStyle = '#181f2c';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#232b3b';
    ctx.fillRect(1, 1, 30, 30);
    // Restrained amber boundary hash marks
    ctx.fillStyle = '#d97706';
    ctx.fillRect(4, 2, 6, 2);
    ctx.fillRect(14, 2, 6, 2);
    ctx.fillRect(24, 2, 6, 2);
    ctx.fillRect(4, 28, 6, 2);
    ctx.fillRect(14, 28, 6, 2);
    ctx.fillRect(24, 28, 6, 2);
    // Center restricted zone graphic
    ctx.fillStyle = '#b45309';
    ctx.fillRect(10, 14, 12, 4);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(12, 15, 8, 2);
  });

  // Elevator L2 Portal Frame (64 x 48 px)
  registerCanvas('prop_elevator_l2', 64, 48, (ctx) => {
    // Brushed titanium outer frame with cyan trim
    ctx.fillStyle = '#0b111c';
    ctx.fillRect(0, 0, 64, 48);
    ctx.fillStyle = '#1a273a';
    ctx.fillRect(2, 2, 60, 44);
    ctx.fillStyle = '#283b54';
    ctx.fillRect(4, 4, 56, 40);

    // Overhead Digital Display Housing
    ctx.fillStyle = '#080c14';
    ctx.fillRect(14, 4, 36, 9);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(16, 5, 32, 7);

    // Floor Display ("L2" + Up Arrow)
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(19, 7, 4, 3); // Upward direction arrow
    ctx.fillStyle = '#38bdf8';
    // Letter "L"
    ctx.fillRect(27, 6, 2, 5);
    ctx.fillRect(27, 10, 5, 1);
    // Digit "2"
    ctx.fillRect(36, 6, 5, 1);
    ctx.fillRect(39, 7, 2, 2);
    ctx.fillRect(36, 8, 5, 1);
    ctx.fillRect(36, 9, 2, 2);
    ctx.fillRect(36, 10, 5, 1);

    // Sliding Brushed Metal Doors
    ctx.fillStyle = '#324155';
    ctx.fillRect(6, 14, 25, 33);
    ctx.fillRect(33, 14, 25, 33);
    ctx.fillStyle = '#44566f';
    ctx.fillRect(8, 16, 21, 29);
    ctx.fillRect(35, 16, 21, 29);
    ctx.fillStyle = '#596e8d';
    ctx.fillRect(10, 18, 8, 25);
    ctx.fillRect(37, 18, 8, 25);

    // Center seam & shadow
    ctx.fillStyle = '#090d16';
    ctx.fillRect(31, 14, 2, 33);

    // Access panel on right frame with illuminated cyan LED
    ctx.fillStyle = '#080d16';
    ctx.fillRect(59, 22, 4, 10);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(60, 24, 2, 2); // Lit cyan call LED
    ctx.fillStyle = '#64748b';
    ctx.fillRect(60, 28, 2, 2);

    // Bottom Safety Threshold
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(6, 46, 52, 2);
  });

  // Ruang Insiden Blast Door (64 x 48 px)
  const drawRuangInsidenDoor = (ctx, completed) => {
    ctx.fillStyle = '#080d16';
    ctx.fillRect(0, 0, 64, 48);

    // Heavy reinforced blast door architrave
    ctx.fillStyle = '#192333';
    ctx.fillRect(2, 2, 60, 44);
    ctx.fillStyle = '#28374d';
    ctx.fillRect(4, 4, 56, 40);

    // Overhead Header Sign: "RUANG INSIDEN"
    ctx.fillStyle = completed ? '#064e3b' : '#7f1d1d';
    ctx.fillRect(8, 4, 48, 8);
    // Header title representation
    ctx.fillStyle = completed ? '#6ee7b7' : '#fecaca';
    ctx.fillRect(12, 6, 40, 4);

    // Heavy Double Blast Doors with Technical Seams
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(6, 14, 25, 32);
    ctx.fillRect(33, 14, 25, 32);
    ctx.fillStyle = '#2f4058';
    ctx.fillRect(8, 16, 21, 28);
    ctx.fillRect(35, 16, 21, 28);

    // Status / Inspection Windows (Amber/Red warning before, Green after)
    ctx.fillStyle = completed ? '#22c55e' : '#f59e0b';
    ctx.fillRect(10, 18, 17, 8);
    ctx.fillRect(37, 18, 17, 8);
    ctx.fillStyle = completed ? '#86efac' : '#fef08a';
    ctx.fillRect(12, 20, 13, 2);
    ctx.fillRect(39, 20, 13, 2);

    // Center Door Seam
    ctx.fillStyle = '#090d16';
    ctx.fillRect(31, 14, 2, 32);

    // Status Panel Badge below window
    ctx.fillStyle = '#0a101d';
    ctx.fillRect(12, 30, 40, 6);
    ctx.fillStyle = completed ? '#22c55e' : '#ef4444';
    ctx.fillRect(14, 32, 36, 2); // "TERKENDALI ✓" or "INSIDEN AKTIF"

    // Card Access Terminal with Status LED (Amber before, Green after)
    ctx.fillStyle = '#090d16';
    ctx.fillRect(59, 24, 4, 10);
    ctx.fillStyle = completed ? '#4ade80' : '#f59e0b';
    ctx.fillRect(60, 26, 2, 3);

    // Safety Threshold
    ctx.fillStyle = completed ? '#059669' : '#d97706';
    ctx.fillRect(6, 45, 52, 2);
  };

  registerCanvas('prop_ruang_insiden_door', 64, 48, (ctx) => drawRuangInsidenDoor(ctx, false));
  registerCanvas('prop_ruang_insiden_door_complete', 64, 48, (ctx) => drawRuangInsidenDoor(ctx, true));

  // Ruang Insiden Warning Glow Pool (Restrained Amber Glow - 56 x 32 px)
  registerCanvas('prop_ruang_insiden_glow', 56, 32, (ctx) => {
    const gradient = ctx.createRadialGradient(28, 16, 2, 28, 16, 26);
    gradient.addColorStop(0, 'rgba(245, 158, 11, 0.42)');
    gradient.addColorStop(0.35, 'rgba(239, 68, 68, 0.22)');
    gradient.addColorStop(0.75, 'rgba(2, 132, 199, 0.05)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(28, 16, 26, 14, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  // Ruang Insiden Completed Glow Pool (Calm Teal/Green Glow - 56 x 32 px)
  registerCanvas('prop_ruang_insiden_glow_complete', 56, 32, (ctx) => {
    const gradient = ctx.createRadialGradient(28, 16, 2, 28, 16, 26);
    gradient.addColorStop(0, 'rgba(34, 197, 94, 0.4)');
    gradient.addColorStop(0.4, 'rgba(6, 182, 212, 0.2)');
    gradient.addColorStop(0.8, 'rgba(2, 132, 199, 0.05)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(28, 16, 26, 14, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  // Security Operations Header Marquee (North Wall - 160 x 22 px)
  registerCanvas('prop_secops_header', 160, 22, (ctx) => {
    ctx.fillStyle = '#0a101d';
    ctx.fillRect(0, 0, 160, 22);
    ctx.fillStyle = '#141e30';
    ctx.fillRect(2, 2, 156, 18);
    // Cyan border frame
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(2, 2, 156, 1);
    ctx.fillRect(2, 19, 156, 1);
    // Typography representation: "SECURITY OPERATIONS // L2"
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(10, 6, 8, 8); // Shield logo rep
    ctx.fillStyle = '#0ea5e9';
    ctx.fillRect(24, 7, 72, 3);
    ctx.fillRect(24, 12, 48, 2);
    // Divider
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(105, 5, 2, 12);
    // "L2 · SEC" indicator
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(114, 7, 10, 7);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(128, 8, 22, 5);
  });

  // Security Operations Status Panel (Wall-Mounted - 36 x 24 px)
  registerCanvas('prop_security_status_panel', 36, 24, (ctx) => {
    ctx.fillStyle = '#080d16';
    ctx.fillRect(0, 0, 36, 24);
    ctx.fillStyle = '#162234';
    ctx.fillRect(1, 1, 34, 22);
    // Screen bezel
    ctx.fillStyle = '#0a101d';
    ctx.fillRect(3, 3, 30, 18);
    // Telemetry bar graph
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(5, 14, 4, 5);
    ctx.fillRect(11, 11, 4, 8);
    ctx.fillRect(17, 8, 4, 11);
    ctx.fillRect(23, 13, 4, 6);
    // Status wave line
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(5, 6, 24, 1);
  });

  // Incident Analysis Workstation (Desk + Dual Monitors + Dossier - 48 x 30 px)
  registerCanvas('prop_analysis_workstation', 48, 30, (ctx) => {
    // Desk surface
    ctx.fillStyle = '#111927';
    ctx.fillRect(0, 8, 48, 22);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(1, 9, 46, 12);
    // Desk trim
    ctx.fillStyle = '#334155';
    ctx.fillRect(1, 20, 46, 2);

    // Left Monitor: Incident log screen (Amber line trace)
    ctx.fillStyle = '#080d16';
    ctx.fillRect(5, 0, 16, 11);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(6, 1, 14, 9);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(8, 3, 10, 1);
    ctx.fillRect(8, 5, 7, 1);
    ctx.fillRect(8, 7, 9, 1);

    // Right Monitor: System diagram (Cyan trace)
    ctx.fillStyle = '#080d16';
    ctx.fillRect(24, 0, 16, 11);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(25, 1, 14, 9);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(27, 3, 8, 1);
    ctx.fillRect(27, 5, 10, 1);
    ctx.fillRect(27, 7, 6, 1);

    // Monitor Stands
    ctx.fillStyle = '#475569';
    ctx.fillRect(12, 11, 2, 3);
    ctx.fillRect(31, 11, 2, 3);

    // Keyboard & Desk Pad
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(10, 14, 14, 5);
    ctx.fillStyle = '#475569';
    ctx.fillRect(12, 15, 10, 3);

    // Incident Report File Dossier (Amber folder with white sheet)
    ctx.fillStyle = '#d97706';
    ctx.fillRect(28, 13, 8, 6);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(29, 14, 6, 4);

    // Desk Legs & Shadow
    ctx.fillStyle = '#090d16';
    ctx.fillRect(2, 22, 4, 8);
    ctx.fillRect(42, 22, 4, 8);
  });

  // Security Operations Desk (Main Security Desk - 52 x 28 px)
  registerCanvas('prop_security_desk', 52, 28, (ctx) => {
    // Desk body
    ctx.fillStyle = '#0e1726';
    ctx.fillRect(0, 6, 52, 22);
    ctx.fillStyle = '#1c283c';
    ctx.fillRect(1, 7, 50, 12);
    ctx.fillStyle = '#2d3d57';
    ctx.fillRect(1, 18, 50, 2);

    // Center Console Display
    ctx.fillStyle = '#070b13';
    ctx.fillRect(16, 0, 20, 10);
    ctx.fillStyle = '#0b1322';
    ctx.fillRect(17, 1, 18, 8);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(19, 3, 14, 1);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(19, 5, 11, 1);
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(19, 7, 7, 1);

    // Status Meter Panel on left
    ctx.fillStyle = '#0a101d';
    ctx.fillRect(4, 10, 8, 6);
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(5, 11, 2, 4);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(8, 11, 2, 4);

    // Document & Logbook on right
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(40, 10, 8, 6);
    ctx.fillStyle = '#93c5fd';
    ctx.fillRect(41, 11, 6, 4);

    // Base legs
    ctx.fillStyle = '#080d16';
    ctx.fillRect(2, 20, 4, 8);
    ctx.fillRect(46, 20, 4, 8);
  });

  // Incident Console (Free-standing technical terminal - 24 x 28 px)
  registerCanvas('prop_incident_console', 24, 28, (ctx) => {
    ctx.fillStyle = '#0b111c';
    ctx.fillRect(0, 4, 24, 24);
    ctx.fillStyle = '#19263a';
    ctx.fillRect(1, 5, 22, 14);
    // Angled terminal head
    ctx.fillStyle = '#080d16';
    ctx.fillRect(3, 0, 18, 8);
    ctx.fillStyle = '#0d1624';
    ctx.fillRect(4, 1, 16, 6);
    // Status text line
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(6, 3, 12, 2);
    // Keypad surface
    ctx.fillStyle = '#23344d';
    ctx.fillRect(4, 10, 16, 5);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(6, 11, 3, 1);
    ctx.fillRect(11, 11, 3, 1);
    ctx.fillRect(16, 11, 3, 1);
    // Pedestal base
    ctx.fillStyle = '#090d15';
    ctx.fillRect(4, 20, 16, 8);
  });

  // Data Archive Cabinets (Grouped secure filing cabinets - 48 x 28 px)
  registerCanvas('prop_archive_cabinets', 48, 28, (ctx) => {
    ctx.fillStyle = '#090e17';
    ctx.fillRect(0, 0, 48, 28);
    ctx.fillStyle = '#172233';
    ctx.fillRect(1, 1, 46, 26);

    // 3 Filing Cabinet bays
    for (let bay = 0; bay < 3; bay++) {
      const bx = 2 + bay * 15;
      ctx.fillStyle = '#1e2c40';
      ctx.fillRect(bx, 2, 14, 24);
      // 3 Drawers per bay
      for (let d = 0; d < 3; d++) {
        const dy = 4 + d * 7;
        ctx.fillStyle = '#283a54';
        ctx.fillRect(bx + 1, dy, 12, 6);
        // Metallic pull handle
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(bx + 4, dy + 2, 4, 1);
        // Label badge
        ctx.fillStyle = bay === 0 ? '#ca8a04' : '#38bdf8';
        ctx.fillRect(bx + 9, dy + 2, 3, 1);
      }
    }
    // Top digital security keypad lock on right bay
    ctx.fillStyle = '#0a101d';
    ctx.fillRect(40, 1, 6, 4);
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(42, 2, 2, 2);
  });

  // Single Compact Server / Storage Rack (Restrained - 20 x 36 px)
  registerCanvas('prop_server_storage_rack', 20, 36, (ctx) => {
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, 20, 36);
    ctx.fillStyle = '#172233';
    ctx.fillRect(1, 1, 18, 34);

    // 4 Storage Blade Units
    for (let i = 0; i < 4; i++) {
      const by = 3 + i * 8;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(2, by, 16, 7);
      // Vent lines
      ctx.fillStyle = '#334155';
      ctx.fillRect(3, by + 2, 8, 1);
      ctx.fillRect(3, by + 4, 8, 1);
      // Activity LEDs (Green, Cyan)
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(13, by + 2, 2, 1);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(13, by + 4, 2, 1);
    }
  });

  // Document Safe / Secure Data Vault (22 x 26 px)
  registerCanvas('prop_doc_safe', 22, 26, (ctx) => {
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, 22, 26);
    ctx.fillStyle = '#1a2638';
    ctx.fillRect(1, 1, 20, 24);
    // Reinforced door seam
    ctx.fillStyle = '#28384f';
    ctx.fillRect(2, 2, 18, 22);
    // Rotary digital dial lock
    ctx.fillStyle = '#0a101d';
    ctx.fillRect(12, 9, 6, 8);
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(14, 11, 2, 4);
    // Status LED
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(5, 5, 2, 2);
  });

  // Learning Terminal Kiosks (28 x 28 px)
  const drawLearningTerminal = (ctx, accentColor, headerColor) => {
    // Pedestal
    ctx.fillStyle = '#090e17';
    ctx.fillRect(0, 0, 28, 28);
    ctx.fillStyle = '#182436';
    ctx.fillRect(1, 1, 26, 26);

    // Screen Housing
    ctx.fillStyle = '#0a101d';
    ctx.fillRect(3, 2, 22, 14);
    ctx.fillStyle = '#101826';
    ctx.fillRect(4, 3, 20, 12);

    // Screen Content
    ctx.fillStyle = headerColor;
    ctx.fillRect(6, 5, 16, 2);
    ctx.fillStyle = accentColor;
    ctx.fillRect(6, 9, 12, 2);
    ctx.fillRect(6, 12, 14, 1);

    // Keypad / Sensor Area
    ctx.fillStyle = '#23344d';
    ctx.fillRect(4, 18, 20, 4);
    ctx.fillStyle = accentColor;
    ctx.fillRect(7, 19, 3, 2);
    ctx.fillRect(13, 19, 3, 2);
    ctx.fillRect(19, 19, 3, 2);

    // Base Support
    ctx.fillStyle = '#0a101d';
    ctx.fillRect(6, 24, 16, 3);
  };

  // Terminal 01: IDENTIFIKASI RISIKO (Amber/Cyan)
  registerCanvas('prop_terminal_identifikasi', 28, 28, (ctx) =>
    drawLearningTerminal(ctx, '#38bdf8', '#f59e0b')
  );

  // Terminal 02: PENILAIAN RISIKO (Orange/Cyan)
  registerCanvas('prop_terminal_penilaian', 28, 28, (ctx) =>
    drawLearningTerminal(ctx, '#38bdf8', '#ea580c')
  );

  // Terminal 03: PENANGANAN & PEMANTAUAN (Green/Cyan)
  registerCanvas('prop_terminal_pemantauan', 28, 28, (ctx) =>
    drawLearningTerminal(ctx, '#38bdf8', '#22c55e')
  );

  // NPC 01: Analis Keamanan (Floor 2 NPC 1 - Security Analyst in Dark Navy Suit with Cyan Lanyard & Tablet - 24 x 32 px)
  registerCanvas('npc_sec_analyst', 24, 32, (ctx) => {
    // Hair
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(6, 3, 12, 5);
    // Face
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(7, 7, 10, 6);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(8, 9, 2, 2);
    ctx.fillRect(14, 9, 2, 2);
    // Outfit (Security Operations Navy Suit)
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(6, 13, 12, 8);
    // Cyan Security Lanyard
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(9, 13, 1, 6);
    ctx.fillRect(14, 13, 1, 6);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(11, 18, 2, 3); // Security access badge
    // Left hand holding active digital tablet
    ctx.fillStyle = '#080d16';
    ctx.fillRect(3, 15, 6, 8);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(4, 16, 4, 6); // Glowing screen
    // Right arm
    ctx.fillStyle = '#172554';
    ctx.fillRect(18, 14, 2, 6);
    // Pants & shoes
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(7, 22, 4, 7);
    ctx.fillRect(13, 22, 4, 7);
    ctx.fillStyle = '#0a0f1d';
    ctx.fillRect(6, 29, 5, 3);
    ctx.fillRect(13, 29, 5, 3);
  });

  // NPC 02: Petugas Insiden (Floor 2 NPC 2 - Incident Response Officer in Structured Charcoal Uniform with Amber Lapel - 24 x 32 px)
  registerCanvas('npc_incident_officer', 24, 32, (ctx) => {
    // Hair
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(6, 3, 12, 5);
    // Comms earpiece
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(4, 6, 2, 3);
    // Face
    ctx.fillStyle = '#fde68a';
    ctx.fillRect(7, 7, 10, 6);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(8, 9, 2, 2);
    ctx.fillRect(14, 9, 2, 2);
    // Outfit (Incident Response Charcoal Jacket)
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(6, 13, 12, 8);
    // Amber/Gold lapel badge & hazard trim
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(8, 14, 2, 4);
    ctx.fillStyle = '#334155';
    ctx.fillRect(11, 13, 2, 8); // Seam
    // Left arm holding tactical clipboard/binder
    ctx.fillStyle = '#374151';
    ctx.fillRect(4, 16, 5, 7);
    ctx.fillStyle = '#d97706';
    ctx.fillRect(5, 17, 3, 5);
    // Right arm
    ctx.fillStyle = '#111827';
    ctx.fillRect(18, 14, 2, 6);
    // Pants & shoes
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(7, 22, 4, 7);
    ctx.fillRect(13, 22, 4, 7);
    ctx.fillStyle = '#05080f';
    ctx.fillRect(6, 29, 5, 3);
    ctx.fillRect(13, 29, 5, 3);
  });

  // =========================================================================
  // LANTAI 3 · SECTOR SIMULATION CENTER TEXTURES (Clean, modular, educational)
  // =========================================================================

  // 1. Floor 3 Base Tile (Modular Ceramic-Steel - 32 x 32 px)
  registerCanvas('tile_floor_floor3', 32, 32, (ctx) => {
    ctx.fillStyle = '#0f1624';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#172235';
    ctx.fillRect(1, 1, 30, 30);
    ctx.fillStyle = '#1e2c42';
    ctx.fillRect(4, 4, 24, 24);
    ctx.fillStyle = '#0a0f1a';
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(31, 0, 1, 32);
    // Subtle screw / corner rivet
    ctx.fillStyle = '#283b56';
    ctx.fillRect(3, 3, 1, 1);
    ctx.fillRect(28, 3, 1, 1);
    ctx.fillRect(3, 28, 1, 1);
    ctx.fillRect(28, 28, 1, 1);
  });

  // 2. Floor 3 Alternating Tile (Refined Inset Panel - 32 x 32 px)
  registerCanvas('tile_floor_floor3_alt', 32, 32, (ctx) => {
    ctx.fillStyle = '#0f1624';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#19263b';
    ctx.fillRect(1, 1, 30, 30);
    ctx.fillStyle = '#21324c';
    ctx.fillRect(5, 5, 10, 10);
    ctx.fillRect(17, 17, 10, 10);
    ctx.fillStyle = '#0a0f1a';
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(31, 0, 1, 32);
  });

  // 3. Floor 3 Simulation Core Zone Tile (Technical Core Plating - 32 x 32 px)
  registerCanvas('tile_floor_core_zone', 32, 32, (ctx) => {
    ctx.fillStyle = '#0d131f';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#162338';
    ctx.fillRect(1, 1, 30, 30);
    ctx.fillStyle = '#1f314d';
    ctx.fillRect(3, 3, 26, 26);
    // Subtle multi-sector data conduit hairline
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(0, 15, 32, 2);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(14, 14, 4, 4);
    ctx.fillStyle = '#0d131f';
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(31, 0, 1, 32);
  });

  // 4. Floor 3 Sector Station Zone Tile (Bay Platform - 32 x 32 px)
  registerCanvas('tile_floor_sector_zone', 32, 32, (ctx) => {
    ctx.fillStyle = '#0f1726';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#18253b';
    ctx.fillRect(1, 1, 30, 30);
    ctx.fillStyle = '#22344f';
    ctx.fillRect(2, 2, 28, 28);
    ctx.fillStyle = '#0b101c';
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(31, 0, 1, 32);
  });

  // 5. Floor 3 Ruang Simulasi Threshold Marker (32 x 32 px)
  registerCanvas('tile_floor_sim_marker', 32, 32, (ctx) => {
    ctx.fillStyle = '#101826';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#1b2a42';
    ctx.fillRect(1, 1, 30, 30);
    // Restrained cyan threshold ticks
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(4, 2, 6, 2);
    ctx.fillRect(14, 2, 6, 2);
    ctx.fillRect(24, 2, 6, 2);
    ctx.fillRect(4, 28, 6, 2);
    ctx.fillRect(14, 28, 6, 2);
    ctx.fillRect(24, 28, 6, 2);
    // Center simulation portal marking
    ctx.fillStyle = '#0369a1';
    ctx.fillRect(10, 14, 12, 4);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(12, 15, 8, 2);
  });

  // 6. Floor 3 Transit Corridor Runner (Clean Minimalist Carpet - 32 x 32 px)
  const drawFloor3Runner = (ctx) => {
    // Seamless floor base margins (y=0..4, y=27..31)
    ctx.fillStyle = '#0f1624';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#172235';
    ctx.fillRect(1, 1, 30, 4);
    ctx.fillRect(1, 27, 30, 4);
    ctx.fillStyle = '#0a0f1a';
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(31, 0, 1, 32);

    // Runner Seams & Hems (y=5..8 and y=23..26)
    ctx.fillStyle = '#0c121d';
    ctx.fillRect(0, 5, 32, 1);
    ctx.fillRect(0, 26, 32, 1);
    ctx.fillStyle = '#1e2d40';
    ctx.fillRect(0, 6, 32, 1);
    ctx.fillRect(0, 25, 32, 1);
    ctx.fillStyle = '#253952';
    ctx.fillRect(0, 7, 32, 1);
    ctx.fillRect(0, 24, 32, 1);
    // Guided Cyan Trim Pinstripe
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(0, 8, 32, 1);
    ctx.fillRect(0, 23, 32, 1);

    // Velvet Navy/Steel Carpet Bed (y=9..22, 14px height)
    ctx.fillStyle = '#121b2d';
    ctx.fillRect(0, 9, 32, 14);

    // Soft Center Walkway Shading
    ctx.fillStyle = '#16253c';
    ctx.fillRect(0, 13, 32, 6);
    ctx.fillStyle = '#1b2d49';
    ctx.fillRect(0, 15, 32, 2);

    // Micro-Weave
    ctx.fillStyle = '#182740';
    for (let px = 3; px < 32; px += 4) {
      ctx.fillRect(px, 10, 1, 12);
    }
  };

  registerCanvas('tile_floor_floor3_runner', 32, 32, drawFloor3Runner);

  // Floor 3 Runner Start (West End facing Elevator L3 - 32 x 32 px)
  registerCanvas('tile_floor_floor3_runner_start', 32, 32, (ctx) => {
    ctx.fillStyle = '#0f1624';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#172235';
    ctx.fillRect(1, 1, 30, 4);
    ctx.fillRect(1, 27, 30, 4);
    ctx.fillRect(1, 5, 3, 22);
    ctx.fillStyle = '#0a0f1a';
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(31, 0, 1, 32);

    // Horizontal Seams
    ctx.fillStyle = '#0c121d';
    ctx.fillRect(4, 5, 28, 1);
    ctx.fillRect(4, 26, 28, 1);
    ctx.fillStyle = '#1e2d40';
    ctx.fillRect(4, 6, 28, 1);
    ctx.fillRect(4, 25, 28, 1);
    ctx.fillStyle = '#253952';
    ctx.fillRect(5, 7, 27, 1);
    ctx.fillRect(5, 24, 27, 1);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(6, 8, 26, 1);
    ctx.fillRect(6, 23, 26, 1);

    // West Finished End-Cap
    ctx.fillStyle = '#0c121d';
    ctx.fillRect(3, 5, 1, 22);
    ctx.fillStyle = '#1e2d40';
    ctx.fillRect(4, 6, 1, 20);
    ctx.fillStyle = '#253952';
    ctx.fillRect(5, 7, 1, 18);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(6, 8, 1, 16);

    // Main Carpet Bed
    ctx.fillStyle = '#121b2d';
    ctx.fillRect(7, 9, 25, 14);
    ctx.fillStyle = '#16253c';
    ctx.fillRect(7, 13, 25, 6);
    ctx.fillStyle = '#1b2d49';
    ctx.fillRect(7, 15, 25, 2);

    // Subtle Elevator Cyan Glow Reflection
    ctx.fillStyle = '#1d3554';
    ctx.fillRect(7, 14, 4, 4);

    // Micro-Weave
    ctx.fillStyle = '#182740';
    for (let px = 11; px < 32; px += 4) {
      ctx.fillRect(px, 10, 1, 12);
    }
  });

  // Floor 3 Runner End (East End facing Ruang Simulasi - 32 x 32 px)
  registerCanvas('tile_floor_floor3_runner_end', 32, 32, (ctx) => {
    ctx.fillStyle = '#0f1624';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#172235';
    ctx.fillRect(1, 1, 30, 4);
    ctx.fillRect(1, 27, 30, 4);
    ctx.fillRect(28, 5, 3, 22);
    ctx.fillStyle = '#0a0f1a';
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(31, 0, 1, 32);

    // Horizontal Seams
    ctx.fillStyle = '#0c121d';
    ctx.fillRect(0, 5, 28, 1);
    ctx.fillRect(0, 26, 28, 1);
    ctx.fillStyle = '#1e2d40';
    ctx.fillRect(0, 6, 28, 1);
    ctx.fillRect(0, 25, 28, 1);
    ctx.fillStyle = '#253952';
    ctx.fillRect(0, 7, 27, 1);
    ctx.fillRect(0, 24, 27, 1);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(0, 8, 26, 1);
    ctx.fillRect(0, 23, 26, 1);

    // Main Carpet Bed
    ctx.fillStyle = '#121b2d';
    ctx.fillRect(0, 9, 25, 14);
    ctx.fillStyle = '#16253c';
    ctx.fillRect(0, 13, 25, 6);
    ctx.fillStyle = '#1b2d49';
    ctx.fillRect(0, 15, 25, 2);

    // East Finished End-Cap (Crisp cyan simulation transition)
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(25, 8, 1, 16);
    ctx.fillStyle = '#253952';
    ctx.fillRect(26, 7, 1, 18);
    ctx.fillStyle = '#1e2d40';
    ctx.fillRect(27, 6, 1, 20);
    ctx.fillStyle = '#0c121d';
    ctx.fillRect(28, 5, 1, 22);

    // Micro-Weave
    ctx.fillStyle = '#182740';
    for (let px = 3; px < 24; px += 4) {
      ctx.fillRect(px, 10, 1, 12);
    }
  });

  // 7. Elevator L3 Portal Frame ("L3 · SECTOR SIMULATION" - 64 x 48 px)
  registerCanvas('prop_elevator_l3', 64, 48, (ctx) => {
    // Brushed titanium outer frame with cyan trim
    ctx.fillStyle = '#0b111c';
    ctx.fillRect(0, 0, 64, 48);
    ctx.fillStyle = '#1a273a';
    ctx.fillRect(2, 2, 60, 44);
    ctx.fillStyle = '#283b54';
    ctx.fillRect(4, 4, 56, 40);

    // Overhead Digital Display Housing
    ctx.fillStyle = '#080c14';
    ctx.fillRect(14, 4, 36, 9);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(16, 5, 32, 7);

    // Floor Display ("L3" + Up Arrow)
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(19, 7, 4, 3); // Upward direction arrow
    ctx.fillStyle = '#38bdf8';
    // Letter "L"
    ctx.fillRect(27, 6, 2, 5);
    ctx.fillRect(27, 10, 5, 1);
    // Digit "3"
    ctx.fillRect(36, 6, 5, 1);
    ctx.fillRect(39, 7, 2, 1);
    ctx.fillRect(37, 8, 4, 1);
    ctx.fillRect(39, 9, 2, 1);
    ctx.fillRect(36, 10, 5, 1);

    // Sliding Brushed Metal Doors
    ctx.fillStyle = '#324155';
    ctx.fillRect(6, 14, 25, 33);
    ctx.fillRect(33, 14, 25, 33);
    ctx.fillStyle = '#44566f';
    ctx.fillRect(8, 16, 21, 29);
    ctx.fillRect(35, 16, 21, 29);
    ctx.fillStyle = '#596e8d';
    ctx.fillRect(10, 18, 8, 25);
    ctx.fillRect(37, 18, 8, 25);

    // Center seam & shadow
    ctx.fillStyle = '#090d16';
    ctx.fillRect(31, 14, 2, 33);

    // Access panel on right frame with illuminated cyan LED
    ctx.fillStyle = '#080d16';
    ctx.fillRect(59, 22, 4, 10);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(60, 24, 2, 2); // Lit cyan call LED
    ctx.fillStyle = '#64748b';
    ctx.fillRect(60, 28, 2, 2);

    // Bottom Safety Threshold
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(6, 46, 52, 2);
  });

  // 8. Sector Stations (Five distinct stations with shared sleek architectural base - 32 x 36 px)
  const drawBaseStation = (ctx, accentColor, ledColor, detailFn) => {
    // Desk shadow
    ctx.fillStyle = '#070b13';
    ctx.fillRect(2, 34, 28, 2);

    // Workstation Body (Sleek steel desk)
    ctx.fillStyle = '#101827';
    ctx.fillRect(2, 16, 28, 18);
    ctx.fillStyle = '#1e2c40';
    ctx.fillRect(3, 17, 26, 16);
    ctx.fillStyle = '#2b3f5c';
    ctx.fillRect(3, 17, 26, 3); // Desk top bevel

    // Distinctive Sector Accent Strip
    ctx.fillStyle = accentColor;
    ctx.fillRect(3, 20, 26, 2);

    // Monitor Stand
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(14, 12, 4, 5);

    // Monitor Bezel (Upper Screen, y=2..12)
    ctx.fillStyle = '#0a0f1d';
    ctx.fillRect(6, 2, 20, 11);
    ctx.fillStyle = '#0f1829';
    ctx.fillRect(7, 3, 18, 9);

    // Terminal Screen Background
    ctx.fillStyle = '#131e33';
    ctx.fillRect(8, 4, 16, 7);

    // Custom Sector Telemetry Detail inside Monitor
    detailFn(ctx);

    // Status Indicator LED on bezel corner
    ctx.fillStyle = ledColor;
    ctx.fillRect(23, 3, 1, 1);

    // Keyboard & telemetry pad on desk surface
    ctx.fillStyle = '#182438';
    ctx.fillRect(9, 24, 14, 4);
    ctx.fillStyle = accentColor;
    ctx.fillRect(10, 25, 4, 2); // Mini activity strip
  };

  // Station 01: UNIVERSITAS (Accent: Blue / Cyan)
  registerCanvas('prop_station_universitas', 32, 36, (ctx) => {
    drawBaseStation(ctx, '#0284c7', '#38bdf8', (c) => {
      // Academic network graph & document telemetry
      c.fillStyle = '#38bdf8';
      c.fillRect(9, 5, 6, 2);
      c.fillRect(9, 8, 10, 1);
      c.fillRect(16, 5, 2, 2);
      c.fillStyle = '#60a5fa';
      c.fillRect(19, 6, 3, 3);
    });
  });

  // Station 02: RUMAH SAKIT (Accent: Muted Teal)
  registerCanvas('prop_station_rumahsakit', 32, 36, (ctx) => {
    drawBaseStation(ctx, '#0d9488', '#2dd4bf', (c) => {
      // Clinical pulse & hospital patient telemetry
      c.fillStyle = '#2dd4bf';
      c.fillRect(9, 7, 3, 1);
      c.fillRect(12, 5, 2, 4);
      c.fillRect(14, 8, 2, 2);
      c.fillRect(16, 6, 3, 1);
      c.fillStyle = '#14b8a6';
      c.fillRect(20, 5, 2, 2);
    });
  });

  // Station 03: PERBANKAN (Accent: Muted Amber / Soft Gold)
  registerCanvas('prop_station_perbankan', 32, 36, (ctx) => {
    drawBaseStation(ctx, '#d97706', '#fbbf24', (c) => {
      // Secure ledger transactions & bar graphs
      c.fillStyle = '#fbbf24';
      c.fillRect(9, 8, 3, 2);
      c.fillRect(13, 6, 3, 4);
      c.fillRect(17, 5, 3, 5);
      c.fillStyle = '#f59e0b';
      c.fillRect(9, 5, 2, 2);
    });
  });

  // Station 04: E-COMMERCE (Accent: Muted Violet)
  registerCanvas('prop_station_ecommerce', 32, 36, (ctx) => {
    drawBaseStation(ctx, '#7c3aed', '#a78bfa', (c) => {
      // Digital marketplace & order stream stream telemetry
      c.fillStyle = '#a78bfa';
      c.fillRect(9, 6, 4, 3);
      c.fillRect(15, 6, 6, 1);
      c.fillRect(15, 8, 6, 1);
      c.fillStyle = '#c4b5fd';
      c.fillRect(10, 7, 2, 1);
    });
  });

  // Station 05: PEMERINTAHAN (Accent: Muted Green)
  registerCanvas('prop_station_pemerintahan', 32, 36, (ctx) => {
    drawBaseStation(ctx, '#16a34a', '#4ade80', (c) => {
      // Civic public service infrastructure pillars & data flow
      c.fillStyle = '#4ade80';
      c.fillRect(9, 6, 2, 4);
      c.fillRect(13, 6, 2, 4);
      c.fillRect(17, 6, 2, 4);
      c.fillRect(9, 5, 10, 1); // Header pediment
      c.fillStyle = '#22c55e';
      c.fillRect(20, 8, 2, 2);
    });
  });

  // 9. Sector Simulation Core (Low-profile central analysis table - 56 x 36 px)
  registerCanvas('prop_simulation_core', 56, 36, (ctx) => {
    // Ground Shadow
    ctx.fillStyle = '#060a12';
    ctx.fillRect(2, 34, 52, 2);

    // Outer Console Base
    ctx.fillStyle = '#0d1522';
    ctx.fillRect(2, 14, 52, 20);
    ctx.fillStyle = '#17253b';
    ctx.fillRect(4, 15, 48, 18);
    ctx.fillStyle = '#263b5b';
    ctx.fillRect(4, 15, 48, 4); // Top edge rim

    // Recessed Central Multi-Sector Simulation Chamber (Horizontal glass bed)
    ctx.fillStyle = '#0a101a';
    ctx.fillRect(8, 6, 40, 10);
    ctx.fillStyle = '#121e30';
    ctx.fillRect(9, 7, 38, 8);

    // 5 Sector Telemetry Nodes inside Core Screen:
    // 1: Universitas (Cyan)
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(11, 10, 4, 3);
    // 2: Rumah Sakit (Teal)
    ctx.fillStyle = '#2dd4bf';
    ctx.fillRect(19, 9, 4, 4);
    // 3: Perbankan (Amber)
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(26, 8, 4, 5);
    // 4: E-Commerce (Violet)
    ctx.fillStyle = '#a78bfa';
    ctx.fillRect(34, 9, 4, 4);
    // 5: Pemerintahan (Green)
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(41, 10, 4, 3);

    // Connecting Data Bus Line
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(11, 13, 34, 1);

    // Lower Front Panel Status Indicators
    ctx.fillStyle = '#0d131f';
    ctx.fillRect(8, 21, 40, 8);
    ctx.fillStyle = '#18273d';
    ctx.fillRect(9, 22, 38, 6);

    // 5 Status LEDs on Front Panel
    ctx.fillStyle = '#38bdf8'; ctx.fillRect(12, 24, 2, 2);
    ctx.fillStyle = '#2dd4bf'; ctx.fillRect(19, 24, 2, 2);
    ctx.fillStyle = '#fbbf24'; ctx.fillRect(27, 24, 2, 2);
    ctx.fillStyle = '#a78bfa'; ctx.fillRect(35, 24, 2, 2);
    ctx.fillStyle = '#4ade80'; ctx.fillRect(42, 24, 2, 2);
  });

  // 10. Ruang Simulasi Door (Primary Focal Destination - 60 x 48 px)
  const drawRuangSimulasiDoor = (ctx, completed) => {
    // Outer Architectural Frame
    ctx.fillStyle = '#080d16';
    ctx.fillRect(0, 0, 60, 48);
    ctx.fillStyle = '#172336';
    ctx.fillRect(2, 2, 56, 44);
    ctx.fillStyle = '#253852';
    ctx.fillRect(4, 4, 52, 40);

    // Overhead Status Indicator Marquee
    ctx.fillStyle = '#080c14';
    ctx.fillRect(8, 4, 44, 9);
    ctx.fillStyle = '#0f1728';
    ctx.fillRect(10, 5, 40, 7);

    // Plaque Text: "SIMULASI SIAP" vs "SELESAI ✓"
    const statusLedColor = completed ? '#22c55e' : '#38bdf8';
    ctx.fillStyle = statusLedColor;
    ctx.fillRect(13, 7, 3, 3); // Left Status Beacon

    ctx.fillStyle = completed ? '#4ade80' : '#38bdf8';
    // Clean block text representation
    ctx.fillRect(18, 7, 28, 3);
    if (completed) {
      // Checkmark tick
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(48, 6, 2, 2);
      ctx.fillRect(50, 8, 2, 2);
    }

    // Sliding Simulation Air-Lock Doors
    ctx.fillStyle = '#1e2c3f';
    ctx.fillRect(6, 14, 23, 32);
    ctx.fillRect(31, 14, 23, 32);
    ctx.fillStyle = '#2b3e58';
    ctx.fillRect(8, 16, 19, 28);
    ctx.fillRect(33, 16, 19, 28);
    ctx.fillStyle = '#3a5273';
    ctx.fillRect(10, 18, 15, 24);
    ctx.fillRect(35, 18, 15, 24);

    // Multi-Sector Indicator Vertical Strip on Doors
    const sectorColors = ['#38bdf8', '#2dd4bf', '#fbbf24', '#a78bfa', '#4ade80'];
    sectorColors.forEach((col, idx) => {
      ctx.fillStyle = col;
      ctx.fillRect(12, 20 + idx * 4, 3, 2);
      ctx.fillRect(45, 20 + idx * 4, 3, 2);
    });

    // Center Seam & Recessed Shadow
    ctx.fillStyle = '#080d16';
    ctx.fillRect(29, 14, 2, 32);

    // Wall Access Terminal on right jamb
    ctx.fillStyle = '#0a101b';
    ctx.fillRect(55, 20, 4, 12);
    ctx.fillStyle = statusLedColor;
    ctx.fillRect(56, 22, 2, 2);
    ctx.fillStyle = '#64748b';
    ctx.fillRect(56, 26, 2, 2);

    // Floor Threshold Line
    ctx.fillStyle = completed ? '#059669' : '#0284c7';
    ctx.fillRect(6, 46, 48, 2);
  };

  registerCanvas('prop_door_simulasi', 60, 48, (ctx) => drawRuangSimulasiDoor(ctx, false));
  registerCanvas('prop_door_simulasi_complete', 60, 48, (ctx) => drawRuangSimulasiDoor(ctx, true));

  // 11. Ruang Simulasi Progression Glows (64 x 32 px)
  registerCanvas('prop_door_simulasi_glow', 64, 32, (ctx) => {
    const grad = ctx.createRadialGradient(32, 16, 2, 32, 16, 30);
    grad.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
    grad.addColorStop(0.5, 'rgba(2, 132, 199, 0.2)');
    grad.addColorStop(1, 'rgba(2, 132, 199, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 32);
  });

  registerCanvas('prop_door_simulasi_glow_complete', 64, 32, (ctx) => {
    const grad = ctx.createRadialGradient(32, 16, 2, 32, 16, 30);
    grad.addColorStop(0, 'rgba(74, 222, 128, 0.4)');
    grad.addColorStop(0.5, 'rgba(16, 185, 129, 0.18)');
    grad.addColorStop(1, 'rgba(16, 185, 129, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 32);
  });

  // 12. NPC 01: Analis Sektor (Smart corporate navy suit with amber ID badge - 24 x 32 px)
  registerCanvas('npc_analis_sektor', 24, 32, (ctx) => {
    // Hair
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(6, 3, 12, 5);
    // Face
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(7, 7, 10, 6);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(8, 9, 2, 2);
    ctx.fillRect(14, 9, 2, 2);
    // Glasses (Gold frame)
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(7, 8, 4, 1);
    ctx.fillRect(13, 8, 4, 1);
    ctx.fillRect(11, 9, 2, 1);
    // Suit (Deep navy/cyan corporate jacket)
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(6, 13, 12, 8);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(10, 13, 4, 6);
    ctx.fillStyle = '#0284c7'; // Tie
    ctx.fillRect(11, 15, 2, 4);
    // Amber/Gold ID badge
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(7, 15, 2, 3);
    // Arms
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(4, 14, 2, 6);
    ctx.fillRect(18, 14, 2, 6);
    // Pants & shoes
    ctx.fillStyle = '#334155';
    ctx.fillRect(7, 22, 4, 7);
    ctx.fillRect(13, 22, 4, 7);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(6, 29, 5, 3);
    ctx.fillRect(13, 29, 5, 3);
  });

  // 13. NPC 02: Koordinator Simulasi (Structured teal/slate lab jacket with comms headset - 24 x 32 px)
  registerCanvas('npc_koordinator_simulasi', 24, 32, (ctx) => {
    // Hair
    ctx.fillStyle = '#334155';
    ctx.fillRect(6, 3, 12, 5);
    // Comms headset
    ctx.fillStyle = '#2dd4bf';
    ctx.fillRect(4, 5, 2, 4);
    ctx.fillRect(6, 4, 12, 1);
    // Face
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(7, 7, 10, 6);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(8, 9, 2, 2);
    ctx.fillRect(14, 9, 2, 2);
    // Uniform (Slate-teal coordinator coat)
    ctx.fillStyle = '#134e4a';
    ctx.fillRect(6, 13, 12, 8);
    ctx.fillStyle = '#0d9488';
    ctx.fillRect(7, 14, 10, 6);
    ctx.fillStyle = '#2dd4bf'; // Sector coordinator badge
    ctx.fillRect(8, 15, 3, 3);
    // Holding data tablet
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(4, 16, 5, 7);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(5, 17, 3, 5);
    // Right arm
    ctx.fillStyle = '#134e4a';
    ctx.fillRect(18, 14, 2, 6);
    // Pants & shoes
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(7, 22, 4, 7);
    ctx.fillRect(13, 22, 4, 7);
    ctx.fillStyle = '#090d16';
    ctx.fillRect(6, 29, 5, 3);
    ctx.fillRect(13, 29, 5, 3);
  });

  // 14. North Wall Header Marquee ("SECTOR SIMULATION CENTER" - 144 x 24 px)
  registerCanvas('prop_secsim_header', 144, 24, (ctx) => {
    // Dark metallic chassis
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, 144, 24);
    ctx.fillStyle = '#162235';
    ctx.fillRect(2, 2, 140, 20);
    ctx.fillStyle = '#253852';
    ctx.fillRect(4, 4, 136, 16);

    // Inner Display Screen
    ctx.fillStyle = '#090e18';
    ctx.fillRect(8, 6, 128, 12);

    // Subtle Cyan Architectural Marquee Bars
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(12, 8, 4, 8);
    ctx.fillRect(128, 8, 4, 8);

    // Center illuminated text bar
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(20, 10, 104, 4);

    // 5 Sector mini LED cluster on header
    ctx.fillStyle = '#38bdf8'; ctx.fillRect(44, 8, 2, 1);
    ctx.fillStyle = '#2dd4bf'; ctx.fillRect(54, 8, 2, 1);
    ctx.fillStyle = '#fbbf24'; ctx.fillRect(64, 8, 2, 1);
    ctx.fillStyle = '#a78bfa'; ctx.fillRect(74, 8, 2, 1);
    ctx.fillStyle = '#4ade80'; ctx.fillRect(84, 8, 2, 1);
  });

  // 15. Sector Directory Kiosk (Standing pedestal - 24 x 28 px)
  registerCanvas('prop_secsim_directory', 24, 28, (ctx) => {
    // Pedestal base
    ctx.fillStyle = '#0a0f1a';
    ctx.fillRect(4, 24, 16, 4);
    ctx.fillStyle = '#162338';
    ctx.fillRect(9, 14, 6, 10);
    // Angled Screen Head
    ctx.fillStyle = '#101827';
    ctx.fillRect(2, 2, 20, 14);
    ctx.fillStyle = '#1e2c40';
    ctx.fillRect(3, 3, 18, 12);
    ctx.fillStyle = '#090e18';
    ctx.fillRect(5, 5, 14, 8);
    // Cyan map nodes
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(7, 7, 2, 2);
    ctx.fillRect(15, 7, 2, 2);
    ctx.fillRect(11, 9, 2, 2);
    ctx.fillRect(7, 11, 2, 2);
    ctx.fillRect(15, 11, 2, 2);
  });

  // 16. Minimalist Indoor Plants & Benches
  registerCanvas('prop_floor3_plant', 16, 24, (ctx) => {
    // Geometric square planter
    ctx.fillStyle = '#090d16';
    ctx.fillRect(2, 14, 12, 10);
    ctx.fillStyle = '#1e2d42';
    ctx.fillRect(3, 15, 10, 8);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(3, 15, 10, 1); // Subtle cyan trim on pot
    // Architectural leaves
    ctx.fillStyle = '#065f46';
    ctx.fillRect(4, 6, 8, 9);
    ctx.fillStyle = '#059669';
    ctx.fillRect(3, 4, 4, 8);
    ctx.fillRect(9, 4, 4, 8);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(6, 2, 4, 6);
  });

  registerCanvas('prop_floor3_bench', 32, 16, (ctx) => {
    // Steel bench shadow
    ctx.fillStyle = '#070b13';
    ctx.fillRect(2, 14, 28, 2);
    // Legs
    ctx.fillStyle = '#101827';
    ctx.fillRect(4, 8, 3, 7);
    ctx.fillRect(25, 8, 3, 7);
    // Seat Cushion (Deep navy velvet)
    ctx.fillStyle = '#1e2c40';
    ctx.fillRect(2, 4, 28, 6);
    ctx.fillStyle = '#263a56';
    ctx.fillRect(3, 3, 26, 3);
    ctx.fillStyle = '#0369a1';
    ctx.fillRect(3, 8, 26, 1); // Cyan accent seam
  });

  // =========================================================================
  // LANTAI 4 · TRADE-OFF ANALYSIS TEXTURES (Executive, balanced, restrained)
  // =========================================================================

  // 1. Floor 4 Base Tile (Refined Executive Ceramic-Slate - 32 x 32 px)
  registerCanvas('tile_floor_floor4', 32, 32, (ctx) => {
    ctx.fillStyle = '#0c121e';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#131c2c';
    ctx.fillRect(1, 1, 30, 30);
    ctx.fillStyle = '#182438';
    ctx.fillRect(3, 3, 26, 26);
    ctx.fillStyle = '#080d17';
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(31, 0, 1, 32);
    // Subtle executive corner rivets
    ctx.fillStyle = '#22324c';
    ctx.fillRect(3, 3, 1, 1);
    ctx.fillRect(28, 3, 1, 1);
    ctx.fillRect(3, 28, 1, 1);
    ctx.fillRect(28, 28, 1, 1);
  });

  // 2. Floor 4 Alternating Tile (Polished Modular Inset - 32 x 32 px)
  registerCanvas('tile_floor_floor4_alt', 32, 32, (ctx) => {
    ctx.fillStyle = '#0c121e';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#151e30';
    ctx.fillRect(1, 1, 30, 30);
    ctx.fillStyle = '#1c283f';
    ctx.fillRect(5, 5, 22, 22);
    ctx.fillStyle = '#121b2b';
    ctx.fillRect(7, 7, 18, 18);
    ctx.fillStyle = '#080d17';
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(31, 0, 1, 32);
  });

  // 3. Floor 4 Keunggulan Zone Tile (Subtle Teal Accent Hairline - 32 x 32 px)
  registerCanvas('tile_floor_keunggulan_zone', 32, 32, (ctx) => {
    ctx.fillStyle = '#0c1320';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#142033';
    ctx.fillRect(1, 1, 30, 30);
    ctx.fillStyle = '#1b2a42';
    ctx.fillRect(3, 3, 26, 26);
    // Restrained teal accent corner ticks (not dominant)
    ctx.fillStyle = '#0d9488';
    ctx.fillRect(4, 4, 3, 1);
    ctx.fillRect(4, 4, 1, 3);
    ctx.fillRect(25, 4, 3, 1);
    ctx.fillRect(27, 4, 1, 3);
    ctx.fillRect(4, 27, 3, 1);
    ctx.fillRect(4, 25, 1, 3);
    ctx.fillRect(25, 27, 3, 1);
    ctx.fillRect(27, 25, 1, 3);
    ctx.fillStyle = '#080d17';
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(31, 0, 1, 32);
  });

  // 4. Floor 4 Keterbatasan Zone Tile (Subtle Amber Accent Hairline - 32 x 32 px)
  registerCanvas('tile_floor_keterbatasan_zone', 32, 32, (ctx) => {
    ctx.fillStyle = '#0c1320';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#142033';
    ctx.fillRect(1, 1, 30, 30);
    ctx.fillStyle = '#1b2a42';
    ctx.fillRect(3, 3, 26, 26);
    // Restrained amber accent corner ticks (not dominant)
    ctx.fillStyle = '#d97706';
    ctx.fillRect(4, 4, 3, 1);
    ctx.fillRect(4, 4, 1, 3);
    ctx.fillRect(25, 4, 3, 1);
    ctx.fillRect(27, 4, 1, 3);
    ctx.fillRect(4, 27, 3, 1);
    ctx.fillRect(4, 25, 1, 3);
    ctx.fillRect(25, 27, 3, 1);
    ctx.fillRect(27, 25, 1, 3);
    ctx.fillStyle = '#080d17';
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(31, 0, 1, 32);
  });

  // 5. Floor 4 Transit Corridor Runner (Minimalist, dark navy/steel, restrained cyan edges - 32 x 32 px)
  const drawFloor4Runner = (ctx) => {
    // Seamless background base margins
    ctx.fillStyle = '#0c121e';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#131c2c';
    ctx.fillRect(1, 1, 30, 4);
    ctx.fillRect(1, 27, 30, 4);
    ctx.fillStyle = '#080d17';
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(31, 0, 1, 32);

    // Deep navy runner carpet (y=5..26)
    ctx.fillStyle = '#080d18';
    ctx.fillRect(0, 5, 32, 22);
    ctx.fillStyle = '#0e1728';
    ctx.fillRect(0, 7, 32, 18);
    ctx.fillStyle = '#142036';
    ctx.fillRect(0, 9, 32, 14);

    // Restrained cyan outer piping (1px hairline)
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(0, 5, 32, 1);
    ctx.fillRect(0, 26, 32, 1);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(0, 6, 32, 1);
    ctx.fillRect(0, 25, 32, 1);

    // Subtle micro texture weave (no arrows, no numbers, no symbols)
    ctx.fillStyle = '#182740';
    for (let x = 3; x < 32; x += 8) {
      ctx.fillRect(x, 12, 4, 8);
    }
  };

  registerCanvas('tile_floor_floor4_runner', 32, 32, drawFloor4Runner);

  registerCanvas('tile_floor_floor4_runner_start', 32, 32, (ctx) => {
    drawFloor4Runner(ctx);
    // Rounded / beveled cap at elevator entrance (West side)
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(2, 6, 2, 20);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(4, 7, 2, 18);
    // Fade out to floor base
    ctx.fillStyle = '#0c121e';
    ctx.fillRect(0, 5, 2, 22);
  });

  registerCanvas('tile_floor_floor4_runner_end', 32, 32, (ctx) => {
    drawFloor4Runner(ctx);
    // Clean threshold cap at Ruang Keputusan entrance (East side)
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(28, 6, 2, 20);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(26, 7, 2, 18);
    // Subtle dual micro-accent dots (Teal top, Amber bottom)
    ctx.fillStyle = '#14b8a6';
    ctx.fillRect(25, 9, 2, 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(25, 21, 2, 2);
    // Fade out to floor base
    ctx.fillStyle = '#0c121e';
    ctx.fillRect(30, 5, 2, 22);
  });

  // 6. Floor 4 Elevator ("L4 · TRADE-OFF ANALYSIS" - 64 x 48 px)
  registerCanvas('prop_elevator_l4', 64, 48, (ctx) => {
    // Brushed titanium/navy outer frame
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, 64, 48);
    ctx.fillStyle = '#162234';
    ctx.fillRect(2, 2, 60, 44);
    ctx.fillStyle = '#23334d';
    ctx.fillRect(4, 4, 56, 40);

    // Overhead Digital Display Housing
    ctx.fillStyle = '#080c14';
    ctx.fillRect(14, 4, 36, 9);
    ctx.fillStyle = '#0f1728';
    ctx.fillRect(16, 5, 32, 7);

    // Floor Display ("L4" in illuminated cyan + subtle status beacon)
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(18, 7, 3, 3); // Left status LED

    // Pixel Letter "L"
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(25, 6, 2, 5);
    ctx.fillRect(25, 10, 5, 1);

    // Pixel Digit "4"
    ctx.fillRect(34, 6, 1, 3);
    ctx.fillRect(34, 8, 5, 1);
    ctx.fillRect(37, 6, 1, 5);

    // Right status accent (Trade-Off balanced cyan/amber indicator)
    ctx.fillStyle = '#14b8a6';
    ctx.fillRect(44, 7, 2, 3);

    // Sliding Double Metal Doors (Deep steel-slate)
    ctx.fillStyle = '#1e2c40';
    ctx.fillRect(6, 14, 25, 32);
    ctx.fillRect(33, 14, 25, 32);

    // Inner Door Panels
    ctx.fillStyle = '#2a3c57';
    ctx.fillRect(8, 16, 21, 28);
    ctx.fillRect(35, 16, 21, 28);

    // Recessed center vertical ribbing
    ctx.fillStyle = '#3b5173';
    ctx.fillRect(10, 18, 8, 24);
    ctx.fillRect(37, 18, 8, 24);

    // Center seam & shadow
    ctx.fillStyle = '#080c14';
    ctx.fillRect(31, 14, 2, 32);

    // Horizontal architectural bevel grooves
    ctx.fillStyle = '#172338';
    ctx.fillRect(8, 26, 21, 1);
    ctx.fillRect(35, 26, 21, 1);
    ctx.fillStyle = '#3d5477';
    ctx.fillRect(8, 27, 21, 1);
    ctx.fillRect(35, 27, 21, 1);

    // Call button panel on right frame
    ctx.fillStyle = '#0b111c';
    ctx.fillRect(59, 22, 4, 10);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(60, 24, 2, 2); // Lit cyan call button
    ctx.fillStyle = '#64748b';
    ctx.fillRect(60, 28, 2, 2);

    // Bottom Safety Threshold & Grounding Base
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(6, 45, 52, 2);
    ctx.fillStyle = '#090d16';
    ctx.fillRect(4, 47, 56, 1);
  });

  // Floor 4 Elevator Subtle Floor Highlight (Non-portal, soft threshold glow - 40 x 14 px)
  registerCanvas('prop_elevator_l4_glow', 40, 14, (ctx) => {
    ctx.clearRect(0, 0, 40, 14);
    const grad = ctx.createRadialGradient(20, 7, 1, 20, 7, 18);
    grad.addColorStop(0, 'rgba(56, 189, 248, 0.35)');
    grad.addColorStop(0.5, 'rgba(2, 132, 199, 0.12)');
    grad.addColorStop(1, 'rgba(2, 132, 199, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(20, 7, 18, 6, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  // 7. Decision Analysis Table (Central Anchor - 56 x 28 px)
  registerCanvas('prop_table_decision_analysis', 56, 28, (ctx) => {
    // Base shadow
    ctx.fillStyle = '#060910';
    ctx.fillRect(2, 22, 52, 6);

    // Structural legs / pedestal
    ctx.fillStyle = '#0c121e';
    ctx.fillRect(6, 14, 8, 11);
    ctx.fillRect(42, 14, 8, 11);
    ctx.fillStyle = '#151e30';
    ctx.fillRect(7, 15, 6, 9);
    ctx.fillRect(43, 15, 6, 9);
    // Center cable conduit
    ctx.fillStyle = '#0e1726';
    ctx.fillRect(25, 15, 6, 9);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(27, 16, 2, 7);

    // Main Table Top (Sleek slate-navy executive surface)
    ctx.fillStyle = '#0c1320';
    ctx.fillRect(0, 2, 56, 14);
    ctx.fillStyle = '#162234';
    ctx.fillRect(1, 3, 54, 12);
    ctx.fillStyle = '#1f2e46';
    ctx.fillRect(2, 4, 52, 10);
    ctx.fillStyle = '#283c5a';
    ctx.fillRect(3, 4, 50, 2);

    // Left Console Bay: KEUNGGULAN Input / Display (Teal accent)
    ctx.fillStyle = '#0b1420';
    ctx.fillRect(6, 7, 14, 6);
    ctx.fillStyle = '#0d9488';
    ctx.fillRect(7, 8, 12, 1);
    ctx.fillStyle = '#14b8a6';
    ctx.fillRect(7, 10, 8, 2);
    ctx.fillStyle = '#2dd4bf';
    ctx.fillRect(16, 10, 2, 2);

    // Right Console Bay: KETERBATASAN Input / Display (Amber accent)
    ctx.fillStyle = '#0b1420';
    ctx.fillRect(36, 7, 14, 6);
    ctx.fillStyle = '#d97706';
    ctx.fillRect(37, 8, 12, 1);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(37, 10, 8, 2);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(46, 10, 2, 2);

    // Center Balance Indicator Screen
    ctx.fillStyle = '#070c14';
    ctx.fillRect(23, 6, 10, 7);
    ctx.fillStyle = '#0369a1';
    ctx.fillRect(24, 7, 8, 1);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(26, 9, 4, 2);
    // Tiny balance needle
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(27, 8, 2, 4);
  });

  // 8. Ruang Keputusan Door (East Wall - PRIMARY FOCAL DESTINATION - 64 x 48 px)
  const drawRuangKeputusanDoor = (ctx, completed) => {
    // Outer Architectural Frame (Anchored firmly into the wall)
    ctx.fillStyle = '#070a12';
    ctx.fillRect(0, 0, 64, 48);
    ctx.fillStyle = '#141d2e';
    ctx.fillRect(2, 2, 60, 44);
    ctx.fillStyle = '#22314a';
    ctx.fillRect(4, 4, 56, 40);

    // Vertical Trade-Off Architectural Trim on side jambs
    // Left jamb: subtle teal accent
    ctx.fillStyle = completed ? '#059669' : '#0d9488';
    ctx.fillRect(4, 6, 2, 38);
    ctx.fillStyle = completed ? '#10b981' : '#14b8a6';
    ctx.fillRect(5, 10, 1, 30);

    // Right jamb: subtle amber accent (or emerald when completed)
    ctx.fillStyle = completed ? '#059669' : '#b45309';
    ctx.fillRect(58, 6, 2, 38);
    ctx.fillStyle = completed ? '#10b981' : '#f59e0b';
    ctx.fillRect(58, 10, 1, 30);

    // Overhead Header Sign Housing
    ctx.fillStyle = '#080c14';
    ctx.fillRect(10, 4, 44, 9);
    ctx.fillStyle = '#0f1828';
    ctx.fillRect(12, 5, 40, 7);

    // Header Sign Title: "RUANG KEPUTUSAN"
    ctx.fillStyle = completed ? '#34d399' : '#38bdf8';
    ctx.fillRect(16, 7, 28, 2);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(20, 10, 20, 1);

    // Heavy Double Security Blast Doors
    ctx.fillStyle = '#182335';
    ctx.fillRect(6, 14, 25, 31);
    ctx.fillRect(33, 14, 25, 31);
    ctx.fillStyle = '#25364f';
    ctx.fillRect(8, 16, 21, 27);
    ctx.fillRect(35, 16, 21, 27);

    // Center Door Seam & Recessed Shadow
    ctx.fillStyle = '#080c13';
    ctx.fillRect(31, 14, 2, 31);

    // Narrow Viewports with Trade-Off Telemetry
    ctx.fillStyle = '#090e17';
    ctx.fillRect(11, 18, 15, 6);
    ctx.fillRect(38, 18, 15, 6);

    // Telemetry lines inside viewports:
    // Left: Teal (Keunggulan), Right: Amber (Keterbatasan)
    // On completed: calm Emerald
    ctx.fillStyle = completed ? '#10b981' : '#14b8a6';
    ctx.fillRect(13, 20, 11, 2);
    ctx.fillStyle = completed ? '#10b981' : '#f59e0b';
    ctx.fillRect(40, 20, 11, 2);

    // Status Badge Plaque (Small, restrained status indicator - non-dominating!)
    // "ANALISIS SIAP" before completion, "ANALISIS SELESAI ✓" after completion
    ctx.fillStyle = '#0b101c';
    ctx.fillRect(14, 28, 36, 6);

    if (completed) {
      // "ANALISIS SELESAI ✓" representation
      ctx.fillStyle = '#10b981';
      ctx.fillRect(17, 30, 24, 2);
      // Small checkmark tick '✓'
      ctx.fillStyle = '#34d399';
      ctx.fillRect(43, 30, 2, 3);
      ctx.fillRect(45, 29, 2, 4);
    } else {
      // "ANALISIS SIAP" representation
      ctx.fillStyle = '#14b8a6';
      ctx.fillRect(16, 30, 2, 2); // Teal beacon
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(20, 30, 24, 2); // Text strip
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(46, 30, 2, 2); // Amber beacon
    }

    // Access Terminal Keypad (Right Jamb)
    ctx.fillStyle = '#0a101b';
    ctx.fillRect(59, 22, 4, 11);
    ctx.fillStyle = completed ? '#22c55e' : '#14b8a6';
    ctx.fillRect(60, 24, 2, 3);
    ctx.fillStyle = '#64748b';
    ctx.fillRect(60, 29, 2, 2);

    // Bottom Grounding Base & Safety Threshold
    ctx.fillStyle = completed ? '#059669' : '#0284c7';
    ctx.fillRect(6, 45, 52, 2);
    ctx.fillStyle = '#070a12';
    ctx.fillRect(4, 47, 56, 1);
  };

  registerCanvas('prop_door_keputusan', 64, 48, (ctx) => drawRuangKeputusanDoor(ctx, false));
  registerCanvas('prop_door_keputusan_complete', 64, 48, (ctx) => drawRuangKeputusanDoor(ctx, true));

  // 10. Ruang Keputusan Floor Highlight (Subtle, non-portal threshold glow - 48 x 16 px)
  registerCanvas('prop_door_keputusan_glow', 48, 16, (ctx) => {
    ctx.clearRect(0, 0, 48, 16);
    const grad = ctx.createRadialGradient(24, 8, 1, 24, 8, 22);
    grad.addColorStop(0, 'rgba(20, 184, 166, 0.35)');
    grad.addColorStop(0.5, 'rgba(2, 132, 199, 0.12)');
    grad.addColorStop(1, 'rgba(2, 132, 199, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(24, 8, 22, 7, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  registerCanvas('prop_door_keputusan_glow_complete', 48, 16, (ctx) => {
    ctx.clearRect(0, 0, 48, 16);
    const grad = ctx.createRadialGradient(24, 8, 1, 24, 8, 22);
    grad.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
    grad.addColorStop(0.5, 'rgba(5, 150, 105, 0.12)');
    grad.addColorStop(1, 'rgba(5, 150, 105, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(24, 8, 22, 7, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  // 11. Educational Terminal - KEUNGGULAN (Compact, Teal Accent - 26 x 24 px)
  registerCanvas('prop_terminal_keunggulan', 26, 24, (ctx) => {
    // Stand Shadow
    ctx.fillStyle = '#060910';
    ctx.fillRect(2, 20, 22, 4);

    // Pedestal
    ctx.fillStyle = '#0f1726';
    ctx.fillRect(8, 14, 10, 7);
    ctx.fillStyle = '#162338';
    ctx.fillRect(9, 15, 8, 5);

    // Monitor Housing
    ctx.fillStyle = '#0b121e';
    ctx.fillRect(2, 2, 22, 13);
    ctx.fillStyle = '#162234';
    ctx.fillRect(3, 3, 20, 11);
    ctx.fillStyle = '#1f2e46';
    ctx.fillRect(4, 4, 18, 9);

    // Screen (Dark teal-slate)
    ctx.fillStyle = '#061318';
    ctx.fillRect(5, 5, 16, 7);

    // Teal Top Header Accent Strip
    ctx.fillStyle = '#0d9488';
    ctx.fillRect(5, 5, 16, 1);

    // Active Data Wave / Line
    ctx.fillStyle = '#2dd4bf';
    ctx.fillRect(6, 8, 8, 1);
    ctx.fillRect(10, 9, 6, 1);
    ctx.fillRect(7, 10, 10, 1);

    // Mini LED on frame
    ctx.fillStyle = '#14b8a6';
    ctx.fillRect(19, 3, 2, 1);
  });

  // 12. Educational Terminal - KETERBATASAN (Compact, Amber Accent - 26 x 24 px)
  registerCanvas('prop_terminal_keterbatasan', 26, 24, (ctx) => {
    // Stand Shadow
    ctx.fillStyle = '#060910';
    ctx.fillRect(2, 20, 22, 4);

    // Pedestal
    ctx.fillStyle = '#0f1726';
    ctx.fillRect(8, 14, 10, 7);
    ctx.fillStyle = '#162338';
    ctx.fillRect(9, 15, 8, 5);

    // Monitor Housing
    ctx.fillStyle = '#0b121e';
    ctx.fillRect(2, 2, 22, 13);
    ctx.fillStyle = '#162234';
    ctx.fillRect(3, 3, 20, 11);
    ctx.fillStyle = '#1f2e46';
    ctx.fillRect(4, 4, 18, 9);

    // Screen (Dark amber-slate)
    ctx.fillStyle = '#140e04';
    ctx.fillRect(5, 5, 16, 7);

    // Amber Top Header Accent Strip
    ctx.fillStyle = '#d97706';
    ctx.fillRect(5, 5, 16, 1);

    // Active Data Wave / Line
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(6, 8, 8, 1);
    ctx.fillRect(8, 9, 6, 1);
    ctx.fillRect(7, 10, 10, 1);

    // Mini LED on frame
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(19, 3, 2, 1);
  });

  // 13. NPC 01: ANALIS TATA KELOLA (Executive navy suit, teal tie - 20 x 28 px)
  registerCanvas('npc_analis_tata_kelola', 20, 28, (ctx) => {
    // Shadow
    ctx.fillStyle = '#060910';
    ctx.fillRect(3, 25, 14, 3);

    // Hair (Neat executive dark brown/black)
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(6, 1, 8, 4);
    ctx.fillRect(5, 3, 10, 3);

    // Face / Skin
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(6, 5, 8, 5);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(7, 7, 2, 1);
    ctx.fillRect(11, 7, 2, 1);

    // Suit Jacket (Deep navy)
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(4, 10, 12, 9);
    // Crisp White Collared Shirt
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(8, 10, 4, 4);
    // Teal Tie (Keunggulan association)
    ctx.fillStyle = '#14b8a6';
    ctx.fillRect(9, 11, 2, 5);

    // Arms
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(3, 10, 2, 7);
    ctx.fillRect(15, 10, 2, 7);
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(3, 17, 2, 2);
    ctx.fillRect(15, 17, 2, 2);

    // Trousers
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(5, 19, 4, 6);
    ctx.fillRect(11, 19, 4, 6);

    // Polished Oxford Shoes
    ctx.fillStyle = '#090d16';
    ctx.fillRect(4, 25, 5, 2);
    ctx.fillRect(11, 25, 5, 2);
  });

  // 14. NPC 02: KOORDINATOR RISIKO (Executive slate suit, amber tie - 20 x 28 px)
  registerCanvas('npc_koordinator_risiko', 20, 28, (ctx) => {
    // Shadow
    ctx.fillStyle = '#060910';
    ctx.fillRect(3, 25, 14, 3);

    // Hair (Short styled slate/dark hair)
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(6, 1, 8, 4);
    ctx.fillRect(5, 3, 10, 3);

    // Face / Skin
    ctx.fillStyle = '#fde047';
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(6, 5, 8, 5);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(7, 7, 2, 1);
    ctx.fillRect(11, 7, 2, 1);

    // Suit Jacket (Charcoal / Slate)
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(4, 10, 12, 9);
    // Crisp White Shirt
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(8, 10, 4, 4);
    // Amber Tie (Keterbatasan association)
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(9, 11, 2, 5);

    // Arms
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(3, 10, 2, 7);
    ctx.fillRect(15, 10, 2, 7);
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(3, 17, 2, 2);
    ctx.fillRect(15, 17, 2, 2);

    // Trousers
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(5, 19, 4, 6);
    ctx.fillRect(11, 19, 4, 6);

    // Polished Oxford Shoes
    ctx.fillStyle = '#090d16';
    ctx.fillRect(4, 25, 5, 2);
    ctx.fillRect(11, 25, 5, 2);
  });

  // 15. Wall Marquee Header (LANTAI 4 // TRADE-OFF ANALYSIS - 144 x 20 px)
  registerCanvas('prop_tradeoff_header', 144, 20, (ctx) => {
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, 144, 20);
    ctx.fillStyle = '#141e2e';
    ctx.fillRect(2, 2, 140, 16);
    ctx.fillStyle = '#1c293e';
    ctx.fillRect(4, 4, 136, 12);

    // Symmetrical flanking accent tabs (Teal West, Amber East)
    ctx.fillStyle = '#0d9488';
    ctx.fillRect(8, 6, 4, 8);
    ctx.fillStyle = '#d97706';
    ctx.fillRect(132, 6, 4, 8);

    // Center illuminated text bar
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(18, 8, 108, 4);

    // Tiny balance indicator in center of marquee
    ctx.fillStyle = '#14b8a6';
    ctx.fillRect(66, 6, 4, 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(74, 6, 4, 2);
  });

  // 16. Trade-Off Directory Kiosk (Standing pedestal - 20 x 26 px)
  registerCanvas('prop_tradeoff_directory', 20, 26, (ctx) => {
    ctx.fillStyle = '#070b13';
    ctx.fillRect(2, 22, 16, 4);
    ctx.fillStyle = '#141f30';
    ctx.fillRect(7, 13, 6, 10);
    // Angled Screen Head
    ctx.fillStyle = '#0d1522';
    ctx.fillRect(2, 2, 16, 13);
    ctx.fillStyle = '#192538';
    ctx.fillRect(3, 3, 14, 11);
    ctx.fillStyle = '#070d16';
    ctx.fillRect(4, 4, 12, 9);
    // Cyan map / trade-off graph nodes
    ctx.fillStyle = '#14b8a6';
    ctx.fillRect(6, 6, 2, 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(12, 6, 2, 2);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(9, 9, 2, 2);
  });

  // 17. Floor 4 Executive Planter (Sleek slate pot - 16 x 24 px)
  registerCanvas('prop_floor4_plant', 16, 24, (ctx) => {
    // Pot
    ctx.fillStyle = '#070b13';
    ctx.fillRect(2, 14, 12, 10);
    ctx.fillStyle = '#162234';
    ctx.fillRect(3, 15, 10, 8);
    ctx.fillStyle = '#22344e';
    ctx.fillRect(3, 15, 10, 1);
    // Neat architectural foliage
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(4, 6, 8, 9);
    ctx.fillStyle = '#059669';
    ctx.fillRect(3, 4, 4, 8);
    ctx.fillRect(9, 4, 4, 8);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(6, 2, 4, 6);
  });

  // 18. Floor 4 Executive Bench (Minimal slate & navy cushion - 32 x 16 px)
  registerCanvas('prop_floor4_bench', 32, 16, (ctx) => {
    ctx.fillStyle = '#060910';
    ctx.fillRect(2, 14, 28, 2);
    ctx.fillStyle = '#0f1726';
    ctx.fillRect(4, 8, 3, 7);
    ctx.fillRect(25, 8, 3, 7);
    // Cushion
    ctx.fillStyle = '#162337';
    ctx.fillRect(2, 4, 28, 6);
    ctx.fillStyle = '#1f2e46';
    ctx.fillRect(3, 3, 26, 3);
  });

  // 19. Floor 4 Document Archive Cabinet (Compact two-drawer unit - 22 x 24 px)
  registerCanvas('prop_floor4_archive', 22, 24, (ctx) => {
    ctx.fillStyle = '#060910';
    ctx.fillRect(2, 20, 18, 4);
    ctx.fillStyle = '#0e1726';
    ctx.fillRect(2, 2, 18, 20);
    ctx.fillStyle = '#162234';
    ctx.fillRect(3, 3, 16, 18);
    // Top Drawer
    ctx.fillStyle = '#1e2c42';
    ctx.fillRect(4, 4, 14, 7);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(9, 7, 4, 1); // Handle
    // Bottom Drawer
    ctx.fillStyle = '#1e2c42';
    ctx.fillRect(4, 12, 14, 7);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(9, 15, 4, 1); // Handle
  });

  // Call Floor 5 Textures Generator
  createFloor5Textures(scene);
}

// =========================================================================
// LANTAI 5 (CRISIS COMMAND CENTER) TEXTURES
// =========================================================================
export function createFloor5Textures(scene) {
  const textures = scene.textures;
  if (textures.exists('tile_floor_floor5')) {
    return;
  }

  const registerCanvas = (key, width, height, drawFn) => {
    if (textures.exists(key)) return;
    try {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      drawFn(ctx, width, height);
      textures.addCanvas(key, canvas);
    } catch (err) {
      console.error(`[textureGenerator] Error creating Floor 5 texture "${key}":`, err);
    }
  };

  // 1. Executive Dark Navy Floor Tile (32 x 32 px)
  registerCanvas('tile_floor_floor5', 32, 32, (ctx) => {
    ctx.fillStyle = '#080c16';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#0c1322';
    ctx.fillRect(1, 1, 30, 30);
    // Subtle beveled seam
    ctx.fillStyle = '#141d30';
    ctx.fillRect(0, 0, 32, 1);
    ctx.fillRect(0, 0, 1, 32);
    ctx.fillStyle = '#060911';
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(31, 0, 1, 32);
    // Tiny corner accent dot
    ctx.fillStyle = '#1e2b44';
    ctx.fillRect(1, 1, 1, 1);
  });

  // 2. Floor 5 Alternate Tile (32 x 32 px)
  registerCanvas('tile_floor_floor5_alt', 32, 32, (ctx) => {
    ctx.fillStyle = '#070a13';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#0a101d';
    ctx.fillRect(1, 1, 30, 30);
    ctx.fillStyle = '#11192b';
    ctx.fillRect(0, 0, 32, 1);
    ctx.fillRect(0, 0, 1, 32);
    ctx.fillStyle = '#05070e';
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(31, 0, 1, 32);
  });

  // 3. Floor 5 Executive Center Tile (32 x 32 px - Richer material)
  registerCanvas('tile_floor_floor5_center', 32, 32, (ctx) => {
    ctx.fillStyle = '#090e1a';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#0f1729';
    ctx.fillRect(1, 1, 30, 30);
    ctx.fillStyle = '#19263f';
    ctx.fillRect(0, 0, 32, 1);
    ctx.fillRect(0, 0, 1, 32);
    ctx.fillStyle = '#060a12';
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(31, 0, 1, 32);
    // Restrained cyan corner dot
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(1, 1, 1, 1);
    ctx.fillRect(30, 1, 1, 1);
    ctx.fillRect(1, 30, 1, 1);
    ctx.fillRect(30, 30, 1, 1);
  });

  // 4. Minimalist Transit Runner (32 x 32 px) - Dark navy base, steel-blue texture, subtle cyan edges
  registerCanvas('tile_floor_floor5_runner', 32, 32, (ctx) => {
    // Navy base
    ctx.fillStyle = '#090e1a';
    ctx.fillRect(0, 0, 32, 32);
    // Runner carpet band (y: 6 to 26 = 20px)
    ctx.fillStyle = '#0f192b';
    ctx.fillRect(0, 6, 32, 20);
    ctx.fillStyle = '#16233b';
    ctx.fillRect(0, 7, 32, 18);
    // Fine horizontal weave texture
    ctx.fillStyle = '#1b2c4a';
    ctx.fillRect(0, 10, 32, 1);
    ctx.fillRect(0, 16, 32, 1);
    ctx.fillRect(0, 22, 32, 1);
    // Restrained cyan border strips
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(0, 6, 32, 1);
    ctx.fillRect(0, 25, 32, 1);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(0, 7, 32, 0.5);
  });

  registerCanvas('tile_floor_floor5_runner_start', 32, 32, (ctx) => {
    ctx.fillStyle = '#090e1a';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#0f192b';
    ctx.fillRect(4, 6, 28, 20);
    ctx.fillStyle = '#16233b';
    ctx.fillRect(5, 7, 27, 18);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(4, 6, 28, 1);
    ctx.fillRect(4, 25, 28, 1);
    ctx.fillRect(4, 6, 1, 20);
  });

  registerCanvas('tile_floor_floor5_runner_end', 32, 32, (ctx) => {
    ctx.fillStyle = '#090e1a';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#0f192b';
    ctx.fillRect(0, 6, 28, 20);
    ctx.fillStyle = '#16233b';
    ctx.fillRect(0, 7, 27, 18);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(0, 6, 28, 1);
    ctx.fillRect(0, 25, 28, 1);
    ctx.fillRect(27, 6, 1, 20);
  });

  // 5. Floor 5 Elevator (L5 CRISIS COMMAND - Full 64 x 48 px Architectural Scale)
  registerCanvas('prop_elevator_l5', 64, 48, (ctx) => {
    // Brushed titanium / executive dark navy outer frame
    ctx.fillStyle = '#060a12';
    ctx.fillRect(0, 0, 64, 48);
    ctx.fillStyle = '#131b2c';
    ctx.fillRect(2, 2, 60, 44);
    ctx.fillStyle = '#212c42';
    ctx.fillRect(4, 4, 56, 40);

    // Overhead Digital Display Housing
    ctx.fillStyle = '#080c14';
    ctx.fillRect(14, 4, 36, 9);
    ctx.fillStyle = '#0f1728';
    ctx.fillRect(16, 5, 32, 7);

    // Floor Display ("L5" in illuminated cyan + subtle status beacon)
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(18, 7, 3, 3); // Status LED

    // Pixel Letter "L"
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(25, 6, 2, 5);
    ctx.fillRect(25, 10, 5, 1);

    // Pixel Digit "5"
    ctx.fillRect(34, 6, 5, 1);
    ctx.fillRect(34, 7, 2, 1);
    ctx.fillRect(34, 8, 4, 1);
    ctx.fillRect(37, 9, 2, 1);
    ctx.fillRect(34, 10, 5, 1);

    // Crisis Command telemetry indicator
    ctx.fillStyle = '#10b981';
    ctx.fillRect(44, 7, 2, 3);

    // Sliding Double Metal Doors (Deep steel-slate)
    ctx.fillStyle = '#182335';
    ctx.fillRect(6, 14, 25, 32);
    ctx.fillRect(33, 14, 25, 32);

    // Inner Door Panels
    ctx.fillStyle = '#23334c';
    ctx.fillRect(8, 16, 21, 28);
    ctx.fillRect(35, 16, 21, 28);

    // Recessed center vertical ribbing
    ctx.fillStyle = '#344665';
    ctx.fillRect(10, 18, 8, 24);
    ctx.fillRect(37, 18, 8, 24);

    // Center seam & shadow
    ctx.fillStyle = '#070a12';
    ctx.fillRect(31, 14, 2, 32);

    // Horizontal architectural bevel grooves
    ctx.fillStyle = '#121b29';
    ctx.fillRect(8, 26, 21, 1);
    ctx.fillRect(35, 26, 21, 1);
    ctx.fillStyle = '#384d6e';
    ctx.fillRect(8, 27, 21, 1);
    ctx.fillRect(35, 27, 21, 1);

    // Call button panel on right frame
    ctx.fillStyle = '#0b111c';
    ctx.fillRect(59, 22, 4, 10);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(60, 24, 2, 2); // Lit cyan call button
    ctx.fillStyle = '#64748b';
    ctx.fillRect(60, 28, 2, 2);

    // Bottom Safety Threshold & Grounding Base
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(6, 45, 52, 2);
    ctx.fillStyle = '#060910';
    ctx.fillRect(4, 47, 56, 1);
  });

  // Floor 5 Elevator Subtle Floor Highlight (Non-portal, soft threshold glow - 40 x 14 px)
  registerCanvas('prop_elevator_l5_glow', 40, 14, (ctx) => {
    ctx.clearRect(0, 0, 40, 14);
    const grad = ctx.createRadialGradient(20, 7, 1, 20, 7, 18);
    grad.addColorStop(0, 'rgba(56, 189, 248, 0.3)');
    grad.addColorStop(0.5, 'rgba(2, 132, 199, 0.1)');
    grad.addColorStop(1, 'rgba(2, 132, 199, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(20, 7, 18, 6, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  // 6. Executive Command Table (Center Workstation - 68 x 36 px)
  registerCanvas('prop_table_command_executive', 68, 36, (ctx) => {
    // Drop shadow
    ctx.fillStyle = '#03060c';
    ctx.fillRect(4, 30, 60, 6);

    // Sturdy architectural pedestals
    ctx.fillStyle = '#0a101b';
    ctx.fillRect(8, 18, 12, 14);
    ctx.fillRect(48, 18, 12, 14);
    ctx.fillStyle = '#141d2e';
    ctx.fillRect(10, 19, 8, 12);
    ctx.fillRect(50, 19, 8, 12);
    ctx.fillStyle = '#1c283f';
    ctx.fillRect(11, 20, 6, 10);
    ctx.fillRect(51, 20, 6, 10);

    // Center cable conduit
    ctx.fillStyle = '#0f1728';
    ctx.fillRect(30, 18, 8, 13);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(33, 20, 2, 9);

    // Main Executive Tabletop
    ctx.fillStyle = '#070b13';
    ctx.fillRect(0, 3, 68, 18);
    ctx.fillStyle = '#121b2c';
    ctx.fillRect(1, 4, 66, 16);
    ctx.fillStyle = '#1b273e';
    ctx.fillRect(2, 5, 64, 14);
    ctx.fillStyle = '#243452';
    ctx.fillRect(3, 5, 62, 2);

    // Subtle edge highlight
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(4, 6, 60, 1);

    // Six Embedded Framework Telemetry Slots (COBIT, Risk IT, ITIL, ISO, PMI, CMMI)
    const slotColors = ['#0284c7', '#0d9488', '#38bdf8', '#a855f7', '#f59e0b', '#10b981'];
    for (let i = 0; i < 6; i++) {
      const sx = 6 + i * 10;
      ctx.fillStyle = '#090e18';
      ctx.fillRect(sx, 9, 8, 8);
      ctx.fillStyle = '#141d2d';
      ctx.fillRect(sx + 1, 10, 6, 6);
      ctx.fillStyle = slotColors[i];
      ctx.fillRect(sx + 2, 11, 4, 4);
    }
  });

  registerCanvas('prop_table_command_executive_complete', 68, 36, (ctx) => {
    // Drop shadow
    ctx.fillStyle = '#03060c';
    ctx.fillRect(4, 30, 60, 6);

    // Pedestals
    ctx.fillStyle = '#0a101b';
    ctx.fillRect(8, 18, 12, 14);
    ctx.fillRect(48, 18, 12, 14);
    ctx.fillStyle = '#141d2e';
    ctx.fillRect(10, 19, 8, 12);
    ctx.fillRect(50, 19, 8, 12);
    ctx.fillStyle = '#1c283f';
    ctx.fillRect(11, 20, 6, 10);
    ctx.fillRect(51, 20, 6, 10);

    // Center conduit (Emerald synced)
    ctx.fillStyle = '#0f1728';
    ctx.fillRect(30, 18, 8, 13);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(33, 20, 2, 9);

    // Main Tabletop
    ctx.fillStyle = '#070b13';
    ctx.fillRect(0, 3, 68, 18);
    ctx.fillStyle = '#121b2c';
    ctx.fillRect(1, 4, 66, 16);
    ctx.fillStyle = '#1b273e';
    ctx.fillRect(2, 5, 64, 14);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(3, 5, 62, 2);

    ctx.fillStyle = '#34d399';
    ctx.fillRect(4, 6, 60, 1);

    // All Six Slots Synced to Emerald (Aligned State)
    for (let i = 0; i < 6; i++) {
      const sx = 6 + i * 10;
      ctx.fillStyle = '#090e18';
      ctx.fillRect(sx, 9, 8, 8);
      ctx.fillStyle = '#064e3b';
      ctx.fillRect(sx + 1, 10, 6, 6);
      ctx.fillStyle = '#10b981';
      ctx.fillRect(sx + 2, 11, 4, 4);
    }
  });

  // 7. Ruang Komando Door (Primary Focal Destination - 64 x 48 px)
  const drawRuangKomandoDoor = (ctx, completed) => {
    // Heavy reinforced architectural frame (Anchored firmly into the wall)
    ctx.fillStyle = '#05080f';
    ctx.fillRect(0, 0, 64, 48);
    ctx.fillStyle = '#121929';
    ctx.fillRect(2, 2, 60, 44);
    ctx.fillStyle = '#202c44';
    ctx.fillRect(4, 4, 56, 40);

    // Side jamb structural reinforcements
    ctx.fillStyle = completed ? '#059669' : '#0284c7';
    ctx.fillRect(4, 6, 2, 38);
    ctx.fillRect(58, 6, 2, 38);
    ctx.fillStyle = completed ? '#10b981' : '#38bdf8';
    ctx.fillRect(5, 10, 1, 30);
    ctx.fillRect(58, 10, 1, 30);

    // Overhead Header Sign Housing
    ctx.fillStyle = '#070b13';
    ctx.fillRect(10, 4, 44, 9);
    ctx.fillStyle = '#0e1624';
    ctx.fillRect(12, 5, 40, 7);

    // Header Sign Title: "RUANG KOMANDO"
    ctx.fillStyle = completed ? '#34d399' : '#38bdf8';
    ctx.fillRect(16, 7, 28, 2);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(20, 10, 20, 1);

    // Dual warning/status beacons on header
    ctx.fillStyle = completed ? '#10b981' : '#f59e0b';
    ctx.fillRect(13, 7, 2, 3);
    ctx.fillRect(49, 7, 2, 3);

    // Heavy Double Security Blast Doors
    ctx.fillStyle = '#0a0f19';
    ctx.fillRect(6, 14, 25, 31);
    ctx.fillRect(33, 14, 25, 31);
    ctx.fillStyle = '#172338';
    ctx.fillRect(8, 16, 21, 27);
    ctx.fillRect(35, 16, 21, 27);

    // Center Door Seam & Recessed Shadow
    ctx.fillStyle = '#070a12';
    ctx.fillRect(31, 14, 2, 31);

    // Reinforced Steel Armor Plates
    ctx.fillStyle = '#22324c';
    ctx.fillRect(10, 18, 17, 7);
    ctx.fillRect(37, 18, 17, 7);

    // Narrow Viewports with Command Telemetry
    ctx.fillStyle = '#090e17';
    ctx.fillRect(12, 19, 13, 5);
    ctx.fillRect(39, 19, 13, 5);
    ctx.fillStyle = completed ? '#10b981' : '#f59e0b';
    ctx.fillRect(14, 21, 9, 2);
    ctx.fillRect(41, 21, 9, 2);

    // Restrained Status Badge Plaque (Small, non-dominating!)
    // "KRISIS AKTIF" before completion, "KRISIS TERKENDALI ✓" after completion
    ctx.fillStyle = '#090e18';
    ctx.fillRect(14, 28, 36, 6);

    if (completed) {
      // "KRISIS TERKENDALI ✓" representation
      ctx.fillStyle = '#10b981';
      ctx.fillRect(17, 30, 24, 2);
      // Small checkmark tick '✓'
      ctx.fillStyle = '#34d399';
      ctx.fillRect(43, 30, 2, 3);
      ctx.fillRect(45, 29, 2, 4);
    } else {
      // "KRISIS AKTIF" representation
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(16, 30, 2, 2); // Amber beacon
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(20, 30, 24, 2); // Text strip
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(46, 30, 2, 2); // Red beacon
    }

    // Access Terminal Keypad (Right Jamb)
    ctx.fillStyle = '#0a101b';
    ctx.fillRect(59, 22, 4, 11);
    ctx.fillStyle = completed ? '#22c55e' : '#f59e0b';
    ctx.fillRect(60, 24, 2, 3);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(60, 28, 2, 3);

    // Bottom Grounding Base & Safety Threshold
    ctx.fillStyle = completed ? '#059669' : '#0284c7';
    ctx.fillRect(6, 45, 52, 2);
    ctx.fillStyle = '#05080f';
    ctx.fillRect(4, 47, 56, 1);
  };

  registerCanvas('prop_door_komando', 64, 48, (ctx) => drawRuangKomandoDoor(ctx, false));
  registerCanvas('prop_door_komando_complete', 64, 48, (ctx) => drawRuangKomandoDoor(ctx, true));

  // Ruang Komando Floor Highlight (Subtle, non-portal threshold glow - 48 x 16 px)
  registerCanvas('prop_door_komando_glow', 48, 16, (ctx) => {
    ctx.clearRect(0, 0, 48, 16);
    const grad = ctx.createRadialGradient(24, 8, 1, 24, 8, 22);
    grad.addColorStop(0, 'rgba(245, 158, 11, 0.35)');
    grad.addColorStop(0.5, 'rgba(14, 116, 144, 0.12)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(24, 8, 22, 7, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  registerCanvas('prop_door_komando_glow_complete', 48, 16, (ctx) => {
    ctx.clearRect(0, 0, 48, 16);
    const grad = ctx.createRadialGradient(24, 8, 1, 24, 8, 22);
    grad.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
    grad.addColorStop(0.5, 'rgba(5, 150, 105, 0.12)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(24, 8, 22, 7, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  // 8. Three Framework Decision Modules (Unified Executive Consoles - 32 x 28 px each)
  // Shared design language: solid grounded pedestal with angled control surface and subtle telemetry
  const drawFrameworkModule = (ctx, accentPrimary, accentSecondary) => {
    // Drop shadow
    ctx.fillStyle = '#04070d';
    ctx.fillRect(2, 22, 28, 6);

    // Architectural pedestal base
    ctx.fillStyle = '#0b121e';
    ctx.fillRect(5, 14, 22, 10);
    ctx.fillStyle = '#141c2c';
    ctx.fillRect(6, 15, 20, 8);
    ctx.fillStyle = '#1f2c42';
    ctx.fillRect(8, 17, 16, 5);

    // Angled Console Head
    ctx.fillStyle = '#080c14';
    ctx.fillRect(2, 3, 28, 14);
    ctx.fillStyle = '#151f33';
    ctx.fillRect(3, 4, 26, 12);
    ctx.fillStyle = '#212f4b';
    ctx.fillRect(4, 5, 24, 10);

    // Recessed Screen
    ctx.fillStyle = '#070b14';
    ctx.fillRect(5, 6, 22, 7);

    // Telemetry display indicators
    ctx.fillStyle = accentPrimary;
    ctx.fillRect(7, 8, 7, 3);
    ctx.fillStyle = accentSecondary;
    ctx.fillRect(18, 8, 7, 3);

    // Micro control buttons
    ctx.fillStyle = '#64748b';
    ctx.fillRect(7, 14, 4, 1);
    ctx.fillRect(14, 14, 4, 1);
    ctx.fillRect(21, 14, 4, 1);
  };

  registerCanvas('prop_module_gov_risk', 32, 28, (ctx) => {
    drawFrameworkModule(ctx, '#0284c7', '#0d9488'); // Cyan & Teal
  });

  registerCanvas('prop_module_service_security', 32, 28, (ctx) => {
    drawFrameworkModule(ctx, '#38bdf8', '#8b5cf6'); // Sky-blue & muted Violet
  });

  registerCanvas('prop_module_project_maturity', 32, 28, (ctx) => {
    drawFrameworkModule(ctx, '#f59e0b', '#10b981'); // Amber & Emerald
  });

  // 9. Crisis Status Board (Architectural Wall Panel - 48 x 30 px)
  const drawCrisisStatusBoard = (ctx, completed) => {
    // Wall-mounting bevel frame
    ctx.fillStyle = '#05080f';
    ctx.fillRect(0, 0, 48, 30);
    ctx.fillStyle = '#121929';
    ctx.fillRect(1, 1, 46, 28);
    ctx.fillStyle = '#1c283e';
    ctx.fillRect(2, 2, 44, 26);
    ctx.fillStyle = '#080d16';
    ctx.fillRect(4, 4, 40, 22);

    // Header "STATUS SISTEM"
    ctx.fillStyle = completed ? '#10b981' : '#38bdf8';
    ctx.fillRect(6, 6, 24, 2);
    // Status dot
    ctx.fillStyle = completed ? '#10b981' : '#f59e0b';
    ctx.fillRect(38, 6, 4, 2);

    // Five Operational Metric Rows
    const alertColors = ['#f59e0b', '#ef4444', '#f59e0b', '#38bdf8', '#ef4444'];
    for (let r = 0; r < 5; r++) {
      const ry = 10 + r * 3;
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(6, ry, 24, 2);
      ctx.fillStyle = completed ? '#10b981' : alertColors[r];
      ctx.fillRect(33, ry, 9, 2);
    }
  };

  registerCanvas('prop_crisis_status_board', 48, 30, (ctx) => drawCrisisStatusBoard(ctx, false));
  registerCanvas('prop_crisis_status_board_complete', 48, 30, (ctx) => drawCrisisStatusBoard(ctx, true));

  // 10. NPC 01: ANALIS SENIOR (Full 24 x 32 px Character Scale)
  registerCanvas('npc_analis_senior', 24, 32, (ctx) => {
    // Hair (Distinguished silver-grey professional cut)
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(6, 3, 12, 5);
    ctx.fillStyle = '#64748b';
    ctx.fillRect(5, 5, 2, 3);
    ctx.fillRect(17, 5, 2, 3);

    // Face
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(7, 7, 10, 6);

    // Glasses (Muted cyan frame, dark eyes)
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(7, 8, 4, 2);
    ctx.fillRect(13, 8, 4, 2);
    ctx.fillRect(11, 9, 2, 1);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(8, 9, 2, 1);
    ctx.fillRect(14, 9, 2, 1);

    // Executive Charcoal/Navy Jacket
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(6, 13, 12, 9);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(10, 13, 4, 5); // White shirt
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(11, 15, 2, 4); // Cyan tie

    // Senior analyst ID badge
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(7, 15, 2, 3);

    // Arms
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(4, 14, 2, 7);
    ctx.fillRect(18, 14, 2, 7);
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(4, 21, 2, 1);
    ctx.fillRect(18, 21, 2, 1);

    // Tailored Trousers
    ctx.fillStyle = '#334155';
    ctx.fillRect(7, 22, 4, 7);
    ctx.fillRect(13, 22, 4, 7);

    // Grounded Executive Shoes
    ctx.fillStyle = '#090d16';
    ctx.fillRect(6, 29, 5, 3);
    ctx.fillRect(13, 29, 5, 3);
  });

  // 11. NPC 02: DIREKTUR RISIKO (Full 24 x 32 px Character Scale)
  registerCanvas('npc_direktur_risiko', 24, 32, (ctx) => {
    // Hair (Formal slicked dark hair)
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(6, 3, 12, 5);
    ctx.fillRect(5, 5, 2, 3);
    ctx.fillRect(17, 5, 2, 3);

    // Face
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(7, 7, 10, 6);
    // Confident dark eyes
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(8, 9, 2, 2);
    ctx.fillRect(14, 9, 2, 2);

    // Premium Executive Double-Breasted Suit
    ctx.fillStyle = '#0f1c34';
    ctx.fillRect(5, 13, 14, 9);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(10, 13, 4, 6); // White shirt
    ctx.fillStyle = '#d97706';
    ctx.fillRect(11, 15, 2, 4); // Executive Gold/Amber tie

    // Gold lapel pin
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(7, 14, 2, 2);

    // Arms
    ctx.fillStyle = '#0f1c34';
    ctx.fillRect(3, 14, 2, 7);
    ctx.fillRect(19, 14, 2, 7);
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(3, 21, 2, 1);
    ctx.fillRect(19, 21, 2, 1);

    // Formal Trousers
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(7, 22, 4, 7);
    ctx.fillRect(13, 22, 4, 7);

    // Polished Dress Shoes
    ctx.fillStyle = '#080d18';
    ctx.fillRect(6, 29, 5, 3);
    ctx.fillRect(13, 29, 5, 3);
  });

  // 12. Floor 5 Header Marquee (120 x 16 px)
  registerCanvas('prop_floor5_header', 120, 16, (ctx) => {
    ctx.fillStyle = '#060910';
    ctx.fillRect(0, 0, 120, 16);
    ctx.fillStyle = '#121929';
    ctx.fillRect(1, 1, 118, 14);
    ctx.fillStyle = '#1a243a';
    ctx.fillRect(2, 2, 116, 12);
    // Clean metallic center bar
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(20, 6, 80, 1.5);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(10, 10, 100, 1);
  });

  // 13. Floor 5 Executive Documentation Cabinet (24 x 28 px)
  registerCanvas('prop_floor5_cabinet', 24, 28, (ctx) => {
    ctx.fillStyle = '#05080f';
    ctx.fillRect(2, 24, 20, 4);
    ctx.fillStyle = '#0b111c';
    ctx.fillRect(2, 2, 20, 24);
    ctx.fillStyle = '#131b2c';
    ctx.fillRect(3, 3, 18, 22);
    // Three drawers
    ctx.fillStyle = '#1a253a';
    ctx.fillRect(4, 4, 16, 6);
    ctx.fillRect(4, 11, 16, 6);
    ctx.fillRect(4, 18, 16, 6);
    // Brushed chrome handles
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(10, 7, 4, 1);
    ctx.fillRect(10, 14, 4, 1);
    ctx.fillRect(10, 21, 4, 1);
  });

  // 14. Floor 5 Waiting Bench (32 x 18 px)
  registerCanvas('prop_floor5_bench', 32, 18, (ctx) => {
    ctx.fillStyle = '#05080f';
    ctx.fillRect(2, 16, 28, 2);
    ctx.fillStyle = '#0d131f';
    ctx.fillRect(4, 10, 3, 7);
    ctx.fillRect(25, 10, 3, 7);
    // Executive Cushion
    ctx.fillStyle = '#131b2c';
    ctx.fillRect(2, 5, 28, 7);
    ctx.fillStyle = '#1c283f';
    ctx.fillRect(3, 4, 26, 3);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(6, 8, 20, 0.5); // Stitch line
  });

  // 15. Floor 5 Executive Planter (Deluxe Architectural Pot - 24 x 36 px)
  registerCanvas('prop_floor5_plant', 24, 36, (ctx) => {
    // Drop shadow
    ctx.fillStyle = '#04070d';
    ctx.fillRect(3, 33, 18, 3);

    // Ceramic Charcoal Pot
    ctx.fillStyle = '#0f1728';
    ctx.fillRect(4, 20, 16, 14);
    ctx.fillStyle = '#19263c';
    ctx.fillRect(5, 21, 14, 12);

    // Brass/Cyan accent rim
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(4, 20, 16, 1);
    ctx.fillStyle = '#d97706';
    ctx.fillRect(4, 23, 16, 1);

    // Rich Tiered Architectural Foliage
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(5, 8, 14, 13);
    ctx.fillStyle = '#059669';
    ctx.fillRect(3, 6, 8, 12);
    ctx.fillRect(13, 6, 8, 12);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(7, 3, 10, 10);
    ctx.fillStyle = '#34d399';
    ctx.fillRect(9, 1, 6, 6);
  });

  // 16. Floor 5 Directory (Grounded Interactive Stand - 20 x 26 px)
  registerCanvas('prop_floor5_directory', 20, 26, (ctx) => {
    ctx.fillStyle = '#05080f';
    ctx.fillRect(2, 22, 16, 4);
    ctx.fillStyle = '#0c121e';
    ctx.fillRect(8, 14, 4, 10);
    // Display screen housing
    ctx.fillStyle = '#141c2d';
    ctx.fillRect(2, 3, 16, 12);
    ctx.fillStyle = '#070b13';
    ctx.fillRect(3, 4, 14, 10);
    // Holographic map nodes
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(6, 6, 2, 2);
    ctx.fillRect(12, 6, 2, 2);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(9, 10, 2, 2);
  });
}


