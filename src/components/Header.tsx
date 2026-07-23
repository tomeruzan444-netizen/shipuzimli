import { site, serviceGroups, corePages } from "@/config/site";
import { getPageKeyword } from "@/lib/content";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      {/* צ׳קבוקס נסתר שמפעיל את תפריט המובייל - CSS בלבד, ללא JavaScript */}
      <input id="mobile-nav" type="checkbox" className="peer hidden" aria-hidden />
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between gap-3 py-4">
          <a href="/" className="flex items-center gap-2" aria-label="שיפוצים לי - דף הבית">
            <span className="rounded-lg bg-navy-900 px-2.5 py-1 text-xl font-black text-white">
              שיפוצים
            </span>
            <span className="text-xl font-black text-brand-600">לי</span>
          </a>
          <div className="flex items-center gap-2">
            <a
              href={`tel:${site.phoneIntl}`}
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-bold text-white hover:bg-brand-700"
            >
              {site.phone}
            </a>
            <label
              htmlFor="mobile-nav"
              aria-label="פתיחת תפריט ניווט"
              className="cursor-pointer rounded-lg border border-slate-200 p-2 text-navy-900 md:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
                className="h-6 w-6"
              >
                <path d="M4 7h16 M4 12h16 M4 17h16" />
              </svg>
            </label>
          </div>
        </div>

        {/* ניווט דסקטופ - דרופדאונים במעבר עכבר */}
        <nav
          aria-label="ניווט ראשי"
          className="hidden flex-wrap items-center gap-x-5 gap-y-1 pb-3 text-sm font-medium md:flex"
        >
          {corePages.map((p) => (
            <a key={p.slug} href={`/${p.slug}`} className="py-1 text-ink-700 hover:text-brand-600">
              {p.title}
            </a>
          ))}
          {serviceGroups.map((group) => (
            <div key={group.title} className="group relative">
              <button
                type="button"
                aria-haspopup="true"
                className="flex cursor-pointer items-center gap-1 py-1 text-ink-700 hover:text-brand-600 group-focus-within:text-brand-600 group-hover:text-brand-600"
              >
                {group.title}
                <span
                  aria-hidden
                  className="text-[0.6rem] transition-transform group-focus-within:rotate-180 group-hover:rotate-180"
                >
                  &#x25BC;
                </span>
              </button>
              <ul className="invisible absolute right-0 z-50 max-h-96 min-w-56 overflow-y-auto rounded-b-xl border border-slate-200 bg-white py-2 opacity-0 shadow-lg transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                {group.slugs.map((slug) => (
                  <li key={slug}>
                    <a
                      href={`/${slug}`}
                      className="block px-4 py-2 text-ink-700 hover:bg-brand-50 hover:text-brand-600"
                    >
                      {getPageKeyword(slug)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* תפריט מובייל - נפתח מכפתור ההמבורגר, אקורדיון לכל קבוצה */}
      <nav
        aria-label="ניווט ראשי למובייל"
        className="hidden max-h-[75vh] overflow-y-auto border-t border-slate-200 bg-white px-4 pb-4 peer-checked:block md:peer-checked:hidden"
      >
        <ul className="divide-y divide-slate-100">
          {corePages.map((p) => (
            <li key={p.slug}>
              <a href={`/${p.slug}`} className="block py-3 font-medium text-navy-900">
                {p.title}
              </a>
            </li>
          ))}
          {serviceGroups.map((group) => (
            <li key={group.title}>
              <details className="group/acc">
                <summary className="flex cursor-pointer list-none items-center justify-between py-3 font-medium text-navy-900 marker:content-none">
                  {group.title}
                  <span
                    aria-hidden
                    className="text-[0.6rem] text-ink-500 transition-transform group-open/acc:rotate-180"
                  >
                    &#x25BC;
                  </span>
                </summary>
                <ul className="pb-2 pr-3">
                  {group.slugs.map((slug) => (
                    <li key={slug}>
                      <a href={`/${slug}`} className="block py-2 text-sm text-ink-700">
                        {getPageKeyword(slug)}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
