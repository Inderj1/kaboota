"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cases, sectors } from "@/lib/content";

const pilot = cases[0];

// One pilot, measured honestly: the quote, then each outcome with its window.
const testimonials = [
  { quote: pilot.quote as string, author: "Pilot customer", role: "Mechanical services", company: "20–40 conversations a day", metric: "2 calls caught", window: "That the owner never knew he'd lost" },
  ...pilot.figures.map((f) => ({ quote: pilot.h, author: "Pilot customer", role: "Mechanical services", company: pilot.window, metric: f.v, window: f.l })),
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section id="outcomes" className="relative py-32 lg:py-40 border-t border-line lg:pb-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-16">
          <span className="kb-label">What was measured · one week</span>
          <div className="flex-1 h-px bg-line" />
          <span className="font-mono text-xs text-ink-3">
            {String(activeIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-8">
            <blockquote
              className={`transition-all duration-300 ${
                isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}
            >
              <p className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.08] tracking-tight text-ink">
                &ldquo;{activeTestimonial.quote}&rdquo;
              </p>
            </blockquote>

            <div
              className={`mt-12 flex items-center gap-6 transition-all duration-300 delay-100 ${
                isAnimating ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-brand-soft border border-brand-line flex items-center justify-center">
                <span className="font-display font-bold text-2xl text-brand-txt">M</span>
              </div>
              <div>
                <p className="text-lg font-semibold text-ink">{activeTestimonial.author}</p>
                <p className="text-ink-2">
                  {activeTestimonial.role} · {activeTestimonial.company}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-center">
            <div
              className={`p-8 rounded-2xl dark-panel shadow-2 transition-all duration-300 ${
                isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <span className="font-mono text-[10px] tracking-[.12em] text-mint uppercase block mb-4">Measured · one week</span>
              <p className="font-display font-bold text-3xl md:text-4xl text-white tracking-[-0.02em]">{activeTestimonial.metric}</p>
              <p className="mt-2 text-[13.5px] text-white/75">{activeTestimonial.window}</p>
            </div>

            <div className="flex gap-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Show result ${idx + 1}`}
                  onClick={() => {
                    setIsAnimating(true);
                    setTimeout(() => {
                      setActiveIndex(idx);
                      setIsAnimating(false);
                    }, 300);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? "w-8 bg-brand" : "w-2 bg-line-2 hover:bg-ink-3"
                  }`}
                />
              ))}
            </div>
            <Link href="/outcomes" className="mt-6 text-sm font-bold text-brand-dk hover:text-brand">
              One pilot, measured honestly →
            </Link>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-line">
          <p className="kb-label mb-8 text-center">Proven in the trades. Not limited to them.</p>
        </div>
      </div>

      <div className="w-full">
        <div className="flex gap-16 items-center marquee">
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} className="flex gap-16 items-center shrink-0">
              {sectors.map((s) => (
                <span
                  key={`${setIdx}-${s.k}`}
                  className="font-display font-semibold text-xl md:text-2xl text-ink-3 whitespace-nowrap hover:text-brand-dk transition-colors duration-300"
                >
                  {s.k} <span className="font-mono text-[10px] tracking-[.1em] align-middle text-brand-txt ml-1">{s.status}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
