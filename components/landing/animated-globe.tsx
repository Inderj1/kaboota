"use client";

import { useEffect, useRef } from "react";
import { sectors } from "@/lib/content";

/**
 * Hero visual: a slow pencil-drawn globe on paper, turning beneath one fixed green pin.
 * Everything green is happening right now. Once every BEAT seconds one channel rings, one coin eases
 * along its arc into the pin, one extracted field lifts, the card fills in what happened next, and
 * UNDERSTAND → DECIDE → EXECUTE → LEARN fills like a progress bar. Nothing else pulses.
 * Time is wall-clock (same tempo on 60 and 120 Hz), the loop stops when the hero is off screen, and
 * prefers-reduced-motion gets one complete still frame.
 */
type V = { x: number; y: number; z: number };

const CHARS = "░▒▓█▀▄▌▐│─┤├┴┬╭╮╰╯";
const BARS = "▁▂▃▄▅▆▇█";
const MONO = 'ui-monospace, Menlo, Consolas, "DejaVu Sans Mono", monospace';
const BRAND = "31,157,92";
const BRAND_DK = "21,122,71";
const BRAND_TXT = "17,96,58";
const INK2 = "91,83,71";
const INK3 = "138,128,114";
const LINE2 = "216,203,185";
const PAPER = "#fffdf9";
const PAPER_RGB = "255,253,249";

const SPIN = 0.13; // rad/s — one revolution every ~48 s
const TILT = 0.38;
const RING_TILT = 1.22;
const HUB_Y = 0.14; // the pin sits a little above centre and always faces the viewer
const BEAT = 7; // seconds per conversation
const T_GO = 0.06; // beat phase when the coin leaves the node
const T_LAND = 0.52; // beat phase when it lands on the pin
const AT = [0.06, 0.3, 0.52, 0.76]; // when each pipeline step lights
const STILL_T = 3 * BEAT + 0.62 * BEAT; // reduced-motion pose: coin landed, chip up, outcome visible

const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);
const easeOutCubic = (t: number) => 1 - (1 - clamp01(t)) ** 3;
const easeInOutCubic = (t: number) => { t = clamp01(t); return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2; };
const smooth = (a: number, b: number, x: number) => { const t = clamp01((x - a) / (b - a)); return t * t * (3 - 2 * t); };
const rgba = (c: string, a: number) => `rgba(${c},${clamp01(a).toFixed(3)})`;

// lat/lon in radians
const NODES = [
  { lat: 0.55, lon: -1.9, label: "VOICE", icon: "phone" },
  { lat: -0.35, lon: -0.9, label: "SMS", icon: "sms" },
  { lat: 0.75, lon: 0.4, label: "CHAT", icon: "chat" },
  { lat: -0.6, lon: 1.3, label: "EMAIL", icon: "mail" },
  { lat: 0.2, lon: 2.4, label: "DMS", icon: "dm" },
  { lat: -0.85, lon: -2.6, label: "COUNTER", icon: "store" },
] as const;

// Industry ring: where it runs, with the honest status per sector
const RING = sectors.map((sec) => ({ label: sec.k.toUpperCase(), status: sec.status }));
const STATUS_COLOR: Record<string, string> = { LIVE: "#1f9d5c", "IN ROLLOUT": "#c98a1e", COMING: "#8a8072", PILOT: "#3a7fa0", MEASURED: "#1f9d5c", PROJECTED: "#8a8072" };

