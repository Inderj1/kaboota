import type { Case } from "@/lib/content";
import { StatusChip } from "./ui";

export function CaseCard({ c, compact }: { c: Case; compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex flex-col gap-3 rounded-2xl border border-line bg-paper p-6 shadow-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="kb-label-sm text-brand-txt">{c.tag}</span>
          <StatusChip status={c.status} />
        </div>
        <h3 className="text-[21px] leading-[1.25]">{c.h}</h3>
        <div className="mt-1 grid grid-cols-2 gap-2">
          {c.figures.slice(0, 4).map((f) => (
            <div key={f.l} className="rounded-[11px] bg-paper-2 px-3 py-[10px]">
              <p className="font-display text-[24px] font-bold leading-none tracking-[-0.03em]">{f.v}</p>
              <p className="mt-1 text-[12px] text-ink-2">{f.l}</p>
            </div>
          ))}
        </div>
        <span className="kb-label-sm mt-auto text-ink-3">Measured · {c.window}</span>
      </div>
    );
  }
  return (
    <div className="rounded-[18px] border border-line bg-paper p-6 shadow-2 sm:p-8">
      <div className="flex flex-wrap items-center gap-[10px]">
        <span className="kb-label-sm text-brand-txt">{c.tag}</span>
        <StatusChip status={c.status} />
      </div>
      <h2 className="mt-3 max-w-[26ch] text-[clamp(26px,3.2vw,38px)]">{c.h}</h2>
      <div className="mt-[22px] grid grid-cols-1 gap-[22px] md:grid-cols-2">
        <div>
          <span className="kb-label-sm text-ink-3">The problem</span>
          <p className="mt-[7px] text-[15px] text-ink-2">{c.problem}</p>
        </div>
        <div>
          <span className="kb-label-sm text-ink-3">What we did</span>
          <p className="mt-[7px] text-[15px] text-ink-2">{c.solution}</p>
        </div>
      </div>
      <div className="mt-[22px] border-t border-line pt-5">
        <span className="kb-label-sm text-ink-3">What was measured · {c.window}</span>
        <div className="mt-3 flex flex-col gap-[9px]">
          {c.outcomes.map((o) => (
            <div key={o} className="flex items-start gap-[11px]">
              <span className="flex-shrink-0 font-bold text-brand">→</span>
              <p className="text-[15px]">{o}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[22px] overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[520px] border-collapse">
          <thead>
            <tr className="border-b border-line bg-paper-2">
              {["Figure", "Label", "Basis"].map((h) => (
                <th key={h} className="kb-label-sm px-5 py-3 text-left font-normal text-ink-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {c.figures.map((f) => (
              <tr key={f.l} className="border-b border-line last:border-b-0">
                <td className="whitespace-nowrap px-5 py-3 font-display text-[18px] font-bold tracking-[-0.02em]">{f.v}</td>
                <td className="px-5 py-3 text-[14px] text-ink-2">{f.l}</td>
                <td className="px-5 py-3">
                  <StatusChip status={f.basis} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {c.quote && (
        <div className="dark-panel mt-[22px] rounded-[14px] px-6 py-5">
          <p className="text-[17px] italic text-white">&ldquo;{c.quote}&rdquo;</p>
        </div>
      )}
    </div>
  );
}
