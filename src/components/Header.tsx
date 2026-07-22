import Link from "next/link";
import { site, corePages } from "@/config/site";

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
            ☎ {site.phone}
          </a>
        </div>
        <nav aria-label="ניווט ראשי" className="flex flex-wrap gap-x-6 gap-y-1 pb-3 text-sm font-medium">
          {corePages.map((p) => (
            <Link key={p.slug} href={`/${p.slug}`} className="text-ink-700 hover:text-brand-600">
              {p.title}
            </Link>
          ))}
          <Link href="/shiputz-dira" className="text-ink-700 hover:text-brand-600">שיפוץ דירה</Link>
          <Link href="/shiputz-ambatya" className="text-ink-700 hover:text-brand-600">שיפוץ אמבטיה</Link>
          <Link href="/tsviat-dira" className="text-ink-700 hover:text-brand-600">צביעת דירה</Link>
          <Link href="/itum-gagot" className="text-ink-700 hover:text-brand-600">איטום גגות</Link>
        </nav>
      </div>
    </header>
  );
}
