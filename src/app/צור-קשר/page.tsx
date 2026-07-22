import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "יצירת קשר — הצעת מחיר לשיפוץ ללא התחייבות",
  description:
    "צרו קשר עם שיפוצים לי: טלפון, וואטסאפ או טופס קצר — ונחזור אליכם עם הצעת מחיר משתלמת לשיפוץ, בלי התחייבות.",
  alternates: { canonical: "/צור-קשר" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumbs crumbs={[{ title: "יצירת קשר" }]} />
      <h1 className="text-3xl font-black text-ink-900 md:text-4xl">יצירת קשר</h1>
      <p className="mt-3 max-w-2xl text-ink-700">
        מתכננים שיפוץ? השאירו פרטים בטופס או פנו אלינו ישירות — נחזור אליכם
        בהקדם עם כל המידע והצעת מחיר הוגנת, ללא כל התחייבות מצדכם.
      </p>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <ContactForm />
        <div className="space-y-4">
          {[
            {
              title: "טלפון",
              value: site.phone,
              href: `tel:${site.phoneIntl}`,
              note: "זמינים בימים א'–ה' 8:00–19:00, ו' 8:00–13:00",
            },
            {
              title: "וואטסאפ",
              value: "שלחו לנו הודעה",
              href: `https://wa.me/${site.phoneIntl.replace("+", "")}`,
              note: "עונים בדרך כלל תוך שעה בשעות הפעילות",
            },
            {
              title: 'דוא"ל',
              value: site.email,
              href: `mailto:${site.email}`,
              note: "מתאים לפניות מפורטות עם תמונות ומסמכים",
            },
          ].map((c) => (
            <a
              key={c.title}
              href={c.href}
              className="block rounded-xl border border-slate-200 p-5 hover:border-brand-500"
            >
              <h2 className="text-sm font-bold text-ink-500">{c.title}</h2>
              <p className="mt-1 text-lg font-bold text-brand-600">{c.value}</p>
              <p className="mt-1 text-sm text-ink-500">{c.note}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
