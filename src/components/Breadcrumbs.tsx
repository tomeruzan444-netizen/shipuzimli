import JsonLd from "@/components/JsonLd";
import { site } from "@/config/site";

export interface Crumb {
  title: string;
  href?: string;
}

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const all: Crumb[] = [{ title: "דף הבית", href: "/" }, ...crumbs];
  return (
    <>
      <nav aria-label="פירורי לחם" className="mb-4 text-sm text-ink-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((c, i) => (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden>›</span>}
              {c.href ? (
                <a href={c.href} className="hover:text-brand-600">
                  {c.title}
                </a>
              ) : (
                <span aria-current="page" className="font-medium text-ink-700">
                  {c.title}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.title,
            ...(c.href ? { item: `${site.url}${c.href}` } : {}),
          })),
        }}
      />
    </>
  );
}
