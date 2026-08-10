import React from "react";
import { HOTELS, cancelOf, unitText } from "../../data/index.js";
import { Link } from "../../router/index.jsx";
import { money as eur } from "../../hooks/useCurrency.js";
import { Pill, Field } from "../../components/ui/index.jsx";
import { Calendar } from "../../components/booking/Calendar.jsx";
import { Stepper, SlotPicker } from "../../components/booking/Controls.jsx";

/* Rezervasyon kutusu. Ürün sayfasından ayrıldı çünkü tek etkileşimli
   ada burası — Next.js'e geçişte 'use client' yalnızca bu dosyaya gelecek. */
export function BookingBox(props) {
  const { p, v, hotel, state, date, setDate, pax, setPax, slot2, setSlot2,
    name, setName, phone, setPhone, room, setRoom, note, setNote,
    slot, total, unitMult, canBook, phoneOk, slotOk, submit } = props;
  return (
    <div className="card pad" style={{ position: "sticky", top: 76 }}>
              <div className="between">
                <div>
                  <div style={{ fontFamily: "var(--display)", fontSize: 30, fontWeight: 800 }}>
                    {eur(v.price)}
                  </div>
                  {p.unit && <div className="muted" style={{ fontSize: 13.5, marginTop: 3 }}>{unitText(p.unit, pax)}</div>}
                </div>
              </div>

              {!hotel && (
                <div style={{ marginTop: 14, padding: 13, borderRadius: 11,
                  background: "var(--bg2)", border: "1px solid var(--line)", fontSize: 13.5 }}>
                  <b>Hangi otelde kalıyorsunuz?</b> Talebiniz o oteldeki rezervasyon
                  masasına iletilir.
                  <div className="scroll" style={{ marginTop: 11 }}>
                    {HOTELS.map((h) => (
                      <Link key={h.slug} to={`/${h.slug}/tur/${p.slug}`} className="tab">{h.name}</Link>
                    ))}
                  </div>
                  <div className="state" style={{ color: "var(--mute)", marginTop: 11, display: "block" }}>
                    Oteliniz listede yok mu? Doğrudan yazın:{" "}
                    <a href="https://wa.me/905320000001" target="_blank" rel="noreferrer"
                      style={{ color: "var(--iznik)", fontWeight: 600 }}>WhatsApp</a>
                  </div>
                </div>
              )}

              {hotel && (
                <>
                  <div style={{ marginTop: 16 }}>
                    <label className="lbl">Tarih seçin — canlı müsaitlik</label>
                    <Calendar pid={p.id} value={date} onPick={setDate} pax={pax} />
                  </div>
                  {p.slots && p.slots[0] !== "esnek" && date && (
                    <div style={{ marginTop: 14 }}>
                      <label className="lbl">Saat</label>
                      <div className="slots">
                        {p.slots.map((h) => (
                          <button key={h} className={`slot${slot2 === h ? " on" : ""}`}
                            aria-pressed={slot2 === h} onClick={() => setSlot2(h)}>{h}</button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div style={{ marginTop: 14 }}>
                    <label className="lbl">Kişi sayısı</label>
                    <Stepper value={pax} set={setPax} max={Math.min(p.cap, 12)} />
                  </div>
                  <div className="stack" style={{ gap: 11, marginTop: 14 }}>
                    <Field label="Adınız" value={name} onChange={setName} placeholder="Ad Soyad" />
                    <Field label="Telefon (zorunlu)" value={phone} onChange={setPhone}
                      placeholder="+90 5xx xxx xx xx" type="tel" />
                    <Field label="Oda numarası" value={room} onChange={setRoom} placeholder="304" />
                    <Field label="Not (opsiyonel)" value={note} onChange={setNote}
                      placeholder="Doğum günü kutlaması" area />
                  </div>

                  {date && slot && slot.left < pax && (
                    <div style={{ marginTop: 12, color: "var(--coral)", fontSize: 13.5 }}>
                      Bu tarihte {slot.left} kişilik yer kaldı. Tarihi veya kişi sayısını değiştirin.
                    </div>
                  )}

                  {p.price > 0 && (
                    <div className="total" style={{ marginTop: 14 }}>
                      <div className="between">
                        <span className="muted">
                          {unitMult} × {eur(v.price)}
                        </span>
                        <b style={{ fontFamily: "var(--display)", fontSize: 19 }}>{eur(total)}</b>
                      </div>
                      <div className="state" style={{ color: "var(--green)", marginTop: 7 }}>
                        ✓ {cancelOf(p.id)}
                      </div>
                    </div>
                  )}

                  <div style={{ marginTop: 14, padding: "12px 13px", borderRadius: 11,
                    border: "1px solid var(--line)", background: "var(--bg2)", fontSize: 13.5 }}>
                    <b>Bu bir rezervasyon değil, taleptir.</b> Şimdi ödeme alınmaz.
                    Konsiyerjiniz müsaitliği teyit edip size dönecek — genelde 15 dakika içinde.
                  </div>

                  <button className="btn full" style={{ marginTop: 14, background: hotel.accent }}
                    disabled={!canBook} onClick={submit}>
                    {state.degraded ? "Rezervasyon geçici olarak kapalı"
                      : !date ? "Önce tarih seçin"
                      : !slotOk ? "Saat seçin"
                      : !phoneOk ? "Telefon numaranızı girin"
                      : "Talebi gönder"}
                  </button>
                </>
              )}
            </div>
  );
}
