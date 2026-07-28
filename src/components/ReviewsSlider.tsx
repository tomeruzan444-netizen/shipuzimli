"use client";

import { useRef } from "react";
import { reviews } from "@/config/reviews";

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="דירוג 5 מתוך 5 כוכבים">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" aria-hidden className="h-4 w-4 fill-yellow-400">
          <path d="M10 1.6l2.47 5 5.53.8-4 3.9.94 5.5L10 20l-4.94-2.6.94-5.5-4-3.9 5.53-.8z" />
        </svg>
      ))}
    </div>
  );
}

function Arrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  // ב-RTL: "הקודם" מצביע ימינה, "הבא" מצביע שמאלה
  const points = dir === "prev" ? "M8 4l7 6-7 6" : "M12 4l-7 6 7 6";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "הביקורת הקודמת" : "הביקורת הבאה"}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-brand-500 hover:bg-brand-600"
    >
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-5 w-5">
        <path d={points} />
      </svg>
    </button>
  );
}

export default function ReviewsSlider() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 16 : el.clientWidth;
    // ב-RTL גלילה שמאלה (הבא) היא בכיוון שלילי
    el.scrollBy({ left: dir === "next" ? -step : step, behavior: "smooth" });
  };

  return (
    <section aria-label="ביקורות לקוחות" className="border-b border-white/10 pb-10 mb-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white md:text-2xl">מה הלקוחות שלנו אומרים</h2>
          <div className="mt-1.5 flex items-center gap-2 text-sm text-slate-300">
            <Stars />
            <span>5.0 מתוך 5 · {reviews.length} ביקורות</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Arrow dir="prev" onClick={() => scroll("prev")} />
          <Arrow dir="next" onClick={() => scroll("next")} />
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((r, i) => (
          <article
            key={i}
            data-card
            className="flex shrink-0 basis-full snap-start flex-col rounded-xl bg-white p-5 text-right shadow-lg sm:basis-[calc(50%-0.5rem)] lg:basis-[calc(33.333%-0.75rem)]"
          >
            <div className="mb-3 flex items-center justify-between">
              <Stars />
              <span aria-hidden className="text-3xl leading-none text-brand-500">&rdquo;</span>
            </div>
            <p className="flex-1 text-sm leading-relaxed text-ink-700">{r.text}</p>
            <footer className="mt-4 border-t border-slate-100 pt-3">
              <span className="font-bold text-navy-900">{r.name}</span>
              <span className="text-ink-500"> - {r.city}</span>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
