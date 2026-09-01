import type { Metadata } from "next";
import { solutions, sectors, ctas } from "@/lib/content";
import { Section, PageHead, SectionHead, Card, StatusChip, Btn } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Solutions — Pick the one that sounds like your week",
  description: "Twelve versions of the same problem — a conversation that should have ended in an action and didn't. Same platform underneath, different place it shows up.",
};

export default function SolutionsPage() {
  return (
    <main className="pb-20 pt-14 lg:pt-16">
      <Section>
        <PageHead
          eyebrow="Solutions"
          title="Pick the one that sounds like your week"
          sub="Twelve versions of the same problem — a conversation that should have ended in an action and didn't. Same platform underneath, different place it shows up."
        />
        <div className="mt-9 grid grid-cols-1 gap-[14px] md:grid-cols-2 xl:grid-cols-3">
          {solutions.map((s) => (
            <Card key={s.h} className="flex flex-col gap-[9px] p-[22px]">
              <span className="kb-label-sm text-brand-txt">{s.g}</span>
              <h4 className="text-[17px] leading-[1.32]">{s.h}</h4>
              <p className="text-[13.5px] text-ink-2">{s.d}</p>
            </Card>
          ))}
        </div>
        <div className="dark-panel mt-9 flex flex-wrap items-center gap-5 rounded-2xl px-7 py-6">
          <p className="min-w-[280px] flex-1 text-[16.5px] text-white/[0.88]">
            None of these is a separate product or a separate line on the invoice. They are the same pipeline pointed at a different part of your week.
          </p>
          <Btn href="/outcomes" variant="mint">See what was measured</Btn>
        </div>

        <div className="mt-16">
          <SectionHead eyebrow="Where it runs" title="Proven in the trades. Not limited to them." sub="Nothing in the pipeline is trade-specific. A showroom, a service counter and a dispatch desk are the same problem wearing different vocabulary." titleClass="max-w-[26ch]" />
          <div className="mt-6 grid grid-cols-1 gap-[14px] sm:grid-cols-2 xl:grid-cols-4">
            {sectors.map((s) => (
              <Card key={s.k} className="flex flex-col gap-2">
                <StatusChip status={s.status} className="self-start" />
                <h4 className="text-[16.5px]">{s.k}</h4>
                <p className="text-[13px] text-ink-2">{s.d}</p>
              </Card>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn href={ctas.primary.href} size="lg">{ctas.primary.label}</Btn>
            <Btn href={ctas.secondary.href} variant="secondary" size="lg">{ctas.secondary.label}</Btn>
          </div>
        </div>
      </Section>
    </main>
  );
}
