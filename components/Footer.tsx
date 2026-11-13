import Image from "next/image";
import Link from "next/link";
import { site, verticals } from "@/lib/site";

export function Footer() {
  const contacts = [
    site.email && { label: site.email, href: `mailto:${site.email}` },
    site.whatsapp && { label: "WhatsApp", href: `https://wa.me/${site.whatsapp}` },
    site.xHandle && { label: `@${site.xHandle} on X`, href: `https://x.com/${site.xHandle}` },
    site.linkedin && { label: "LinkedIn", href: site.linkedin },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5 text-lg font-extrabold text-white">
            <span className="grid size-9 place-items-center rounded-full bg-white">
              <Image src="/logo.png" alt="" width={34} height={34} />
            </span>
            {site.name}
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            Custom automation pipelines on the tools you already run. Built and
            deployed in 14 days, with no per-seat fees.
          </p>
        </div>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-wider text-slate-500">
            Verticals
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {verticals.map((v) => (
              <li key={v.href}>
                <Link href={v.href} scroll={false} className="hover:text-white">
                  {v.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-wider text-slate-500">
            Contact
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {contacts.map((c) => (
              <li key={c.href}>
                <a href={c.href} className="hover:text-white" rel="noopener">
                  {c.label}
                </a>
              </li>
            ))}
            <li className="text-slate-400">{site.location}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-slate-500">
          © 2026 LambTech. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
