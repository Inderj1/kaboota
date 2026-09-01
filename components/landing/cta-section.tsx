"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedTetrahedron } from "./animated-tetrahedron";
import { closing, ctas, brand } from "@/lib/content";

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`relative rounded-[18px] dark-panel shadow-3 overflow-hidden transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          onMouseMove={handleMouseMove}
        >
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{ background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(127,230,171,0.14), transparent 40%)` }}
          />

          <div className="relative z-10 px-8 lg:px-16 py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="flex-1">
                <span className="kb-label !text-mint block mb-6">Two weeks · your own number · listen-only to start</span>
                <h2 className="text-4xl lg:text-6xl font-display tracking-tight text-white mb-8 leading-[1]">
                  Forward your line this afternoon.
                  <br />
                  See your real week by Friday.
                </h2>

                <p className="text-xl text-white/75 mb-12 leading-relaxed max-w-xl">{closing.p}</p>

                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-brand hover:bg-mint hover:text-mint-ink text-white font-bold px-8 h-14 text-base rounded-[11px] shadow-glow group"
                  >
                    <Link href={ctas.primary.href}>
                      {ctas.primary.label}
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 text-base font-semibold rounded-[11px] border-white/25 bg-transparent text-white hover:border-white hover:bg-white/5 hover:text-white"
                  >
                    <Link href={ctas.secondary.href}>{ctas.secondary.label}</Link>
                  </Button>
                </div>

                <p className="text-sm text-mint mt-8 font-mono tracking-[.08em] uppercase">
                  {brand.brandLine} · {brand.phone}
                </p>
              </div>

              <div className="hidden lg:flex items-center justify-center w-[500px] h-[500px] -mr-16">
                <AnimatedTetrahedron />
              </div>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-white/10 rounded-bl-[18px]" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-t border-r border-white/10 rounded-tr-[18px]" />
        </div>
      </div>
    </section>
  );
}
