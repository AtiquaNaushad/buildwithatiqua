import { useEffect } from "react";

// Old links that should still land somewhere sensible
const ALIASES = { about: "meet-me" };

// Smooth-scrolls to in-page sections WITHOUT adding "#section" to the address bar.
// Works for every <a href="#..."> on the site: desktop menu, mobile menu, buttons.
export default function useCleanAnchors() {
  useEffect(() => {
    let timer;
    const stop = () => clearTimeout(timer);

    const find = (hash) => {
      let id = hash.replace(/^#/, "");
      try { id = decodeURIComponent(id); } catch { /* keep as is */ }
      return document.getElementById(id) || document.getElementById(ALIASES[id] || "");
    };

    const cleanUrl = () => {
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    };

    const go = (el, smooth = true) => {
      stop();
      const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      // "auto" follows your CSS (smooth normally, instant for reduced-motion users)
      el.scrollIntoView({ behavior: smooth ? "auto" : "instant", block: "start" });

      // Sections above load lazily and can push the target down while scrolling.
      // Once the scroll settles, nudge it back into place if that happened.
      let last = -1, fixes = 0, ticks = 0;
      const poll = () => {
        if (++ticks > 24) return; // give up after ~6 seconds
        const y = window.scrollY;
        if (y === last) {
          if (Math.abs(el.getBoundingClientRect().top - pad) <= 6) return;
          if (++fixes > 3) return;
          el.scrollIntoView({ behavior: "auto", block: "start" });
        }
        last = y;
        timer = setTimeout(poll, 250);
      };
      timer = setTimeout(poll, 250);
    };

    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href");
      const el = find(hash);
      if (!el) return;
      e.preventDefault();
      go(el);
      cleanUrl();
    };

    // Someone changes the hash another way (old bookmark, back button): handle it too
    const onHashChange = () => {
      const el = find(window.location.hash);
      cleanUrl();
      if (el) go(el);
    };

    // If the user scrolls themselves, stop any correction in progress
    const events = ["wheel", "touchstart", "keydown"];
    events.forEach((n) => window.addEventListener(n, stop, { passive: true }));
    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHashChange);

    // Page opened from a link that already has a hash (e.g. an old shared link)
    if (window.location.hash) {
      const el = find(window.location.hash);
      cleanUrl();
      if (el) requestAnimationFrame(() => go(el, false));
    }

    return () => {
      stop();
      events.forEach((n) => window.removeEventListener(n, stop));
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);
}