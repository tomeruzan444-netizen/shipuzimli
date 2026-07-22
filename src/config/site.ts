/**
 * ============================================================
 *  הקובץ המרכזי של "שיפוצים לי"
 * ============================================================
 *  כאן מנוהל הכול ממקום אחד:
 *  - פרטי העסק (שם, טלפון, דוא"ל)
 *  - רשימת כל עמודי השירות והקבוצות שלהם (לסיידבר, לתפריט, לפוטר)
 *  - אזורי שירות (בשלב זה ריק - מוסיפים כאן והם משתבצים אוטומטית)
 *
 *  הוספת עמוד שירות חדש:
 *  1. צור קובץ MDX חדש ב-content/services/<slug>.mdx (לפי התבנית)
 *  2. הוסף את ה-slug שלו לקבוצה המתאימה ב-serviceGroups למטה
 *  3. הוסף קישורים אליו מעמודים קיימים רלוונטיים (בתוך גוף ה-MDX שלהם)
 * ============================================================
 */

export const site = {
  name: "שיפוצים לי",
  tagline: "כל השיפוצים במקום אחד - קל, מהיר ומשתלם",
  url: "https://shipuzim-li.vercel.app",
  phone: "052-1234567",
  phoneIntl: "+972521234567",
  email: "info@shipuzim-li.co.il",
  founder: "שלומי השיפוצניק",
  founderYears: 20,
  description:
    "שיפוצים לי - הפלטפורמה שמנגישה את כל סוגי השיפוצים: קבלני שיפוצים בכל הארץ, מידע מקיף ומחירים מעודכנים לכל שירות, וקביעת פגישות עם בעלי מקצוע.",
} as const;

/** קבוצת שירותים בסיידבר / בפוטר. הסדר כאן קובע את סדר התצוגה. */
export interface ServiceGroup {
  title: string;
  slugs: string[];
}

export const serviceGroups: ServiceGroup[] = [
  {
    title: "שיפוצי דירות ובתים",
    slugs: ["apartment-renovation", "home-renovation", "private-house-renovation", "general-renovations"],
  },
  {
    title: "חדרים רטובים",
    slugs: ["bathroom-renovation", "shower-renovation"],
  },
  {
    title: "חללים מיוחדים",
    slugs: ["balcony-renovation", "attic-renovation", "basement-renovation"],
  },
  {
    title: "צבע, גבס וגמר",
    slugs: ["apartment-painting", "house-painting", "drywall-ceiling", "tiling-works"],
  },
  {
    title: "איטום",
    slugs: ["roof-waterproofing"],
  },
  {
    title: "קבלן שיפוצים לפי עיר",
    slugs: [
      "renovation-contractor-tel-aviv",
      "renovation-contractor-haifa",
      "renovation-contractor-beer-sheva",
    ],
  },
];

/**
 * אזורי שירות - בשלב זה ריק.
 * כשמוסיפים אזור: יוצרים עמוד MDX ב-content/areas/<slug>.mdx,
 * ומוסיפים אותו כאן לקבוצה. הסיידבר של כל שירות יציג אוטומטית את
 * האזורים המשויכים אליו דרך שדה areas ב-frontmatter של העמוד.
 */
export const serviceAreas: ServiceGroup[] = [];

/** עמודי ליבה - לתפריט העליון ולפוטר */
export const corePages = [
  { slug: "", title: "דף הבית" },
  { slug: "about", title: "אודות" },
  { slug: "contact", title: "יצירת קשר" },
] as const;

export const legalPages = [
  { slug: "accessibility-statement", title: "הצהרת נגישות" },
  { slug: "privacy-policy", title: "מדיניות פרטיות" },
] as const;

/** כל ה-slugs של עמודי השירות, לפי סדר הקבוצות */
export const allServiceSlugs: string[] = serviceGroups.flatMap((g) => g.slugs);
