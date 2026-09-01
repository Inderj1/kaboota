import Link from "next/link";
import { cn } from "@/lib/utils";

/** Kaboota mark: green gradient tile with two stacked chevrons (from the Kaboota design). */
export function LogoMark({ size = 34, className }: { size?: number; className?: string }) {
  const icon = Math.round(size / 2);
  return (
    <span
      className={cn("grid place-items-center rounded-[11px] shadow-glow", className)}
      style={{ width: size, height: size, background: "linear-gradient(150deg, var(--brand), var(--brand-dk))" }}
      aria-hidden
    >
      <svg width={icon} height={icon} viewBox="0 0 20 20" fill="none">
        <path d="M3 11.5 10 5l7 6.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 16 10 9.5l7 6.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity=".5" />
      </svg>
    </span>
  );
}

export function Logo({ dark, compact }: { dark?: boolean; compact?: boolean }) {
  return (
    <Link href="/" className="flex flex-shrink-0 items-center gap-[11px]" aria-label="Kaboota home">
      <LogoMark size={compact ? 28 : 34} />
      <span className="flex flex-col items-start leading-none">
        <span className={cn("font-display text-[19px] font-bold tracking-[-0.02em]", dark && "text-white")}>Kaboota</span>
        {!compact && <span className="mt-[3px] hidden font-mono text-[8.5px] tracking-[.11em] text-ink-3 sm:block">CONVERSATION-TO-ACTION INTELLIGENCE</span>}
      </span>
    </Link>
  );
}
