"use client";

import { useEffect, useRef } from "react";

/**
 * Hero visual: the Optimus ASCII globe, made into a call-centre globe.
 * Channel nodes sit on the surface and pulse like incoming calls, dotted arcs lift off the
 * globe as every conversation routes to one hub, and a live waveform belt runs round the equator.
 * Drawn in the Kaboota palette.
 */
type V = { x: number; y: number; z: number };

const CHARS = "░▒▓█▀▄▌▐│─┤├┴┬╭╮╰╯";
const BARS = "▁▂▃▄▅▆▇█";
const BRAND = "31,157,92";
const BRAND_DK = "21,122,71";
const MINT = "127,230,171";

// lat/lon in radians; hub = the one pipeline everything routes to
const NODES = [
  { lat: 0.55, lon: -1.9, label: "VOICE" },
  { lat: -0.35, lon: -0.9, label: "SMS" },
  { lat: 0.75, lon: 0.4, label: "CHAT" },
  { lat: -0.6, lon: 1.3, label: "EMAIL" },
  { lat: 0.2, lon: 2.4, label: "SOCIAL" },
  { lat: -0.85, lon: -2.6, label: "COUNTER" },
];
const HUB = { lat: 0.08, lon: 0.0 };

const toVec = (lat: number, lon: number): V => ({ x: Math.cos(lat) * Math.cos(lon), y: Math.sin(lat), z: Math.cos(lat) * Math.sin(lon) });
const rotY = (p: V, a: number): V => ({ x: p.x * Math.cos(a) - p.z * Math.sin(a), y: p.y, z: p.x * Math.sin(a) + p.z * Math.cos(a) });
const rotX = (p: V, a: number): V => ({ x: p.x, y: p.y * Math.cos(a) - p.z * Math.sin(a), z: p.y * Math.sin(a) + p.z * Math.cos(a) });
const slerp = (a: V, b: V, t: number): V => {
  const dot = Math.max(-1, Math.min(1, a.x * b.x + a.y * b.y + a.z * b.z));
  const om = Math.acos(dot);
  if (om < 1e-4) return a;
  const s1 = Math.sin((1 - t) * om) / Math.sin(om);
  const s2 = Math.sin(t * om) / Math.sin(om);
  return { x: a.x * s1 + b.x * s2, y: a.y * s1 + b.y * s2, z: a.z * s1 + b.z * s2 };
};

