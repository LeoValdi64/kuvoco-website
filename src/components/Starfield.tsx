"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create stars - fewer, larger
    const createStars = () => {
      const stars: Star[] = [];
      const numStars = 40; // Fewer stars
      
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 3, // Spread across 3x viewport for scroll
          size: Math.random() * 2 + 1.5, // Larger: 1.5-3.5px
          opacity: Math.random() * 0.4 + 0.6, // More opaque: 0.6-1.0
          speed: Math.random() * 0.3 + 0.1, // Parallax speed multiplier
        });
      }
      starsRef.current = stars;
    };
    createStars();

    // Track scroll
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Track mouse for reactivity
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scroll = scrollRef.current;
      const mouse = mouseRef.current;

      starsRef.current.forEach((star) => {
        // Parallax: stars move at different speeds based on their speed property
        const parallaxY = star.y - scroll * star.speed;
        
        // Wrap stars vertically
        const wrappedY = ((parallaxY % (canvas.height * 3)) + canvas.height * 3) % (canvas.height * 3) - canvas.height;
        
        // Mouse reactivity - subtle push away from cursor
        const dx = star.x - mouse.x;
        const dy = wrappedY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;
        
        let offsetX = 0;
        let offsetY = 0;
        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 15;
          offsetX = (dx / dist) * force;
          offsetY = (dy / dist) * force;
        }

        const finalX = star.x + offsetX;
        const finalY = wrappedY + offsetY;

        // Only draw if in viewport
        if (finalY > -50 && finalY < canvas.height + 50) {
          // Create gradient for soft glow
          const gradient = ctx.createRadialGradient(
            finalX, finalY, 0,
            finalX, finalY, star.size * 2
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
          gradient.addColorStop(0.5, `rgba(200, 220, 255, ${star.opacity * 0.5})`);
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

          ctx.beginPath();
          ctx.arc(finalX, finalY, star.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

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
        mixBlendMode: "screen" // Blend with background colors
      }}
      aria-hidden="true"
    />
  );
}
