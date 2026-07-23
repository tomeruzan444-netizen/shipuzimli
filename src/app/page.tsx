import { site, serviceGroups } from "@/config/site";
import { getPageKeyword, getPageBySlug } from "@/lib/content";

const CITY_GROUP_TITLE = "קבלן שיפוצים לפי עיר";

/** אייקוני SVG בקו נקי, נצבעים דרך currentColor - בצבעי האתר בלבד */
const ICON_PATHS: Record<string, string> = {
  badge: "M9 12l2 2 4-4 M12 3l2.1 2.1 3-.4 1.2 2.8 2.7 1.3-.4 3 2.1 2.2-2.1 2.2.4 3-2.7 1.3-1.2 2.8-3-.4L12 21l-2.1-2.1-3 .4-1.2-2.8-2.7-1.3.4-3L1.3 12l2.1-2.2-.4-3 2.7-1.3 1.2-2.8 3 .4z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 7v5l3.5 2",
  coins: "M12 3C7.6 3 4 4.3 4 6s3.6 3 8 3 8-1.3 8-3-3.6-3-8-3z M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6",
  smile: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M9 9.5h.01 M15 9.5h.01 M8.5 14a4.5 4.5 0 0 0 7 0",
  home: "M3 11.5 12 4l9 7.5 M5.5 10v10h13V10",
  store: "M4 9.5 5 4h14l1 5.5 M4.5 9.5v10.5h15V9.5 M9.5 20v-5.5h5V20 M3.5 9.5h17",
  droplet: "M12 3.5c3 4.2 6 7.4 6 10.5a6 6 0 1 1-12 0c0-3.1 3-6.3 6-10.5z",
  stairs: "M3.5 20h4v-4h4v-4h4V8h5 M3.5 20h17",
  roller: "M4 4.5h12v5H4z M16 6.5h4v3.5l-7.5 1.5v3 M11.5 14.5h2V20h-2z",
  panel: "M4.5 4h15v16h-15z M4.5 12h15 M12 4v16",
  hammer: "M13.5 4.5 19.5 10.5 16.5 13.5 10.5 7.5z M10.5 9.5 4 16v3.5h3.5L14 13",
  grid: "M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7H4z M13 13h7v7h-7z",
  shield: "M12 3.5 19 6.5v5c0 4.8-3.4 7.7-7 9.5-3.6-1.8-7-4.7-7-9.5v-5z",
  sun: "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M12 2.5v2.5 M12 19v2.5 M4.2 4.2 6 6 M18 18l1.8 1.8 M2.5 12H5 M19 12h2.5 M4.2 19.8 6 18 M18 6l1.8-1.8",
  wrench: "M14.5 6.2a4.2 4.2 0 0 0-5.6 5.6L4 16.7V20h3.3l4.9-4.9a4.2 4.2 0 0 0 5.6-5.6l-2.8 2.8-2.3-2.3z",
  calculator: "M6.5 3.5h11v17h-11z M9.5 7h5 M9.5 11h.01 M14.5 11h.01 M9.5 14.5h.01 M14.5 14.5h.01 M9.5 18h5",
  pin: "M12 21.5s-6.5-5.6-6.5-10.5a6.5 6.5 0 1 1 13 0C18.5 15.9 12 21.5 12 21.5z M12 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  phone: "M5 4h4l1.5 4.5-2.2 1.7a13 13 0 0 0 5.5 5.5l1.7-2.2L20 15v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z",
};

function Icon({ name, className = "h-6 w-6" }: { name: keyof typeof ICON_PATHS; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

/** אייקון לכל קבוצת שירותים, לפי סדר הקבוצות ב-site.ts (ללא קבוצת הערים) */
const GROUP_ICONS: (keyof typeof ICON_PATHS)[] = [
  "home", "store", "droplet", "stairs", "roller", "panel",
  "hammer", "grid", "shield", "sun", "wrench", "calculator",
];

const HIGHLIGHTS = [
  { icon: "badge" as const, title: "בעלי מקצוע מומלצים", text: "רק קבלנים אמינים עם תודעת שירות גבוהה" },
  { icon: "clock" as const, title: "חוסכים לכם זמן", text: "במקום שעות של חיפושים - מענה תוך רגעים ספורים" },
  { icon: "coins" as const, title: "מוזילים עלויות", text: "השוואת מחירים שקופה שמשאירה כסף בכיס" },
  { icon: "smile" as const, title: "שירות עם חיוך", text: "ליווי אישי של שלומי וצוותו לאורך כל הדרך" },
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
              <a
                href="/contact"
                className="rounded-lg border border-white/25 px-7 py-3.5 text-lg font-bold text-white transition hover:border-white/60 hover:bg-white/5"
              >
                קבלו הצעת מחיר
              </a>
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
                <div className="mb-2.5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon name={h.icon} />
                </div>
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
          {serviceGroupsOnly.map((group, i) => (
            <div
              key={group.title}
              className="rounded-xl border border-slate-200 bg-white p-6 transition hover:border-navy-700 hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-900">
                  <Icon name={GROUP_ICONS[i % GROUP_ICONS.length]} className="h-5.5 w-5.5" />
                </span>
                <h3 className="text-lg font-bold text-navy-900">{group.title}</h3>
              </div>
              <div aria-hidden className="mb-4 h-0.5 w-8 bg-brand-600" />
              <ul className="space-y-2.5 text-sm">
                {group.slugs.map((slug) => (
                  <li key={slug}>
                    <a
                      href={`/${slug}`}
                      className="text-ink-700 transition hover:text-brand-600"
                    >
                      <ServiceLinkTitle slug={slug} />
                    </a>
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
                <p className="mb-2 flex items-center gap-1.5 text-sm font-bold text-brand-600">
                  <Icon name="pin" className="h-4 w-4" />
                  פריסה ארצית
                </p>
                <h2 className="text-3xl font-black text-navy-900">קבלן שיפוצים לפי עיר</h2>
                <p className="mt-3 text-ink-500">
                  מדריך מקומי לכל עיר: מחירים אזוריים, מאפייני הבנייה המקומית וקבלנים
                  שמכירים את השטח.
                </p>
              </div>
              {cityHubSlug && (
                <a
                  href={`/${cityHubSlug}`}
                  className="rounded-lg bg-navy-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-navy-800"
                >
                  למדריך המלא
                </a>
              )}
            </div>
            <ul className="flex flex-wrap gap-2.5">
              {citySlugs.map((slug) => (
                <li key={slug}>
                  <a
                    href={`/${slug}`}
                    className="inline-block rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-navy-900 transition hover:border-brand-600 hover:text-brand-600"
                  >
                    <ServiceLinkTitle slug={slug} />
                  </a>
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
            <a
              href="/about"
              className="mt-6 inline-block rounded-lg bg-brand-600 px-6 py-3 font-bold text-white transition hover:bg-brand-700"
            >
              עוד עלינו
            </a>
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
              className="flex items-center gap-2 rounded-lg bg-brand-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
            >
              <Icon name="phone" className="h-5 w-5" />
              {site.phone}
            </a>
            <a
              href="/contact"
              className="rounded-lg border border-white/25 px-7 py-3.5 font-bold transition hover:border-white/60 hover:bg-white/5"
            >
              השאירו פרטים
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceLinkTitle({ slug }: { slug: string }) {
  return <>{getPageBySlug(slug) ? getPageKeyword(slug) : slug.replace(/-/g, " ")}</>;
}
