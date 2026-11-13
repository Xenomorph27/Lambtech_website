/**
 * Site-wide settings. Fill in the blank contact fields — anything left
 * empty is simply not shown on the site.
 */
export const site = {
  name: "LambTech",
  tagline: "Productized operational engineering studio",
  location: "Mumbai, India",
  email: "", // e.g. "hello@lambtech.in"
  xHandle: "", // e.g. "LambTech" (without the @)
  linkedin: "", // full URL
  whatsapp: "", // digits only with country code, e.g. "919876543210"
  /** Web3Forms access key. Set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local */
  formKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",
};

export const verticals = [
  {
    href: "/ca",
    label: "CA & Tax",
    title: "CA & Tax Firms",
    blurb:
      "GSTR-2B reconciliation, invoice OCR and Tally-ready vouchers, with only the exceptions left for your team.",
    stat: "200+ hrs",
    statLabel: "saved a month on 2B matching",
  },
  {
    href: "/realestate",
    label: "Real Estate",
    title: "Real Estate Operations",
    blurb:
      "Joint-buyer TDS splits, pre-filled Form 26QB / 141 queues and Form 16B dispatch for every installment.",
    stat: "30+ fields",
    statLabel: "no longer typed per buyer",
  },
  {
    href: "/logistics",
    label: "Logistics",
    title: "Logistics & Supply Chain",
    blurb:
      "3-way audits across Bill of Lading, packing list and invoice, flagged before customs ever sees them.",
    stat: "3-way",
    statLabel: "cross-document audit on every file",
  },
] as const;
