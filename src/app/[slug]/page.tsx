import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Breadcrumbs from "@/components/Breadcrumbs";
import Sidebar from "@/components/Sidebar";
import PriceTable from "@/components/PriceTable";
import FaqAccordion from "@/components/FaqAccordion";
import Callout from "@/components/Callout";
import JsonLd from "@/components/JsonLd";
import ContactPage, { contactMeta } from "@/components/ContactPage";
import { getAllPages, getPageBySlug, formatUpdated } from "@/lib/content";
import { site } from "@/config/site";

export const dynamicParams = false;

const CONTACT_SLUG = "contact";

export function generateStaticParams() {
  // slugs חייבים להיות ASCII - שמות קבצים לא-לטיניים בתוצר שוברים את הפריסה ב-Vercel
  return [...getAllPages().map((p) => p.slug), CONTACT_SLUG].map((slug) => ({ slug }));
}

async function resolveSlug(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  return decodeURIComponent(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = await resolveSlug(params);
  if (slug === CONTACT_SLUG) {
    return { ...contactMeta, alternates: { canonical: `/${CONTACT_SLUG}` } };
  }
  const page = getPageBySlug(slug);
  if (!page) return {};
  const { frontmatter: fm } = page;
  return {
    title: fm.metaTitle ?? fm.title,
    description: fm.description,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title: fm.metaTitle ?? fm.title,
      description: fm.description,
      url: `/${page.slug}`,
    },
  };
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = await resolveSlug(params);
  if (slug === CONTACT_SLUG) return <ContactPage />;
  const page = getPageBySlug(slug);
  if (!page) notFound();
  const { frontmatter: fm } = page;
  const isService = page.kind === "services" || page.kind === "areas";

  const parent = fm.parent ? getPageBySlug(fm.parent) : undefined;
  const crumbs = [
    ...(parent ? [{ title: parent.frontmatter.title, href: `/${parent.slug}` }] : []),
    { title: fm.title },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumbs crumbs={crumbs} />
      <div className="flex flex-col gap-10 lg:flex-row">
        <article className="min-w-0 flex-1">
          <header className="mb-6">
            <h1 className="text-3xl font-black text-ink-900 md:text-4xl">{fm.title}</h1>
            <p className="mt-2 text-sm text-ink-500">
              <time>עודכן לאחרונה: {formatUpdated(fm.updated)}</time>
            </p>
          </header>
          <div className="prose-he">
            <MDXRemote
              source={page.body}
              components={{
                PriceTable: () => (fm.prices ? <PriceTable prices={fm.prices} /> : null),
                Callout,
              }}
            />
          </div>
          {fm.faq && <FaqAccordion items={fm.faq} />}
          <CtaStrip />
        </article>
        <Sidebar services={fm.sidebar} areas={fm.areas} currentSlug={page.slug} />
      </div>

      {isService && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: fm.title,
            description: fm.description,
            url: `${site.url}/${page.slug}`,
            provider: { "@id": `${site.url}/#business` },
            areaServed: { "@type": "Country", name: "ישראל" },
          }}
        />
      )}
      {fm.faq && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: fm.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      )}
    </div>
  );
}

function CtaStrip() {
  return (
    <div className="mt-10 rounded-xl bg-navy-950 p-6 text-white">
      <h2 className="text-xl font-bold">מוכנים להתחיל?</h2>
      <p className="mt-1 text-sm text-slate-300">
        השאירו פרטים או חייגו - ונחזור אליכם עם הצעת מחיר משתלמת, בלי התחייבות.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={`tel:${site.phoneIntl}`}
          className="rounded-lg bg-brand-600 px-5 py-2.5 font-bold text-white hover:bg-brand-700"
        >
          חייגו: {site.phone}
        </a>
        <a
          href="/contact"
          className="rounded-lg border border-white/25 px-5 py-2.5 font-bold hover:border-white/60 hover:bg-white/5"
        >
          השאירו פרטים
        </a>
      </div>
    </div>
  );
}
