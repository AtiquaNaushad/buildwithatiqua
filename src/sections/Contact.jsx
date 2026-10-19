import { useRef, useState } from "react";
import {
  SERVICES, validate, buildMessage, buildWhatsAppUrl, isTooLong, isValidNumber, cleanNumber,
} from "../utils/whatsapp.js";

// Keep your existing values for these two lines
const EMAIL = "atiquanaushad@gmail.com";
const WHATSAPP = "917860242415"; // country code + number, digits only

export default function Contact() {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [error, setError] = useState({ field: "", message: "" });
  const [waUrl, setWaUrl] = useState("");

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const fail = (field, message) => {
    setWaUrl("");
    setError({ field, message });
    const el = field === "type" ? formRef.current?.querySelector(".chip") : formRef.current?.elements[field];
    el?.focus();
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const problem = validate(form);
    if (problem) return fail(problem.field, problem.message);

    if (!isValidNumber(WHATSAPP)) {
      return fail("", "WhatsApp isn't set up yet. Please use the email option instead.");
    }

    const text = buildMessage(form);
    if (isTooLong(text)) {
      return fail("message", "Your project details are a bit long for WhatsApp. Please shorten them a little.");
    }

    const url = buildWhatsAppUrl(WHATSAPP, text);
    setError({ field: "", message: "" });
    setWaUrl(url);

    // Opens the WhatsApp app on phones, WhatsApp Desktop or WhatsApp Web on computers.
    // If a popup blocker stops the new tab, continue in this tab instead.
    const w = window.open(url, "_blank");
    if (w) w.opener = null;
    else window.location.href = url;
  };

  const invalid = (name) => (error.field === name ? true : undefined);

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
              <a href={`https://wa.me/${cleanNumber(WHATSAPP)}`} target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 21l1.6-4.6A8.5 8.5 0 1 1 8 19.6L3 21Z" /><path d="M9 9.5c.3 2.2 2.3 4.2 4.5 4.5l1.2-1.2-1.8-1-.8.6c-.7-.3-1.4-1-1.7-1.7l.6-.8-1-1.8L9 9.5Z" />
                </svg>
                <span>Chat on WhatsApp<small>Usually replies within a day</small></span>
              </a>
            </li>
          </ul>
        </aside>

        {/* Right: form */}
        <form ref={formRef} className="contact-form" onSubmit={onSubmit} noValidate>
          <fieldset className="pills">
            <legend>What do you need help with?</legend>
            <div className="pill-row">
              {SERVICES.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`chip ${form.type === t ? "on" : ""}`}
                  aria-pressed={form.type === t}
                  onClick={() => { setForm((f) => ({ ...f, type: t })); setError({ field: "", message: "" }); }}
                >
                  {t}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="form-row">
            <input name="name" type="text" placeholder="Your Name" aria-label="Your name"
              autoComplete="name" value={form.name} onChange={onChange} aria-invalid={invalid("name")} required />
            <input name="email" type="email" placeholder="Your Email" aria-label="Your email"
              autoComplete="email" value={form.email} onChange={onChange} aria-invalid={invalid("email")} required />
          </div>

          <textarea name="message" rows={5} placeholder="Tell me about your project..."
            aria-label="Project details" value={form.message} onChange={onChange}
            aria-invalid={invalid("message")} required />

          {error.message && <p className="form-error" role="alert">{error.message}</p>}
          {waUrl && !error.message && (
            <p className="form-ok" role="status">
              Opening WhatsApp with your message. Just press send there. Nothing opened?{" "}
              <a href={waUrl} target="_blank" rel="noreferrer">Tap here</a>.
            </p>
          )}

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