import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  color: string;
}

export const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with smooth easing
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Palette reflecting backend & system vibes (Cyan, Violet, Emerald, Zinc)
    const colors = [
      'rgba(6, 182, 212, ',   // cyan
      'rgba(99, 102, 241, ',  // indigo
      'rgba(16, 185, 129, ',  // emerald
      'rgba(228, 228, 231, ', // zinc
    ];

    let particles: Particle[] = [];

    const initParticles = () => {
      // Clean and laconic particle count based on screen area
      const count = Math.min(
        Math.max(Math.floor((width * height) / 24000), 22),
        55
      );
      particles = [];

      for (let i = 0; i < count; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.2 + 0.8,
          baseAlpha: Math.random() * 0.3 + 0.15,
          color,
        });
      }
    };

    initParticles();

    const CONNECTION_DIST = 130;
    const CONNECTION_DIST_SQ = CONNECTION_DIST * CONNECTION_DIST;
    const MOUSE_DIST = 150;
    const MOUSE_DIST_SQ = MOUSE_DIST * MOUSE_DIST;

    let isVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let lastTime = performance.now();

    const render = (time: number) => {
      if (!isVisible) return;

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Mouse smooth interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Subtle mouse spotlight
      if (mouse.x > -500) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          280
        );
        gradient.addColorStop(0, 'rgba(6, 182, 212, 0.05)');
        gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.02)');
        gradient.addColorStop(1, 'rgba(9, 9, 11, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 280, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update and draw particles
      const pLen = particles.length;
      for (let i = 0; i < pLen; i++) {
        const p = particles[i];

        // Motion
        p.x += p.vx * dt * 60;
        p.y += p.vy * dt * 60;

        // Wrap edges smoothly
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        // Mouse gentle repulsion & connection
        if (mouse.x > -500) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdistSq = mdx * mdx + mdy * mdy;
          if (mdistSq < MOUSE_DIST_SQ && mdistSq > 1) {
            const mdist = Math.sqrt(mdistSq);
            const force = (1 - mdist / MOUSE_DIST) * 0.5;
            p.x += (mdx / mdist) * force;
            p.y += (mdy / mdist) * force;

            // Faint glowing link to mouse
            const lineAlpha = (1 - mdist / MOUSE_DIST) * 0.2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.baseAlpha})`;
        ctx.fill();

        // Connect nearby particles (inter-node mesh)
        for (let j = i + 1; j < pLen; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < CONNECTION_DIST_SQ) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / CONNECTION_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(161, 161, 170, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 1. Deep Obsidian Base */}
      <div className="absolute inset-0 bg-[#09090b]" />

      {/* 2. Soft Ambient Glowing Auroras / Nebulas */}
      <div className="absolute -top-36 -left-36 w-[550px] h-[550px] bg-cyan-500/[0.08] rounded-full blur-[140px] animate-pulse-slow pointer-events-none" />
      <div className="absolute top-1/3 -right-36 w-[500px] h-[500px] bg-indigo-500/[0.08] rounded-full blur-[160px] animate-pulse-slow pointer-events-none [animation-delay:2s]" />
      <div className="absolute -bottom-36 left-1/4 w-[450px] h-[450px] bg-emerald-500/[0.06] rounded-full blur-[140px] animate-pulse-slow pointer-events-none [animation-delay:4s]" />

      {/* 3. Sleek Modern Tech Grid with Radial Vignette */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 30%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 30%, transparent 95%)',
        }}
      />

      {/* 4. Fine Accent Dots at larger intervals */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(6, 182, 212, 0.45) 1px, transparent 1px)`,
          backgroundSize: '96px 96px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 90%)',
        }}
      />

      {/* 5. Dynamic Interactive Canvas (Network nodes & faint connections) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-90"
      />

      {/* 6. Top & Bottom subtle vignettes */}
      <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-[#09090b] via-[#09090b]/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent pointer-events-none" />
    </div>
  );
};
