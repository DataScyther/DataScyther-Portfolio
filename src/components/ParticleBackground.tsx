
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

    // Initialize particles - fewer for minimalism
    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 40000); // Much lower density

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1 + 0.5, // Smaller particles
          speedX: (Math.random() - 0.5) * 0.2, // Slower particles
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.3 + 0.1, // More subtle opacity
          color: i % 3 === 0 
            ? 'rgba(155, 135, 245, 0.3)' // More transparent colors
            : i % 3 === 1 
              ? 'rgba(30, 174, 219, 0.3)' 
              : 'rgba(217, 70, 239, 0.3)',
        });
      }
    };

    // Initialize futuristic grid - geometric pattern with larger spacing
    const initGridLines = () => {
      gridLines = [];
      const spacing = 150; // Much larger grid cells for minimalism
      
      // Create a minimal geometric grid pattern
      for (let y = 0; y < canvas.height; y += spacing) {
        gridLines.push({
          startX: 0,
          startY: y,
          endX: canvas.width,
          endY: y,
          color: 'rgba(155, 135, 245, 0.05)' // Very subtle line color
        });
      }
      
      for (let x = 0; x < canvas.width; x += spacing) {
        gridLines.push({
          startX: x,
          startY: 0,
          endX: x,
          endY: canvas.height,
          color: 'rgba(155, 135, 245, 0.05)'
        });
      }
      
      // Add diagonal lines for futuristic look - but minimal
      for (let i = -canvas.height; i < canvas.width + canvas.height; i += spacing * 2) {
        gridLines.push({
          startX: i,
          startY: 0,
          endX: i + canvas.height,
          endY: canvas.height,
          color: 'rgba(30, 174, 219, 0.03)' // Very subtle diagonal line
        });
      }
    };

    // Create a subtle ripple effect
    const createRipple = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: 80,
        opacity: 0.3, // Lower opacity for subtlety
        color: Math.random() > 0.5 
          ? 'rgba(30, 174, 219, 0.2)' 
          : 'rgba(155, 135, 245, 0.2)',
        speed: 1 // Slower ripples
      });
    };

    // Draw function
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw minimalist grid
      drawGrid();
      
      // Update and draw ripples - subtle interactive effect
      drawRipples();
      
      // Update and draw particles - minimal
      drawParticles();
      
      animationFrameId = requestAnimationFrame(draw);
    };

    const drawGrid = () => {
      gridLines.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line.startX, line.startY);
        ctx.lineTo(line.endX, line.endY);
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 0.5;
        
        // Add subtle perspective distortion if pointer is active
        if (isPointerActive) {
          const distanceX = Math.abs(line.startX - pointerPosition.x) / canvas.width;
          const distanceY = Math.abs(line.startY - pointerPosition.y) / canvas.height;
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          ctx.globalAlpha = Math.max(0.02, 0.1 - distance * 0.1); // Very subtle change
        } else {
          ctx.globalAlpha = 0.05;
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
        ripple.opacity -= 0.005; // Slower fade for subtle effect
        
        // Draw ripple
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = ripple.color;
        ctx.lineWidth = 0.5; // Thinner lines
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

        // Connect nearby particles - very selectively for minimalism
        if (index % 5 === 0) { // Connect only every fifth particle
          connectParticles(particle, index);
        }
        
        // Apply subtle influence from pointer position
        if (isPointerActive) {
          const dx = pointerPosition.x - particle.x;
          const dy = pointerPosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const force = (150 - distance) / 150;
            particle.speedX += (dx / distance) * force * 0.005; // More subtle movement
            particle.speedY += (dy / distance) * force * 0.005;
            
            // Limit speed
            const maxSpeed = 1;
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

    // Connect particles with very thin lines if they're close enough
    const connectParticles = (p: Particle, index: number) => {
      for (let i = index + 1; i < particles.length; i += 3) { // Skip more particles for minimalism
        if (i >= particles.length) break;
        
        const dx = p.x - particles[i].x;
        const dy = p.y - particles[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) { // Shorter connection distance
          ctx.beginPath();
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = 0.03 * (1 - distance / 100); // Extremely subtle connections
          ctx.lineWidth = 0.3; // Very thin lines
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
        // Occasionally create ripples during movement (but very infrequent)
        if (Math.random() > 0.98) {
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
