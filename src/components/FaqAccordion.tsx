interface FaqItem {
  q: string;
  a: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  if (!items?.length) return null;
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-2xl font-bold text-ink-900">שאלות נפוצות</h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <details
            key={i}
            className="group rounded-xl border border-slate-200 bg-white open:border-brand-500"
          >
            <summary className="cursor-pointer p-4 font-bold text-ink-900 marker:content-none hover:text-brand-600">
              {item.q}
            </summary>
            <p className="border-t border-slate-100 p-4 text-ink-700 leading-relaxed">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
