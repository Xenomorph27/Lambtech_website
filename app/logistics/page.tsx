import type { Metadata } from "next";
import { VerticalPage, type VerticalContent } from "@/components/Vertical";
import { BolAudit } from "@/components/widgets/BolAudit";

export const metadata: Metadata = {
  title: "Bill of Lading audit automation for freight forwarders & CHAs",
  description:
    "Inbox auto-parsing, 3-way cross-document audits and ISO 6346 container validation with a traffic-light exception screen before ERP sync.",
};

const content: VerticalContent = {
  eyebrow: "For freight forwarders & CHAs",
  headline: "Catch Bill of Lading Errors Before Customs Holds Your Cargo.",
  accent: ["Before", "Customs"],
  sub: "One wrong carton count or a single mistyped container digit can hold a shipment at port. We audit every document set automatically, before it reaches your ERP.",
  before: "Side-by-side visual checks, where a single-digit typo slips through.",
  after: "Every mismatch flagged on a traffic light before the ERP sync.",
  cta: "Test Our Parser on 5 Sample BoLs",
  doc: {
    name: "MSCU9876543_BoL.pdf",
    rows: [
      { label: "Master BoL", value: "MSCU9876543" },
      { label: "Container ID", value: "MSCU-883920-3" },
      { label: "Gross weight", value: "24,500 kg" },
      { label: "Packages (BoL)", value: "420 cartons" },
      { label: "Packages (packing list)", value: "400 cartons", flag: true },
    ],
    chips: [
      { text: "ISO 6346 valid", ok: true },
      { text: "Weight matches", ok: true },
      { text: "Carton count mismatch", ok: false },
    ],
  },
  stats: [
    { to: 3, label: "documents cross-audited on every shipment" },
    { to: 11, label: "container ID characters verified by check digit" },
    { to: 1, label: "click to sync an approved set to your ERP", tone: "green" },
    { to: 14, label: "days to a live pipeline" },
  ],
  checks: [
    { title: "ISO 6346 check digit", body: "A single mistyped container digit fails the check and is flagged immediately." },
    { title: "Package count", body: "Cartons on the BoL, packing list and invoice must agree." },
    { title: "Gross weight", body: "Weights are compared across all three documents." },
    { title: "Traffic-light gate", body: "Red sets cannot sync to the ERP until a person resolves them." },
  ],
  faq: [
    { q: "Which documents does it read?", a: "Bills of Lading, commercial packing lists and invoices, including multi-page scans, picked up from email attachments as they arrive." },
    { q: "What does a red alert actually show?", a: "The exact field that disagrees and the values on each document, for example 420 cartons on the BoL against 400 on the packing list." },
    { q: "Will it work with our transport ERP?", a: "Approved sets are exported in the schema your ERP or TMS imports. We confirm that format during scope lock." },
    { q: "Does it replace our documentation team?", a: "No. It removes the retyping and side-by-side checking, and leaves the judgement calls on flagged shipments to your team." },
  ],
  widgetTitle: "Traffic-light audit preview",
  widgetSub: "A 3-way check across Bill of Lading, packing list and invoice.",
  flow: [
    {
      title: "Capture from the inbox",
      body: "BoLs, packing lists and invoices are picked up from email attachments and parsed as they arrive, multi-page scans included.",
    },
    {
      title: "Cross-audit three ways",
      body: "Package counts, weights and references are compared across all three documents, and every container ID gets an ISO 6346 check-digit test.",
    },
    {
      title: "Approve on a traffic light",
      body: "Green sets sync to your transport ERP in one click. Red sets are held with the exact discrepancy shown, while there is still time to fix it.",
    },
  ],
  comparison: [
    {
      metric: "Document receipt",
      manual: "Manual email checking and attachment download",
      automated: "Inbox auto-parsing of BoLs and packing lists",
    },
    {
      metric: "Audit protocol",
      manual: "Side-by-side paper or screen visual checks",
      automated: "Automated 3-way cross-document audit",
    },
    {
      metric: "Validation check",
      manual: "Prone to single-digit container ID typos",
      automated: "Automated ISO 6346 check-digit verification",
    },
    {
      metric: "TMS system entry",
      manual: "Manual retyping into internal transport ERP",
      automated: "Traffic-light approved 1-click ERP sync",
    },
  ],
  closing:
    "Send five sample Bills of Lading with their packing lists. We'll run them through the parser and show you what it catches.",
};

export default function Page() {
  return <VerticalPage content={content} widget={<BolAudit />} />;
}
