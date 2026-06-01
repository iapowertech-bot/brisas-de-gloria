<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Brisas de Gloria — Juego</title>
  <script src="https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.min.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #000;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      overflow: hidden;
    }

    #btn-volver {
      position: fixed;
      top: 12px;
      left: 12px;
      z-index: 999;
      background: rgba(0,0,0,0.7);
      color: #FFD700;
      border: 1px solid #FFD700;
      border-radius: 20px;
      padding: 6px 14px;
      font-size: 12px;
      cursor: pointer;
      font-family: Georgia, serif;
      letter-spacing: 1px;
      transition: background 0.3s;
    }
    #btn-volver:hover {
      background: rgba(255, 215, 0, 0.15);
    }
  </style>
</head>
<body>

  <button id="btn-volver" onclick="window.location.href='index.html'">← Portada</button>

  <script src="scenes/MenuScene.js"></script>
  <script src="scenes/RaceScene.js"></script>
  <script src="scenes/ResultsScene.js"></script>
  <script src="game.js"></script>

</body>
</html>