import fs from "fs";
import path from "path";
import matter from "gray-matter";

/** frontmatter אחיד לכל עמוד תוכן (שירות / עמוד מידע / אזור) */
export interface PageFrontmatter {
  title: string; // H1 של העמוד
  metaTitle?: string; // title ל-SEO (ברירת מחדל: title)
  description: string; // meta description
  keyword: string; // הביטוי המרכזי של העמוד
  updated?: string; // YYYY-MM — אם חסר, מוצג חודש הבנייה הנוכחי
  sidebar: string[]; // slugs של שירותים רלוונטיים לסיידבר
  areas?: string[]; // slugs של אזורי שירות (ריק בשלב זה)
  prices?: {
    title: string;
    note?: string;
    rows: { item: string; price: string; note?: string }[];
  };
  faq?: { q: string; a: string }[];
}

export interface ContentPage {
  slug: string;
  kind: "services" | "pages" | "areas";
  frontmatter: PageFrontmatter;
  body: string;
}

const CONTENT_ROOT = path.join(process.cwd(), "content");
const KINDS: ContentPage["kind"][] = ["services", "pages", "areas"];

function readDir(kind: ContentPage["kind"]): ContentPage[] {
  const dir = path.join(CONTENT_ROOT, kind);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.mdx$/, ""),
        kind,
        frontmatter: data as PageFrontmatter,
        body: content,
      };
    });
}

export function getAllPages(): ContentPage[] {
  return KINDS.flatMap(readDir);
}

export function getPageBySlug(slug: string): ContentPage | undefined {
  return getAllPages().find((p) => p.slug === slug);
}

export function getPageTitle(slug: string): string {
  return getPageBySlug(slug)?.frontmatter.title ?? slug.replace(/-/g, " ");
}

/** "יולי 2026" — מתוך frontmatter.updated או חודש הבנייה הנוכחי */
export function formatUpdated(updated?: string): string {
  const months = [
    "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
    "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר",
  ];
  let d = new Date();
  if (updated) {
    const [y, m] = updated.split("-").map(Number);
    if (y && m) d = new Date(y, m - 1, 1);
  }
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}
