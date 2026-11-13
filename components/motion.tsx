"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import DotGrid from "./reactbits/DotGrid";

/** Headline that blurs in word by word, with optional accent words. */
export function BlurText({
  text,
  as: Tag = "h1",
  className = "",
  accent,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  /** Words (exact match) rendered in the accent colour. */
  accent?: string[];
}) {
  const words = text.split(" ");
  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden>
          <span
            className={`blur-word ${accent?.includes(word.replace(/[.,]/g, "")) ? "text-indigo-600" : ""}`}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

/** Fades content up when it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/** Interactive React Bits dot grid behind a hero. Dots react to the cursor and to clicks. */
export function HeroBackdrop() {
  return (
    <div aria-hidden className="hero-fade pointer-events-none absolute inset-0 -z-10">
      <DotGrid
        dotSize={3}
        gap={22}
        baseColor="#cbd5e1"
        activeColor="#6366f1"
        proximity={130}
        glow={0.25}
      />
    </div>
  );
}
