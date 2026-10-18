import { useEffect, useState, useRef } from "react";

const links = [
  ["about", "Meet me"], ["services", "What I do"], ["process", "How I work"],
  ["projects", "The work"], ["testimonials", "They Said It"],
];

export default function Nav() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const timer = useRef(null);
  const holding = useRef(false); // true while the nav is hovered or focused

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach(([id]) => { const el = document.getElementById(id); el && io.observe(el); });
    return () => io.disconnect();
  }, []);

  // Hide the nav after 2s without scrolling; any scroll (or mouse near the top) brings it back
  useEffect(() => {
    const IDLE_MS = 2000;

    const show = () => {
      setHidden(false);
      clearTimeout(timer.current);
      if (open || window.scrollY < 80) return;
      timer.current = setTimeout(() => {
        if (!holding.current) setHidden(true);
      }, IDLE_MS);
    };
    const onMouse = (e) => { if (e.clientY < 90) show(); };

    window.addEventListener("scroll", show, { passive: true });
    window.addEventListener("mousemove", onMouse);
    show();
    return () => {
      window.removeEventListener("scroll", show);
      window.removeEventListener("mousemove", onMouse);
      clearTimeout(timer.current);
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <nav className={`nav ${hidden ? "nav-hidden" : ""}`} aria-label="Main">
      <div
        className="pill"
        onMouseEnter={() => { holding.current = true; }}
        onMouseLeave={() => { holding.current = false; }}
        onFocus={() => { holding.current = true; }}
        onBlur={() => { holding.current = false; }}
      >
        <button
          className="burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((o) => !o)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
        <ul id="nav-links" className={open ? "open" : ""}>
          {links.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className={active === id ? "active" : ""} onClick={() => setOpen(false)}>{label}</a>
            </li>
          ))}
          <li><a className="cta" href="#contact" onClick={() => setOpen(false)}>Say hi</a></li>
        </ul>
      </div>
    </nav>
  );
}