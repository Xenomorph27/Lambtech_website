import { createHash } from "node:crypto";
import {
  GENERIC,
  MAX_BODY_CHARS,
  NOT_CONNECTED,
  clientAddress,
  isHoneypot,
  outcomeFromRpc,
  rpcBody,
  validateEnquiry,
  type EnquiryInput,
} from "@/lib/enquiry";

/**
 * Saves a website enquiry to the LambTech desk database.
 *
 * The browser posts here; this server function calls one Supabase function,
 * submit_enquiry, presenting an intake secret that never reaches the browser.
 */

const json = (status: number, body: unknown) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  const url = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  const secret = process.env.ENQUIRY_INTAKE_SECRET;
  if (!url || !key || !secret) {
    return json(503, { ok: false, error: NOT_CONNECTED });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_CHARS) {
    return json(413, { ok: false, error: GENERIC });
  }

  let input: EnquiryInput;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      throw new Error("not an object");
    }
    input = parsed as EnquiryInput;
  } catch {
    return json(400, { ok: false, error: GENERIC });
  }

  // A filled honeypot is a bot: say thanks, store nothing.
  if (isHoneypot(input)) return json(200, { ok: true });

  const checked = validateEnquiry(input);
  if (!checked.ok) {
    return json(400, { ok: false, error: checked.message, field: checked.field });
  }

  // Salted, so the stored value cannot be turned back into an address.
  const ipHash = createHash("sha256")
    .update(clientAddress((name) => request.headers.get(name)) + secret)
    .digest("hex");

  try {
    const response = await fetch(`${url}/rest/v1/rpc/submit_enquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: key },
      body: JSON.stringify(rpcBody(checked.value, secret, ipHash)),
      signal: AbortSignal.timeout(10_000),
    });
    const payload: unknown = response.ok
      ? null
      : await response.json().catch(() => null);
    const outcome = outcomeFromRpc(response.status, payload);
    if (outcome.status === 502) {
      // Server log only. The payload is Supabase's error text, never the secret.
      console.error("submit_enquiry failed", response.status, payload);
    }
    return json(outcome.status, outcome.body);
  } catch (error) {
    console.error("submit_enquiry unreachable", error);
    return json(502, { ok: false, error: GENERIC });
  }
}
