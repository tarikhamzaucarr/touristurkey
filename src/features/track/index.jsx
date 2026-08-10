import React, { useState } from "react";
import * as DB from "../../lib/index.js";
import { HOTELS, CONCIERGES, PRODUCTS, cancelOf } from "../../data/index.js";
import { Link, navigate } from "../../router/index.jsx";
import { useStore } from "../../hooks/useStore.js";
import { money as eur } from "../../hooks/useCurrency.js";
import { fmtDate } from "../../lib/date.js";
import { Photo, Pill, Kicker, STATUS, ConfirmButton } from "../../components/ui/index.jsx";

/* 1.3 — Misafirin talebini takip edebileceği sayfa: /t/{referans}
   Önceden gönderim sonrası hiçbir izleme yolu yoktu. */

const STEPS = [
  { key: "new", label: "Talep alındı", desc: "Rezervasyon masasına iletildi." },
  { key: "assigned", label: "İnceleniyor", desc: "Masa talebi üstlendi, müsaitlik teyit ediliyor." },
  { key: "confirmed", label: "Onaylandı", desc: "Yeriniz ayrıldı. Buluşma detayları size iletilecek." },
  { key: "done", label: "Tamamlandı", desc: "Hizmet gerçekleşti." },
];

export default function Track({ ref: refCode }) {
  const state = useStore();
  const [q, setQ] = useState(refCode || "");
  const b = DB.findByRef(state, refCode);

  if (!refCode || !b) {
    return (
      <Shell>
        <Kicker>Talep takibi</Kicker>
        <h1 style={{ fontSize: 26, marginTop: 8 }}>Referans numaranızı girin</h1>
        <p className="muted" style={{ fontSize: 14.5, marginTop: 8 }}>
          Talebinizi gönderdiğinizde size verilen numara. Örnek: OTE-4821
        </p>
        <div style={{ marginTop: 18 }}>
          <label className="lbl" htmlFor="ref">Referans</label>
          <input id="ref" className="inp" value={q} placeholder="OTE-4821"
            onChange={(e) => setQ(e.target.value.toUpperCase())} />
          <button className="btn full" style={{ marginTop: 12 }}
            disabled={q.length < 4}
            onClick={() => navigate(`/t/${q}`)}>
            Sorgula
          </button>
          {refCode && !b && (
            <p style={{ color: "var(--coral)", fontSize: 13.5, marginTop: 12 }}>
              Bu numarayla bir talep bulunamadı. Numarayı kontrol edin veya
              otelinizdeki rezervasyon masasına danışın.
            </p>
          )}
        </div>
      </Shell>
    );
  }

  const p = PRODUCTS.find((x) => x.id === b.pid);
  const hotel = HOTELS.find((h) => h.slug === b.hotel);
  const conc = CONCIERGES.find((c) => c.id === hotel?.conciergeId);
  const mult = p.unit === "kişi" ? b.pax : 1;
  const cancelled = b.status === "cancelled";
  const activeIx = STEPS.findIndex((s) => s.key === b.status);

  return (
    <Shell hotel={hotel}>
      <div className="card" style={{ overflow: "hidden" }}>
        <Photo seed={p.photo} h={140} alt={p.title} />
        <div className="pad">
          <div className="between" style={{ alignItems: "flex-start" }}>
            <div>
              <div className="mono" style={{ fontSize: 11.5, color: "var(--mute)" }}>{b.ref}</div>
              <h1 style={{ fontSize: 21, marginTop: 6 }}>{p.title}</h1>
            </div>
            <Pill kind={STATUS[b.status].kind}>{STATUS[b.status].label}</Pill>
          </div>

          <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--line)" }}>
            {[["Tarih", fmtDate(b.date)], ["Saat", b.slot && b.slot !== "esnek" ? b.slot : "esnek"],
              ["Kişi", b.pax], ["Oda", b.room],
              ["Buluşma", p.meet], ["Tutar", eur(b.price * mult)]].map(([k, v]) => (
              <div key={k} className="between" style={{ fontSize: 14, padding: "6px 0" }}>
                <span className="muted">{k}</span><span>{v}</span>
              </div>
            ))}
          </div>

          <div className="state" style={{ color: "var(--green)", marginTop: 12, display: "block" }}>
            ✓ {cancelOf(p.id)}
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: 18, margin: "26px 0 14px" }}>Durum</h2>
      {cancelled ? (
        <div className="card pad" style={{ borderColor: "var(--coral)" }}>
          <b style={{ color: "var(--coral)" }}>Bu talep iptal edildi.</b>
          <p className="muted" style={{ fontSize: 14, marginTop: 7 }}>
            Ücret tahsil edilmediyse ödemeniz yoktur. Sorunuz varsa masaya yazın.
          </p>
        </div>
      ) : (
        <ul className="timeline" style={{ margin: 0, padding: "0 0 0 22px" }}>
          {STEPS.map((s, i) => {
            const passed = i <= activeIx;
            return (
              <li key={s.key} style={{ opacity: passed ? 1 : .45 }}>
                <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 15.5 }}>
                  {s.label}
                </div>
                <div className="muted" style={{ fontSize: 13.5, marginTop: 3 }}>{s.desc}</div>
              </li>
            );
          })}
        </ul>
      )}

      {!cancelled && ["new", "assigned", "confirmed"].includes(b.status) && (
        <div className="card pad" style={{ marginTop: 22 }}>
          <h3 style={{ fontSize: 16 }}>Talebi iptal et</h3>
          <p className="muted" style={{ fontSize: 13.5, marginTop: 6 }}>
            {cancelOf(p.id)} — şu an ücretsiz iptal edebilirsiniz.
          </p>
          <div style={{ marginTop: 12 }}>
            <ConfirmButton label="Talebi iptal et" confirmLabel="Evet, iptal et"
              onConfirm={() => DB.guestCancel(b.id)} />
          </div>
        </div>
      )}

      {conc && (
        <div className="card pad" style={{ marginTop: 22 }}>
          <div className="mono" style={{ fontSize: 11.5, color: "var(--mute)" }}>
            OTELİNİZDEKİ REZERVASYON MASASI
          </div>
          <div style={{ fontSize: 15.5, marginTop: 6 }}>{conc.name} · {conc.desk}</div>
          <a className="btn full" style={{ marginTop: 12 }} target="_blank" rel="noreferrer"
            href={`https://wa.me/${conc.wa.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Merhaba, ${b.ref} referanslı talebim hakkında yazıyorum.`)}`}>
            WhatsApp'tan yaz
          </a>
        </div>
      )}
    </Shell>
  );
}

function Shell({ children, hotel }) {
  return (
    <>
      <div className="topbar">
        <div className="wrap between" style={{ height: 58 }}>
          <Link to={hotel ? `/${hotel.slug}` : "/"}
            style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 16 }}>
            touris<span style={{ color: "var(--iznik)" }}>turkey</span>
          </Link>
          <Link to="/rehber" className="muted" style={{ fontSize: 14 }}>İstanbul Rehberi</Link>
        </div>
      </div>
      <div className="wrap-s" style={{ paddingTop: 26, paddingBottom: 70 }}>{children}</div>
    </>
  );
}
