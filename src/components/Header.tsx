import Link from "next/link";
import { site, serviceGroups, corePages } from "@/config/site";
import { getPageKeyword } from "@/lib/content";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between py-4 gap-4">
          <Link href="/" className="flex items-center gap-2" aria-label="שיפוצים לי - דף הבית">
            <span className="rounded-lg bg-brand-600 px-2.5 py-1 text-xl font-black text-white">
              שיפוצים
            </span>
            <span className="text-xl font-black text-ink-900">לי</span>
          </Link>
          <a
            href={`tel:${site.phoneIntl}`}
            className="rounded-lg bg-accent-600 px-4 py-2 text-sm font-bold text-white hover:bg-accent-700"
          >
            {site.phone}
          </a>
        </div>
        <nav aria-label="ניווט ראשי" className="flex flex-wrap items-center gap-x-5 gap-y-1 pb-3 text-sm font-medium">
          {corePages.map((p) => (
            <Link key={p.slug} href={`/${p.slug}`} className="py-1 text-ink-700 hover:text-brand-600">
              {p.title}
            </Link>
          ))}
          {serviceGroups.map((group) => (
            <details key={group.title} className="group relative">
              <summary className="cursor-pointer list-none py-1 text-ink-700 marker:content-none hover:text-brand-600 group-open:text-brand-600 group-open:underline group-open:underline-offset-4">
                {group.title}
              </summary>
              <ul className="absolute right-0 z-50 mt-1 max-h-96 min-w-56 overflow-y-auto rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
                {group.slugs.map((slug) => (
                  <li key={slug}>
                    <Link
                      href={`/${slug}`}
                      className="block px-4 py-2 text-ink-700 hover:bg-brand-50 hover:text-brand-600"
                    >
                      {getPageKeyword(slug)}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </nav>
      </div>
    </header>
  );
}
