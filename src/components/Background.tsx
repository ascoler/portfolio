import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  color: string;
  depth: number; // 0 = distant dust, 1 = mid-field, 2 = near radiant giant
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  hasSpikes?: boolean;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  fadeSpeed: number;
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
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);

    // Astronomical star spectral color temperatures
    const starColors = [
      { r: 255, g: 255, b: 255 }, // Class A: Pure Diamond White
      { r: 186, g: 230, b: 253 }, // Class B: Deep Ice Cyan (Rigel / Vega)
      { r: 224, g: 231, b: 255 }, // Class O: High-energy Pale Indigo
      { r: 254, g: 240, b: 138 }, // Class G: Warm Stellar Amber (Sun / Capella)
      { r: 245, g: 208, b: 254 }, // Class M: Soft Nebular Lavender
    ];

    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let nextMeteorTime = performance.now() + 1200;

    // Smooth mouse parallax
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const initStars = () => {
      const logicalWidth = window.innerWidth;
      const logicalHeight = window.innerHeight;

      // Density calculation: rich starfield without clutter or lag
      const count = Math.min(
        Math.max(Math.floor((logicalWidth * logicalHeight) / 4500), 160),
        320
      );

      stars = [];

      // Margin around canvas to avoid clipping during parallax
      const margin = 80 * dpr;

      for (let i = 0; i < count; i++) {
        // Distribution: 62% deep distant dust, 26% mid constellations, 12% bright celestial giants
        const depthRoll = Math.random();
        let depth = 0;
        let radius = 0;
        let baseAlpha = 0;
        let hasSpikes = false;

        if (depthRoll < 0.62) {
          depth = 0;
          radius = (Math.random() * 0.45 + 0.35) * dpr;
          baseAlpha = Math.random() * 0.35 + 0.2;
        } else if (depthRoll < 0.88) {
          depth = 1;
          radius = (Math.random() * 0.65 + 0.8) * dpr;
          baseAlpha = Math.random() * 0.4 + 0.45;
        } else {
          depth = 2;
          radius = (Math.random() * 0.9 + 1.4) * dpr;
          baseAlpha = Math.random() * 0.3 + 0.7;
          hasSpikes = Math.random() > 0.4;
        }

        const colorObj = starColors[Math.floor(Math.random() * starColors.length)];
        const color = `${colorObj.r}, ${colorObj.g}, ${colorObj.b}`;

        stars.push({
          x: Math.random() * (width + margin * 2) - margin,
          y: Math.random() * (height + margin * 2) - margin,
          radius,
          color,
          depth,
          baseAlpha,
          twinkleSpeed: Math.random() * 1.8 + 0.6,
          twinklePhase: Math.random() * Math.PI * 2,
          hasSpikes,
        });
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
      initStars();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    initStars();

    const spawnMeteor = (now: number) => {
      // Natural celestial trajectory: upper right heading down-left (~130° to 145°)
      const angle = (Math.PI / 180) * (135 + (Math.random() * 20 - 10));
      const meteorColors = ['255, 255, 255', '6, 182, 212', '165, 243, 252', '224, 231, 255'];
      const color = meteorColors[Math.floor(Math.random() * meteorColors.length)];

      meteors.push({
        x: Math.random() * (width * 0.8) + width * 0.2,
        y: Math.random() * (height * 0.35) - 40 * dpr,
        length: (Math.random() * 110 + 80) * dpr,
        speed: (Math.random() * 14 + 18) * dpr,
        angle,
        alpha: 1,
        fadeSpeed: Math.random() * 0.02 + 0.016,
        color,
      });

      // Next meteor in 4 to 8.5 seconds
      nextMeteorTime = now + (Math.random() * 4500 + 4000);
    };

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
    const margin = 80 * dpr;

    const render = (time: number) => {
      if (!isVisible) return;

      lastTime = time;

      // Smooth mouse parallax easing
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Check meteor spawn
      if (time > nextMeteorTime && meteors.length < 2) {
        spawnMeteor(time);
      }

      // Draw and update Stars
      const sLen = stars.length;
      for (let i = 0; i < sLen; i++) {
        const s = stars[i];

        // Cosmic slow drift upward
        s.y -= (0.03 + s.depth * 0.025) * dpr;
        if (s.y < -margin) {
          s.y = height + margin;
          s.x = Math.random() * (width + margin * 2) - margin;
        }

        // Parallax offset by depth layer
        const parallaxFactor = (s.depth + 1) * 12 * dpr;
        const px = s.x + mouse.x * parallaxFactor;
        const py = s.y + mouse.y * parallaxFactor;

        // Skip rendering if completely off canvas view
        if (px < -30 || px > width + 30 || py < -30 || py > height + 30) {
          continue;
        }

        // Twinkle calculation
        const twinkle = Math.sin(time * 0.0012 * s.twinkleSpeed + s.twinklePhase);
        const currentAlpha = Math.max(0.12, Math.min(1, s.baseAlpha + twinkle * 0.3));

        // Draw radiant halo for near bright stars
        if (s.depth === 2) {
          const glowRadius = s.radius * 4.2;
          const halo = ctx.createRadialGradient(px, py, 0, px, py, glowRadius);
          halo.addColorStop(0, `rgba(${s.color}, ${currentAlpha * 0.45})`);
          halo.addColorStop(0.4, `rgba(${s.color}, ${currentAlpha * 0.12})`);
          halo.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(px, py, glowRadius, 0, Math.PI * 2);
          ctx.fill();

          // Delicate 4-point diffraction cross spikes (James Webb / Hubble telescope style)
          if (s.hasSpikes && currentAlpha > 0.42) {
            const spikeLen = s.radius * 3.8;
            const spikeAlpha = currentAlpha * 0.35;

            ctx.strokeStyle = `rgba(${s.color}, ${spikeAlpha})`;
            ctx.lineWidth = 0.6 * dpr;

            ctx.beginPath();
            // Horizontal spike
            ctx.moveTo(px - spikeLen, py);
            ctx.lineTo(px + spikeLen, py);
            // Vertical spike
            ctx.moveTo(px, py - spikeLen);
            ctx.lineTo(px, py + spikeLen);
            ctx.stroke();
          }
        }

        // Star core point
        ctx.beginPath();
        ctx.arc(px, py, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color}, ${currentAlpha})`;
        ctx.fill();
      }

      // Draw and update Meteors
      for (let m = meteors.length - 1; m >= 0; m--) {
        const meteor = meteors[m];

        meteor.x += Math.cos(meteor.angle) * meteor.speed;
        meteor.y += Math.sin(meteor.angle) * meteor.speed;
        meteor.alpha -= meteor.fadeSpeed;

        if (
          meteor.alpha <= 0 ||
          meteor.x < -100 ||
          meteor.y > height + 100
        ) {
          meteors.splice(m, 1);
          continue;
        }

        const tailX = meteor.x - Math.cos(meteor.angle) * meteor.length;
        const tailY = meteor.y - Math.sin(meteor.angle) * meteor.length;

        const grad = ctx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        grad.addColorStop(0.65, `rgba(${meteor.color}, ${meteor.alpha * 0.45})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${meteor.alpha})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6 * dpr;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(meteor.x, meteor.y);
        ctx.stroke();

        // Glowing core head of meteor
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, 2.2 * dpr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${meteor.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#040407]">
      {/* 1. Deep Space Nebulae — Multi-layered atmospheric luminous clouds */}
      <div 
        className="absolute -top-48 -left-48 w-[720px] h-[720px] rounded-full blur-[170px] pointer-events-none opacity-45 animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.20) 0%, rgba(59, 130, 246, 0.10) 45%, transparent 75%)',
        }}
      />

      <div 
        className="absolute top-1/4 -right-48 w-[680px] h-[680px] rounded-full blur-[190px] pointer-events-none opacity-35 animate-pulse-slow [animation-delay:3.5s]"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, rgba(217, 70, 239, 0.09) 50%, transparent 75%)',
        }}
      />

      <div 
        className="absolute -bottom-48 left-1/4 w-[750px] h-[750px] rounded-full blur-[180px] pointer-events-none opacity-30 animate-pulse-slow [animation-delay:6s]"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(6, 182, 212, 0.08) 50%, transparent 75%)',
        }}
      />

      {/* 2. Central Stellar Dust Lane / Milky Way mist */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[500px] rounded-full blur-[220px] pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.16) 0%, rgba(6, 182, 212, 0.08) 40%, transparent 70%)',
        }}
      />

      {/* 3. Deep Space Starlight & Meteor Canvas (NO AI SLOP GRID) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 4. Cinematic edge vignettes for visual depth */}
      <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-[#040407] via-[#040407]/75 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#040407] via-[#040407]/75 to-transparent pointer-events-none" />
    </div>
  );
};
