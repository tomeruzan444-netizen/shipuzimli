import Link from "next/link";
import { site, serviceGroups, corePages, legalPages } from "@/config/site";
import { getPageKeyword } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="mt-16 bg-navy-950 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {serviceGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="mb-3 text-sm font-bold text-white">{group.title}</h2>
              <ul className="space-y-1.5 text-sm">
                {group.slugs.map((slug) => (
                  <li key={slug}>
                    <FooterLink slug={slug} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <nav aria-label="שיפוצים לי">
            <h2 className="mb-3 text-sm font-bold text-white">שיפוצים לי</h2>
            <ul className="space-y-1.5 text-sm">
              {[...corePages, ...legalPages].map((p) => (
                <li key={p.slug}>
                  <Link href={`/${p.slug}`} className="hover:text-white">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-10 border-t border-slate-700 pt-6 text-center text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {site.name} | טלפון:{" "}
            <a href={`tel:${site.phoneIntl}`} className="hover:text-white">{site.phone}</a>{" "}
            | דוא"ל:{" "}
            <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ slug }: { slug: string }) {
  return (
    <Link href={`/${slug}`} className="hover:text-white">
      {getPageKeyword(slug)}
    </Link>
  );
}
