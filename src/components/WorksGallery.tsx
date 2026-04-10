'use client';

import { useEffect, useRef, useMemo } from 'react';

// ── Full-screen architectural particle system ──────────────────────────
// Buildings are defined as segments (pairs of points, normalized 0–1)
// so they scale perfectly to any screen size.

const BUILDINGS: [number, number][][][] = [
  // ── Building 1: Large Modern Villa (fills ~80% of screen width) ──
  [
    // Main body
    [[0.05,0.85],[0.95,0.85]], // ground line
    [[0.05,0.85],[0.05,0.45]], // left wall
    [[0.95,0.85],[0.95,0.45]], // right wall
    [[0.05,0.45],[0.95,0.45]], // roof line (flat modern)
    // Left wing lower
    [[0.05,0.65],[0.30,0.65]],
    [[0.30,0.65],[0.30,0.45]],
    // Right wing lower
    [[0.70,0.65],[0.95,0.65]],
    [[0.70,0.65],[0.70,0.45]],
    // Centre raised section
    [[0.35,0.45],[0.35,0.25]],
    [[0.65,0.45],[0.65,0.25]],
    [[0.35,0.25],[0.65,0.25]],
    // Windows – left bank
    [[0.08,0.75],[0.22,0.75]], [[0.08,0.68],[0.22,0.68]],
    [[0.08,0.75],[0.08,0.68]], [[0.22,0.75],[0.22,0.68]],
    [[0.08,0.60],[0.22,0.60]], [[0.08,0.53],[0.22,0.53]],
    [[0.08,0.60],[0.08,0.53]], [[0.22,0.60],[0.22,0.53]],
    // Windows – centre block
    [[0.40,0.42],[0.48,0.42]], [[0.40,0.35],[0.48,0.35]],
    [[0.40,0.42],[0.40,0.35]], [[0.48,0.42],[0.48,0.35]],
    [[0.52,0.42],[0.60,0.42]], [[0.52,0.35],[0.60,0.35]],
    [[0.52,0.42],[0.52,0.35]], [[0.60,0.42],[0.60,0.35]],
    // Windows – right bank
    [[0.78,0.75],[0.92,0.75]], [[0.78,0.68],[0.92,0.68]],
    [[0.78,0.75],[0.78,0.68]], [[0.92,0.75],[0.92,0.68]],
    [[0.78,0.60],[0.92,0.60]], [[0.78,0.53],[0.92,0.53]],
    [[0.78,0.60],[0.78,0.53]], [[0.92,0.60],[0.92,0.53]],
    // Main door
    [[0.44,0.85],[0.44,0.70]], [[0.56,0.85],[0.56,0.70]],
    [[0.44,0.70],[0.56,0.70]],
    // Landscape lines
    [[0.00,0.90],[0.15,0.90]], [[0.85,0.90],[1.00,0.90]],
    [[0.00,0.92],[0.10,0.92]], [[0.90,0.92],[1.00,0.92]],
  ],

  // ── Building 2: Multi-storey Apartment Block ──
  [
    // Main facade
    [[0.10,0.88],[0.90,0.88]],
    [[0.10,0.88],[0.10,0.15]],
    [[0.90,0.88],[0.90,0.15]],
    [[0.10,0.15],[0.90,0.15]],
    // Floor lines
    [[0.10,0.30],[0.90,0.30]], [[0.10,0.45],[0.90,0.45]],
    [[0.10,0.60],[0.90,0.60]], [[0.10,0.75],[0.90,0.75]],
    // Vertical columns
    [[0.30,0.15],[0.30,0.88]], [[0.50,0.15],[0.50,0.88]], [[0.70,0.15],[0.70,0.88]],
    // Windows – Row 1 (0.15–0.30)
    [[0.13,0.19],[0.27,0.19]], [[0.13,0.27],[0.27,0.27]],
    [[0.13,0.19],[0.13,0.27]], [[0.27,0.19],[0.27,0.27]],
    [[0.33,0.19],[0.47,0.19]], [[0.33,0.27],[0.47,0.27]],
    [[0.33,0.19],[0.33,0.27]], [[0.47,0.19],[0.47,0.27]],
    [[0.53,0.19],[0.67,0.19]], [[0.53,0.27],[0.67,0.27]],
    [[0.53,0.19],[0.53,0.27]], [[0.67,0.19],[0.67,0.27]],
    [[0.73,0.19],[0.87,0.19]], [[0.73,0.27],[0.87,0.27]],
    [[0.73,0.19],[0.73,0.27]], [[0.87,0.19],[0.87,0.27]],
    // Row 2 (0.30–0.45)
    [[0.13,0.33],[0.27,0.33]], [[0.13,0.42],[0.27,0.42]],
    [[0.13,0.33],[0.13,0.42]], [[0.27,0.33],[0.27,0.42]],
    [[0.33,0.33],[0.47,0.33]], [[0.33,0.42],[0.47,0.42]],
    [[0.33,0.33],[0.33,0.42]], [[0.47,0.33],[0.47,0.42]],
    [[0.53,0.33],[0.67,0.33]], [[0.53,0.42],[0.67,0.42]],
    [[0.53,0.33],[0.53,0.42]], [[0.67,0.33],[0.67,0.42]],
    [[0.73,0.33],[0.87,0.33]], [[0.73,0.42],[0.87,0.42]],
    [[0.73,0.33],[0.73,0.42]], [[0.87,0.33],[0.87,0.42]],
    // Door + lobby
    [[0.42,0.88],[0.42,0.75]], [[0.58,0.88],[0.58,0.75]], [[0.42,0.75],[0.58,0.75]],
    // Parapet / roof detail
    [[0.10,0.12],[0.90,0.12]], [[0.15,0.12],[0.15,0.15]], [[0.85,0.12],[0.85,0.15]],
  ],

  // ── Building 3: Residential Bungalow with Pitched Roof ──
  [
    // Foundation & walls
    [[0.05,0.88],[0.95,0.88]],
    [[0.05,0.88],[0.05,0.55]],
    [[0.95,0.88],[0.95,0.55]],
    // Pitched roof
    [[0.05,0.55],[0.50,0.18]],
    [[0.95,0.55],[0.50,0.18]],
    // Chimney
    [[0.72,0.22],[0.72,0.10]],
    [[0.80,0.22],[0.80,0.10]],
    [[0.72,0.10],[0.80,0.10]],
    [[0.65,0.22],[0.87,0.22]],
    // Garage wing (left)
    [[0.05,0.55],[0.05,0.70]], // already covered
    [[0.05,0.70],[0.25,0.70]],
    [[0.25,0.70],[0.25,0.55]],
    // Garage door
    [[0.07,0.70],[0.07,0.58]], [[0.23,0.70],[0.23,0.58]],
    [[0.07,0.58],[0.23,0.58]],
    [[0.07,0.64],[0.23,0.64]], // mid rail
    // Front door
    [[0.44,0.88],[0.44,0.72]], [[0.56,0.88],[0.56,0.72]], [[0.44,0.72],[0.56,0.72]],
    // Windows
    [[0.30,0.72],[0.42,0.72]], [[0.30,0.63],[0.42,0.63]],
    [[0.30,0.72],[0.30,0.63]], [[0.42,0.72],[0.42,0.63]],
    [[0.58,0.72],[0.70,0.72]], [[0.58,0.63],[0.70,0.63]],
    [[0.58,0.72],[0.58,0.63]], [[0.70,0.72],[0.70,0.63]],
    [[0.75,0.72],[0.92,0.72]], [[0.75,0.63],[0.92,0.63]],
    [[0.75,0.72],[0.75,0.63]], [[0.92,0.72],[0.92,0.63]],
    // Gable window
    [[0.44,0.38],[0.56,0.38]], [[0.44,0.30],[0.56,0.30]],
    [[0.44,0.38],[0.44,0.30]], [[0.56,0.38],[0.56,0.30]],
    // Path
    [[0.46,0.88],[0.46,0.95]], [[0.54,0.88],[0.54,0.95]],
    [[0.46,0.95],[0.54,0.95]],
    // Landscape
    [[0.00,0.92],[0.05,0.92]], [[0.95,0.92],[1.00,0.92]],
  ],

  // ── Building 4: Luxury Villa with Pool (top view / elevation mix) ──
  [
    // Main structure
    [[0.08,0.82],[0.92,0.82]],
    [[0.08,0.82],[0.08,0.30]],
    [[0.92,0.82],[0.92,0.30]],
    [[0.08,0.30],[0.92,0.30]],
    // Wings
    [[0.08,0.55],[0.00,0.55]], [[0.00,0.55],[0.00,0.72]], [[0.00,0.72],[0.08,0.72]],
    [[0.92,0.55],[1.00,0.55]], [[1.00,0.55],[1.00,0.72]], [[1.00,0.72],[0.92,0.72]],
    // Horizontal floor bands
    [[0.08,0.46],[0.92,0.46]], [[0.08,0.62],[0.92,0.62]],
    // Vertical rhythm
    [[0.25,0.30],[0.25,0.82]], [[0.50,0.30],[0.50,0.82]], [[0.75,0.30],[0.75,0.82]],
    // Window grid row 1
    [[0.10,0.33],[0.23,0.33]], [[0.10,0.43],[0.23,0.43]],
    [[0.10,0.33],[0.10,0.43]], [[0.23,0.33],[0.23,0.43]],
    [[0.27,0.33],[0.48,0.33]], [[0.27,0.43],[0.48,0.43]],
    [[0.27,0.33],[0.27,0.43]], [[0.48,0.33],[0.48,0.43]],
    [[0.52,0.33],[0.73,0.33]], [[0.52,0.43],[0.73,0.43]],
    [[0.52,0.33],[0.52,0.43]], [[0.73,0.33],[0.73,0.43]],
    [[0.77,0.33],[0.90,0.33]], [[0.77,0.43],[0.90,0.43]],
    [[0.77,0.33],[0.77,0.43]], [[0.90,0.33],[0.90,0.43]],
    // Roof terrace railing
    [[0.08,0.28],[0.92,0.28]],
    [[0.15,0.28],[0.15,0.30]], [[0.30,0.28],[0.30,0.30]], [[0.50,0.28],[0.50,0.30]],
    [[0.70,0.28],[0.70,0.30]], [[0.85,0.28],[0.85,0.30]],
    // Pool (bottom)
    [[0.25,0.88],[0.75,0.88]], [[0.25,0.96],[0.75,0.96]],
    [[0.25,0.88],[0.25,0.96]], [[0.75,0.88],[0.75,0.96]],
    [[0.50,0.88],[0.50,0.96]],
    // Main entrance
    [[0.43,0.82],[0.43,0.70]], [[0.57,0.82],[0.57,0.70]], [[0.43,0.70],[0.57,0.70]],
  ],
];

