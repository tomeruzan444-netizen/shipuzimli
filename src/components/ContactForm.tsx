"use client";

import { useState } from "react";
import { site } from "@/config/site";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      `שם: ${data.get("name")}`,
      `טלפון: ${data.get("phone")}`,
      `עיר: ${data.get("city")}`,
      `סוג העבודה: ${data.get("service")}`,
      `פרטים: ${data.get("details")}`,
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      "בקשה להצעת מחיר - שיפוצים לי"
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const inputCls =
    "w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100";

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-slate-50 p-6">
      <h2 className="mb-4 text-lg font-bold text-ink-900">השאירו פרטים ונחזור אליכם</h2>
      <div className="space-y-3">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-ink-700">שם מלא</span>
          <input name="name" required autoComplete="name" className={inputCls} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-ink-700">טלפון נייד</span>
          <input name="phone" type="tel" required autoComplete="tel" dir="ltr" className={inputCls} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-ink-700">עיר</span>
          <input name="city" autoComplete="address-level2" className={inputCls} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-ink-700">סוג העבודה</span>
          <select name="service" className={inputCls} defaultValue="שיפוץ כללי">
            {[
              "שיפוץ כללי",
              "שיפוץ דירה / בית",
              "שיפוץ אמבטיה / מקלחת",
              "צביעה",
              "איטום",
              "ריצוף",
              "עבודות גבס",
              "אחר",
            ].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-ink-700">פרטים נוספים</span>
          <textarea name="details" rows={3} className={inputCls} />
        </label>
      </div>
      <button
        type="submit"
        className="mt-4 w-full rounded-lg bg-brand-600 py-3 font-bold text-white hover:bg-brand-700"
      >
        שליחה
      </button>
      {sent && (
        <p role="status" className="mt-3 text-sm font-medium text-navy-700">
          תודה! נפתחה טיוטת מייל עם הפרטים - שלחו אותה ונחזור אליכם בהקדם.
        </p>
      )}
      <p className="mt-3 text-xs text-ink-500">
        השירות ניתן בחינם וללא התחייבות. הפרטים ישמשו אך ורק לחזרה אליכם.
      </p>
    </form>
  );
}
