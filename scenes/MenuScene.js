class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  preload() {
    this.load.image('pista', 'assets/pista444.png');
  }

  create() {
    const { width, height } = this.scale;

    // Fondo con imagen de pista
    this.add.image(width/2, height/2, 'pista').setDisplaySize(width, height).setAlpha(0.4);

    // Overlay oscuro degradado
    const overlay = this.add.graphics();
    overlay.fillGradientStyle(0x000000, 0x000000, 0x1a0a00, 0x1a0a00, 0.95, 0.95, 0.7, 0.7);
    overlay.fillRect(0, 0, width, height);

    // Título principal
    this.add.text(width/2, 45, 'BRISAS DE GLORIA', {
      fontSize: '26px',
      fontFamily: 'Georgia, serif',
      color: '#FFD700',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 6,
      shadow: { offsetX: 0, offsetY: 0, color: '#FFD700', blur: 20, fill: true }
    }).setOrigin(0.5);

    // Línea dorada decorativa
    const line = this.add.graphics();
    line.lineStyle(2, 0xFFD700, 0.6);
    line.lineBetween(width/2 - 180, 68, width/2 + 180, 68);

    // Subtítulo
    this.add.text(width/2, 82, 'ELIGE TU CAMPEÓN', {
      fontSize: '11px',
      fontFamily: 'Georgia, serif',
      color: '#F5E6C8',
      letterSpacing: 4,
      stroke: '#000000',
      strokeThickness: 3
    }).setOrigin(0.5);

    const caballos = [
      { nombre: 'Relámpago', color: 0x8B4513, desc: 'Veloz y explosivo' },
      { nombre: 'Tormenta',  color: 0x555555, desc: 'Fuerza y resistencia' },
      { nombre: 'Estrella',  color: 0xD2691E, desc: 'Equilibrio perfecto' },
      { nombre: 'Trueno',    color: 0xC8B89A, desc: 'Potencia pura' },
      { nombre: 'Vendaval',  color: 0x800020, desc: 'Imparable en recta' },
      { nombre: 'Cometa',    color: 0x1B4F72, desc: 'Estratega nato' },
      { nombre: 'Rayo',      color: 0x1D6A39, desc: 'Arrancada fulminante' },
      { nombre: 'Ciclone',   color: 0x6B2D8B, desc: 'Sorpresa garantizada' }
    ];

    caballos.forEach((c, i) => {
      const y = 118 + i * 62;
      const cardW = width - 48;
      const cardX = width/2;

      // Sombra de la tarjeta
      const shadow = this.add.graphics();
      shadow.fillStyle(0x000000, 0.4);
      shadow.fillRoundedRect(cardX - cardW/2 + 3, y - 21, cardW, 48, 8);

      // Fondo de la tarjeta
      const card = this.add.graphics();
      card.fillStyle(0x0a0a0a, 0.85);
      card.fillRoundedRect(cardX - cardW/2, y - 22, cardW, 48, 8);
      card.lineStyle(1, 0xFFD700, 0.15);
      card.strokeRoundedRect(cardX - cardW/2, y - 22, cardW, 48, 8);

      // Zona de color del número
      const numBg = this.add.graphics();
      numBg.fillStyle(c.color, 1);
      numBg.fillRoundedRect(cardX - cardW/2, y - 22, 44, 48, { tl: 8, tr: 0, bl: 8, br: 0 });

      // Número
      this.add.text(cardX - cardW/2 + 22, y + 2, String(i + 1), {
        fontSize: '16px',
        fontFamily: 'Georgia, serif',
        color: '#FFFFFF',
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 3
      }).setOrigin(0.5);

      // Nombre del caballo
      this.add.text(cardX - cardW/2 + 60, y - 5, c.nombre, {
        fontSize: '15px',
        fontFamily: 'Georgia, serif',
        color: '#FFD700',
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 2
      }).setOrigin(0, 0.5);

      // Descripción
      this.add.text(cardX - cardW/2 + 60, y + 12, c.desc, {
        fontSize: '10px',
        fontFamily: 'Georgia, serif',
        color: '#F5E6C8',
        alpha: 0.7
      }).setOrigin(0, 0.5);

      // Icono de caballo
      this.add.text(cardX + cardW/2 - 20, y + 2, '🐎', {
        fontSize: '18px'
      }).setOrigin(0.5);

      // Zona interactiva
      const hit = this.add.rectangle(cardX, y + 2, cardW, 48, 0xffffff, 0)
        .setInteractive({ useHandCursor: true });

      hit.on('pointerover', () => {
        card.clear();
        card.fillStyle(0x1a1a0a, 0.95);
        card.fillRoundedRect(cardX - cardW/2, y - 22, cardW, 48, 8);
        card.lineStyle(2, 0xFFD700, 0.8);
        card.strokeRoundedRect(cardX - cardW/2, y - 22, cardW, 48, 8);
      });

      hit.on('pointerout', () => {
        card.clear();
        card.fillStyle(0x0a0a0a, 0.85);
        card.fillRoundedRect(cardX - cardW/2, y - 22, cardW, 48, 8);
        card.lineStyle(1, 0xFFD700, 0.15);
        card.strokeRoundedRect(cardX - cardW/2, y - 22, cardW, 48, 8);
      });

      hit.on('pointerdown', () => {
        this.scene.start('RaceScene', { eleccion: i });
      });
    });

    // Línea dorada inferior
    const line2 = this.add.graphics();
    line2.lineStyle(1, 0xFFD700, 0.3);
    line2.lineBetween(24, height - 18, width - 24, height - 18);

    // Texto inferior
    this.add.text(width/2, height - 10, 'IA POWERTECH — BRISAS DE GLORIA', {
      fontSize: '8px',
      fontFamily: 'Georgia, serif',
      color: '#FFD700',
      alpha: 0.4,
      letterSpacing: 2
    }).setOrigin(0.5);
  }
}
