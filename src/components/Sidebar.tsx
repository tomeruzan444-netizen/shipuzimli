import { site, serviceGroups } from "@/config/site";
import { getPageKeyword } from "@/lib/content";

interface SidebarProps {
  /** slugs של שירותים רלוונטיים לעמוד הנוכחי */
  services: string[];
  /** slugs של אזורי שירות (ריק בשלב זה - הרכיב כבר תומך) */
  areas?: string[];
  currentSlug?: string;
}

/** קבוצות גלובליות שמוצגות בסיידבר של כל עמודי האתר */
const PRICE_GROUP_TITLE = "מחירונים";
const CITY_GROUP_TITLE = "קבלן שיפוצים לפי עיר";
const TOP_CITIES_COUNT = 7; // ההאב + הערים הגדולות

export default function Sidebar({ services, areas = [], currentSlug }: SidebarProps) {
  const priceSlugs = serviceGroups.find((g) => g.title === PRICE_GROUP_TITLE)?.slugs ?? [];
  const citySlugs =
    serviceGroups.find((g) => g.title === CITY_GROUP_TITLE)?.slugs.slice(0, TOP_CITIES_COUNT) ?? [];

  return (
    <aside className="space-y-6 lg:w-72 lg:shrink-0" aria-label="ניווט משני">
      <SidebarList title="שירותים קשורים" slugs={services} currentSlug={currentSlug} />
      {areas.length > 0 && (
        <SidebarList title="אזורי שירות" slugs={areas} currentSlug={currentSlug} />
      )}

      {/* תיבת המחירונים - גלובלית בכל עמודי האתר */}
      <nav
        className="rounded-xl border border-navy-100 bg-navy-50 p-5"
        aria-label="מחירוני שיפוצים"
      >
        <h2 className="mb-3 border-b-2 border-brand-600 pb-2 text-lg font-bold text-navy-900">
          מחירוני 2026
        </h2>
        <ul className="space-y-2 text-sm">
          {priceSlugs
            .filter((slug) => slug !== currentSlug)
            .map((slug) => (
              <li key={slug}>
                <a href={`/${slug}`} className="text-ink-700 hover:text-brand-600">
                  {getPageKeyword(slug)}
                </a>
              </li>
            ))}
        </ul>
      </nav>

      {/* מדריכים לפי עיר - ההאב והערים המרכזיות */}
      <SidebarList title="מדריכים לפי עיר" slugs={citySlugs} currentSlug={currentSlug} />

      <div className="rounded-xl bg-navy-900 p-5 text-white">
        <h2 className="text-lg font-bold">רוצים הצעת מחיר?</h2>
        <p className="mt-1 text-sm text-slate-300">
          שלומי וצוות בעלי המקצוע זמינים לכל שאלה - בלי התחייבות.
        </p>
        <a
          href={`tel:${site.phoneIntl}`}
          className="mt-4 block rounded-lg bg-brand-600 py-2.5 text-center font-bold text-white hover:bg-brand-700"
        >
          חייגו: {site.phone}
        </a>
        <a
          href="/contact"
          className="mt-2 block rounded-lg border border-white/25 py-2.5 text-center text-sm font-bold hover:border-white/60 hover:bg-white/5"
        >
          או השאירו פרטים
        </a>
      </div>
    </aside>
  );
}

function SidebarList({
  title,
  slugs,
  currentSlug,
}: {
  title: string;
  slugs: string[];
  currentSlug?: string;
}) {
  const items = slugs.filter((s) => s !== currentSlug);
  if (items.length === 0) return null;
  return (
    <nav className="rounded-xl border border-slate-200 bg-slate-50 p-5" aria-label={title}>
      <h2 className="mb-3 border-b-2 border-navy-900 pb-2 text-lg font-bold text-navy-900">
        {title}
      </h2>
      <ul className="space-y-2 text-sm">
        {items.map((slug) => (
          <li key={slug}>
            <a href={`/${slug}`} className="text-ink-700 hover:text-brand-600">
              {getPageKeyword(slug)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
