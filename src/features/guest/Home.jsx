import React, { useState, useMemo } from "react";
import { PRODUCTS, CATS, HOTELS } from "../../data/index.js";
import { Link } from "../../router/index.jsx";
import { useStore } from "../../hooks/useStore.js";
import { useCurrency, money } from "../../hooks/useCurrency.js";
import { useSeo, orgSchema } from "../../hooks/useSeo.js";
import { Photo, Empty, DegradedBanner } from "../../components/ui/index.jsx";
import { GuestBar, Footer } from "../../components/layout/index.js";
import { ProductCard } from "./ProductCard.jsx";

const eur = money;
const useCur = useCurrency;

const DUR = [
  { id: "all", label: "Tüm süreler", test: () => true },
  { id: "short", label: "3 saate kadar", test: (p) => /dk|1 saat|1.5|2 saat|3 saat/.test(p.dur) },
  { id: "half", label: "Yarım gün", test: (p) => /4 saat|Yarım|3 saat/.test(p.dur) },
  { id: "full", label: "Tam gün ve üstü", test: (p) => /6 saat|7 saat|gün/.test(p.dur) },
];
const SORT = [
  { id: "pop", label: "Popülerlik" },
  { id: "asc", label: "Fiyat: artan" },
  { id: "desc", label: "Fiyat: azalan" },
];

export function Home() {
  const state = useStore();
  useCur();
  useSeo({
    title: "İstanbul turları ve konsiyerj rezervasyonu",
    description: "İstanbul otellerinin konsiyerj masaları tek ağda. Boğaz turları, " +
      "müze biletleri, hamam ve transfer — talebiniz otelinizdeki masaya iletilir.",
    path: "/", schema: orgSchema(),
  });

  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [dur, setDur] = useState("all");
  const [max, setMax] = useState(500);
  const [sort, setSort] = useState("pop");

  const list = useMemo(() => {
    const needle = q.trim().toLocaleLowerCase("tr");
    let out = PRODUCTS.filter((p) => {
      if (cat !== "all" && p.cat !== cat) return false;
      if (!DUR.find((d) => d.id === dur).test(p)) return false;
      if (p.list > max) return false;
      if (!needle) return true;
      return [p.title, p.short, p.meet, p.long]
        .join(" ").toLocaleLowerCase("tr").includes(needle);
    });
    if (sort === "asc") out = [...out].sort((a, b) => a.list - b.list);
    if (sort === "desc") out = [...out].sort((a, b) => b.list - a.list);
    if (sort === "pop") out = [...out].sort((a, b) => a.rank - b.rank);
    return out;
  }, [q, cat, dur, max, sort]);

  const reset = () => { setQ(""); setCat("all"); setDur("all"); setMax(500); setSort("pop"); };

  return (
    <>
      <GuestBar />

      {/* hero */}
      <div style={{ position: "relative" }}>
        <Photo seed="istanbulhero" h={340} alt="İstanbul, Boğaz manzarası" />
        <div className="wrap" style={{ position: "absolute", inset: 0, display: "flex",
          alignItems: "flex-end", paddingBottom: 26 }}>
          <div style={{ maxWidth: 680 }}>
            <div className="mono" style={{ fontSize: 12, letterSpacing: ".16em",
              color: "#fff", opacity: .92 }}>İSTANBUL'UN KONSİYERJ AĞI</div>
            <h1 className="hero-t" style={{ color: "#fff", marginTop: 10 }}>
              Şehri bilenlerin ayarladığı turlar.
            </h1>
            <p style={{ color: "#fff", opacity: .93, fontSize: 16, marginTop: 12, maxWidth: 560 }}>
              Rezervasyonunuzu otelinizdeki masa üstleniyor — arada yurt dışında
              bir çağrı merkezi yok.
            </p>
          </div>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop: 22 }}>
        <DegradedBanner />

        {/* arama ve filtre */}
        <div className="card pad rise" style={{ marginTop: 4 }}>
          <label className="lbl" htmlFor="ara">Ne yapmak istersiniz?</label>
          <input id="ara" className="inp" value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Boğaz turu, hamam, havalimanı transferi…" />

          <div className="tabs" style={{ marginTop: 14 }}>
            <button className={`tab${cat === "all" ? " on" : ""}`} onClick={() => setCat("all")}>
              Tüm kategoriler
            </button>
            {CATS.map((c) => (
              <button key={c.id} className={`tab${cat === c.id ? " on" : ""}`}
                onClick={() => setCat(c.id)}>{c.label}</button>
            ))}
          </div>

          <div className="grid2" style={{ marginTop: 14 }}>
            <div>
              <label className="lbl" htmlFor="sure">Süre</label>
              <select id="sure" className="inp" value={dur} onChange={(e) => setDur(e.target.value)}>
                {DUR.map((d) => <option key={d.id} value={d.id}>{d.label}</option>)}
              </select>
            </div>
            <div>
              <label className="lbl" htmlFor="sira">Sıralama</label>
              <select id="sira" className="inp" value={sort} onChange={(e) => setSort(e.target.value)}>
                {SORT.map((x) => <option key={x.id} value={x.id}>{x.label}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <label className="lbl" htmlFor="fiyat">
              En fazla {eur(max)} {max >= 500 ? "(sınırsız)" : ""}
            </label>
            <input id="fiyat" type="range" min="30" max="500" step="10" value={max}
              onChange={(e) => setMax(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--iznik)", height: 32 }} />
          </div>

          <div className="between" style={{ marginTop: 12, flexWrap: "wrap", gap: 10 }}>
            <span className="mono muted" style={{ fontSize: 12 }} aria-live="polite">
              {list.length} sonuç
            </span>
            <button className="btn ghost sm" onClick={reset}>Filtreleri temizle</button>
          </div>
        </div>

        {/* sonuçlar */}
        <h2 className="sec-t" style={{ marginTop: 30 }}>
          {q || cat !== "all" || dur !== "all" || max < 500 ? "Sonuçlar" : "En çok satan deneyimler"}
        </h2>
        <div className="grid" style={{ marginTop: 16 }}>
          {list.map((p) => <ProductCard key={p.id} p={p} state={state} />)}
        </div>
        {list.length === 0 && (
          <Empty>
            Aramanıza uygun hizmet bulunamadı. Filtreleri gevşetmeyi deneyin ya da
            otelinizdeki masaya doğrudan sorun — listede olmayan şeyler de ayarlanabiliyor.
          </Empty>
        )}

        <div className="divider" />
        <h2 className="sec-t">Otelinizin sayfası</h2>
        <p className="muted" style={{ marginTop: 6, fontSize: 14.5 }}>
          Odanızdaki QR kodu okuttuğunuzda doğrudan kendi otelinizin sayfasına gidersiniz.
        </p>
        <div className="grid2" style={{ marginTop: 16 }}>
          {HOTELS.map((h) => (
            <Link key={h.slug} to={`/${h.slug}`} className="card lift">
              <Photo seed={h.cover} h={130} tag={h.district} alt={`${h.name}, ${h.district}`} />
              <div className="pad between">
                <div>
                  <h3 style={{ fontSize: 16 }}>{h.name}</h3>
                  <div className="mono muted" style={{ fontSize: 12, marginTop: 4 }}>
                    touristurkey.com/{h.slug}
                  </div>
                </div>
                <span aria-hidden="true" style={{ color: h.accent, fontSize: 20 }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
