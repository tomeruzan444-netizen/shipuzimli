import { site, serviceGroups, corePages } from "@/config/site";
import { getPageKeyword } from "@/lib/content";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between py-4 gap-4">
          <a href="/" className="flex items-center gap-2" aria-label="שיפוצים לי - דף הבית">
            <span className="rounded-lg bg-navy-900 px-2.5 py-1 text-xl font-black text-white">
              שיפוצים
            </span>
            <span className="text-xl font-black text-brand-600">לי</span>
          </a>
          <a
            href={`tel:${site.phoneIntl}`}
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-bold text-white hover:bg-brand-700"
          >
            {site.phone}
          </a>
        </div>
        <nav aria-label="ניווט ראשי" className="flex flex-wrap items-center gap-x-5 gap-y-1 pb-3 text-sm font-medium">
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
    </header>
  );
}
