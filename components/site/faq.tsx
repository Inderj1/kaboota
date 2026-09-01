"use client";

import { useState } from "react";

export function Faq({ items, defaultOpen = 0 }: { items: { q: string; a: string }[]; defaultOpen?: number }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="flex flex-col gap-[10px]">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="overflow-hidden rounded-2xl border border-line bg-paper shadow-1">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-[14px] px-[22px] py-[18px] text-left"
            >
              <span className="flex-1 text-[16.5px] font-bold">{f.q}</span>
              <span className="font-mono text-[17px] text-brand" aria-hidden>
                {isOpen ? "–" : "+"}
              </span>
            </button>
            {isOpen && <p className="max-w-[66ch] px-[22px] pb-5 text-[15.5px] text-ink-2">{f.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
