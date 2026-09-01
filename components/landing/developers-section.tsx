"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Copy, Check } from "lucide-react";
import { tools, guardrails, whisper } from "@/lib/content";

// An operator with tools, guardrails and a chain of command — you never write a prompt.
const codeExamples = [
  {
    label: "Tools",
    code: `# six live tools, called as facts come out\n${tools.map((t) => `${t.name.padEnd(22)} ${t.what.split(".")[0].split(":")[0].slice(0, 44)}`).join("\n")}`,
  },
  {
    label: "Guardrails",
    code: `# plain-language settings, compiled on save\n${guardrails.quotes.map((q) => `- "${q}"`).join("\n")}\n\n# ${guardrails.note}`,
  },
  {
    label: "Whisper",
    code: `# ${whisper.h.toLowerCase()}\n10:42:24  you   → "offer the maintenance plan"\n10:42:26  sam   ✓ worked in within two seconds\n10:42:40  you   → "we're booked Friday"\n10:42:41  sam   ✓ offered Monday 8:00 instead\n\n# guidance expires when the call ends`,
  },
];

const features = [
  { title: "You never write a prompt.", description: "Company, hours, services, service area, what to escalate, what to never say — compiled into the agent every time you hit save." },
  { title: "Whisper mid-call.", description: whisper.d.split(". ")[1] ?? whisper.d },
  { title: "Addresses verified first.", description: guardrails.note },
  { title: "Multi-tenant to the bone.", description: "Your whole experience is five settings deep — package, tier, agent, business, number — so one system runs a quiet listen-only pilot and a full AI front desk." },
];

const codeAnimationStyles = `
  .dev-code-line { opacity: 0; transform: translateX(-8px); animation: devLineReveal 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
  @keyframes devLineReveal { to { opacity: 1; transform: translateX(0); } }
  .dev-code-char { opacity: 0; filter: blur(8px); animation: devCharReveal 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
  @keyframes devCharReveal { to { opacity: 1; filter: blur(0); } }
`;

export function DevelopersSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
    <section id="operator" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: codeAnimationStyles }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 kb-label mb-6">
              <span className="w-8 h-px bg-line-2" />
              Product · The operator
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              Tools, guardrails,
              <br />
              <span className="text-ink-3">and a chain of command.</span>
            </h2>
            <p className="text-xl text-ink-2 mb-12 leading-relaxed">
              You edit plain-language settings. Kaboota compiles that into the agent every time you hit save — with six live tools it may use, the things it must never say, and L1→L2→L3 escalation with the context carried over.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  <h3 className="font-display text-[17px] mb-1">{feature.title}</h3>
                  <p className="text-sm text-ink-2">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`lg:sticky lg:top-32 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="rounded-2xl border border-line bg-paper shadow-2 overflow-hidden">
              <div className="flex items-center border-b border-line bg-paper-2">
                {codeExamples.map((example, idx) => (
                  <button
                    key={example.label}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`px-6 py-4 text-sm font-mono transition-colors relative ${
                      activeTab === idx ? "text-brand-txt" : "text-ink-3 hover:text-ink"
                    }`}
                  >
                    {example.label}
                    {activeTab === idx && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand" />}
                  </button>
                ))}
                <div className="flex-1" />
                <button type="button" onClick={handleCopy} className="px-4 py-4 text-ink-3 hover:text-ink transition-colors" aria-label="Copy">
                  {copied ? <Check className="w-4 h-4 text-brand" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-8 font-mono text-[13px] min-h-[220px] overflow-x-auto">
                <pre className="text-ink/80">
                  {codeExamples[activeTab].code.split("\n").map((line, lineIndex) => (
                    <div
                      key={`${activeTab}-${lineIndex}`}
                      className="leading-loose dev-code-line"
                      style={{ animationDelay: `${lineIndex * 80}ms` }}
                    >
                      <span className="inline-flex">
                        {line.split("").map((char, charIndex) => (
                          <span
                            key={`${activeTab}-${lineIndex}-${charIndex}`}
                            className={`dev-code-char ${line.startsWith("#") ? "text-brand-txt" : ""}`}
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
            </div>

            <div className="mt-6 flex items-center gap-6 text-sm">
              <Link href="/product" className="font-bold text-brand-dk hover:text-brand">
                Every tool, on a live call
              </Link>
              <span className="text-line-2">|</span>
              <Link href="/security" className="text-ink-2 hover:text-ink">
                Recording, consent and keys
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
