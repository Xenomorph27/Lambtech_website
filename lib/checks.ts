/** Indian-format number, e.g. 1000000 -> "10,00,000". */
export const inr = (n: number) => Math.round(n).toLocaleString("en-IN");

/**
 * ISO 6346 container number check.
 * Accepts "MSCU8839203", "MSCU 883920 3" or "MSCU-883920-3".
 */
export function checkContainer(input: string): {
  wellFormed: boolean;
  valid: boolean;
  expected: number | null;
} {
  const id = input.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!/^[A-Z]{4}\d{7}$/.test(id)) {
    return { wellFormed: false, valid: false, expected: null };
  }
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    const ch = id[i];
    let value: number;
    if (i < 4) {
      // A=10, B=12 ... letter values skip multiples of 11
      const n = ch.charCodeAt(0) - 65;
      value = 10 + n + Math.floor((n + 9) / 10);
    } else {
      value = Number(ch);
    }
    sum += value * 2 ** i;
  }
  const expected = (sum % 11) % 10;
  return { wellFormed: true, valid: expected === Number(id[10]), expected };
}
