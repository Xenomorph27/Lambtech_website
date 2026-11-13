import test from "node:test";
import assert from "node:assert/strict";
import {
  GENERIC,
  RATE_LIMITED,
  clientAddress,
  isHoneypot,
  outcomeFromRpc,
  rpcBody,
  validateEnquiry,
} from "./enquiry.ts";

const good = {
  name: "  Priya, Sharma & Co. ",
  email: " priya@sharma.in ",
  phone: " +91 98765-43210 ",
  topic: "Book a 15-minute discovery audit",
  page: "/ca",
  meta: { referrer: "https://google.com/", utm_source: "linkedin", junk: 42, other: "dropped" },
};

test("a good enquiry is trimmed and its meta is whitelisted", () => {
  const result = validateEnquiry(good);
  assert.equal(result.ok, true);
  assert.deepEqual(result.value, {
    name: "Priya, Sharma & Co.",
    email: "priya@sharma.in",
    phone: "+91 98765-43210",
    topic: "Book a 15-minute discovery audit",
    page: "/ca",
    meta: { referrer: "https://google.com/", utm_source: "linkedin" },
  });
});

test("topic and page are optional", () => {
  const result = validateEnquiry({ name: "A", email: "a@b.in", phone: "9876543210" });
  assert.equal(result.ok, true);
  assert.equal(result.value.topic, null);
  assert.equal(result.value.page, null);
  assert.deepEqual(result.value.meta, {});
});

for (const [field, value] of [
  ["name", ""],
  ["name", "   "],
  ["name", "x".repeat(201)],
  ["email", "not-an-email"],
  ["email", "a@b"],
  ["email", 42],
  ["phone", "12345"],
  ["phone", "9".repeat(16)],
  ["phone", undefined],
  ["topic", "t".repeat(201)],
  ["page", "/" + "p".repeat(300)],
]) {
  test(`rejects ${field} = ${JSON.stringify(value)?.slice(0, 24)}`, () => {
    const result = validateEnquiry({ ...good, [field]: value });
    assert.equal(result.ok, false);
    assert.equal(result.field, field);
    assert.ok(result.message.length > 0);
  });
}

for (const phone of ["+91 98765-43210", "(022) 2345 6789", "9876543210"]) {
  test(`accepts phone ${phone}`, () => assert.equal(validateEnquiry({ ...good, phone }).ok, true));
}

test("oversized meta values are dropped, not fatal", () => {
  const result = validateEnquiry({ ...good, meta: { referrer: "x".repeat(5000), utm_campaign: "ok" } });
  assert.deepEqual(result.value.meta, { utm_campaign: "ok" });
});

test("honeypot", () => {
  assert.equal(isHoneypot({ website: "http://spam.example" }), true);
  assert.equal(isHoneypot({ website: "   " }), false);
  assert.equal(isHoneypot({}), false);
});

test("rpcBody uses the database function's parameter names", () => {
  const { value } = validateEnquiry(good);
  assert.deepEqual(rpcBody(value, "s3cret", "hash"), {
    p_secret: "s3cret",
    p_name: "Priya, Sharma & Co.",
    p_email: "priya@sharma.in",
    p_phone: "+91 98765-43210",
    p_topic: "Book a 15-minute discovery audit",
    p_page: "/ca",
    p_meta: { referrer: "https://google.com/", utm_source: "linkedin" },
    p_ip_hash: "hash",
  });
});

test("outcomeFromRpc maps the database's answers", () => {
  assert.deepEqual(outcomeFromRpc(204, null), { status: 200, body: { ok: true } });
  assert.deepEqual(outcomeFromRpc(400, { message: "rate_limited" }), {
    status: 429,
    body: { ok: false, error: RATE_LIMITED },
  });
  const invalid = outcomeFromRpc(400, { message: "invalid_enquiry: phone" });
  assert.equal(invalid.status, 400);
  assert.equal(invalid.body.field, "phone");
  // Anything else, including a refused secret, is a generic failure: no internals leak.
  for (const [status, payload] of [[400, { message: "intake_refused" }], [404, { message: "no such function" }], [500, null], [401, "nope"]]) {
    assert.deepEqual(outcomeFromRpc(status, payload), { status: 502, body: { ok: false, error: GENERIC } });
  }
});

test("clientAddress takes the first forwarded address", () => {
  const from = (headers) => clientAddress((name) => headers[name] ?? null);
  assert.equal(from({ "x-forwarded-for": "203.0.113.7, 10.0.0.1" }), "203.0.113.7");
  assert.equal(from({ "x-real-ip": "203.0.113.9" }), "203.0.113.9");
  assert.equal(from({}), "unknown");
});
