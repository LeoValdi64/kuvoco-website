"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  speed: number;
  // Autonomous movement
  driftX: number;
  driftY: number;
  driftSpeed: number;
  phase: number;
  // Twinkle
  twinkleSpeed: number;
  twinklePhase: number;
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createStars();
    };

    // Create stars - fewer, smaller
    const createStars = () => {
      const stars: Star[] = [];
      const numStars = 25; // Even fewer stars
      
      for (let i = 0; i < numStars; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 3;
        stars.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * 1 + 0.5, // Smaller: 0.5-1.5px
          opacity: Math.random() * 0.3 + 0.7, // 0.7-1.0
          speed: Math.random() * 0.3 + 0.1,
          // Autonomous drift
          driftX: (Math.random() - 0.5) * 30, // How far it drifts
          driftY: (Math.random() - 0.5) * 30,
          driftSpeed: Math.random() * 0.0005 + 0.0003, // How fast it drifts
          phase: Math.random() * Math.PI * 2, // Starting phase
          // Twinkle
          twinkleSpeed: Math.random() * 0.002 + 0.001,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
      starsRef.current = stars;
    };

    resize();
    window.addEventListener("resize", resize);

    // Track scroll
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Track mouse
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });

    // Animation loop
    let animationId: number;
    let lastTime = performance.now();
    
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      timeRef.current += deltaTime;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scroll = scrollRef.current;
      const mouse = mouseRef.current;
      const time = timeRef.current;

      starsRef.current.forEach((star) => {
        // Autonomous drifting movement
        const driftOffsetX = Math.sin(time * star.driftSpeed + star.phase) * star.driftX;
        const driftOffsetY = Math.cos(time * star.driftSpeed + star.phase * 0.7) * star.driftY;
        
        // Parallax on scroll
        const parallaxY = star.baseY - scroll * star.speed;
        
        // Wrap vertically
        const wrappedY = ((parallaxY % (canvas.height * 3)) + canvas.height * 3) % (canvas.height * 3) - canvas.height;
        
        // Apply drift
        const driftedX = star.baseX + driftOffsetX;
        const driftedY = wrappedY + driftOffsetY;
        
        // Mouse reactivity
        const dx = driftedX - mouse.x;
        const dy = driftedY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 250;
        
        let offsetX = 0;
        let offsetY = 0;
        if (dist < maxDist && dist > 0) {
          const force = (1 - dist / maxDist) * 20;
          offsetX = (dx / dist) * force;
          offsetY = (dy / dist) * force;
        }

        const finalX = driftedX + offsetX;
        const finalY = driftedY + offsetY;

        // Twinkle effect
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
        const currentOpacity = star.opacity * twinkle;

        // Only draw if in viewport
        if (finalY > -20 && finalY < canvas.height + 20) {
          // Soft glow
          const gradient = ctx.createRadialGradient(
            finalX, finalY, 0,
            finalX, finalY, star.size * 3
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`);
          gradient.addColorStop(0.4, `rgba(200, 220, 255, ${currentOpacity * 0.4})`);
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

          ctx.beginPath();
          ctx.arc(finalX, finalY, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ 
        zIndex: 1,
        mixBlendMode: "screen"
      }}
      aria-hidden="true"
    />
  );
}