/** Small line icons for each channel, drawn centred on (x, y) inside a box of `s` px. */
function drawIcon(ctx: CanvasRenderingContext2D, kind: string, x: number, y: number, s: number, color: string) {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = Math.max(1.2, s * 0.14);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  const h = s / 2;
  ctx.beginPath();
  switch (kind) {
    case "phone": // handset
      ctx.moveTo(-h * 0.75, -h * 0.55);
      ctx.quadraticCurveTo(-h * 0.85, h * 0.6, h * 0.6, h * 0.8);
      ctx.lineTo(h * 0.8, h * 0.35);
      ctx.lineTo(h * 0.3, h * 0.1);
      ctx.lineTo(h * 0.05, h * 0.35);
      ctx.quadraticCurveTo(-h * 0.35, h * 0.05, -h * 0.35, -h * 0.35);
      ctx.lineTo(-h * 0.15, -h * 0.55);
      ctx.lineTo(-h * 0.4, -h * 0.9);
      ctx.closePath();
      ctx.stroke();
      break;
    case "sms": // bubble with dots
      roundRectPath(ctx, -h, -h * 0.75, s, h * 1.2, h * 0.35);
      ctx.moveTo(-h * 0.45, h * 0.45); ctx.lineTo(-h * 0.7, h * 0.95); ctx.lineTo(-h * 0.05, h * 0.45);
      ctx.stroke();
      [-0.4, 0, 0.4].forEach((dx) => { ctx.beginPath(); ctx.arc(dx * h, -h * 0.15, h * 0.11, 0, Math.PI * 2); ctx.fill(); });
      break;
    case "chat": // bubble with lines
      roundRectPath(ctx, -h, -h * 0.75, s, h * 1.2, h * 0.35);
      ctx.moveTo(h * 0.45, h * 0.45); ctx.lineTo(h * 0.7, h * 0.95); ctx.lineTo(h * 0.05, h * 0.45);
      ctx.moveTo(-h * 0.55, -h * 0.3); ctx.lineTo(h * 0.55, -h * 0.3);
      ctx.moveTo(-h * 0.55, h * 0.05); ctx.lineTo(h * 0.15, h * 0.05);
      ctx.stroke();
      break;
    case "mail": // envelope
      roundRectPath(ctx, -h, -h * 0.65, s, h * 1.3, h * 0.2);
      ctx.moveTo(-h, -h * 0.55); ctx.lineTo(0, h * 0.1); ctx.lineTo(h, -h * 0.55);
      ctx.stroke();
      break;
    case "dm": // two overlapping bubbles
      roundRectPath(ctx, -h, -h * 0.85, s * 0.72, h * 0.95, h * 0.3);
      ctx.stroke();
      ctx.beginPath();
      roundRectPath(ctx, -h * 0.3, -h * 0.1, s * 0.65, h * 0.95, h * 0.3);
      ctx.moveTo(h * 0.55, h * 0.85); ctx.lineTo(h * 0.8, h * 1.1); ctx.lineTo(h * 0.2, h * 0.85);
      ctx.stroke();
      break;
    default: // store: awning + door
      ctx.moveTo(-h, -h * 0.35); ctx.lineTo(-h * 0.85, -h * 0.9); ctx.lineTo(h * 0.85, -h * 0.9); ctx.lineTo(h, -h * 0.35);
      ctx.moveTo(-h, -h * 0.35); ctx.quadraticCurveTo(-h * 0.5, 0.05 * h, 0, -h * 0.35); ctx.quadraticCurveTo(h * 0.5, 0.05 * h, h, -h * 0.35);
      ctx.moveTo(-h * 0.8, -h * 0.2); ctx.lineTo(-h * 0.8, h * 0.9); ctx.lineTo(h * 0.8, h * 0.9); ctx.lineTo(h * 0.8, -h * 0.2);
      ctx.moveTo(-h * 0.15, h * 0.9); ctx.lineTo(-h * 0.15, h * 0.2); ctx.lineTo(h * 0.35, h * 0.2); ctx.lineTo(h * 0.35, h * 0.9);
      ctx.stroke();
  }
  ctx.restore();
}
function roundRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  roundRectPath(ctx, x, y, w, h, r);
}

