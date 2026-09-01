import type { Metadata } from "next";
import { walkthrough, heroScript, heroFields, pilot, brand } from "@/lib/content";
import { Section, Eyebrow, Card, DarkPanel } from "@/components/site/ui";
import { SiteForm, Field } from "@/components/site/forms";

export const metadata: Metadata = {
  title: "Book a walkthrough — Hear a real call end in the right action",
  description: walkthrough.sub,
};

export default function WalkthroughPage() {
  return (
    <main className="pb-20 pt-14 lg:pt-16">
      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <Eyebrow>{walkthrough.eyebrow}</Eyebrow>
            <h1 className="mt-3 max-w-[18ch] text-[clamp(34px,4.4vw,56px)] leading-[1.08]">{walkthrough.h1}</h1>
            <p className="mt-4 max-w-[54ch] text-[18px] text-ink-2">{walkthrough.sub}</p>

            {/* The call you'll hear */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-paper shadow-3">
              <div className="flex items-center gap-[10px] border-b border-line px-4 py-[14px]" style={{ background: "linear-gradient(120deg,#1a1d18,#20301f)" }}>
                <span className="relative inline-block h-[10px] w-[10px] rounded-full bg-mint">
                  <span className="absolute -inset-1 rounded-full border-[1.5px] border-mint animate-ring" />
                </span>
                <span className="text-[14px] font-bold text-white">Live call</span>
                <span className="font-mono text-[11px] text-white/55">0:07 · (365) 780-9809</span>
                <span className="flex-1" />
                <span className="flex h-[18px] items-end gap-[2px]" aria-hidden>
                  {[0, 0.12, 0.24, 0.36, 0.48, 0.6].map((d) => (
                    <span key={d} className="h-full w-[3px] rounded-[2px] bg-mint animate-wave" style={{ animationDelay: `${d}s` }} />
                  ))}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[1.35fr_.95fr]">
                <div className="flex flex-col gap-[11px] border-line p-[18px] md:border-r">
                  {heroScript.map((b, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <span className="kb-label-sm !text-[9.5px] text-ink-3">{b.who} · {b.t}</span>
                      <div className="max-w-[88%] px-[13px] py-[10px] text-[14px] leading-[1.45]" style={{ background: b.mine ? "#e1f2e7" : "#f2ece3", color: b.mine ? "#11603a" : "#211d17", borderRadius: b.mine ? "11px 11px 3px 11px" : "11px 11px 11px 3px", alignSelf: b.mine ? "flex-end" : "flex-start" }}>
                        {b.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3 bg-paper-2 p-[18px]">
                  <span className="kb-label-sm text-ink-3">Extracted live</span>
                  {heroFields.map((f) => (
                    <div key={f.k} className="flex flex-col gap-[3px]">
                      <span className="text-[11px] uppercase tracking-[.06em] text-ink-3">{f.k}</span>
                      <div className="flex items-center gap-[6px]">
                        <span className="text-[14px] font-bold">{f.v}</span>
                        <span className="rounded-[7px] bg-brand-soft px-[5px] py-[2px] font-mono text-[9.5px] text-brand-txt">{f.c}</span>
                      </div>
                    </div>
                  ))}
                  <div className="mt-auto rounded-[11px] border border-brand-line bg-brand-soft p-[11px]">
                    <span className="kb-label-sm !text-[9.5px] text-brand-txt">Suggested</span>
                    <p className="mt-1 text-[14px] font-bold text-brand-txt">Emergency slot today 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <SiteForm title="Book a walkthrough" sub="Twenty minutes with someone who runs these. We pick the call that sounds like your week." submitLabel="Book a walkthrough" note="No slides. A recorded pilot call, the live console, and the record it wrote." fallbackEmail={brand.emails.hello} dark>
              <Field name="name" label="Name" required />
              <Field name="email" label="Work email" type="email" required />
              <div className="sm:col-span-2"><Field name="trade" label="Trade" required options={pilot.trades} /></div>
              <div className="sm:col-span-2"><Field name="system" label="System of record" options={pilot.systems} /></div>
            </SiteForm>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {walkthrough.steps.map((s) => (
                <Card key={s.n} className="flex flex-col gap-1 p-4">
                  <span className="font-mono text-[18px] text-line-2">{s.n}</span>
                  <h4 className="text-[15px]">{s.h}</h4>
                  <p className="text-[13px] text-ink-2">{s.d}</p>
                </Card>
              ))}
            </div>
            <DarkPanel className="px-6 py-4">
              <p className="font-display text-[18px] font-semibold tracking-[-0.01em] text-white">{walkthrough.line}</p>
            </DarkPanel>
          </div>
        </div>
      </Section>
    </main>
  );
}