export function AnimatedGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width, h = rect.height;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;
      // radius from the narrower axis, with the canvas taller than wide so pulses/glyphs never clip top or bottom
      const R = Math.min(w, h / 1.12) * 0.45;
      const spin = time * 0.22;
      const tilt = 0.38;
      const project = (p: V) => {
        const q = rotX(rotY(p, spin), tilt);
        return { sx: cx + q.x * R, sy: cy - q.y * R, z: q.z };
      };
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // 1 — The globe itself (ASCII lat/long grid, depth-shaded), same treatment as the template
      ctx.font = "12px monospace";
      const pts: { sx: number; sy: number; z: number; ch: string }[] = [];
      for (let lon = 0; lon < Math.PI * 2; lon += 0.17) {
        for (let lat = -Math.PI / 2 + 0.12; lat < Math.PI / 2; lat += 0.17) {
          const p = project(toVec(lat, lon));
          const depth = (p.z + 1) / 2;
          pts.push({ ...p, ch: CHARS[Math.floor(depth * (CHARS.length - 1))] });
        }
      }
      pts.sort((a, b) => a.z - b.z);
      for (const p of pts) {
        const alpha = 0.06 + ((p.z + 1) / 2) * 0.42;
        ctx.fillStyle = `rgba(${BRAND_DK},${alpha.toFixed(3)})`;
        ctx.fillText(p.ch, p.sx, p.sy);
      }

      // 2 — Equator waveform belt: the live call, wrapped round the world
      ctx.font = "15px monospace";
      for (let lon = 0; lon < Math.PI * 2; lon += 0.11) {
        const p = project(toVec(0, lon));
        if (p.z < 0.05) continue;
        const s = Math.sin(lon * 7 + time * 6) * 0.5 + Math.sin(lon * 3 - time * 3.5) * 0.3 + Math.sin(lon * 13 + time * 9) * 0.2;
        const level = Math.max(0, Math.min(1, 0.5 + s * 0.5));
        ctx.fillStyle = `rgba(${BRAND},${(0.35 + p.z * 0.6).toFixed(3)})`;
        ctx.fillText(BARS[Math.floor(level * (BARS.length - 1))], p.sx, p.sy - 6);
      }

      // 3 — Arcs: every conversation routes to the hub
      const hubV = toVec(HUB.lat, HUB.lon);
      ctx.lineWidth = 1.4;
      ctx.setLineDash([3, 5]);
      ctx.lineDashOffset = -time * 45;
      NODES.forEach((n, i) => {
        const a = toVec(n.lat, n.lon);
        const steps = 28;
        let drawing = false;
        ctx.beginPath();
        for (let k = 0; k <= steps; k++) {
          const t = k / steps;
          const v = slerp(a, hubV, t);
          const lift = 1 + 0.05 * Math.sin(t * Math.PI);
          const p = project({ x: v.x * lift, y: v.y * lift, z: v.z * lift });
          if (p.z < -0.05) { drawing = false; continue; }
          if (!drawing) { ctx.moveTo(p.sx, p.sy); drawing = true; } else ctx.lineTo(p.sx, p.sy);
        }
        const front = project(a).z;
        ctx.strokeStyle = `rgba(${BRAND},${(0.25 + Math.max(0, front) * 0.55).toFixed(3)})`;
        ctx.stroke();
        // a packet travelling along the arc
        const tt = (time * 0.35 + i / NODES.length) % 1;
        const pv = slerp(a, hubV, tt);
        const lift = 1 + 0.05 * Math.sin(tt * Math.PI);
        const pp = project({ x: pv.x * lift, y: pv.y * lift, z: pv.z * lift });
        if (pp.z > -0.05) {
          ctx.setLineDash([]);
          ctx.fillStyle = `rgba(${MINT},0.95)`;
          ctx.beginPath();
          ctx.arc(pp.sx, pp.sy, 2.5 + pp.z * 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.setLineDash([3, 5]);
        }
      });
      ctx.setLineDash([]);

      // 4 — Channel nodes: incoming calls pulsing on the surface
      NODES.forEach((n, i) => {
        const p = project(toVec(n.lat, n.lon));
        if (p.z < -0.15) return;
        const depth = Math.max(0, p.z);
        const alpha = 0.35 + depth * 0.65;
        const pulse = (time * 0.9 + i * 0.37) % 1;
        ctx.strokeStyle = `rgba(${BRAND},${((1 - pulse) * alpha * 0.8).toFixed(3)})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, 4 + pulse * 22 * (0.5 + depth * 0.5), 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = `rgba(${BRAND},${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, 3.5 + depth * 2.5, 0, Math.PI * 2);
        ctx.fill();
        if (p.z > 0.1) {
          ctx.font = `bold ${(9 + depth * 2.5).toFixed(1)}px monospace`;
          ctx.fillStyle = `rgba(${BRAND_DK},${alpha.toFixed(3)})`;
          ctx.fillText(n.label.split("").join(" "), p.sx, p.sy - 13 - depth * 3);
        }
      });

      // 5 — The hub: one pipeline
      const hp = project(hubV);
      if (hp.z > -0.2) {
        const d = Math.max(0, hp.z);
        ctx.fillStyle = `rgba(${BRAND_DK},${(0.5 + d * 0.5).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(hp.sx, hp.sy, 5 + d * 3 + Math.sin(time * 4) * 1.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = `rgba(${MINT},${(0.4 + d * 0.5).toFixed(3)})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(hp.sx, hp.sy, 10 + d * 3, 0, Math.PI * 2);
        ctx.stroke();
      }

      time += 0.016;
      frameRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block" }} aria-hidden />;
}
