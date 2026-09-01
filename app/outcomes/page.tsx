import type { Metadata } from "next";
import { cases, proofOpen, evidence, ctas } from "@/lib/content";
import { Section, PageHead, Eyebrow, Card, DarkPanel, DarkTile, Btn } from "@/components/site/ui";
import { CaseCard } from "@/components/site/case-card";

export const metadata: Metadata = {
  title: "Outcomes — One pilot, measured honestly, and the gaps left visible",
  description: "We are early, and this page says so. Everything below carries the window it was measured over.",
};

export default function ResultsPage() {
  return (
    <main className="pb-20 pt-14 lg:pt-16">
      <Section>
        <PageHead
          eyebrow="Outcomes"
          title="One pilot, measured honestly, and the gaps left visible"
          sub="We are early, and this page says so. Everything below carries the window it was measured over. Where we have nothing to report yet, the row says that instead of borrowing a number from somewhere else."
        />

        <div className="mt-9 flex flex-col gap-8">
          {cases.map((c) => (
            <CaseCard key={c.tag} c={c} />
          ))}
        </div>

        <div className="mt-12">
          <Eyebrow>Not yet reported</Eyebrow>
          <h2 className="mt-3 max-w-[28ch] text-[clamp(26px,3.2vw,38px)]">Running, but nothing measured to publish</h2>
          <p className="mt-3 max-w-[64ch] text-[16px] text-ink-2">
            These are live. When each has a full reporting period behind it, its numbers will appear above with the window attached — and not before.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {proofOpen.map((q) => (
              <Card key={q.k} tone="dashed" className="px-6 py-[22px]">
                <h4 className="mb-[6px] text-[17px]">{q.k}</h4>
                <p className="text-[14px] text-ink-2">{q.d}</p>
              </Card>
            ))}
          </div>
        </div>

        <DarkPanel className="mt-12 p-7 sm:p-8">
          <Eyebrow tone="mint" className="!text-[10px]">How we report</Eyebrow>
          <h2 className="mt-[10px] max-w-[26ch] text-[clamp(26px,3vw,36px)] text-white">A number without a window is a decoration</h2>
          <div className="mt-[22px] grid grid-cols-1 gap-4 md:grid-cols-2">
            {evidence.map((e) => (
              <DarkTile key={e.h} h={e.h} d={e.d} />
            ))}
          </div>
        </DarkPanel>

        <div className="dark-panel-steep mt-8 flex flex-wrap items-center gap-5 rounded-2xl px-7 py-6">
          <div className="min-w-[260px] flex-1">
            <h3 className="text-[22px] text-white">Want your own week on the board?</h3>
            <p className="mt-[6px] text-[15px] text-white/85">Forward your line for two weeks. We&apos;ll hand you the week your phone actually had, with the window stated.</p>
          </div>
          <Btn href={ctas.primary.href} variant="mint">{ctas.primary.label}</Btn>
          <Btn href={ctas.secondary.href} variant="onDark">{ctas.secondary.label}</Btn>
        </div>
      </Section>
    </main>
  );
}
