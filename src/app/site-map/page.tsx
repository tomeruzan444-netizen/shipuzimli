import type { Metadata } from "next";
import { site, serviceGroups, corePages, legalPages } from "@/config/site";
import { getPageKeyword } from "@/lib/content";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "מפת אתר - כל העמודים של שיפוצים לי",
  description:
    "מפת האתר של שיפוצים לי: כל מדריכי השיפוצים, המחירונים ועמודי הערים במקום אחד, מסודרים לפי קטגוריה.",
  alternates: { canonical: "/site-map" },
};

export default function SiteMapPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumbs crumbs={[{ title: "מפת אתר" }]} />
      <h1 className="text-3xl font-black text-navy-900 md:text-4xl">מפת אתר</h1>
      <p className="mt-3 max-w-2xl text-ink-700">
        כל העמודים של {site.name} במקום אחד - מדריכי שיפוצים, מחירונים, בעלי מקצוע
        ועמודי ערים, מסודרים לפי קטגוריה.
      </p>

      <div className="mt-8 columns-1 gap-8 sm:columns-2 lg:columns-3 [&>section]:mb-8 [&>section]:break-inside-avoid">
        <section>
          <h2 className="mb-3 border-b-2 border-brand-600 pb-2 text-lg font-bold text-navy-900">
            כללי
          </h2>
          <ul className="space-y-1.5 text-sm">
            {[...corePages, ...legalPages].map((p) => (
              <li key={p.slug}>
                <a href={`/${p.slug}`} className="text-ink-700 hover:text-brand-600">
                  {p.title}
                </a>
              </li>
            ))}
            <li>
              <a href="/site-map" className="text-ink-700 hover:text-brand-600">
                מפת אתר
              </a>
            </li>
          </ul>
        </section>

        {serviceGroups.map((group) => (
          <section key={group.title}>
            <h2 className="mb-3 border-b-2 border-brand-600 pb-2 text-lg font-bold text-navy-900">
              {group.title}
            </h2>
            <ul className="space-y-1.5 text-sm">
              {group.slugs.map((slug) => (
                <li key={slug}>
                  <a href={`/${slug}`} className="text-ink-700 hover:text-brand-600">
                    {getPageKeyword(slug)}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