// Sample N evenly-spaced points along a line segment
function sampleSegment(
  x0: number, y0: number,
  x1: number, y1: number,
  n: number,
  W: number, H: number
): [number, number][] {
  const pts: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0.5 : i / (n - 1);
    pts.push([x0 * W + (x1 - x0) * t * W, y0 * H + (y1 - y0) * t * H]);
  }
  return pts;
}

export default function WorksGallery({ images: _images }: { images: string[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const PARTICLE_COUNT = 900;
    const GOLD = [200, 169, 110] as const; // #C8A96E

    // Mouse state
    let mx = W / 2, my = H / 2;
    const onMouseMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onTouchMove = (e: TouchEvent) => { mx = e.touches[0].clientX; my = e.touches[0].clientY; };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // Build dense target set from all segments of a building
    function buildTargets(bIdx: number): [number, number][] {
      const segs = BUILDINGS[bIdx % BUILDINGS.length];
      const pts: [number, number][] = [];
      // Density proportional to segment length
      const totalLen = segs.reduce(
        (s, [[x0,y0],[x1,y1]]) => s + Math.hypot((x1-x0)*W, (y1-y0)*H), 0
      );
      for (const [[x0,y0],[x1,y1]] of segs) {
        const len = Math.hypot((x1-x0)*W, (y1-y0)*H);
        const n = Math.max(2, Math.round((len / totalLen) * PARTICLE_COUNT));
        pts.push(...sampleSegment(x0,y0,x1,y1,n,W,H));
      }
      // Trim / pad to exact count
      while (pts.length < PARTICLE_COUNT)
        pts.push(pts[Math.floor(Math.random() * pts.length)]);
      return pts.slice(0, PARTICLE_COUNT);
    }

    // Particle state
    interface P {
      x: number; y: number;
      tx: number; ty: number;
      vx: number; vy: number;
      alpha: number; size: number;
    }
    const parts: P[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      tx: Math.random() * W, ty: Math.random() * H,
      vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2,
      alpha: 0,
      size: Math.random() * 1.8 + 0.6,
    }));

    let buildIdx = 0;
    type Phase = 'assemble' | 'hold' | 'dissolve';
    let phase: Phase = 'assemble';
    let phaseAge = 0;

    const setTargets = (idx: number) => {
      const tgts = buildTargets(idx);
      tgts.sort(() => Math.random() - 0.5); // shuffle so no positional bias
      parts.forEach((p, i) => { p.tx = tgts[i][0]; p.ty = tgts[i][1]; });
    };
    const scatter = () => parts.forEach(p => { p.tx = Math.random() * W; p.ty = Math.random() * H; });
    setTargets(buildIdx);

    let raf: number;
    let lastT = 0;

    const tick = (t: number) => {
      const dt = Math.min((t - lastT) / 1000, 0.05);
      lastT = t;
      phaseAge += dt;

      if (phase === 'assemble' && phaseAge > 4.0)  { phase = 'hold';    phaseAge = 0; }
      if (phase === 'hold'     && phaseAge > 3.0)  { phase = 'dissolve'; phaseAge = 0; scatter(); }
      if (phase === 'dissolve' && phaseAge > 2.5)  {
        buildIdx++;
        setTargets(buildIdx);
        phase = 'assemble';
        phaseAge = 0;
      }

      // Draw background with subtle trail
      ctx.fillStyle = 'rgba(2,2,2,0.35)';
      ctx.fillRect(0, 0, W, H);

      // Mouse repulsion radius
      const REPEL_R = 120, REPEL_F = 18000;

      parts.forEach(p => {
        // Spring to target
        const spring = phase === 'hold' ? 5 : 3.5;
        const damp   = 0.80;
        let fx = (p.tx - p.x) * spring;
        let fy = (p.ty - p.y) * spring;

        // Mouse repulsion
        const dx = p.x - mx, dy = p.y - my;
        const dist = Math.sqrt(dx*dx + dy*dy) + 1;
        if (dist < REPEL_R) {
          const force = REPEL_F / (dist * dist);
          fx += (dx / dist) * force;
          fy += (dy / dist) * force;
        }

        p.vx = (p.vx + fx * dt) * damp;
        p.vy = (p.vy + fy * dt) * damp;
        p.x += p.vx;
        p.y += p.vy;

        // Alpha
        const targetAlpha = phase === 'dissolve' ? 0 : 1;
        p.alpha += (targetAlpha - p.alpha) * Math.min(dt * 2.5, 1);

        if (p.alpha < 0.01) return;

        // Draw particle with glow
        const a = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD[0]},${GOLD[1]},${GOLD[2]},${a})`;
        ctx.fill();

        // Soft glow halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD[0]},${GOLD[1]},${GOLD[2]},${a * 0.08})`;
        ctx.fill();
      });

      // Connect nearby particles with faint blueprint lines
      if (phase === 'hold' || phase === 'assemble') {
        ctx.strokeStyle = `rgba(${GOLD[0]},${GOLD[1]},${GOLD[2]},0.08)`;
        ctx.lineWidth = 0.5;
        for (let i = 0; i < parts.length; i++) {
          for (let j = i + 1; j < parts.length; j++) {
            const dx = parts[i].x - parts[j].x;
            const dy = parts[i].y - parts[j].y;
            const d2 = dx*dx + dy*dy;
            if (d2 < 1800) { // ~42px connect radius
              ctx.beginPath();
              ctx.moveTo(parts[i].x, parts[i].y);
              ctx.lineTo(parts[j].x, parts[j].y);
              ctx.stroke();
            }
          }
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(t => { lastT = t; tick(t); });

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      setTargets(buildIdx);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="relative w-full h-[100dvh] bg-[#020202] overflow-hidden cursor-crosshair">
      {/* Full-screen interactive canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Overlay labels */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-end pb-16 text-center">
        <p className="text-[9px] md:text-[10px] font-bold tracking-[0.5em] uppercase text-[#C8A96E]/70 mb-3">
          // SHINING CLOUD — ARCHITECTURAL ARCHIVE
        </p>
        <div className="w-[1px] h-10 bg-gradient-to-b from-[#C8A96E]/50 to-transparent mb-4" />
        <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-white/25">
          Move cursor to interact · Scroll to explore
        </p>
      </div>

      {/* CATALOG title — large, ghosted, top-center */}
      <div className="absolute top-[22%] inset-x-0 z-10 pointer-events-none text-center">
        <h1 className="text-[18vw] font-black uppercase tracking-[-0.06em] leading-none select-none"
            style={{ color: 'transparent', WebkitTextStroke: '1px rgba(200,169,110,0.12)' }}>
          CATALOG.
        </h1>
      </div>

      {/* Radial vignette */}
      <div className="absolute inset-0 z-[5] pointer-events-none"
           style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, #020202 100%)' }} />
    </div>
  );
}
