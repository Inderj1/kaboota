"use client";

import { useEffect, useRef } from "react";
import { sectors } from "@/lib/content";

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
  { lat: 0.55, lon: -1.9, label: "VOICE", icon: "phone" },
  { lat: -0.35, lon: -0.9, label: "SMS", icon: "sms" },
  { lat: 0.75, lon: 0.4, label: "CHAT", icon: "chat" },
  { lat: -0.6, lon: 1.3, label: "EMAIL", icon: "mail" },
  { lat: 0.2, lon: 2.4, label: "DMS", icon: "dm" },
  { lat: -0.85, lon: -2.6, label: "COUNTER", icon: "store" },
] as const;

// Industry ring: where it runs, with the honest status per sector
const RING = sectors.map((sec) => ({ label: sec.k.replace(" & ", " & ").toUpperCase(), status: sec.status }));
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
const HUB = { lat: 0.08, lon: 0.0 };

// What each channel's conversation was, when it arrived, and the action it ended in (from the Kaboota pilot copy)
const CASES = [
  { node: 0, when: "TUE 10:42 AM", trade: "HVAC", tag: "VOICE · EMERGENCY", what: "\u201cWalk-in freezer's completely down\u201d", then: "Tech booked today 2:00 PM · PO 44-1180" },
  { node: 1, when: "FRI 4:52 PM", trade: "PLUMBING", tag: "SMS · MISSED CALL", what: "Rang out while closing a ticket", then: "Texted back in 30s · photo intake started" },
  { node: 2, when: "WED 12:10 PM", trade: "HVAC", tag: "CHAT · BOOKING", what: "\u201cCan you get me in Tuesday?\u201d", then: "Live availability checked · slot held" },
  { node: 3, when: "MON 8:15 AM", trade: "ROOFING", tag: "EMAIL · ESTIMATE RESCUE", what: "Open quote, nine days quiet", then: "Day-9 email sent · objection on record" },
  { node: 4, when: "SAT 11:20 PM", trade: "HVAC", tag: "DMS · SAFETY", what: "Instagram DM: no heat, newborn at home", then: "Jumped the queue · escalated L1 \u2192 L2" },
  { node: 5, when: "THU 3:05 PM", trade: "AUTOMOTIVE", tag: "COUNTER · PARTS", what: "Fitment question at the desk", then: "Checked against stock · lead time given" },
  { node: 0, when: "SUN 2:07 AM", trade: "HVAC", tag: "VOICE · AFTER HOURS", what: "No heat, rings out on the truck line", then: "Answered first ring · diagnostic booked 8:00 AM" },
  { node: 1, when: "TUE 6:30 PM", trade: "PLUMBING", tag: "SMS · REMINDER", what: "Maintenance renewal due, no reply yet", then: "Reminder sent · confirmed by text in 4 min" },
  { node: 2, when: "MON 9:48 AM", trade: "HVAC", tag: "CHAT · RETURNING CUSTOMER", what: "\u201cIt's the same unit as last spring\u201d", then: "History pulled · warranty position on screen" },
  { node: 3, when: "WED 7:02 AM", trade: "MECHANICAL", tag: "EMAIL · QUOTE REQUEST", what: "Rooftop unit replacement, three bids", then: "Routed to sales desk · record written to CRM" },
  { node: 0, when: "FRI 11:10 AM", trade: "HVAC", tag: "VOICE · GAS SMELL", what: "\u201cThere's a smell near the furnace\u201d", then: "Hang up and call 911 · exception logged" },
  { node: 5, when: "SAT 10:35 AM", trade: "RETAIL", tag: "COUNTER · WALK-IN", what: "Warranty claim, no paperwork", then: "Matched to job #4418 · billing desk owns it" },
];

