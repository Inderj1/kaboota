"use client";

import { useEffect, useState } from "react";
import { AnimatedGlobe } from "./animated-globe";
import { hero, kpis, ctas } from "@/lib/content";
import { Btn } from "@/components/site/ui";
import { Check } from "lucide-react";

// "Every conversation should end in the right action." — one door at a time.
// Same length on purpose, so the headline never reflows when the word changes.
const words = ["call", "text", "chat"];

const stats = kpis.map((k) => ({
  value: `${k.prefix}${k.target.toLocaleString("en-US")}${k.suffix}`,
  label: k.label,
  delta: k.delta,
}));

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 3600);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-6 pb-4 lg:pt-4 lg:pb-6 w-full">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-10 lg:gap-8 items-center lg:items-start">
          {/* Left: copy — top-aligned with the globe's visible edge on desktop */}
          <div className="lg:pt-8">
            <div
              className={`mb-6 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft py-[6px] pl-2 pr-3 font-mono text-[11px] uppercase tracking-[.09em] text-brand-txt">
                <span className="w-[6px] h-[6px] rounded-full bg-brand animate-pulse-ring" />
                {hero.eyebrow}
              </span>
            </div>

            <h1
              className={`text-[clamp(2.25rem,4.9vw,4.5rem)] font-display font-bold leading-[1.02] tracking-tight transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="block">
                Every{" "}
                <span className="relative inline-grid align-baseline">
                  {/* invisible sizer keeps the slot the same width for every word */}
                  <span className="invisible col-start-1 row-start-1" aria-hidden>
                    {words.reduce((a, b) => (b.length > a.length ? b : a))}
                  </span>
                  <span key={wordIndex} className="col-start-1 row-start-1 inline-flex whitespace-nowrap">
                    {words[wordIndex].split("").map((char, i) => (
                      <span
                        key={`${wordIndex}-${i}`}
                        className="inline-block animate-char-in"
                        style={{ animationDelay: `${i * 45}ms` }}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                </span>
              </span>
              <span className="block">should end in the</span>
              <span className="block">
                <span className="relative inline-block text-brand-dk">
                  right action.
                  <span className="absolute -bottom-2 left-0 right-0 h-3 bg-brand/15 rounded-sm" />
                </span>
              </span>
            </h1>

            <p
              className={`mt-5 text-[17px] lg:text-lg text-ink-2 leading-relaxed max-w-[52ch] transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {hero.sub}
            </p>

            <div
              className={`mt-6 flex flex-wrap items-center gap-3 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Btn href={ctas.primary.href} size="lg">{ctas.primary.label}</Btn>
              <Btn href={ctas.secondary.href} variant="secondary" size="lg">{ctas.secondary.label}</Btn>
            </div>

            <ul
              className={`mt-5 flex flex-wrap gap-x-6 gap-y-[8px] transition-all duration-700 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {hero.checks.map((c) => (
                <li key={c} className="flex items-center gap-[8px] whitespace-nowrap text-[14px] font-semibold text-ink-2">
                  <span className="grid h-[18px] w-[18px] flex-shrink-0 place-items-center rounded-full bg-brand-soft text-brand-txt">
                    <Check className="h-[11px] w-[11px]" strokeWidth={3} />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: call-centre globe — channels pulsing on the surface, arcs routing to one pipeline */}
          <div
            className={`relative mx-auto lg:mx-0 lg:ml-auto w-full max-w-[520px] aspect-[100/112] lg:max-w-[640px] transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <AnimatedGlobe />
          </div>
        </div>
      </div>

      {/* Revenue board strip — one week at a mechanical-services pilot, always fully in view */}
      <div
        className={`relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 w-full pt-6 lg:pt-8 pb-16 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-5 pt-2">
          <span className="kb-label">Recovered this week</span>
          <span className="hidden sm:block h-px flex-1 bg-line" />
          <span className="font-mono text-[10px] tracking-[.1em] uppercase text-brand-txt">Measured · one week · mechanical-services pilot</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 sm:gap-x-8 gap-y-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
              <span className="text-[2rem] sm:text-4xl lg:text-5xl font-display font-bold tracking-[-0.03em] leading-none">{stat.value}</span>
              <span className="text-sm text-ink-2">
                {stat.label}
                <span className="block whitespace-nowrap font-mono text-[10px] tracking-[.1em] text-brand-txt mt-1 uppercase">{stat.delta}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
