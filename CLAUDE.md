# שיפוצים לי — מדריך תחזוקה

אתר תוכן שיווקי לשיפוצים בעברית (RTL). Next.js App Router + TypeScript + Tailwind v4 + MDX.
כל התוכן חי בקבצי MDX; הקוד לא מכיל תוכן קשיח.

## כלל ברזל: אסור לשנות כתובות URL

**אסור בתכלית האיסור לשנות slug של עמוד קיים** — לא בשינוי שם קובץ MDX, לא בהעברה בין תיקיות content, ולא בשינוי נתיבים בקוד. שינוי כתובת מחזיר 404 לכל מי שהגיע מגוגל, מקישור חיצוני או מסימנייה, ומוחק את הוותק של העמוד באינדקס. זה חל על כל הכתובות הקיימות ועל כל כתובת חדשה מרגע שנוצרה ונפרסה. אם אין ברירה ויש צורך עסקי אמיתי בשינוי — חובה להתייעץ עם בעל האתר קודם ולהקים redirect 301 מהכתובת הישנה.

## מבנה

- `content/services/<slug>.mdx` — עמודי שירות (שם הקובץ = ה-slug = ה-URL)
- **ה-slugs באנגלית בלבד (ASCII), בתרגום משמעות הביטוי המרכזי** — למשל `apartment-renovation`, `house-painting`, `roof-waterproofing`. לא תעתיק ולא עברית (שמות קבצים בעברית שברו את הפריסה ב-Vercel)
- `content/pages/<slug>.mdx` — עמודי מידע (אודות, נגישות, פרטיות)
- `content/areas/<slug>.mdx` — אזורי שירות (עתידי, הנתיב כבר נתמך)
- `content/TEMPLATE.mdx` — תבנית לעמוד חדש
- `src/config/site.ts` — הקובץ המרכזי: פרטי עסק, קבוצות שירותים (סיידבר/פוטר/דף הבית), אזורי שירות
- `src/app/[slug]/page.tsx` — התבנית שמרנדרת כל עמוד תוכן (breadcrumbs, סיידבר, מחירים, FAQ, JSON-LD)
- `src/lib/content.ts` — טעינת MDX + טיפוס ה-frontmatter

## פעולות נפוצות

**הוספת עמוד שירות:** העתק את `content/TEMPLATE.mdx` אל `content/services/<slug>.mdx`, מלא frontmatter וגוף (700+ מילים), הוסף את ה-slug לקבוצה מתאימה ב-`src/config/site.ts` (serviceGroups), והוסף 2+ קישורים אליו מגוף עמודים קיימים רלוונטיים (`[טקסט](/slug)`).

**עדכון מחירים:** ערוך את `prices.rows` ב-frontmatter של העמוד. עדכן גם את `updated: "YYYY-MM"` (אם השדה חסר — מוצג חודש הבנייה האחרון אוטומטית).

**שינוי סיידבר של עמוד:** שדה `sidebar` ב-frontmatter (רשימת slugs).

**היררכיה (עמודי קטגוריה):** שדה `parent: "<slug>"` ב-frontmatter משבץ את העמוד תחת עמוד-אב ב-breadcrumbs (וב-BreadcrumbList JSON-LD). עמודי הקטגוריה הקיימים: `renovation-contractors` (כל הערים), `professionals` (בעלי מקצוע), `outdoor-renovation` (חוץ וגינה). עמוד עיר חדש מקבל תמיד `parent: "renovation-contractors"` וקישור מגוף עמוד ההאב.

**הוספת אזור שירות:** צור `content/areas/<slug>.mdx`, הוסף קבוצה ב-`serviceAreas` ב-site.ts, והוסף את ה-slug לשדה `areas` ב-frontmatter של השירותים הרלוונטיים — הסיידבר יציג אותו אוטומטית.

## כללי תוכן

- ייחודיות מלאה בין עמודים; עברית טבעית, פסקאות קצרות, בולטים
- מקפים: להשתמש אך ורק במקף קצר רגיל (-), לעולם לא במקף ארוך או בינוני
- `<PriceTable />` גבוה בעמוד (אחרי הפתיח); `<Callout type="tip|info|warning">` לטיפים
- FAQ ב-frontmatter בלבד (מרונדר אוטומטית כאקורדיון + FAQPage JSON-LD); **לפחות 12 שאלות בכל עמוד שירות**
- אין `<` או `{` גולמיים בטקסט MDX; מחרוזות YAML במרכאות כפולות בלי מרכאות פנימיות

## פקודות

- `npm run dev` / `npm run build` — הבילד הוא SSG מלא (generateStaticParams)