// What each conversation was, when it arrived, the field it extracted on the way in, and the action it ended in
const CASES = [
  { node: 0, when: "TUE 10:42 AM", trade: "HVAC", tag: "VOICE · EMERGENCY", field: "URGENCY · Emergency · 0.96", what: "“Walk-in freezer's completely down”", then: "Tech booked today 2:00 PM · PO 44-1180" },
  { node: 1, when: "FRI 4:52 PM", trade: "PLUMBING", tag: "SMS · MISSED CALL", field: "INTENT · Callback · 0.93", what: "Rang out while closing a ticket", then: "Texted back in 30s · photo intake started" },
  { node: 2, when: "WED 12:10 PM", trade: "HVAC", tag: "CHAT · BOOKING", field: "SLOT · Tue 9:30 AM · held", what: "“Can you get me in Tuesday?”", then: "Live availability checked · slot held" },
  { node: 3, when: "MON 8:15 AM", trade: "ROOFING", tag: "EMAIL · ESTIMATE RESCUE", field: "QUOTE · day 9 · $6,800 open", what: "Open quote, nine days quiet", then: "Day-9 email sent · objection on record" },
  { node: 4, when: "SAT 11:20 PM", trade: "HVAC", tag: "DMS · SAFETY", field: "ESCALATE · L1 → L2 · context carried", what: "Instagram DM: no heat, newborn at home", then: "Jumped the queue · escalated L1 → L2" },
  { node: 5, when: "THU 3:05 PM", trade: "AUTOMOTIVE", tag: "COUNTER · PARTS", field: "PART · in stock · 2-day lead", what: "Fitment question at the desk", then: "Checked against stock · lead time given" },
  { node: 0, when: "SUN 2:07 AM", trade: "HVAC", tag: "VOICE · AFTER HOURS", field: "URGENCY · No heat · 0.94", what: "No heat, rings out on the truck line", then: "Answered first ring · diagnostic booked 8:00 AM" },
  { node: 1, when: "TUE 6:30 PM", trade: "PLUMBING", tag: "SMS · REMINDER", field: "RENEWAL · confirmed · 4 min", what: "Maintenance renewal due, no reply yet", then: "Reminder sent · confirmed by text in 4 min" },
  { node: 2, when: "MON 9:48 AM", trade: "HVAC", tag: "CHAT · RETURNING CUSTOMER", field: "CUSTOMER · same unit · warranty", what: "“It's the same unit as last spring”", then: "History pulled · warranty position on screen" },
  { node: 3, when: "WED 7:02 AM", trade: "MECHANICAL", tag: "EMAIL · QUOTE REQUEST", field: "ROUTE · sales desk · CRM written", what: "Rooftop unit replacement, three bids", then: "Routed to sales desk · record written to CRM" },
  { node: 0, when: "FRI 11:10 AM", trade: "HVAC", tag: "VOICE · GAS SMELL", field: "EXCEPTION · gas · 911 script", what: "“There's a smell near the furnace”", then: "Hang up and call 911 · exception logged" },
  { node: 5, when: "SAT 10:35 AM", trade: "RETAIL", tag: "COUNTER · WALK-IN", field: "MATCH · job #4418 · billing", what: "Warranty claim, no paperwork", then: "Matched to job #4418 · billing desk owns it" },
];
const STEPS = ["UNDERSTAND", "DECIDE", "EXECUTE", "LEARN"];

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

// Equal-area glyph grid, built once: rows thin out toward the poles so there is no dark knot at the top.
const GRID: V[] = [];
{
  let row = 0;
  for (let lat = -Math.PI / 2 + 0.12; lat < Math.PI / 2; lat += 0.17, row++) {
    const n = Math.max(6, Math.round((2 * Math.PI * Math.cos(lat)) / 0.17));
    const off = row & 1 ? Math.PI / n : 0;
    for (let k = 0; k < n; k++) GRID.push(toVec(lat, (k / n) * 2 * Math.PI + off));
  }
}
// Pencil ramp by depth: rear glyphs in faint line-2, mid in ink-3, front in body grey with a green cast.
const GLYPH_LUT: string[] = [];
{
  const S0 = [216, 203, 185, 0.3], S1 = [138, 128, 114, 0.45], S2 = [70, 95, 71, 0.62];
  for (let i = 0; i < 16; i++) {
    const d = i / 15;
    const [a, b, u] = d < 0.5 ? [S0, S1, d * 2] : [S1, S2, (d - 0.5) * 2];
    const mix = (k: number) => a[k] + (b[k] - a[k]) * u;
    GLYPH_LUT.push(`rgba(${Math.round(mix(0))},${Math.round(mix(1))},${Math.round(mix(2))},${mix(3).toFixed(3)})`);
  }
}
const BUCKETS: number[][] = Array.from({ length: 16 }, () => []);

