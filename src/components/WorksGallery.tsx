'use client';

import { useEffect, useRef, useMemo, useState } from 'react';
import Image from 'next/image';

// ── Types ──────────────────────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  tx: number; // target x
  ty: number; // target y
  vx: number;
  vy: number;
  alpha: number;
  size: number;
}

// ── Building silhouette keypoints (normalized 0-1) ─────────────────────────
// Each shape is a flat list of [x,y] pairs that form the "wireframe" of a building
const SHAPES: [number, number][][] = [
  // Shape 1 — Simple residential house (elevation)
  [
    [0.3,0.7],[0.7,0.7],[0.7,0.35],[0.5,0.15],[0.3,0.35],[0.3,0.7],
    [0.4,0.7],[0.4,0.5],[0.6,0.5],[0.6,0.7], // door/window block
    [0.43,0.35],[0.57,0.35],[0.57,0.25],[0.43,0.25],[0.43,0.35], // upper window
  ],
  // Shape 2 — Modern multi-storey (elevation)
  [
    [0.25,0.75],[0.75,0.75],[0.75,0.2],[0.25,0.2],[0.25,0.75],
    [0.35,0.35],[0.65,0.35], // floor line 1
    [0.35,0.5],[0.65,0.5],   // floor line 2
    [0.35,0.65],[0.65,0.65], // floor line 3
    [0.35,0.2],[0.35,0.75],  // vertical grid
    [0.5,0.2],[0.5,0.75],
    [0.65,0.2],[0.65,0.75],
  ],
  // Shape 3 — Villa with pitched roof (elevation)
  [
    [0.2,0.78],[0.8,0.78],[0.8,0.42],[0.65,0.42],[0.65,0.22],[0.5,0.1],
    [0.35,0.22],[0.35,0.42],[0.2,0.42],[0.2,0.78],
    [0.38,0.78],[0.38,0.58],[0.62,0.58],[0.62,0.78], // garage
    [0.44,0.55],[0.44,0.42],[0.56,0.42],[0.56,0.55],[0.44,0.55], // window
  ],
  // Shape 4 — Apartment block perspective
  [
    [0.3,0.75],[0.3,0.25],[0.7,0.25],[0.7,0.75],[0.3,0.75],
    [0.3,0.25],[0.5,0.12],[0.7,0.25],
    [0.5,0.12],[0.5,0.75],
    [0.38,0.75],[0.38,0.35],[0.62,0.35],[0.62,0.75],
    [0.38,0.55],[0.62,0.55],
  ],
];

function expandShape(shape: [number, number][], count: number, w: number, h: number): [number, number][] {
  const pts: [number, number][] = [];
  // Distribute `count` points along the line segments of the shape
  const totalPts = shape.length;
  const perSeg = Math.floor(count / Math.max(totalPts - 1, 1));
  for (let s = 0; s < totalPts - 1; s++) {
    const [x0, y0] = shape[s];
    const [x1, y1] = shape[s + 1];
    for (let p = 0; p < perSeg; p++) {
      const t = p / perSeg;
      pts.push([x0 + (x1 - x0) * t, y0 + (y1 - y0) * t]);
    }
  }
  // Fill remaining to exactly `count`
  while (pts.length < count) pts.push(shape[shape.length - 1]);
  return pts.slice(0, count);
}

// ── Component ───────────────────────────────────────────────────────────────
export default function WorksGallery({ images }: { images: string[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const featuredImages = useMemo(() => images.slice(0, 20), [images]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const PARTICLE_COUNT = 320;
    const GOLD = '#C8A96E';
    const BG = '#020202';

    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    canvas.width = w;
    canvas.height = h;

    // Initialise particles scattered randomly
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      tx: Math.random() * w,
      ty: Math.random() * h,
      vx: 0,
      vy: 0,
      alpha: Math.random(),
      size: Math.random() * 1.5 + 0.5,
    }));

    let shapeIndex = 0;
    let phase: 'assemble' | 'hold' | 'dissolve' = 'assemble';
    let phaseTimer = 0;

    function setTargets(idx: number) {
      const shape = SHAPES[idx % SHAPES.length];
      const targets = expandShape(shape, PARTICLE_COUNT, w, h);
      // Add slight scatter for a "blueprint glow" feel
      const cx = w * 0.5, cy = h * 0.5;
      const scaleX = w * 0.5, scaleY = h * 0.52;
      particles.forEach((p, i) => {
        const [nx, ny] = targets[i];
        p.tx = cx + (nx - 0.5) * scaleX + (Math.random() - 0.5) * 4;
        p.ty = cy + (ny - 0.5) * scaleY + (Math.random() - 0.5) * 4;
      });
    }

    function dissolveTargets() {
      particles.forEach(p => {
        p.tx = Math.random() * w;
        p.ty = Math.random() * h;
      });
    }

    setTargets(shapeIndex);

    let raf: number;
    let lastTime = 0;

    function draw(now: number) {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      phaseTimer += dt;

      // Phase timing
      if (phase === 'assemble' && phaseTimer > 3.5) { phase = 'hold'; phaseTimer = 0; }
      if (phase === 'hold'     && phaseTimer > 2.5) { phase = 'dissolve'; phaseTimer = 0; dissolveTargets(); }
      if (phase === 'dissolve' && phaseTimer > 2.0) {
        shapeIndex++;
        setTargets(shapeIndex);
        phase = 'assemble';
        phaseTimer = 0;
      }

      // Clear with slight trail for motion-blur feel
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, w, h);

      particles.forEach(p => {
        // Spring towards target
        const spring = phase === 'hold' ? 4 : 3;
        const damp = 0.78;
        p.vx = (p.vx + (p.tx - p.x) * spring * dt) * damp;
        p.vy = (p.vy + (p.ty - p.y) * spring * dt) * damp;
        p.x += p.vx;
        p.y += p.vy;

        // Fade in when assembling, keep bright when holding, fade out when dissolving
        if (phase === 'dissolve') p.alpha = Math.max(0, p.alpha - dt * 0.7);
        else p.alpha = Math.min(1, p.alpha + dt * 0.8);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = GOLD + Math.round(p.alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(t => { lastTime = t; draw(t); });

    // Handle resize
    const onResize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
      setTargets(shapeIndex);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="relative w-full h-[100dvh] bg-[#020202] overflow-hidden">
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      />

      {/* Overlay Text */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center text-center px-6">
        <p className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-[#C8A96E] mb-6">
          // SHINING CLOUD STUDIO — ARCHIVE
        </p>
        <h1 className="text-6xl md:text-[9rem] lg:text-[12rem] font-black uppercase tracking-[-0.05em] text-white/8 select-none leading-none">
          CATALOG.
        </h1>
        <div className="flex flex-col items-center gap-4 mt-10">
          <div className="w-[1px] h-16 bg-gradient-to-b from-[#C8A96E]/60 to-transparent" />
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40">
            Scroll to Explore Archive
          </p>
        </div>
      </div>

      {/* Subtle vignette */}
      <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#020202_100%)]" />
    </div>
  );
}
