class ResultsScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ResultsScene' });
  }

  init(data) {
    this.ganador      = data.ganador;
    this.eleccion     = data.eleccion;
    this.nombreGanador = data.nombreGanador;
    this.posJugador   = data.posJugador   || '?';
    this.ranking      = data.ranking      || [];
    this.nombres      = data.nombres      || [];
  }

  create() {
    const { width, height } = this.scale;
    const gano = this.ganador === this.eleccion;

    // ─── FONDO ───────────────────────────────────────────────────────────────
    this.add.rectangle(width / 2, height / 2, width, height,
      gano ? 0x0a2a0a : 0x1a0a0a
    );

    // Franja decorativa superior
    this.add.rectangle(width / 2, 0, width, 6,
      gano ? 0xFFD700 : 0xff4444
    ).setOrigin(0.5, 0);

    // ─── TÍTULO ──────────────────────────────────────────────────────────────
    const emoji  = gano ? '🏆' : '💔';
    const titulo = gano ? '¡GANASTE!' : 'FIN DE CARRERA';
    const color  = gano ? '#FFD700'   : '#ff6666';

    this.add.text(width / 2, 28, emoji + '  ' + titulo + '  ' + emoji, {
      fontSize: '22px',
      color:    color,
      stroke:   '#000000',
      strokeThickness: 5,
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // ─── GANADOR ─────────────────────────────────────────────────────────────
    this.add.text(width / 2, 62, '1er Lugar: ' + this.nombreGanador, {
      fontSize: '14px',
      color:    '#ffffff',
      stroke:   '#000000',
      strokeThickness: 3
    }).setOrigin(0.5);

    // ─── POSICIÓN DEL JUGADOR ────────────────────────────────────────────────
    const msgPos = gano
      ? '¡Tu caballo cruzó primero!'
      : 'Tu caballo llegó en el puesto ' + this.posJugador + 'º';
    const colorPos = gano ? '#aaffaa' : '#ffcc88';

    this.add.text(width / 2, 86, msgPos, {
      fontSize: '11px',
      color:    colorPos,
      stroke:   '#000000',
      strokeThickness: 3
    }).setOrigin(0.5);

    // ─── RANKING COMPLETO ────────────────────────────────────────────────────
    if (this.ranking.length > 0 && this.nombres.length > 0) {
      this.add.text(width / 2, 114, '— CLASIFICACIÓN FINAL —', {
        fontSize: '9px', color: '#888888'
      }).setOrigin(0.5);

      const medallas = ['🥇','🥈','🥉','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣'];

      for (let pos = 0; pos < this.ranking.length; pos++) {
        const idx     = this.ranking[pos];
        const nombre  = this.nombres[idx] || ('Caballo ' + (idx + 1));
        const esJugador = idx === this.eleccion;
        const fila    = 130 + pos * 22;
        const colText = esJugador ? '#FFD700' : '#cccccc';

        // Resaltar fila del jugador
        if (esJugador) {
          this.add.rectangle(width / 2, fila + 3, width - 20, 20, 0xFFD700, 0.15)
            .setOrigin(0.5, 0.5);
        }

        this.add.text(18, fila, medallas[pos] + '  ' + nombre + (esJugador ? ' ◄ TÚ' : ''), {
          fontSize: '11px',
          color:    colText,
          fontStyle: esJugador ? 'bold' : 'normal',
          stroke:   '#000000',
          strokeThickness: 2
        });
      }
    }

    // ─── BOTONES ─────────────────────────────────────────────────────────────
    const btnY = height - 55;

    // Botón Volver a Apostar
    const btnApostar = this.add.rectangle(width / 2 - 60, btnY, 100, 34, 0x27ae60, 1)
      .setInteractive({ useHandCursor: true });
    this.add.rectangle(width / 2 - 60, btnY, 100, 34, 0x000000, 0)
      .setStrokeStyle(2, 0x2ecc71);
    this.add.text(width / 2 - 60, btnY, '🔄 CORRER', {
      fontSize: '11px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5);

    btnApostar.on('pointerdown', () => {
      this.scene.start('MenuScene');
    });
    btnApostar.on('pointerover', () => btnApostar.setFillStyle(0x1e8449));
    btnApostar.on('pointerout',  () => btnApostar.setFillStyle(0x27ae60));

    // Botón Correr de nuevo (mismo caballo)
    const btnRepetir = this.add.rectangle(width / 2 + 60, btnY, 100, 34, 0x2980b9, 1)
      .setInteractive({ useHandCursor: true });
    this.add.rectangle(width / 2 + 60, btnY, 100, 34, 0x000000, 0)
      .setStrokeStyle(2, 0x3498db);
    this.add.text(width / 2 + 60, btnY, '▶ DE NUEVO', {
      fontSize: '11px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5);

    btnRepetir.on('pointerdown', () => {
      this.scene.start('RaceScene', { eleccion: this.eleccion });
    });
    btnRepetir.on('pointerover', () => btnRepetir.setFillStyle(0x1a5276));
    btnRepetir.on('pointerout',  () => btnRepetir.setFillStyle(0x2980b9));

    // ─── MENSAJE MOTIVACIONAL ────────────────────────────────────────────────
    const frases = gano
      ? ['¡Eres un campeón!', '¡Estrategia perfecta!', '¡Brisas de Gloria!']
      : ['La próxima es tuya', 'Aprende, vuelve y gana', '¡El látigo en el momento justo!'];

    const frase = frases[Phaser.Math.Between(0, frases.length - 1)];
    this.add.text(width / 2, height - 18, frase, {
      fontSize: '10px', color: '#666666', fontStyle: 'italic'
    }).setOrigin(0.5);
  }
}
