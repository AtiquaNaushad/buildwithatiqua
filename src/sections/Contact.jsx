import { useState } from "react";

const EMAIL = "atiquanaushad@gmail.com"; // must be a full email address
const WA_LINK = "https://wa.aisensy.com/aab6sy";

const types = ["Website", "Web app", "UI design", "Redesign", "Something else"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [error, setError] = useState("");

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.type) return setError("Please pick what you need help with.");
    setError("");
    window.open(WA_LINK, "_blank", "noopener");
  };

  return (
    <section className="block contact">
      <div className="wrap contact-grid">
        {/* Left: blue panel */}
        <aside className="contact-panel">
          <p className="avail"><span className="dot" aria-hidden="true" /> Open for new projects</p>
          <h2>Let&rsquo;s build something amazing together.</h2>
          <p className="panel-text">
            Have a project in mind? I&rsquo;d love to hear about it.
          </p>

          <ul className="direct">
            <li>
              <a href={`mailto:${EMAIL}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
                </svg>
                <span>Email me<small>{EMAIL}</small></span>
              </a>
            </li>
            <li>
              <a href={WA_LINK} target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 21l1.6-4.6A8.5 8.5 0 1 1 8 19.6L3 21Z" /><path d="M9 9.5c.3 2.2 2.3 4.2 4.5 4.5l1.2-1.2-1.8-1-.8.6c-.7-.3-1.4-1-1.7-1.7l.6-.8-1-1.8L9 9.5Z" />
                </svg>
                <span>Chat on WhatsApp<small>Usually replies within a day</small></span>
              </a>
            </li>
          </ul>
        </aside>

        {/* Right: form */}
        <form className="contact-form" onSubmit={onSubmit} noValidate>
          <fieldset className="pills">
            <legend>What do you need help with?</legend>
            <div className="pill-row">
              {types.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`chip ${form.type === t ? "on" : ""}`}
                  aria-pressed={form.type === t}
                  onClick={() => { setForm((f) => ({ ...f, type: t })); setError(""); }}
                >
                  {t}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="form-row">
            <input name="name" type="text" placeholder="Your Name" aria-label="Your name"
              autoComplete="name" value={form.name} onChange={onChange} required />
            <input name="email" type="email" placeholder="Your Email" aria-label="Your email"
              autoComplete="email" value={form.email} onChange={onChange} required />
          </div>

          <textarea name="message" rows={5} placeholder="Tell me about your project..."
            aria-label="Project details" value={form.message} onChange={onChange} required />

          {error && <p className="form-error" role="alert">{error}</p>}

          <div className="form-submit">
            <button type="submit">
              Send Message
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}