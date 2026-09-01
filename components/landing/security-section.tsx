"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Shield, Lock, Eye, FileCheck } from "lucide-react";
import { trust } from "@/lib/content";

const icons = [Lock, Shield, Eye, FileCheck];
const securityFeatures = [trust.items[1], trust.items[2], trust.items[4], trust.items[5]].map((t, i) => ({ ...t, icon: icons[i] }));

export function SecuritySection() {
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
    <section id="trust" ref={sectionRef} className="relative py-24 lg:py-32 bg-paper-2 border-y border-line overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 kb-label mb-6">
              <span className="w-8 h-px bg-line-2" />
              Trust
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              Recording calls is serious.
              <br />
              <span className="text-brand-dk">We treat it that way.</span>
            </h2>
            <p className="text-xl text-ink-2 leading-relaxed mb-12">{trust.sub}</p>

            <div className="flex flex-wrap gap-3">
              {[...trust.chips, "AES-256-GCM KEYS", "311 TESTS · 25 SUITES"].map((cert, index) => (
                <span
                  key={cert}
                  className={`px-[10px] py-[5px] rounded-lg border border-line bg-chip font-mono text-[10.5px] text-ink-2 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  {cert}
                </span>
              ))}
            </div>
            <Link href="/security" className="inline-block mt-8 text-sm font-bold text-brand-dk hover:text-brand">
              The boring answers, written down →
            </Link>
          </div>

          <div className="grid gap-4">
            {securityFeatures.map((feature, index) => (
              <div
                key={feature.h}
                className={`p-6 rounded-2xl border border-line bg-paper shadow-1 hover:border-brand-line hover:shadow-2 transition-all duration-500 group ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-[11px] bg-brand-soft text-brand-txt group-hover:bg-brand group-hover:text-white transition-colors duration-300">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display mb-1 group-hover:translate-x-1 transition-transform duration-300">{feature.h}</h3>
                    <p className="text-ink-2">{feature.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
