import type { Heading } from "@/lib/content";

/**
 * תוכן עניינים מינימליסטי כאקורדיון (details/summary, ללא JavaScript).
 * מקשר לכותרות ה-H2 של העמוד דרך anchor-ים - התשתית שגוגל משתמש בה
 * להצגת sitelinks של "מעבר אל" בתוצאות החיפוש.
 */
export default function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length < 3) return null;

  return (
    <details className="group mb-8 overflow-hidden rounded-xl border border-slate-200 open:border-navy-100 open:bg-navy-50">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-3.5 marker:content-none">
        <span className="flex items-center gap-2.5 font-bold text-navy-900">
          <span aria-hidden className="h-4 w-1 rounded-full bg-brand-600" />
          תוכן העמוד
        </span>
        <span
          aria-hidden
          className="text-[0.65rem] text-ink-500 transition-transform group-open:rotate-180"
        >
          &#x25BC;
        </span>
      </summary>
      <nav aria-label="תוכן העמוד" className="border-t border-navy-100 px-5 py-3">
        <ol className="space-y-0.5 text-sm">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className="block rounded-md py-1.5 pr-3 text-ink-700 transition hover:bg-white hover:text-brand-600"
              >
                {h.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </details>
  );
}
