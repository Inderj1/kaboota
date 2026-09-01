"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { modes, pipelineIntro, suite } from "@/lib/content";

type Feature = { number: string; title: string; kicker: string; badge: string; description: string; bullets: string[]; visual: string; href: string };

// Kaboota's four layers: two deployment postures, the decision layer, and everything around the call.
const features: Feature[] = [
  {
    number: "01",
    title: modes.listen.title,
    kicker: "Deployment model · Assistive",
    badge: "NO NEW HARDWARE",
    description: modes.listen.sub,
    bullets: modes.listen.bullets.slice(0, 4).map((b) => b.h),
    visual: "collab",
    href: "/product#modes",
  },
  {
    number: "02",
    title: modes.ai.title,
    kicker: "Deployment model · Executing",
    badge: "6 LIVE TOOLS",
    description: modes.ai.sub,
    bullets: modes.ai.bullets.slice(0, 4).map((b) => b.h),
    visual: "deploy",
    href: "/product#modes",
  },
  {
    number: "03",
    title: "The decision layer",
    kicker: "Thirteen steps · Understand → Decide → Execute → Learn",
    badge: "EVIDENCE-LINKED",
    description: pipelineIntro.sub,
    bullets: ["Extract structured fields, each tied to what was said", "Enrich with CRM, equipment, warranty and margin", "Recommend the next-best action with the reasoning shown", "Capture what the job earned and learn from it"],
    visual: "ai",
    href: "/product#decision-layer",
  },
  {
    number: "04",
    title: "Around the call",
    kicker: "The conversation is the start, not the product",
    badge: "ABOVE YOUR CRM",
    description: "Answering is table stakes. What makes the week is everything that happens in the four days after — and that's in the box too.",
    bullets: suite.map((s) => `${s.h} — ${s.k.toLowerCase()}`),
    visual: "security",
    href: "/product#around-the-call",
  },
];

function DeployVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <defs>
        <clipPath id="deployClip">
          <rect x="30" y="20" width="140" height="120" rx="12" />
        </clipPath>
      </defs>
      <rect x="30" y="20" width="140" height="120" rx="12" fill="none" stroke="currentColor" strokeWidth="2" />
      {/* Live call waveform */}
      <g clipPath="url(#deployClip)">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x="40" y={35 + i * 16} width="120" height="10" rx="5" fill="currentColor" opacity="0.15">
            <animate attributeName="opacity" values="0.15;0.8;0.15" dur="2s" begin={`${i * 0.15}s`} repeatCount="indefinite" />
            <animate attributeName="width" values="20;120;20" dur="2s" begin={`${i * 0.15}s`} repeatCount="indefinite" />
          </rect>
        ))}
      </g>
      <circle cx="100" cy="155" r="3" fill="currentColor" opacity="0.3">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function AIVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* The record at the centre; CRM, calendar, dispatch, margin around it */}
      <circle cx="100" cy="80" r="12" fill="currentColor">
        <animate attributeName="r" values="12;14;12" dur="2s" repeatCount="indefinite" />
      </circle>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i * 60) * (Math.PI / 180);
        const radius = 50;
        // Rounded so server and client render identical attribute strings (avoids hydration mismatch)
        const px = +(100 + Math.cos(angle) * radius).toFixed(2);
        const py = +(80 + Math.sin(angle) * radius).toFixed(2);
        return (
          <g key={i}>
            <line x1="100" y1="80" x2={px} y2={py} stroke="currentColor" strokeWidth="1" opacity="0.3">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </line>
            <circle cx={px} cy={py} r="6" fill="none" stroke="currentColor" strokeWidth="2">
              <animate attributeName="r" values="6;8;6" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          </g>
        );
      })}
      <circle cx="100" cy="80" r="30" fill="none" stroke="currentColor" strokeWidth="1" opacity="0">
        <animate attributeName="r" values="20;60" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function CollabVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Your person on the call, Kaboota underneath it */}
      <g>
        <rect x="30" y="50" width="50" height="60" rx="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="55" y="85" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="currentColor">YOU</text>
        <circle cx="55" cy="35" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
      </g>
      <g>
        <rect x="120" y="50" width="50" height="60" rx="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="145" y="85" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="currentColor">CRM</text>
        <circle cx="145" cy="35" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
      </g>
      <line x1="80" y1="80" x2="120" y2="80" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4">
        <animate attributeName="stroke-dashoffset" values="0;-8" dur="0.5s" repeatCount="indefinite" />
      </line>
      <circle r="4" fill="currentColor">
        <animateMotion dur="1.5s" repeatCount="indefinite">
          <mpath href="#dataPath" />
        </animateMotion>
      </circle>
      <path id="dataPath" d="M 80 80 L 120 80" fill="none" />
      <g transform="translate(100, 130)">
        <circle r="6" fill="none" stroke="currentColor" strokeWidth="2">
          <animate attributeName="r" values="6;10;6" dur="1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

function SecurityVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Guardrails around the workflow */}
      <path d="M 100 20 L 150 40 L 150 90 Q 150 130 100 145 Q 50 130 50 90 L 50 40 Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M 100 35 L 135 50 L 135 85 Q 135 115 100 128 Q 65 115 65 85 L 65 50 Z" fill="currentColor" opacity="0.1">
        <animate attributeName="opacity" values="0.1;0.2;0.1" dur="2s" repeatCount="indefinite" />
      </path>
      <rect x="85" y="70" width="30" height="25" rx="6" fill="currentColor" />
      <path d="M 90 70 L 90 60 Q 90 50 100 50 Q 110 50 110 60 L 110 70" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="100" cy="80" r="4" fill="#fffdf9" />
      <rect x="98" y="82" width="4" height="8" fill="#fffdf9" />
      <line x1="60" y1="60" x2="140" y2="60" stroke="currentColor" strokeWidth="1" opacity="0">
        <animate attributeName="y1" values="40;120;40" dur="3s" repeatCount="indefinite" />
        <animate attributeName="y2" values="40;120;40" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0.5;0" dur="3s" repeatCount="indefinite" />
      </line>
    </svg>
  );
}

function AnimatedVisual({ type }: { type: string }) {
  switch (type) {
    case "deploy":
      return <DeployVisual />;
    case "ai":
      return <AIVisual />;
    case "collab":
      return <CollabVisual />;
    case "security":
      return <SecurityVisual />;
    default:
      return <DeployVisual />;
  }
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 py-12 lg:py-20 border-b border-line">
        <div className="shrink-0">
          <span className="font-mono text-sm text-ink-3">{feature.number}</span>
        </div>

        <div className="flex-1 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="font-mono text-[10px] tracking-[.1em] uppercase text-brand-txt">{feature.kicker}</span>
              <span className="kb-label-sm rounded-[5px] bg-brand-soft px-[7px] py-[3px] !text-[9px] text-brand-txt">{feature.badge}</span>
            </div>
            <h3 className="text-3xl lg:text-4xl font-display mb-4 group-hover:translate-x-2 transition-transform duration-500">
              {feature.title}
            </h3>
            <p className="text-lg text-ink-2 leading-relaxed">{feature.description}</p>
            <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-2 text-[14px] text-ink-2">
              {feature.bullets.map((b) => (
                <li key={b} className="flex gap-2"><span className="text-brand">·</span>{b}</li>
              ))}
            </ul>
            <Link href={feature.href} className="inline-block mt-5 text-sm font-bold text-brand-dk hover:text-brand">
              See how it works →
            </Link>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-56 h-44 p-4 rounded-2xl bg-paper border border-line shadow-1 text-brand-dk group-hover:shadow-2 transition-shadow duration-500">
              <AnimatedVisual type={feature.visual} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section id="features" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 kb-label mb-6">
            <span className="w-8 h-px bg-line-2" />
            01 · Deployment model
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Beside your people,
            <br />
            <span className="text-ink-3">or running on its own.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-ink-2">{modes.onePlatform}</p>
        </div>

        <div>
          {features.map((feature, index) => (
            <FeatureCard key={feature.number} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
