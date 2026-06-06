import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  glowSize: number;
  twinkleSpeed: number;
  twinklePhase: number;
  baseAlpha: number;
  driftX: number;
  driftY: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  intensity: number;
  age: number;
  maxLife: number;
  tailPositions: { x: number; y: number }[];
}

export function StarsBackground({ density = 0.6 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationId: number;
    
    // Fewer stars: base 120, adjusted by density
    const starCount = Math.floor(120 * Math.min(density, 1.2));
    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];
    
    const rand = (min: number, max: number) => min + Math.random() * (max - min);
    
    // Create a single star - NEON BLUE ONLY
    const createStar = (x: number, y: number, radius: number): Star => {
      return {
        x, y, radius,
        glowSize: radius * rand(2.0, 3.5),
        twinkleSpeed: rand(0.008, 0.02),
        twinklePhase: rand(0, Math.PI * 2),
        baseAlpha: rand(0.6, 0.9),
        driftX: rand(-0.005, 0.005),
        driftY: rand(-0.005, 0.005),
      };
    };
    
    // Initialize stars
    const initStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        const x = rand(0, width);
        const y = rand(0, height);
        let radius = rand(0.8, 2.2);
        // occasional slightly bigger star (but still blue)
        if (Math.random() < 0.08) radius = rand(2.2, 3.2);
        stars.push(createStar(x, y, radius));
      }
    };
    
    // Spawn a shooting star - NEON BLUE
    const spawnShootingStar = (): ShootingStar => {
      let startX: number, startY: number;
      const edge = Math.floor(rand(0, 3));
      
      if (edge === 0) {
        startX = rand(0, width);
        startY = rand(-20, height * 0.25);
      } else if (edge === 1) {
        startX = rand(width * 0.5, width + 40);
        startY = rand(-20, height * 0.35);
      } else {
        startX = rand(-30, width * 0.25);
        startY = rand(-20, height * 0.4);
      }
      
      const vx = rand(-3.5, -0.8);
      const vy = rand(1.5, 3.8);
      const length = rand(12, 28);
      
      return {
        x: startX, y: startY, vx, vy, length,
        intensity: 0.9,
        age: 0,
        maxLife: rand(0.8, 1.4),
        tailPositions: [],
      };
    };
    
    // Update shooting stars
    const updateShootingStars = (deltaTime: number) => {
      // Spawn new shooting stars occasionally (less frequent)
      if (shootingStars.length < 4 && Math.random() < 0.012) {
        shootingStars.push(spawnShootingStar());
      }
      
      for (let i = 0; i < shootingStars.length; i++) {
        const s = shootingStars[i];
        
        s.tailPositions.unshift({ x: s.x, y: s.y });
        const maxTrail = Math.floor(s.length * 1.2);
        if (s.tailPositions.length > maxTrail) s.tailPositions.pop();
        
        s.x += s.vx;
        s.y += s.vy;
        s.age += deltaTime;
        
        let life = 1.0 - (s.age / s.maxLife);
        if (life < 0) life = 0;
        s.intensity = life;
        
        if (s.x + 100 < 0 || s.x - 100 > width || s.y + 100 < 0 || s.y - 100 > height || life <= 0.02) {
          shootingStars.splice(i, 1);
          i--;
        }
      }
    };
    
    // Drift stars very slowly
    const applyStarDrift = () => {
      for (const star of stars) {
        star.x += star.driftX;
        star.y += star.driftY;
        if (star.x < -40) star.x = width + 40;
        if (star.x > width + 40) star.x = -40;
        if (star.y < -40) star.y = height + 40;
        if (star.y > height + 40) star.y = -40;
      }
    };
    
    // Draw everything - NEON BLUE ONLY
    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);
      
      // Draw background stars - all neon blue
      for (const star of stars) {
        const twinkle = Math.sin(Date.now() * star.twinkleSpeed + star.twinklePhase) * 0.2 + 0.8;
        const alpha = Math.min(0.85, Math.max(0.35, star.baseAlpha * twinkle));
        
        // Neon blue color palette: deep blue to electric cyan
        const coreColor = `hsla(210, 100%, 65%, ${alpha})`;
        const glowColor = `hsla(200, 100%, 60%, ${alpha * 0.7})`;
        
        // Outer glow
        ctx.shadowBlur = star.glowSize * 1.0;
        ctx.shadowColor = `rgba(0, 150, 255, 0.8)`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 0.9, 0, Math.PI * 2);
        ctx.fillStyle = glowColor;
        ctx.fill();
        
        // Inner core - brighter blue
        ctx.shadowBlur = star.glowSize * 0.6;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = coreColor;
        ctx.fill();
        
        // Bright center point
        ctx.shadowBlur = 2;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 220, 255, 0.95)`;
        ctx.fill();
      }
      
      ctx.shadowBlur = 0;
      
      // Draw shooting stars - neon blue streaks
      for (const meteor of shootingStars) {
        if (meteor.tailPositions.length < 2) continue;
        if (meteor.intensity <= 0.03) continue;
        
        const intensity = meteor.intensity;
        
        // Draw trail
        for (let i = 0; i < meteor.tailPositions.length - 1; i++) {
          const p1 = meteor.tailPositions[i];
          const p2 = meteor.tailPositions[i + 1];
          if (!p1 || !p2) continue;
          
          const t = i / (meteor.tailPositions.length - 1);
          const width = Math.max(1.2, 4.0 * (1 - t * 0.6) * intensity);
          const alphaFactor = 1.0 - t * 0.7;
          
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `hsla(205, 100%, 65%, ${intensity * alphaFactor * 0.9})`;
          ctx.lineWidth = width;
          ctx.shadowBlur = width * 1.2;
          ctx.shadowColor = `rgba(0, 160, 255, 0.9)`;
          ctx.stroke();
        }
        
        // Bright head
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(0, 150, 255, 0.8)`;
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, 2.0 * intensity + 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(200, 100%, 70%, ${intensity})`;
        ctx.fill();
        
        // Core
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, 1.0 * intensity, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 230, 255, ${intensity * 0.9})`;
        ctx.fill();
      }
      
      ctx.shadowBlur = 0;
    };
    
    // Handle resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      // Recalculate star positions that are out of bounds
      for (let i = 0; i < stars.length; i++) {
        if (stars[i].x < 0 || stars[i].x > width || stars[i].y < 0 || stars[i].y > height) {
          stars[i].x = rand(0, width);
          stars[i].y = rand(0, height);
        }
      }
    };
    
    // Animation loop
    let lastTime = performance.now();
    const animate = (now: number) => {
      let delta = Math.min(0.033, (now - lastTime) / 1000);
      if (delta <= 0) delta = 1 / 60;
      lastTime = now;
      
      applyStarDrift();
      updateShootingStars(delta);
      draw();
      
      animationId = requestAnimationFrame(animate);
    };
    
    // Setup
    handleResize();
    initStars();
    
    // Spawn a couple initial shooting stars
    setTimeout(() => shootingStars.push(spawnShootingStar()), 500);
    setTimeout(() => shootingStars.push(spawnShootingStar()), 1500);
    
    // Occasional meteor shower (every 12 seconds)
    const showerInterval = setInterval(() => {
      if (shootingStars.length < 5) {
        shootingStars.push(spawnShootingStar());
        setTimeout(() => {
          if (shootingStars.length < 5) shootingStars.push(spawnShootingStar());
        }, 300);
      }
    }, 12000);
    
    window.addEventListener("resize", handleResize);
    lastTime = performance.now();
    animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(showerInterval);
      window.removeEventListener("resize", handleResize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ background: "transparent" }}
    />
  );
}