import type { PageFrontmatter } from "@/lib/content";

type Data = NonNullable<PageFrontmatter["infographic"]>;
type Items = Data["items"];

/**
 * אינפוגרפיקה ויזואלית לעמוד תוכן, נטענת מ-frontmatter.infographic.
 * שש תצוגות (יש לגוון ביניהן בין עמוד לעמוד):
 *   steps     - שלבי עבודה ממוספרים
 *   bars      - השוואת עלות/היקף (מוטות אופקיים לפי pct)
 *   factors   - גורמי מחיר (תגיות עם ערך)
 *   stats     - נתוני מפתח בולטים (אריחי מספרים)
 *   timeline  - לוח זמנים לפרויקט (ציר אנכי עם משך לכל שלב)
 *   checklist - מה כולל / על מה לשים לב (רשימת סימוני וי)
 * HTML/CSS בלבד - בלי SVG גולמי - כדי לא לשבור את ה-MDX.
 */
export default function Infographic({ data }: { data: Data }) {
  if (!data?.items?.length) return null;
  const type = data.type ?? "steps";
  return (
    <figure className="my-6 rounded-xl border border-brand-100 bg-brand-50/40 p-5">
      {data.title && (
        <figcaption className="mb-4 text-base font-bold text-ink-900">{data.title}</figcaption>
      )}
      {type === "bars" ? <Bars items={data.items} /> : null}
      {type === "factors" ? <Factors items={data.items} /> : null}
      {type === "stats" ? <Stats items={data.items} /> : null}
      {type === "timeline" ? <Timeline items={data.items} /> : null}
      {type === "checklist" ? <Checklist items={data.items} /> : null}
      {type === "steps" ? <Steps items={data.items} /> : null}
      {data.note && <p className="mt-4 text-xs text-ink-500">* {data.note}</p>}
    </figure>
  );
}

function Steps({ items }: { items: Items }) {
  return (
    <ol className="space-y-3">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
            {i + 1}
          </span>
          <div className="min-w-0">
            <p className="font-bold text-ink-900">
              {it.label}
              {it.value ? <span className="mr-2 font-normal text-navy-700">{it.value}</span> : null}
            </p>
            {it.note && <p className="text-sm leading-relaxed text-ink-700">{it.note}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

function Bars({ items }: { items: Items }) {
  const max = Math.max(...items.map((it) => it.pct ?? 0), 1);
  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={i}>
          <div className="mb-1 flex items-baseline justify-between gap-2">
            <span className="text-sm font-medium text-ink-900">{it.label}</span>
            {it.value && <span className="whitespace-nowrap text-sm font-bold text-navy-700">{it.value}</span>}
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-brand-100">
            <div
              className="h-full rounded-full bg-brand-600"
              style={{ width: `${Math.round(((it.pct ?? 0) / max) * 100)}%` }}
            />
          </div>
          {it.note && <p className="mt-1 text-xs text-ink-500">{it.note}</p>}
        </div>
      ))}
    </div>
  );
}

function Factors({ items }: { items: Items }) {
  return (
    <ul className="space-y-3">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-md bg-navy-700 text-xs font-bold text-white">
            {it.value ?? "₪"}
          </span>
          <div className="min-w-0">
            <p className="font-bold text-ink-900">{it.label}</p>
            {it.note && <p className="text-sm leading-relaxed text-ink-700">{it.note}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}

/** אריחי נתוני מפתח: המספר/ערך בולט למעלה, תווית מתחת, הערה קטנה. */
function Stats({ items }: { items: Items }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((it, i) => (
        <div
          key={i}
          className="rounded-lg border border-brand-100 bg-white p-4 text-center"
        >
          {it.value && (
            <p className="text-2xl font-extrabold leading-tight text-brand-600">{it.value}</p>
          )}
          <p className="mt-1 text-sm font-bold text-ink-900">{it.label}</p>
          {it.note && <p className="mt-1 text-xs leading-relaxed text-ink-500">{it.note}</p>}
        </div>
      ))}
    </div>
  );
}

/** לוח זמנים לפרויקט: ציר אנכי, לכל שלב תווית, תגית משך (value) והסבר. */
function Timeline({ items }: { items: Items }) {
  return (
    <ol className="relative space-y-5 border-r-2 border-brand-100 pr-5">
      {items.map((it, i) => (
        <li key={i} className="relative">
          <span className="absolute right-[-26px] top-1 h-3 w-3 rounded-full border-2 border-white bg-brand-600" />
          <div className="flex flex-wrap items-baseline gap-x-2">
            <p className="font-bold text-ink-900">{it.label}</p>
            {it.value && (
              <span className="rounded-full bg-navy-50 px-2 py-0.5 text-xs font-bold text-navy-700">
                {it.value}
              </span>
            )}
          </div>
          {it.note && <p className="mt-0.5 text-sm leading-relaxed text-ink-700">{it.note}</p>}
        </li>
      ))}
    </ol>
  );
}

/** רשימת סימוני וי: מה כולל / על מה לשים לב. */
function Checklist({ items }: { items: Items }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
            {"✓"}
          </span>
          <div className="min-w-0">
            <p className="font-bold text-ink-900">
              {it.label}
              {it.value ? <span className="mr-2 font-normal text-navy-700">{it.value}</span> : null}
            </p>
            {it.note && <p className="text-sm leading-relaxed text-ink-700">{it.note}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}
