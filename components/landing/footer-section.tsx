"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatedWave } from "./animated-wave";
import { LogoMark } from "@/components/site/logo";
import { brand, footerCols } from "@/lib/content";

const contactLinks = [
  { name: brand.emails.hello, href: `mailto:${brand.emails.hello}` },
  { name: brand.phone, href: `tel:${brand.phone.replace(/^\*72 · /, "+1").replace(/\s/g, "")}` },
];

export function FooterSection() {
  return (
    <footer className="relative bg-olive text-white">
      {/* Animated wave background */}
      <div className="absolute inset-0 h-64 opacity-30 pointer-events-none overflow-hidden">
        <AnimatedWave />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="pt-16 lg:pt-20 pb-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 lg:gap-8">
            <div className="col-span-2">
              <Link href="/" className="inline-flex items-center gap-[10px] mb-6">
                <LogoMark size={28} className="!shadow-none" />
                <span className="text-xl font-display font-bold text-white">Kaboota</span>
              </Link>
              <p className="font-mono text-[11px] text-white/45 leading-relaxed mb-8">
                CONVERSATION-TO-ACTION INTELLIGENCE
                <br />
                {brand.domain}
              </p>
              <div className="flex gap-6 flex-wrap">
                {contactLinks.map((link) => (
                  <a key={link.name} href={link.href} className="text-sm text-white/70 hover:text-mint transition-colors flex items-center gap-1 group">
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {footerCols.map((col) => (
              <div key={col.h}>
                <h3 className="kb-label-sm text-white/45 mb-6">{col.h}</h3>
                <ul className="space-y-3">
                  {col.items.map(([label, href]) => (
                    <li key={label}>
                      <Link href={href} className="text-sm text-white/80 hover:text-mint transition-colors">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="py-8 border-t border-white/[0.13] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10.5px] text-white/35">{brand.copyright}</p>
          <div className="flex items-center gap-4 font-mono text-[10.5px] text-white/35">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse-ring" />
              LIVE · IN ROLLOUT · COMING — STATED PER CHANNEL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
