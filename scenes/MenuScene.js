class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  preload() {
    this.load.image('pista', 'assets/pista444.png');
    for (let i = 1; i <= 8; i++) {
      this.load.image('caballo' + i, 'assets/caballo' + i + '.png');
    }
  }

  create() {
    const { width, height } = this.scale;

    // Fondo pista
    this.add.image(width/2, height/2, 'pista').setDisplaySize(width, height).setAlpha(0.35);

    // Overlay
    const overlay = this.add.graphics();
    overlay.fillGradientStyle(0x000000, 0x000000, 0x1a0a00, 0x1a0a00, 0.95, 0.95, 0.75, 0.75);
    overlay.fillRect(0, 0, width, height);

    // Título
    this.add.text(width/2, 50, 'BRISAS DE GLORIA', {
      fontSize: '42px',
      fontFamily: 'Georgia, serif',
      color: '#FFD700',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 8,
      shadow: { offsetX: 0, offsetY: 0, color: '#FFD700', blur: 30, fill: true }
    }).setOrigin(0.5);

    // Línea dorada
    const line = this.add.graphics();
    line.lineStyle(2, 0xFFD700, 0.6);
    line.lineBetween(width/2 - 300, 78, width/2 + 300, 78);

    // Subtítulo
    this.add.text(width/2, 95, 'ELIGE TU CAMPEÓN', {
      fontSize: '14px',
      fontFamily: 'Georgia, serif',
      color: '#F5E6C8',
      stroke: '#000000',
      strokeThickness: 3
    }).setOrigin(0.5);

    const caballos = [
      { nombre: 'Relámpago', color: 0x8B4513, desc: 'Veloz y explosivo' },
      { nombre: 'Tormenta',  color: 0x444444, desc: 'Fuerza y resistencia' },
      { nombre: 'Estrella',  color: 0xD2691E, desc: 'Equilibrio perfecto' },
      { nombre: 'Trueno',    color: 0xC8B89A, desc: 'Potencia pura' },
      { nombre: 'Vendaval',  color: 0x800020, desc: 'Imparable en recta' },
      { nombre: 'Cometa',    color: 0x1B4F72, desc: 'Estratega nato' },
      { nombre: 'Rayo',      color: 0x1D6A39, desc: 'Arrancada fulminante' },
      { nombre: 'Ciclone',   color: 0x6B2D8B, desc: 'Sorpresa garantizada' }
    ];

    const cardW = Math.min(width * 0.75, 900);
    const cardH = (height - 160) / 8 - 8;
    const startX = width/2;
    const startY = 130;

    caballos.forEach((c, i) => {
      const y = startY + i * (cardH + 8) + cardH/2;

      // Sombra
      const shadow = this.add.graphics();
      shadow.fillStyle(0x000000, 0.5);
      shadow.fillRoundedRect(startX - cardW/2 + 4, y - cardH/2 + 4, cardW, cardH, 10);

      // Fondo tarjeta
      const card = this.add.graphics();
      card.fillStyle(0x080808, 0.88);
      card.fillRoundedRect(startX - cardW/2, y - cardH/2, cardW, cardH, 10);
      card.lineStyle(1, 0xFFD700, 0.2);
      card.strokeRoundedRect(startX - cardW/2, y - cardH/2, cardW, cardH, 10);

      // Color número
      const numW = cardH * 1.1;
      const numBg = this.add.graphics();
      numBg.fillStyle(c.color, 1);
      numBg.fillRoundedRect(startX - cardW/2, y - cardH/2, numW, cardH, { tl: 10, tr: 0, bl: 10, br: 0 });

      // Número
      this.add.text(startX - cardW/2 + numW/2, y, String(i + 1), {
        fontSize: Math.floor(cardH * 0.55) + 'px',
        fontFamily: 'Georgia, serif',
        color: '#FFFFFF',
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 4
      }).setOrigin(0.5);

      // Imagen del caballo
      const cabImg = this.add.image(
        startX - cardW/2 + numW + cardH * 0.9,
        y,
        'caballo' + (i + 1)
      ).setDisplaySize(cardH * 1.6, cardH * 1.2);

      // Nombre
      this.add.text(startX - cardW/2 + numW + cardH * 2, y - cardH * 0.18, c.nombre, {
        fontSize: Math.floor(cardH * 0.42) + 'px',
        fontFamily: 'Georgia, serif',
        color: '#FFD700',
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 3
      }).setOrigin(0, 0.5);

      // Descripción
      this.add.text(startX - cardW/2 + numW + cardH * 2, y + cardH * 0.22, c.desc, {
        fontSize: Math.floor(cardH * 0.28) + 'px',
        fontFamily: 'Georgia, serif',
        color: '#F5E6C8',
        alpha: 0.75
      }).setOrigin(0, 0.5);

      // Flecha derecha
      this.add.text(startX + cardW/2 - 30, y, '▶', {
        fontSize: Math.floor(cardH * 0.35) + 'px',
        color: '#FFD700',
        alpha: 0.5
      }).setOrigin(0.5);

      // Hit area
      const hit = this.add.rectangle(startX, y, cardW, cardH, 0xffffff, 0)
        .setInteractive({ useHandCursor: true });

      hit.on('pointerover', () => {
        card.clear();
        card.fillStyle(0x1a1200, 0.95);
        card.fillRoundedRect(startX - cardW/2, y - cardH/2, cardW, cardH, 10);
        card.lineStyle(2, 0xFFD700, 0.9);
        card.strokeRoundedRect(startX - cardW/2, y - cardH/2, cardW, cardH, 10);
      });

      hit.on('pointerout', () => {
        card.clear();
        card.fillStyle(0x080808, 0.88);
        card.fillRoundedRect(startX - cardW/2, y - cardH/2, cardW, cardH, 10);
        card.lineStyle(1, 0xFFD700, 0.2);
        card.strokeRoundedRect(startX - cardW/2, y - cardH/2, cardW, cardH, 10);
      });

      hit.on('pointerdown', () => {
        this.scene.start('RaceScene', { eleccion: i });
      });
    });

    // Footer
    this.add.text(width/2, height - 12, 'IA POWERTECH — BRISAS DE GLORIA © 2026', {
      fontSize: '10px',
      fontFamily: 'Georgia, serif',
      color: '#FFD700',
      alpha: 0.3
    }).setOrigin(0.5);
  }
}
