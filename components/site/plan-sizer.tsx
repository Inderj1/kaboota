"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { plans } from "@/lib/content";
import { btnStyles, btnSizes } from "./ui";

/**
 * Minutes-based sizer, in the spirit of "advice both directions": recommend the smallest plan
 * whose allowance covers the month, and say so when you'd be under 20% of it.
 */
export function PlanSizer() {
  const [callsPerDay, setCallsPerDay] = useState(30);
  const [avgMin, setAvgMin] = useState(4);
  const [locations, setLocations] = useState(1);
  const [posture, setPosture] = useState<"listen" | "ai">("listen");

  const result = useMemo(() => {
    const minutes = Math.round(callsPerDay * avgMin * 30);
    let idx = plans.findIndex((p) => minutes <= p.minutesN * 0.9);
    if (idx < 0) idx = plans.length - 1;
    if (posture === "ai") idx = Math.max(idx, 2); // autonomous execution starts at Premium
    if (locations > 3) idx = plans.length - 1; // multi-location is included at Enterprise
    const plan = plans[idx];
    const usage = plan.minutesN === Infinity ? 0 : minutes / plan.minutesN;
    const advice =
      plan.minutesN !== Infinity && usage < 0.2 && idx > 0
        ? `You'd use under 20% of ${plan.name}. We'd say start on ${plans[idx - 1].name} and move up when the minutes say so.`
        : usage > 0.9
          ? `You'd be over 90% of ${plan.name}'s minutes — we'd quote the next band before you hit overage.`
          : `Comfortably inside ${plan.name}'s allowance. We'll quote it on a fifteen-minute call.`;
    return { minutes, plan, usage, advice };
  }, [callsPerDay, avgMin, locations, posture]);

  const chip = (on: boolean) =>
    cn("rounded-full border px-3 py-[6px] text-[13px] font-semibold transition-colors", on ? "border-brand bg-brand-soft text-brand-txt" : "border-line-2 bg-white text-ink-2 hover:border-ink-3");
  const input = "mt-2 w-full rounded-[11px] border border-line-2 bg-white px-3 py-[10px] font-display text-[22px] font-bold";

  return (
    <div className="grid grid-cols-1 gap-[18px] lg:grid-cols-[1.15fr_.85fr]">
      <div className="rounded-2xl border border-line bg-paper p-6 shadow-1">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <label className="block">
            <span className="kb-label-sm text-ink-3">Conversations a day</span>
            <input type="number" min={1} value={callsPerDay} onChange={(e) => setCallsPerDay(Math.max(1, Number(e.target.value)))} className={input} />
          </label>
          <label className="block">
            <span className="kb-label-sm text-ink-3">Average minutes each</span>
            <input type="number" min={1} value={avgMin} onChange={(e) => setAvgMin(Math.max(1, Number(e.target.value)))} className={input} />
          </label>
          <label className="block">
            <span className="kb-label-sm text-ink-3">Locations</span>
            <input type="number" min={1} value={locations} onChange={(e) => setLocations(Math.max(1, Number(e.target.value)))} className={input} />
            <span className="mt-1 block text-[11.5px] text-ink-3">More than three → Enterprise.</span>
          </label>
        </div>
        <div className="mt-6">
          <span className="kb-label-sm text-ink-3">Posture</span>
          <div className="mt-2 flex flex-wrap gap-2">
            <button type="button" onClick={() => setPosture("listen")} className={chip(posture === "listen")} aria-pressed={posture === "listen"}>Beside your team · assistive</button>
            <button type="button" onClick={() => setPosture("ai")} className={chip(posture === "ai")} aria-pressed={posture === "ai"}>Fully autonomous · executing</button>
          </div>
          <p className="mt-3 text-[12.5px] text-ink-3">The intelligence is identical in both modes — only the autonomy changes, and you can move one workflow at a time.</p>
        </div>
      </div>

      <div className="dark-panel-steep flex flex-col rounded-2xl p-6">
        <span className="kb-label-sm text-mint">Advice both directions</span>
        <h3 className="mt-2 text-[28px] text-white">{result.plan.name}</h3>
        <p className="mt-2 text-[14.5px] text-white/85">{result.plan.who}</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-[11px] border border-white/10 bg-white/[0.06] p-3">
            <p className="kb-label-sm !text-[9px] text-white/50">Minutes / month</p>
            <p className="mt-1 font-display text-[24px] font-bold text-white">{result.minutes.toLocaleString("en-US")}</p>
          </div>
          <div className="rounded-[11px] border border-white/10 bg-white/[0.06] p-3">
            <p className="kb-label-sm !text-[9px] text-white/50">Plan allowance</p>
            <p className="mt-1 font-display text-[24px] font-bold text-white">{result.plan.minutesN === Infinity ? "Unlimited" : `~${result.plan.minutesN.toLocaleString("en-US")}`}</p>
          </div>
        </div>
        <p className="mt-4 text-[13.5px] text-white/80">{result.advice}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          <a href="/contact" className={cn(btnStyles.mint, btnSizes.md)}>Talk to us</a>
          <a href="/pilot" className={cn(btnStyles.onDark, btnSizes.md)}>Start free pilot</a>
        </div>
      </div>
    </div>
  );
}