// Fields extracted, human nudges and handoffs as conversations reach the hub
const CHIPS = [
  "CUSTOMER · Dawson Group · 0.97",
  "URGENCY · Emergency · 0.96",
  "WHISPER · \u201coffer the maintenance plan\u201d · 2s",
  "PROBLEM · Freezer down · 0.95",
  "ESCALATION · L1 \u2192 L2 · context carried",
  "EST. VALUE · $2,400 · 0.81",
  "PO · 44-1180 · 0.99",
  "OUTCOME · Booked · written to CRM",
  "MARGIN · captured from invoice",
];
const STEPS = ["UNDERSTAND", "DECIDE", "EXECUTE", "LEARN"];

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
const ease = (t: number) => Math.max(0, Math.min(1, t));

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
    const bodyStyle = getComputedStyle(document.body);
    const MONO = bodyStyle.getPropertyValue("--font-space-mono").trim() || "ui-monospace, Menlo, monospace";
    const SANS = bodyStyle.getPropertyValue("--font-hanken").trim() || bodyStyle.fontFamily || "system-ui, sans-serif";
    // Layout size (clientWidth/Height) rather than getBoundingClientRect, which is affected by the
    // hero's entry transform (scale-95) and would leave the bitmap undersized.
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const cw = canvas.clientWidth, chh = canvas.clientHeight;
      if (canvas.width !== Math.round(cw * dpr) || canvas.height !== Math.round(chh * dpr)) {
        canvas.width = Math.round(cw * dpr);
        canvas.height = Math.round(chh * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    ro?.observe(canvas);

    const render = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      resize();
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;
      // radius from the narrower axis, with the canvas taller than wide so pulses/glyphs never clip top or bottom
      const R = Math.min(w, h / 1.12) * 0.42;
      const ringR = R * 1.16, ringTilt = 1.22; // industry ring: tilted orbit round the globe
      const spin = time * 0.17;
      const tilt = 0.38;
      const project = (p: V) => {
        const q = rotX(rotY(p, spin), tilt);
        return { sx: cx + q.x * R, sy: cy - q.y * R, z: q.z };
      };
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // 0 — Industry ring (back half first, so the globe sits in front of it)
      const ringPts = RING.map((r, i) => {
        const a0 = (i / RING.length) * Math.PI * 2 + time * 0.05;
        const q = rotX({ x: Math.cos(a0) * ringR, y: 0, z: Math.sin(a0) * ringR }, ringTilt);
        return { ...r, sx: cx + q.x, sy: cy - q.y, z: q.z / ringR };
      });
      const drawRingArc = (front: boolean) => {
        ctx.strokeStyle = front ? `rgba(${BRAND_DK},0.35)` : `rgba(${BRAND_DK},0.12)`;
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 5]);
        ctx.beginPath();
        let drawing = false;
        for (let k = 0; k <= 120; k++) {
          const a0 = (k / 120) * Math.PI * 2 + time * 0.05;
          const q = rotX({ x: Math.cos(a0) * ringR, y: 0, z: Math.sin(a0) * ringR }, ringTilt);
          const isFront = q.z > 0;
          if (isFront !== front) { drawing = false; continue; }
          if (!drawing) { ctx.moveTo(cx + q.x, cy - q.y); drawing = true; } else ctx.lineTo(cx + q.x, cy - q.y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      };
      drawRingArc(false);

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
        const tt = (time * 0.2 + i / NODES.length) % 1;
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
        // paper disc with the channel icon
        const rad = 8 + depth * 4;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "#fffdf9";
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, rad, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = `rgba(${BRAND},1)`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        drawIcon(ctx, n.icon, p.sx, p.sy, rad * 1.05, "#157a47");
        ctx.restore();
        if (p.z > 0.1) {
          ctx.font = `bold ${(9 + depth * 2.5).toFixed(1)}px monospace`;
          ctx.fillStyle = `rgba(${BRAND_DK},${alpha.toFixed(3)})`;
          ctx.fillText(n.label.split("").join(" "), p.sx, p.sy - 17 - depth * 5);
        }
      });

      // 4b — Industry ring, front half, with labels where it runs
      drawRingArc(true);
      ctx.font = `bold 8px ${MONO}`;
      ringPts.forEach((r) => {
        if (r.z < 0.05) return;
        const a = 0.25 + r.z * 0.75;
        const text = r.label.split("").join(" ");
        const tw = ctx.measureText(text).width;
        const lx = Math.max(8 + tw / 2 + 12, Math.min(w - 8 - tw / 2, r.sx + 8));
        ctx.fillStyle = STATUS_COLOR[r.status] || "#8a8072";
        ctx.globalAlpha = a;
        ctx.beginPath();
        ctx.arc(lx - tw / 2 - 8, r.sy, 2.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#211d17";
        ctx.textAlign = "center";
        ctx.fillText(text, lx, r.sy);
        ctx.globalAlpha = 1;
      });

      // 5 — One conversation at a time: the node rings, and a card says what it ended in
      {
        const period = 4.8;
        const idx = Math.floor(time / period) % CASES.length;
        const ph = (time % period) / period;
        const vis = Math.min(ease(ph / 0.12), ease((1 - ph) / 0.12)); // fade in / hold / fade out
        const c = CASES[idx];
        const n = NODES[c.node];
        const p = project(toVec(n.lat, n.lon));
        // anchor: the node if it is facing us, otherwise the hub (the conversation still lands there)
        const hub = project(hubV);
        // anchor: the node if it faces us, else the hub, else the lower front of the globe
        const at = p.z > 0 ? p : hub.z > -0.2 ? hub : { sx: cx, sy: cy + 0.55 * R, z: 1 };
        if (vis > 0) {
          // incoming-call rings
          for (let k = 0; k < 2; k++) {
            const rp = (ph * 2.2 + k * 0.5) % 1;
            ctx.strokeStyle = `rgba(${BRAND},${((1 - rp) * vis * 0.9).toFixed(3)})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(at.sx, at.sy, 6 + rp * 34, 0, Math.PI * 2);
            ctx.stroke();
          }
          // card, placed toward the centre so it stays inside the canvas
          const cw = 248, ch = 58;
          const dirX = at.sx < cx ? 1 : -1;
          const cxCard = at.sx + dirX * 34 - (dirX < 0 ? cw : 0);
          const atHub = p.z <= 0;
          let cyCard = atHub ? at.sy + 30 : at.sy < cy ? at.sy + 30 : at.sy - ch - 30; // below upper nodes, above lower ones
          const cardX = Math.max(8, Math.min(w - cw - 8, cxCard));
          // never sit on top of the hub and its chips
          if (!atHub && hub.z > -0.2 && hub.sx > cardX - 20 && hub.sx < cardX + cw + 20 && hub.sy > cyCard - 30 && hub.sy < cyCard + ch + 30) {
            cyCard = hub.sy < cy ? hub.sy + 44 : hub.sy - ch - 44;
          }
          cyCard = Math.max(8, Math.min(h - ch - 28, cyCard));
          // leader
          ctx.strokeStyle = `rgba(${BRAND_DK},${(vis * 0.6).toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 3]);
          ctx.beginPath();
          ctx.moveTo(at.sx, at.sy);
          ctx.lineTo(dirX > 0 ? cardX : cardX + cw, cyCard + ch / 2);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.save();
          ctx.globalAlpha = vis;
          ctx.shadowColor = "rgba(40,30,15,0.12)";
          ctx.shadowBlur = 14;
          ctx.shadowOffsetY = 4;
          ctx.fillStyle = "#fffdf9";
          roundRect(ctx, cardX, cyCard, cw, ch, 10);
          ctx.fill();
          ctx.shadowColor = "transparent";
          ctx.strokeStyle = "#c8e6d4";
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.textAlign = "left";
          ctx.font = `bold 9px ${MONO}`;
          ctx.fillStyle = "#11603a";
          ctx.fillText(c.tag, cardX + 12, cyCard + 14);
          // right-hand stamp: trade + time, or just the time if the row is tight
          ctx.font = `bold 9px ${MONO}`;
          const tagW = ctx.measureText(c.tag).width;
          ctx.font = `8px ${MONO}`;
          let stamp = `${c.trade} · ${c.when}`;
          if (tagW + ctx.measureText(stamp).width > cw - 34) stamp = c.when;
          ctx.textAlign = "right";
          ctx.fillStyle = "#8a8072";
          ctx.fillText(stamp, cardX + cw - 12, cyCard + 14);
          ctx.textAlign = "left";
          ctx.font = `600 11.5px ${SANS}`;
          ctx.fillStyle = "#211d17";
          ctx.fillText(c.what, cardX + 12, cyCard + 30);
          ctx.font = `11px ${SANS}`;
          ctx.fillStyle = "#157a47";
          ctx.fillText("→ " + c.then, cardX + 12, cyCard + 46);
          ctx.restore();
          ctx.textAlign = "center";
        }
      }

      // 6 — The hub: one pipeline
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

      // 7 — Extracted fields: a chip floats up from the hub as each conversation arrives
      if (hp.z > -0.2) {
        NODES.forEach((_, i) => {
          const tt = (time * 0.2 + i / NODES.length) % 1;
          // visible from just before arrival until shortly after
          const win = tt > 0.95 ? (tt - 0.95) / 0.05 : tt < 0.14 ? 1 + tt / 0.14 : -1; // one chip at a time
          if (win < 0) return;
          const rise = win > 1 ? win - 1 : 0; // 0 → 1 after arrival
          const alpha = win <= 1 ? win : 1 - rise;
          const text = CHIPS[(i + Math.floor(time * 0.2)) % CHIPS.length];
          ctx.font = `bold 9px ${MONO}`;
          const tw = ctx.measureText(text).width + 18;
          const x = Math.max(8, Math.min(w - tw - 8, hp.sx - tw / 2 + (i % 2 ? 26 : -26))); // keep inside the canvas
          const y = hp.sy - 26 - rise * 34;
          ctx.save();
          ctx.globalAlpha = alpha * 0.95;
          ctx.fillStyle = "#e1f2e7";
          roundRect(ctx, x, y - 9, tw, 18, 7);
          ctx.fill();
          ctx.strokeStyle = "#c8e6d4";
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.fillStyle = "#11603a";
          ctx.textAlign = "center";
          ctx.fillText(text, x + tw / 2, y + 1);
          ctx.restore();
        });
      }

      // 8 — The decision layer, step by step, in time with each arrival
      {
        const active = Math.floor(((time * 0.2) % 1) * STEPS.length);
        ctx.font = `bold 8.5px ${MONO}`;
        const gap = 28;
        const widths = STEPS.map((t) => ctx.measureText(t.split("").join(" ")).width);
        const total = widths.reduce((a, b) => a + b, 0) + gap * (STEPS.length - 1);
        let x = cx - total / 2;
        const y = h - 12;
        STEPS.forEach((t, i) => {
          const on = i === active;
          ctx.textAlign = "left";
          ctx.fillStyle = on ? `rgba(${BRAND_DK},1)` : "rgba(138,128,114,0.75)";
          ctx.fillText(t.split("").join(" "), x, y);
          if (on) {
            ctx.fillStyle = `rgba(${BRAND},1)`;
            ctx.beginPath();
            ctx.arc(x + widths[i] / 2, y + 9, 2, 0, Math.PI * 2);
            ctx.fill();
          }
          x += widths[i];
          if (i < STEPS.length - 1) {
            ctx.fillStyle = "rgba(216,203,185,1)";
            ctx.fillText("\u2192", x + 10, y);
            x += gap;
          }
        });
        ctx.textAlign = "center";
      }

      time += 0.016;
      frameRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      ro?.disconnect();
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block" }} aria-hidden />;
}
