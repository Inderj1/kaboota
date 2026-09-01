import type { Metadata } from "next";
import { plans, plansIntro, addons, billing, onboard, costs, faqs, ctas } from "@/lib/content";
import { Section, PageHead, Eyebrow, SectionHead, Card, DarkPanel, DarkTile, StatusChip, Btn } from "@/components/site/ui";
import { Faq } from "@/components/site/faq";
import { PlanSizer } from "@/components/site/plan-sizer";

export const metadata: Metadata = {
  title: "Plans — Priced against the jobs it books, not the seats you fill",
  description: plansIntro.sub,
};

export default function PlansPage() {
  return (
    <main className="pb-20 pt-14 lg:pt-16">
      <Section>
        <PageHead eyebrow="Plans" title={plansIntro.h1} sub={plansIntro.sub}>
          <div className="mt-6 flex flex-wrap gap-3">
            <Btn href="/contact" size="lg">Talk to us</Btn>
            <Btn href="#sizer" variant="secondary" size="lg">Size my plan</Btn>
          </div>
        </PageHead>

        <div className="mt-9 grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((p) => (
            <div key={p.name} className={p.featured ? "dark-panel-steep flex flex-col rounded-2xl p-6 text-white shadow-2" : "flex flex-col rounded-2xl border border-line bg-paper p-6 shadow-1"}>
              <div className="flex items-center gap-2">
                <h3 className={p.featured ? "text-[21px] text-white" : "text-[21px]"}>{p.name}</h3>
                {p.tag && <span className="kb-label-sm rounded-full bg-mint px-2 py-[3px] !text-[9.5px] text-mint-ink">{p.tag}</span>}
              </div>
              <p className={`mt-[10px] font-mono text-[12px] uppercase tracking-[.06em] ${p.featured ? "text-mint" : "text-ink-3"}`}>{p.minutes}</p>
              <p className={`mt-3 text-[14.5px] ${p.featured ? "text-white/90" : "text-ink-2"}`}>{p.who}</p>
              <div className="mt-[18px] flex flex-col gap-2">
                {p.features.map((f) => (
                  <p key={f} className={`text-[13.5px] ${p.featured ? "text-white/[0.92]" : "text-ink-2"}`}>· {f}</p>
                ))}
              </div>
              <Btn href="/contact" variant={p.featured ? "mint" : "secondary"} className="mt-auto pt-3">{p.cta}</Btn>
            </div>
          ))}
        </div>

        <div className="mt-[22px] grid grid-cols-1 gap-[18px] lg:grid-cols-[1.1fr_.9fr]">
          <Card tone="brand" className="p-6">
            <h3 className="text-[20px] text-brand-txt">{plansIntro.byok.h}</h3>
            <p className="mt-2 text-[15px] text-brand-txt">{plansIntro.byok.d}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-[20px]">{plansIntro.included.h}</h3>
            <p className="mt-2 text-[15px] text-ink-2">{plansIntro.included.d}</p>
          </Card>
        </div>
        <p className="mt-[18px] font-mono text-[11.5px] text-ink-3">{plansIntro.note}</p>

        <div id="sizer" className="mt-16 scroll-mt-24">
          <SectionHead eyebrow="Size it" title="Tell us your week. We'll tell you the band." sub="Minutes, not seats. Advice both directions: over 90% of your minutes we say upgrade, under 20% we say downgrade." titleClass="max-w-[22ch]" />
          <div className="mt-6"><PlanSizer /></div>
        </div>

        <div className="mt-16">
          <SectionHead eyebrow="Layers" title="Turn on what you need, when it starts costing you" sub="These sit on top of any plan rather than forcing you up a tier. Each one is priced against the work it removes, and none of them changes your minute allowance except outbound, which shares it." titleClass="max-w-[26ch]" />
          <div className="mt-6 grid grid-cols-1 gap-[14px] md:grid-cols-2 xl:grid-cols-4">
            {addons.map((a) => (
              <Card key={a.k} className="flex flex-col gap-[9px] p-[22px]">
                <div className="flex items-center justify-between gap-2">
                  <span className="kb-label-sm text-brand-txt">{a.k}</span>
                  <StatusChip status={a.status} />
                </div>
                <h4 className="text-[17px]">{a.h}</h4>
                <p className="text-[13.5px] text-ink-2">{a.d}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <SectionHead eyebrow="The meter" title={costs.h2} sub={costs.sub} titleClass="max-w-[22ch]" />
          <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-paper shadow-1">
            <table className="w-full min-w-[760px] border-collapse">
              <thead>
                <tr className="border-b border-line bg-paper-2">
                  {["Axis", "Options · cost per minute", "How it's chosen"].map((h) => (
                    <th key={h} className="kb-label-sm px-5 py-[13px] text-left font-normal text-ink-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {costs.rows.map((r) => (
                  <tr key={r.axis} className="border-b border-line last:border-b-0">
                    <td className="whitespace-nowrap px-5 py-4 align-top text-[15px] font-bold">{r.axis}</td>
                    <td className="px-5 py-4 align-top font-mono text-[12.5px]">{r.options}</td>
                    <td className="px-5 py-4 align-top text-[14px] text-ink-2">{r.gating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <DarkPanel className="mt-16 p-7 sm:p-8">
          <Eyebrow tone="mint" className="!text-[10px]">How the bill is shaped</Eyebrow>
          <h2 className="mt-[10px] max-w-[28ch] text-[clamp(26px,3vw,36px)] text-white">You should be able to predict the invoice before it arrives</h2>
          <div className="mt-[22px] grid grid-cols-1 gap-4 md:grid-cols-2">
            {billing.map((b) => (
              <DarkTile key={b.h} h={b.h} d={b.d} />
            ))}
          </div>
        </DarkPanel>

        <div id="getting-live" className="mt-16 scroll-mt-24">
          <SectionHead eyebrow="Getting live" title={onboard.h2} sub={onboard.sub} titleClass="max-w-[26ch]" />
          <div className="mt-6 grid grid-cols-1 gap-[18px] lg:grid-cols-2">
            <Card className="p-[26px]">
              <span className="kb-label-sm rounded-[5px] bg-amber-soft px-[9px] py-1 text-amber-txt">You provide</span>
              <div className="mt-[18px] flex flex-col gap-4">
                {onboard.you.map((o) => (
                  <div key={o.n} className="flex items-start gap-[13px]">
                    <span className="flex-shrink-0 font-mono text-[15px] text-line-2">{o.n}</span>
                    <div>
                      <h4 className="mb-1 text-[16px]">{o.h}</h4>
                      <p className="text-[13.5px] text-ink-2">{o.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <DarkPanel steep className="p-[26px]">
              <span className="kb-label-sm rounded-[5px] bg-mint px-[9px] py-1 text-mint-ink">We deliver</span>
              <div className="mt-[18px] flex flex-col gap-4">
                {onboard.we.map((o) => (
                  <div key={o.n} className="flex items-start gap-[13px]">
                    <span className="flex-shrink-0 font-mono text-[15px] text-white/35">{o.n}</span>
                    <div>
                      <h4 className="mb-1 text-[16px] text-white">{o.h}</h4>
                      <p className="text-[13.5px] text-white/80">{o.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </DarkPanel>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-[clamp(26px,3vw,36px)]">Straight answers</h2>
          <div className="mt-6"><Faq items={faqs.slice(0, 9)} /></div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn href={ctas.primary.href} size="lg">{ctas.primary.label}</Btn>
            <Btn href={ctas.secondary.href} variant="secondary" size="lg">{ctas.secondary.label}</Btn>
          </div>
        </div>
      </Section>
    </main>
  );
}
