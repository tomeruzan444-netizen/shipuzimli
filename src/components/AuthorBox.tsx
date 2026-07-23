import { site } from "@/config/site";

/** שורת סמכות קומפקטית - מוצגת מתחת לכותרת העמוד */
export function ReviewedByLine() {
  return (
    <p className="mt-2 text-sm text-ink-500">
      נכתב על ידי צוות {site.name} · נבדק מקצועית על ידי{" "}
      <a href="/about" className="font-medium text-navy-700 underline underline-offset-2 hover:text-brand-600">
        {site.founder}
      </a>
      , קבלן שיפוצים עם {site.founderYears}+ שנות ניסיון
    </p>
  );
}

/** תיבת המומחה - מוצגת בסוף כל מאמר */
export function AuthorBox() {
  return (
    <aside className="mt-10 rounded-xl border border-slate-200 bg-navy-50 p-6" aria-label="על הכותב">
      <div className="flex items-start gap-4">
        <div
          aria-hidden
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xl font-black text-white"
        >
          {site.founder.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-bold text-brand-600">הסמכות המקצועית מאחורי המדריך</p>
          <h2 className="mt-0.5 text-lg font-bold text-navy-900">{site.founder}</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-700">
            קבלן שיפוצים פעיל יותר מ-{site.founderYears} שנה: איטום, ריצוף, צבע וסיוד,
            עבודות גבס, שיפוץ אמבטיות ומטבחים. המדריכים באתר נכתבים על בסיס פרויקטים
            אמיתיים מהשטח, והמחירים מתעדכנים מול עבודות שבוצעו בפועל.
          </p>
          <a
            href="/about"
            className="mt-2 inline-block text-sm font-bold text-navy-700 underline underline-offset-2 hover:text-brand-600"
          >
            להיכרות עם הצוות המלא
          </a>
        </div>
      </div>
    </aside>
  );
}
