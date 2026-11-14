"use client";

import { useState } from "react";

const DEPTHS = [
  { key: "light", label: "רענון קל", min: 900, max: 1600 },
  { key: "partial", label: "שיפוץ חלקי", min: 2600, max: 3800 },
  { key: "deep", label: "שיפוץ עומק", min: 3800, max: 5500 },
  { key: "luxury", label: "שיפוץ יוקרה", min: 5500, max: 8000 },
] as const;

type DepthKey = (typeof DEPTHS)[number]["key"];

const fmt = (n: number) => n.toLocaleString("he-IL");
const round1k = (n: number) => Math.round(n / 1000) * 1000;

/**
 * מחשבון שיפוצים אינטראקטיבי - אומדן מהיר לפי שטח ועומק השיפוץ.
 * client component; המכפילים תואמים לטבלת העמוד.
 */
export default function RenovationCalculator() {
  const [sqm, setSqm] = useState<number | "">(75);
  const [depth, setDepth] = useState<DepthKey>("partial");

  const d = DEPTHS.find((x) => x.key === depth)!;
  const area = typeof sqm === "number" && sqm > 0 ? sqm : 0;
  const low = round1k(area * d.min);
  const high = round1k(area * d.max);

  return (
    <section className="my-6 rounded-xl border border-brand-100 bg-brand-50/40 p-5">
      <h3 className="mb-4 text-base font-bold text-ink-900">מחשבון שיפוצים - אומדן מהיר</h3>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <label className="flex-1">
          <span className="mb-1 block text-sm font-medium text-ink-900">שטח הדירה (מ״ר ברוטו)</span>
          <input
            type="number"
            min={10}
            max={600}
            inputMode="numeric"
            value={sqm}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              setSqm(Number.isFinite(v) ? v : "");
            }}
            className="w-full rounded-lg border border-slate-300 p-2 text-ink-900"
          />
        </label>
        <label className="flex-1">
          <span className="mb-1 block text-sm font-medium text-ink-900">עומק השיפוץ</span>
          <select
            value={depth}
            onChange={(e) => setDepth(e.target.value as DepthKey)}
            className="w-full rounded-lg border border-slate-300 bg-white p-2 text-ink-900"
          >
            {DEPTHS.map((x) => (
              <option key={x.key} value={x.key}>
                {x.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-4 rounded-lg bg-navy-950 p-4 text-white">
        <p className="text-sm text-slate-300">
          אומדן עבודה וחומרים בסיסיים ({d.label}, {fmt(area)} מ״ר):
        </p>
        <p className="mt-1 text-2xl font-black">
          {area ? `${fmt(low)} - ${fmt(high)} ₪` : "הזינו שטח"}
        </p>
        {area ? (
          <p className="mt-2 text-xs text-slate-300">
            כולל רזרבה מומלצת של 10-15%: {fmt(round1k(low * 1.1))} - {fmt(round1k(high * 1.15))} ₪
          </p>
        ) : null}
      </div>
      <p className="mt-3 text-xs text-ink-500">
        * אומדן ראשוני לתכנון בלבד, לא הצעת מחיר. חומרי גמר ברמה גבוהה, מטבח ומיזוג מתומחרים בנפרד.
      </p>
    </section>
  );
}
