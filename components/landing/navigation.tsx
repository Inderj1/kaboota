"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { LogoMark } from "@/components/site/logo";
import { nav } from "@/lib/content";

/** Kaboota header: sticky full-width bar, blurred cream background, 1px bottom rule. */
export function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/85 backdrop-blur-[14px]">
      <nav className="mx-auto max-w-[1400px]">
        <div className="flex h-[68px] items-center px-6 lg:px-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-[11px] group" aria-label="Kaboota home">
            <LogoMark size={34} />
            <span className="flex flex-col items-start leading-none">
              <span className="font-display font-bold tracking-tight text-[19px]">Kaboota</span>
              <span className="font-mono tracking-[.11em] text-ink-3 text-[8.5px] mt-[3px]">CONVERSATION-TO-ACTION INTELLIGENCE</span>
            </span>
          </Link>

          <div className="flex-1" />

          {/* Desktop Navigation — right-aligned, beside Contact us */}
          <div className="hidden lg:flex items-center gap-1 mr-5">
            {nav.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative whitespace-nowrap rounded-lg px-[9px] py-[7px] text-[14px] font-semibold text-ink transition-colors hover:bg-[rgba(33,29,23,.05)]"
                >
                  {link.label}
                  {active && <span className="absolute bottom-[1px] left-[9px] right-[9px] h-[2px] rounded-[2px] bg-brand" />}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <Button asChild size="sm" className="bg-brand hover:bg-brand-dk text-white font-bold rounded-[11px] shadow-glow px-[18px] py-[10px] h-auto text-[14px]">
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-[11px] border border-line-2 bg-white"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Full Screen Overlay */}
      <div
        className={`lg:hidden fixed inset-0 top-[68px] bg-canvas z-40 transition-all duration-500 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full px-8 pt-10 pb-8 overflow-y-auto">
          <div className="flex-1 flex flex-col justify-center gap-4">
            {nav.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-4xl font-display font-bold tracking-tight text-ink hover:text-brand-dk transition-all duration-500 ${
                  isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${i * 60}ms` : "0ms" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div
            className={`flex gap-4 pt-8 border-t border-line transition-all duration-500 ${
              isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? "300ms" : "0ms" }}
          >
            <Button asChild className="flex-1 bg-brand hover:bg-brand-dk text-white font-bold rounded-[11px] h-14 text-base shadow-glow">
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact us</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
