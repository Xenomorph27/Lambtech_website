# LambTech website v2 — design spec (2026-11-12)

Source: "LambTech Master Operating Plan & Website Architecture Blueprint".

## Positioning
Productized operational engineering studio. Custom human-in-the-loop automation
pipelines on the client's existing ERP / Tally / spreadsheets, delivered in 14 days,
no per-seat SaaS fees. v1 "AI consultancy" content is retired.

## Look
- Light pages (slate-50 / white), slate-900 text, indigo `#6366F1` as the only accent.
- Dark slate `#0F172A` reserved for the interactive data widgets and the footer.
- Manrope for text, JetBrains Mono for data.
- Motion (React Bits-inspired, hand-rolled, no animation dependency): blur-in hero
  text, count-up metrics, spotlight cards, dot-grid hero with cursor glow, scroll reveals.
  All disabled under `prefers-reduced-motion`.

## Routes
| Route | Widget | CTA |
|---|---|---|
| `/` | 3 routing cards, 14-day timeline | Book a call |
| `/ca` | Batch simulator (500 → 452 / 34 / 14) | Send Us 5 Sample Invoices for a Free Prototype |
| `/realestate` | 1% TDS split calculator + Form 16B queue | Get a Custom Walkthrough for Your Project |
| `/logistics` | Traffic-light 3-way audit + ISO 6346 check | Test Our Parser on 5 Sample BoLs |

Each vertical page: hero → widget → 3-step flow → manual vs automated table → CTA.

## Shared
- Sticky nav, footer, global 2-field booking modal (Name/Firm, Email/WhatsApp).
- Modal posts to Web3Forms using `NEXT_PUBLIC_WEB3FORMS_KEY` (see `.env.example`).
- Contact details live in `lib/site.ts`.

## Open items
- Contact email / X handle / LinkedIn (blank in `lib/site.ts` until provided).
- Web3Forms access key.
