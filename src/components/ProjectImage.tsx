/**
 * תמונת "לפני ואחרי" של פרויקט אמיתי בתוך גוף העמוד.
 * מקבלת WebP מאופטם מ-public/images/projects, עם alt שמתאר את מה שרואים
 * (לא מילת מפתח) ו-caption קצר. width/height נמסרים כדי למנוע קפיצת פריסה (CLS).
 */
export default function ProjectImage({
  src,
  alt,
  caption,
  width = 1280,
  height = 853,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="my-7">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="h-auto w-full rounded-xl border border-slate-200"
      />
      {caption ? (
        <figcaption className="mt-2 text-center text-sm text-ink-500">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
