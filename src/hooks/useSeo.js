import { useEffect } from "react";

/* SEO — SPA olduğu için meta etiketleri çalışma anında yazılıyor.
   Bu, sunucu tarafı render'ın yerini TUTMAZ; kalıcı çözüm Next.js'e
   geçiştir. Ama sosyal paylaşım önizlemesi ve arama motorlarının
   JS çalıştıran tarayıcısı için bugünden anlamlı fark yaratır. */

const SITE = "TouristTurkey";
const BASE = typeof location !== "undefined" ? location.origin : "https://touristurkey.com";

function tag(sel, attrs) {
  let el = document.head.querySelector(sel);
  if (!el) {
    el = document.createElement(attrs.tagName || "meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => {
    if (k !== "tagName" && v != null) el.setAttribute(k, v);
  });
  return el;
}

function jsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function useSeo({ title, description, image, path, type = "website", schema }) {
  useEffect(() => {
    const full = title ? `${title} — ${SITE}` : SITE;
    const url = `${BASE}${path || location.pathname}`;
    const img = image || `${BASE}/og-default.jpg`;

    document.title = full;
    tag('meta[name="description"]', { name: "description", content: description });
    tag('link[rel="canonical"]', { tagName: "link", rel: "canonical", href: url });

    tag('meta[property="og:title"]', { property: "og:title", content: full });
    tag('meta[property="og:description"]', { property: "og:description", content: description });
    tag('meta[property="og:type"]', { property: "og:type", content: type });
    tag('meta[property="og:url"]', { property: "og:url", content: url });
    tag('meta[property="og:image"]', { property: "og:image", content: img });
    tag('meta[property="og:site_name"]', { property: "og:site_name", content: SITE });
    tag('meta[property="og:locale"]', { property: "og:locale", content: "tr_TR" });

    tag('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    tag('meta[name="twitter:title"]', { name: "twitter:title", content: full });
    tag('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    tag('meta[name="twitter:image"]', { name: "twitter:image", content: img });

    if (schema) jsonLd("ld-page", schema);
  }, [title, description, image, path, type, JSON.stringify(schema)]);
}

/* --- şema üreticileri --- */
export const orgSchema = () => ({
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: SITE,
  url: BASE,
  areaServed: { "@type": "City", name: "İstanbul" },
  address: { "@type": "PostalAddress", addressLocality: "İstanbul", addressCountry: "TR" },
});

export const productSchema = (p, price, url) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: p.title,
  description: p.short,
  category: p.cat,
  offers: {
    "@type": "Offer",
    price: String(price),
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    url,
  },
});

export const articleSchema = (g, url) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: g.title,
  description: g.excerpt,
  about: { "@type": "City", name: "İstanbul" },
  mainEntityOfPage: url,
});

export const breadcrumb = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({
    "@type": "ListItem", position: i + 1, name, item: `${BASE}${path}`,
  })),
});
