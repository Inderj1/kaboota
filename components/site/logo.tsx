import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/** Kaboota mark: the green parrot, on a transparent background. */
export function LogoMark({ size = 34, className }: { size?: number; className?: string }) {
  return (
    <Image
      src="/logo/kaboota-mark.png"
      alt=""
      width={size}
      height={size}
      className={cn("flex-shrink-0 select-none", className)}
      priority
      aria-hidden
    />
  );
}

/** Kaboota wordmark: parrot + "kaboota.ai". `dark` swaps in the white-text variant for dark surfaces. */
export function Wordmark({ height = 30, dark, className }: { height?: number; dark?: boolean; className?: string }) {
  // Source assets are 1684×388.
  const width = Math.round(height * (1684 / 388));
  return (
    <Image
      src={dark ? "/logo/kaboota-wordmark-light.png" : "/logo/kaboota-wordmark.png"}
      alt="Kaboota"
      width={width}
      height={height}
      className={cn("h-auto w-auto select-none", className)}
      style={{ height, width: "auto" }}
      priority
    />
  );
}

export function Logo({ dark, compact }: { dark?: boolean; compact?: boolean }) {
  return (
    <Link href="/" className="flex flex-shrink-0 flex-col items-start gap-[4px] leading-none" aria-label="Kaboota home">
      <Wordmark height={compact ? 26 : 30} dark={dark} />
      {!compact && (
        <span className={cn("hidden font-mono text-[8.5px] tracking-[.11em] sm:block", dark ? "text-white/45" : "text-ink-3")}>
          CONVERSATION-TO-ACTION INTELLIGENCE
        </span>
      )}
    </Link>
  );
}
