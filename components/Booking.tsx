"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { site } from "@/lib/site";
import Magnet from "./reactbits/Magnet";

type Status = "idle" | "sending" | "sent" | "error";

const BookingContext = createContext<(topic?: string) => void>(() => {});

export function useBooking() {
  return useContext(BookingContext);
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [topic, setTopic] = useState("Book a call");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const open = useCallback((nextTopic?: string) => {
    setTopic(nextTopic ?? "Book a call");
    setStatus("idle");
    setError("");
    dialogRef.current?.showModal();
  }, []);

  const close = () => dialogRef.current?.close();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const search = new URLSearchParams(window.location.search);
    const meta: Record<string, string> = {};
    if (document.referrer) meta.referrer = document.referrer;
    for (const [key, value] of search) {
      if (key.startsWith("utm_")) meta[key] = value;
    }
    const enquiry = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      website: data.get("website"),
      topic,
      page: window.location.pathname,
      meta,
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(enquiry),
      });
      const json: { ok?: boolean; error?: string } | null = await res
        .json()
        .catch(() => null);
      if (!res.ok || !json?.ok) throw new Error(json?.error);
      setStatus("sent");
      notifyByEmail(enquiry);
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong sending your details. Please try again.",
      );
    }
  }

  /** Optional extra: email the enquiry through Web3Forms. Never blocks or fails the form. */
  function notifyByEmail(enquiry: { name: unknown; email: unknown; phone: unknown; page: string }) {
    if (!site.formKey) return;
    void fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: site.formKey,
        subject: `LambTech enquiry: ${topic}`,
        from_name: "lambtech.in",
        name_or_firm: enquiry.name,
        email: enquiry.email,
        phone: enquiry.phone,
        topic,
        page: enquiry.page,
      }),
    }).catch(() => {});
  }

  const field =
    "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/25";

  return (
    <BookingContext.Provider value={open}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="booking-title"
        className="booking w-[min(92vw,26rem)] rounded-2xl bg-white p-0 text-slate-900 shadow-2xl"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-indigo-600">
                3 fields · 30 seconds
              </p>
              <h2 id="booking-title" className="mt-1.5 text-xl font-bold">
                {topic}
              </h2>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="-mr-2 -mt-1 grid size-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {status === "sent" ? (
            <div className="mt-6" role="status">
              <div className="grid size-11 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="mt-4 font-semibold">Got it. We&apos;ll be in touch shortly.</p>
              <p className="mt-1 text-sm text-slate-600">
                Expect a reply by email or on WhatsApp.
              </p>
              <button
                type="button"
                onClick={close}
                className="mt-6 w-full rounded-lg bg-slate-900 px-4 py-2.5 font-semibold text-white hover:bg-slate-800"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-5 space-y-4">
              <label className="block text-sm font-medium">
                Name / Firm
                <input
                  name="name"
                  required
                  maxLength={200}
                  autoComplete="organization"
                  placeholder="Priya, Sharma & Co."
                  className={field}
                />
              </label>
              <label className="block text-sm font-medium">
                Email
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  placeholder="you@firm.in"
                  className={field}
                />
              </label>
              <label className="block text-sm font-medium">
                Phone / WhatsApp
                <input
                  name="phone"
                  type="tel"
                  required
                  minLength={7}
                  maxLength={30}
                  autoComplete="tel"
                  placeholder="+91 98765 43210"
                  className={field}
                />
              </label>
              {/* Honeypot: off-screen and skipped by keyboard and screen readers; bots fill it. */}
              <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>
                  Website
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              {status === "error" && (
                <p role="alert" className="rounded-lg bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">
                  {error}
                  {site.email && (
                    <>
                      {" "}
                      You can also write to{" "}
                      <a className="font-semibold underline" href={`mailto:${site.email}`}>
                        {site.email}
                      </a>
                      .
                    </>
                  )}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send"}
              </button>
              <p className="text-center text-xs text-slate-500">
                No spam. We only use this to reply to you.
              </p>
            </form>
          )}
        </div>
      </dialog>
    </BookingContext.Provider>
  );
}

export function BookButton({
  topic,
  children,
  variant = "primary",
  className = "",
  magnetic = variant !== "dark",
}: {
  topic?: string;
  children: ReactNode;
  variant?: "primary" | "dark" | "light";
  className?: string;
  magnetic?: boolean;
}) {
  const open = useBooking();
  const styles = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-600/20",
    dark: "bg-slate-900 text-white hover:bg-slate-800",
    light: "bg-white text-slate-900 hover:bg-slate-100",
  }[variant];
  const button = (
    <button
      type="button"
      onClick={() => open(topic ?? (typeof children === "string" ? children : undefined))}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-[0.95rem] font-semibold transition active:scale-[0.98] ${styles} ${className}`}
    >
      {children}
    </button>
  );
  // Primary CTAs lean towards the cursor (React Bits Magnet).
  return magnetic ? (
    <Magnet padding={45} magnetStrength={3} maxOffset={10}>
      {button}
    </Magnet>
  ) : (
    button
  );
}
