import type { Metadata } from "next";
import { VerticalPage, type VerticalContent } from "@/components/Vertical";
import { TdsCalculator } from "@/components/widgets/TdsCalculator";

export const metadata: Metadata = {
  title: "Property TDS (Form 26QB / 141) automation for developers",
  description:
    "KYC extraction, joint-buyer 1% TDS split math, pre-filled Form 26QB / 141 queues and automatic Form 16B dispatch for real estate developers.",
};

const content: VerticalContent = {
  eyebrow: "For real estate developers",
  headline: "Automate Property TDS (Form 26QB / 141) Splits.",
  accent: ["Property", "TDS"],
  sub: "Hundreds of installments above ₹50 lakh, each with joint buyers, PANs and 30+ portal fields. We turn Section 194-IA compliance into a queue your team approves instead of types.",
  before: "30+ portal fields typed by hand for every buyer, every installment.",
  after: "Pre-filled challans and Form 16B certificates queued in one batch.",
  cta: "Get a Custom Walkthrough for Your Project",
  doc: {
    name: "Booking_TowerB-402.pdf",
    rows: [
      { label: "Unit", value: "Tower B, 402" },
      { label: "Total consideration", value: "₹85,00,000" },
      { label: "Installment paid", value: "₹10,00,000" },
      { label: "Buyer 1 (50%)", value: "ABCDE1234F" },
      { label: "Buyer 2 (50%)", value: "FGHIJ5678K" },
    ],
    chips: [
      { text: "PAN format valid", ok: true },
      { text: "TDS ₹5,000 + ₹5,000", ok: true },
      { text: "2 challans queued", ok: true },
    ],
  },
  stats: [
    { to: 1, suffix: "%", label: "TDS on every installment under Section 194-IA" },
    { to: 50, prefix: "₹", suffix: "L+", label: "property value where the rule applies" },
    { to: 30, suffix: "+", label: "portal fields typed per buyer today", tone: "red" },
    { to: 14, label: "days to a live pipeline", tone: "green" },
  ],
  checks: [
    { title: "PAN validation", body: "Buyer and seller PANs are format-checked as they are extracted from KYC." },
    { title: "Ownership split", body: "Shares must total 100% before any TDS is calculated." },
    { title: "Split math", body: "The 1% deduction is divided by share, to the rupee, across every joint buyer." },
    { title: "Certificate matching", body: "Each Form 16B is matched to its unit and buyer, then renamed and dispatched." },
  ],
  faq: [
    { q: "Does it handle joint buyers and joint sellers?", a: "Yes. The split engine divides TDS across any number of buyers and sellers by ownership percentage, which is where most manual calculator errors happen." },
    { q: "Does it file on the income tax portal for us?", a: "It prepares a batch of pre-filled Form 26QB / 141 entries so your team reviews and files, instead of typing 30+ fields per buyer." },
    { q: "How do buyers receive Form 16B?", a: "Certificates are renamed per unit and buyer, for example Unit-B402_Rahul_Form16B.pdf, and sent by email or WhatsApp." },
    { q: "We track bookings in Excel. Is that a problem?", a: "No. The pipeline is built around your existing booking sheet or ERP rather than replacing it." },
  ],
  widgetTitle: "1% TDS split calculator",
  widgetSub: "Change the installment or the ownership split and watch the challans update.",
  flow: [
    {
      title: "Extract KYC once",
      body: "Buyer names, PANs and agreement values are parsed from the booking PDFs and ID cards a single time, then reused for every installment.",
    },
    {
      title: "Split the TDS",
      body: "The 1% deduction is divided programmatically across joint buyers and sellers by ownership share. No calculator work.",
    },
    {
      title: "File and dispatch",
      body: "Pre-filled Form 26QB / 141 entries queue up for filing. Form 16B certificates are renamed per unit and buyer, then sent by email or WhatsApp.",
    },
  ],
  comparison: [
    {
      metric: "KYC extraction",
      manual: "Manual typing of buyer PAN and agreement data",
      automated: "Instant PDF / ID card OCR parsing",
    },
    {
      metric: "TDS split math",
      manual: "Calculator work across joint buyers and sellers",
      automated: "Automated percentage split engine",
    },
    {
      metric: "Challan preparation",
      manual: "Portal typing of 30+ fields per buyer",
      automated: "Batch pre-filled Form 26QB / 141 queue",
    },
    {
      metric: "Certificate delivery",
      manual: "Manual download, rename and individual email",
      automated: "Auto-matched PDF rename and email / WhatsApp dispatch",
    },
  ],
  closing:
    "Share how one of your projects handles installments today. We'll walk you through the same flow running on your own booking format.",
};

export default function Page() {
  return <VerticalPage content={content} widget={<TdsCalculator />} />;
}
