"use client";

import { useEffect, useState, useRef } from "react";
import { StatusChip } from "@/components/site/ui";
import { channels, channelIntro, memory } from "@/lib/content";

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeLocation, setActiveLocation] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLocation((prev) => (prev + 1) % channels.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="channels" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 kb-label mb-6">
              <span className="w-8 h-px bg-line-2" />
              Every channel
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              The phone is the loudest leak,
              <br />
              <span className="text-brand-dk">not the only one.</span>
            </h2>
            <p className="text-xl text-ink-2 leading-relaxed mb-10">{channelIntro.sub}</p>

            {/* 03 · One record */}
            <span className="kb-label-sm block text-ink-3 mb-3">One record — {memory.h2.toLowerCase()}</span>
            <div className="grid sm:grid-cols-2 gap-4">
              {memory.cards.map((m) => (
                <div key={m.h} className="rounded-2xl border border-line bg-paper p-4 shadow-1">
                  <div className="text-[15px] font-display font-bold">{m.h}</div>
                  <div className="mt-1 text-[13px] text-ink-2">{m.d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Channel list */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="rounded-2xl border border-line bg-paper shadow-2 overflow-hidden">
              <div className="px-6 py-4 border-b border-line bg-paper-2 flex items-center justify-between">
                <span className="text-sm font-mono text-ink-3">Wherever it started</span>
                <span className="flex items-center gap-2 text-xs font-mono text-brand-txt">
                  <span className="w-2 h-2 rounded-full bg-brand animate-pulse-ring" />
                  Status stated per channel
                </span>
              </div>
              <div>
                {channels.map((channel, index) => (
                  <div
                    key={channel.k}
                    className={`px-6 py-4 border-b border-line last:border-b-0 flex items-center justify-between gap-4 transition-all duration-300 ${
                      activeLocation === index ? "bg-brand-soft/50" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors duration-300 ${
                          activeLocation === index ? "bg-brand" : "bg-line-2"
                        }`}
                      />
                      <div>
                        <div className="font-semibold">
                          {channel.h} <span className="font-mono text-[10px] uppercase tracking-[.1em] text-brand-txt ml-1">{channel.k}</span>
                        </div>
                        <div className="text-sm text-ink-2">{channel.d}</div>
                      </div>
                    </div>
                    <StatusChip status={channel.status} />
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-3 text-[12.5px] text-ink-3">{channelIntro.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
