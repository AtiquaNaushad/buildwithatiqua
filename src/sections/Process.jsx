import { useEffect, useRef } from "react";

const icon = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
const steps = [
  ["Discovery", "Understand the vision", "We talk goals, audience and the problem your project needs to solve.",
    <path d="M20 11.5a7.5 7.5 0 0 1-10.9 6.7L4 19.5l1.3-4.4A7.5 7.5 0 1 1 20 11.5Z" />],
  ["Planning & design", "Shape the experience", "I map the structure, user journey and visual direction into a clear roadmap.",
    <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12.5 9 5 9-5" /><path d="m3 17 9 5 9-5" /></>],
  ["Development", "Bring ideas to life", "I build a fast, responsive site with care for detail and usability.",
    <><path d="m8 7-5 5 5 5" /><path d="m16 7 5 5-5 5" /></>],
  ["Testing & launch", "Ready for the world", "I test across devices, fix the rough edges and ship the finished site.",
    <><circle cx="12" cy="12" r="9" /><path d="m8 12.5 2.8 2.8L16 9.5" /></>],
];

export default function Process() {
  const listRef = useRef(null);

  // Scroll timeline: fills the vertical line (mobile) as the section scrolls past
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = [...list.children];
    let raf = 0;

    const update = () => {
      raf = 0;
      const half = items[0].querySelector(".ring").offsetHeight / 2;
      const total = items[items.length - 1].offsetTop - items[0].offsetTop;
      const y = window.innerHeight * 0.6 - list.getBoundingClientRect().top - half;
      const p = Math.min(1, Math.max(0, y / total));
      list.style.setProperty("--total", total + "px");
      list.style.setProperty("--p", p);
      items.forEach((li) => li.classList.toggle("done", p * total >= li.offsetTop - items[0].offsetTop - 1));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="block">
      <div className="wrap">
        <h2>How I work</h2>
        <div className="process-head">
          <p>From first idea to final launch. A simple four-step process that turns ideas into thoughtful digital experiences.</p>
          <a className="start" href="#contact">Start a project{" "}
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12 12 4M5.5 4H12v6.5" /></svg>
          </a>
        </div>
        <ol className="steps" ref={listRef} style={{ listStyle: "none", padding: 0, marginBottom: 0 }}>
          {steps.map(([title, tag, desc, path], i) => (
            <li className="step" key={title}>
              <div className="node"><span className="ring"><svg viewBox="0 0 24 24" {...icon}>{path}</svg></span></div>
              <p className="n">Step 0{i + 1}</p>
              <h3>{title}</h3>
              <p className="tagline">{tag}</p>
              <p className="desc">{desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}