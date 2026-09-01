"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll-reveal container from the Kaboota pipeline section: children with [data-pipe]
 * fade/lift in as they enter the viewport and their [data-pipedot] turns brand green. Once on, stays on.
 */
export function RevealGrid({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-pipe]"));
    const turnOn = (c: HTMLElement, i: number) => {
      window.setTimeout(() => {
        c.style.opacity = "1";
        c.style.transform = "none";
        c.style.borderColor = "#c8e6d4";
        c.style.boxShadow = "0 2px 6px rgba(40,30,15,.07),0 12px 32px rgba(40,30,15,.09)";
        const dot = c.querySelector<HTMLElement>("[data-pipedot]");
        if (dot) {
          dot.style.background = "#1f9d5c";
          dot.style.boxShadow = "0 0 0 4px rgba(31,157,92,.16)";
        }
      }, i * 70);
    };
    if (typeof IntersectionObserver === "undefined") {
      cards.forEach(turnOn);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          turnOn(el, cards.indexOf(el));
          io.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
