
import React, { useEffect, useRef, useState } from 'react';
import { 
  initParticles,
  initGridLines,
  initDigitalRain,
  initCircles,
  createRipple,
  getPointerPosition
} from './background/BackgroundUtils';
import {
  drawDigitalRain,
  drawCircles,
  drawGrid,
  drawRipples,
  drawParticles
} from './background/DrawingFunctions';
import { Particle, GridLine, Ripple, DigitalRainDrop, Circle } from './background/BackgroundTypes';

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

    // Draw function
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw digital rain (Matrix effect)
      digitalRain = drawDigitalRain(ctx, digitalRain, canvas.height);
      
      // Draw energy circles
      circles = drawCircles(ctx, circles);
      
      // Draw hexagonal grid
      drawGrid(ctx, gridLines, isPointerActive, pointerPosition, canvas.width, canvas.height);
      
      // Update and draw ripples
      ripples = drawRipples(ctx, ripples);
      
      // Update and draw particles
      particles = drawParticles(ctx, particles, isPointerActive, pointerPosition, canvas.width, canvas.height);
      
      animationFrameId = requestAnimationFrame(draw);
    };

    // Pointer event handlers
    const handlePointerDown = (e: TouchEvent | MouseEvent) => {
      setIsPointerActive(true);
      const pos = getPointerPosition(e);
      setPointerPosition(pos);
      
      // Create multiple ripples for more impact
      ripples = createRipple(ripples, pos.x, pos.y);
      
      // Offset ripples
      setTimeout(() => {
        ripples = createRipple(ripples, pos.x + 20, pos.y - 20);
      }, 100);
      setTimeout(() => {
        ripples = createRipple(ripples, pos.x - 30, pos.y + 10);
      }, 200);
    };

    const handlePointerMove = (e: TouchEvent | MouseEvent) => {
      const pos = getPointerPosition(e);
      setPointerPosition(pos);
      
      if (isPointerActive) {
        // Occasionally create ripples during movement
        if (Math.random() > 0.90) {
          ripples = createRipple(ripples, pos.x, pos.y);
        }
      }
    };

    const handlePointerUp = () => {
      setIsPointerActive(false);
    };

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
      particles = initParticles(canvas.width, canvas.height);
      gridLines = initGridLines(canvas.width, canvas.height);
      digitalRain = initDigitalRain(canvas.width, canvas.height);
      circles = initCircles(canvas.width, canvas.height);
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
    particles = initParticles(canvas.width, canvas.height);
    gridLines = initGridLines(canvas.width, canvas.height);
    digitalRain = initDigitalRain(canvas.width, canvas.height);
    circles = initCircles(canvas.width, canvas.height);
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

export default FuturisticBackground;
