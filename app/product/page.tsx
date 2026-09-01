import type { Metadata } from "next";
import { product, tools, whisper, guardrails, objects, catalog, stack, sectors, evidence, modes, pipeline, pipelineIntro, suite, desks, screens, digest, costs, ctas } from "@/lib/content";
import { Section, Eyebrow, PageHead, SectionHead, Card, DarkPanel, DarkTile, StatusChip, Btn, CheckRow, MonoChip, Pill } from "@/components/site/ui";
import { RevealGrid } from "@/components/site/reveal";

export const metadata: Metadata = {
  title: "Product — An operator with tools, guardrails, and a chain of command",
  description: product.sub,
};

export default function ProductPage() {
  return (
    <main className="pb-20 pt-14 lg:pt-16">
      <Section>
        <PageHead eyebrow="Product" title={product.h1} sub={product.sub} />

        {/* Tools table */}
        <div className="mt-9 overflow-x-auto rounded-2xl border border-line bg-paper shadow-1">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr className="border-b border-line bg-paper-2">
                <th className="kb-label-sm px-5 py-[13px] text-left font-normal text-ink-3">Tool</th>
                <th className="kb-label-sm px-5 py-[13px] text-left font-normal text-ink-3">What it does on a live call</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((t) => (
                <tr key={t.name} className="border-b border-line last:border-b-0">
                  <td className="whitespace-nowrap px-5 py-4 align-top font-mono text-[13px] text-brand-txt">{t.name}</td>
                  <td className="px-5 py-4 align-top text-[14.5px] text-ink-2">{t.what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-[22px] grid grid-cols-1 gap-[18px] lg:grid-cols-2">
          <DarkPanel className="p-6">
            <Eyebrow tone="mint" className="!text-[10px]">Human in the loop</Eyebrow>
            <h3 className="mt-[10px] text-[24px] text-white">{whisper.h}</h3>
            <p className="mt-[10px] text-[15.5px] text-white/85">{whisper.d}</p>
          </DarkPanel>
          <Card className="p-6">
            <Eyebrow className="!text-[10px]">Guardrails you can read</Eyebrow>
            <div className="mt-3 flex flex-col gap-[9px]">
              {guardrails.quotes.map((q) => (
                <p key={q} className="text-[15px] italic">&ldquo;{q}&rdquo;</p>
              ))}
            </div>
            <p className="mt-[14px] text-[13.5px] text-ink-3">{guardrails.note}</p>
          </Card>
        </div>

        {/* Modes */}
        <div id="modes" className="mt-16 scroll-mt-24">
          <SectionHead eyebrow="Deployment model" title="Beside your people, or running on its own." sub={modes.onePlatform} />
          <div className="mt-8 grid grid-cols-1 gap-[18px] lg:grid-cols-2">
            {[modes.listen, modes.ai].map((m) => (
              <Card key={m.title} className="flex flex-col p-[30px] shadow-2">
                <div className="flex items-center gap-[10px]">
                  <h3 className="text-[27px]">{m.title}</h3>
                  <span className={`kb-label-sm rounded-full px-[9px] py-1 ${m.badge === "Executing" ? "bg-brand-soft text-brand-txt" : "bg-amber-soft text-amber-txt"}`}>{m.badge}</span>
                </div>
                <p className="mt-3 text-[16px] text-ink-2">{m.sub}</p>
                <div className="mt-[22px] flex flex-col gap-[14px]">
                  {m.bullets.map((b) => (
                    <CheckRow key={b.h} h={b.h} d={b.d} />
                  ))}
                </div>
                <div className="mt-auto flex flex-wrap gap-[7px] pt-6">
                  {m.chips.map((c) => (
                    <MonoChip key={c}>{c}</MonoChip>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Decision layer */}
        <div id="decision-layer" className="mt-16 scroll-mt-24">
          <SectionHead eyebrow="The decision layer" title={pipelineIntro.h2} sub={pipelineIntro.sub} titleClass="max-w-[22ch]" />
          <RevealGrid className="mt-[22px] grid grid-cols-1 gap-[10px] sm:grid-cols-2 xl:grid-cols-4">
            {pipeline.map((p) => (
              <div key={p.n} data-pipe className="flex min-h-[150px] flex-col gap-[7px] rounded-2xl border border-line bg-paper px-4 py-[18px]" style={{ opacity: 0.32, transform: "translateY(14px)", transition: "opacity .5s ease, transform .5s cubic-bezier(.2,.8,.2,1), border-color .5s, box-shadow .5s" }}>
                <div className="flex items-center gap-2">
                  <span data-pipedot className="h-[9px] w-[9px] flex-shrink-0 rounded-full bg-line-2" style={{ transition: "background .4s, box-shadow .4s" }} />
                  <span className="font-mono text-[10px] text-ink-3">{p.n}</span>
                  <span className="kb-label-sm ml-auto !text-[9px] text-brand-txt">{p.phase}</span>
                </div>
                <h4 className="text-[15.5px] leading-[1.2]">{p.h}</h4>
                <p className="text-[13px] text-ink-2">{p.d}</p>
              </div>
            ))}
            <div className="dark-panel-steep flex flex-col justify-center gap-2 rounded-2xl px-[18px] py-5">
              <Eyebrow tone="mint" className="!text-[9.5px]">And then it closes the loop</Eyebrow>
              <p className="text-[15px] text-white/90">{pipelineIntro.loop}</p>
            </div>
          </RevealGrid>
          <div className="mt-[22px] grid grid-cols-1 gap-[18px] lg:grid-cols-2">
            <Card tone="paper-2" className="p-[22px]">
              <Eyebrow tone="brand" className="!text-[10px]">{pipelineIntro.evidence.h}</Eyebrow>
              <p className="mt-2 text-[15px] text-ink-2">{pipelineIntro.evidence.d}</p>
              <p className="mt-[10px] text-[15px] italic">&ldquo;{pipelineIntro.evidence.quote}&rdquo;</p>
              <div className="mt-[10px] flex flex-wrap gap-[6px]">
                <span className="rounded-[7px] bg-red-soft px-2 py-1 font-mono text-[10px] text-red-txt">{pipelineIntro.evidence.chips[0]}</span>
                <span className="rounded-[7px] bg-chip px-2 py-1 font-mono text-[10px] text-ink-2">{pipelineIntro.evidence.chips[1]}</span>
              </div>
            </Card>
            <Card tone="paper-2" className="p-[22px]">
              <Eyebrow tone="brand" className="!text-[10px]">{pipelineIntro.scoring.h}</Eyebrow>
              <p className="mt-2 text-[15px] text-ink-2">{pipelineIntro.scoring.d}</p>
              <div className="mt-3 flex flex-wrap gap-[7px]">
                <Pill tone="brand">Booked</Pill>
                <Pill tone="red">Emergency</Pill>
                <Pill tone="amber">Callback</Pill>
                <Pill tone="blue">Existing customer</Pill>
                <Pill tone="red">Lost</Pill>
                <Pill tone="neutral">Spam</Pill>
              </div>
            </Card>
          </div>
        </div>

        {/* Around the call + desks */}
        <div id="around-the-call" className="mt-16 scroll-mt-24">
          <SectionHead eyebrow="Around the call" title="The conversation is the start, not the product" sub="Answering is table stakes. What makes the week is everything that happens in the four days after — and that's in the box too." titleClass="max-w-[24ch]" />
          <div className="mt-[26px] grid grid-cols-1 gap-[14px] md:grid-cols-2 xl:grid-cols-4">
            {suite.map((x) => (
              <Card key={x.k} className="flex flex-col gap-2 p-[22px]">
                <span className="kb-label-sm text-brand-txt">{x.k}</span>
                <h4 className="text-[18px]">{x.h}</h4>
                <p className="text-[14px] text-ink-2">{x.d}</p>
              </Card>
            ))}
          </div>
          <div className="mt-10">
            <SectionHead eyebrow="The right desk" title={desks.h2} sub={desks.sub} titleClass="max-w-[26ch]" />
            <div className="mt-[26px] grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {desks.items.map((d) => (
                <Card key={d.k} className="flex flex-col gap-[7px]">
                  <span className="kb-label-sm text-brand-txt">{d.k}</span>
                  <h4 className="text-[16px]">{d.h}</h4>
                  <p className="text-[13px] text-ink-2">{d.d}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard */}
        <div id="dashboard" className="mt-16 scroll-mt-24">
          <SectionHead eyebrow="The dashboard" title="Eight screens. Every one earns its place." sub="Warm cream, one green that always means revenue, and numbers big enough to read across a busy office. Built by hand — no template admin, no icon library." titleClass="max-w-[24ch]" />
          <div className="mt-[22px] flex flex-wrap gap-2">
            {screens.map((s) => (
              <span key={s} className="rounded-full border border-line bg-paper px-[13px] py-[7px] text-[13px] font-semibold shadow-1">{s}</span>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-1 gap-[14px] md:grid-cols-2 xl:grid-cols-4">
            {digest.items.map((g) => (
              <Card key={g.n} className="flex flex-col gap-2 p-[22px]">
                <span className="font-mono text-[22px] text-line-2">{g.n}</span>
                <h4 className="text-[17px]">{g.h}</h4>
                <p className="text-[13.5px] text-ink-2">{g.d}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Margin engine */}
        <div className="mt-16">
          <SectionHead eyebrow="The margin engine" title={costs.h2} sub={costs.sub} titleClass="max-w-[22ch]" />
          <div className="mt-[26px] overflow-x-auto rounded-2xl border border-line bg-paper shadow-1">
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
          <div className="mt-[18px] grid grid-cols-1 gap-4 md:grid-cols-3">
            {costs.cards.map((c) => (
              <Card key={c.h} tone={c.brand ? "brand" : "paper"} className="p-5">
                <h4 className={`text-[16px] ${c.brand ? "text-brand-txt" : ""}`}>{c.h}</h4>
                <p className={`mt-2 text-[14px] ${c.brand ? "text-brand-txt" : "text-ink-2"}`}>{c.d}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Multi-tenant */}
        <div className="mt-16">
          <h2 className="text-[clamp(26px,3vw,36px)]">Multi-tenant to the bone</h2>
          <p className="mt-3 max-w-[60ch] text-[16.5px] text-ink-2">Your whole experience is five settings deep. That's why one system runs a quiet listen-only pilot and a full AI front desk without anyone rebuilding anything.</p>
          <div className="mt-[22px] grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {objects.map((o) => (
              <Card key={o.n} className="p-[18px]">
                <span className="kb-label-sm text-brand-txt">{o.n}</span>
                <h4 className="mt-2 text-[16px]">{o.h}</h4>
                <p className="mt-[6px] text-[13.5px] text-ink-2">{o.d}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Catalog */}
        <div id="catalog" className="mt-16 scroll-mt-24">
          <SectionHead eyebrow="What you sell" title={catalog.h2} sub={catalog.sub} titleClass="max-w-[24ch]" />
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {catalog.items.map((c) => (
              <Card key={c.h} className="p-[22px]">
                <h4 className="mb-[6px] text-[17px]">{c.h}</h4>
                <p className="text-[13.5px] text-ink-2">{c.d}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Stack */}
        <div id="integrations" className="mt-16 scroll-mt-24">
          <SectionHead eyebrow="What it plugs into" title="Keep the systems you run. We sit above them." sub="Nothing here is a logo wall. Each row says what state it is actually in, and a row that says coming means it is not shipped." titleClass="max-w-[26ch]" />
          <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-paper shadow-1">
            <table className="w-full min-w-[720px] border-collapse">
              <thead>
                <tr className="border-b border-line bg-paper-2">
                  {["Layer", "What connects", "Status"].map((h) => (
                    <th key={h} className="kb-label-sm px-5 py-[13px] text-left font-normal text-ink-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stack.map((s) => (
                  <tr key={s.k} className="border-b border-line last:border-b-0">
                    <td className="whitespace-nowrap px-5 py-4 align-top text-[14.5px] font-bold">{s.k}</td>
                    <td className="px-5 py-4 align-top text-[14.5px] text-ink-2">{s.d}</td>
                    <td className="px-5 py-4 align-top"><StatusChip status={s.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Where it runs */}
        <div id="where-it-runs" className="mt-16 scroll-mt-24">
          <SectionHead eyebrow="Where it runs" title="Proven in the trades. Not limited to them." sub="Nothing in the pipeline is trade-specific. A showroom, a service counter and a dispatch desk are the same problem wearing different vocabulary — a conversation that has to end in the right action, booked against real availability." titleClass="max-w-[26ch]" />
          <div className="mt-6 grid grid-cols-1 gap-[14px] sm:grid-cols-2 xl:grid-cols-4">
            {sectors.map((s) => (
              <Card key={s.k} className="flex flex-col gap-2">
                <StatusChip status={s.status} className="self-start" />
                <h4 className="text-[16.5px]">{s.k}</h4>
                <p className="text-[13px] text-ink-2">{s.d}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* How we report */}
        <div id="how-we-report" className="scroll-mt-24" />
        <DarkPanel className="mt-16 p-7 sm:p-8">
          <Eyebrow tone="mint" className="!text-[10px]">How we report</Eyebrow>
          <h2 className="mt-[10px] max-w-[26ch] text-[clamp(26px,3vw,36px)] text-white">A number without a window is a decoration</h2>
          <div className="mt-[22px] grid grid-cols-1 gap-4 md:grid-cols-2">
            {evidence.map((e) => (
              <DarkTile key={e.h} h={e.h} d={e.d} />
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Btn href={ctas.primary.href} variant="mint">{ctas.primary.label}</Btn>
            <Btn href={ctas.secondary.href} variant="onDark">{ctas.secondary.label}</Btn>
          </div>
        </DarkPanel>
      </Section>
    </main>
  );
}
