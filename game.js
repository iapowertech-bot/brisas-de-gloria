const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 640,
  transparent: false,
  backgroundColor: '#1a472a',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [MenuScene, RaceScene, ResultsScene]
};

const game = new Phaser.Game(config);
