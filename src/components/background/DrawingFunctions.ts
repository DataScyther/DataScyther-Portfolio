
import { Particle, GridLine, Ripple, DigitalRainDrop, Circle } from './BackgroundTypes';

export const drawDigitalRain = (
  ctx: CanvasRenderingContext2D, 
  digitalRain: DigitalRainDrop[], 
  canvasHeight: number
): DigitalRainDrop[] => {
  ctx.font = '12px monospace';
  
  return digitalRain.map((drop, index) => {
    // Update position
    drop.y += drop.speed;
    if (drop.y > canvasHeight) {
      drop.y = 0;
      drop.x = index * 20;
    }
    
    // Draw digital rain characters
    for (let i = 0; i < drop.length; i++) {
      const charOpacity = drop.opacity * (1 - i / drop.length);
      ctx.fillStyle = `rgba(155, 135, 245, ${charOpacity})`;
      
      const char = String.fromCharCode(0x30A0 + Math.random() * 96);
      ctx.fillText(char, drop.x, drop.y - i * 20);
    }
    
    // Randomly change characters
    if (Math.random() > 0.95) {
      drop.character = String.fromCharCode(0x30A0 + Math.random() * 96);
    }
    
    return drop;
  });
};

export const drawCircles = (ctx: CanvasRenderingContext2D, circles: Circle[]): Circle[] => {
  return circles.map(circle => {
    // Pulse the circle
    circle.opacity += circle.pulseSpeed * circle.pulseDirection;
    if (circle.opacity > 0.15 || circle.opacity < 0.03) {
      circle.pulseDirection *= -1;
    }
    
    // Rotate the circle
    circle.rotationAngle += circle.rotationSpeed;
    
    // Draw main circle
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = `${circle.color}${Math.floor(circle.opacity * 255).toString(16).padStart(2, '0')}`;
    ctx.fill();
    
    // Draw orbit rings
    for (let i = 1; i <= 3; i++) {
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius * (1 + i * 0.3), 0, Math.PI * 2);
      ctx.strokeStyle = `${circle.color}${Math.floor(circle.opacity * 0.5 * 255).toString(16).padStart(2, '0')}`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    
    // Draw rotating satellites
    for (let i = 1; i <= 3; i++) {
      const angle = circle.rotationAngle * i;
      const distance = circle.radius * (1 + i * 0.3);
      const x = circle.x + Math.cos(angle) * distance;
      const y = circle.y + Math.sin(angle) * distance;
      
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = circle.color;
      ctx.fill();
    }
    
    return circle;
  });
};

export const drawGrid = (
  ctx: CanvasRenderingContext2D, 
  gridLines: GridLine[], 
  isPointerActive: boolean, 
  pointerPosition: { x: number, y: number }, 
  canvasWidth: number, 
  canvasHeight: number
): void => {
  gridLines.forEach(line => {
    ctx.beginPath();
    ctx.moveTo(line.startX, line.startY);
    ctx.lineTo(line.endX, line.endY);
    ctx.strokeStyle = line.color;
    ctx.lineWidth = 0.8;
    
    // Add perspective distortion if pointer is active
    if (isPointerActive) {
      const midX = (line.startX + line.endX) / 2;
      const midY = (line.startY + line.endY) / 2;
      const distanceX = Math.abs(midX - pointerPosition.x) / canvasWidth;
      const distanceY = Math.abs(midY - pointerPosition.y) / canvasHeight;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      ctx.globalAlpha = Math.max(0.1, 1 - distance);
    } else {
      ctx.globalAlpha = 0.2;
    }
    
    ctx.stroke();
    ctx.globalAlpha = 1;
  });
};

export const drawRipples = (ctx: CanvasRenderingContext2D, ripples: Ripple[]): Ripple[] => {
  const updatedRipples = [...ripples];
  
  for (let i = updatedRipples.length - 1; i >= 0; i--) {
    const ripple = updatedRipples[i];
    
    // Update ripple
    ripple.radius += ripple.speed;
    ripple.opacity -= 0.01;
    
    // Draw ripple
    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
    ctx.strokeStyle = ripple.color;
    ctx.lineWidth = 2;
    ctx.globalAlpha = ripple.opacity;
    ctx.stroke();
    
    // Draw inner ripple for more effect
    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius * 0.8, 0, Math.PI * 2);
    ctx.strokeStyle = ripple.color;
    ctx.lineWidth = 1;
    ctx.globalAlpha = ripple.opacity * 0.7;
    ctx.stroke();
    
    ctx.globalAlpha = 1;
    
    // Remove ripple if it's too large or transparent
    if (ripple.radius > ripple.maxRadius || ripple.opacity <= 0) {
      updatedRipples.splice(i, 1);
    }
  }
  
  return updatedRipples;
};

export const drawParticles = (
  ctx: CanvasRenderingContext2D, 
  particles: Particle[], 
  isPointerActive: boolean, 
  pointerPosition: { x: number, y: number },
  canvasWidth: number,
  canvasHeight: number
): Particle[] => {
  return particles.map((particle, index) => {
    // Move particles
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    // Wrap around edges
    if (particle.x > canvasWidth) particle.x = 0;
    if (particle.x < 0) particle.x = canvasWidth;
    if (particle.y > canvasHeight) particle.y = 0;
    if (particle.y < 0) particle.y = canvasHeight;

    // Draw particle
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.globalAlpha = particle.opacity;
    ctx.fill();
    ctx.globalAlpha = 1;

    // Connect nearby particles
    connectParticles(ctx, particle, index, particles);
    
    // Apply influence from pointer position
    if (isPointerActive) {
      const dx = pointerPosition.x - particle.x;
      const dy = pointerPosition.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 200) {
        const force = (200 - distance) / 200;
        particle.speedX += (dx / distance) * force * 0.04;
        particle.speedY += (dy / distance) * force * 0.04;
        
        // Limit speed
        const maxSpeed = 3;
        const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
        if (currentSpeed > maxSpeed) {
          particle.speedX = (particle.speedX / currentSpeed) * maxSpeed;
          particle.speedY = (particle.speedY / currentSpeed) * maxSpeed;
        }
      }
    }
    
    // Slowly return to normal speed
    particle.speedX *= 0.98;
    particle.speedY *= 0.98;
    
    return particle;
  });
};

// Helper function to connect particles
const connectParticles = (ctx: CanvasRenderingContext2D, p: Particle, index: number, particles: Particle[]): void => {
  for (let i = index + 1; i < particles.length; i++) {
    const dx = p.x - particles[i].x;
    const dy = p.y - particles[i].y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 150) {
      ctx.beginPath();
      ctx.strokeStyle = p.color;
      ctx.globalAlpha = 0.15 * (1 - distance / 150);
      ctx.lineWidth = 0.6;
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(particles[i].x, particles[i].y);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }
};
