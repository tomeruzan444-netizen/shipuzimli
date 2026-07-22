import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-4xl font-black text-ink-900">העמוד לא נמצא</h1>
      <p className="mt-3 text-ink-700">
        נראה שהעמוד שחיפשתם הוסר או שהכתובת שגויה. אולי תמצאו את מה שחיפשתם בדף הבית.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-brand-600 px-6 py-3 font-bold text-white hover:bg-brand-700"
      >
        חזרה לדף הבית
      </Link>
    </div>
  );
}
