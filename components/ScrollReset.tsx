"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * Puts the window at the top whenever a link opens a new page.
 *
 * Next.js's own scroll handling calls scrollIntoView on each section of the
 * new page, which left visitors at the bottom of the page when they navigated
 * from the top. Internal links pass scroll={false} to switch that off, and
 * this component does the reset instead.
 *
 * Left alone: Back/Forward (the browser restores the old position) and URLs
 * with a #hash (anchor links still land on their section).
 */
export function ScrollReset() {
  const pathname = usePathname();
  const fromHistory = useRef(false);

  useEffect(() => {
    // Next.js renders the previous page during its own popstate handler, so the
    // flag must be set before that runs: the Navigation API's "navigate" event
    // fires first, and a capturing popstate listener covers older browsers.
    const markTraverse = () => {
      fromHistory.current = true;
    };
    const nav = (window as Window & { navigation?: EventTarget }).navigation;
    const onNavigate = (e: Event) => {
      if ((e as Event & { navigationType?: string }).navigationType === "traverse") markTraverse();
    };
    nav?.addEventListener("navigate", onNavigate);
    window.addEventListener("popstate", markTraverse, { capture: true });
    return () => {
      nav?.removeEventListener("navigate", onNavigate);
      window.removeEventListener("popstate", markTraverse, { capture: true });
    };
  }, []);

  useLayoutEffect(() => {
    if (fromHistory.current) {
      fromHistory.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
