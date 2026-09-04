import { LogoMark } from "@/components/site/logo";
import type { Metadata } from "next";
import { featuredPost, topics, morePosts, ctas } from "@/lib/content";
import { Container, Eyebrow, Card, Btn } from "@/components/site/ui";
import { ChannelFlow } from "@/components/site/channel-flow";

export const metadata: Metadata = {
  title: "Field notes — The cheapest lead you'll ever buy is the one that already called you",
  description: featuredPost.dek,
};

export default function FieldNotesPage() {
  return (
    <main className="pb-20 pt-14 lg:pt-16">
      <Container narrow>
        <article>
          <Eyebrow>{featuredPost.kicker}</Eyebrow>
          <h1 className="mt-[14px] text-[clamp(32px,4vw,50px)]">{featuredPost.title}</h1>
          <p className="mt-[18px] text-[19px] text-ink-2">{featuredPost.dek}</p>
          <div className="mt-6 flex items-center gap-[11px] border-y border-line py-[14px]">
            <span className="grid h-[34px] w-[34px] place-items-center rounded-full bg-brand-soft"><LogoMark size={22} /></span>
            <span className="text-[14px] font-semibold">The Kaboota team</span>
            <span className="flex-1" />
            <span className="font-mono text-[11px] text-ink-3">SHARE</span>
          </div>
          <div className="mt-[26px] overflow-hidden rounded-2xl border border-line bg-paper shadow-2 p-4">
            <ChannelFlow className="w-full" />
          </div>
          <p className="mt-2 font-mono text-[11px] text-ink-3">{featuredPost.caption}</p>

          <div className="mt-[34px] flex flex-col gap-5">
            <p className="text-[17.5px] leading-[1.62]">{featuredPost.body[0]}</p>
            <h2 className="mt-[14px] text-[28px]">Missed isn&apos;t the only leak</h2>
            <p className="text-[17.5px] leading-[1.62]">{featuredPost.body[1]}</p>
            <blockquote className="m-0 rounded-2xl border border-line bg-paper px-[26px] py-[22px] shadow-1">
              <p className="font-display text-[22px] font-semibold leading-[1.35] tracking-[-0.02em]">{featuredPost.pull}</p>
            </blockquote>
            <p className="text-[17.5px] leading-[1.62]">{featuredPost.body[2]}</p>
            <h2 className="mt-[14px] text-[28px]">What to measure on Monday</h2>
            <p className="text-[17.5px] leading-[1.62]">{featuredPost.body[3]}</p>
          </div>

          <div className="dark-panel mt-10 flex flex-wrap items-center gap-5 rounded-2xl p-[26px]">
            <div className="min-w-[260px] flex-1">
              <h3 className="text-[23px] text-white">Want your three numbers?</h3>
              <p className="mt-[7px] text-[15px] text-white/85">Forward your line for two weeks. We&apos;ll hand you the week your phone actually had.</p>
            </div>
            <Btn href={ctas.primary.href} variant="mint">{ctas.primary.label}</Btn>
          </div>
        </article>

        <div className="mt-[52px]">
          <Eyebrow>What we write about</Eyebrow>
          <h2 className="mt-[10px] max-w-[26ch] text-[clamp(26px,3.2vw,38px)]">Six things we keep running into</h2>
          <div className="mt-[22px] grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((t) => (
              <Card key={t.k} className="flex flex-col gap-[7px]">
                <span className="kb-label-sm text-brand-txt">{t.k}</span>
                <p className="text-[13.5px] text-ink-2">{t.d}</p>
              </Card>
            ))}
          </div>
        </div>

        <h3 className="mt-12 text-[20px]">More field notes</h3>
        <div className="mt-[14px] grid grid-cols-1 gap-[14px] sm:grid-cols-2">
          {morePosts.map((m) => (
            <Card key={m.title} className="p-5">
              <span className="kb-label-sm text-ink-3">{m.kicker}</span>
              <h4 className="mt-2 text-[17px]">{m.title}</h4>
            </Card>
          ))}
        </div>
      </Container>
    </main>
  );
}
