"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { plans, plansIntro } from "@/lib/content";

export function PricingSection() {
  return (
    <section id="plans" className="relative py-32 lg:py-40 border-t border-line">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-16">
          <span className="kb-label block mb-6">Plans</span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight text-ink mb-6">
            Priced against the jobs it books,
            <br />
            <span className="text-stroke">not the seats you fill.</span>
          </h2>
          <p className="text-lg text-ink-2 max-w-xl">{plansIntro.sub}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-12">
          {["Keep your number", "Guided carrier setup", "Every call captured & transcribed", "Structured leads", "Revenue board", "SMS receipts", "A human who answers"].map((i) => (
            <span key={i} className="px-3 py-[6px] rounded-full bg-brand-soft text-brand-txt text-[13px] font-bold">
              ✓ {i}
            </span>
          ))}
          <span className="font-mono text-[11px] text-ink-3">IN ALL OF THEM</span>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-2xl flex flex-col ${
                plan.featured ? "dark-panel-steep text-white shadow-2 xl:-my-4 xl:py-12" : "bg-paper border border-line shadow-1"
              }`}
            >
              {plan.tag && (
                <span className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-mint text-mint-ink text-[10px] font-mono uppercase tracking-[.1em]">
                  {plan.tag}
                </span>
              )}

              <div className="mb-6">
                <span className={`font-mono text-xs ${plan.featured ? "text-mint" : "text-ink-3"}`}>{String(idx + 1).padStart(2, "0")}</span>
                <h3 className={`font-display text-3xl mt-2 ${plan.featured ? "text-white" : "text-ink"}`}>{plan.name}</h3>
                <p className={`text-sm mt-2 ${plan.featured ? "text-white/80" : "text-ink-2"}`}>{plan.who}</p>
              </div>

              <div className={`mb-6 pb-6 border-b ${plan.featured ? "border-white/15" : "border-line"}`}>
                <span className={`font-display font-bold text-4xl tracking-[-0.03em] ${plan.featured ? "text-white" : "text-ink"}`}>
                  {plan.minutes.split(" ")[0]}
                </span>
                <p className={`mt-2 font-mono text-[10.5px] uppercase tracking-[.06em] ${plan.featured ? "text-mint" : "text-ink-3"}`}>
                  {plan.minutes.replace(/^~?[\d,]+ |^Unlimited /, "")} · quoted on a 15-minute call
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.featured ? "text-mint" : "text-brand"}`} />
                    <span className={`text-sm ${plan.featured ? "text-white/90" : "text-ink-2"}`}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={`mt-auto w-full py-4 rounded-[11px] flex items-center justify-center gap-2 text-sm font-bold transition-all group ${
                  plan.featured ? "bg-mint text-mint-ink hover:bg-white" : "bg-brand text-white shadow-glow hover:bg-brand-dk"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-ink-2">
          {plansIntro.note}{" "}
          <Link href="/plans" className="font-bold text-brand-dk hover:text-brand">
            Layers, billing and bring-your-own-keys →
          </Link>
        </p>
      </div>
    </section>
  );
}
