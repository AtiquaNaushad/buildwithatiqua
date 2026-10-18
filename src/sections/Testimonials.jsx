import { useRef, useState } from "react";

// Add a real photo with photo: "/testimonials/name.webp" (put the file in public/testimonials/)
const testimonials = [
  { quote: "Atiqua turned our rough idea into a site we're proud of, and she kept us in the loop the whole way.", name: "Client name", role: "Role, Company", rating: 5, photo: "" },
  { quote: "Fast, clear communication and a clean result. The site loads quickly and looks great on every device.", name: "Client name", role: "Role, Company", rating: 4, photo: "" },
  { quote: "She cares about the details most people skip. Working together felt easy from the first call to launch day.", name: "Client name", role: "Role, Company", rating: 5, photo: "" },
];

const star = "M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8L12 2.5Z";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const touchX = useRef(null);
  const n = testimonials.length;
  const go = (i) => setActive((i + n) % n);

  // Shortest circular distance from the active card (0 = center, ±1 = sides)
  const offset = (i) => {
    let d = i - active;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
  };

  return (
    <section className="block band">
      <div className="wrap">
        <h2>They Said It</h2>
      </div>

      <div
        className="t-stage"
        role="region"
        aria-roledescription="carousel"
        aria-label="Testimonials"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
      >
        <button className="t-arrow prev" onClick={() => go(active - 1)} aria-label="Previous testimonial">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg>
        </button>

        <div className="t-track">
          {testimonials.map((t, i) => {
            const d = offset(i);
            const state = d === 0 ? "is-active" : Math.abs(d) === 1 ? "is-near" : "is-far";
            return (
              <figure className={`t-card ${state}`} style={{ "--d": d }} key={i} aria-hidden={d !== 0}>
                <svg className="t-quote" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M9.5 6C6.5 6.6 4 9.2 4 12.6V18h6v-6H7c0-1.7 1.1-3 2.5-3.4V6Zm10 0c-3 .6-5.5 3.2-5.5 6.6V18h6v-6h-3c0-1.7 1.1-3 2.5-3.4V6Z" />
                </svg>
                <div className="t-avatar">
                  {t.photo ? (
                    <img src={t.photo} alt={t.name} loading="lazy" width="88" height="88" />
                  ) : (
                    <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="38" r="17" /><path d="M14 100C14 70 32 60 50 60s36 10 36 40Z" /></svg>
                  )}
                </div>
                <blockquote className="t-text">{t.quote}</blockquote>
                <div className="t-stars" role="img" aria-label={`${t.rating} out of 5 stars`}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} viewBox="0 0 24 24" fill="currentColor" className={s <= t.rating ? "" : "off"} aria-hidden="true"><path d={star} /></svg>
                  ))}
                </div>
                <figcaption className="t-who"><strong>{t.name}</strong><span>{t.role}</span></figcaption>
              </figure>
            );
          })}
        </div>

        <button className="t-arrow next" onClick={() => go(active + 1)} aria-label="Next testimonial">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
        </button>
      </div>

      <div className="t-dots">
        {testimonials.map((_, i) => (
          <button key={i} className={i === active ? "on" : ""} onClick={() => go(i)} aria-label={`Show testimonial ${i + 1}`} aria-current={i === active} />
        ))}
      </div>
    </section>
  );
}