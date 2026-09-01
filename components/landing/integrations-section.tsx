"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

// What Kaboota sits on top of — and the infrastructure behind it. Status per layer, never averaged.
const integrations = [
  { name: "ServiceTitan", category: "Field service & CRM · Live" },
  { name: "Housecall Pro", category: "Field service & CRM · Live" },
  { name: "Jobber", category: "Field service & CRM · Live" },
  { name: "Google Calendar", category: "Calendars · Live" },
  { name: "Microsoft 365", category: "Calendars · Live" },
  { name: "Calendly & Cal.com", category: "Calendars · Live" },
  { name: "Twilio", category: "Telephony · Live" },
  { name: "OpenAI", category: "Realtime voice · Live" },
  { name: "ElevenLabs", category: "Voice · Live" },
  { name: "Google Cloud & Gemini", category: "Speech & fallback · Live" },
  { name: "Deepgram & AssemblyAI", category: "Speech-to-text · Live" },
  { name: "Stripe", category: "Billing · Live" },
  { name: "Instagram, Facebook & WhatsApp", category: "Messaging channels · In rollout" },
  { name: "Product & parts feeds", category: "Commerce & catalog · In rollout" },
  { name: "Accounting & payments", category: "Invoice status · Coming" },
];

export function IntegrationsSection() {
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

  const card = (integration: typeof integrations[0], key: string) => {
    const coming = integration.category.endsWith("Coming");
    const rollout = integration.category.endsWith("In rollout");
    return (
      <div
        key={key}
        className={`shrink-0 px-8 py-6 rounded-2xl border bg-paper shadow-1 hover:border-brand-line hover:shadow-2 transition-all duration-300 group ${coming ? "border-dashed border-line-2" : "border-line"}`}
      >
        <div className="text-lg font-semibold group-hover:translate-x-1 transition-transform">{integration.name}</div>
        <div className={`text-sm font-mono ${coming ? "text-ink-3" : rollout ? "text-amber-txt" : "text-brand-txt"}`}>{integration.category}</div>
      </div>
    );
  };

  return (
    <section id="integrations" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 lg:mb-24 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 kb-label mb-6">
            <span className="w-8 h-px bg-line-2" />
            What it plugs into
            <span className="w-8 h-px bg-line-2" />
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
            Keep the systems you run.
            <br />
            <span className="text-brand-dk">We sit above them.</span>
          </h2>
          <p className="text-xl text-ink-2">
            Nothing here is a logo wall. Each row says what state it is actually in, and a row that says coming means it is not shipped.
          </p>
        </div>
      </div>

      <div className="w-full mb-6">
        <div className="flex gap-6 marquee">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-6 shrink-0">
              {integrations.map((integration) => card(integration, `${integration.name}-${setIndex}`))}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full">
        <div className="flex gap-6 marquee-reverse">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-6 shrink-0">
              {[...integrations].reverse().map((integration) => card(integration, `${integration.name}-reverse-${setIndex}`))}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mt-12 text-center">
        <Link href="/product#integrations" className="text-sm font-bold text-brand-dk hover:text-brand">
          Status per layer →
        </Link>
      </div>
    </section>
  );
}
