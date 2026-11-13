/**
 * Pure helpers for the enquiry route (app/api/enquiry/route.ts).
 *
 * No Next.js, Node or alias imports, so this file also runs under
 * `node --test`. The database repeats every check; validating here only
 * gives the visitor a fast, friendly answer.
 */

export type EnquiryInput = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  topic?: unknown;
  page?: unknown;
  website?: unknown; // honeypot: people never see it, bots fill it
  meta?: unknown;
};

export type Enquiry = {
  name: string;
  email: string;
  phone: string;
  topic: string | null;
  page: string | null;
  meta: Record<string, string>;
};

type Field = "name" | "email" | "phone" | "topic" | "page";

export type Validation =
  | { ok: true; value: Enquiry }
  | { ok: false; field: Field; message: string };

export type Outcome = {
  status: number;
  body: { ok: boolean; error?: string; field?: string };
};

export const MAX_BODY_CHARS = 10_000;

export const NOT_CONNECTED = "The booking form isn't connected yet.";
export const RATE_LIMITED =
  "Too many requests from this connection. Please try again in an hour.";
export const GENERIC =
  "Something went wrong sending your details. Please try again.";

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const META_KEYS = /^(referrer|utm_[a-z]+)$/;

const text = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const fail = (field: Field, message: string): Validation => ({
  ok: false,
  field,
  message,
});

export function isHoneypot(input: EnquiryInput): boolean {
  return text(input.website) !== "";
}

/** Keeps only referrer / utm_* strings of sane length; never fails. */
function cleanMeta(value: unknown): Record<string, string> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return {};
  }
  const meta: Record<string, string> = {};
  for (const [key, raw] of Object.entries(value)) {
    const item = text(raw);
    if (META_KEYS.test(key) && item !== "" && item.length <= 300) {
      meta[key] = item;
    }
    if (Object.keys(meta).length >= 8) break;
  }
  return meta;
}

export function validateEnquiry(input: EnquiryInput): Validation {
  const name = text(input.name);
  const email = text(input.email);
  const phone = text(input.phone);
  const topic = text(input.topic);
  const page = text(input.page);

  if (name.length < 1 || name.length > 200) {
    return fail("name", "Please tell us your name or firm.");
  }
  if (email.length > 254 || !EMAIL.test(email)) {
    return fail("email", "Please enter a valid email address.");
  }
  const digits = phone.replace(/\D/g, "").length;
  if (phone.length > 30 || digits < 7 || digits > 15) {
    return fail("phone", "Please enter a valid phone or WhatsApp number.");
  }
  if (topic.length > 200) return fail("topic", GENERIC);
  if (page.length > 300) return fail("page", GENERIC);

  return {
    ok: true,
    value: {
      name,
      email,
      phone,
      topic: topic || null,
      page: page || null,
      meta: cleanMeta(input.meta),
    },
  };
}

/** The JSON body for POST /rest/v1/rpc/submit_enquiry. */
export function rpcBody(enquiry: Enquiry, secret: string, ipHash: string) {
  return {
    p_secret: secret,
    p_name: enquiry.name,
    p_email: enquiry.email,
    p_phone: enquiry.phone,
    p_topic: enquiry.topic,
    p_page: enquiry.page,
    p_meta: enquiry.meta,
    p_ip_hash: ipHash,
  };
}

/** Turns Supabase's answer into what the browser is told. Internals never leak. */
export function outcomeFromRpc(httpStatus: number, payload: unknown): Outcome {
  if (httpStatus >= 200 && httpStatus < 300) {
    return { status: 200, body: { ok: true } };
  }
  const message =
    typeof payload === "object" &&
    payload !== null &&
    "message" in payload &&
    typeof payload.message === "string"
      ? payload.message
      : "";
  if (message === "rate_limited") {
    return { status: 429, body: { ok: false, error: RATE_LIMITED } };
  }
  if (message.startsWith("invalid_enquiry")) {
    return {
      status: 400,
      body: {
        ok: false,
        error: "Please check your details and try again.",
        field: message.split(":")[1]?.trim(),
      },
    };
  }
  return { status: 502, body: { ok: false, error: GENERIC } };
}

/** The visitor's address as the hosting platform reports it. */
export function clientAddress(get: (name: string) => string | null): string {
  const first = get("x-forwarded-for")?.split(",")[0]?.trim();
  return first || get("x-real-ip")?.trim() || "unknown";
}
