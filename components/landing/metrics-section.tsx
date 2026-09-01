"use client";

import { useEffect, useState, useRef } from "react";
import { digest } from "@/lib/content";

/** 08 · Monday morning — four answers, not a dashboard to go hunting in. */
export function MetricsSection() {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section id="monday" ref={sectionRef} className="relative py-24 lg:py-32 border-y border-line">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-3 kb-label mb-6">
            <span className="w-8 h-px bg-line-2" />
            08 · Monday morning
          </span>
          <h2
            className={`max-w-[22ch] text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {digest.h2}
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-ink-2">{digest.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {digest.items.map((g, index) => (
            <div
              key={g.n}
              className={`rounded-2xl border border-line bg-paper p-6 shadow-1 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <span className="font-mono text-[22px] text-line-2">{g.n}</span>
              <h4 className="mt-2 text-[17px] font-display">{g.h}</h4>
              <p className="mt-2 text-[13.5px] text-ink-2">{g.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
