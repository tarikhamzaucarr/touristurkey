import React, { useState } from "react";
import { PRODUCTS, CATS } from "../../data/index.js";
import * as DB from "../../lib/index.js";
import { fmtDate, hoursAgo } from "../../lib/date.js";
import { money as eur } from "../../hooks/useCurrency.js";
import { Pill, Empty, STATUS, ConfirmButton } from "../../components/ui/index.jsx";

/* Talep kutusu. "Teyit bekleyen" sekmesi 24 saati geçmiş, kapatılmamış
   işlemleri gösterir — sızıntının ilk göstergesi budur. */
export function Inbox({ list, hotel, state }) {
  const [f, setF] = useState("open");
  const stale = (b) => ["assigned", "confirmed"].includes(b.status) && hoursAgo(b.createdAt) > 24;
  const open = list.filter((b) => ["new", "assigned", "confirmed"].includes(b.status));
  const staleL = list.filter(stale);
  const closed = list.filter((b) => ["done", "cancelled"].includes(b.status));
  const shown = f === "open" ? open : f === "stale" ? staleL : closed;

  return (
    <>
      <div className="tabs" style={{ marginBottom: 14 }}>
        {[["open", `Açık ${open.length}`], ["stale", `Teyit bekleyen ${staleL.length}`], ["closed", `Kapanan ${closed.length}`]]
          .map(([k, l]) => (
            <button key={k} className={`tab${f === k ? " on" : ""}`} onClick={() => setF(k)}>{l}</button>
          ))}
      </div>
      {shown.length === 0 && <Empty>Bu listede kayıt yok.</Empty>}
      <div className="stack" style={{ gap: 11 }}>
        {shown.map((b) => {
          const p = PRODUCTS.find((x) => x.id === b.pid);
          const slot = DB.slotStatus(state, b.pid, b.date);
          const isStale = stale(b);
          const total = b.price * (p.unit === "kişi" ? b.pax : 1);
          const margin = Math.round((total - b.net * (p.unit === "kişi" ? b.pax : 1)) * hotel.split);
          return (
            <div key={b.id} className="card" style={{ borderColor: isStale ? "var(--coral)" : "var(--line)" }}>
              <div className="pad">
                <div className="between" style={{ alignItems: "flex-start" }}>
                  <div style={{ minWidth: 0 }}>
                    <h3 style={{ fontSize: 16 }}>{p.title}</h3>
                    <div className="mono muted" style={{ fontSize: 11.5, marginTop: 5 }}>
                      {b.ref} · oda {b.room} · {b.pax} kişi · {fmtDate(b.date)}{b.slot && b.slot !== "esnek" ? ` · ${b.slot}` : ""}
                    </div>
                    {b.phone && (
                      <a href={`https://wa.me/${b.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank" rel="noreferrer"
                        style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--iznik)",
                          display: "inline-block", marginTop: 5 }}>
                        {b.phone} · WhatsApp'tan yaz
                      </a>
                    )}
                  </div>
                  <Pill kind={STATUS[b.status].kind}>{STATUS[b.status].label}</Pill>
                </div>

                <div className="row" style={{ gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                  <Pill>{b.source}</Pill>
                  <Pill>{hoursAgo(b.createdAt)} saat önce</Pill>
                  <Pill>{PRODUCTS.find((x) => x.id === b.pid).sup}</Pill>
                  {b.supOK && <Pill kind="ok">tedarikçi onayladı</Pill>}
                  {slot.code === "closed" && <Pill kind="warn">tedarikçi bu tarihi kapattı</Pill>}
                </div>

                {b.note && <p className="muted" style={{ fontSize: 13, marginTop: 10 }}>{b.note}</p>}

                {isStale && (
                  <div style={{ marginTop: 11, padding: "10px 12px", borderRadius: 9,
                    background: "color-mix(in srgb,var(--coral) 12%,transparent)",
                    border: "1px solid color-mix(in srgb,var(--coral) 40%,transparent)", fontSize: 13 }}>
                    24 saati geçti, hâlâ kapatılmadı. İş yapıldıysa <b>Gerçekleşti</b> deyin.
                  </div>
                )}

                <div className="between" style={{ marginTop: 13, paddingTop: 13,
                  borderTop: "1px solid var(--line)", flexWrap: "wrap" }}>
                  <div className="mono" style={{ fontSize: 12, color: "var(--mute)" }}>
                    satış <b style={{ color: "var(--ink)" }}>{eur(total)}</b> ·
                    payınız <b style={{ color: "var(--brass)" }}>€{margin}</b>
                  </div>
                  <div className="row" style={{ gap: 6 }}>
                    {b.status === "new" &&
                      <button className="btn sm" onClick={() => DB.updateBooking(b.id, { status: "assigned" }, "Konsiyerj üstlendi")}>Üstlen</button>}
                    {b.status === "assigned" &&
                      <button className="btn sm" onClick={() => DB.updateBooking(b.id, { status: "confirmed" }, "Misafire teyit edildi")}>Misafire onayla</button>}
                    {b.phone && b.status === "confirmed" && (
                      <a className="btn ghost sm" target="_blank" rel="noreferrer"
                        href={`https://wa.me/${b.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                          `Merhaba, ${b.ref} referanslı talebiniz onaylandı. ${p.title} — ${fmtDate(b.date)}${b.slot && b.slot !== "esnek" ? " saat " + b.slot : ""}, ${b.pax} kişi. Buluşma: ${p.meet}. Durumu izlemek için: ${location.origin}/t/${b.ref}`)}`}>
                        Misafiri bilgilendir
                      </a>
                    )}
                    {b.status === "confirmed" &&
                      <button className="btn sm ok" onClick={() => DB.updateBooking(b.id, { status: "done" }, "Gerçekleşti")}>Gerçekleşti</button>}
                    {["new", "assigned", "confirmed"].includes(b.status) &&
                      <ConfirmButton label="İptal" confirmLabel="Evet, iptal"
                        onConfirm={() => DB.updateBooking(b.id, { status: "cancelled" }, "İptal edildi")} />}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
