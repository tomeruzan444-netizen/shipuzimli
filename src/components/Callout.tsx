const styles = {
  tip: { box: "border-accent-600 bg-green-50", label: "טיפ של שלומי" },
  info: { box: "border-brand-500 bg-brand-50", label: "כדאי לדעת" },
  warning: { box: "border-amber-500 bg-amber-50", label: "שימו לב" },
} as const;

export default function Callout({
  type = "tip",
  children,
}: {
  type?: keyof typeof styles;
  children: React.ReactNode;
}) {
  const s = styles[type];
  return (
    <aside className={`my-6 rounded-xl border-r-4 p-4 ${s.box}`}>
      <p className="mb-1 text-sm font-bold text-ink-900">{s.label}</p>
      <div className="text-sm leading-relaxed text-ink-700 [&>p]:mb-0">{children}</div>
    </aside>
  );
}
