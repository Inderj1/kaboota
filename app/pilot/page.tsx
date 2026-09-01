import type { Metadata } from "next";
import { pilot, onboard, brand } from "@/lib/content";
import { Section, Eyebrow, Card, CheckRow, DarkPanel } from "@/components/site/ui";
import { SiteForm, Field } from "@/components/site/forms";

export const metadata: Metadata = {
  title: "Start free pilot — Forward your line. See your real week by Friday.",
  description: pilot.sub,
};

export default function PilotPage() {
  return (
    <main className="pb-20 pt-14 lg:pt-16">
      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[.95fr_1.05fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft py-[6px] pl-2 pr-3 font-mono text-[11px] uppercase tracking-[.09em] text-brand-txt">
              <span className="h-[6px] w-[6px] rounded-full bg-brand animate-pulse-ring" />
              Free pilot · two weeks · listen-only to start
            </span>
            <h1 className="mt-5 max-w-[16ch] text-[clamp(34px,4.4vw,56px)] leading-[1.08]">{pilot.h1}</h1>
            <p className="mt-4 max-w-[52ch] text-[18px] text-ink-2">{pilot.sub}</p>

            <Card className="mt-8 p-6">
              <span className="kb-label-sm text-brand-txt">What you&apos;ll have by Friday</span>
              <div className="mt-3 flex flex-col gap-3">
                {pilot.see.map((s) => (
                  <CheckRow key={s} h={s} />
                ))}
              </div>
            </Card>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Card tone="paper-2" className="p-5">
                <span className="kb-label-sm text-ink-3">Who it&apos;s for</span>
                <ul className="mt-2 flex flex-col gap-1 text-[14px] text-ink-2">
                  {pilot.who.map((w) => (
                    <li key={w}>· {w}</li>
                  ))}
                </ul>
              </Card>
              <DarkPanel className="p-5">
                <Eyebrow tone="mint" className="!text-[10px]">You provide</Eyebrow>
                <ul className="mt-2 flex flex-col gap-2 text-[13.5px] text-white/85">
                  {onboard.you.map((o) => (
                    <li key={o.n}>{o.n} · {o.h}</li>
                  ))}
                </ul>
              </DarkPanel>
            </div>
          </div>

          <SiteForm title="Start your pilot" sub="One star code on your existing line. We reply within one business day to set it up." submitLabel="Start free pilot" note="Nothing speaks to a customer until you say it may. Undo it with the same star code." fallbackEmail={brand.emails.hello}>
            <Field name="name" label="Name" required />
            <Field name="company" label="Company" required />
            <Field name="email" label="Work email" type="email" required />
            <Field name="phone" label="The line you'd forward" type="tel" required placeholder="(365) 780-9809" />
            <Field name="trade" label="Trade" required options={pilot.trades} />
            <Field name="system" label="System of record" required options={pilot.systems} />
            <div className="sm:col-span-2"><Field name="volume" label="Conversations a day" required options={pilot.volumes} /></div>
            <div className="sm:col-span-2"><Field name="notes" label="Anything the AI must never say?" textarea /></div>
          </SiteForm>
        </div>
      </Section>
    </main>
  );
}
