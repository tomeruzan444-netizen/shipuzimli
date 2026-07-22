import Link from "next/link";
import { site } from "@/config/site";
import { getPageTitle } from "@/lib/content";

interface SidebarProps {
  /** slugs של שירותים רלוונטיים לעמוד הנוכחי */
  services: string[];
  /** slugs של אזורי שירות (ריק בשלב זה — הרכיב כבר תומך) */
  areas?: string[];
  currentSlug?: string;
}

export default function Sidebar({ services, areas = [], currentSlug }: SidebarProps) {
  return (
    <aside className="space-y-6 lg:w-72 lg:shrink-0" aria-label="ניווט משני">
      <SidebarList title="שירותים קשורים" slugs={services} currentSlug={currentSlug} />
      {areas.length > 0 && (
        <SidebarList title="אזורי שירות" slugs={areas} currentSlug={currentSlug} />
      )}
      <div className="rounded-xl bg-brand-600 p-5 text-white">
        <h2 className="text-lg font-bold">רוצים הצעת מחיר?</h2>
        <p className="mt-1 text-sm text-brand-100">
          שלומי וצוות בעלי המקצוע זמינים לכל שאלה — בלי התחייבות.
        </p>
        <a
          href={`tel:${site.phoneIntl}`}
          className="mt-4 block rounded-lg bg-white py-2.5 text-center font-bold text-brand-700 hover:bg-brand-50"
        >
          חייגו: {site.phone}
        </a>
        <Link
          href="/צור-קשר"
          className="mt-2 block rounded-lg border border-white/60 py-2.5 text-center text-sm font-bold hover:bg-brand-700"
        >
          או השאירו פרטים
        </Link>
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
      <h2 className="mb-3 border-b border-brand-500 pb-2 text-lg font-bold text-ink-900">
        {title}
      </h2>
      <ul className="space-y-2 text-sm">
        {items.map((slug) => (
          <li key={slug}>
            <Link
              href={`/${slug}`}
              className="flex items-center gap-2 text-ink-700 hover:text-brand-600"
            >
              <span aria-hidden className="text-brand-500">‹</span>
              {getPageTitle(slug)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
