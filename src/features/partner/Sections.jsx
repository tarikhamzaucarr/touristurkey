import React from "react";
import { REASONS, COMPARE } from "./content.js";
import { Kicker } from "../../components/ui/index.jsx";

/* Partner sayfasının anlatı bölümleri. Kayıt formundan ayrıldı. */
export function PartnerSections() {
  return (
    <>
      {/* ücretsiz vurgusu */}
      <div className="wrap" style={{ marginTop: 34 }}>
        <div className="card pad" style={{ background: "var(--bg2)" }}>
          <div className="grid2" style={{ alignItems: "center" }}>
            <div>
              <h2 className="sec-t">Konsiyerjler için tamamen ücretsiz.</h2>
              <p style={{ fontSize: 15, marginTop: 10, color: "var(--ink2)" }}>
                Sizden yazılım parası, kurulum parası veya aylık abonelik almıyoruz.
                Mevcut satışlarınıza da karışmıyoruz — kendi tedarikçinizle
                çalışmaya devam edebilirsiniz.
              </p>
              <p style={{ fontSize: 15, marginTop: 12, color: "var(--ink2)" }}>
                Biz yalnızca <b>sistem üzerinden gelen</b>, yani sizin normalde
                kaçıracağınız işlerden pay alırız. Kaçan satış yoksa, ödemeniz de yok.
              </p>
            </div>
            <div className="stack" style={{ gap: 10 }}>
              {[["Kurulum", "₺0"], ["Aylık yazılım ücreti", "₺0"], ["Mevcut satışlarınızdan komisyon", "₺0"],
                ["Sistemden gelen yeni satış", "Gelir paylaşımı"]].map(([k, v]) => (
                <div key={k} className="card pad between" style={{ padding: "13px 15px" }}>
                  <span style={{ fontSize: 14 }}>{k}</span>
                  <b style={{ fontFamily: "var(--display)", color: v === "₺0" ? "var(--green)" : "var(--brass)" }}>{v}</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* rakip konumlandırma */}
      <div className="wrap" style={{ marginTop: 40 }}>
        <Kicker>Neden şimdi</Kicker>
        <h2 className="sec-t" style={{ marginTop: 8 }}>Komisyon şehirden çıkıyor.</h2>
        <p className="muted" style={{ fontSize: 15, marginTop: 8, maxWidth: 680 }}>
          Uluslararası platformlar İstanbul'da satılan her turdan ciddi bir komisyon
          alıyor ve bu para yurt dışına gidiyor. Aynı misafir sizin otelinizde kalıyor,
          aynı tekneye biniyor, aynı rehberle geziyor — ama aradaki pay şehirde kalmıyor.
        </p>
        <div className="grid" style={{ marginTop: 20 }}>
          {COMPARE.map((c) => (
            <div key={c.t} className="card pad">
              <h3 style={{ fontSize: 16.5, color: c.bad ? "var(--mute)" : "var(--iznik)" }}>{c.t}</h3>
              <div style={{ marginTop: 10 }}>
                {c.a.map((x) => (
                  <div key={x} style={{ fontSize: 14, padding: "5px 0", color: c.bad ? "var(--mute)" : "var(--ink)" }}>
                    {c.bad ? "—" : "✓"} {x}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* faydalar */}
      <div className="wrap" style={{ marginTop: 44 }}>
        <Kicker>Ne değişiyor</Kicker>
        <h2 className="sec-t" style={{ marginTop: 8 }}>Masanız aynı kalır, erişimi büyür.</h2>
        <div className="grid2" style={{ marginTop: 20 }}>
          {REASONS.map((r) => (
            <div key={r.n} className="card pad">
              <div className="mono" style={{ fontSize: 12, color: "var(--iznik)" }}>{r.n}</div>
              <h3 style={{ fontSize: 17, marginTop: 8 }}>{r.t}</h3>
              <p className="muted" style={{ fontSize: 14, marginTop: 7 }}>{r.p}</p>
            </div>
          ))}
        </div>
      </div>

      {/* nasıl işler */}
      <div className="wrap" style={{ marginTop: 44 }}>
        <Kicker>Nasıl işliyor</Kicker>
        <h2 className="sec-t" style={{ marginTop: 8 }}>Dört adım, tek gün.</h2>
        <div className="grid" style={{ marginTop: 20 }}>
          {[["Kayıt olun", "Formu doldurun. Aynı gün arıyoruz."],
            ["Sayfanız açılır", "touristurkey.com/otelinizinadi — logonuz, renginiz, ürünleriniz."],
            ["QR ve kartlar gelir", "Anahtar kartı kılıfı ve oda kartlarını biz basıp gönderiyoruz."],
            ["Talepler düşmeye başlar", "Panelinizden yönetirsiniz. Fiyatı siz belirlersiniz."]].map(([t, p], i) => (
            <div key={t} className="card pad">
              <div className="mono" style={{ fontSize: 12, color: "var(--brass)" }}>ADIM {i + 1}</div>
              <h3 style={{ fontSize: 16.5, marginTop: 8 }}>{t}</h3>
              <p className="muted" style={{ fontSize: 14, marginTop: 6 }}>{p}</p>
            </div>
          ))}
        </div>
      </div>

      {/* kayıt */}
    </>
  );
}
