import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Status } from "@/lib/content";

/* Layout ------------------------------------------------------------ */

export function Container({ className, children, narrow }: { className?: string; children: ReactNode; narrow?: boolean }) {
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-8", narrow ? "max-w-[900px]" : "max-w-[1240px]", className)}>
      {children}
    </div>
  );
}

export function Section({ className, children, id, narrow }: { className?: string; children: ReactNode; id?: string; narrow?: boolean }) {
  return (
    <section id={id} className={cn("scroll-mt-24", className)}>
      <Container narrow={narrow}>{children}</Container>
    </section>
  );
}

/* Typography -------------------------------------------------------- */

export function Eyebrow({ children, className, tone = "muted" }: { children: ReactNode; className?: string; tone?: "muted" | "brand" | "mint" }) {
  return (
    <span
      className={cn(
        "kb-label block",
        tone === "brand" && "text-brand-txt",
        tone === "mint" && "text-mint",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  className,
  titleClass,
  subClass,
  aside,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  className?: string;
  titleClass?: string;
  subClass?: string;
  aside?: ReactNode;
}) {
  return (
    <div className={className}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:gap-7">
        <h2 className={cn("flex-1 text-[clamp(30px,3.6vw,44px)] leading-[1.08]", titleClass)}>{title}</h2>
        {sub && <p className={cn("max-w-[44ch] text-[16px] text-ink-2", subClass)}>{sub}</p>}
        {aside}
      </div>
    </div>
  );
}

export function PageHead({ eyebrow, title, sub, children }: { eyebrow: ReactNode; title: ReactNode; sub?: ReactNode; children?: ReactNode }) {
  return (
    <div>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-3 max-w-[24ch] text-[clamp(34px,4.4vw,56px)] leading-[1.08]">{title}</h1>
      {sub && <p className="mt-4 max-w-[62ch] text-[18px] text-ink-2">{sub}</p>}
      {children}
    </div>
  );
}

/* Surfaces ---------------------------------------------------------- */

export function Card({ className, children, as: Comp = "div", tone = "paper" }: { className?: string; children: ReactNode; as?: "div" | "article" | "li"; tone?: "paper" | "paper-2" | "brand" | "dashed" }) {
  return (
    <Comp
      className={cn(
        "rounded-2xl border p-5",
        tone === "paper" && "border-line bg-paper shadow-1",
        tone === "paper-2" && "border-line bg-paper-2",
        tone === "brand" && "border-brand-line bg-brand-soft",
        tone === "dashed" && "border-dashed border-line-2 bg-paper",
        className,
      )}
    >
      {children}
    </Comp>
  );
}

export function DarkPanel({ className, children, steep }: { className?: string; children: ReactNode; steep?: boolean }) {
  return <div className={cn(steep ? "dark-panel-steep" : "dark-panel", "rounded-2xl", className)}>{children}</div>;
}

export function DarkTile({ h, d }: { h: string; d: string }) {
  return (
    <div className="rounded-[13px] border border-white/10 bg-white/[0.06] px-5 py-4">
      <h4 className="mb-1 text-[16px] text-white">{h}</h4>
      <p className="text-[13.5px] text-white/80">{d}</p>
    </div>
  );
}

/* Chips ------------------------------------------------------------- */

const chipTone: Record<Status, string> = {
  LIVE: "bg-brand-soft text-brand-txt",
  MEASURED: "bg-brand-soft text-brand-txt",
  "IN ROLLOUT": "bg-amber-soft text-amber-txt",
  PILOT: "bg-blue-soft text-blue-txt",
  COMING: "bg-chip-2 text-ink-2",
  PROJECTED: "bg-chip-2 text-ink-2",
};

export function StatusChip({ status, className }: { status: Status; className?: string }) {
  return (
    <span className={cn("kb-label-sm inline-block whitespace-nowrap rounded-[5px] px-[7px] py-[3px] !text-[9px] tracking-[.09em]", chipTone[status], className)}>
      {status}
    </span>
  );
}

export function MonoChip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("rounded-lg border border-line bg-chip px-[10px] py-[5px] font-mono text-[10.5px] text-ink-2", className)}>
      {children}
    </span>
  );
}

export function Pill({ children, tone = "brand" }: { children: ReactNode; tone?: "brand" | "amber" | "blue" | "red" | "neutral" }) {
  const tones = {
    brand: "bg-brand-soft text-brand-txt",
    amber: "bg-amber-soft text-amber-txt",
    blue: "bg-blue-soft text-blue-txt",
    red: "bg-red-soft text-red-txt",
    neutral: "bg-chip-2 text-ink-2",
  };
  return <span className={cn("rounded-full px-[11px] py-[5px] text-[12.5px] font-bold", tones[tone])}>{children}</span>;
}

/* Buttons ----------------------------------------------------------- */

const btnBase = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[11px] font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand/40";

export const btnStyles = {
  primary: cn(btnBase, "bg-brand text-white shadow-glow hover:-translate-y-px hover:bg-brand-dk"),
  secondary: cn(btnBase, "border border-line-2 bg-white font-semibold text-ink shadow-1 hover:border-ink-3"),
  ghost: cn(btnBase, "border border-line-2 font-semibold text-ink hover:bg-white"),
  mint: cn(btnBase, "bg-mint text-mint-ink hover:bg-white"),
  onDark: cn(btnBase, "border border-white/25 font-semibold text-white hover:border-white"),
  primaryOnDark: cn(btnBase, "bg-brand text-white shadow-glow hover:bg-mint hover:text-mint-ink"),
};

export const btnSizes = {
  sm: "px-[14px] py-[9px] text-[14px]",
  md: "px-[18px] py-[10px] text-[14px]",
  lg: "px-[26px] py-[15px] text-[16px]",
};

export function Btn({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  type,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  variant?: keyof typeof btnStyles;
  size?: keyof typeof btnSizes;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  const cls = cn(btnStyles[variant], btnSizes[size], className);
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} className={cls} onClick={onClick}>
      {children}
    </button>
  );
}

/* Small pieces ------------------------------------------------------ */

export function CheckRow({ h, d }: { h: string; d?: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-[2px] grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-brand-soft">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M2.5 6.3 4.8 8.6 9.5 3.6" stroke="#157a47" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <p className="text-[15px]">
        <strong className="font-bold">{h}</strong> {d && <span className="text-ink-2">{d}</span>}
      </p>
    </div>
  );
}

export function Stat({ v, l, w, size = "md", dark }: { v: string; l: string; w?: string; size?: "md" | "lg"; dark?: boolean }) {
  return (
    <div className={cn("rounded-2xl border p-5", dark ? "border-white/10 bg-white/[0.06]" : "border-line bg-paper shadow-1")}>
      <p className={cn("font-display font-bold leading-[1.05] tracking-[-0.03em]", size === "lg" ? "text-[38px]" : "text-[32px]", dark && "text-white")}>{v}</p>
      <p className={cn("mt-1 text-[13.5px]", dark ? "text-white/80" : "text-ink-2")}>{l}</p>
      {w && <span className={cn("kb-label-sm mt-2 inline-block", dark ? "text-mint" : "text-brand-txt")}>{w}</span>}
    </div>
  );
}

export function Arrow() {
  return <span aria-hidden>→</span>;
}

export function Figure({ children, caption }: { children: ReactNode; caption?: string }) {
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-2">{children}</div>
      {caption && <figcaption className="mt-2 font-mono text-[11px] text-ink-3">{caption}</figcaption>}
    </figure>
  );
}
