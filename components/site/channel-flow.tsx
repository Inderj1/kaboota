/**
 * Static SVG: every channel flowing into one Kaboota record, and what comes out of it.
 * Drawn in the site palette — no icon library.
 */
export function ChannelFlow({ className }: { className?: string }) {
  const channels = ["Voice", "SMS", "Web chat", "Email", "Social", "Counter"];
  const outputs = ["Jobs booked", "Evidence-linked record", "Right desk", "Revenue board"];
  const W = 640;
  const cx = W / 2;
  return (
    <svg viewBox={`0 0 ${W} 360`} className={className} role="img" aria-label="Voice, SMS, web chat, email, social and counter conversations all flowing into one Kaboota record.">
      <defs>
        <linearGradient id="cfBrain" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1f9d5c" />
          <stop offset="1" stopColor="#157a47" />
        </linearGradient>
      </defs>
      {channels.map((c, i) => {
        const x = 40 + i * ((W - 80) / (channels.length - 1));
        return (
          <g key={c}>
            <path d={`M${x} 64 C ${x} 120, ${cx} 110, ${cx} 168`} fill="none" stroke="#d8cbb9" strokeWidth="1.5" strokeDasharray="4 4">
              <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.6s" repeatCount="indefinite" />
            </path>
            <rect x={x - 38} y={30} width="76" height="34" rx="17" fill="#fffdf9" stroke="#e7ddd0" />
            <text x={x} y={52} textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="10.5" letterSpacing="1" fill="#11603a">
              {c.toUpperCase()}
            </text>
          </g>
        );
      })}
      <rect x={cx - 110} y={168} width="220" height="70" rx="18" fill="url(#cfBrain)" />
      <text x={cx} y={195} textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="9.5" letterSpacing="1.5" fill="#dff5e8">
        KABOOTA · ONE PIPELINE
      </text>
      <text x={cx} y={220} textAnchor="middle" fontFamily="var(--font-display), serif" fontWeight="700" fontSize="18" fill="#ffffff">
        One record, one owner
      </text>
      {outputs.map((o, i) => {
        const x = 90 + i * ((W - 180) / (outputs.length - 1));
        return (
          <g key={o}>
            <path d={`M${cx} 238 C ${cx} 280, ${x} 270, ${x} 300`} fill="none" stroke="#c8e6d4" strokeWidth="1.5" />
            <rect x={x - 66} y={300} width="132" height="34" rx="10" fill="#e1f2e7" stroke="#c8e6d4" />
            <text x={x} y={321} textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontWeight="700" fontSize="12" fill="#11603a">
              {o}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function MemoryFlow({ steps, dark }: { steps: string[]; dark?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((s, i) => (
        <span key={s} className="flex items-center gap-2">
          <span className={dark ? "rounded-full bg-white/10 px-3 py-[6px] font-mono text-[11px] text-white" : "rounded-full bg-olive px-3 py-[6px] font-mono text-[11px] text-white"}>{s.toUpperCase()}</span>
          {i < steps.length - 1 && <span className={dark ? "text-mint" : "text-ink-3"}>→</span>}
        </span>
      ))}
      <span className={dark ? "text-mint" : "text-ink-3"}>→</span>
      <span className="rounded-full bg-brand px-3 py-[6px] font-mono text-[11px] font-bold text-white shadow-glow">ONE RECORD</span>
    </div>
  );
}
