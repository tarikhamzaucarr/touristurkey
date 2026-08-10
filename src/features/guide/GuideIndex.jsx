import React from "react";
import { GUIDE, PRODUCTS, HOTELS, guideBySlug } from "../../data/index.js";
import { Link } from "../../router/index.jsx";
import { useStore } from "../../hooks/useStore.js";
import { Photo, Kicker } from "../../components/ui/index.jsx";
import { Footer } from "../../components/layout/index.js";
import { GuestBar as Bar } from "../../components/layout/GuestBar.jsx";
import { ProductCard, NotFound } from "../guest/index.js";
import { useSeo, breadcrumb } from "../../hooks/useSeo.js";

export function GuideIndex() {
  useSeo({
    title: "İstanbul Rehberi",
    description: "İstanbul'da 48 saat, Boğaz rehberi, hamam, nerede yenir ve ulaşım. " +
      "Her bölümün sonunda ilgili hizmetleri doğrudan ayırtabilirsiniz.",
    path: "/rehber",
    schema: breadcrumb([["Ana sayfa", "/"], ["İstanbul Rehberi", "/rehber"]]),
  });
  return (
    <>
      <Bar />
      <div className="wrap" style={{ paddingTop: 26, paddingBottom: 60 }}>
        <div className="rise" style={{ maxWidth: 620 }}>
          <Kicker>İstanbul Rehberi</Kicker>
          <h1 className="hero-t" style={{ marginTop: 10 }}>Şehri iki günde yaşamak.</h1>
          <p className="muted" style={{ fontSize: 16, marginTop: 12 }}>
            İstanbul'da ortalama kalış 2,2 gün. Bu rehber, o kısa süreyi
            kaybetmeden geçirmeniz için yazıldı. Her bölümün sonunda
            ilgili hizmetleri doğrudan ayırtabilirsiniz.
          </p>
        </div>
        <div className="grid" style={{ marginTop: 24 }}>
          {GUIDE.map((g) => (
            <Link key={g.slug} to={`/rehber/${g.slug}`} className="card rise">
              <Photo seed={g.photo} h={170} tag={g.kicker} alt={g.title} />
              <div className="pad">
                <h3 style={{ fontSize: 18 }}>{g.title}</h3>
                <p className="muted" style={{ fontSize: 13.5, marginTop: 7 }}>{g.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
