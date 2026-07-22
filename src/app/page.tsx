import Link from "next/link";
import { site, serviceGroups } from "@/config/site";
import { getPageTitle, getPageBySlug } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <section className="bg-gradient-to-l from-brand-600 to-brand-500 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center md:py-24">
          <h1 className="text-4xl font-black md:text-5xl">משפצים? הגעתם למקום הנכון</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-100">
            שיפוצים לי מחברת אתכם לקבלני שיפוצים מנוסים בכל הארץ, עם מידע מקיף
            ומחירים שקופים לכל שירות — כדי שתשפצו בראש שקט ובמחיר הוגן.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${site.phoneIntl}`}
              className="rounded-lg bg-white px-6 py-3 text-lg font-bold text-brand-700 hover:bg-brand-50"
            >
              חייגו: {site.phone}
            </a>
            <Link
              href="/צור-קשר"
              className="rounded-lg border-2 border-white px-6 py-3 text-lg font-bold hover:bg-brand-700"
            >
              קבלו הצעת מחיר
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-center text-3xl font-black text-ink-900">
          כל שירותי השיפוצים במקום אחד
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-ink-500">
          בחרו שירות כדי לקרוא מדריך מלא עם מחירים מעודכנים, טיפים ותשובות לשאלות נפוצות.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceGroups.map((group) => (
            <div key={group.title} className="rounded-xl border border-slate-200 p-5">
              <h3 className="mb-3 border-b border-brand-500 pb-2 text-lg font-bold text-ink-900">
                {group.title}
              </h3>
              <ul className="space-y-2 text-sm">
                {group.slugs.map((slug) => (
                  <li key={slug}>
                    <Link
                      href={`/${slug}`}
                      className="flex items-center gap-2 text-ink-700 hover:text-brand-600"
                    >
                      <span aria-hidden className="text-brand-500">‹</span>
                      <ServiceLinkTitle slug={slug} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-black text-ink-900">מי מאחורי שיפוצים לי?</h2>
              <p className="mt-4 leading-relaxed text-ink-700">
                את הפלטפורמה הקים <strong>{site.founder}</strong> — קבלן שיפוצים עם{" "}
                {site.founderYears} שנות ניסיון בשטח: איטום, ריצוף, צבע וסיוד, שיפוץ
                מרפסות, אמבטיות ומטבחים, ומומחיות מיוחדת בעבודות גבס.
              </p>
              <p className="mt-3 leading-relaxed text-ink-700">
                אחרי שנים של עבודה מול לקוחות, שלומי הבין שהדבר שהכי חסר בשוק הוא
                שקיפות: מחירים ברורים, מידע אמין, ובעלי מקצוע שאפשר לסמוך עליהם.
                בדיוק בשביל זה קמה שיפוצים לי — ותמיד עם חיוך גדול.
              </p>
              <Link
                href="/אודות"
                className="mt-5 inline-block rounded-lg bg-brand-600 px-5 py-2.5 font-bold text-white hover:bg-brand-700"
              >
                עוד עלינו
              </Link>
            </div>
            <ul className="grid grid-cols-2 gap-4 text-center">
              {[
                { num: "20+", label: "שנות ניסיון בשטח" },
                { num: "100%", label: "שקיפות במחירים" },
                { num: "כל הארץ", label: "פריסת שירות" },
                { num: "ללא עלות", label: "הצעת מחיר ראשונית" },
              ].map((stat) => (
                <li key={stat.label} className="rounded-xl bg-white p-6 shadow-sm">
                  <div className="text-2xl font-black text-brand-600">{stat.num}</div>
                  <div className="mt-1 text-sm text-ink-500">{stat.label}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-center text-3xl font-black text-ink-900">איך זה עובד?</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "מספרים לנו מה צריך",
              text: "משאירים פרטים או מתקשרים, ומתארים בקצרה את השיפוץ המבוקש — מצביעת חדר ועד שיפוץ דירה מלא.",
            },
            {
              title: "מקבלים מידע ומחיר",
              text: "אנחנו מכווינים אתכם לבעל המקצוע המתאים, עם מידע מלא על העבודה וטווח מחירים ריאלי מראש.",
            },
            {
              title: "קובעים פגישה ומתחילים",
              text: "מתאמים פגישה עם בעל המקצוע, סוגרים הצעת מחיר מסודרת — והשיפוץ יוצא לדרך.",
            },
          ].map((step, i) => (
            <li key={step.title} className="rounded-xl border border-slate-200 p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-lg font-black text-white">
                {i + 1}
              </div>
              <h3 className="text-lg font-bold text-ink-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

function ServiceLinkTitle({ slug }: { slug: string }) {
  return <>{getPageBySlug(slug) ? getPageTitle(slug) : slug.replace(/-/g, " ")}</>;
}
