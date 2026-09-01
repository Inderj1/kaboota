"use client";

import { useEffect, useState, useRef } from "react";
import { kpis, kpiCaveat, digest } from "@/lib/content";

function AnimatedCounter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <div ref={ref} className="text-6xl lg:text-8xl font-display font-bold tracking-[-0.03em]">
      {prefix}{count.toLocaleString("en-US")}{suffix}
    </div>
  );
}

export function MetricsSection() {
  const [time, setTime] = useState<Date | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="revenue-board" ref={sectionRef} className="relative py-24 lg:py-32 border-y border-line">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 lg:mb-24">
          <div>
            <span className="inline-flex items-center gap-3 kb-label mb-6">
              <span className="w-8 h-px bg-line-2" />
              07 · The revenue board
            </span>
            <h2
              className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Recovered this week.
              <br />
              <span className="text-ink-3">Numbers big enough to read across a busy office.</span>
            </h2>
          </div>
          <div className="flex items-center gap-4 font-mono text-sm text-ink-2">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse-ring" />
              Live
            </span>
            <span className="text-line-2">|</span>
            <span suppressHydrationWarning>{time ? time.toLocaleTimeString() : "--:--:--"}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line rounded-2xl overflow-hidden border border-line shadow-1">
          {kpis.map((metric, index) => (
            <div
              key={metric.label}
              className={`bg-paper p-8 lg:p-12 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <AnimatedCounter end={metric.target} suffix={metric.suffix} prefix={metric.prefix} />
              <div className="mt-4 text-lg text-ink-2">{metric.label}</div>
              <div className="mt-2 font-mono text-[10px] tracking-[.1em] uppercase text-brand-txt">{metric.delta}</div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[13px] italic text-ink-3">{kpiCaveat}</p>

        {/* 08 · Monday morning */}
        <div className="mt-20">
          <span className="kb-label block">08 · Monday morning</span>
          <h3 className="mt-3 max-w-[24ch] text-3xl lg:text-4xl font-display">{digest.h2}</h3>
          <p className="mt-3 max-w-2xl text-ink-2">{digest.sub}</p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {digest.items.map((g) => (
              <div key={g.n} className="rounded-2xl border border-line bg-paper p-6 shadow-1">
                <span className="font-mono text-[22px] text-line-2">{g.n}</span>
                <h4 className="mt-2 text-[17px] font-display">{g.h}</h4>
                <p className="mt-2 text-[13.5px] text-ink-2">{g.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
