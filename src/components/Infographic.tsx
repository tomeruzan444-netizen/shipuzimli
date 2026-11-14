import type { PageFrontmatter } from "@/lib/content";

type Data = NonNullable<PageFrontmatter["infographic"]>;
type Items = Data["items"];

/**
 * אינפוגרפיקה ויזואלית לעמוד תוכן, נטענת מ-frontmatter.infographic.
 * שלוש תצוגות: steps (שלבי עבודה), bars (השוואת עלות/היקף), factors (גורמי מחיר).
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
