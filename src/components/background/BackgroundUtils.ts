
import { Particle, GridLine, Ripple, DigitalRainDrop, Circle } from './BackgroundTypes';

export const initParticles = (canvasWidth: number, canvasHeight: number): Particle[] => {
  const particles: Particle[] = [];
  const particleCount = Math.floor((canvasWidth * canvasHeight) / 10000);
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: (Math.random() - 0.5) * 0.8,
      opacity: Math.random() * 0.6 + 0.3,
      color: i % 4 === 0 ? '#9b87f5' : i % 4 === 1 ? '#1EAEDB' : i % 4 === 2 ? '#D946EF' : '#4edee5',
    });
  }
  
  return particles;
};

export const initGridLines = (canvasWidth: number, canvasHeight: number): GridLine[] => {
  const gridLines: GridLine[] = [];
  const spacing = 80; // Grid cell size
  const hexHeight = spacing * Math.sqrt(3);
  
  // Create hexagonal grid
  for (let y = -hexHeight; y < canvasHeight + hexHeight; y += hexHeight) {
    const isOddRow = Math.floor(y / hexHeight) % 2 !== 0;
    const xOffset = isOddRow ? spacing / 2 : 0;
    
    for (let x = -spacing; x < canvasWidth + spacing; x += spacing) {
      // Draw hexagon at each point
      for (let angle = 0; angle < 6; angle++) {
        const startAngle = (angle * Math.PI) / 3;
        const endAngle = ((angle + 1) * Math.PI) / 3;
        
        gridLines.push({
          startX: x + xOffset + spacing/2 * Math.cos(startAngle),
          startY: y + spacing/2 * Math.sin(startAngle),
          endX: x + xOffset + spacing/2 * Math.cos(endAngle),
          endY: y + spacing/2 * Math.sin(endAngle),
          color: 'rgba(155, 135, 245, 0.1)'
        });
      }
    }
  }
  
  return gridLines;
};

export const initDigitalRain = (canvasWidth: number, canvasHeight: number): DigitalRainDrop[] => {
  const digitalRain: DigitalRainDrop[] = [];
  const columnCount = Math.floor(canvasWidth / 20); // 20px column width
  
  for (let i = 0; i < columnCount; i++) {
    const x = i * 20;
    const y = Math.random() * canvasHeight;
    const speed = Math.random() * 5 + 3;
    const opacity = Math.random() * 0.4 + 0.1;
    const size = Math.floor(Math.random() * 14) + 10;
    const length = Math.floor(Math.random() * 20) + 5;
    const character = String.fromCharCode(0x30A0 + Math.random() * 96);
    
    digitalRain.push({
      x, y, speed, opacity, size, length, character
    });
  }
  
  return digitalRain;
};

export const initCircles = (canvasWidth: number, canvasHeight: number): Circle[] => {
  const circles: Circle[] = [];
  const circleCount = 5;
  
  for (let i = 0; i < circleCount; i++) {
    circles.push({
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      radius: Math.random() * 100 + 50,
      color: i % 2 === 0 ? '#1EAEDB' : '#9b87f5',
      opacity: 0.1,
      pulseSpeed: Math.random() * 0.005 + 0.001,
      pulseDirection: 1,
      rotationAngle: 0,
      rotationSpeed: Math.random() * 0.001 + 0.0005
    });
  }
  
  return circles;
};

export const createRipple = (ripples: Ripple[], x: number, y: number): Ripple[] => {
  const colors = ['#1EAEDB', '#9b87f5', '#D946EF', '#4edee5'];
  ripples.push({
    x,
    y,
    radius: 0,
    maxRadius: 150,
    opacity: 0.8,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: 3
  });
  
  return ripples;
};

export const getPointerPosition = (e: TouchEvent | MouseEvent) => {
  let x, y;
  if ('touches' in e) {
    x = e.touches[0].clientX;
    y = e.touches[0].clientY;
  } else {
    x = e.clientX;
    y = e.clientY;
  }
  return { x, y };
};
