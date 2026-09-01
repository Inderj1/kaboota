"use client";

import { useEffect, useRef, useState } from "react";
import { pipeline, pipelineIntro } from "@/lib/content";

// The decision layer: thirteen steps from hello to what it earned, grouped by phase.
const phases = ["Understand", "Decide", "Execute", "Learn"] as const;
const numerals = ["I", "II", "III", "IV"];
const blurbs: Record<(typeof phases)[number], string> = {
  Understand: "Who is calling, from where, about what — and what they didn't say.",
  Decide: "Enrich with your CRM and financials, then recommend the right move with the reasoning shown.",
  Execute: "Book, route, escalate or hold for your sign-off — then write the evidence-linked record back.",
  Learn: "Capture the diagnosis, the invoice and the margin, and get sharper every week.",
};

const steps = phases.map((phase, i) => {
  const items = pipeline.filter((p) => p.phase === phase);
  return {
    number: numerals[i],
    phase,
    range: `Steps ${items[0].n}–${items[items.length - 1].n}`,
    title: phase,
    description: blurbs[phase],
    file: `${phase.toLowerCase()}.pipeline`,
    code: [`# ${phase.toLowerCase()} · steps ${items[0].n}–${items[items.length - 1].n}`, ...items.map((p) => `${p.n}  ${p.h}`)].join("\n"),
  };
});

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="decision-layer"
      ref={sectionRef}
      className="relative py-24 lg:py-32 dark-panel !rounded-none text-white overflow-hidden"
    >
      {/* Diagonal lines pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            currentColor 40px,
            currentColor 41px
          )`
        }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 kb-label !text-mint mb-6">
            <span className="w-8 h-px bg-mint/40" />
            06 · The decision layer
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight text-white transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {pipelineIntro.h2}.
            <br />
            <span className="text-white/50">Most tools stop at step three.</span>
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {["CALL", "CHAT", "SMS"].map((c) => (
              <span key={c} className="rounded-full bg-white/10 px-3 py-[6px] font-mono text-[11px] text-white">{c}</span>
            ))}
            <span className="px-1 py-[6px] font-mono text-[11px] text-white/50">→ one pipeline, whichever door they come in</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Phases */}
          <div className="space-y-0">
            {steps.map((step, index) => (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`w-full text-left py-8 border-b border-white/10 transition-all duration-500 group ${
                  activeStep === index ? "opacity-100" : "opacity-40 hover:opacity-70"
                }`}
              >
                <div className="flex items-start gap-6">
                  <span className="font-display font-bold text-3xl text-mint/60">{step.number}</span>
                  <div className="flex-1">
                    <span className="font-mono text-[10px] tracking-[.12em] uppercase text-mint">{step.range}</span>
                    <h3 className="text-2xl lg:text-3xl font-display text-white mt-1 mb-3 group-hover:translate-x-2 transition-transform duration-300">
                      {step.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">{step.description}</p>
                    {activeStep === index && (
                      <div className="mt-4 h-px bg-white/20 overflow-hidden">
                        <div className="h-full bg-mint w-0" style={{ animation: "progress 5s linear forwards" }} />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
            <p className="pt-6 text-[14px] text-white/60">{pipelineIntro.loop}</p>
          </div>

          {/* Step list, typed out */}
          <div className="lg:sticky lg:top-32 self-start">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden shadow-3">
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-mint/70" />
                </div>
                <span className="text-xs font-mono text-white/40">{steps[activeStep].file}</span>
              </div>

              <div className="p-8 font-mono text-[13px] min-h-[280px] overflow-x-auto">
                <pre className="text-white/75">
                  {steps[activeStep].code.split("\n").map((line, lineIndex) => (
                    <div
                      key={`${activeStep}-${lineIndex}`}
                      className="leading-loose code-line-reveal"
                      style={{ animationDelay: `${lineIndex * 80}ms` }}
                    >
                      <span className="inline-flex">
                        {line.split("").map((char, charIndex) => (
                          <span
                            key={`${activeStep}-${lineIndex}-${charIndex}`}
                            className={`code-char-reveal ${charIndex < 2 ? "text-mint" : ""}`}
                            style={{ animationDelay: `${lineIndex * 80 + charIndex * 6}ms` }}
                          >
                            {char === " " ? " " : char}
                          </span>
                        ))}
                      </span>
                    </div>
                  ))}
                </pre>
              </div>

              <div className="px-6 py-4 border-t border-white/10 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                <span className="text-xs font-mono text-white/40">{activeStep === steps.length - 1 ? "Step 13 feeds step 8" : "Every field tied to what was said"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .code-line-reveal {
          opacity: 0;
          transform: translateX(-8px);
          animation: lineReveal 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes lineReveal {
          to { opacity: 1; transform: translateX(0); }
        }
        .code-char-reveal {
          opacity: 0;
          filter: blur(8px);
          animation: charReveal 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes charReveal {
          to { opacity: 1; filter: blur(0); }
        }
      `}</style>
    </section>
  );
}
