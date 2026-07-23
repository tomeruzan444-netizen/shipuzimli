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
  phone: "052-3464528",
  phoneIntl: "+972523464528",
  email: "shiputzli@gmail.com",
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
    slugs: [
      "apartment-renovation",
      "home-renovation",
      "private-house-renovation",
      "general-renovations",
      "bedroom-renovation",
      "apartment-splitting",
      "security-door-installation",
    ],
  },
  {
    title: "שיפוץ מסחרי",
    slugs: ["business-renovation", "store-renovation", "restaurant-renovation"],
  },
  {
    title: "חדרים רטובים",
    slugs: [
      "bathroom-renovation",
      "shower-renovation",
      "shower-enclosure-installation",
      "bathroom-refresh",
      "bathroom-waterproofing",
      "bathroom-tiling",
    ],
  },
  {
    title: "חללים מיוחדים",
    slugs: ["balcony-renovation", "attic-renovation", "basement-renovation"],
  },
  {
    title: "צבע וצביעה",
    slugs: [
      "apartment-painting",
      "house-painting",
      "apartment-painting-tel-aviv",
      "apartment-painting-jerusalem",
      "apartment-painting-haifa",
      "apartment-painting-beer-sheva",
    ],
  },
  {
    title: "עבודות גבס",
    slugs: [
      "drywall-works",
      "drywall-ceiling",
      "drywall-partitions",
      "drywall-repair",
      "drywall-room-construction",
    ],
  },
  {
    title: "תיקוני קירות",
    slugs: [
      "wall-repairs",
      "wall-cracks",
      "wall-straightening",
      "wall-hole-repair",
      "plaster-repairs",
      "wall-demolition",
      "wall-raising",
    ],
  },
  {
    title: "ריצוף וחיפוי",
    slugs: ["tiling-works", "wall-cladding", "interior-wall-cladding"],
  },
  {
    title: "איטום ובנייה",
    slugs: ["roof-waterproofing", "mamad-construction", "building-contractor"],
  },
  {
    title: "חוץ וגינה",
    slugs: ["outdoor-renovation", "garden-renovation", "pergola-installation", "pool-construction"],
  },
  {
    title: "בעלי מקצוע",
    slugs: [
      "professionals",
      "painting-contractor",
      "professional-painter",
      "parquet-installer",
      "plumbing-contractor",
    ],
  },
  {
    title: "מחירונים",
    slugs: [
      "renovation-price-list",
      "renovation-calculator",
      "plumbing-price-list",
      "painting-price-list",
      "tiling-price-list",
      "construction-price-list",
      "light-construction-price-list",
      "concrete-price-list",
      "electrician-price-list",
      "marble-price-list",
      "home-inspection-price-list",
      "roof-waterproofing-price-list",
    ],
  },
  {
    title: "קבלן שיפוצים לפי עיר",
    slugs: [
      "renovation-contractors",
      "renovation-contractor-center",
      "renovation-contractor-north",
      "renovation-contractor-south",
      "renovation-contractor-tel-aviv",
      "renovation-contractor-jerusalem",
      "renovation-contractor-haifa",
      "renovation-contractor-rishon-lezion",
      "renovation-contractor-ashdod",
      "renovation-contractor-netanya",
      "renovation-contractor-beer-sheva",
      "renovation-contractor-ramat-gan",
      "renovation-contractor-bat-yam",
      "renovation-contractor-herzliya",
      "renovation-contractor-hod-hasharon",
      "renovation-contractor-rehovot",
      "renovation-contractor-hadera",
      "renovation-contractor-beer-yaakov",
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
