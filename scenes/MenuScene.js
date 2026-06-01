class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  preload() {
    this.load.image('portada', 'assets/portada.jpg');
  }

  create() {
    const { width, height } = this.scale;

    // Imagen de fondo
    this.add.image(width/2, height/2, 'portada')
      .setDisplaySize(width, height);

    // Overlay oscuro para legibilidad
    this.add.rectangle(width/2, height/2, width, height, 0x000000, 0.45);

    // Titulo
    this.add.text(width/2, 60, 'BRISAS DE GLORIA', {
      fontSize: '28px',
      color: '#FFD700',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);

    this.add.text(width/2, 100, 'Elige tu caballo:', {
      fontSize: '16px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 3
    }).setOrigin(0.5);

    const caballos = [
      { nombre: 'Relampago', color: 0x8B4513 },
      { nombre: 'Tormenta',  color: 0x555555 },
      { nombre: 'Estrella',  color: 0xD2691E },
      { nombre: 'Trueno',    color: 0xC8B89A },
      { nombre: 'Vendaval',  color: 0x800020 },
      { nombre: 'Cometa',    color: 0x1B4F72 },
      { nombre: 'Rayo',      color: 0x1D6A39 },
      { nombre: 'Ciclone',   color: 0x6B2D8B }
    ];

    caballos.forEach((c, i) => {
      const y = 145 + i * 58;

      const caja = this.add.rectangle(width/2, y, width - 40, 46, 0x000000, 0.55)
        .setInteractive();

      this.add.rectangle(width/2 - 130, y, 28, 28, c.color);
      this.add.text(width/2 - 130, y, String(i + 1), {
        fontSize: '13px', color: '#FFD700', fontStyle: 'bold'
      }).setOrigin(0.5);

      this.add.text(width/2 - 100, y, c.nombre, {
        fontSize: '16px', color: '#ffffff',
        stroke: '#000000', strokeThickness: 2
      }).setOrigin(0, 0.5);

      caja.on('pointerover', () => caja.setFillStyle(0x1a472a, 0.75));
      caja.on('pointerout', () => caja.setFillStyle(0x000000, 0.55));
      caja.on('pointerdown', () => {
        this.scene.start('RaceScene', { eleccion: i });
      });
    });
  }
}