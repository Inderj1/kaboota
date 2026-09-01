import type { Metadata } from "next";
import { company, principles, promises, security, securityNote, partners, ctas, brand } from "@/lib/content";
import { Section, PageHead, Eyebrow, SectionHead, Card, DarkPanel, Btn } from "@/components/site/ui";
import { SiteForm, Field } from "@/components/site/forms";

export const metadata: Metadata = {
  title: "Company — Nine out of ten jobs still start with a phone call",
  description: company.p1,
};

export default function CompanyPage() {
  return (
    <main className="pb-20 pt-14 lg:pt-16">
      <Section>
        <PageHead eyebrow="Company" title={company.h1} />
        <div className="mt-6 grid grid-cols-1 gap-9 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <p className="text-[18px] text-ink-2">{company.p1}</p>
            <p className="text-[16.5px] text-ink-2">{company.p2}</p>
            <div className="mt-2 flex flex-col gap-[14px]">
              {principles.map((p) => (
                <Card key={p.h} className="px-5 py-[18px]">
                  <h4 className="text-[17px]">{p.h}</h4>
                  <p className="mt-[6px] text-[14.5px] text-ink-2">{p.d}</p>
                </Card>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <DarkPanel className="p-[22px]">
              <p className="text-[17px] italic text-white/[0.92]">&ldquo;{company.quote}&rdquo;</p>
              <p className="mt-3 font-mono text-[11px] text-mint">{company.quoteBy}</p>
            </DarkPanel>
            <div className="grid grid-cols-2 gap-[14px]">
              {company.stats.map((s) => (
                <Card key={s.l} className="p-[18px]">
                  <p className="font-display text-[32px] font-bold tracking-[-0.03em]">{s.v}</p>
                  <p className="mt-1 text-[13.5px] text-ink-2">{s.l}</p>
                </Card>
              ))}
            </div>
            <Card tone="paper-2" className="p-5">
              <Eyebrow className="!text-[10px]">Where we're based</Eyebrow>
              <p className="mt-2 text-[14.5px] text-ink-2">{brand.domain} · {brand.phone}</p>
              <p className="mt-1 text-[14.5px] text-ink-2">Built alongside a working mechanical-services company, one call at a time.</p>
            </Card>
          </div>
        </div>

        <div className="mt-16">
          <SectionHead eyebrow="What we won't do" title="Four commitments that cost us deals" sub="Principles are easy to publish and hard to keep. These are the ones we have actually lost or slowed a deal over, which is the only test that means anything." titleClass="max-w-[26ch]" />
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {promises.map((w) => (
              <Card key={w.h} className="p-6">
                <h4 className="mb-[7px] text-[18px]">{w.h}</h4>
                <p className="text-[14.5px] text-ink-2">{w.d}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <SectionHead eyebrow="Security & data" title="The boring answers, written down before you ask" sub="Recording a customer's call is a serious thing to do on someone's behalf. Here is how it is handled, in the detail a procurement review actually wants." titleClass="max-w-[26ch]" />
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {security.map((s) => (
              <Card key={s.k} className="flex flex-col gap-2 p-[22px]">
                <span className="kb-label-sm text-brand-txt">{s.k}</span>
                <p className="text-[13.5px] text-ink-2">{s.d}</p>
              </Card>
            ))}
          </div>
          <p className="mt-4 max-w-[74ch] text-[13px] text-ink-3">{securityNote}</p>
        </div>

        <div id="partners" className="mt-16 scroll-mt-24">
          <SectionHead eyebrow="Partners" title={partners.h2} sub={partners.sub} titleClass="max-w-[26ch]" />
          <div className="mt-6 grid grid-cols-1 gap-[14px] md:grid-cols-2 xl:grid-cols-4">
            {partners.items.map((pr) => (
              <Card key={pr.k} className="flex flex-col gap-2 p-[22px]">
                <span className="kb-label-sm text-brand-txt">{pr.k}</span>
                <h4 className="text-[17px]">{pr.h}</h4>
                <p className="text-[13.5px] text-ink-2">{pr.d}</p>
              </Card>
            ))}
          </div>
          <div className="mt-6">
            <SiteForm
              title="Bring us an account"
              sub="Tell us about the client and how you work. We come back within one business day with the partner brief, commercial terms and a walkthrough on one of your accounts."
              submitLabel="Talk to partners"
              note="We do the build and the ongoing tuning. You keep the relationship and the credit."
              fallbackEmail={brand.emails.partners}
            >
              <Field name="name" label="Name" required />
              <Field name="company" label="Company" required />
              <Field name="email" label="Work email" type="email" required />
              <Field name="type" label="Partner type" required options={["Agency", "Consultancy", "Trade software reseller", "Franchise group", "Other"]} />
              <div className="sm:col-span-2"><Field name="needs" label="What does the account need?" textarea /></div>
            </SiteForm>
          </div>
        </div>

        <div className="dark-panel mt-16 flex flex-wrap items-center gap-5 rounded-2xl px-7 py-6">
          <div className="min-w-[260px] flex-1">
            <h3 className="text-[22px] text-white">Or just forward your line</h3>
            <p className="mt-[6px] text-[15px] text-white/85">Two weeks, your own number, listen-only to start. Nothing speaks to a customer until you say it may.</p>
          </div>
          <Btn href={ctas.primary.href} variant="mint">{ctas.primary.label}</Btn>
        </div>
      </Section>
    </main>
  );
}
