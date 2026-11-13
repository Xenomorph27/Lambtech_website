import type { Metadata } from "next";
import { VerticalPage, type VerticalContent } from "@/components/Vertical";
import { BatchSimulator } from "@/components/widgets/BatchSimulator";

export const metadata: Metadata = {
  title: "GSTR-2B reconciliation automation for CA & tax firms",
  description:
    "Bulk invoice OCR, GSTIN validation and automated GSTR-2B matching with one-click Tally import. Built for 10–50 staff CA practices, live in 14 days.",
};

const content: VerticalContent = {
  eyebrow: "For CA & tax firms",
  headline: "Stop Losing 200+ Hours a Month to GSTR-2B Matching.",
  accent: ["200+", "Hours"],
  sub: "Your juniors download 2B JSONs, key scanned invoices into Tally and hunt for mismatched GSTINs by eye. We replace that with a pipeline that hands them only the exceptions.",
  before: "Days of downloading JSONs, typing invoices and eyeballing GSTINs.",
  after: "In the sample batch, 452 of 500 invoices come out Tally-ready.",
  cta: "Send Us 5 Sample Invoices for a Free Prototype",
  doc: {
    name: "INV-2026-089.pdf",
    rows: [
      { label: "Vendor", value: "Apex Logistics Ltd" },
      { label: "GSTIN", value: "29AABCA1234F1Z5" },
      { label: "Taxable value", value: "₹1,00,000" },
      { label: "IGST (18%)", value: "₹18,000" },
    ],
    chips: [
      { text: "GSTIN checksum valid", ok: true },
      { text: "Matched in GSTR-2B", ok: true },
      { text: "Tally ready", ok: true },
    ],
  },
  stats: [
    { to: 200, suffix: "+", label: "hours a month lost to manual 2B matching", tone: "red" },
    { to: 500, label: "invoices reconciled in a single batch" },
    { to: 90, suffix: "%", label: "come out clean and Tally-ready", tone: "green" },
    { to: 14, label: "days to a live pipeline" },
  ],
  checks: [
    { title: "GSTIN checksum", body: "Every GSTIN is validated against its check character before anything is matched." },
    { title: "GSTR-2B line match", body: "Each invoice is matched to the portal JSON on vendor, number and value." },
    { title: "Value mismatch flag", body: "A ₹48,000 portal entry against ₹50,000 in Tally is surfaced, not buried." },
    { title: "Missing-in-books flag", body: "Invoices your vendors filed but you never recorded are listed for follow-up." },
  ],
  faq: [
    { q: "Does it work with scanned and photographed invoices?", a: "Yes. Invoices are read by OCR whether they arrive as clean PDFs or scans. Extraction is tuned on your own samples until field accuracy passes 95% before go-live." },
    { q: "How do the results get into Tally?", a: "Clean vouchers export as Tally XML or Excel that Tally Prime imports directly. Your team does not re-key them." },
    { q: "What happens to the mismatches?", a: "They land on one exception review screen, split into value mismatches and invoices missing from your books, so a person can decide what to do with each." },
    { q: "Can it handle several clients' books?", a: "The pipeline is scoped around how your practice works. Tell us how you organise client folders in the audit call and we design the intake around that." },
  ],
  widgetTitle: "Batch reconciliation simulator",
  widgetSub: "500 purchase invoices against the GSTR-2B portal output.",
  flow: [
    {
      title: "Drop the folder",
      body: "Drag in a month of purchase invoices, or let the pipeline fetch them from a shared inbox. Scans and PDFs both work.",
    },
    {
      title: "Extract and validate",
      body: "Every invoice is read by OCR, each GSTIN is checksum-validated, and the register is matched line by line against GSTR-2B.",
    },
    {
      title: "Review only exceptions",
      body: "Around 90% comes out clean and Tally-ready. The rest lands on one review screen: value mismatches and invoices missing from your books.",
    },
  ],
  comparison: [
    {
      metric: "Data intake",
      manual: "Download PDFs and open JSON files manually",
      automated: "Bulk drop folder or auto-inbox fetch",
    },
    {
      metric: "Validation",
      manual: "Eyeball GSTINs and cross-check Excel lines",
      automated: "Automated checksum and GSTR-2B JSON match",
    },
    {
      metric: "Exception handling",
      manual: "Spreadsheet highlights and manual emailing",
      automated: "Centralized exception review screen for the 10%",
    },
    {
      metric: "ERP export",
      manual: "Manual voucher keying into Tally Prime",
      automated: "One-click XML / Excel direct Tally import",
    },
  ],
  closing:
    "Send five anonymized purchase invoices. We'll build a working extraction and matching prototype on your actual format before you commit to anything.",
};

export default function Page() {
  return <VerticalPage content={content} widget={<BatchSimulator />} />;
}
