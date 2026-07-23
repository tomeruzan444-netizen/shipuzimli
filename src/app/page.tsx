import Link from "next/link";
import { site, serviceGroups } from "@/config/site";
import { getPageKeyword, getPageBySlug } from "@/lib/content";

const CITY_GROUP_TITLE = "קבלן שיפוצים לפי עיר";

const HIGHLIGHTS = [
  { title: "בעלי מקצוע מומלצים", text: "רק קבלנים אמינים עם תודעת שירות גבוהה" },
  { title: "חוסכים לכם זמן", text: "במקום שעות של חיפושים - מענה תוך רגעים ספורים" },
  { title: "מוזילים עלויות", text: "השוואת מחירים שקופה שמשאירה כסף בכיס" },
  { title: "שירות עם חיוך", text: "ליווי אישי של שלומי וצוותו לאורך כל הדרך" },
];

export default function HomePage() {
  const serviceGroupsOnly = serviceGroups.filter((g) => g.title !== CITY_GROUP_TITLE);
  const cityGroup = serviceGroups.find((g) => g.title === CITY_GROUP_TITLE);
  const cityHubSlug = cityGroup?.slugs[0];
  const citySlugs = cityGroup?.slugs.slice(1) ?? [];

  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(31,58,99,0.55),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(234,88,12,0.16),_transparent_50%)]"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="mb-4 inline-block border-r-4 border-brand-500 pr-3 text-sm font-bold tracking-wide text-brand-500">
              הפלטפורמה שמחברת אתכם לקבלנים הנכונים
            </p>
            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              משפצים בראש שקט,
              <br />
              <span className="text-brand-500">במחיר הוגן.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              שיפוצים לי מחברת אתכם לקבלני שיפוצים מנוסים בכל הארץ, עם מידע מקיף
              ומחירים שקופים לכל שירות - מצביעת חדר ועד בניית בית.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`tel:${site.phoneIntl}`}
                className="rounded-lg bg-brand-600 px-7 py-3.5 text-lg font-bold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
              >
                חייגו: {site.phone}
              </a>
              <Link
                href="/contact"
                className="rounded-lg border border-white/25 px-7 py-3.5 text-lg font-bold text-white transition hover:border-white/60 hover:bg-white/5"
              >
                קבלו הצעת מחיר
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-400">
              בחינם וללא התחייבות · מענה מהיר · פריסה ארצית
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map((h) => (
              <li key={h.title} className="border-t-2 border-navy-900 pt-4">
                <h2 className="font-bold text-navy-900">{h.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{h.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 max-w-2xl">
          <p className="mb-2 text-sm font-bold text-brand-600">השירותים שלנו</p>
          <h2 className="text-3xl font-black text-navy-900 md:text-4xl">
            כל שירותי השיפוצים במקום אחד
          </h2>
          <p className="mt-3 text-ink-500">
            בחרו שירות כדי לקרוא מדריך מלא עם מחירים מעודכנים, טיפים ותשובות לשאלות נפוצות.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceGroupsOnly.map((group) => (
            <div
              key={group.title}
              className="rounded-xl border border-slate-200 bg-white p-6 transition hover:border-navy-700 hover:shadow-md"
            >
              <h3 className="mb-1 text-lg font-bold text-navy-900">{group.title}</h3>
              <div aria-hidden className="mb-4 h-0.5 w-8 bg-brand-600" />
              <ul className="space-y-2.5 text-sm">
                {group.slugs.map((slug) => (
                  <li key={slug}>
                    <Link
                      href={`/${slug}`}
                      className="text-ink-700 transition hover:text-brand-600"
                    >
                      <ServiceLinkTitle slug={slug} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {cityGroup && (
        <section className="bg-navy-50">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <p className="mb-2 text-sm font-bold text-brand-600">פריסה ארצית</p>
                <h2 className="text-3xl font-black text-navy-900">קבלן שיפוצים לפי עיר</h2>
                <p className="mt-3 text-ink-500">
                  מדריך מקומי לכל עיר: מחירים אזוריים, מאפייני הבנייה המקומית וקבלנים
                  שמכירים את השטח.
                </p>
              </div>
              {cityHubSlug && (
                <Link
                  href={`/${cityHubSlug}`}
                  className="rounded-lg bg-navy-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-navy-800"
                >
                  למדריך המלא
                </Link>
              )}
            </div>
            <ul className="flex flex-wrap gap-2.5">
              {citySlugs.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/${slug}`}
                    className="inline-block rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-navy-900 transition hover:border-brand-600 hover:text-brand-600"
                  >
                    <ServiceLinkTitle slug={slug} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-bold text-brand-600">הסיפור שלנו</p>
            <h2 className="text-3xl font-black text-navy-900">מי מאחורי שיפוצים לי?</h2>
            <p className="mt-5 leading-relaxed text-ink-700">
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
              className="mt-6 inline-block rounded-lg bg-brand-600 px-6 py-3 font-bold text-white transition hover:bg-brand-700"
            >
              עוד עלינו
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-4">
            {[
              { num: "20+", label: "שנות ניסיון בשטח" },
              { num: "100%", label: "שקיפות במחירים" },
              { num: "כל הארץ", label: "פריסת שירות" },
              { num: "בחינם", label: "הצעת מחיר ראשונית" },
            ].map((stat) => (
              <li
                key={stat.label}
                className="rounded-xl border border-slate-200 bg-white p-6 text-center"
              >
                <div className="text-3xl font-black text-navy-900">{stat.num}</div>
                <div className="mt-1.5 text-sm text-ink-500">{stat.label}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold text-brand-600">פשוט בשלושה שלבים</p>
            <h2 className="text-3xl font-black text-navy-900">איך זה עובד?</h2>
          </div>
          <ol className="grid gap-10 md:grid-cols-3">
            {[
              {
                title: "מספרים לנו מה צריך",
                text: "משאירים פרטים או מתקשרים, ומתארים בקצרה את השיפוץ המבוקש - מצביעת חדר ועד שיפוץ דירה מלא.",
              },
              {
                title: "מקבלים מידע ומחיר",
                text: "אנחנו מכווינים אתכם לבעל המקצוע המתאים, עם מידע מלא על העבודה וטווח מחירים ריאלי מראש.",
              },
              {
                title: "קובעים פגישה ומתחילים",
                text: "מתאמים פגישה עם בעל המקצוע, סוגרים הצעת מחיר מסודרת - והשיפוץ יוצא לדרך.",
              },
            ].map((step, i) => (
              <li key={step.title}>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-navy-900 text-lg font-black text-white">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold text-navy-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-navy-950 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h2 className="text-3xl font-black">מוכנים להתחיל לשפץ?</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            שיחה אחת - וכל המידע, המחירים ובעל המקצוע הנכון אצלכם ביד.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${site.phoneIntl}`}
              className="rounded-lg bg-brand-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
            >
              {site.phone}
            </a>
            <Link
              href="/contact"
              className="rounded-lg border border-white/25 px-7 py-3.5 font-bold transition hover:border-white/60 hover:bg-white/5"
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
