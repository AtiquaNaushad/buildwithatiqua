// Helpers for the contact form -> WhatsApp flow (pure functions, no React)

export const SERVICES = ["Website", "Web app", "UI design", "Redesign", "Something else"];

// Keeps the encoded message safely inside what wa.me links handle reliably.
export const MAX_ENCODED_LENGTH = 3000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const oneLine = (s) => String(s ?? "").replace(/\s+/g, " ").trim();
const multiLine = (s) => String(s ?? "").replace(/\r\n?/g, "\n").trim();

export const cleanNumber = (raw) => String(raw ?? "").replace(/\D/g, "");

// International number, digits only, no leading zero (e.g. 919876543210)
export const isValidNumber = (raw) => /^[1-9]\d{7,14}$/.test(cleanNumber(raw));

// Returns null when everything is fine, otherwise { field, message } for the first problem
export function validate(form) {
  if (!oneLine(form.name)) return { field: "name", message: "Please enter your name." };
  if (!oneLine(form.email)) return { field: "email", message: "Please enter your email." };
  if (!EMAIL_RE.test(oneLine(form.email))) return { field: "email", message: "Please enter a valid email address." };
  if (!SERVICES.includes(form.type)) return { field: "type", message: "Please pick what you need help with." };
  if (!multiLine(form.message)) return { field: "message", message: "Please tell me a little about your project." };
  return null;
}

export function buildMessage(form) {
  return [
    "Hello! I'd like to discuss a project with you.",
    "",
    `Name: ${oneLine(form.name)}`,
    `Email: ${oneLine(form.email)}`,
    "",
    `Service Needed: ${form.type}`,
    "",
    "Project Details:",
    multiLine(form.message),
    "",
    "I look forward to discussing this with you!",
  ].join("\n");
}

export const buildWhatsAppUrl = (number, text) =>
  `https://wa.me/${cleanNumber(number)}?text=${encodeURIComponent(text)}`;

export const isTooLong = (text) => encodeURIComponent(text).length > MAX_ENCODED_LENGTH;