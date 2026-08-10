import React, { useState } from "react";
import { addPartner } from "../../lib/content.js";
import { Link } from "../../router/index.jsx";
import { Photo, Kicker, Field, Pill } from "../../components/ui/index.jsx";
import { Footer } from "../../components/layout/index.js";
import { useSeo } from "../../hooks/useSeo.js";

import { PartnerSections } from "./Sections.jsx";

export default function Partner() {
  useSeo({
    title: "Oteller ve konsiyerj masaları için",
    description: "Konsiyerj masaları için tamamen ücretsiz. Kurulum ücreti yok, " +
      "aylık yazılım ücreti yok. Masanızı misafirin odasına taşıyoruz.",
    path: "/partner",
  });
  const [f, setF] = useState({ type: "konsiyerj", name: "", org: "", hotel: "", phone: "", city: "İstanbul", note: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (v) => setF((s) => ({ ...s, [k]: v }));

  return (
    <div>
      <div className="topbar">
        <div className="wrap between" style={{ height: 58 }}>
          <Link to="/" style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 16 }}>
            touris<span style={{ color: "var(--iznik)" }}>turkey</span>
          </Link>
          <a href="#kayit" className="btn sm">Ücretsiz katıl</a>
        </div>
      </div>

      {/* hero */}
      <div className="wrap" style={{ paddingTop: 32 }}>
        <div className="rise" style={{ maxWidth: 720 }}>
          <Kicker>Oteller ve konsiyerj masaları için</Kicker>
          <h1 className="hero-t" style={{ marginTop: 12 }}>
            Tek masa pazarlık edemez.<br />300 masa eder.
          </h1>
          <p style={{ fontSize: 17, marginTop: 16, color: "var(--ink2)", maxWidth: 620 }}>
            İstanbul'daki konsiyerj masaları bugün tek tek çalışıyor. Her biri aynı
            tedarikçiden, tek tek, pahalı fiyat alıyor. TouristTurkey bu masaları tek
            ağda birleştirir — ve o ağın toplam hacmiyle pazarlık eder.
          </p>
          <div className="row" style={{ gap: 10, marginTop: 22, flexWrap: "wrap" }}>
            <a href="#kayit" className="btn">Konsiyerjler için ücretsiz</a>
            <Link to="/otelpera" className="btn ghost">Örnek otel sayfası</Link>
          </div>
          <div className="row" style={{ gap: 8, marginTop: 18, flexWrap: "wrap" }}>
            <Pill kind="ok">Kurulum ücreti yok</Pill>
            <Pill kind="ok">Aylık ücret yok</Pill>
            <Pill kind="ok">Sözleşme zorunluluğu yok</Pill>
          </div>
        </div>
      </div>

      <PartnerSections />

      <div className="wrap-s" id="kayit" style={{ marginTop: 48, paddingBottom: 70 }}>
        <div className="card">
          <Photo seed="istanbulpartner" h={130} tag="ÜCRETSİZ KAYIT" />
          <div className="pad">
            {sent ? (
              <div className="center" style={{ padding: "20px 0" }}>
                <h2 style={{ fontSize: 22 }}>Kaydınız alındı</h2>
                <p className="muted" style={{ marginTop: 10, fontSize: 14.5 }}>
                  Ekibimiz 24 saat içinde arayacak. Sayfanız görüşmenin ardından
                  aynı gün yayına alınır.
                </p>
                <Link to="/" className="btn ghost" style={{ marginTop: 18 }}>Ana sayfa</Link>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: 22 }}>Ağa katılın</h2>
                <p className="muted" style={{ fontSize: 14, marginTop: 6 }}>
                  Konsiyerj masaları için ücretsiz. Oteller için de kurulum bedeli yok.
                </p>
                <div className="stack" style={{ gap: 12, marginTop: 18 }}>
                  <div>
                    <label className="lbl">Kim olarak başvuruyorsunuz?</label>
                    <div className="row" style={{ gap: 6 }}>
                      {[["konsiyerj", "Konsiyerj / acenta"], ["otel", "Otel"], ["tedarikci", "Tedarikçi"]].map(([k, l]) => (
                        <button key={k} className={`tab${f.type === k ? " on" : ""}`}
                          style={{ flex: 1 }} onClick={() => set("type")(k)}>{l}</button>
                      ))}
                    </div>
                  </div>
                  <Field label="Ad soyad" value={f.name} onChange={set("name")} placeholder="Adınız" />
                  <Field label="Masa / firma adı" value={f.org} onChange={set("org")} placeholder="Vista Travel Desk" />
                  <Field label="Hangi otel(ler)de" value={f.hotel} onChange={set("hotel")} placeholder="Pera Vista, Galata House…" />
                  <Field label="Telefon" value={f.phone} onChange={set("phone")} placeholder="+90 5xx xxx xx xx" />
                  <Field label="Eklemek istedikleriniz" value={f.note} onChange={set("note")} area
                    placeholder="Aylık kaç tur satıyorsunuz, hangi tedarikçilerle çalışıyorsunuz?" />
                  <button className="btn full" disabled={!f.name || !f.phone}
                    onClick={() => { addPartner(f); setSent(true); window.scrollTo({ top: 0 }); }}>
                    Ücretsiz kayıt ol
                  </button>
                  <p className="muted center" style={{ fontSize: 12 }}>
                    Kayıt sizi hiçbir şeye bağlamaz. İstediğiniz zaman ayrılabilirsiniz.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="row" style={{ gap: 10, marginTop: 24, flexWrap: "wrap", justifyContent: "center" }}>
          <Link to="/panel" className="btn ghost sm">Konsiyerj paneli</Link>
          <Link to="/tedarikci" className="btn ghost sm">Tedarikçi paneli</Link>
          <Link to="/yonetim" className="btn ghost sm">Yönetim</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
