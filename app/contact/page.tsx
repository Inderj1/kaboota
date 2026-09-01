import type { Metadata } from "next";
import { contactRoutes, privacyPoints, brand, ctas } from "@/lib/content";
import { Section, PageHead, Eyebrow, Card, Btn } from "@/components/site/ui";
import { SiteForm, Field } from "@/components/site/forms";

export const metadata: Metadata = {
  title: "Contact — A person answers this one too",
  description: "Four inboxes so your question reaches somebody who can end it.",
};

export default function ContactPage() {
  return (
    <main className="pb-20 pt-14 lg:pt-16">
      <Section>
        <PageHead
          eyebrow="Contact"
          title="A person answers this one too"
          sub="Four inboxes so your question reaches somebody who can end it — which is the whole argument we make about your phone, so it would be strange to run ours any other way."
        />
        <div className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-2">
          {contactRoutes.map((c) => (
            <Card key={c.k} className="flex flex-col gap-2 p-6">
              <span className="kb-label-sm text-brand-txt">{c.k}</span>
              <h4 className="text-[18px]">{c.h}</h4>
              <p className="text-[14px] text-ink-2">{c.d}</p>
              <a href={`mailto:${c.to}`} className="mt-1 font-mono text-[13px] text-brand-txt hover:text-brand">{c.to}</a>
            </Card>
          ))}
        </div>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[.1em] text-ink-3">{brand.phone} · {brand.domain}</p>

        <div className="mt-8 grid grid-cols-1 gap-[18px] lg:grid-cols-[1.1fr_.9fr]">
          <SiteForm title="Send us a message" submitLabel="Send message" fallbackEmail={brand.emails.hello}>
            <Field name="name" label="Name" required />
            <Field name="email" label="Email" type="email" required />
            <div className="sm:col-span-2"><Field name="company" label="Company" /></div>
            <div className="sm:col-span-2"><Field name="message" label="Message" required textarea /></div>
          </SiteForm>
          <div className="dark-panel flex flex-col justify-center gap-4 rounded-2xl p-7">
            <h3 className="text-[22px] text-white">Or just forward your line</h3>
            <p className="text-[15px] text-white/85">Two weeks, your own number, listen-only to start. Nothing speaks to a customer until you say it may.</p>
            <div className="flex flex-wrap gap-2">
              <Btn href={ctas.primary.href} variant="mint">{ctas.primary.label}</Btn>
              <Btn href={ctas.secondary.href} variant="onDark">{ctas.secondary.label}</Btn>
            </div>
          </div>
        </div>

        <div id="privacy" className="mt-16 scroll-mt-24">
          <Eyebrow>Privacy, in plain language</Eyebrow>
          <h2 className="mt-3 max-w-[26ch] text-[clamp(28px,3.4vw,42px)]">The short version, before the long one</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {privacyPoints.map((p) => (
              <Card key={p.h} className="px-6 py-[22px]">
                <h4 className="mb-[6px] text-[17px]">{p.h}</h4>
                <p className="text-[14px] text-ink-2">{p.d}</p>
              </Card>
            ))}
          </div>
          <p className="mt-4 max-w-[74ch] text-[13px] text-ink-3">
            This summary is written to be read, not to be defensible. The full policy sits behind it and the two are not allowed to disagree — if they ever do, this one is the promise we intend to keep.
          </p>
        </div>
      </Section>
    </main>
  );
}
