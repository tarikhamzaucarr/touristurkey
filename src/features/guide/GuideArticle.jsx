import React from "react";
import { GUIDE, PRODUCTS, HOTELS, guideBySlug } from "../../data/index.js";
import { Link } from "../../router/index.jsx";
import { useStore } from "../../hooks/useStore.js";
import { Photo, Kicker } from "../../components/ui/index.jsx";
import { Footer } from "../../components/layout/index.js";
import { GuestBar as Bar } from "../../components/layout/GuestBar.jsx";
import { ProductCard, NotFound } from "../guest/index.js";
import { useSeo, articleSchema } from "../../hooks/useSeo.js";

const hotelOf = () => HOTELS.find((h) => h.slug === sessionStorage.getItem("tt.hotel"));

export function GuideArticle({ slug }) {
  const state = useStore();
  const g = guideBySlug(slug);
  const hotel = hotelOf();
  useSeo(g ? {
    title: g.title, description: g.excerpt, type: "article", path: `/rehber/${g.slug}`,
    schema: articleSchema(g, `${location.origin}/rehber/${g.slug}`),
  } : { title: "Bulunamadı", description: "" });
  if (!g) return <NotFound />;
  const linked = g.products.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);
  return (
    <>
      <Bar />
      <Photo seed={g.photo} h={230} tag={g.kicker} alt={g.title} />
      <div className="wrap-s" style={{ paddingTop: 24, paddingBottom: 70 }}>
        <h1 style={{ fontSize: "clamp(26px,6vw,38px)" }}>{g.title}</h1>
        <p style={{ fontSize: 16.5, marginTop: 12, color: "var(--ink2)" }}>{g.excerpt}</p>
        <div className="prose" style={{ marginTop: 22 }}>
          {g.body.map((b, i) => (
            <div key={i}>
              <h3>{b.h}</h3>
              <p>{b.p}</p>
            </div>
          ))}
        </div>
        <div className="divider" />
        <Kicker>Bu bölümle ilgili hizmetler</Kicker>
        <h2 className="sec-t" style={{ marginTop: 8 }}>Doğrudan ayırtın</h2>
        <p className="muted" style={{ fontSize: 14, marginTop: 6 }}>
          Talebiniz otelinizdeki konsiyerje düşer, o teyit eder.
        </p>
        <div className="stack" style={{ gap: 14, marginTop: 16 }}>
          {linked.map((p) => <ProductCard key={p.id} p={p} hotel={hotel} state={state} />)}
        </div>
        <div style={{ marginTop: 26 }}>
          <Link to="/rehber" className="btn ghost">← Tüm rehber</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
