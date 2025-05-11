
import React, { useEffect, useRef, useState } from 'react';

const FuturisticBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });
  const [isPointerActive, setIsPointerActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let gridLines: GridLine[] = [];
    let ripples: Ripple[] = [];
    let digitalRain: DigitalRainDrop[] = [];
    let circles: Circle[] = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize digital rain
    const initDigitalRain = () => {
      digitalRain = [];
      const columnCount = Math.floor(canvas.width / 20); // 20px column width
      
      for (let i = 0; i < columnCount; i++) {
        const x = i * 20;
        const y = Math.random() * canvas.height;
        const speed = Math.random() * 5 + 3;
        const opacity = Math.random() * 0.4 + 0.1;
        const size = Math.floor(Math.random() * 14) + 10;
        const length = Math.floor(Math.random() * 20) + 5;
        const character = String.fromCharCode(0x30A0 + Math.random() * 96);
        
        digitalRain.push({
          x, y, speed, opacity, size, length, character
        });
      }
    };

    // Initialize energy circles
    const initCircles = () => {
      circles = [];
      const circleCount = 5;
      
      for (let i = 0; i < circleCount; i++) {
        circles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 100 + 50,
          color: i % 2 === 0 ? '#1EAEDB' : '#9b87f5',
          opacity: 0.1,
          pulseSpeed: Math.random() * 0.005 + 0.001,
          pulseDirection: 1,
          rotationAngle: 0,
          rotationSpeed: Math.random() * 0.001 + 0.0005
        });
      }
    };

    // Initialize particles
    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 10000); // Increased density
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.8, // Faster particles
          speedY: (Math.random() - 0.5) * 0.8,
          opacity: Math.random() * 0.6 + 0.3,
          color: i % 4 === 0 ? '#9b87f5' : i % 4 === 1 ? '#1EAEDB' : i % 4 === 2 ? '#D946EF' : '#4edee5',
        });
      }
    };

    // Initialize hexagonal grid
    const initGridLines = () => {
      gridLines = [];
      const spacing = 80; // Grid cell size
      const hexHeight = spacing * Math.sqrt(3);
      
      // Create hexagonal grid
      for (let y = -hexHeight; y < canvas.height + hexHeight; y += hexHeight) {
        const isOddRow = Math.floor(y / hexHeight) % 2 !== 0;
        const xOffset = isOddRow ? spacing / 2 : 0;
        
        for (let x = -spacing; x < canvas.width + spacing; x += spacing) {
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
    };

    // Create a ripple effect
    const createRipple = (x: number, y: number) => {
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
    };

    // Draw function
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw digital rain (Matrix effect)
      drawDigitalRain();
      
      // Draw energy circles
      drawCircles();
      
      // Draw hexagonal grid
      drawGrid();
      
      // Update and draw ripples
      drawRipples();
      
      // Update and draw particles
      drawParticles();
      
      animationFrameId = requestAnimationFrame(draw);
    };

    const drawDigitalRain = () => {
      ctx.font = '12px monospace';
      
      digitalRain.forEach((drop, index) => {
        // Update position
        drop.y += drop.speed;
        if (drop.y > canvas.height) {
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
      });
    };

    const drawCircles = () => {
      circles.forEach(circle => {
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
      });
    };

    const drawGrid = () => {
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
          const distanceX = Math.abs(midX - pointerPosition.x) / canvas.width;
          const distanceY = Math.abs(midY - pointerPosition.y) / canvas.height;
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          ctx.globalAlpha = Math.max(0.1, 1 - distance);
        } else {
          ctx.globalAlpha = 0.2;
        }
        
        ctx.stroke();
        ctx.globalAlpha = 1;
      });
    };

    const drawRipples = () => {
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        
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
          ripples.splice(i, 1);
        }
      }
    };

    const drawParticles = () => {
      particles.forEach((particle, index) => {
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Connect nearby particles
        connectParticles(particle, index);
        
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
      });
    };

    // Connect particles with lines if they're close enough
    const connectParticles = (p: Particle, index: number) => {
      for (let i = index + 1; i < particles.length; i++) {
        const dx = p.x - particles[i].x;
        const dy = p.y - particles[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) { // Increased connection distance
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

    // Pointer event handlers
    const handlePointerDown = (e: TouchEvent | MouseEvent) => {
      setIsPointerActive(true);
      const pos = getPointerPosition(e);
      setPointerPosition(pos);
      
      // Create multiple ripples for more impact
      createRipple(pos.x, pos.y);
      
      // Offset ripples
      setTimeout(() => createRipple(pos.x + 20, pos.y - 20), 100);
      setTimeout(() => createRipple(pos.x - 30, pos.y + 10), 200);
    };

    const handlePointerMove = (e: TouchEvent | MouseEvent) => {
      const pos = getPointerPosition(e);
      setPointerPosition(pos);
      
      if (isPointerActive) {
        // Occasionally create ripples during movement
        if (Math.random() > 0.90) {
          createRipple(pos.x, pos.y);
        }
      }
    };

    const handlePointerUp = () => {
      setIsPointerActive(false);
    };

    // Helper to get pointer position from either mouse or touch event
    const getPointerPosition = (e: TouchEvent | MouseEvent) => {
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

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
      initParticles();
      initGridLines();
      initDigitalRain();
      initCircles();
    };
    
    // Add event listeners
    canvas.addEventListener('mousedown', handlePointerDown);
    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('mouseup', handlePointerUp);
    canvas.addEventListener('mouseleave', handlePointerUp);
    
    canvas.addEventListener('touchstart', handlePointerDown);
    canvas.addEventListener('touchmove', handlePointerMove);
    canvas.addEventListener('touchend', handlePointerUp);
    
    window.addEventListener('resize', handleResize);

    resizeCanvas();
    initParticles();
    initGridLines();
    initDigitalRain();
    initCircles();
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      
      // Remove event listeners
      canvas.removeEventListener('mousedown', handlePointerDown);
      canvas.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('mouseup', handlePointerUp);
      canvas.removeEventListener('mouseleave', handlePointerUp);
      
      canvas.removeEventListener('touchstart', handlePointerDown);
      canvas.removeEventListener('touchmove', handlePointerMove);
      canvas.removeEventListener('touchend', handlePointerUp);
      
      window.removeEventListener('resize', handleResize);
    };
  }, [isPointerActive, pointerPosition]);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" style={{ touchAction: 'none' }} />;
};

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
};

type GridLine = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
};

type Ripple = {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  color: string;
  speed: number;
};

type DigitalRainDrop = {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  size: number;
  length: number;
  character: string;
};

type Circle = {
  x: number;
  y: number;
  radius: number;
  color: string;
  opacity: number;
  pulseSpeed: number;
  pulseDirection: number;
  rotationAngle: number;
  rotationSpeed: number;
};

export default FuturisticBackground;
