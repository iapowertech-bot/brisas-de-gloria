// Generador de sprite de caballo en canvas
function crearSpritesCaballos() {
  const colores = [
    '#8B4513', '#2F2F2F', '#D2691E', '#F5F5DC',
    '#800020', '#1B4F72', '#1D6A39', '#8B008B'
  ];
  
  colores.forEach((color, i) => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 40;
    const ctx = canvas.getContext('2d');
    
    // Cuerpo
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(32, 24, 22, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Cabeza
    ctx.beginPath();
    ctx.ellipse(50, 16, 10, 7, 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Patas
    ctx.fillRect(14, 30, 4, 10);
    ctx.fillRect(22, 30, 4, 10);
    ctx.fillRect(36, 30, 4, 10);
    ctx.fillRect(44, 30, 4, 10);
    
    // Crin
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(42, 10, 14, 4);
    
    // Numero
    ctx.fillStyle = 'white';
    ctx.font = 'bold 12px Arial';
    ctx.fillText(i + 1, 28, 28);
    
    localStorage.setItem('horse_' + i, canvas.toDataURL());
  });
}
