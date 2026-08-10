import React, { useState, useEffect } from "react";
import { PRODUCTS, CATS, GUIDE, hotelBySlug, conciergeOf } from "../../data/index.js";
import { adsOfHotel } from "../../lib/content.js";
import { Link } from "../../router/index.jsx";
import { useStore } from "../../hooks/useStore.js";
import { useSeo, breadcrumb } from "../../hooks/useSeo.js";
import { Photo, Kicker, DegradedBanner } from "../../components/ui/index.jsx";
import { GuestBar, Footer } from "../../components/layout/index.js";
import { ProductCard } from "./ProductCard.jsx";
import { NotFound } from "./NotFound.jsx";

const hotelOf = hotelBySlug;
const concOf = conciergeOf;

export function HotelPage({ slug }) {
  const state = useStore();
  const hotel = hotelOf(slug);
  const [cat, setCat] = useState("all");
  const params = new URLSearchParams(window.location.search);
  const src = params.get("s") || "direct";

  useEffect(() => { if (hotel) sessionStorage.setItem("tt.hotel", hotel.slug); }, [hotel]);
  useSeo({
    title: hotel ? `${hotel.name} — turlar ve hizmetler` : "Otel",
    description: hotel ? `${hotel.name} misafirleri için turlar, transfer, hamam ve `
      + `restoran rezervasyonu. Talebiniz oteldeki masaya iletilir.` : "",
    path: hotel ? `/${hotel.slug}` : "/",
    schema: hotel ? breadcrumb([["Ana sayfa", "/"], [hotel.name, `/${hotel.slug}`]]) : null,
  });
  if (!hotel) return <NotFound />;
  const conc = concOf(hotel);
  const list = PRODUCTS.filter((p) => cat === "all" || p.cat === cat);
  const ads = state.ads.filter((a) => a.hotel === hotel.slug && a.active !== false);

  return (
    <>
      <GuestBar hotel={hotel} />

      {/* hero */}
      <div style={{ position: "relative" }}>
        <Photo seed={hotel.cover} h={230} alt={`${hotel.name}, ${hotel.district}`} />
        <div className="wrap" style={{ position: "absolute", inset: 0, display: "flex",
          alignItems: "flex-end", paddingBottom: 20 }}>
          <div>
            <div className="row" style={{ gap: 9, marginBottom: 8 }}>
              <span aria-hidden="true" style={{ width: 40, height: 40, borderRadius: 11,
                background: hotel.accent, color: "#fff", display: "grid", placeItems: "center",
                fontFamily: "var(--display)", fontWeight: 800, fontSize: 15,
                border: "2px solid rgba(255,255,255,.85)" }}>{hotel.logo}</span>
              <span className="mono" style={{ fontSize: 12, letterSpacing: ".14em",
                color: "#fff", opacity: .92 }}>{hotel.district.toUpperCase()} · {hotel.hours}</span>
            </div>
            <h1 style={{ fontSize: "clamp(24px,5.4vw,38px)", color: "#fff", marginTop: 0 }}>
              {hotel.name}
            </h1>
            <div style={{ color: "#fff", opacity: .9, fontSize: 14, marginTop: 4 }}>
              Konsiyerjiniz {conc.name} — {conc.desk}
            </div>
          </div>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop: 22, paddingBottom: 100 }}>
        {/* rehber girişi */}
        <div className="card pad rise" style={{ borderLeft: `3px solid ${hotel.accent}` }}>
          <Kicker>İstanbul Rehberi</Kicker>
          <h2 style={{ fontSize: 20, marginTop: 8 }}>İlk kez mi geldiniz? 48 saatlik plan hazır.</h2>
          <p className="muted" style={{ fontSize: 14.5, marginTop: 7 }}>
            Nereden başlanır, hangi gün nereye gidilir, nerede para kaybedilir —
            hepsi rehberde. Her bölümü okurken, o bölümde anlatılan yerleri
            aynı sayfadan ayırtabilirsiniz.
          </p>
          <div className="scroll" style={{ marginTop: 14 }}>
            {GUIDE.map((g) => (
              <Link key={g.slug} to={`/rehber/${g.slug}`} className="tab">{g.title}</Link>
            ))}
          </div>
        </div>

        {/* otel içi hizmetler */}
        {ads.length > 0 && (
          <>
            <h2 className="sec-t" style={{ marginTop: 30 }}>Otel içi hizmetler</h2>
            <div className="grid2" style={{ marginTop: 14 }}>
              {ads.map((a) => (
                <div key={a.id} className="card">
                  <Photo seed={a.photo || "hotelservice"} h={120} tag="OTEL" />
                  <div className="pad">
                    <h3 style={{ fontSize: 16 }}>{a.title}</h3>
                    <p className="muted" style={{ fontSize: 13.5, marginTop: 6 }}>{a.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* katalog */}
        <h2 className="sec-t" style={{ marginTop: 32 }}>Turlar ve hizmetler</h2>
        <div className="tabs" style={{ marginTop: 14, marginBottom: 16 }}>
          <button className={`tab${cat === "all" ? " on" : ""}`} onClick={() => setCat("all")}>Tümü</button>
          {CATS.map((c) => (
            <button key={c.id} className={`tab${cat === c.id ? " on" : ""}`}
              onClick={() => setCat(c.id)}>{c.label}</button>
          ))}
        </div>
        <div className="grid">
          {list.map((p) => <ProductCard key={p.id} p={p} hotel={hotel} state={state} />)}
        </div>
      </div>

      {/* alt bar */}
      <div className="bottombar">
        <div className="wrap between">
          <div style={{ minWidth: 0 }}>
            <div className="mono" style={{ fontSize: 12, color: "var(--mute)" }}>
              OTELİNİZDEKİ REZERVASYON MASASI
            </div>
            <div style={{ fontSize: 13.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {conc.name} · {hotel.hours}
            </div>
          </div>
          <a className="btn sm" style={{ background: hotel.accent }}
            href={`https://wa.me/${conc.wa.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </div>
      <div style={{ height: 10 }} />
      <Footer />
    </>
  );
}
