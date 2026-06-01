class RaceScene extends Phaser.Scene {
  constructor() {
    super({ key: 'RaceScene' });
  }

  init(data) {
    this.eleccion = data.eleccion;
  }

  preload() {
    this.load.image('pista', 'assets/pista444.png');
    for (let i = 1; i <= 8; i++) {
      this.load.image('caballo' + i, 'assets/caballo' + i + '.png');
    }
  }

  create() {
    const { width, height } = this.scale;

    // Pista con scrolling
    this.pista1 = this.add.image(width/2, height/2, 'pista').setDisplaySize(width, height);
    this.pista2 = this.add.image(width + width/2, height/2, 'pista').setDisplaySize(width, height);
    this.scrollX = 0;

    this.distanciaTotal = 25000;
    this.distanciaRecorrida = 12;
    this.zonaLatigo = this.distanciaTotal * 0.70;
    this.carreraIniciada = false;
    this.carreraTerminada = false;
    this.tiempo = 0;
    this.boost = 0;
    this.latigazosUsados = 0;
    this.maxLatigazos = 5;

    const nombres = ['Relampago','Tormenta','Estrella','Trueno',
                     'Vendaval','Cometa','Rayo','Ciclone'];

    const carrilesY = [160, 200, 240, 280, 320, 360, 400, 440];

    this.caballos = [];
    this.velocidades = [];
    this.staminas = [];
    this.nombresArr = nombres;
    this.jugadorIdx = this.eleccion;
    this.posicionesX = [];

    for (let i = 0; i < 8; i++) {
      const y = carrilesY[i];
      this.add.text(4, y - 11, nombres[i], {
        fontSize: '9px', color: '#ffffff',
        stroke: '#000000', strokeThickness: 2
      });
      const cab = this.add.image(80, y, 'caballo' + (i + 1))
        .setDisplaySize(160, 125);
      this.caballos.push(cab);
      this.velocidades.push(Phaser.Math.FloatBetween(0.3, 0.5));
      this.staminas.push(100);
      this.posicionesX.push(80); // posicion real de cada caballo
    }

    const elegido = this.caballos[this.eleccion];
    this.marcador = this.add.rectangle(
      elegido.x, elegido.y, 165, 130, 0xFFD700, 0
    ).setStrokeStyle(2, 0xFFD700);

    // Meta fija en pantalla
    this.add.rectangle(width - 15, height/2, 4, height, 0xFFFFFF).setAlpha(0.8);
    this.add.text(width - 38, 40, 'META', {
      fontSize: '11px', color: '#FFD700', fontStyle: 'bold',
      stroke: '#000', strokeThickness: 3
    });

    // UI inferior
    this.add.rectangle(width/2, height - 28, width, 56, 0x000000, 0.88);
    this.add.text(8, height - 52, 'PROGRESO', { fontSize: '8px', color: '#aaaaaa' });
    this.add.rectangle(width/2 - 30, height - 44, width - 180, 7, 0x333333);
    this.barraProgreso = this.add.rectangle(62, height - 44, 0, 7, 0xFFD700).setOrigin(0, 0.5);
    const anchoP = width - 180;
    const zonaX = 62 + anchoP * 0.70;
    this.add.rectangle(zonaX, height - 44, 2, 13, 0xff4444).setOrigin(0.5, 0.5);

    this.add.text(8, height - 33, 'ENERGIA', { fontSize: '8px', color: '#aaffaa' });
    this.add.rectangle(60, height - 26, 90, 7, 0x333333);
    this.barraStamina = this.add.rectangle(16, height - 26, 90, 7, 0x00ff00).setOrigin(0, 0.5);

    this.textoLatigos = this.add.text(8, height - 14,
      '🏇 LATIGOS: 5/5', { fontSize: '8px', color: '#ffaaaa' });

    this.textoZona = this.add.text(width/2, height - 62,
      '', { fontSize: '10px', color: '#FFD700', fontStyle: 'bold',
      stroke: '#000', strokeThickness: 2 }
    ).setOrigin(0.5).setDepth(20);

    this.crearControles();

    // Cuenta regresiva
    this.conteoActivo = true;
    const overlay = this.add.rectangle(width/2, height/2, width, height, 0x000000, 0.6).setDepth(30);
    this.textoConteo = this.add.text(width/2, height/2, '3', {
      fontSize: '120px', color: '#FFD700', fontStyle: 'bold',
      stroke: '#000000', strokeThickness: 8
    }).setOrigin(0.5).setDepth(31);

    this.time.delayedCall(1000, () => { this.textoConteo.setText('2'); });
    this.time.delayedCall(2000, () => { this.textoConteo.setText('1'); });
    this.time.delayedCall(3000, () => {
      this.textoConteo.setText('PARTIDA!');
      this.textoConteo.setStyle({ fontSize: '52px', color: '#00ff00',
        stroke: '#000000', strokeThickness: 6 });
    });
    this.time.delayedCall(3800, () => {
      overlay.destroy();
      this.textoConteo.destroy();
      this.carreraIniciada = true;
      this.conteoActivo = false;
    });
  }

  crearControles() {
    const { width, height } = this.scale;
    const arrX = width - 110;
    const latX = width - 38;
    const btnY = height - 35;

    this.add.rectangle(width - 74, btnY, 116, 52, 0x000000, 0.7).setDepth(9);
    this.add.rectangle(width - 74, btnY, 116, 52, 0xFFD700, 0)
      .setStrokeStyle(1, 0x888800, 0.5).setDepth(9);

    // BOTON ARREO
    this.add.circle(arrX, btnY, 24, 0x1a5e20).setDepth(10);
    this.add.circle(arrX, btnY, 21, 0x27ae60).setDepth(10);
    const hitArr = this.add.circle(arrX, btnY, 24, 0xffffff, 0)
      .setDepth(11).setInteractive();
    this.add.text(arrX, btnY - 7, '▲', {
      fontSize: '14px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(12);
    this.add.text(arrX, btnY + 9, 'ARREO', {
      fontSize: '7px', color: '#ccffcc'
    }).setOrigin(0.5).setDepth(12);

    hitArr.on('pointerdown', () => {
      if (!this.conteoActivo && !this.carreraTerminada) this.usarArreo();
    });
    hitArr.on('pointerup', () => { this.boost = 0; });
    hitArr.on('pointerout', () => { this.boost = 0; });

    // BOTON LATIGO
    this.add.circle(latX, btnY, 24, 0x7b241c).setDepth(10);
    this.add.circle(latX, btnY, 21, 0xe74c3c).setDepth(10);
    const hitLat = this.add.circle(latX, btnY, 24, 0xffffff, 0)
      .setDepth(11).setInteractive();
    this.add.text(latX, btnY - 7, '🏇', { fontSize: '14px' })
      .setOrigin(0.5).setDepth(12);
    this.add.text(latX, btnY + 9, 'LATIGO', {
      fontSize: '7px', color: '#ffcccc'
    }).setOrigin(0.5).setDepth(12);

    hitLat.on('pointerdown', () => {
      if (!this.conteoActivo && !this.carreraTerminada) this.usarLatigo();
    });
    hitLat.on('pointerup', () => { this.boost = 0; });
    hitLat.on('pointerout', () => { this.boost = 0; });
  }

  usarArreo() {
    if (this.staminas[this.jugadorIdx] > 15) {
      this.boost = 0.5;
      this.staminas[this.jugadorIdx] -= 4;
      this.textoZona.setText('Arreando!');
      this.time.delayedCall(600, () => { this.textoZona.setText(''); });
    } else {
      this.textoZona.setText('Sin energia!');
      this.time.delayedCall(1000, () => { this.textoZona.setText(''); });
    }
  }

  usarLatigo() {
    if (this.distanciaRecorrida < this.zonaLatigo) {
      this.posicionesX[this.jugadorIdx] -= 15;
      this.staminas[this.jugadorIdx] -= 12;
      this.textoZona.setText('Muy pronto! Caballo retrograda');
      this.time.delayedCall(1500, () => { this.textoZona.setText(''); });
      return;
    }
    if (this.latigazosUsados >= this.maxLatigazos) {
      this.posicionesX[this.jugadorIdx] -= 15;
      this.textoZona.setText('Sin latigos! Caballo retrograda');
      this.time.delayedCall(1500, () => { this.textoZona.setText(''); });
      return;
    }
    if (this.staminas[this.jugadorIdx] < 20) {
      this.posicionesX[this.jugadorIdx] -= 10;
      this.textoZona.setText('Caballo agotado!');
      this.time.delayedCall(1500, () => { this.textoZona.setText(''); });
      return;
    }

    // LATIGO EFECTIVO
    this.posicionesX[this.jugadorIdx] += 40;
    this.boost = 3.5;
    this.staminas[this.jugadorIdx] -= 15;
    this.latigazosUsados++;
    this.textoLatigos.setText('🏇 LATIGOS: ' +
      (this.maxLatigazos - this.latigazosUsados) + '/5');
    this.textoZona.setText('LATIGO! Caballo acelera!');
    this.time.delayedCall(800, () => { this.textoZona.setText(''); });
  }

  update() {
    if (!this.carreraIniciada || this.carreraTerminada) return;
    const { width } = this.scale;
    this.tiempo++;

    this.distanciaRecorrida += 12;
    const progreso = Math.min(this.distanciaRecorrida / this.distanciaTotal, 1);
    const anchoP = width - 180;
    this.barraProgreso.width = progreso * anchoP;

    if (this.distanciaRecorrida >= this.zonaLatigo && this.latigazosUsados === 0) {
      this.textoZona.setText('ZONA DE CASTIGO - USA EL LATIGO!');
    }

    if (this.tiempo % 120 === 0 && this.staminas[this.jugadorIdx] < 100) {
      this.staminas[this.jugadorIdx] += 2;
    }

    const st = Math.max(0, this.staminas[this.jugadorIdx]);
    this.barraStamina.width = (st / 100) * 90;
    if (st > 60) this.barraStamina.setFillStyle(0x00ff00);
    else if (st > 30) this.barraStamina.setFillStyle(0xffaa00);
    else this.barraStamina.setFillStyle(0xff0000);

    if (this.boost > 0.05) this.boost -= 0.008;
    else if (this.boost < -0.05) this.boost += 0.008;
    else this.boost = 0;

    // Actualizar posiciones reales
    for (let i = 0; i < this.caballos.length; i++) {
      if (this.tiempo % 120 === 0) {
        if (this.distanciaRecorrida > this.zonaLatigo) {
          this.velocidades[i] = Phaser.Math.FloatBetween(0.2, 0.4);
        } else {
          this.velocidades[i] = Phaser.Math.FloatBetween(0.3, 0.5);
        }
      }

      let vel = this.velocidades[i];
      if (i === this.jugadorIdx) {
        vel += this.boost;
        if (vel < 0.05) vel = 0.05;
      }

      this.posicionesX[i] += vel;
    }

    // Calcular el lider (caballo mas adelantado)
    let maxX = 0;
    for (let i = 0; i < this.posicionesX.length; i++) {
      if (this.posicionesX[i] > maxX) maxX = this.posicionesX[i];
    }

    // Scrolling: si el lider pasa del centro, mueve todo hacia atras
    const centroReferencia = width * 0.45;
    let offsetScroll = 0;
    if (maxX > centroReferencia) {
      offsetScroll = maxX - centroReferencia;
    }

    // Scrolling de la pista
    const velScroll = this.velocidades[this.jugadorIdx] + this.boost;
    this.scrollX += velScroll * 0.5;
    this.pista1.x = width/2 - (this.scrollX % width);
    this.pista2.x = this.pista1.x + width;
    if (this.pista1.x < -width/2) {
      this.pista1.x = this.pista2.x + width;
    }

    // Dibujar caballos en pantalla con offset
    for (let i = 0; i < this.caballos.length; i++) {
      const screenX = this.posicionesX[i] - offsetScroll;
      this.caballos[i].x = screenX;

      if (this.tiempo % 14 < 7) {
        this.caballos[i].y += 0.2;
      } else {
        this.caballos[i].y -= 0.2;
      }

      if (i === this.jugadorIdx) {
        this.marcador.x = screenX;
        this.marcador.y = this.caballos[i].y;
      }

      // Verificar si llego a la meta
      if (progreso >= 1) {
        this.carreraTerminada = true;
        this.scene.start('ResultsScene', {
          ganador: i,
          eleccion: this.eleccion,
          nombreGanador: this.nombresArr[i]
        });
        break;
      }
    }
  }
}