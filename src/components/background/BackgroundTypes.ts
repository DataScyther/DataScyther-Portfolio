
// Type definitions for the futuristic background components

export type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
};

export type GridLine = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
};

export type Ripple = {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  color: string;
  speed: number;
};

export type DigitalRainDrop = {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  size: number;
  length: number;
  character: string;
};

export type Circle = {
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
