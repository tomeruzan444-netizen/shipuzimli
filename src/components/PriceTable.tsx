import type { PageFrontmatter } from "@/lib/content";

type Prices = NonNullable<PageFrontmatter["prices"]>;

export default function PriceTable({ prices }: { prices: Prices }) {
  return (
    <section className="my-6 overflow-x-auto rounded-xl border border-brand-100">
      <table className="w-full border-collapse text-sm">
        <caption className="bg-brand-600 p-3 text-right text-base font-bold text-white">
          {prices.title}
        </caption>
        <thead>
          <tr className="bg-brand-50 text-right">
            <th scope="col" className="p-3 font-bold text-ink-900">סוג העבודה</th>
            <th scope="col" className="p-3 font-bold text-ink-900">טווח מחירים</th>
            <th scope="col" className="p-3 font-bold text-ink-900">הערות</th>
          </tr>
        </thead>
        <tbody>
          {prices.rows.map((row, i) => (
            <tr key={i} className="border-t border-slate-200 odd:bg-white even:bg-slate-50">
              <td className="p-3 font-medium text-ink-900">{row.item}</td>
              <td className="p-3 whitespace-nowrap text-accent-700 font-bold">{row.price}</td>
              <td className="p-3 text-ink-500">{row.note ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {prices.note && (
        <p className="bg-slate-50 p-3 text-xs text-ink-500">* {prices.note}</p>
      )}
    </section>
  );
}
