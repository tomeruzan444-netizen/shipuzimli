import Link from "next/link";
import { site, serviceGroups } from "@/config/site";
import { getPageKeyword, getPageBySlug } from "@/lib/content";

/** צבע ייחודי לכל קבוצת שירותים בכרטיסים */
const GROUP_STYLES = [
  "border-t-orange-500",
  "border-t-sky-500",
  "border-t-violet-500",
  "border-t-rose-500",
  "border-t-teal-500",
  "border-t-green-600",
];

const HIGHLIGHTS = [
  { color: "border-r-amber-400", title: "בעלי מקצוע מומלצים", text: "רק קבלנים אמינים עם תודעת שירות גבוהה" },
  { color: "border-r-sky-400", title: "חוסכים לכם זמן", text: "במקום שעות של חיפושים - מענה תוך רגעים ספורים" },
  { color: "border-r-green-500", title: "מוזילים עלויות", text: "השוואת מחירים שקופה שמשאירה כסף בכיס" },
  { color: "border-r-rose-400", title: "שירות עם חיוך", text: "ליווי אישי של שלומי וצוותו לאורך כל הדרך" },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-l from-brand-700 via-brand-600 to-amber-500 text-white">
        <div aria-hidden className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div aria-hidden className="absolute -bottom-24 right-10 h-80 w-80 rounded-full bg-amber-300/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center md:py-24">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-bold backdrop-blur">
            משפצים? תחסכו!
          </span>
          <h1 className="mt-4 text-4xl font-black md:text-5xl">הגעתם למקום הנכון</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-100">
            שיפוצים לי מחברת אתכם לקבלני שיפוצים מנוסים בכל הארץ, עם מידע מקיף
            ומחירים שקופים לכל שירות - כדי שתשפצו בראש שקט ובמחיר הוגן.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${site.phoneIntl}`}
              className="rounded-lg bg-white px-6 py-3 text-lg font-bold text-brand-700 shadow-lg transition hover:scale-105 hover:bg-brand-50"
            >
              חייגו: {site.phone}
            </a>
            <Link
              href="/contact"
              className="rounded-lg border-2 border-white px-6 py-3 text-lg font-bold transition hover:scale-105 hover:bg-white/10"
            >
              קבלו הצעת מחיר
            </Link>
          </div>
          <p className="mt-5 text-sm text-brand-100">
            בחינם וללא התחייבות &nbsp;•&nbsp; מענה מהיר &nbsp;•&nbsp; פריסה ארצית
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((h) => (
            <li key={h.title} className={`rounded-xl border border-slate-100 border-r-4 ${h.color} bg-white p-4 shadow-sm`}>
              <h2 className="font-bold text-ink-900">{h.title}</h2>
              <p className="mt-0.5 text-sm text-ink-500">{h.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-center text-3xl font-black text-ink-900">
          כל שירותי השיפוצים <span className="text-brand-600">במקום אחד</span>
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-ink-500">
          בחרו שירות כדי לקרוא מדריך מלא עם מחירים מעודכנים, טיפים ותשובות לשאלות נפוצות.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceGroups.map((group, i) => (
            <div
              key={group.title}
              className={`rounded-xl border border-slate-200 border-t-4 ${GROUP_STYLES[i % GROUP_STYLES.length]} bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md`}
            >
              <h3 className="mb-3 border-b border-slate-100 pb-3 text-lg font-bold text-ink-900">
                {group.title}
              </h3>
              <ul className="space-y-2 text-sm">
                {group.slugs.map((slug) => (
                  <li key={slug}>
                    <Link href={`/${slug}`} className="text-ink-700 hover:text-brand-600">
                      <ServiceLinkTitle slug={slug} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-l from-slate-50 to-brand-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="text-sm font-bold text-brand-600">הסיפור שלנו</span>
              <h2 className="mt-1 text-3xl font-black text-ink-900">מי מאחורי שיפוצים לי?</h2>
              <p className="mt-4 leading-relaxed text-ink-700">
                את הפלטפורמה הקים <strong>{site.founder}</strong> - קבלן שיפוצים עם{" "}
                {site.founderYears} שנות ניסיון בשטח: איטום, ריצוף, צבע וסיוד, שיפוץ
                מרפסות, אמבטיות ומטבחים, ומומחיות מיוחדת בעבודות גבס.
              </p>
              <p className="mt-3 leading-relaxed text-ink-700">
                אחרי שנים של עבודה מול לקוחות, שלומי הבין שהדבר שהכי חסר בשוק הוא
                שקיפות: מחירים ברורים, מידע אמין, ובעלי מקצוע שאפשר לסמוך עליהם.
                בדיוק בשביל זה קמה שיפוצים לי - ותמיד עם חיוך גדול.
              </p>
              <Link
                href="/about"
                className="mt-5 inline-block rounded-lg bg-brand-600 px-5 py-2.5 font-bold text-white shadow transition hover:scale-105 hover:bg-brand-700"
              >
                עוד עלינו
              </Link>
            </div>
            <ul className="grid grid-cols-2 gap-4 text-center">
              {[
                { num: "20+", label: "שנות ניסיון בשטח", color: "text-brand-600" },
                { num: "100%", label: "שקיפות במחירים", color: "text-green-600" },
                { num: "כל הארץ", label: "פריסת שירות", color: "text-sky-600" },
                { num: "בחינם", label: "הצעת מחיר ראשונית", color: "text-violet-600" },
              ].map((stat) => (
                <li key={stat.label} className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md">
                  <div className={`text-2xl font-black ${stat.color}`}>{stat.num}</div>
                  <div className="mt-1 text-sm text-ink-500">{stat.label}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-center text-3xl font-black text-ink-900">
          איך זה <span className="text-brand-600">עובד?</span>
        </h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              circle: "bg-brand-600",
              title: "מספרים לנו מה צריך",
              text: "משאירים פרטים או מתקשרים, ומתארים בקצרה את השיפוץ המבוקש - מצביעת חדר ועד שיפוץ דירה מלא.",
            },
            {
              circle: "bg-sky-600",
              title: "מקבלים מידע ומחיר",
              text: "אנחנו מכווינים אתכם לבעל המקצוע המתאים, עם מידע מלא על העבודה וטווח מחירים ריאלי מראש.",
            },
            {
              circle: "bg-green-600",
              title: "קובעים פגישה ומתחילים",
              text: "מתאמים פגישה עם בעל המקצוע, סוגרים הצעת מחיר מסודרת - והשיפוץ יוצא לדרך.",
            },
          ].map((step, i) => (
            <li key={step.title} className="relative rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full text-lg font-black text-white ${step.circle}`}>
                {i + 1}
              </div>
              <h3 className="text-lg font-bold text-ink-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-l from-green-700 to-accent-600 text-white">
        <div aria-hidden className="absolute -top-10 left-1/4 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="relative mx-auto max-w-6xl px-4 py-12 text-center">
          <h2 className="text-2xl font-black md:text-3xl">מוכנים להתחיל לשפץ?</h2>
          <p className="mx-auto mt-2 max-w-xl text-green-100">
            שיחה אחת - וכל המידע, המחירים ובעל המקצוע הנכון אצלכם ביד.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${site.phoneIntl}`}
              className="rounded-lg bg-white px-6 py-3 font-bold text-green-700 shadow-lg transition hover:scale-105"
            >
              {site.phone}
            </a>
            <Link
              href="/contact"
              className="rounded-lg border-2 border-white px-6 py-3 font-bold transition hover:scale-105 hover:bg-white/10"
            >
              השאירו פרטים
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceLinkTitle({ slug }: { slug: string }) {
  return <>{getPageBySlug(slug) ? getPageKeyword(slug) : slug.replace(/-/g, " ")}</>;
}
