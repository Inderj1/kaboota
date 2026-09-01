import type { Metadata } from "next";
import { trust, security, securityNote, faqs, brand } from "@/lib/content";
import { Section, PageHead, Eyebrow, Card, DarkPanel, Btn, MonoChip } from "@/components/site/ui";
import { Faq } from "@/components/site/faq";

export const metadata: Metadata = {
  title: "Trust — Recording calls is serious. We treat it that way.",
  description: trust.sub,
};

const trustFaq = faqs.filter((f) => /legal|vendors goes down|owns the conversation|security questionnaire/i.test(f.q));

export default function SecurityPage() {
  return (
    <main className="pb-20 pt-14 lg:pt-16">
      <Section>
        <PageHead eyebrow="Trust" title={trust.h2} sub={trust.sub}>
          <div className="mt-6 flex flex-wrap gap-3">
            <Btn href={`mailto:${brand.emails.security}`} size="lg">Contact security</Btn>
            <Btn href="/contact#privacy" variant="secondary" size="lg">Privacy, in plain language</Btn>
          </div>
        </PageHead>

        <div id="consent" className="mt-10 scroll-mt-24">
          <Eyebrow>Recording, consent & messaging</Eyebrow>
          <div className="mt-3 flex flex-wrap gap-2">
            {trust.chips.map((c) => (
              <MonoChip key={c} className="text-ink">{c}</MonoChip>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-1 gap-[14px] md:grid-cols-2 xl:grid-cols-3">
            {trust.items.map((t) => (
              <Card key={t.h} className="p-[18px]">
                <h4 className="text-[15px]">{t.h}</h4>
                <p className="mt-[6px] text-[13.5px] text-ink-2">{t.d}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <Eyebrow>Security & data</Eyebrow>
          <h2 className="mt-3 max-w-[26ch] text-[clamp(26px,3vw,36px)]">The boring answers, written down before you ask</h2>
          <div className="mt-5 grid grid-cols-1 gap-[14px] md:grid-cols-2 xl:grid-cols-3">
            {security.map((s) => (
              <Card key={s.k} className="flex flex-col gap-2 p-[22px]">
                <span className="kb-label-sm text-brand-txt">{s.k}</span>
                <p className="text-[13.5px] text-ink-2">{s.d}</p>
              </Card>
            ))}
          </div>
          <p className="mt-4 max-w-[74ch] text-[13px] text-ink-3">{securityNote}</p>
        </div>

        <DarkPanel className="mt-10 flex flex-wrap items-center gap-5 px-7 py-6">
          <div className="min-w-[260px] flex-1">
            <h3 className="text-[20px] text-white">Need our security questionnaire answered?</h3>
            <p className="mt-1 text-[14.5px] text-white/85">Email {brand.emails.security} — we answer it plainly, including the rows where the answer is not yet.</p>
          </div>
          <Btn href={`mailto:${brand.emails.security}`} variant="mint">Email security</Btn>
        </DarkPanel>

        <div className="mt-14">
          <h2 className="text-[clamp(26px,3vw,36px)]">Straight answers</h2>
          <div className="mt-6"><Faq items={trustFaq} /></div>
        </div>
      </Section>
    </main>
  );
}
