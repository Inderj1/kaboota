"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { btnStyles, btnSizes } from "./ui";

const field = "w-full rounded-[11px] border border-line-2 bg-white px-[14px] py-[11px] text-[15px] text-ink placeholder:text-ink-3 focus:border-brand focus:outline-none focus:ring-[3px] focus:ring-brand/25";
const label = "mb-[6px] block text-[12.5px] font-semibold text-ink-2";

export function Field({ name, label: l, type = "text", required, placeholder, textarea, options }: { name: string; label: string; type?: string; required?: boolean; placeholder?: string; textarea?: boolean; options?: string[] }) {
  return (
    <div>
      <label htmlFor={name} className={label}>
        {l}
        {required && <span className="text-brand"> *</span>}
      </label>
      {textarea ? (
        <textarea id={name} name={name} required={required} placeholder={placeholder} rows={4} className={cn(field, "resize-y")} />
      ) : options ? (
        <select id={name} name={name} required={required} defaultValue="" className={field}>
          <option value="" disabled>
            Select…
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input id={name} name={name} type={type} required={required} placeholder={placeholder} className={field} />
      )}
    </div>
  );
}

/**
 * Lightweight form shell. There is no backend wired yet, so on submit we show
 * the confirmation state and offer the matching inbox as a fallback.
 */
export function SiteForm({ title, sub, submitLabel, note, fallbackEmail, children, className, dark }: { title: string; sub?: string; submitLabel: string; note?: string; fallbackEmail: string; children: ReactNode; className?: string; dark?: boolean }) {
  const [done, setDone] = useState(false);
  return (
    <div className={cn("rounded-2xl border p-6 sm:p-7", dark ? "dark-panel border-transparent" : "border-line bg-paper shadow-2", className)}>
      <h3 className={cn("text-[22px]", dark && "text-white")}>{title}</h3>
      {sub && <p className={cn("mt-2 text-[14.5px]", dark ? "text-white/80" : "text-ink-2")}>{sub}</p>}
      {done ? (
        <div className="mt-6 rounded-[11px] border border-brand-line bg-brand-soft p-5 text-brand-txt">
          <p className="font-bold">Thanks — we have it.</p>
          <p className="mt-1 text-[14.5px]">
            A person will reply within one business day. Prefer email? Write to{" "}
            <a href={`mailto:${fallbackEmail}`} className="underline">
              {fallbackEmail}
            </a>
            .
          </p>
        </div>
      ) : (
        <form
          className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          {children}
          <div className="sm:col-span-2">
            <button type="submit" className={cn(btnStyles.primary, btnSizes.lg, "w-full sm:w-auto")}>
              {submitLabel}
            </button>
            {note && <p className={cn("mt-3 text-[12.5px]", dark ? "text-white/60" : "text-ink-3")}>{note}</p>}
          </div>
        </form>
      )}
    </div>
  );
}

export function CallbackForm({ dark }: { dark?: boolean }) {
  const [done, setDone] = useState(false);
  return (
    <div className={cn("flex flex-col gap-4 rounded-2xl p-6 lg:flex-row lg:items-center", dark ? "dark-panel" : "border border-line bg-paper-2")}>
      <div className="min-w-[240px] flex-1">
        <h3 className={cn("text-[20px]", dark && "text-white")}>Prefer a quick callback?</h3>
        <p className={cn("mt-1 text-[14.5px]", dark ? "text-white/80" : "text-ink-2")}>Drop your email and a specialist will reach out — no demo scheduling required.</p>
      </div>
      {done ? (
        <p className={cn("font-mono text-[12px]", dark ? "text-mint" : "text-brand-txt")}>GOT IT · A SPECIALIST WILL REACH OUT.</p>
      ) : (
        <form
          className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto"
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          <input type="email" required placeholder="Work email" aria-label="Work email" className={cn(field, "sm:w-[260px]")} />
          <button type="submit" className={cn(dark ? btnStyles.mint : btnStyles.primary, btnSizes.md)}>
            Get a callback
          </button>
        </form>
      )}
    </div>
  );
}
