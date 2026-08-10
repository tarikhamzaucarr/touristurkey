import React, { useState } from "react";
import { HOTELS, CATS, productBySlug, hotelBySlug, conciergeOf, cancelOf, unitText }
  from "../../data/index.js";
import * as DB from "../../lib/index.js";
import { viewProduct } from "../../lib/content.js";
import { Link, srcParam } from "../../router/index.jsx";
import { useStore } from "../../hooks/useStore.js";
import { money } from "../../hooks/useCurrency.js";
import { useSeo, productSchema } from "../../hooks/useSeo.js";
import { Photo, Pill, Kicker, Field, DegradedBanner } from "../../components/ui/index.jsx";
import { Calendar } from "../../components/booking/Calendar.jsx";
import { Stepper, SlotPicker } from "../../components/booking/Controls.jsx";
import { GuestBar, Footer } from "../../components/layout/index.js";
import { NotFound } from "./NotFound.jsx";
import { BookingBox } from "./BookingBox.jsx";
import { fmtDate } from "../../lib/date.js";

const eur = money;
const hotelOf = hotelBySlug;
const concOf = conciergeOf;
const PRODUCTS_BY_SLUG = productBySlug;

export function ProductPage({ slug, hotelSlug }) {
  const state = useStore();
  const p = productBySlug(slug);
  const hotel = hotelOf(hotelSlug || sessionStorage.getItem("tt.hotel"));
  const [date, setDate] = useState("");
  const [pax, setPax] = useState(2);
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [slot2, setSlot2] = useState("");
  const [note, setNote] = useState("");
  const [done, setDone] = useState(null);
  const src = srcParam();

  const v0 = p ? viewProduct(state, p, hotel) : null;
  useSeo(p ? {
    title: p.title,
    description: p.short,
    type: "product",
    path: hotelSlug ? `/${hotelSlug}/tur/${p.slug}` : `/tur/${p.slug}`,
    schema: productSchema(p, v0.price, `${location.origin}/tur/${p.slug}`),
  } : { title: "Bulunamadı", description: "" });
  if (!p) return <NotFound />;
  const v = v0;
  const conc = hotel ? concOf(hotel) : null;
  const slot = date ? DB.slotStatus(state, p.id, date) : null;
  const unitMult = p.unit === "kişi" ? pax : 1;
  const total = v.price * unitMult;
  const phoneOk = phone.replace(/[^0-9]/g, "").length >= 10;
  const needsSlot = p.slots && p.slots[0] !== "esnek";
  const slotOk = !needsSlot || !!slot2;
  const canBook = hotel && date && slot && slot.left >= pax && phoneOk && slotOk && !state.degraded;

  function submit() {
    const ref = `${hotel.slug.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 8999)}`;
    const b = {
      id: `b${Date.now()}`, ref, hotel: hotel.slug, source: src, room: room || "—",
      pid: p.id, pax, date, phone, slot: slot2 || "esnek",
      note: [name && `Ad: ${name}`, `Tel: ${phone}`, note].filter(Boolean).join(" · "),
      status: "new", price: v.price, net: p.net, supOK: false,
      createdAt: Date.now(), log: [{ t: Date.now(), e: "Talep oluşturuldu" }],
    };
    DB.createBooking(b);
    setDone(b);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (done) {
    return (
      <>
        <GuestBar hotel={hotel} />
        <div className="wrap-s" style={{ paddingTop: 30, paddingBottom: 70 }}>
          <div className="card rise">
            <Photo seed={v.photo} h={150} />
            <div className="pad">
              <Kicker>Talebiniz iletildi</Kicker>
              <h1 style={{ fontSize: 23, marginTop: 8 }}>{p.title}</h1>
              <p className="muted" style={{ fontSize: 14.5, marginTop: 10 }}>
                <b style={{ color: "var(--ink)" }}>{conc.name}</b> ({conc.desk}) talebi devraldı.
                15 dakika içinde teyit için size dönecek.
              </p>
              <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--line)" }}>
                {[["Referans", done.ref], ["Tarih", fmtDate(done.date)], ["Kişi", done.pax],
                  ["Oda", done.room], ["Tutar", eur(done.price * (p.unit === "kişi" ? done.pax : 1))]]
                  .map(([k, val]) => (
                  <div key={k} className="between mono" style={{ fontSize: 12, padding: "5px 0" }}>
                    <span className="muted">{k}</span><span>{val}</span>
                  </div>
                ))}
              </div>
              <div className="refbox" style={{ marginTop: 16 }}>
                <div className="lbl" style={{ marginBottom: 0 }}>REFERANS NUMARANIZ</div>
                <div className="code">{done.ref}</div>
                <div className="muted" style={{ fontSize: 13, marginTop: 8 }}>
                  Bu numarayla talebinizi her zaman izleyebilirsiniz
                </div>
                <button className="btn ghost sm" style={{ marginTop: 10 }}
                  onClick={() => navigator.clipboard?.writeText(`${location.origin}/t/${done.ref}`)}>
                  Takip bağlantısını kopyala
                </button>
              </div>
              <div className="banner info" style={{ marginTop: 14 }}>
                <span aria-hidden="true">🕐</span>
                <div>
                  Masamız <b>{hotel.hours}</b> arası açık. Bu saatler dışında gönderilen
                  talepler ertesi sabah ilk iş yanıtlanır.
                </div>
              </div>
              <div className="row" style={{ gap: 8, marginTop: 14 }}>
                <a className="btn" style={{ flex: 1 }} target="_blank" rel="noreferrer"
                  href={`https://wa.me/${conc.wa.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Merhaba, ${done.ref} referanslı talebim hakkında yazıyorum.`)}`}>
                  WhatsApp'tan yaz
                </a>
                <Link to={`/t/${done.ref}`} className="btn ghost" style={{ flex: 1 }}>Durumu izle</Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <GuestBar hotel={hotel} />
      <Photo seed={v.photo} h={250} alt={p.title} tag={p.rank <= 5 ? `EN ÇOK SATAN #${p.rank}` : null} />
      <div className="wrap" style={{ paddingTop: 20, paddingBottom: 80 }}>
        <DegradedBanner />
        <div style={{ display: "grid", gap: 26, gridTemplateColumns: "1fr" }} className="pgrid">
          <div>
            <Kicker>{CATS.find((c) => c.id === p.cat)?.label}</Kicker>
            <h1 style={{ fontSize: "clamp(24px,5vw,34px)", marginTop: 8 }}>{p.title}</h1>
            <div className="row" style={{ gap: 6, marginTop: 12, flexWrap: "wrap" }}>
              <Pill>{p.dur}</Pill><Pill>{p.meet}</Pill>
              {p.peak && <Pill kind="brass">Yoğun talep</Pill>}
            </div>
            <p style={{ fontSize: 15.5, marginTop: 16, color: "var(--ink2)" }}>{p.long}</p>

            <div className="grid2" style={{ marginTop: 20 }}>
              <div className="card pad">
                <div className="lbl">Fiyata dahil</div>
                {p.inc.map((i) => (
                  <div key={i} style={{ fontSize: 14, padding: "4px 0" }}>
                    <span style={{ color: "var(--green)" }}>✓</span> {i}
                  </div>
                ))}
              </div>
              {p.exc.length > 0 && (
                <div className="card pad">
                  <div className="lbl">Dahil değil</div>
                  {p.exc.map((i) => (
                    <div key={i} style={{ fontSize: 14, padding: "4px 0", color: "var(--mute)" }}>— {i}</div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* rezervasyon kutusu */}
          <div>
            <BookingBox {...{ p, v, hotel, state, date, setDate, pax, setPax, slot2, setSlot2,
              name, setName, phone, setPhone, room, setRoom, note, setNote,
              slot, total, unitMult, canBook, phoneOk, slotOk, submit }} />
          </div>
        </div>
      </div>
      <style>{`@media(min-width:900px){.pgrid{grid-template-columns:1.55fr 1fr!important}}`}</style>
      <Footer />
    </>
  );
}
