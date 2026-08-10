import React from "react";
import { Link } from "../../router/index.jsx";
import { HOTELS } from "../../data/index.js";

/* Footer — yasal bilgi, iletişim ve güven sinyalleri.
   Not: uydurma sayaç ("500+ mutlu turist") bilinçli olarak konulmadı.
   Gerçek rakama ulaşılınca eklenecek; sahte sosyal kanıt hem etik
   değil hem tüketici mevzuatı açısından yanıltıcı ticari uygulama. */

const COLS = [
  {
    t: "Keşfet",
    links: [["İstanbul Rehberi", "/rehber"], ["48 Saatlik Plan", "/rehber/48-saat"],
      ["Boğaz Rehberi", "/rehber/bogaz"], ["Nerede Yenir", "/rehber/yemek"],
      ["Ulaşım", "/rehber/ulasim"]],
  },
  {
    t: "İş ortakları",
    links: [["Oteller & konsiyerjler", "/partner"], ["Konsiyerj paneli", "/panel"],
      ["Tedarikçi paneli", "/tedarikci"]],
  },
  {
    t: "Yardım",
    links: [["Talep takibi", "/t"], ["Sık sorulanlar", "/sss"],
      ["İptal ve iade", "/sss#iptal"], ["İletişim", "/iletisim"]],
  },
];

const LEGAL = [
  ["KVKK Aydınlatma Metni", "/kvkk"],
  ["Gizlilik Politikası", "/gizlilik"],
  ["Kullanım Koşulları", "/kosullar"],
  ["Mesafeli Satış Sözleşmesi", "/mesafeli-satis"],
  ["Çerez Politikası", "/cerez"],
];

const TRUST = [
  ["Ruhsatlı rehberler", "Rehberli turlarda Bakanlık ruhsatlı rehber çalışır"],
  ["Ücretsiz iptal", "Çoğu üründe 24 saate kadar ücretsiz iptal"],
  ["Yerel muhatap", "Sorununuzda otelinizdeki masa muhatabınızdır"],
  ["Ön ödeme yok", "Talep anında ödeme alınmaz"],
];

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", background: "var(--bg2)", marginTop: 40 }}>
      {/* güven bandı */}
      <div className="wrap" style={{ padding: "26px 16px", borderBottom: "1px solid var(--line)" }}>
        <div className="grid2" style={{ gap: 16 }}>
          {TRUST.map(([t, d]) => (
            <div key={t}>
              <div className="row" style={{ gap: 7 }}>
                <span aria-hidden="true" style={{ color: "var(--green)" }}>✓</span>
                <b style={{ fontFamily: "var(--display)", fontSize: 14.5 }}>{t}</b>
              </div>
              <div className="muted" style={{ fontSize: 13, marginTop: 4, paddingLeft: 20 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="wrap" style={{ padding: "30px 16px 20px" }}>
        <div className="grid2" style={{ gap: 28 }}>
          <div>
            <Link to="/" style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 18 }}>
              touris<span style={{ color: "var(--iznik)" }}>turkey</span>
            </Link>
            <p className="muted" style={{ fontSize: 13.5, marginTop: 10, maxWidth: 320, lineHeight: 1.6 }}>
              İstanbul otellerinin konsiyerj masalarını tek ağda birleştiren
              rezervasyon platformu. Talepleriniz otelinizdeki masaya iletilir.
            </p>

            <div style={{ marginTop: 16 }}>
              <div className="lbl">İletişim</div>
              <div style={{ fontSize: 13.5, lineHeight: 1.8 }}>
                <a href="mailto:merhaba@touristurkey.com">merhaba@touristurkey.com</a><br />
                <a href="https://wa.me/905320000001" target="_blank" rel="noreferrer">
                  +90 532 000 00 01 (WhatsApp)
                </a><br />
                <span className="muted">Beyoğlu, İstanbul</span>
              </div>
            </div>

            <div className="row" style={{ gap: 8, marginTop: 16, flexWrap: "wrap" }}>
              {[["Instagram", "https://instagram.com"], ["YouTube", "https://youtube.com"],
                ["TikTok", "https://tiktok.com"], ["LinkedIn", "https://linkedin.com"]].map(([n, u]) => (
                <a key={n} href={u} target="_blank" rel="noreferrer" className="pill"
                  aria-label={`${n} sayfamız`}>{n}</a>
              ))}
            </div>
          </div>

          <div className="grid2" style={{ gap: 22 }}>
            {COLS.map((c) => (
              <div key={c.t}>
                <div className="lbl">{c.t}</div>
                <div style={{ display: "grid", gap: 7 }}>
                  {c.links.map(([l, to]) => (
                    <Link key={l} to={to} style={{ fontSize: 13.5, color: "var(--ink2)" }}>{l}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 26, paddingTop: 18, borderTop: "1px solid var(--line)" }}>
          <div className="lbl">Yasal</div>
          <div className="row" style={{ gap: 14, flexWrap: "wrap" }}>
            {LEGAL.map(([l, to]) => (
              <Link key={l} to={to} style={{ fontSize: 12.5, color: "var(--mute)" }}>{l}</Link>
            ))}
          </div>

          <p className="muted" style={{ fontSize: 12, marginTop: 16, lineHeight: 1.7, maxWidth: 760 }}>
            Tur ve gezi hizmetleri, 1618 sayılı Seyahat Acentaları Kanunu uyarınca
            yetki belgesine sahip acenta iş ortaklarımız tarafından sağlanır.
            TouristTurkey aracılık hizmeti sunar. Fiyatlar bilgilendirme amaçlıdır;
            kesin fiyat ve müsaitlik, otelinizdeki masa tarafından teyit edilir.
          </p>
          <div className="between" style={{ marginTop: 14, flexWrap: "wrap", gap: 10 }}>
            <span className="muted" style={{ fontSize: 12 }}>
              © {new Date().getFullYear()} TouristTurkey
            </span>
            <span className="mono muted" style={{ fontSize: 11.5 }}>
              {HOTELS.length} otel · İstanbul
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
