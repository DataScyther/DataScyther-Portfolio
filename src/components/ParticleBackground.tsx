
import React, { useEffect, useRef, useState } from 'react';

const ParticleBackground: React.FC = () => {
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

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize particles - more particles with higher visibility
    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 10000); // Higher density

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2.5 + 1, // Larger particles
          speedX: (Math.random() - 0.5) * 0.8, // Faster particles
          speedY: (Math.random() - 0.5) * 0.8,
          opacity: Math.random() * 0.8 + 0.4, // More visible opacity
          color: i % 3 === 0 
            ? 'rgba(155, 135, 245, 0.9)' // More vibrant colors
            : i % 3 === 1 
              ? 'rgba(30, 174, 219, 0.9)' 
              : 'rgba(217, 70, 239, 0.9)',
        });
      }
    };

    // Initialize futuristic grid - with more visible lines
    const initGridLines = () => {
      gridLines = [];
      const spacing = 80; // Moderate grid cells for balance
      
      // Create a more visible geometric grid pattern
      for (let y = 0; y < canvas.height; y += spacing) {
        gridLines.push({
          startX: 0,
          startY: y,
          endX: canvas.width,
          endY: y,
          color: 'rgba(155, 135, 245, 0.25)' // More visible line color
        });
      }
      
      for (let x = 0; x < canvas.width; x += spacing) {
        gridLines.push({
          startX: x,
          startY: 0,
          endX: x,
          endY: canvas.height,
          color: 'rgba(155, 135, 245, 0.25)'
        });
      }
      
      // Add diagonal lines for futuristic look - more visible
      for (let i = -canvas.height; i < canvas.width + canvas.height; i += spacing * 1.5) {
        gridLines.push({
          startX: i,
          startY: 0,
          endX: i + canvas.height,
          endY: canvas.height,
          color: 'rgba(30, 174, 219, 0.2)' // More visible diagonal line
        });
      }
    };

    // Create a more vibrant ripple effect
    const createRipple = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: 150,
        opacity: 0.8, // Higher opacity for visibility
        color: Math.random() > 0.5 
          ? 'rgba(30, 174, 219, 0.7)' 
          : 'rgba(155, 135, 245, 0.7)',
        speed: 2.5 // Faster ripples
      });
    };

    // Draw function
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw more visible grid
      drawGrid();
      
      // Update and draw ripples - more vibrant interactive effect
      drawRipples();
      
      // Update and draw particles - more visible
      drawParticles();
      
      animationFrameId = requestAnimationFrame(draw);
    };

    const drawGrid = () => {
      gridLines.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line.startX, line.startY);
        ctx.lineTo(line.endX, line.endY);
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 1.2;
        
        // Add more pronounced perspective distortion if pointer is active
        if (isPointerActive) {
          const distanceX = Math.abs(line.startX - pointerPosition.x) / canvas.width;
          const distanceY = Math.abs(line.startY - pointerPosition.y) / canvas.height;
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          ctx.globalAlpha = Math.max(0.1, 0.4 - distance * 0.4); // More visible change
        } else {
          ctx.globalAlpha = 0.25;
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
        ripple.opacity -= 0.008; // Moderate fade for balanced effect
        
        // Draw ripple
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = ripple.color;
        ctx.lineWidth = 2; // Thicker lines
        ctx.globalAlpha = ripple.opacity;
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

        // Connect nearby particles - more connections for visual interest
        if (index % 2 === 0) { // Connect more particles
          connectParticles(particle, index);
        }
        
        // Apply more noticeable influence from pointer position
        if (isPointerActive) {
          const dx = pointerPosition.x - particle.x;
          const dy = pointerPosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
            const force = (200 - distance) / 200;
            particle.speedX += (dx / distance) * force * 0.025; // More noticeable movement
            particle.speedY += (dy / distance) * force * 0.025;
            
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
        particle.speedX *= 0.99;
        particle.speedY *= 0.99;
      });
    };

    // Connect particles with visible lines if they're close enough
    const connectParticles = (p: Particle, index: number) => {
      for (let i = index + 1; i < particles.length; i += 2) { // Connect more particles
        if (i >= particles.length) break;
        
        const dx = p.x - particles[i].x;
        const dy = p.y - particles[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) { // Longer connection distance
          ctx.beginPath();
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = 0.2 * (1 - distance / 150); // More visible connections
          ctx.lineWidth = 0.8; // Slightly thicker lines
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
      createRipple(pos.x, pos.y);
    };

    const handlePointerMove = (e: TouchEvent | MouseEvent) => {
      const pos = getPointerPosition(e);
      setPointerPosition(pos);
      
      if (isPointerActive) {
        // Create ripples more frequently during movement
        if (Math.random() > 0.85) {
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

export default ParticleBackground;