export function AnimatedGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bodyStyle = getComputedStyle(document.body);
    const SANS = bodyStyle.getPropertyValue("--font-hanken").trim() || bodyStyle.fontFamily || "system-ui, sans-serif";
    const still = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Real tracking where the browser supports it; join-with-spaces only as a fallback on wide canvases.
    const canTrack = "letterSpacing" in ctx;
    const track = (em: string) => { if (canTrack) (ctx as unknown as { letterSpacing: string }).letterSpacing = em; };
    const measureCache = new Map<string, number>();
    const measure = (font: string, tracking: string, text: string) => {
      const k = font + "|" + tracking + "|" + text;
      let v = measureCache.get(k);
      if (v === undefined) { ctx.font = font; track(tracking); v = ctx.measureText(text).width; measureCache.set(k, v); }
      return v;
    };
    const wrap = (text: string, font: string, max: number) => {
      const lines: string[] = [];
      let line = "";
      for (const word of text.split(" ")) {
        const t = line ? line + " " + word : word;
        if (!line || measure(font, "0px", t) <= max) line = t;
        else { lines.push(line); line = word; }
      }
      if (line) lines.push(line);
      return lines;
    };

    // Clock and layout state
    let time = 0, last = 0, running = false, w = 0, h = 0, layoutDirty = true;
    // Beat state: one conversation per BEAT seconds
    let caseIdx = -1, beatN = -1, beatSpin = 0, liveNode = 0, prevLive = -1, facing = true, c = CASES[0];
    type Card = { x: number; y: number; w: number; h: number; stamp: string; what: string[]; then: string[] };
    let card: Card | null = null;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = canvas.clientWidth; h = canvas.clientHeight;
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layoutDirty = true;
      if (still) render();
    };

    const render = () => {
      if (!w || !h) return;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;
      const R = Math.min(w, h / 1.12) * 0.42;
      const roomy = w >= 440;
      const ringR = R * (roomy ? 1.13 : 1.1);
      const spin = time * SPIN;
      const projectAt = (p: V, s: number) => { const q = rotX(rotY(p, s), TILT); return { sx: cx + q.x * R, sy: cy - q.y * R, z: q.z }; };
      const project = (p: V) => projectAt(p, spin);
      // The pin: a fixed view-space point (0, HUB_Y, ~1) pulled back onto the turning sphere, so every arc lands where you can see it.
      const hubV = rotY(rotX({ x: 0, y: HUB_Y, z: Math.sqrt(1 - HUB_Y * HUB_Y) }, -TILT), -spin);
      const hp = { sx: Math.round(cx), sy: Math.round(cy - HUB_Y * R) };
      const ringFrontY = cy + Math.sin(RING_TILT) * ringR;
      const capY = Math.round(Math.min(ringFrontY + 14, h - 30));
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      // ---- Beat: pick the next conversation on a node that faces the viewer for the whole beat
      const bn = Math.floor(time / BEAT), ph = time / BEAT - bn;
      const layoutCard = () => {
        const TAG = `600 8.5px ${SANS}`, WHAT = `600 12px ${SANS}`, THEN = `500 11px ${SANS}`;
        const maxW = Math.min(300, w - 16), contentMax = maxW - 24;
        const what = wrap(c.what, WHAT, contentMax);
        const then = wrap("→ " + c.then, THEN, contentMax);
        let stamp = `${c.trade} · ${c.when}`;
        let hdrW = measure(TAG, "0.1em", c.tag) + 12 + measure(TAG, "0.1em", stamp);
        if (hdrW > contentMax) { stamp = c.when; hdrW = measure(TAG, "0.1em", c.tag) + 12 + measure(TAG, "0.1em", stamp); }
        const lineW = Math.max(...what.map((l) => measure(WHAT, "0px", l)), ...then.map((l) => measure(THEN, "0px", l)));
        const cw = Math.round(Math.min(maxW, Math.max(200, Math.max(hdrW, lineW) + 24)));
        const ch = 58 + 16 * (what.length + then.length - 2);
        let x: number, y: number;
        if (facing) {
          const v = toVec(NODES[c.node].lat, NODES[c.node].lon);
          const n0 = projectAt(v, beatSpin), nm = projectAt(v, beatSpin + SPIN * BEAT * 0.5), n1 = projectAt(v, beatSpin + SPIN * BEAT);
          const minY = Math.min(n0.sy, nm.sy, n1.sy), maxY = Math.max(n0.sy, nm.sy, n1.sy);
          const dirX = nm.sx < cx ? 1 : -1;
          x = Math.round(clamp(nm.sx + dirX * 34 - (dirX < 0 ? cw : 0), 8, w - cw - 8));
          y = nm.sy < cy ? maxY + 30 : minY - ch - 44; // below upper nodes, above lower ones (clear of the label)
          // keep clear of the pin and its chip: slide sideways out of the pin's column first, flip above/below only if the canvas is too narrow
          const onPin = (px: number, py: number) => px - 8 < cx + 100 && px + cw + 8 > cx - 100 && py - 8 < hp.sy + 18 && py + ch + 8 > hp.sy - 70;
          if (onPin(x, y)) {
            const xs = dirX > 0 ? cx + 108 : cx - 108 - cw;
            if (xs >= 8 && xs + cw <= w - 8) x = Math.round(xs);
            if (onPin(x, y)) y = nm.sy < hp.sy ? minY - ch - 44 : maxY + 30;
          }
        } else {
          x = Math.round(clamp(cx - cw / 2, 8, w - cw - 8));
          y = hp.sy + 26;
        }
        y = Math.round(clamp(y, 8, capY - ch - 14));
        card = { x, y, w: cw, h: ch, stamp, what, then };
      };
      if (bn !== beatN) {
        beatN = bn; beatSpin = spin; prevLive = liveNode;
        let pick = caseIdx; facing = false;
        for (let k = 0; k < CASES.length; k++) {
          pick = (pick + 1) % CASES.length;
          const nd = NODES[CASES[pick].node];
          const v = toVec(nd.lat, nd.lon);
          if (projectAt(v, spin).z > 0.12 && projectAt(v, spin + SPIN * BEAT * 0.5).z > 0.12 && projectAt(v, spin + SPIN * BEAT).z > 0.12) { facing = true; break; }
        }
        if (!facing) pick = (caseIdx + 1) % CASES.length;
        caseIdx = pick; c = CASES[caseIdx]; liveNode = c.node;
        layoutDirty = true;
      }
      if (layoutDirty) { layoutDirty = false; layoutCard(); }
      const live = 0.28 + 0.72 * smooth(T_GO, T_GO + 0.12, ph) * (1 - smooth(T_LAND + 0.02, T_LAND + 0.2, ph)); // belt envelope

      // ---- 0. Industry ring, back half, with ticks
      const ringPts = RING.map((r, i) => {
        const a0 = (i / RING.length) * Math.PI * 2 + time * 0.04;
        const q = rotX({ x: Math.cos(a0) * ringR, y: 0, z: Math.sin(a0) * ringR }, RING_TILT);
        return { ...r, sx: cx + q.x, sy: cy - q.y, z: q.z / ringR };
      });
      const drawRingArc = (front: boolean) => {
        ctx.strokeStyle = front ? rgba(INK3, 0.5) : rgba(LINE2, 0.6);
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 5]);
        ctx.beginPath();
        let drawing = false;
        for (let k = 0; k <= 120; k++) {
          const a0 = (k / 120) * Math.PI * 2 + time * 0.04;
          const q = rotX({ x: Math.cos(a0) * ringR, y: 0, z: Math.sin(a0) * ringR }, RING_TILT);
          if (q.z > 0 !== front) { drawing = false; continue; }
          if (!drawing) { ctx.moveTo(cx + q.x, cy - q.y); drawing = true; } else ctx.lineTo(cx + q.x, cy - q.y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      };
      drawRingArc(false);
      ctx.fillStyle = rgba(INK3, 0.12);
      for (const r of ringPts) if (r.z <= 0) { ctx.beginPath(); ctx.arc(r.sx, r.sy, 1.6, 0, Math.PI * 2); ctx.fill(); }

      // ---- 1. The sphere: pencil glyphs, bucketed back-to-front (no sort)
      for (const b of BUCKETS) b.length = 0;
      for (const g of GRID) {
        const p = project(g);
        const d = (p.z + 1) / 2;
        BUCKETS[Math.round(d * 15)].push(Math.round(p.sx), Math.round(p.sy), Math.floor(d * (CHARS.length - 1)));
      }
      ctx.font = `12px ${MONO}`;
      track("0px");
      for (let b = 0; b < 16; b++) {
        const a = BUCKETS[b];
        if (!a.length) continue;
        ctx.fillStyle = GLYPH_LUT[b];
        for (let i = 0; i < a.length; i += 3) ctx.fillText(CHARS[a[i + 2]], a[i], a[i + 1]);
      }

      // ---- 2. Equator belt: a hum between conversations, the full range only while a coin is in flight
      ctx.font = `15px ${MONO}`;
      for (let lon = 0; lon < Math.PI * 2; lon += 0.11) {
        const p = project(toVec(0, lon));
        if (p.z < 0.05) continue;
        const s = Math.sin(lon * 7 + time * 0.9) * 0.5 + Math.sin(lon * 3 - time * 0.55) * 0.3 + Math.sin(lon * 13 + time * 1.3) * 0.2;
        const level = clamp01((0.5 + s * 0.5) * live);
        ctx.fillStyle = rgba(BRAND, (0.15 + p.z * 0.3) * (0.65 + 0.35 * live));
        ctx.fillText(BARS[Math.floor(level * (BARS.length - 1))], Math.round(p.sx), Math.round(p.sy) - 6);
      }

      // ---- 3. Arcs: every channel routes to the pin; only the live one is green and only its coin moves
      const mix = smooth(0, 0.05, ph);
      NODES.forEach((n, i) => {
        const a = toVec(n.lat, n.lon);
        const front = Math.max(0, project(a).z);
        ctx.beginPath();
        let drawing = false;
        for (let k = 0; k <= 28; k++) {
          const t = k / 28;
          const v = slerp(a, hubV, t);
          const lift = 1 + 0.05 * Math.sin(t * Math.PI);
          const p = project({ x: v.x * lift, y: v.y * lift, z: v.z * lift });
          if (p.z < -0.05) { drawing = false; continue; }
          if (!drawing) { ctx.moveTo(p.sx, p.sy); drawing = true; } else ctx.lineTo(p.sx, p.sy);
        }
        ctx.setLineDash([3, 5]);
        ctx.lineDashOffset = 0;
        ctx.lineWidth = 1;
        ctx.strokeStyle = rgba(INK3, 0.18 + front * 0.22);
        ctx.stroke();
        const isLive = i === liveNode, wasLive = i === prevLive && prevLive !== liveNode;
        if (isLive || wasLive) {
          ctx.lineDashOffset = -time * 12;
          ctx.lineWidth = 1.4;
          ctx.strokeStyle = rgba(BRAND, (0.45 + front * 0.45) * (isLive ? mix : 1 - mix));
          ctx.stroke();
        }
        ctx.setLineDash([]);
        if (isLive) {
          // the coin: dark green with a paper edge and a short tail, easing out of the node and into the pin
          const tt = easeInOutCubic((ph - T_GO) / (T_LAND - T_GO));
          const pa = smooth(T_GO, T_GO + 0.04, ph) * (1 - smooth(T_LAND, T_LAND + 0.05, ph));
          if (pa > 0) {
            const tail = [0.95, 0.4, 0.22, 0.1];
            for (let k = 3; k >= 0; k--) {
              const u = clamp01(tt - 0.025 * k);
              const pv = slerp(a, hubV, u);
              const lift = 1 + 0.05 * Math.sin(u * Math.PI);
              const pp = project({ x: pv.x * lift, y: pv.y * lift, z: pv.z * lift });
              if (pp.z < -0.05) continue;
              const r = Math.min(4.2, 3 + pp.z * 1.2) * (k ? 0.75 : 1);
              ctx.fillStyle = rgba(BRAND_DK, pa * tail[k]);
              ctx.beginPath();
              ctx.arc(pp.sx, pp.sy, r, 0, Math.PI * 2);
              ctx.fill();
              if (k === 0) { ctx.strokeStyle = rgba(PAPER_RGB, pa); ctx.lineWidth = 1.2; ctx.stroke(); }
            }
          }
        }
      });

      // ---- 4. Channel nodes: paper discs, completely still unless it is their conversation
      NODES.forEach((n, i) => {
        const p = project(toVec(n.lat, n.lon));
        if (p.z < -0.15) return;
        const depth = Math.max(0, p.z);
        const alpha = 0.35 + depth * 0.65;
        const isLive = i === liveNode;
        const rb = Math.round(8 + depth * 4);
        const sx = Math.round(p.sx), sy = Math.round(p.sy);
        if (isLive) {
          // ring… ring: two rings in the first 1.5 s of the beat, then silence
          const fit = Math.min(1, (Math.min(p.sx, w - p.sx, p.sy, h - p.sy) - 6) / 36);
          for (const k of [0, 1]) {
            const rp = easeOutCubic((ph - 0.005 - k * 0.06) / 0.22);
            if (rp <= 0 || rp >= 1) continue;
            ctx.strokeStyle = rgba(BRAND, (1 - rp) ** 2 * 0.8);
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(sx, sy, 6 + rp * 30 * fit, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = PAPER;
        ctx.beginPath();
        ctx.arc(sx, sy, rb, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = isLive ? rgba(BRAND, 1) : "#d8cbb9";
        ctx.lineWidth = 1.2;
        ctx.stroke();
        drawIcon(ctx, n.icon, sx, sy, rb * 1.05, isLive ? "#157a47" : "#5b5347");
        if (isLive && ph >= T_GO && ph <= T_LAND + 0.05) { ctx.strokeStyle = rgba(BRAND_DK, 1); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(sx, sy, rb + 0.5, 0, Math.PI * 2); ctx.stroke(); }
        ctx.restore();
        if (p.z > 0.1) {
          const font = isLive ? `700 ${roomy ? 10.5 : 9.5}px ${SANS}` : `600 ${roomy ? 10 : 9}px ${SANS}`;
          const tw = measure(font, "0.08em", n.label);
          ctx.font = font;
          track("0.08em");
          ctx.textAlign = "center";
          ctx.fillStyle = rgba(isLive ? BRAND_TXT : INK2, alpha);
          ctx.fillText(n.label, Math.round(clamp(p.sx, 8 + tw / 2, w - 8 - tw / 2)), Math.round(sy - 17 - depth * 4));
        }
      });
      track("0px");

      // ---- 4b. Industry ring, front half: ticks and one caption for the sector facing you
      drawRingArc(true);
      for (const r of ringPts) if (r.z > 0) { ctx.fillStyle = rgba(INK3, 0.25 + r.z * 1.4); ctx.beginPath(); ctx.arc(r.sx, r.sy, 1.8, 0, Math.PI * 2); ctx.fill(); }
      const cardVis = smooth(0, 0.07, ph) * (1 - smooth(0.93, 1, ph));
      {
        const front = ringPts.reduce((a, b) => (b.z > a.z ? b : a));
        let capA = smooth(0.318, 0.338, front.z);
        if (capA > 0) {
          const font = `600 8.5px ${SANS}`;
          const segs: [string, string][] = [["RUNNING IN", rgba(INK3, capA)], [" · ", rgba(LINE2, capA)], [front.label, rgba(INK2, capA)]];
          if (front.status !== "LIVE") segs.push([" · ", rgba(LINE2, capA)], [front.status, STATUS_COLOR[front.status] || "#8a8072"]);
          let widths = segs.map(([t]) => measure(font, "0.1em", t));
          let total = widths.reduce((a, b) => a + b, 0);
          if (total > w - 16) { segs.splice(0, segs.length, [front.label, rgba(INK2, capA)]); widths = [measure(font, "0.1em", front.label)]; total = widths[0]; }
          const x0 = Math.round(cx - total / 2);
          if (card && cardVis > 0 && x0 < card.x + card.w + 6 && x0 + total > card.x - 6 && capY - 6 < card.y + card.h + 6 && capY + 6 > card.y - 6) capA *= 1 - cardVis;
          ctx.font = font;
          track("0.1em");
          ctx.textAlign = "left";
          let x = x0;
          ctx.globalAlpha = capA;
          segs.forEach(([t, fill], i) => { ctx.fillStyle = fill; ctx.fillText(t, x, capY); x += widths[i]; });
          ctx.globalAlpha = 1;
          ctx.textAlign = "center";
          track("0px");
        }
      }

      // ---- 5. The card: frozen for the beat; the outcome line fills in when the coin lands
      if (card && cardVis > 0) {
        const cd = card;
        const p = facing ? project(toVec(NODES[c.node].lat, NODES[c.node].lon)) : { sx: hp.sx, sy: hp.sy, z: 1 };
        const inside = p.sx > cd.x && p.sx < cd.x + cd.w && p.sy > cd.y && p.sy < cd.y + cd.h;
        if (p.z > -0.15 && !inside) {
          const lx = clamp(p.sx, cd.x + 10, cd.x + cd.w - 10);
          const ly = p.sy < cd.y ? cd.y : p.sy > cd.y + cd.h ? cd.y + cd.h : p.sy;
          ctx.strokeStyle = rgba(INK3, cardVis * 0.7);
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 3]);
          ctx.beginPath();
          ctx.moveTo(p.sx, p.sy);
          ctx.lineTo(lx, ly);
          ctx.stroke();
          ctx.setLineDash([]);
        }
        ctx.save();
        ctx.globalAlpha = cardVis;
        ctx.fillStyle = "rgba(40,30,15,0.06)"; // paper-slip underlay instead of a blurred shadow
        roundRect(ctx, cd.x, cd.y + 2, cd.w, cd.h, 10);
        ctx.fill();
        ctx.fillStyle = PAPER;
        roundRect(ctx, cd.x, cd.y, cd.w, cd.h, 10);
        ctx.fill();
        ctx.strokeStyle = "#e7ddd0";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.font = `600 8.5px ${SANS}`;
        track("0.1em");
        ctx.textAlign = "left";
        ctx.fillStyle = "#11603a";
        ctx.fillText(c.tag, cd.x + 12, cd.y + 14);
        ctx.textAlign = "right";
        ctx.fillStyle = "#8a8072";
        ctx.fillText(cd.stamp, cd.x + cd.w - 12, cd.y + 14);
        track("0px");
        ctx.textAlign = "left";
        ctx.font = `600 12px ${SANS}`;
        ctx.fillStyle = "#211d17";
        cd.what.forEach((l, k) => ctx.fillText(l, cd.x + 12, cd.y + 30 + 16 * k));
        const showThen = smooth(T_LAND + 0.02, T_LAND + 0.1, ph);
        if (showThen > 0) {
          ctx.font = `500 11px ${SANS}`;
          ctx.fillStyle = rgba(BRAND_DK, showThen);
          cd.then.forEach((l, k) => ctx.fillText(l, cd.x + 12, cd.y + 30 + 16 * (cd.what.length + k)));
        }
        ctx.restore();
        ctx.textAlign = "center";
      }

      // ---- 6. The pin: one pipeline, always facing you; a single swell when the coin lands
      {
        const sw = clamp01((ph - T_LAND) / 0.2);
        ctx.fillStyle = PAPER;
        ctx.beginPath();
        ctx.arc(hp.sx, hp.sy, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = rgba(BRAND_DK, 1);
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.fillStyle = rgba(BRAND_DK, 1);
        ctx.beginPath();
        ctx.arc(hp.sx, hp.sy, 4 + 2.5 * Math.sin(Math.PI * sw), 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = rgba(BRAND, 0.35);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(hp.sx, hp.sy, 15 + 1.5 * Math.sin(Math.PI * sw), 0, Math.PI * 2);
        ctx.stroke();
        if (sw > 0 && sw < 1) {
          const e = easeOutCubic(sw);
          ctx.strokeStyle = rgba(BRAND_DK, (1 - e) * 0.55);
          ctx.beginPath();
          ctx.arc(hp.sx, hp.sy, 15 + e * 26, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // ---- 7. One chip per conversation: the field it extracted, lifting off the pin after landing
      {
        const up = easeOutCubic((ph - T_LAND) / 0.26);
        const ca = smooth(T_LAND, T_LAND + 0.06, ph) * (1 - smooth(0.86, 0.93, ph));
        if (ca > 0) {
          const font = `600 9px ${SANS}`;
          const tw = measure(font, "0.04em", c.field) + 18;
          const x = Math.round(clamp(hp.sx - tw / 2, 8, w - tw - 8));
          const y = Math.round(hp.sy - 26 - up * 30);
          ctx.save();
          ctx.globalAlpha = ca * 0.95;
          ctx.fillStyle = "#e1f2e7";
          roundRect(ctx, x, y - 9, tw, 18, 7);
          ctx.fill();
          ctx.strokeStyle = "#c8e6d4";
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.font = font;
          track("0.04em");
          ctx.fillStyle = "#11603a";
          ctx.textAlign = "center";
          ctx.fillText(c.field, x + tw / 2, y + 1);
          track("0px");
          ctx.restore();
        }
      }

      // ---- 8. The decision layer as a progress bar, filling in time with the conversation
      {
        const on = AT.map((t, i) => smooth(t - 0.02, t + 0.02, ph) * (i < 3 ? 1 - smooth(AT[i + 1] - 0.02, AT[i + 1] + 0.02, ph) : 1 - smooth(0.97, 1, ph)));
        const done = AT.map((t) => smooth(t - 0.02, t + 0.02, ph) * (1 - smooth(0.97, 1, ph)));
        const font = `600 8.5px ${SANS}`;
        const gap = roomy ? 28 : 16;
        const widths = STEPS.map((t) => measure(font, "0.1em", t));
        const arrowW = measure(font, "0px", "→");
        const total = widths.reduce((a, b) => a + b, 0) + gap * (STEPS.length - 1);
        let x = Math.round(cx - total / 2);
        const y = h - 12;
        ctx.font = font;
        ctx.textAlign = "left";
        STEPS.forEach((t, i) => {
          track("0.1em");
          ctx.fillStyle = rgba(INK3, 0.75);
          ctx.fillText(t, x, y);
          const g = Math.max(on[i], done[i] * 0.55);
          if (g > 0) { ctx.fillStyle = rgba(BRAND_DK, g); ctx.fillText(t, x, y); }
          if (on[i] > 0) { ctx.fillStyle = rgba(BRAND, on[i]); ctx.beginPath(); ctx.arc(x + widths[i] / 2, y + 9, 2 * on[i], 0, Math.PI * 2); ctx.fill(); }
          x += widths[i];
          if (i < STEPS.length - 1) {
            track("0px");
            ctx.fillStyle = rgba(LINE2, 1);
            ctx.fillText("→", Math.round(x + (gap - arrowW) / 2), y);
            x += gap;
          }
        });
        track("0px");
        ctx.textAlign = "center";
      }
    };

    // Wall-clock loop: the same tempo on 60 Hz and 120 Hz, never fast-forwarding after a tab switch
    const loop = (now: number) => {
      if (!running) return;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      time += dt;
      render();
      frameRef.current = requestAnimationFrame(loop);
    };
    const start = () => { if (running) return; running = true; last = 0; frameRef.current = requestAnimationFrame(loop); };
    const stop = () => { running = false; cancelAnimationFrame(frameRef.current); };

    resize();
    window.addEventListener("resize", resize);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    ro?.observe(canvas);
    let io: IntersectionObserver | null = null;
    if (still) {
      time = STILL_T;
      render();
    } else if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(([e]) => { if (e.isIntersecting) start(); else stop(); }, { threshold: 0.02 });
      io.observe(canvas);
    } else {
      start();
    }
    document.fonts?.ready.then(() => { measureCache.clear(); layoutDirty = true; if (still) render(); });

    return () => {
      window.removeEventListener("resize", resize);
      ro?.disconnect();
      io?.disconnect();
      stop();
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block" }} aria-hidden />;
}
